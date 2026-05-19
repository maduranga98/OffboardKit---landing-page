import { ArrowRight, Play, Check } from "./icons";
import { Badge, Button } from "./ui";
import { DashboardPreview } from "./DashboardPreview";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-44 md:pb-32"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 hero-grid pointer-events-none" />
      <div
        className="absolute hero-glow pointer-events-none"
        style={{
          top: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 880,
          height: 520,
          opacity: 0.55,
        }}
      />
      <div
        className="absolute hero-glow pointer-events-none"
        style={{ top: "60%", left: "10%", width: 420, height: 280, opacity: 0.25 }}
      />

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid lg:grid-cols-[1.1fr_1.2fr] gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <div
              className="animate-fade-up opacity-0"
              style={{ animationDelay: "0ms" }}
            >
              <Badge>
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-light opacity-75" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-teal-light" />
                </span>
                Now in early access — join 200+ HR teams
              </Badge>
            </div>

            <h1
              id="hero-heading"
              className="font-display text-warm-white mt-6 animate-fade-up opacity-0 leading-[1.05] sm:leading-[1.02] break-words"
              style={{
                fontSize: "clamp(34px, 8vw, 78px)",
                animationDelay: "100ms",
              }}
            >
              People leave.
              <br />
              Their{" "}
              <em className="text-teal-light" style={{ fontStyle: "italic" }}>
                knowledge
              </em>
              <br />
              doesn&apos;t have to.
            </h1>

            <p
              className="text-mist text-base sm:text-lg leading-relaxed max-w-xl mt-5 sm:mt-6 animate-fade-up opacity-0"
              style={{ animationDelay: "200ms" }}
            >
              OffboardSet turns every departure into a structured handoff.
              Capture what&apos;s in their head, revoke every access point, and stay
              connected — all before the last day.
            </p>

            <div
              className="flex flex-wrap items-center gap-3 mt-8 animate-fade-up opacity-0"
              style={{ animationDelay: "300ms" }}
            >
              <Button variant="primary" size="lg">
                Start free — 3 exits on us <ArrowRight size={15} />
              </Button>
              <Button variant="outline" size="lg">
                <Play size={14} /> Watch 2-min demo
              </Button>
            </div>

            <div
              className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-7 text-[13px] text-mist animate-fade-up opacity-0"
              style={{ animationDelay: "400ms" }}
            >
              {["No credit card", "SOC 2 Type II", "Set up in 10 minutes"].map(
                (t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <Check size={13} className="text-teal-light" strokeWidth={2.2} />{" "}
                    {t}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Dashboard */}
          <div
            className="animate-fade-up opacity-0 relative"
            style={{ animationDelay: "500ms" }}
          >
            <div className="absolute -inset-4 bg-teal/5 rounded-3xl blur-2xl pointer-events-none" />
            <div className="relative">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
