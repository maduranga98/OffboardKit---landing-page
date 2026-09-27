import Image from "next/image";
import { ArrowRight, Play, Check } from "./icons";
import { Button } from "./ui";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="pt-28 pb-20 md:pt-[172px] md:pb-[110px]"
    >
      <div className="container-page grid lg:grid-cols-[560px_1fr] gap-14 lg:gap-16 items-center">
        <div>
          <h1
            id="hero-heading"
            className="font-display text-ink animate-fade-up opacity-0"
            style={{ fontSize: "clamp(38px, 5.2vw, 56px)", lineHeight: 1.06 }}
          >
            <span className="sr-only">Employee Offboarding Software — </span>
            People leave.
            <br />
            Their <em className="italic text-teal pr-[0.1em]">knowledge</em>
            <br />
            doesn&apos;t have to.
          </h1>

          <p
            className="text-muted text-base sm:text-lg leading-relaxed max-w-[480px] mt-6 animate-fade-up opacity-0"
            style={{ animationDelay: "100ms" }}
          >
            OffboardSet turns every departure into a structured handoff.
            Capture what&apos;s in their head with AI-guided prompts, revoke
            every access point, and stay connected — all before the last day.
          </p>

          <div
            className="flex flex-wrap items-center gap-3 mt-8 animate-fade-up opacity-0"
            style={{ animationDelay: "200ms" }}
          >
            <Button as="a" href="https://app.offboardset.com/signup" size="lg">
              Start your trial — no credit card <ArrowRight size={15} />
            </Button>
            <Button as="a" href="#how" variant="outline" size="lg">
              <Play size={13} /> See how it works
            </Button>
          </div>

          <ul
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-7 text-[13px] text-muted animate-fade-up opacity-0"
            style={{ animationDelay: "300ms" }}
          >
            {["No credit card", "SOC 2 Type II", "Set up in 10 minutes"].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <Check size={13} className="text-teal" strokeWidth={2.4} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="relative animate-fade-up opacity-0"
          style={{ animationDelay: "350ms" }}
        >
          <Image
            src="/illustrations/handoff.webp"
            alt="Illustration of a departing employee handing a folder of documents to their successor, with a completed checklist on the laptop"
            width={2048}
            height={1536}
            priority
            sizes="(min-width: 1024px) 616px, 100vw"
            className="w-full h-auto rounded-[20px] border border-ink/[0.08] shadow-[0_24px_60px_-24px_rgba(15,28,46,0.25)]"
          />
        </div>
      </div>
    </section>
  );
}
