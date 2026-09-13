import { defineSecret, defineString } from "firebase-functions/params";
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import nodemailer from "nodemailer";

/**
 * SMTP credentials.
 *
 * The password lives in Secret Manager, never in the repo. Set it once with:
 *   firebase functions:secrets:set SMTP_PASSWORD
 *
 * Everything else is a deploy-time param with a sane default, overridable in
 * functions/.env or via `firebase deploy` prompts.
 */
const SMTP_PASSWORD = defineSecret("SMTP_PASSWORD");
const SMTP_HOST = defineString("SMTP_HOST", { default: "mail.spacemail.com" });
const SMTP_PORT = defineString("SMTP_PORT", { default: "465" });
const SMTP_USER = defineString("SMTP_USER", { default: "hello@offboardset.com" });
const CONTACT_TO = defineString("CONTACT_TO", { default: "hello@offboardset.com" });

const MAX_LENGTHS = {
  firstName: 100,
  lastName: 100,
  email: 254,
  companySize: 50,
  topic: 100,
  message: 5000,
} as const;

type FieldName = keyof typeof MAX_LENGTHS;

interface Submission {
  firstName: string;
  lastName: string;
  email: string;
  companySize: string;
  topic: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Coerce an unknown JSON value into a trimmed, length-capped string. */
function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Escape for safe interpolation into the HTML part of the email. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip CR/LF so submitted text can never inject extra mail headers. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/**
 * Best-effort in-memory rate limit. Cloud Functions scales horizontally so
 * this is per-instance rather than global — enough to stop a naive flood,
 * not a substitute for App Check or a real WAF.
 */
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 10_000) hits.clear();
  return false;
}

function validate(body: Record<string, unknown>): {
  data?: Submission;
  errors: Partial<Record<FieldName, string>>;
} {
  const data: Submission = {
    firstName: str(body.firstName, MAX_LENGTHS.firstName),
    lastName: str(body.lastName, MAX_LENGTHS.lastName),
    email: str(body.email, MAX_LENGTHS.email),
    companySize: str(body.companySize, MAX_LENGTHS.companySize),
    topic: str(body.topic, MAX_LENGTHS.topic),
    message: str(body.message, MAX_LENGTHS.message),
  };

  const errors: Partial<Record<FieldName, string>> = {};
  if (!data.firstName) errors.firstName = "First name is required";
  if (!data.email) errors.email = "Work email is required";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Enter a valid email";
  if (!data.message) errors.message = "Tell us a bit about what you need";

  return Object.keys(errors).length ? { errors } : { data, errors };
}

function buildEmail(data: Submission) {
  const name = [data.firstName, data.lastName].filter(Boolean).join(" ");
  const topic = data.topic || "General enquiry";

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", data.email],
    ["Company size", data.companySize || "—"],
    ["Topic", topic],
  ];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    data.message,
  ].join("\n");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#0F1C2E;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#16263D;border:1px solid rgba(245,240,232,.08);border-radius:16px;padding:28px;">
      <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#12C4AD;">
        New contact form submission
      </div>
      <h1 style="margin:12px 0 20px;font-size:20px;color:#F5F0E8;font-weight:600;">
        ${esc(topic)}
      </h1>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#F5F0E8;">
        ${rows
          .map(
            ([k, v]) => `<tr>
          <td style="padding:6px 0;color:#9BAAC0;width:130px;vertical-align:top;">${esc(k)}</td>
          <td style="padding:6px 0;">${esc(v)}</td>
        </tr>`
          )
          .join("\n        ")}
      </table>
      <div style="margin-top:20px;padding-top:20px;border-top:1px solid rgba(245,240,232,.08);">
        <div style="font-size:12px;color:#9BAAC0;margin-bottom:8px;">Message</div>
        <div style="font-size:14px;line-height:1.6;color:#F5F0E8;white-space:pre-wrap;">${esc(
          data.message
        )}</div>
      </div>
      <div style="margin-top:24px;font-size:12px;color:#9BAAC0;">
        Reply directly to this email to reach ${esc(name || data.email)}.
      </div>
    </div>
  </body>
</html>`;

  return {
    // Must be the authenticated mailbox — SpaceMail rejects a From it does not
    // own, and spoofing the visitor's domain would fail SPF/DMARC anyway.
    from: `"OffboardSet Website" <${SMTP_USER.value()}>`,
    to: CONTACT_TO.value(),
    replyTo: `"${headerSafe(name) || "Website visitor"}" <${headerSafe(data.email)}>`,
    subject: `[OffboardSet] ${headerSafe(topic)} — ${headerSafe(name) || data.email}`,
    text,
    html,
  };
}

export const contact = onRequest(
  { region: "us-central1", secrets: [SMTP_PASSWORD], maxInstances: 10, cors: false },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.set("Allow", "POST").status(204).send("");
      return;
    }
    if (req.method !== "POST") {
      res.set("Allow", "POST").status(405).json({ error: "Method not allowed" });
      return;
    }

    const ip = req.ip || "unknown";
    if (rateLimited(ip)) {
      res.status(429).json({ error: "Too many submissions. Please try again later." });
      return;
    }

    const body: Record<string, unknown> =
      req.body && typeof req.body === "object" ? (req.body as Record<string, unknown>) : {};

    // Honeypot: real users never fill a field they cannot see.
    if (str(body.company_website, 200)) {
      logger.info("Contact form honeypot triggered", { ip });
      res.status(200).json({ ok: true });
      return;
    }

    const { data, errors } = validate(body);
    if (!data) {
      res.status(400).json({ error: "Please check the form and try again.", errors });
      return;
    }

    const password = SMTP_PASSWORD.value();
    if (!password) {
      logger.error("SMTP_PASSWORD is not set — cannot send contact email");
      res.status(500).json({ error: "Email is not configured yet. Please try again later." });
      return;
    }

    const port = Number(SMTP_PORT.value());
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST.value(),
      port,
      secure: port === 465, // implicit TLS on 465, STARTTLS on 587
      auth: { user: SMTP_USER.value(), pass: password },
    });

    try {
      await transporter.sendMail(buildEmail(data));
      logger.info("Contact email sent", { topic: data.topic || "General enquiry" });
      res.status(200).json({ ok: true });
    } catch (err) {
      logger.error("Contact email failed to send", err);
      res.status(502).json({ error: "We couldn't send your message. Please email us directly." });
    }
  }
);
