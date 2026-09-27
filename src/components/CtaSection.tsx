import { ArrowRight, Calendar } from "./icons";
import { Button } from "./ui";
import { Reveal } from "./Reveal";

export function CtaSection() {
  return (
    <section aria-labelledby="cta-heading" className="pb-24 md:pb-[110px]">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-3xl bg-navy px-6 py-16 sm:px-12 md:py-20 text-center shadow-float">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 90% at 50% 0%, rgba(13,158,138,0.22), transparent 60%)",
            }}
          />
          <div className="relative max-w-2xl mx-auto">
            <h2
              id="cta-heading"
              className="font-display text-warm-white"
              style={{ fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: 1.04 }}
            >
              Exit with <em className="italic text-teal-light">intention.</em>
            </h2>
            <p className="text-mist text-base sm:text-[17px] leading-relaxed mt-5">
              The best offboarding is the one your leaver remembers fondly — and
              the one your company never notices, because nothing breaks.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
              <Button as="a" href="https://app.offboardset.com/signup" size="lg">
                Start free — no credit card <ArrowRight size={15} />
              </Button>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 font-medium rounded-[10px] text-[15px] px-[22px] py-[13px] text-warm-white border border-warm-white/15 hover:border-warm-white/30 hover:bg-warm-white/[0.04] transition-all duration-200"
              >
                <Calendar size={14} /> Book a 15-min demo
              </a>
            </div>
            <div className="text-mist text-[13px] mt-5">
              No credit card. Cancel anytime. Your data stays yours.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
