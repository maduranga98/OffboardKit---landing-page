import { ArrowRight, Calendar } from "./icons";
import { Button, SectionLabel } from "./ui";
import { Reveal } from "./Reveal";

export function CtaSection() {
  return (
    <section className="relative border-t border-warm-white/[0.06] py-28 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 90% at 50% 0%, rgba(13,158,138,0.14), transparent 60%)",
        }}
      />
      <Reveal className="relative max-w-2xl mx-auto text-center px-6">
        <SectionLabel className="justify-center">Final word</SectionLabel>
        <h2
          className="font-display text-warm-white mt-4"
          style={{ fontSize: "clamp(30px, 4.5vw, 56px)", lineHeight: 1.02 }}
        >
          Exit with{" "}
          <em className="text-teal-light" style={{ fontStyle: "italic" }}>
            intention.
          </em>
        </h2>
        <p className="text-mist text-[17px] leading-relaxed mt-5">
          The best offboarding is the one your leaver remembers fondly — and
          the one your company never notices, because nothing breaks.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
          <Button as="a" href="https://offboardkit.web.app/signup" variant="primary" size="lg">
            Start free — no credit card <ArrowRight size={15} />
          </Button>
          <Button variant="outline" size="lg">
            <Calendar size={14} /> Book a 15-min demo
          </Button>
        </div>
        <div className="text-mist text-[13px] mt-5">
          No credit card. Cancel anytime. Your data stays yours.
        </div>
      </Reveal>
    </section>
  );
}
