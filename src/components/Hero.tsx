import Image from "next/image";
import { ArrowRight, Check } from "./icons";
import { Button } from "./ui";

const TRUST = ["No credit card", "SOC 2 Type II", "Set up in 10 minutes"];

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-navy"
    >
      <Image
        src="/images/hero-bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center -z-20"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/95 via-navy/80 to-navy/60"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(15,28,46,0.2)_0%,rgba(15,28,46,0.75)_75%)]"
      />

      <div className="container-page max-w-5xl pt-32 pb-24 md:pt-44 md:pb-32 text-center">
        <span className="animate-fade-up opacity-0 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-teal-light bg-black/30 border border-white/20 rounded-full px-4 py-2">
          Employee offboarding software
        </span>

        <h1
          id="hero-heading"
          className="font-display text-white mt-7 animate-fade-up opacity-0 [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]"
          style={{
            fontSize: "clamp(40px, 6.4vw, 72px)",
            lineHeight: 1.05,
            animationDelay: "50ms",
          }}
        >
          People leave. Their{" "}
          <em className="italic text-teal-light pr-[0.1em]">knowledge</em>{" "}
          doesn&apos;t have to.
        </h1>

        <p
          className="text-white/90 text-lg sm:text-xl leading-relaxed max-w-[62ch] mx-auto mt-7 animate-fade-up opacity-0 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]"
          style={{ animationDelay: "120ms" }}
        >
          A structured exit process for every departure — knowledge capture,
          access revocation, and staying connected, all handled before the last
          day, not after.
        </p>

        <div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-10 animate-fade-up opacity-0"
          style={{ animationDelay: "200ms" }}
        >
          <Button as="a" href="https://app.offboardset.com/signup" size="lg">
            Start your trial — no credit card <ArrowRight size={15} />
          </Button>
          <Button
            as="a"
            href="/pricing"
            variant="outline"
            size="lg"
            className="!text-white !border-white/40 hover:!bg-white/10 hover:!border-white/60 backdrop-blur-sm"
          >
            See pricing
          </Button>
        </div>

        <ul
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-[13px] text-white/75 animate-fade-up opacity-0"
          style={{ animationDelay: "300ms" }}
        >
          {TRUST.map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5">
              <Check size={13} className="text-teal-light" strokeWidth={2.4} />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
