import Image from "next/image";
import {
  CheckSquare,
  User,
  BookOpen,
  Key,
  MessageSquare,
  Users,
} from "./icons";
import { Accent, SectionHeading, SectionLabel } from "./ui";
import { Reveal } from "./Reveal";

const feats = [
  {
    Icon: CheckSquare,
    title: "Offboard Flow Builder",
    body: "Drag-and-drop exit workflows by role, tenure and department.",
    featured: false,
  },
  {
    Icon: User,
    title: "Employee Exit Portal",
    body: "Leavers get one link. Everything from their phone.",
    featured: false,
  },
  {
    Icon: BookOpen,
    title: "Knowledge Transfer",
    body: "AI-summarised handoff briefs for the next hire.",
    featured: true,
  },
  {
    Icon: Key,
    title: "Access Revocation",
    body: "Overdue alerts and a full timestamped audit trail.",
    featured: false,
  },
  {
    Icon: MessageSquare,
    title: "Exit Interview Engine",
    body: "Structured questions, sentiment analysis, real themes.",
    featured: true,
  },
  {
    Icon: Users,
    title: "Alumni Portal",
    body: "Referrals and boomerang hires, unique to OffboardSet.",
    featured: true,
  },
];

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="py-24 md:py-[110px] bg-ink/[0.03] border-y border-ink/[0.07]"
    >
      <div className="container-page">
        <Reveal className="text-center">
          <SectionLabel>Features</SectionLabel>
          <SectionHeading id="features-heading">
            Everything an <Accent>intentional exit</Accent> needs
          </SectionHeading>
        </Reveal>

        <Reveal
          delay={80}
          className="max-w-[640px] mx-auto mt-10 rounded-2xl overflow-hidden border border-ink/[0.08]"
        >
          <Image
            src="/illustrations/workflow.webp"
            alt="A person walking through a sequence of completed checklist cards towards a secure shield"
            width={2048}
            height={1536}
            sizes="(min-width: 700px) 640px, 100vw"
            className="w-full h-auto block"
          />
        </Reveal>

        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/[0.08] rounded-2xl overflow-hidden mt-11 border border-ink/[0.08]">
          {feats.map(({ Icon, title, body, featured }) => (
            <div
              key={title}
              className={`p-[30px] transition-colors duration-200 ${
                featured ? "bg-[#F6FBFA] hover:bg-[#EFF8F6]" : "bg-card hover:bg-[#FBFAF7]"
              }`}
            >
              <div className="w-11 h-11 rounded-[10px] bg-teal/10 border border-teal/20 flex items-center justify-center text-teal mb-4">
                <Icon size={19} strokeWidth={1.9} />
              </div>
              <h3 className="font-display text-lg text-ink mb-2">{title}</h3>
              <p className="text-muted text-[13.5px] leading-relaxed">{body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
