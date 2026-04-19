import { Check } from "./icons";
import { Button, SectionLabel } from "./ui";
import { Reveal } from "./Reveal";

const plans = [
  {
    name: "Free",
    price: "0",
    desc: "Try the core flow on up to 3 exits.",
    features: [
      "3 offboardings / year",
      "Basic exit checklist",
      "Community support",
      "CSV export",
    ],
    featured: false,
    cta: "Start free",
  },
  {
    name: "Starter",
    price: "29",
    desc: "For small teams with occasional exits.",
    features: [
      "Unlimited offboardings",
      "Flow builder + templates",
      "Knowledge capture basics",
      "Exit interview engine",
      "Slack + Google Workspace",
      "Email support",
    ],
    featured: true,
    cta: "Start 14-day trial",
  },
  {
    name: "Growth",
    price: "79",
    desc: "For growing companies with monthly exits.",
    features: [
      "Everything in Starter",
      "Full access revocation suite",
      "20+ SaaS integrations",
      "Alumni portal",
      "AI sentiment analysis",
      "Priority support",
    ],
    featured: false,
    cta: "Start 14-day trial",
  },
  {
    name: "Business",
    price: "199",
    desc: "For HR teams running the whole program.",
    features: [
      "Everything in Growth",
      "SAML SSO + SCIM",
      "Advanced analytics + BI",
      "Custom integrations",
      "Dedicated CSM",
      "SOC 2 report + DPA",
    ],
    featured: false,
    cta: "Book a call",
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
            Billed per active offboarding, not per seat. Your whole company can
            use the dashboard.
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

        <Reveal className="text-center text-mist text-[14px] mt-10">
          All plans include a 14-day trial. Need something custom?{" "}
          <a href="#contact" className="text-teal-light hover:underline">
            Let&apos;s talk →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
