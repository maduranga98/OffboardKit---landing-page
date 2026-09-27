import Image from "next/image";
import { FileText, Lock, Clock, BarChart2 } from "./icons";
import { Accent, SectionHeading, SectionLabel } from "./ui";
import { Reveal } from "./Reveal";

const pains = [
  {
    Icon: FileText,
    title: "Lost tribal knowledge",
    body: "Senior engineers walk out with years of context nobody wrote down.",
  },
  {
    Icon: Lock,
    title: "Security blind spots",
    body: "37 SaaS tools. Admin access nobody audits. A ticking timebomb.",
  },
  {
    Icon: Clock,
    title: "Checklist chaos",
    body: "IT runs one list, HR another. Things fall through every exit.",
  },
  {
    Icon: BarChart2,
    title: "No exit data",
    body: "You suspect why people leave. You'll never actually know.",
  },
];

export function Problem() {
  return (
    <section aria-labelledby="problem-heading" className="pb-24 md:pb-[110px]">
      <div className="container-page">
        <div className="grid lg:grid-cols-[1fr_460px] gap-10 lg:gap-14 items-center">
          <Reveal>
            <SectionLabel>The problem</SectionLabel>
            <SectionHeading id="problem-heading" className="mt-3.5 max-w-xl">
              Every exit is a <Accent>crisis</Accent>{" "}you shouldn&apos;t be
              managing alone
            </SectionHeading>
            <p className="text-muted text-base leading-relaxed mt-4 max-w-lg">
              Offboarding is the most unglamorous, most expensive,
              most-likely-to-get-you-sued part of HR.
            </p>
          </Reveal>
          <Reveal delay={100} className="rounded-2xl overflow-hidden border border-ink/[0.08]">
            <Image
              src="/illustrations/chaos.webp"
              alt="Scattered sticky notes, an unlocked padlock and a half-finished checklist — a disorganised handoff"
              width={2048}
              height={1152}
              sizes="(min-width: 1024px) 460px, 100vw"
              className="w-full h-auto block"
            />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-[18px] mt-11">
          {pains.map(({ Icon, title, body }, i) => (
            <Reveal
              key={title}
              delay={i * 60}
              className="bg-card border border-ink/[0.08] rounded-2xl p-[26px] hover:-translate-y-1 hover:shadow-card transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-[10px] bg-ember/10 border border-ember/20 flex items-center justify-center text-ember mb-4">
                <Icon size={17} strokeWidth={2} />
              </div>
              <h3 className="font-display text-[17px] text-ink mb-2">{title}</h3>
              <p className="text-muted text-[13.5px] leading-relaxed">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
