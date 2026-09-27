import { Check, X } from "./icons";
import { Accent, SectionHeading, SectionLabel } from "./ui";
import { Reveal } from "./Reveal";

const without = [
  "Every manager runs the exit their own way",
  "Access lingers open for weeks",
  "Pricing scales per employee",
];

const withUs = [
  "One template-driven flow for HR, IT and managers",
  "Access tracked with a timestamped audit trail",
  "One flat monthly fee, regardless of headcount",
];

export function Comparison() {
  return (
    <section aria-labelledby="why-heading" className="py-24 md:py-[110px]">
      <div className="container-page">
        <Reveal className="text-center">
          <SectionLabel>Why OffboardSet</SectionLabel>
          <SectionHeading id="why-heading">
            From <Accent tone="ember">chaotic</Accent> exits to a{" "}
            <Accent>repeatable</Accent> process
          </SectionHeading>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4 lg:gap-[18px] mt-11">
          <Reveal className="bg-card border border-ink/[0.08] rounded-2xl p-7 sm:p-8">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-ember-deep mb-5">
              Without a system
            </h3>
            <ul className="space-y-3.5">
              {without.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[14px] text-muted">
                  <X size={15} className="text-ember mt-0.5 shrink-0" strokeWidth={2.4} />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={80}
            className="bg-teal/[0.06] border border-teal/25 rounded-2xl p-7 sm:p-8"
          >
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-teal-deep mb-5">
              With OffboardSet
            </h3>
            <ul className="space-y-3.5">
              {withUs.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[14px] text-ink">
                  <Check size={15} className="text-teal mt-0.5 shrink-0" strokeWidth={2.6} />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
