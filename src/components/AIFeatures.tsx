import Link from "next/link";
import { Brain, FileText, MessageSquare, TrendingUp, Sparkles } from "./icons";
import { Badge } from "./ui";
import { Reveal } from "./Reveal";

const aiFeats = [
  {
    Icon: Brain,
    title: "AI knowledge gap detection",
    body: "Compares a leaver's handoff against similar past roles and flags what's missing — a repo nobody mentioned, a vendor relationship with no owner — before it becomes the next hire's problem.",
  },
  {
    Icon: FileText,
    title: "AI-summarised handoff briefs",
    body: "Every recorded walkthrough, tagged doc and Q&A thread gets condensed into one scannable brief. The successor reads a page, not a folder.",
  },
  {
    Icon: MessageSquare,
    title: "AI exit sentiment analysis",
    body: "Every exit interview response is scored for sentiment automatically, so \"it's fine\" gets checked against how it was actually said — no manual read-through required.",
  },
  {
    Icon: TrendingUp,
    title: "AI theme & risk extraction",
    body: "Patterns across every departure — compensation, management, burnout — surfaced for HR leadership as they emerge, not discovered a year later in a retention post-mortem.",
  },
];

export function AIFeatures() {
  return (
    <section
      id="ai"
      className="relative overflow-hidden py-28 md:py-36 border-b border-warm-white/[0.06]"
    >
      <div
        className="absolute hero-glow pointer-events-none"
        style={{
          top: "10%",
          right: "-8%",
          width: 640,
          height: 480,
          opacity: 0.35,
        }}
      />

      <div className="relative max-w-[1240px] mx-auto px-6 md:px-12">
        <Reveal className="max-w-3xl">
          <Badge>
            <Sparkles size={12} strokeWidth={2} />
            AI, built in
          </Badge>
          <h2
            className="font-display text-warm-white mt-5"
            style={{ fontSize: "clamp(26px, 3.4vw, 44px)", lineHeight: 1.06 }}
          >
            AI that reads the exit
            <br />
            not just{" "}
            <em className="text-teal-light" style={{ fontStyle: "italic" }}>
              logs it
            </em>
          </h2>
          <p className="text-mist text-[17px] leading-relaxed mt-5 max-w-2xl">
            No prompts to write and nothing to configure. The AI layer runs
            quietly underneath knowledge transfer and exit interviews,
            turning raw handoffs and answers into something HR can actually
            act on.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 mt-14">
          {aiFeats.map(({ Icon, title, body }, i) => (
            <Reveal
              key={title}
              delay={i * 70}
              className="relative bg-slate/35 border border-warm-white/[0.07] rounded-2xl p-8 hover:border-teal/25 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center mb-6 text-teal-light">
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <div className="font-display text-[19px] text-warm-white mb-2.5">
                {title}
              </div>
              <p className="text-mist text-[14px] leading-relaxed">{body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280} className="mt-8 text-[13px] text-mist">
          AI features are included on the{" "}
          <Link
            href="/#pricing"
            className="text-teal-light hover:text-warm-white transition-colors duration-200"
          >
            Growth plan and above
          </Link>
          .
        </Reveal>
      </div>
    </section>
  );
}
