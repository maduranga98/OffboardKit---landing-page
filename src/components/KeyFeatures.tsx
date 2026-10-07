import Link from "next/link";
import { CheckSquare, Clock, Layers, RefreshCw, Shield } from "./icons";
import { Accent, SectionHeading, SectionLabel } from "./ui";
import { Reveal } from "./Reveal";

const keyFeatures = [
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
    Icon: Shield,
    title: "Reducing the risk of lingering access",
    body: "Access revocation is tracked app by app until it is confirmed, with a full audit trail. Reducing the risk of former employees keeping live logins protects customer data and gives you evidence for SOC 2, ISO 27001 and any legal dispute.",
  },
  {
    Icon: Layers,
    title: "A complement to your HR platform",
    body: "OffboardSet is not a replacement HR platform. It sits alongside the HRIS you already use to manage employees and covers the exit process your HR suite only touches lightly.",
  },
];

export function KeyFeatures() {
  return (
    <section
      id="key-features"
      aria-labelledby="key-features-heading"
      className="py-24 md:py-[110px]"
    >
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <SectionLabel>Key features</SectionLabel>
          <SectionHeading id="key-features-heading">
            Key features of offboarding software that{" "}
            <Accent>does the work</Accent>
          </SectionHeading>
          <p className="text-muted text-base leading-relaxed mt-4">
            A good offboarding process is repeatable, visible and finished on
            time. These are the capabilities that make that true, whether you
            run two exits a year or twenty a month.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-[18px] mt-11">
          {keyFeatures.map(({ Icon, title, body }, i) => (
            <Reveal
              key={title}
              delay={i * 60}
              className="bg-card border border-ink/[0.08] rounded-2xl p-7 hover:-translate-y-0.5 hover:shadow-card transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-[10px] bg-teal/10 border border-teal/20 flex items-center justify-center text-teal mb-5">
                <Icon size={19} strokeWidth={1.9} />
              </div>
              <h3 className="font-display text-[19px] text-ink mb-2.5">
                {title}
              </h3>
              <p className="text-muted text-[14px] leading-relaxed">{body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 rounded-2xl border border-ink/[0.08] bg-card p-7 md:p-9 flex flex-col md:flex-row md:items-start gap-5">
          <div className="w-11 h-11 shrink-0 rounded-[10px] bg-teal/10 border border-teal/20 flex items-center justify-center text-teal">
            <Clock size={19} strokeWidth={1.9} />
          </div>
          <div>
            <h3 className="font-display text-[19px] text-ink mb-2.5">
              Built for the end of the employee lifecycle
            </h3>
            <p className="text-muted text-[14px] leading-relaxed max-w-3xl">
              Most teams already have onboarding and offboarding covered on
              paper but only onboarding covered in software. OffboardSet gives
              the exit the same structure a new hire gets on day one, so the
              employee lifecycle closes as cleanly as it opens. Not sure which
              tool fits your team? Read our{" "}
              <Link
                href="/blog/best-employee-offboarding-software"
                className="text-teal-deep hover:underline"
              >
                guide to the best employee offboarding software
              </Link>{" "}
              or the{" "}
              <Link
                href="/blog/employee-offboarding-process"
                className="text-teal-deep hover:underline"
              >
                8-step employee offboarding process
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
