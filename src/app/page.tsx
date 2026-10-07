import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import {
  AccessSection,
  AlumniSection,
  ComplianceSection,
  ExitInterviewSection,
  KnowledgeSection,
  WorkflowSection,
} from "@/components/HomeSections";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { homeFaqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";
import {
  faqPageSchema,
  organizationSchema,
  softwareApplicationSchema,
  websiteSchema,
} from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Employee Offboarding Software for HR Teams | OffboardSet",
  description:
    "Employee offboarding software for HR teams: checklists, access revocation, knowledge transfer, and exit interviews. Flat pricing, no per-seat fees.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WorkflowSection />
        <AccessSection />
        <KnowledgeSection />
        <AlumniSection />
        <ExitInterviewSection />
        <ComplianceSection />
        <Pricing />
        <Faq faqs={homeFaqs} />
        <Blog />
        <Contact />
        <CtaSection />
      </main>
      <Footer />
      <Seo
        jsonLd={[
          organizationSchema(),
          websiteSchema(),
          softwareApplicationSchema(),
          faqPageSchema(homeFaqs),
        ]}
      />
    </>
  );
}
