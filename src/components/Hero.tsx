import Image from "next/image";
import { ArrowRight, Play, Check } from "./icons";
import { Button } from "./ui";

const stats = [
  { label: "Exits this month", value: "7" },
  { label: "Knowledge captured", value: "94%" },
  { label: "Access revoked", value: "100%" },
];

const leavers = [
  { initials: "JM", name: "Jordan Mills", role: "Senior Engineer · Last day Dec 15", pct: 78, status: "On track", warn: false },
  { initials: "SR", name: "Sarah Rahman", role: "Product Designer · Last day Dec 20", pct: 45, status: "Needs attention", warn: true },
];

function HeroDashboard() {
  return (
    <div className="rounded-[18px] overflow-hidden bg-navy shadow-float" aria-hidden="true">
      <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-warm-white/[0.08]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF6058]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28CA42]" />
        <span className="mx-auto pr-10 text-[11px] text-mist font-mono truncate">
          app.offboardset.com/dashboard
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="text-[11px] uppercase tracking-[0.18em] text-mist">
          HR · Active offboardings
        </div>

        <div className="grid grid-cols-3 gap-2.5 mt-3.5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white/[0.04] border border-warm-white/[0.08] rounded-xl p-3"
            >
              <div className="text-[9.5px] sm:text-[10px] uppercase text-mist leading-tight">
                {s.label}
              </div>
              <div className="font-display text-xl sm:text-2xl text-warm-white mt-1">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3.5 space-y-2.5">
          {leavers.map((l) => (
            <div
              key={l.name}
              className="bg-white/[0.03] border border-warm-white/[0.07] rounded-xl px-4 py-3.5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-[30px] h-[30px] shrink-0 rounded-full border flex items-center justify-center text-[11px] ${
                      l.warn
                        ? "bg-warning/20 border-warning/40 text-warning"
                        : "bg-teal/20 border-teal/40 text-teal-light"
                    }`}
                  >
                    {l.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] text-warm-white">{l.name}</div>
                    <div className="text-[11px] text-mist truncate">{l.role}</div>
                  </div>
                </div>
                <div
                  className={`shrink-0 text-[11px] rounded-full px-2.5 py-1 border ${
                    l.warn
                      ? "text-warning bg-warning/[0.12] border-warning/30"
                      : "text-teal-light bg-teal/[0.12] border-teal/30"
                  }`}
                >
                  {l.pct}% · {l.status}
                </div>
              </div>
              <div className="h-1 rounded-full bg-warm-white/[0.08] mt-3 overflow-hidden">
                <div
                  className={`h-full rounded-full ${l.warn ? "bg-warning" : "bg-teal-light"}`}
                  style={{ width: `${l.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-1.5 mt-4 pt-4 border-t border-warm-white/[0.07] text-[11px] text-mist">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-light" />
          12 systems connected · synced 2 min ago
        </div>
      </div>
    </div>
  );
}

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
          <HeroDashboard />
          <Image
            src="/illustrations/handoff.webp"
            alt="Illustration of a colleague handing a folder of documents to their successor"
            width={2048}
            height={1536}
            priority
            className="hidden sm:block absolute -bottom-12 -left-6 lg:-left-10 w-[150px] h-auto rounded-[14px] border border-ink/[0.08] shadow-[0_20px_44px_-14px_rgba(15,28,46,0.28)]"
          />
        </div>
      </div>
    </section>
  );
}
