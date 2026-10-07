import { ArrowRight } from "./icons";
import { Accent, Button, SectionHeading, SectionLabel } from "./ui";
import { Reveal } from "./Reveal";
import { PlansGrid } from "./PlansGrid";
import { comparisonExample } from "@/data/plans";

export function Pricing() {
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
            Flat, <Accent>Company-Based</Accent> Pricing
          </SectionHeading>
          <p className="text-muted text-[15px] leading-relaxed mt-4">
            One monthly fee based on company size, not per seat. A{" "}
            {comparisonExample.employees}-person company on{" "}
            {comparisonExample.perSeatVendor} pays {comparisonExample.perSeatMonthly}
            /mo for offboarding tools. On OffboardSet: {comparisonExample.flatMonthly}
            /mo.
          </p>
        </Reveal>

        <PlansGrid />

        <Reveal className="flex justify-center mt-10">
          <Button as="a" href="/pricing" variant="outline" size="md">
            See full pricing <ArrowRight size={14} />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
