import { Check } from "./icons";
import { Button, SectionLabel } from "./ui";
import { Reveal } from "./Reveal";

const plans = [
  {
    name: "Free",
    price: "0",
    annual: null,
    employees: null,
    desc: "Try the core flow on up to 3 exits. No credit card needed.",
    features: [
      "3 offboarding processes / year",
      "1 checklist template",
      "Employee exit portal",
      "1 HR user",
      "Email support (72h)",
    ],
    featured: false,
    cta: "Start free",
  },
  {
    name: "Starter",
    price: "29",
    annual: "290",
    employees: "Up to 50 employees",
    desc: "Unlimited offboarding for small teams with full checklist control.",
    features: [
      "Unlimited offboarding processes",
      "5 checklist templates",
      "Task routing by department",
      "AI-guided knowledge capture",
      "Access revocation tracker",
      "Exit interviews (fixed template)",
      "Alumni directory (view-only)",
      "3 HR / Manager users",
      "Email support (48h)",
    ],
    featured: false,
    cta: "Start 14-day trial",
  },
  {
    name: "Growth",
    price: "79",
    annual: "790",
    employees: "Up to 200 employees",
    desc: "The complete offboarding platform for growing mid-market teams.",
    features: [
      "Everything in Starter",
      "Unlimited templates",
      "Video upload + external link attach",
      "Full-text knowledge search",
      "Full alumni portal + job board",
      "Boomerang hire pipeline",
      "Pulse survey system",
      "Re-engagement score",
      "AI exit sentiment analysis",
      "Analytics (all time) + CSV export",
      "10 HR / Manager users",
      "Priority email support (24h)",
    ],
    featured: true,
    cta: "Start 14-day trial",
  },
  {
    name: "Business",
    price: "199",
    annual: "1,990",
    employees: "Up to 500 employees",
    desc: "Advanced AI, premium alumni tools, compliance exports, and full analytics.",
    features: [
      "Everything in Growth",
      "AI knowledge gap detection",
      "Ask the Expert threads",
      "Consulting / gig requests pool",
      "Reference letter + verification PDFs",
      "Compliance audit export (PDF timestamped)",
      "Advanced analytics + benchmarking",
      "Scheduled analytics reports",
      "Custom email templates (branded)",
      "25 HR / Manager users",
      "Priority chat support (8h)",
      "Dedicated 90-min onboarding session",
    ],
    featured: false,
    cta: "Book a demo",
  },
];

export function Pricing() {
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
            style={{ fontSize: "clamp(34px, 4.6vw, 56px)", lineHeight: 1.05 }}
          >
            Fair pricing, no matter
            <br />
            how fast you&apos;re{" "}
            <em className="text-teal-light" style={{ fontStyle: "italic" }}>
              growing
            </em>
          </h2>
          <p className="text-mist text-[17px] leading-relaxed mt-5">
            Company-based flat pricing — not per seat. A 200-person company on
            Rippling pays ~$1,600/mo. On OffboardKit: $79/mo.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-14 items-start">
          {plans.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 70}
              className={`relative rounded-2xl p-7 border transition-all duration-200 ${
                p.featured
                  ? "border-teal bg-teal/[0.08] shadow-teal lg:-translate-y-2"
                  : "border-warm-white/[0.08] bg-slate/35 hover:border-warm-white/20"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal text-warm-white text-[10.5px] uppercase tracking-[0.22em] rounded-full px-3 py-1 shadow-teal">
                  Most popular
                </span>
              )}
              <div className="text-warm-white font-medium">{p.name}</div>
              <div className="mt-3 flex items-baseline font-display leading-none">
                <sup className="text-xl text-mist mr-0.5 relative top-1">$</sup>
                <span className="text-5xl text-warm-white">{p.price}</span>
                <span className="text-mist text-base ml-1">/mo</span>
              </div>
              {p.annual && (
                <div className="text-mist text-[12px] mt-1">
                  ${p.annual}/yr — save 2 months
                </div>
              )}
              {p.employees && (
                <div className="text-teal-light text-[12px] mt-1.5 font-medium">
                  {p.employees}
                </div>
              )}
              <p className="text-mist text-[13.5px] mt-3 min-h-[40px]">
                {p.desc}
              </p>
              <Button
                variant={p.featured ? "primary" : "outline"}
                className="w-full mt-5"
              >
                {p.cta}
              </Button>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[13.5px] text-mist">
                    <Check
                      size={14}
                      className="text-teal mt-0.5 shrink-0"
                      strokeWidth={2.4}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 rounded-2xl border border-warm-white/[0.08] bg-slate/20 px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-warm-white font-medium text-[15px]">Enterprise — Custom pricing</div>
            <p className="text-mist text-[13.5px] mt-1">
              500+ employees · White-label portal · SSO / SAML · Dedicated account manager · SOC 2 / HIPAA docs · 99.9% SLA
            </p>
          </div>
          <a href="#contact" className="shrink-0 text-teal-light text-[13.5px] border border-teal/30 rounded-lg px-4 py-2 hover:bg-teal/10 transition-colors duration-200 whitespace-nowrap">
            Talk to sales →
          </a>
        </Reveal>

        <Reveal className="text-center text-mist text-[14px] mt-8">
          All paid plans include a 14-day free trial · Annual plans save 2 months · 30-day money-back guarantee
        </Reveal>
      </div>
    </section>
  );
}
