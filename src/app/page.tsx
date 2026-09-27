import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Features } from "@/components/Features";
import { AIFeatures } from "@/components/AIFeatures";
import { HowItWorks } from "@/components/HowItWorks";
import { Comparison } from "@/components/Comparison";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: { absolute: "Employee Offboarding Software for HR Teams | OffboardSet" },
  description:
    "Employee offboarding software that automates checklists, access revocation, knowledge transfer, and exit interviews. Plans from $10/month.",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Features />
        <AIFeatures />
        <HowItWorks />
        <Comparison />
        <Pricing />
        <Faq />
        <Blog />
        <Contact />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
