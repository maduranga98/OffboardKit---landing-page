"use client";

import { useState } from "react";
import { Check, X } from "./icons";
import { Accent, Button, SectionHeading, SectionLabel } from "./ui";
import { Reveal } from "./Reveal";

const plans = [
  {
    name: "Basic",
    monthlyPrice: "10",
    annualPrice: "100",
    annualSaving: "20",
    employees: "Up to 10 employees",
    hrUsers: "1 HR user",
    desc: "Perfect for tiny teams with occasional exits.",
    features: [
      "3 offboardings per year",
      "1 offboarding template",
      "Checkbox & file upload tasks",
      "Last working day countdown",
      "Document upload (knowledge transfer)",
      "Employee exit portal",
      "Basic email notifications",
    ],
    notIncluded: ["Exit interviews", "Asset management", "Access revocation", "Alumni portal", "Analytics"],
    featured: false,
    cta: "Get started",
    ctaHref: "https://app.offboardset.com/signup",
  },
  {
    name: "Starter",
    monthlyPrice: "29",
    annualPrice: "290",
    annualSaving: "58",
    employees: "Up to 50 employees",
    hrUsers: "3 HR / Manager users",
    desc: "Unlimited offboardings for small businesses.",
    features: [
      "Unlimited offboardings",
      "5 offboarding templates",
      "All 6 task types + dependencies",
      "Basic exit interviews",
      "All 6 knowledge transfer item types",
      "Asset tracking (basic)",
      "Access revocation (10 integrations)",
      "Email & in-app notifications",
      "Remove OffboardSet branding",
    ],
    notIncluded: ["AI features", "Alumni portal", "Analytics dashboard", "Webhooks"],
    featured: false,
    cta: "Start trial",
    ctaHref: "https://app.offboardset.com/signup",
  },
  {
    name: "Growth",
    monthlyPrice: "79",
    annualPrice: "790",
    annualSaving: "158",
    employees: "Up to 200 employees",
    hrUsers: "10 HR / Manager users",
    desc: "The complete offboarding platform for growing teams.",
    features: [
      "Everything in Starter",
      "Unlimited templates + multi-step approvals",
      "AI exit sentiment analysis",
      "AI theme & risk extraction",
      "AI knowledge gap detection",
      "Knowledge Threads (Q&A with alumni)",
      "Full alumni portal + job board",
      "Boomerang hire pipeline",
      "Slack webhook integration",
      "Analytics (all time) + CSV / PDF export",
      "Full audit trail",
      "Priority email support (24h)",
    ],
    notIncluded: ["Pulse surveys", "Consulting pool", "Custom webhooks", "SSO / SAML"],
    featured: true,
    cta: "Start trial",
    ctaHref: "https://app.offboardset.com/signup",
  },
  {
    name: "Business",
    monthlyPrice: "199",
    annualPrice: "1,990",
    annualSaving: "398",
    employees: "Up to 500 employees",
    hrUsers: "25 HR / Manager users",
    desc: "Compliance-ready with advanced AI and alumni tools.",
    features: [
      "Everything in Growth",
      "Pulse surveys for alumni",
      "Consulting / gig requests pool",
      "Custom webhooks (HMAC-SHA256)",
      "Compliance audit export (PDF)",
      "Advanced analytics + benchmarking",
      "Scheduled analytics reports",
      "Custom branded email templates",
      "Historical trends dashboard",
      "Dedicated 90-min onboarding session",
      "Priority chat support (8h)",
    ],
    notIncluded: ["SSO / SAML", "HRIS integrations", "Custom data retention"],
    featured: false,
    cta: "Book a demo",
    ctaHref: "https://app.offboardset.com/signup",
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="py-24 md:py-[110px] bg-ink/[0.03] border-y border-ink/[0.07]"
    >
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto">
          <SectionLabel>Pricing</SectionLabel>
          <SectionHeading id="pricing-heading">
            Company-based pricing. <Accent>Not per seat.</Accent>
          </SectionHeading>
          <p className="text-muted text-[15px] leading-relaxed mt-4">
            A 200-person company on Rippling pays ~$1,600/mo for offboarding
            tools. On OffboardSet: $79/mo.
          </p>
        </Reveal>

        {/* Billing toggle */}
        <Reveal className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setAnnual(false)}
            className={`text-[13px] font-medium transition-colors duration-200 ${
              annual ? "text-muted" : "text-ink"
            }`}
          >
            Monthly
          </button>
          <button
            role="switch"
            aria-checked={annual}
            onClick={() => setAnnual((v) => !v)}
            className={`relative w-12 h-6 rounded-full border transition-colors duration-300 ${
              annual ? "bg-teal border-teal" : "bg-ink/10 border-ink/10"
            }`}
            aria-label="Annual billing"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                annual ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`text-[13px] font-medium transition-colors duration-200 flex items-center gap-1.5 ${
              annual ? "text-ink" : "text-muted"
            }`}
          >
            Annual
            <span className="text-[11px] bg-teal/10 text-teal-deep border border-teal/25 rounded-full px-2 py-0.5 font-medium">
              Save 2 months
            </span>
          </button>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 items-start">
          {plans.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 70}
              className={`relative rounded-2xl p-6 border flex flex-col transition-all duration-200 ${
                p.featured
                  ? "border-teal bg-[#EAF4EF] shadow-teal lg:-mt-2"
                  : "border-ink/[0.08] bg-card hover:shadow-card hover:-translate-y-0.5"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal text-ink text-[10px] font-medium uppercase tracking-[0.16em] rounded-full px-3 py-1 whitespace-nowrap">
                  Most popular
                </span>
              )}
              <h3 className={`text-ink font-semibold text-[14px] ${p.featured ? "mt-2" : ""}`}>
                {p.name}
              </h3>
              <div className="mt-2 flex items-baseline">
                <span className="font-display text-[32px] leading-none text-ink">
                  ${annual ? p.annualPrice : p.monthlyPrice}
                </span>
                <span className="text-muted text-[13px] ml-1">
                  {annual ? "/yr" : "/mo"}
                </span>
              </div>
              {annual && (
                <div className="text-teal-deep text-[11px] mt-1.5 font-medium">
                  Save ${p.annualSaving} vs monthly
                </div>
              )}
              <div className="text-teal-deep text-[12px] mt-1.5 font-medium">
                {p.employees}
              </div>
              <div className="text-muted text-[11.5px] mt-0.5">{p.hrUsers}</div>
              <p className="text-muted text-[12.5px] mt-3 leading-relaxed min-h-[38px]">
                {p.desc}
              </p>

              <Button
                as="a"
                href={p.ctaHref}
                variant={p.featured ? "primary" : "outline"}
                className="w-full mt-5"
                size="md"
              >
                {p.cta}
              </Button>

              <ul className="mt-5 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2 text-[12.5px] text-ink/80">
                    <Check size={13} className="text-teal mt-0.5 shrink-0" strokeWidth={2.4} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {p.notIncluded.length > 0 && (
                <ul className="mt-3 space-y-1.5 border-t border-ink/[0.07] pt-3">
                  {p.notIncluded.map((f) => (
                    <li key={f} className="flex gap-2 text-[12px] text-muted/70">
                      <X size={12} className="mt-0.5 shrink-0 text-muted/50" strokeWidth={2} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>

        {/* Enterprise row */}
        <Reveal className="mt-5 rounded-2xl border border-ink/[0.08] bg-card px-6 sm:px-7 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-ink font-semibold text-[15px] flex items-center gap-2">
              Enterprise
              <span className="text-[11px] font-normal bg-ink/[0.06] text-muted rounded-full px-2 py-0.5">
                Custom pricing
              </span>
            </div>
            <p className="text-muted text-[12.5px] mt-1 leading-relaxed">
              500+ employees · Unlimited users · White-label portal · SSO / SAML · HRIS integrations (BambooHR, Workday, Rippling, ADP) · Okta / Azure AD · GDPR / HIPAA · SOC 2 Type II · 99.9% SLA · Dedicated account manager
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 text-teal-deep text-[13px] border border-teal/30 rounded-lg px-4 py-2 hover:bg-teal/10 transition-colors duration-200 whitespace-nowrap font-medium"
          >
            Talk to sales →
          </a>
        </Reveal>

        <Reveal className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          {[
            "30-day money-back guarantee on annual plans",
            "No credit card required to start",
            "Non-profits get 30% off · Startups 20% off first year",
          ].map((text) => (
            <div
              key={text}
              className="bg-card/60 border border-ink/[0.06] rounded-xl px-4 py-3 text-muted text-[12px]"
            >
              {text}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
