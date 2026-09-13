import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Features } from "@/components/Features";
import { AIFeatures } from "@/components/AIFeatures";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Employee Offboarding Software | OffboardSet",
  description:
    "OffboardSet is employee offboarding software that turns every departure into a structured handoff — knowledge transfer, access revocation, exit interviews, and alumni management in one platform.",
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
        <Pricing />
        <Blog />
        <Contact />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
