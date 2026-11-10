import { createHash } from "node:crypto";
import { getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore, Timestamp } from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";
import type { Response } from "express";
import { onRequest, type Request } from "firebase-functions/v2/https";
import downloads from "./downloads.json";
import type {
  LeadConfig,
  LeadErrorResponse,
  LeadRequestBody,
  LeadSuccessResponse,
  ValidLead,
} from "./captureLead.types";

if (getApps().length === 0) initializeApp();

const ALLOWED_ORIGINS = new Set(["https://offboardset.com", "https://www.offboardset.com"]);
const LOCAL_ORIGIN = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_MAX = 254;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

const BREVO_API = "https://api.brevo.com/v3";
const BREVO_TIMEOUT_MS = 10_000;

const GENERIC_ERROR = "Something went wrong. Please try again.";
const INVALID_ERROR = "Please check your details and try again.";

const downloadMap: Record<string, string> = downloads;

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

const isEmulator = () => process.env.FUNCTIONS_EMULATOR === "true";

function originAllowed(origin: string | undefined): boolean {
  if (!origin) return isEmulator(); // browsers always send Origin on a cross-site or POST fetch
  if (ALLOWED_ORIGINS.has(origin)) return true;
  return isEmulator() && LOCAL_ORIGIN.test(origin);
}

function clientIp(req: Request): string {
  const fastly = req.headers["fastly-client-ip"];
  if (typeof fastly === "string" && fastly) return fastly.trim();
  const forwarded = req.headers["x-forwarded-for"];
  const first = (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(",")[0]?.trim();
  return first || req.ip || "unknown";
}

function readConfig(): LeadConfig | null {
  const brevoApiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const downloadBaseUrl = process.env.DOWNLOAD_BASE_URL;
  const brevoListId = Number.parseInt(process.env.BREVO_LEADS_LIST_ID ?? "", 10);
  if (!brevoApiKey || !senderEmail || !downloadBaseUrl || !Number.isInteger(brevoListId)) return null;
  return { brevoApiKey, senderEmail, brevoListId, downloadBaseUrl: downloadBaseUrl.replace(/\/+$/, "") };
}

function validate(body: LeadRequestBody): ValidLead | null {
  if (body.consent !== true) return null;
  if (typeof body.email !== "string" || typeof body.source !== "string") return null;
  const email = body.email.trim().toLowerCase();
  if (email.length === 0 || email.length > EMAIL_MAX || !EMAIL_RE.test(email)) return null;
  if (!Object.prototype.hasOwnProperty.call(downloadMap, body.source)) return null;
  return { email, source: body.source };
}

/** Counts every non-honeypot POST per hashed IP; returns true when the caller is over the limit. */
async function overRateLimit(ip: string): Promise<boolean> {
  const db = getFirestore();
  const ref = db.collection("leads_ratelimit").doc(sha256(ip));
  return db.runTransaction(async (tx) => {
    const now = Date.now();
    const snap = await tx.get(ref);
    const data = snap.data() as { count?: number; windowStart?: number } | undefined;
    const fresh = !data || typeof data.windowStart !== "number" || now - data.windowStart >= RATE_LIMIT_WINDOW_MS;
    const count = fresh ? 0 : (data.count ?? 0);
    if (count >= RATE_LIMIT_MAX) return true;
    tx.set(ref, {
      count: count + 1,
      windowStart: fresh ? now : data!.windowStart,
      // Lets a Firestore TTL policy on this field clean up old counters.
      expireAt: Timestamp.fromMillis((fresh ? now : (data!.windowStart as number)) + RATE_LIMIT_WINDOW_MS * 2),
    });
    return false;
  });
}

/** One doc per lowercased email; repeat submissions add the source and bump lastSeenAt. */
async function recordLead(lead: ValidLead): Promise<void> {
  const db = getFirestore();
  const ref = db.collection("leads").doc(sha256(lead.email));
  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (snap.exists) {
      tx.update(ref, {
        sources: FieldValue.arrayUnion(lead.source),
        lastSeenAt: FieldValue.serverTimestamp(),
      });
      return;
    }
    tx.set(ref, {
      email: lead.email,
      sources: [lead.source],
      consent: true,
      consentAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
      lastSeenAt: FieldValue.serverTimestamp(),
    });
  });
}

