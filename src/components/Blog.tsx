import { ArrowRight } from "./icons";
import { Button, SectionLabel } from "./ui";
import { Reveal } from "./Reveal";

const posts = [
  {
    tag: "Checklist",
    emoji: "📋",
    gradient: "from-teal/25 to-navy/80",
    title: "The Ultimate Employee Offboarding Checklist (2025)",
    excerpt:
      "Every step HR, IT, and managers need to complete — from resignation to alumni.",
    date: "Dec 2, 2024",
    read: "8 min read",
  },
  {
    tag: "Strategy",
    emoji: "💸",
    gradient: "from-ember/20 to-navy/80",
    title: "How Much Does a Bad Offboarding Really Cost?",
    excerpt:
      "The hidden costs go far beyond severance. Knowledge loss and security incidents add up fast.",
    date: "Nov 28, 2024",
    read: "6 min read",
  },
  {
    tag: "Knowledge Transfer",
    emoji: "🧠",
    gradient: "from-slate/80 to-teal/20",
    title: "What to Capture Before a Senior Employee Leaves",
    excerpt:
      "A structured framework for extracting institutional knowledge before the last day.",
    date: "Nov 20, 2024",
    read: "7 min read",
  },
  {
    tag: "Security",
    emoji: "🔐",
    gradient: "from-warning/20 to-navy/80",
    title:
      "Access Revocation Checklist: Every System to Revoke When an Employee Leaves",
    excerpt:
      "From Slack and GitHub to shadow IT — the complete revocation list.",
    date: "Nov 14, 2024",
    read: "5 min read",
  },
  {
    tag: "Exit Interviews",
    emoji: "💬",
    gradient: "from-blue-500/25 to-navy/80",
    title:
      "Exit Interview Questions That Actually Reveal Why People Leave",
    excerpt:
      "Most exit interviews collect nothing useful. These 12 questions change that.",
    date: "Nov 8, 2024",
    read: "9 min read",
  },
  {
    tag: "Alumni",
    emoji: "🔁",
    gradient: "from-success/25 to-navy/80",
    title: "Why Your Best Hires Might Be Former Employees",
    excerpt:
      "Boomerang employees onboard 40% faster and stay longer.",
    date: "Oct 30, 2024",
    read: "6 min read",
  },
];

function BlogThumb({ emoji, gradient }: { emoji: string; gradient: string }) {
  return (
    <div
      className={`h-40 flex items-center justify-center text-5xl bg-gradient-to-br ${gradient} relative`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy/60" />
      <span className="relative drop-shadow-lg">{emoji}</span>
    </div>
  );
}

export function Blog() {
  return (
    <section id="blog" className="py-28 md:py-36">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <Reveal className="max-w-3xl">
          <SectionLabel>From the blog</SectionLabel>
          <h2
            className="font-display text-warm-white mt-4"
            style={{ fontSize: "clamp(34px, 4.6vw, 56px)", lineHeight: 1.05 }}
          >
            Offboarding insights for{" "}
            <em className="text-teal-light" style={{ fontStyle: "italic" }}>
              HR teams
            </em>
          </h2>
          <p className="text-mist text-[17px] leading-relaxed mt-5 max-w-2xl">
            Practical playbooks on knowledge transfer, access revocation, exit
            interviews and alumni — written by HR operators, not marketers.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 50}>
              <a
                href="#"
                className="flex flex-col h-full bg-slate/35 border border-warm-white/[0.07] rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-teal/25 transition-all duration-200"
              >
                <BlogThumb emoji={p.emoji} gradient={p.gradient} />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-teal mb-3">
                    {p.tag}
                  </div>
                  <div className="text-[17px] text-warm-white leading-snug mb-2.5">
                    {p.title}
                  </div>
                  <p className="text-[14px] text-mist leading-relaxed flex-1">
                    {p.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-5 text-[12px] text-mist">
                    <span>
                      {p.date} · {p.read}
                    </span>
                    <span className="text-teal-light font-medium">Read →</span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button variant="outline" size="md">
            View all articles <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </section>
  );
}
