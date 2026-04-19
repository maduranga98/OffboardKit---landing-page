import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LogosStrip } from "@/components/LogosStrip";
import { Problem } from "@/components/Problem";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogosStrip />
        <Problem />
        <Features />
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