async function brevo(config: LeadConfig, path: string, payload: unknown): Promise<number> {
  const res = await fetch(`${BREVO_API}${path}`, {
    method: "POST",
    headers: {
      "api-key": config.brevoApiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(BREVO_TIMEOUT_MS),
  });
  return res.status;
}

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const checklistName = (source: string) =>
  source
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/** Flat, table-based HTML (no gradients): navy header, teal button. */
function buildEmail(source: string, downloadUrl: string) {
  const name = checklistName(source);
  const url = esc(downloadUrl);
  const html = `<!doctype html>
<html lang="en"><body style="margin:0;padding:0;background:#F5F0E8;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;font-family:'DM Sans',Arial,Helvetica,sans-serif;">
<tr><td style="background:#0F1C2E;padding:22px 28px;font-family:Georgia,'DM Serif Display',serif;font-size:22px;color:#F5F0E8;">Offboard<span style="color:#12C4AD;">Set</span></td></tr>
<tr><td style="padding:28px;color:#0F1C2E;font-size:15px;line-height:1.6;">
<p style="margin:0 0 12px;font-size:20px;font-family:Georgia,'DM Serif Display',serif;">Your ${esc(name)} is ready</p>
<p style="margin:0 0 22px;color:#57677D;">Here is the PDF you asked for. Print it, share it with your team, or adapt it to your own process.</p>
<p style="margin:0 0 24px;"><a href="${url}" style="display:inline-block;background:#0D9E8A;color:#0F1C2E;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:8px;">Download the PDF</a></p>
<p style="margin:0;color:#57677D;font-size:13px;">General guidance, not legal advice. You are receiving this because you asked for the checklist and agreed to occasional OffboardSet product emails. You can unsubscribe at any time.</p>
</td></tr>
<tr><td style="border-top:1px solid #E6E8EC;padding:16px 28px;color:#57677D;font-size:12px;">offboardset.com</td></tr>
</table></td></tr></table></body></html>`;
  const text = `Your ${name} is ready.\n\nDownload the PDF: ${downloadUrl}\n\nGeneral guidance, not legal advice. You are receiving this because you asked for the checklist and agreed to occasional OffboardSet product emails. You can unsubscribe at any time.\n\noffboardset.com`;
  return { subject: `Your ${name} (PDF)`, html, text };
}

function send(res: Response, status: number, body: LeadSuccessResponse | LeadErrorResponse) {
  res.status(status).json(body);
}

export const landing_captureLead = onRequest(
  { region: "us-central1", maxInstances: 10, timeoutSeconds: 30 },
  async (req, res) => {
    const origin = typeof req.headers.origin === "string" ? req.headers.origin : undefined;
    res.setHeader("Vary", "Origin");
    res.setHeader("Cache-Control", "no-store");

    if (!originAllowed(origin)) {
      send(res, 403, { ok: false, error: GENERIC_ERROR });
      return;
    }
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Max-Age", "3600");
    }

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST, OPTIONS");
      send(res, 405, { ok: false, error: GENERIC_ERROR });
      return;
    }

    const body: unknown = req.body;
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      send(res, 400, { ok: false, error: INVALID_ERROR });
      return;
    }
    const input = body as LeadRequestBody;

    // Honeypot: look successful to the bot, do nothing.
    if (typeof input.website === "string" && input.website.trim() !== "") {
      send(res, 200, { ok: true });
      return;
    }

    const config = readConfig();
    if (!config) {
      logger.error("landing_captureLead is missing configuration");
      send(res, 500, { ok: false, error: GENERIC_ERROR });
      return;
    }

    try {
      if (await overRateLimit(clientIp(req))) {
        res.setHeader("Retry-After", String(RATE_LIMIT_WINDOW_MS / 1000));
        send(res, 429, { ok: false, error: "Too many requests. Please try again later." });
        return;
      }

      const lead = validate(input);
      if (!lead) {
        send(res, 400, { ok: false, error: INVALID_ERROR });
        return;
      }

      await recordLead(lead);

      const downloadUrl = `${config.downloadBaseUrl}${downloadMap[lead.source]}`;

      // Brevo failures never block the visitor: the success view shows the link regardless.
      let emailed = false;
      try {
        const contactStatus = await brevo(config, "/contacts", {
          email: lead.email,
          attributes: { SOURCE: lead.source },
          listIds: [config.brevoListId],
          updateEnabled: true,
        });
        if (contactStatus >= 300) logger.error("Brevo contact upsert failed", { status: contactStatus });

        const message = buildEmail(lead.source, downloadUrl);
        const mailStatus = await brevo(config, "/smtp/email", {
          sender: { email: config.senderEmail, name: "OffboardSet" },
          to: [{ email: lead.email }],
          subject: message.subject,
          htmlContent: message.html,
          textContent: message.text,
        });
        emailed = mailStatus < 300;
        if (!emailed) logger.error("Brevo email send failed", { status: mailStatus });
      } catch (err) {
        logger.error("Brevo request failed", { name: err instanceof Error ? err.name : "unknown" });
      }

      send(res, 200, { ok: true, downloadUrl, emailed });
    } catch (err) {
      // Never log the request body or any address.
      logger.error("landing_captureLead failed", { name: err instanceof Error ? err.name : "unknown" });
      send(res, 500, { ok: false, error: GENERIC_ERROR });
    }
  }
);
