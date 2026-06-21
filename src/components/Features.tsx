import {
  CheckSquare,
  User,
  BookOpen,
  Lock,
  MessageSquare,
  Users,
} from "./icons";
import { SectionLabel } from "./ui";
import { Reveal } from "./Reveal";

const feats = [
  {
    n: "01",
    Icon: CheckSquare,
    title: "Offboard Flow Builder",
    body: "Drag-and-drop exit workflows by role, tenure and department. Triggers auto-create on resignation.",
    tag: "Template library",
    featured: false,
  },
  {
    n: "02",
    Icon: User,
    title: "Employee Exit Portal",
    body: "Leavers get one link. Collect equipment, sign documents, record walk-throughs — all from their phone.",
    tag: "Mobile friendly",
    featured: false,
  },
  {
    n: "03",
    Icon: BookOpen,
    title: "Knowledge Transfer System",
    body: "Prompted brain-dump sessions, tagged docs, and AI-summarised handoff briefs for the next hire.",
    tag: "🔥 Unique to OffboardKit",
    featured: true,
  },
  {
    n: "04",
    Icon: Lock,
    title: "Access Revocation Tracker",
    body: "Track access across Slack, GitHub, AWS, Notion and more. Overdue revocation alerts and a full timestamped audit trail.",
    tag: "Audit trail",
    featured: false,
  },
  {
    n: "05",
    Icon: MessageSquare,
    title: "Exit Interview Engine",
    body: "Structured questions, sentiment analysis, and themes surfaced across every exit — not one-off anecdotes.",
    tag: "🔥 AI sentiment",
    featured: true,
  },
  {
    n: "06",
    Icon: Users,
    title: "Alumni Portal",
    body: "Stay close to former employees. Referrals, boomerang hires, and a private network that pays dividends for years.",
    tag: "🔥 Unique to OffboardKit",
    featured: true,
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-28 md:py-36 bg-slate/15 border-y border-warm-white/[0.06]"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <Reveal className="text-center max-w-3xl mx-auto">
          <SectionLabel>Features</SectionLabel>
          <h2
            className="font-display text-warm-white mt-4"
            style={{ fontSize: "clamp(34px, 4.6vw, 56px)", lineHeight: 1.05 }}
          >
            Everything an{" "}
            <em className="text-teal-light" style={{ fontStyle: "italic" }}>
              intentional exit
            </em>{" "}
            needs
          </h2>
          <p className="text-mist text-[17px] leading-relaxed mt-5">
            Six modules, one workflow. Pick the ones you need today, add the
            rest when you&apos;re ready.
          </p>
        </Reveal>

        <Reveal className="mt-14 feature-grid rounded-2xl overflow-hidden border border-warm-white/[0.06]">
          {feats.map((f) => (
            <div
              key={f.n}
              className={`bg-navy/70 p-9 hover:bg-slate/70 transition-colors duration-200 group ${
                f.featured ? "relative" : ""
              }`}
            >
              {f.featured && (
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-teal/[0.04] to-transparent" />
              )}
              <div className="relative">
                <div className="text-[11px] uppercase tracking-[0.22em] text-teal mb-5">
                  {f.n}
                </div>
                <div className="w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center mb-5 text-teal-light group-hover:bg-teal/15 transition-colors duration-200">
                  <f.Icon size={20} strokeWidth={1.8} />
                </div>
                <div className="font-display text-[22px] text-warm-white mb-2.5">
                  {f.title}
                </div>
                <p className="text-mist text-[14px] leading-relaxed">{f.body}</p>
                <span className="inline-flex items-center text-[11px] text-teal-light bg-teal/10 border border-teal/20 rounded-full px-3 py-1 mt-5">
                  {f.tag}
                </span>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
