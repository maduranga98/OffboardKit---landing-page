import { Check, AlertCircle } from "./icons";
import { SectionLabel } from "./ui";
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

const checklist = [
  { label: "Handoff doc — Payments service", state: "done" },
  { label: "Record architecture walkthrough", state: "done" },
  { label: "Transfer ownership · 12 GitHub repos", state: "done" },
  {
    label: "Return MacBook Pro · Return-kit shipped",
    state: "overdue",
    dept: "IT",
  },
  { label: "Exit interview · 30 min with People team", state: "pending" },
  { label: "Final payroll + equity paperwork", state: "pending" },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-28 md:py-36">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <Reveal className="max-w-3xl">
          <SectionLabel>How it works</SectionLabel>
          <h2
            className="font-display text-warm-white mt-4"
            style={{ fontSize: "clamp(26px, 3.4vw, 44px)", lineHeight: 1.06 }}
          >
            Four steps from resignation
            <br />
            to{" "}
            <em className="text-teal-light" style={{ fontStyle: "italic" }}>
              a dignified goodbye
            </em>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mt-14 items-start">
          {/* Steps */}
          <div>
            {steps.map((s, i) => (
              <Reveal
                key={s.n}
                delay={i * 70}
                className={`flex gap-5 py-6 ${
                  i !== steps.length - 1
                    ? "border-b border-warm-white/[0.07]"
                    : ""
                }`}
              >
                <div className="w-10 h-10 shrink-0 rounded-[10px] bg-teal/[0.12] border border-teal/20 flex items-center justify-center font-display text-teal-light text-[15px]">
                  {s.n}
                </div>
                <div>
                  <div className="font-display text-[22px] text-warm-white">
                    {s.title}
                  </div>
                  <p className="text-mist text-[14.5px] leading-relaxed mt-1.5">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Checklist card */}
          <Reveal delay={140}>
            <div className="bg-slate/40 border border-warm-white/[0.08] rounded-2xl p-7 shadow-md2">
              <div className="flex items-center justify-between mb-5">
                <div className="text-mist text-[11px] uppercase tracking-[0.22em]">
                  Jordan Mills · Exit Checklist
                </div>
                <span className="text-[11px] text-teal-light bg-teal/[0.12] border border-teal/25 rounded-full px-2.5 py-0.5">
                  Active
                </span>
              </div>
              <ul className="space-y-3">
                {checklist.map((c, i) => {
                  const done = c.state === "done";
                  const overdue = c.state === "overdue";
                  return (
                    <li
                      key={i}
                      className={`flex items-center gap-3 py-2.5 px-3 rounded-lg ${
                        overdue
                          ? "bg-ember/[0.08] border border-ember/20"
                          : "border border-transparent"
                      }`}
                    >
                      {done ? (
                        <span className="w-5 h-5 rounded-full bg-teal flex items-center justify-center shrink-0">
                          <Check
                            size={12}
                            className="text-navy"
                            strokeWidth={3}
                          />
                        </span>
                      ) : overdue ? (
                        <span className="w-5 h-5 rounded-full border-2 border-ember/60 flex items-center justify-center shrink-0">
                          <AlertCircle
                            size={11}
                            className="text-ember"
                            strokeWidth={2.4}
                          />
                        </span>
                      ) : (
                        <span className="w-5 h-5 rounded-full border-2 border-warm-white/20 shrink-0" />
                      )}
                      <span
                        className={`text-[14px] flex-1 ${
                          done
                            ? "text-mist line-through decoration-mist/40"
                            : "text-warm-white"
                        }`}
                      >
                        {c.label}
                      </span>
                      {overdue && c.dept && (
                        <span className="text-[10.5px] text-ember bg-ember/15 border border-ember/30 rounded-full px-2 py-0.5 uppercase tracking-wider">
                          {c.dept} · Overdue
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6">
                <div className="h-2 rounded-full bg-warm-white/[0.08] overflow-hidden">
                  <div
                    className="h-full bg-teal-light rounded-full"
                    style={{ width: "78%" }}
                  />
                </div>
                <div className="flex items-center justify-between text-[12px] text-mist mt-2">
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
