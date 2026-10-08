import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  BookOpen,
  Brain,
  Building,
  CheckSquare,
  Clock,
  FileText,
  Key,
  Layers,
  MessageSquare,
  RefreshCw,
  ScrollText,
  Shield,
  TrendingUp,
  User,
  Users,
} from "./icons";
import { Accent, Badge, SectionHeading, SectionLabel } from "./ui";
import { Reveal } from "./Reveal";
import { HowItWorks } from "./HowItWorks";
import { Comparison } from "./Comparison";

type IconType = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

type Card = { Icon: IconType; title: string; body: React.ReactNode };

const linkCls = "text-teal-deep hover:underline";

function CardGrid({ cards, cols = 2 }: { cards: Card[]; cols?: 2 | 3 }) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 ${
        cols === 3 ? "lg:grid-cols-3" : ""
      } gap-4 lg:gap-[18px] mt-11`}
    >
      {cards.map(({ Icon, title, body }, i) => (
        <Reveal
          key={title}
          delay={i * 60}
          className="bg-card border border-ink/[0.08] rounded-2xl p-7 hover:-translate-y-0.5 hover:shadow-card transition-all duration-200"
        >
          <div className="w-11 h-11 rounded-[10px] bg-teal/10 border border-teal/20 flex items-center justify-center text-teal mb-5">
            <Icon size={19} strokeWidth={1.9} />
          </div>
          <h3 className="font-display text-[19px] text-ink mb-2.5">{title}</h3>
          <p className="text-muted text-[14px] leading-relaxed">{body}</p>
        </Reveal>
      ))}
    </div>
  );
}

function Intro({
  label,
  id,
  heading,
  children,
}: {
  label: string;
  id: string;
  heading: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="max-w-2xl">
      <SectionLabel>{label}</SectionLabel>
      <SectionHeading id={id}>{heading}</SectionHeading>
      <p className="text-muted text-base leading-relaxed mt-4">{children}</p>
    </Reveal>
  );
}

export function WorkflowSection() {
  const cards: Card[] = [
    {
      Icon: CheckSquare,
      title: "Offboarding tasks that assign themselves",
      body: "Every departure starts from a template for the role, department and exit type. Offboarding tasks are assigned to HR, IT and the manager with deadlines counted back from the last day, so nobody has to chase a spreadsheet to find out what is still open.",
    },
    {
      Icon: RefreshCw,
      title: "Offboarding automation, not another checklist",
      body: "OffboardSet automates workflows end to end: overdue alerts fire when a task is late and each completed step is time-stamped. Offboarding automation reduces manual work for HR and removes the follow-up emails that slow every exit down.",
    },
    {
      Icon: Layers,
      title: "Offboard Flow Builder",
      body: "Build drag-and-drop exit workflows by role, tenure and department, then reuse them so every manager runs the exit the same way.",
    },
    {
      Icon: User,
      title: "Employee Exit Portal",
      body: "Leavers get one secure link, no account needed. They complete tasks, upload handoff documents and sign paperwork from any device, including their phone.",
    },
  ];

  return (
    <section
      id="features"
      aria-labelledby="workflow-heading"
      className="pt-24 md:pt-[110px]"
    >
      <div className="container-page">
        <Intro
          label="Features"
          id="workflow-heading"
          heading={
            <>
              Checklists &amp; <Accent>Workflow Automation</Accent>
            </>
          }
        >
          OffboardSet is employee offboarding software that turns every
          departure into a repeatable workflow. Instead of IT running one list
          and HR another, one template coordinates everyone, and the automation
          follows up for you.
        </Intro>

        <Reveal
          delay={80}
          className="max-w-[640px] mx-auto mt-10 rounded-2xl overflow-hidden border border-ink/[0.08]"
        >
          <Image
            src="/illustrations/workflow.webp"
            alt="A person walking through a sequence of completed checklist cards towards a secure shield"
            width={2048}
            height={1536}
            loading="lazy"
            sizes="(min-width: 700px) 640px, 100vw"
            className="w-full h-auto block"
          />
        </Reveal>

        <CardGrid cards={cards} />

        <Reveal className="mt-10 rounded-2xl border border-ink/[0.08] bg-card p-7 md:p-9 flex flex-col md:flex-row md:items-start gap-5">
          <div className="w-11 h-11 shrink-0 rounded-[10px] bg-teal/10 border border-teal/20 flex items-center justify-center text-teal">
            <Clock size={19} strokeWidth={1.9} />
          </div>
          <div>
            <h3 className="font-display text-[19px] text-ink mb-2.5">
              Built for the end of the employee lifecycle
            </h3>
            <p className="text-muted text-[14px] leading-relaxed max-w-3xl">
              Most teams have onboarding and offboarding covered on paper but
              only onboarding covered in software. OffboardSet gives the exit
              the same structure a new hire gets on day one, so the employee
              lifecycle closes as cleanly as it opens. It is not a replacement
              HR platform: it sits alongside the HRIS you already use and covers
              the exit process your HR suite only touches lightly. Not sure
              which tool fits your team? Read our{" "}
              <Link href="/blog/best-employee-offboarding-software" className={linkCls}>
                guide to the best employee offboarding software
              </Link>{" "}
              or the{" "}
              <Link href="/blog/employee-offboarding-process" className={linkCls}>
                8-step employee offboarding process
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </div>

      <Comparison />
      <HowItWorks />
    </section>
  );
}

export function AccessSection() {
  const cards: Card[] = [
    {
      Icon: Shield,
      title: "Reducing the risk of lingering access",
      body: "Access revocation is tracked app by app until it is confirmed, with overdue alerts and a full timestamped audit trail. Connected tools are revoked on the last day, not days later, which protects customer data and closes the gap that most IT offboarding leaves open.",
    },
    {
      Icon: Key,
      title: "IT offboarding in one list",
      body: (
        <>
          IT sees the same exit plan as HR and the manager, so access
          revocation and equipment return are tracked next to every other task. See the{" "}
          <Link href="/blog/it-offboarding-checklist" className={linkCls}>
            IT offboarding checklist
          </Link>{" "}
          for what to cover.
        </>
      ),
    },
  ];

  return (
    <section
      id="security"
      aria-labelledby="access-heading"
      className="pt-24 md:pt-[110px]"
    >
      <div className="container-page">
        <Intro
          label="Security"
          id="access-heading"
          heading={
            <>
              Access Revocation &amp; <Accent>IT Security</Accent>
            </>
          }
        >
          A departing employee&apos;s logins are the quietest risk in any
          exit. OffboardSet tracks every access point from the first day of
          notice to confirmed removal, so security does not depend on someone
          remembering to file a ticket.
        </Intro>
        <CardGrid cards={cards} />
        <p className="mt-6 text-[13px] text-muted">
          Want the full list?{" "}
          <Link href="/blog/it-offboarding-checklist" className="text-teal-deep font-medium hover:text-ink transition-colors duration-200">
            Use the IT offboarding checklist to revoke access without gaps →
          </Link>
        </p>
      </div>
    </section>
  );
}

export function KnowledgeSection() {
  const cards: Card[] = [
    {
      Icon: Brain,
      title: "AI knowledge gap detection",
      body: "Compares a leaver's handoff against similar past roles and flags what's missing, such as a repo nobody mentioned or a vendor relationship with no owner, before it becomes the next hire's problem.",
    },
    {
      Icon: FileText,
      title: "AI-summarised handoff briefs",
      body: "Every recorded walkthrough, tagged doc and Q&A thread gets condensed into one scannable brief. The successor reads a page, not a folder.",
    },
    {
      Icon: BookOpen,
      title: "Structured handoff sessions",
      body: (
        <>
          Leavers are prompted through structured sessions, and every
          recording, doc and decision is tagged and indexed. Start with our{" "}
          <Link href="/blog/knowledge-transfer-template" className={linkCls}>
            knowledge transfer checklist for departing employees
          </Link>
          .
        </>
      ),
    },
  ];

  return (
    <section
      id="knowledge"
      aria-labelledby="knowledge-heading"
      className="pt-24 md:pt-[110px]"
    >
      <div className="container-page">
        <Intro
          label="Knowledge"
          id="knowledge-heading"
          heading={
            <>
              Knowledge Transfer for <Accent>Departing Employees</Accent>
            </>
          }
        >
          Senior people walk out with years of context nobody wrote down.
          OffboardSet captures it before the last day with AI-guided prompts,
          so the handoff is a record the next hire can use.
        </Intro>
        <CardGrid cards={cards} cols={3} />
        <p className="mt-6 text-[13px] text-muted">
          AI features are included on the{" "}
          <Link href="/pricing" className="text-teal-deep font-medium hover:text-ink transition-colors duration-200">
            Growth plan and above →
          </Link>
        </p>
      </div>
    </section>
  );
}

export function AlumniSection() {
  const cards: Card[] = [
    {
      Icon: Users,
      title: "A corporate alumni program that runs itself",
      body: "Leavers move into the alumni portal as part of the exit, with a job board and Knowledge Threads for Q&A with former colleagues. Referrals and boomerang hires start from the people who already know your company.",
    },
    {
      Icon: Building,
      title: "Boomerang hire pipeline",
      body: (
        <>
          Track boomerang employees from the day they leave, and on Business,
          reach alumni with pulse surveys or a consulting and gig requests
          pool. Learn more in our guide to{" "}
          <Link href="/blog/boomerang-employees-alumni-rehire-program" className={linkCls}>
            boomerang employees and alumni rehire programs
          </Link>
          .
        </>
      ),
    },
  ];

  return (
    <section
      id="alumni"
      aria-labelledby="alumni-heading"
      className="pt-24 md:pt-[110px]"
    >
      <div className="container-page">
        <Intro
          label="Alumni"
          id="alumni-heading"
          heading={
            <>
              Alumni &amp; <Accent>Boomerang Employee</Accent> Network
            </>
          }
        >
          A good exit is the start of a long relationship. OffboardSet gives
          every leaver a place in your corporate alumni program, so former
          colleagues stay reachable for referrals, advice and, when the time
          is right, a return.
        </Intro>
        <CardGrid cards={cards} />
      </div>
    </section>
  );
}

export function ExitInterviewSection() {
  const cards: Card[] = [
    {
      Icon: MessageSquare,
      title: "AI exit sentiment analysis",
      body: 'Every exit interview response is scored for sentiment automatically, so "it\'s fine" gets checked against how it was actually said, with no manual read-through.',
    },
    {
      Icon: TrendingUp,
      title: "AI theme & risk extraction",
      body: (
        <>
          Patterns across every departure, such as compensation, management or
          burnout, surface for HR leadership as they emerge. Need questions to
          start from? See our{" "}
          <Link href="/blog/exit-interview-questions" className={linkCls}>
            exit interview questions
          </Link>
          .
        </>
      ),
    },
  ];

  return (
    <section
      id="exit-interviews"
      aria-labelledby="exit-interviews-heading"
      className="pt-24 md:pt-[110px]"
    >
      <div className="container-page">
        <div className="max-w-2xl">
          <Reveal>
            <Badge>AI, built in</Badge>
          </Reveal>
        </div>
        <Intro
          label="Exit interviews"
          id="exit-interviews-heading"
          heading={
            <>
              Exit Interviews, <Accent>Built In</Accent>
            </>
          }
        >
          Structured questions and sentiment analysis turn exit interviews into
          real themes. Starter includes basic exit interviews; the AI layer
          runs quietly underneath on Growth and above, with nothing to
          configure.
        </Intro>
        <CardGrid cards={cards} />
        <p className="mt-6 text-[13px] text-muted">
          Comparing tools?{" "}
          <Link href="/exit-interview-software" className="text-teal-deep font-medium hover:text-ink transition-colors duration-200">
            Read the exit interview software buyer&apos;s guide →
          </Link>
        </p>
      </div>
    </section>
  );
}

export function ComplianceSection() {
  const cards: Card[] = [
    {
      Icon: ScrollText,
      title: "A time-stamped record of every step",
      body: "Each completed task is time-stamped, and Growth adds a full audit trail, so you can show who did what and when instead of reconstructing it from email.",
    },
    {
      Icon: Shield,
      title: "Compliance audit export",
      body: (
        <>
          The Business plan adds a compliance audit export (PDF). Pair it with
          a written{" "}
          <Link href="/blog/employee-offboarding-policy-template" className={linkCls}>
            employee offboarding policy
          </Link>{" "}
          so your process and your evidence match.
        </>
      ),
    },
  ];

  return (
    <section
      id="compliance"
      aria-labelledby="compliance-heading"
      className="py-24 md:py-[110px]"
    >
      <div className="container-page">
        <Intro
          label="Compliance"
          id="compliance-heading"
          heading={
            <>
              Compliance &amp; <Accent>Audit Trail</Accent>
            </>
          }
        >
          Reducing the risk of missed access removal, unreturned equipment and
          forgotten paperwork means keeping evidence as you go. OffboardSet
          records each step as it happens, giving you proof for an auditor or a
          legal dispute.
        </Intro>
        <CardGrid cards={cards} />
      </div>
    </section>
  );
}
