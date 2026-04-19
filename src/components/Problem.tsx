import { FileText, Lock, Clock, BarChart2 } from "./icons";
import { SectionLabel } from "./ui";
import { Reveal } from "./Reveal";

const pains = [
  {
    Icon: FileText,
    title: "Lost tribal knowledge",
    body: "Senior engineers walk out the door with years of context. Nobody wrote it down. Six months later, it's rediscovery from scratch.",
  },
  {
    Icon: Lock,
    title: "Security blind spots",
    body: "37 SaaS tools. Admin access to half of them. A shared password manager vault that nobody audits. It's a ticking timebomb.",
  },
  {
    Icon: Clock,
    title: "Checklist chaos",
    body: "IT runs one list. HR runs another. The manager forgets a third. Things fall through every single time, on every exit.",
  },
  {
    Icon: BarChart2,
    title: "No exit data",
    body: "You suspect people are leaving because of compensation. Or the manager. Or the roadmap. But you'll never actually know.",
  },
];

export function Problem() {
  return (
    <section className="py-28 md:py-36">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <Reveal className="max-w-3xl">
          <SectionLabel>The problem</SectionLabel>
          <h2
            className="font-display text-warm-white mt-4"
            style={{ fontSize: "clamp(34px, 4.6vw, 56px)", lineHeight: 1.05 }}
          >
            Every exit is a{" "}
            <em className="text-teal-light" style={{ fontStyle: "italic" }}>
              crisis
            </em>{" "}
            you shouldn&apos;t be managing alone
          </h2>
          <p className="text-mist text-[17px] leading-relaxed mt-5 max-w-2xl">
            Offboarding is the most unglamorous, most expensive,
            most-likely-to-get-you-sued part of HR. It&apos;s also the one nobody
            has a real tool for.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {pains.map(({ Icon, title, body }, i) => (
            <Reveal
              key={title}
              delay={i * 60}
              className="bg-slate/35 border border-warm-white/[0.07] rounded-2xl p-7 hover:-translate-y-1 hover:border-teal/25 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-ember/10 border border-ember/20 flex items-center justify-center text-ember mb-5">
                <Icon size={19} strokeWidth={1.9} />
              </div>
              <div className="font-display text-[22px] text-warm-white mb-2">
                {title}
              </div>
              <p className="text-mist text-[14px] leading-relaxed">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
