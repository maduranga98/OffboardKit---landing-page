import Link from "next/link";
import { Brain, FileText, MessageSquare, TrendingUp, Sparkles } from "./icons";
import { Accent, Badge, SectionHeading } from "./ui";
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
    <section id="ai" aria-labelledby="ai-heading" className="py-24 md:py-[110px]">
      <div className="container-page">
        <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-16">
          <Reveal>
            <Badge>
              <Sparkles size={12} strokeWidth={2} />
              AI, built in
            </Badge>
            <SectionHeading id="ai-heading" className="mt-5">
              AI that reads the exit, not just <Accent>logs it</Accent>
            </SectionHeading>
            <p className="text-muted text-base leading-relaxed mt-4">
              No prompts to write and nothing to configure. The AI layer runs
              quietly underneath knowledge transfer and exit interviews,
              turning raw handoffs into something HR can act on.
            </p>
            <p className="mt-6 text-[13px] text-muted">
              Included on the{" "}
              <Link
                href="/#pricing"
                className="text-teal-deep font-medium hover:text-ink transition-colors duration-200"
              >
                Growth plan and above →
              </Link>
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4 lg:gap-[18px]">
            {aiFeats.map(({ Icon, title, body }, i) => (
              <Reveal
                key={title}
                delay={i * 70}
                className="bg-card border border-ink/[0.08] rounded-2xl p-7 hover:-translate-y-0.5 hover:shadow-card transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-[10px] bg-teal/10 border border-teal/20 flex items-center justify-center text-teal mb-5">
                  <Icon size={19} strokeWidth={1.9} />
                </div>
                <h3 className="font-display text-lg text-ink mb-2">{title}</h3>
                <p className="text-muted text-[13.5px] leading-relaxed">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
