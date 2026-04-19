"use client";

import { useState } from "react";
import { Mail, MessageSquare, Calendar, Send, Check } from "./icons";
import { Button, SectionLabel } from "./ui";
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

const inputCls = (err?: string) =>
  `w-full bg-slate/50 border rounded-lg px-3.5 py-2.5 text-[14px] text-warm-white placeholder:text-mist/60 outline-none focus:border-teal transition-all duration-200 ${
    err ? "border-ember" : "border-warm-white/10"
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
      <div className="text-[12px] text-mist mb-1.5">
        {label}
        {required && <span className="text-teal-light ml-0.5">*</span>}
      </div>
      {children}
      {error && <div className="text-ember text-[11.5px] mt-1">{error}</div>}
    </label>
  );
}

const details = [
  { Icon: Mail, label: "Email", value: "hello@offboardkit.com" },
  { Icon: MessageSquare, label: "Live chat", value: "Available 9am–6pm UTC" },
  { Icon: Calendar, label: "Book a demo", value: "Schedule 15 minutes →" },
];

export function Contact() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    companySize: "",
    topic: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const set =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: FormErrors = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.email.trim()) errs.email = "Work email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.message.trim()) errs.message = "Tell us a bit about what you need";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-28 md:py-36 bg-slate/15 border-t border-warm-white/[0.06]"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <Reveal>
            <SectionLabel>Get in touch</SectionLabel>
            <h2
              className="font-display text-warm-white mt-4"
              style={{ fontSize: "clamp(34px, 4.6vw, 56px)", lineHeight: 1.05 }}
            >
              Have a question?
              <br />
              <em className="text-teal-light" style={{ fontStyle: "italic" }}>
                Let&apos;s talk.
              </em>
            </h2>
            <p className="text-mist text-[17px] leading-relaxed mt-5 max-w-lg">
              We read every message. Whether you&apos;re evaluating, comparing, or
              just want to geek out about exit interview design — we&apos;re here.
            </p>
            <div className="mt-9 space-y-4">
              {details.map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-xl border border-warm-white/[0.07] bg-navy/40 hover:border-teal/25 transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal/10 border border-teal/20 flex items-center justify-center text-teal-light">
                    <Icon size={17} />
                  </div>
                  <div>
                    <div className="text-[11px] text-mist uppercase tracking-widest">
                      {label}
                    </div>
                    <div className="text-[14.5px] text-warm-white">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <div className="bg-navy/60 border border-warm-white/[0.08] rounded-2xl p-8 md:p-9">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="mx-auto w-14 h-14 bg-teal/15 border border-teal/30 rounded-full flex items-center justify-center mb-4">
                    <Check size={26} className="text-teal-light" strokeWidth={2.4} />
                  </div>
                  <div className="font-display text-[26px] text-warm-white">
                    Message sent!
                  </div>
                  <p className="text-mist text-[14.5px] leading-relaxed mt-2 max-w-sm mx-auto">
                    Thanks for reaching out. We&apos;ll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        firstName: "",
                        lastName: "",
                        email: "",
                        companySize: "",
                        topic: "",
                        message: "",
                      });
                    }}
                    className="text-teal-light text-[13px] mt-6 hover:underline"
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
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    <Send size={14} /> Send message
                  </Button>
                  <div className="text-mist text-[12px] text-center">
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
