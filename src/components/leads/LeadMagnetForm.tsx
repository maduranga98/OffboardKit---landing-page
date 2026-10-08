"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { LEAD_CAPTURE_ENABLED, LEAD_ENDPOINT } from "@/lib/leadCapture";
import type { LeadFormStatus, LeadMagnetFormProps, LeadResponse } from "./LeadMagnetForm.types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LeadMagnetForm({ source, checklistTitle }: LeadMagnetFormProps) {
  const uid = useId();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<LeadFormStatus>("idle");
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [emailed, setEmailed] = useState(true);

  if (!LEAD_CAPTURE_ENABLED) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed) || trimmed.length > 254) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }
    if (!consent) {
      setStatus("error");
      setMessage("Please tick the box to receive the checklist.");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source, consent, website }),
      });
      const data = (await res.json().catch(() => ({}))) as LeadResponse;
      if (res.ok && data.ok && data.downloadUrl) {
        setDownloadUrl(data.downloadUrl);
        setEmailed(data.emailed !== false);
        setStatus("success");
        return;
      }
      setStatus("error");
      setMessage(
        res.status === 429
          ? "Too many requests from your network. Please try again later."
          : "Something went wrong. Please try again."
      );
    } catch {
      setStatus("error");
      setMessage("We couldn't reach the server. Please check your connection and try again.");
    }
  };

  return (
    <div
      className="no-print rounded-2xl border border-ink/[0.08] bg-card p-6 md:p-7"
      aria-labelledby={`${uid}-heading`}
      role="region"
    >
      <h3 id={`${uid}-heading`} className="font-display text-ink text-[20px] mb-1">
        Get the printable PDF
      </h3>
      <p className="text-muted text-[14px] leading-relaxed mb-5">
        The checklist above is free to read, print and copy. Enter your email to get the{" "}
        {checklistTitle} as a PDF.
      </p>

      {status === "success" ? (
        <div role="status" aria-live="polite">
          <p className="text-ink text-[15px] mb-3">
            {emailed
              ? "Thanks. Your PDF is ready, and we've emailed you a copy."
              : "Thanks. Your PDF is ready. We couldn't send the email, so use the link below."}
          </p>
          <a
            href={downloadUrl}
            download
            className="inline-flex items-center justify-center font-medium rounded-[10px] text-[14px] px-4 py-2.5 bg-teal text-ink hover:bg-teal-light transition-colors"
          >
            Download the PDF
          </a>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor={`${uid}-email`} className="block text-[12px] text-muted mb-1.5">
              Work email
            </label>
            <input
              id={`${uid}-email`}
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              maxLength={254}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full bg-card border border-ink/[0.12] rounded-lg px-3.5 py-2.5 text-[14px] text-ink placeholder:text-muted/60 outline-none focus:border-teal transition-all duration-200"
            />
          </div>

          {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor={`${uid}-website`}>Website</label>
            <input
              id={`${uid}-website`}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              id={`${uid}-consent`}
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-teal"
            />
            <label htmlFor={`${uid}-consent`} className="text-[13px] text-muted leading-relaxed">
              Send me this checklist and occasional OffboardSet product emails. Unsubscribe anytime.{" "}
              <Link href="/privacy" className="text-teal-deep hover:underline">
                Privacy policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center font-medium rounded-[10px] text-[14px] px-4 py-2.5 bg-teal text-ink hover:bg-teal-light transition-colors disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Email me the PDF"}
          </button>

          <p
            role="status"
            aria-live="polite"
            className={`text-[13px] min-h-[1.25rem] ${status === "error" ? "text-ember-deep" : "text-muted"}`}
          >
            {status === "error" ? message : ""}
          </p>
        </form>
      )}
    </div>
  );
}
