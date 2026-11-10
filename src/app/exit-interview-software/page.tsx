import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArticleBody } from "@/components/ArticleBody";
import { Faq } from "@/components/Faq";
import { Seo } from "@/components/Seo";
import { exitInterviewFaqs, exitInterviewSoftwareBody } from "@/data/exitInterviewSoftware";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqPageSchema, webPageSchema } from "@/lib/schema";

const TITLE = "Exit Interview Software: Buyer's Guide | OffboardSet";
const DESCRIPTION =
  "Compare exit interview software: what to look for in forms, anonymity, analytics, and manager access. A buyer's guide for HR teams.";
const PATH = "/exit-interview-software";
const PUBLISHED = "2026-10-07T00:00:00.000Z";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function ExitInterviewSoftwarePage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 md:pt-36">
        <article className="max-w-[760px] mx-auto px-6 md:px-12 pb-24 md:pb-[110px]">
          <div className="text-[10px] uppercase tracking-[0.22em] text-teal-deep mb-4">
            Buyer&apos;s guide
          </div>
          <h1
            className="font-display text-ink leading-tight mb-8"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            Exit Interview Software: A Buyer&apos;s Guide for HR Teams
          </h1>

          <ArticleBody markdown={exitInterviewSoftwareBody} />

          <div className="mt-14 rounded-2xl border border-teal/25 bg-teal/[0.07] p-8 md:p-10 text-center">
            <p className="font-display text-ink text-[24px] md:text-[28px] mb-3">
              Run exit interviews as part of every exit
            </p>
            <p className="text-muted text-[16px] leading-relaxed mb-7 max-w-xl mx-auto">
              OffboardSet keeps the exit interview, handover and access removal in one plan.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 font-medium rounded-[10px] text-[15px] px-5 py-3 bg-teal text-ink hover:bg-teal-light transition-colors"
            >
              See pricing
            </Link>
          </div>
        </article>

        <Faq faqs={exitInterviewFaqs} id="faq" headingId="exit-interview-faq-heading" />
      </main>
      <Footer />
      <Seo
        jsonLd={[
          webPageSchema({
            name: "Exit Interview Software: A Buyer's Guide for HR Teams",
            description: DESCRIPTION,
            path: PATH,
            datePublished: PUBLISHED,
            dateModified: PUBLISHED,
          }),
          breadcrumbSchema([{ name: "Exit interview software", path: PATH }]),
          faqPageSchema(exitInterviewFaqs),
        ]}
      />
    </>
  );
}
