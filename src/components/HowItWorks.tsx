import { Check, AlertCircle } from "./icons";
import { Accent, SectionHeading, SectionLabel } from "./ui";
import { Reveal } from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Trigger starts the flow",
    body: "Resignation filed in your HRIS auto-creates an exit plan. Manager, IT and HR are notified in the same minute.",
  },
  {
    n: "02",
    title: "Knowledge capture kicks in",
    body: "Leaver is prompted through structured handoff sessions. Every recording, doc, and decision gets tagged and indexed.",
  },
  {
    n: "03",
    title: "Access revocation by system",
    body: "Connected tools get revoked on the last day, not days later. Nothing gets missed, nothing gets over-revoked.",
  },
  {
    n: "04",
    title: "Close the loop with alumni",
    body: "Exit interview analysed. Leaver added to alumni network. Insights surface in your quarterly retention review.",
  },
];

type ItemState = "done" | "overdue" | "pending";

const checklist: { label: string; state: ItemState; dept?: string }[] = [
  { label: "Handoff doc — Payments service", state: "done" },
  { label: "Record architecture walkthrough", state: "done" },
  { label: "Transfer ownership · 12 GitHub repos", state: "done" },
  { label: "Return MacBook Pro · Return-kit shipped", state: "overdue", dept: "IT" },
  { label: "Exit interview · 30 min with People team", state: "pending" },
  { label: "Final payroll + equity paperwork", state: "pending" },
];

function StateIcon({ state }: { state: ItemState }) {
  if (state === "done")
    return (
      <span className="w-5 h-5 rounded-full bg-teal flex items-center justify-center shrink-0">
        <Check size={12} className="text-white" strokeWidth={3} />
      </span>
    );
  if (state === "overdue")
    return (
      <span className="w-5 h-5 rounded-full border-2 border-ember/60 flex items-center justify-center shrink-0">
        <AlertCircle size={11} className="text-ember" strokeWidth={2.4} />
      </span>
    );
  return <span className="w-5 h-5 rounded-full border-2 border-ink/15 shrink-0" />;
}

export function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-heading"
      className="py-24 md:py-[110px] bg-ink/[0.03] border-y border-ink/[0.07]"
    >
      <div className="container-page">
        <Reveal className="text-center">
          <SectionLabel>How it works</SectionLabel>
          <SectionHeading as="h3" id="how-heading">
            Four steps from resignation to <Accent>a dignified goodbye</Accent>
          </SectionHeading>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mt-12 items-center">
          <ol>
            {steps.map((s, i) => (
              <Reveal
                as="li"
                key={s.n}
                delay={i * 70}
                className={`flex gap-5 py-6 ${
                  i !== steps.length - 1 ? "border-b border-ink/[0.08]" : ""
                }`}
              >
                <div className="w-10 h-10 shrink-0 rounded-[10px] bg-teal/10 border border-teal/20 flex items-center justify-center font-display text-teal-deep text-[15px]">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-display text-xl text-ink">{s.title}</h3>
                  <p className="text-muted text-[14px] leading-relaxed mt-1.5">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={140}>
            <div className="bg-card border border-ink/[0.08] rounded-2xl p-6 sm:p-7 shadow-card">
              <div className="flex items-center justify-between mb-5 gap-3">
                <div className="text-muted text-[11px] uppercase tracking-[0.2em]">
                  Jordan Mills · Exit checklist
                </div>
                <span className="text-[11px] text-teal-deep bg-teal/10 border border-teal/25 rounded-full px-2.5 py-0.5">
                  Active
                </span>
              </div>
              <ul className="space-y-2">
                {checklist.map((c) => (
                  <li
                    key={c.label}
                    className={`flex items-center gap-3 py-2.5 px-3 rounded-lg border ${
                      c.state === "overdue"
                        ? "bg-ember/[0.06] border-ember/20"
                        : "border-transparent"
                    }`}
                  >
                    <StateIcon state={c.state} />
                    <span
                      className={`text-[14px] flex-1 ${
                        c.state === "done"
                          ? "text-muted line-through decoration-muted/40"
                          : "text-ink"
                      }`}
                    >
                      {c.label}
                    </span>
                    {c.dept && (
                      <span className="text-[10.5px] text-ember-deep bg-ember/10 border border-ember/25 rounded-full px-2 py-0.5 uppercase tracking-wider whitespace-nowrap">
                        {c.dept} · Overdue
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <div className="h-2 rounded-full bg-ink/[0.06] overflow-hidden">
                  <div className="h-full bg-teal rounded-full" style={{ width: "78%" }} />
                </div>
                <div className="flex items-center justify-between text-[12px] text-muted mt-2">
                  <span>78% complete</span>
                  <span>Last day Dec 15</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
