import { Accent, SectionHeading, SectionLabel } from "./ui";
import { Reveal } from "./Reveal";
import type { FaqItem } from "@/data/faqs.types";

/**
 * Visible FAQ list. The page passes the same array to faqPageSchema() for JSON-LD,
 * so the markup and the structured data can never drift apart.
 */
export function Faq({
  faqs,
  id = "faq",
  headingId = "faq-heading",
}: {
  faqs: FaqItem[];
  id?: string;
  headingId?: string;
}) {
  return (
    <section id={id} aria-labelledby={headingId} className="py-24 md:py-[110px]">
      <div className="container-page grid lg:grid-cols-[340px_1fr] gap-8 lg:gap-16">
        <Reveal>
          <SectionLabel>FAQ</SectionLabel>
          <SectionHeading id={headingId}>
            Frequently Asked <Accent>Questions</Accent>
          </SectionHeading>
        </Reveal>

        <Reveal delay={80}>
          {faqs.map(({ q, a }, i) => (
            <details
              key={q}
              open={i === 0}
              className="group border-b border-ink/[0.08] last:border-b-0"
            >
              <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-[17px] text-ink">{q}</h3>
                <span
                  aria-hidden="true"
                  className="relative w-7 h-7 shrink-0 rounded-full border border-ink/[0.12] text-muted transition-colors duration-200 group-open:bg-teal/15 group-open:border-teal/30 group-open:text-teal"
                >
                  <span className="absolute left-1/2 top-1/2 w-2.5 h-px -translate-x-1/2 -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-1/2 w-px h-2.5 -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-200 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="text-muted text-[14px] leading-relaxed -mt-1 pb-5 max-w-[640px]">
                {a}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
