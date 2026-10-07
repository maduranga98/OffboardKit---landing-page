import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PlansGrid } from "@/components/PlansGrid";
import { Faq } from "@/components/Faq";
import { Seo } from "@/components/Seo";
import { Check } from "@/components/icons";
import { Accent, SectionHeading, SectionLabel } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { comparisonExample } from "@/data/plans";
import { pricingFaqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqPageSchema,
  softwareApplicationSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "OffboardSet Pricing | Flat-Rate Offboarding Software",
  description:
    "OffboardSet pricing: flat company-based plans for employee offboarding software. No per-seat fees, no hidden costs.",
  path: "/pricing",
});

// Included on every plan: only items that appear in the Basic plan's feature list.
const everyPlan = [
  "Employee exit portal",
  "Offboarding templates",
  "Document upload for knowledge transfer",
  "Last working day countdown",
  "Email notifications",
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 md:pt-36">
        <section aria-labelledby="plans-heading" className="pb-24 md:pb-[110px]">
          <div className="container-page">
            <Reveal className="text-center max-w-3xl mx-auto">
              <SectionLabel>Pricing</SectionLabel>
              <SectionHeading as="h1" className="mt-3.5">
                OffboardSet Pricing: <Accent>Flat Plans</Accent> for Every Company
                Size
              </SectionHeading>
              <p className="text-muted text-[15px] leading-relaxed mt-4">
                OffboardSet is employee offboarding software priced by company
                size, not by seat. Pick the plan that fits your headcount; the
                price stays the same as people join and leave.
              </p>
            </Reveal>

            <h2 id="plans-heading" className="font-display text-ink text-center text-[22px] mt-14">
              Plans Overview
            </h2>
            <PlansGrid />
          </div>
        </section>

        <section
          aria-labelledby="compare-heading"
          className="py-24 md:py-[110px] bg-ink/[0.03] border-y border-ink/[0.07]"
        >
          <div className="container-page max-w-3xl">
            <Reveal>
              <SectionHeading id="compare-heading" className="mt-0">
                How Flat Pricing Compares to <Accent>Per-Seat Tools</Accent>
              </SectionHeading>
              {/*
                UNVERIFIED MARKETING CLAIM: the ~$1,600/mo figure is carried over verbatim
                from the live homepage and has no cited source. It lives in
                comparisonExample (src/data/plans.ts); do not add other competitor numbers.
              */}
              <div className="mt-6 rounded-2xl border border-ink/[0.08] bg-card p-7">
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted mb-4">
                  Illustrative example
                </div>
                <p className="text-ink text-[15px] leading-relaxed">
                  A {comparisonExample.employees}-person company on{" "}
                  {comparisonExample.perSeatVendor} pays{" "}
                  {comparisonExample.perSeatMonthly}/mo for offboarding tools. On
                  OffboardSet, the {comparisonExample.flatPlan} plan is{" "}
                  {comparisonExample.flatMonthly}/mo.
                </p>
                <ul className="mt-5 space-y-2 text-muted text-[13px] leading-relaxed list-disc pl-5">
                  <li>
                    Assumes {comparisonExample.employees} employees, which fits the
                    Growth plan (up to 200 employees).
                  </li>
                  <li>
                    The per-seat figure is an estimate, not a quote, and varies by
                    vendor, modules and contract.
                  </li>
                  <li>Monthly billing; annual billing gets you two months free.</li>
                </ul>
              </div>
              <p className="text-muted text-[15px] leading-relaxed mt-6">
                With a per-seat tool, every new hire raises the bill. With
                OffboardSet the fee is set by your company-size band, so you can
                budget for offboarding without tracking headcount. See the{" "}
                <Link href="/blog/best-employee-offboarding-software" className="text-teal-deep hover:underline">
                  best employee offboarding software
                </Link>{" "}
                guide for a wider comparison.
              </p>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="included-heading" className="py-24 md:py-[110px]">
          <div className="container-page max-w-3xl">
            <Reveal>
              <SectionHeading id="included-heading" className="mt-0">
                What&apos;s Included in <Accent>Every Plan</Accent>
              </SectionHeading>
              <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                {everyPlan.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 items-start bg-card border border-ink/[0.08] rounded-xl px-4 py-3 text-[14px] text-ink"
                  >
                    <Check size={15} className="text-teal mt-0.5 shrink-0" strokeWidth={2.4} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <Faq faqs={pricingFaqs} id="faq" headingId="pricing-faq-heading" />
      </main>
      <Footer />
      <Seo
        jsonLd={[
          softwareApplicationSchema(),
          faqPageSchema(pricingFaqs),
          breadcrumbSchema([{ name: "Pricing", path: "/pricing" }]),
        ]}
      />
    </>
  );
}
