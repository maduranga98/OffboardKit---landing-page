"use client";

import { useState } from "react";
import { Mail, MessageSquare, Calendar, Send, Check } from "./icons";
import { Accent, Button, SectionHeading, SectionLabel } from "./ui";
import { Reveal } from "./Reveal";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  companySize: string;
  topic: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  email?: string;
  message?: string;
}

type Status = "idle" | "sending" | "sent" | "error";

const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact";

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  companySize: "",
  topic: "",
  message: "",
};

const inputCls = (err?: string) =>
  `w-full bg-card border rounded-lg px-3.5 py-2.5 text-[14px] text-ink placeholder:text-muted/60 outline-none focus:border-teal transition-all duration-200 ${
    err ? "border-ember-deep" : "border-ink/[0.12]"
  }`;

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="text-[12px] text-muted mb-1.5">
        {label}
        {required && <span className="text-teal-deep ml-0.5">*</span>}
      </div>
      {children}
      {error && <div className="text-ember-deep text-[11.5px] mt-1">{error}</div>}
    </label>
  );
}

const details = [
  { Icon: Mail, label: "Email", value: "hello@offboardset.com" },
  { Icon: MessageSquare, label: "Live chat", value: "Available 9am–6pm UTC" },
  { Icon: Calendar, label: "Book a demo", value: "Schedule 15 minutes →" },
];

export function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const set =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    const errs: FormErrors = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.email.trim()) errs.email = "Work email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.message.trim()) errs.message = "Tell us a bit about what you need";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    setServerError("");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company_website: honeypot }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data?.errors) setErrors(data.errors as FormErrors);
        setServerError(
          typeof data?.error === "string"
            ? data.error
            : "Something went wrong. Please try again."
        );
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setServerError(
        "We couldn't reach the server. Please check your connection or email us directly."
      );
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-[110px]"
    >
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left */}
          <Reveal>
            <SectionLabel>Get in touch</SectionLabel>
            <SectionHeading>
              Have a question? <br />
              <Accent>Let&apos;s talk.</Accent>
            </SectionHeading>
            <p className="text-muted text-base leading-relaxed mt-4 max-w-lg">
              We read every message. Whether you&apos;re evaluating, comparing, or
              just want to geek out about exit interview design — we&apos;re here.
            </p>
            <div className="mt-9 space-y-4">
              {details.map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-xl border border-ink/[0.08] bg-card hover:border-teal/25 transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal/10 border border-teal/20 flex items-center justify-center text-teal-deep">
                    <Icon size={17} />
                  </div>
                  <div>
                    <div className="text-[11px] text-muted uppercase tracking-widest">
                      {label}
                    </div>
                    <div className="text-[14.5px] text-ink">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <div className="bg-card border border-ink/[0.08] rounded-2xl p-6 sm:p-8 md:p-9 shadow-card">
              {status === "sent" ? (
                <div className="text-center py-10">
                  <div className="mx-auto w-14 h-14 bg-teal/15 border border-teal/30 rounded-full flex items-center justify-center mb-4">
                    <Check size={26} className="text-teal-deep" strokeWidth={2.4} />
                  </div>
                  <div className="font-display text-[26px] text-ink">
                    Message sent!
                  </div>
                  <p className="text-muted text-[14.5px] leading-relaxed mt-2 max-w-sm mx-auto">
                    Thanks for reaching out. We&apos;ll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setServerError("");
                      setErrors({});
                      setForm(EMPTY_FORM);
                    }}
                    className="text-teal-deep text-[13px] mt-6 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="First name"
                      required
                      error={errors.firstName}
                    >
                      <input
                        value={form.firstName}
                        onChange={set("firstName")}
                        placeholder="Ada"
                        className={inputCls(errors.firstName)}
                      />
                    </Field>
                    <Field label="Last name">
                      <input
                        value={form.lastName}
                        onChange={set("lastName")}
                        placeholder="Lovelace"
                        className={inputCls()}
                      />
                    </Field>
                  </div>
                  <Field label="Work email" required error={errors.email}>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="ada@acme.com"
                      className={inputCls(errors.email)}
                    />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Company size">
                      <select
                        value={form.companySize}
                        onChange={set("companySize")}
                        className={inputCls()}
                      >
                        <option value="">Select size</option>
                        <option>1–10</option>
                        <option>10–50</option>
                        <option>50–200</option>
                        <option>200–500</option>
                        <option>500+</option>
                      </select>
                    </Field>
                    <Field label="Topic">
                      <select
                        value={form.topic}
                        onChange={set("topic")}
                        className={inputCls()}
                      >
                        <option value="">Select a topic</option>
                        <option>Request a demo</option>
                        <option>Pricing question</option>
                        <option>Feature request</option>
                        <option>Technical support</option>
                        <option>Partnership enquiry</option>
                        <option>Other</option>
                      </select>
                    </Field>
                  </div>
                  <Field label="Message" required error={errors.message}>
                    <textarea
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Tell us about your team and what you're hoping to solve…"
                      className={`${inputCls(errors.message)} min-h-[120px] resize-y`}
                    />
                  </Field>
                  {/* Honeypot — hidden from people, tempting to bots */}
                  <div className="hidden" aria-hidden="true">
                    <label>
                      Company website
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </label>
                  </div>

                  {serverError && (
                    <div
                      role="alert"
                      className="rounded-lg border border-ember/30 bg-ember/10 px-3.5 py-2.5 text-ember-deep text-[12.5px]"
                    >
                      {serverError}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? (
                      "Sending…"
                    ) : (
                      <>
                        <Send size={14} /> Send message
                      </>
                    )}
                  </Button>
                  <div className="text-muted text-[12px] text-center">
                    No spam. No sales calls unless you ask. Just a genuine reply
                    from our team.
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
