"use client";

import { useState } from "react";
import { Check, X } from "./icons";
import { Button, SectionLabel } from "./ui";
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
    cta: "Start free",
    ctaHref: "https://offboardkit.web.app/signup",
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
      "Remove OffboardKit branding",
    ],
    notIncluded: ["AI features", "Alumni portal", "Analytics dashboard", "Webhooks"],
    featured: false,
    cta: "Start 14-day trial",
    ctaHref: "https://offboardkit.web.app/signup",
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
    cta: "Start 14-day trial",
    ctaHref: "https://offboardkit.web.app/signup",
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
    ctaHref: "https://offboardkit.web.app/signup",
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section
      id="pricing"
      className="py-28 md:py-36 bg-slate/15 border-t border-warm-white/[0.06]"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <Reveal className="text-center max-w-3xl mx-auto">
          <SectionLabel>Pricing</SectionLabel>
          <h2
            className="font-display text-warm-white mt-4"
            style={{ fontSize: "clamp(26px, 3.4vw, 44px)", lineHeight: 1.06 }}
          >
            Company-based pricing.{" "}
            <em className="text-teal-light" style={{ fontStyle: "italic" }}>
              Not per seat.
            </em>
          </h2>
          <p className="text-mist text-[16px] leading-relaxed mt-4">
            A 200-person company on Rippling pays ~$1,600/mo for offboarding tools. On OffboardKit: $79/mo.
          </p>
        </Reveal>

        {/* Billing toggle */}
        <Reveal className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setAnnual(false)}
            className={`text-[13px] font-medium transition-colors duration-200 ${
              !annual ? "text-warm-white" : "text-mist"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual((v) => !v)}
            className={`relative w-12 h-6 rounded-full border transition-colors duration-300 ${
              annual
                ? "bg-teal border-teal"
                : "bg-slate/40 border-warm-white/15"
            }`}
            aria-label="Toggle annual billing"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-warm-white shadow transition-transform duration-300 ${
                annual ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`text-[13px] font-medium transition-colors duration-200 flex items-center gap-1.5 ${
              annual ? "text-warm-white" : "text-mist"
            }`}
          >
            Annual
            <span className="text-[11px] bg-teal/20 text-teal-light border border-teal/25 rounded-full px-2 py-0.5 font-medium">
              Save 2 months
            </span>
          </button>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 items-start">
          {plans.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 70}
              className={`relative rounded-2xl p-6 border flex flex-col transition-all duration-200 ${
                p.featured
                  ? "border-teal bg-teal/[0.07] shadow-teal lg:-translate-y-2"
                  : "border-warm-white/[0.08] bg-slate/35 hover:border-warm-white/20 hover:-translate-y-0.5"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal text-warm-white text-[10px] uppercase tracking-[0.22em] rounded-full px-3 py-1 shadow-teal whitespace-nowrap">
                  ⭐ Most popular
                </span>
              )}
              <div>
                <div className="text-warm-white font-semibold text-[15px]">{p.name}</div>
                <div className="mt-3 flex items-baseline font-display leading-none">
                  <sup className="text-lg text-mist mr-0.5 relative top-1">$</sup>
                  <span className="text-4xl text-warm-white font-display">
                    {annual ? p.annualPrice : p.monthlyPrice}
                  </span>
                  <span className="text-mist text-[13px] ml-1.5">
                    {annual ? "/yr" : "/mo"}
                  </span>
                </div>
                {annual && (
                  <div className="text-teal-light text-[11px] mt-1.5 font-medium">
                    Save ${p.annualSaving} vs monthly
                  </div>
                )}
                <div className="text-teal-light text-[11.5px] mt-1.5 font-medium">
                  {p.employees}
                </div>
                <div className="text-mist text-[11px] mt-0.5">{p.hrUsers}</div>
                <p className="text-mist text-[12.5px] mt-3 leading-relaxed min-h-[36px]">
                  {p.desc}
                </p>
              </div>

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
                  <li key={f} className="flex gap-2 text-[12.5px] text-mist">
                    <Check
                      size={13}
                      className="text-teal mt-0.5 shrink-0"
                      strokeWidth={2.4}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {p.notIncluded.length > 0 && (
                <ul className="mt-3 space-y-1.5 border-t border-warm-white/[0.06] pt-3">
                  {p.notIncluded.map((f) => (
                    <li key={f} className="flex gap-2 text-[12px] text-mist/50">
                      <X
                        size={12}
                        className="mt-0.5 shrink-0 text-mist/40"
                        strokeWidth={2}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>

        {/* Enterprise row */}
        <Reveal className="mt-6 rounded-2xl border border-warm-white/[0.08] bg-slate/20 px-7 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-warm-white font-semibold text-[15px] flex items-center gap-2">
              🏛️ Enterprise
              <span className="text-[11px] bg-warm-white/10 text-mist rounded-full px-2 py-0.5">Custom pricing</span>
            </div>
            <p className="text-mist text-[12.5px] mt-1 leading-relaxed">
              500+ employees · Unlimited users · White-label portal · SSO / SAML · HRIS integrations (BambooHR, Workday, Rippling, ADP) · Okta / Azure AD · GDPR / HIPAA · SOC 2 Type II · 99.9% SLA · Dedicated account manager
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 text-teal-light text-[13px] border border-teal/30 rounded-lg px-4 py-2 hover:bg-teal/10 transition-colors duration-200 whitespace-nowrap font-medium"
          >
            Talk to sales →
          </a>
        </Reveal>

        <Reveal className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          {[
            { emoji: "✅", text: "30-day money-back guarantee on annual plans" },
            { emoji: "🔒", text: "No credit card required to start" },
            { emoji: "💸", text: "Non-profits get 30% off · Startups 20% off first year" },
          ].map(({ emoji, text }) => (
            <div
              key={text}
              className="bg-slate/20 border border-warm-white/[0.06] rounded-xl px-4 py-3 text-mist text-[12px]"
            >
              <span className="mr-1.5">{emoji}</span>
              {text}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
