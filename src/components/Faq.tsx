import { Accent, SectionHeading, SectionLabel } from "./ui";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "What is employee offboarding software?",
    a: "It replaces the scattered spreadsheets and tribal memory HR teams rely on when someone leaves — one structured checklist, one place to capture knowledge, one tracked access-revocation list.",
  },
  {
    q: "How is OffboardSet different from Rippling or BambooHR?",
    a: "Rippling and BambooHR are full HR suites where offboarding is one small module, usually priced per employee. OffboardSet is built only for exits — knowledge transfer, access revocation, exit interviews and an alumni portal — for one flat monthly fee based on company size. It works alongside the HRIS you already use.",
  },
  {
    q: "Do departing employees need to create an account?",
    a: "No. Leavers get a single secure link to their exit portal, where they can complete tasks, upload handoff documents and sign paperwork from any device, including their phone.",
  },
  {
    q: "Is there a free trial, and what does it cost?",
    a: "Starter and Growth include a 14-day free trial with no credit card required. Plans start at $10/month for up to 10 employees, with Starter at $29, Growth at $79 and Business at $199 per month. Annual billing gets you two months free.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-24 md:py-[110px]">
      <div className="container-page grid lg:grid-cols-[340px_1fr] gap-8 lg:gap-16">
        <Reveal>
          <SectionLabel>FAQ</SectionLabel>
          <SectionHeading id="faq-heading">
            Questions, answered <Accent>honestly</Accent>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
