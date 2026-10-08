"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Checklist } from "@/content/checklists/checklist.types";
import { SITE_URL } from "@/lib/site";
import { LEAD_CAPTURE_ENABLED } from "@/lib/leadCapture";
import { LeadMagnetForm } from "@/components/leads/LeadMagnetForm";
import type { CheckedMap, ChecklistViewProps } from "./ChecklistView.types";

const storageKey = (slug: string) => `offboardset:checklist:${slug}`;

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const itemKey = (si: number, ii: number) => `${si}-${ii}`;

function toPlainText(checklist: Checklist, checked: CheckedMap): string {
  const lines: string[] = [checklist.title, `${SITE_URL}${checklist.path}`, ""];
  checklist.sections.forEach((section, si) => {
    lines.push(section.heading.toUpperCase());
    section.items.forEach((item, ii) => {
      lines.push(`[${checked[itemKey(si, ii)] ? "x" : " "}] ${item.text}`);
      if (item.note) lines.push(`    ${item.note}`);
    });
    lines.push("");
  });
  lines.push("General guidance, not legal advice. Source: offboardset.com");
  return lines.join("\n");
}

const btnCls =
  "inline-flex items-center justify-center font-medium rounded-[10px] text-[14px] px-4 py-2.5 border border-ink/[0.12] text-ink hover:border-teal/40 hover:bg-card transition-colors disabled:opacity-60";

export function ChecklistView({ checklist, showIntro = false }: ChecklistViewProps) {
  const { slug, title, sections, faq } = checklist;
  const [checked, setChecked] = useState<CheckedMap>({});
  const [copyStatus, setCopyStatus] = useState("");

  const total = useMemo(() => sections.reduce((n, s) => n + s.items.length, 0), [sections]);
  const done = Object.keys(checked).length;

  // Restore saved ticks after hydration only, so the prerendered HTML is always the empty state.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey(slug));
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        const next: CheckedMap = {};
        sections.forEach((s, si) =>
          s.items.forEach((_, ii) => {
            if ((parsed as Record<string, unknown>)[itemKey(si, ii)] === true) next[itemKey(si, ii)] = true;
          })
        );
        // Reading localStorage is only possible after hydration, so this one-time sync belongs in an effect.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setChecked(next);
      }
    } catch {
      // Storage unavailable or corrupt: start empty.
    }
  }, [slug, sections]);

  const persist = useCallback(
    (next: CheckedMap) => {
      try {
        window.localStorage.setItem(storageKey(slug), JSON.stringify(next));
      } catch {
        // Ignore: ticks still work for this visit.
      }
    },
    [slug]
  );

  const toggle = (key: string) => {
    setChecked((prev) => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = true;
      persist(next);
      return next;
    });
  };

  const reset = () => {
    setChecked({});
    persist({});
  };

  const print = () => {
    const body = document.body;
    body.setAttribute("data-print-checklist", "true");
    const clear = () => {
      body.removeAttribute("data-print-checklist");
      window.removeEventListener("afterprint", clear);
    };
    window.addEventListener("afterprint", clear);
    window.print();
  };

  const copy = async () => {
    const text = toPlainText(checklist, checked);
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("Checklist copied to clipboard.");
    } catch {
      try {
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(area);
        setCopyStatus(ok ? "Checklist copied to clipboard." : "Copy failed. Select the text and copy it manually.");
      } catch {
        setCopyStatus("Copy failed. Select the text and copy it manually.");
      }
    }
    window.setTimeout(() => setCopyStatus(""), 4000);
  };

  const sectionId = (heading: string) => `${slug}-${slugify(heading)}`;

  return (
    <section data-checklist aria-labelledby={`${slug}-heading`} className="my-12">
      <h2
        id={`${slug}-heading`}
        className="font-display text-ink text-[26px] md:text-[30px] leading-tight mb-3"
      >
        {title}
      </h2>
      {showIntro && <p className="text-[17px] text-muted leading-relaxed mb-4">{checklist.intro}</p>}
      <p className="text-[13px] text-muted mb-6">
        General guidance, not legal advice. Adapt it to your own policies, contracts and local rules.
      </p>

      <div className="no-print rounded-2xl border border-ink/[0.08] bg-card p-5 md:p-6 mb-6">
        <div className="flex items-center justify-between gap-4 mb-3">
          <p className="text-[14px] text-ink" aria-live="polite">
            <span className="font-semibold">{done}</span> of {total} done
          </p>
          <button type="button" onClick={reset} disabled={done === 0} className="text-[13px] text-teal-deep hover:underline disabled:opacity-50 disabled:no-underline">
            Reset
          </button>
        </div>
        <progress
          value={done}
          max={total}
          aria-label={`${title} progress`}
          className="block w-full h-2 rounded-full overflow-hidden [&::-webkit-progress-bar]:bg-ink/[0.08] [&::-webkit-progress-value]:bg-teal [&::-moz-progress-bar]:bg-teal"
        />
        <div className="flex flex-wrap items-center gap-3 mt-5">
          <button type="button" onClick={print} className={btnCls}>
            Print checklist
          </button>
          <button type="button" onClick={copy} className={btnCls}>
            Copy as text
          </button>
          <span role="status" aria-live="polite" className="text-[13px] text-muted">
            {copyStatus}
          </span>
        </div>
      </div>

      <nav aria-label={`${title} sections`} className="no-print mb-8">
        <ul className="flex flex-wrap gap-2">
          {sections.map((s) => (
            <li key={s.heading}>
              <a
                href={`#${sectionId(s.heading)}`}
                className="inline-block text-[13px] text-teal-deep border border-teal/25 bg-teal/[0.07] rounded-full px-3 py-1 hover:bg-teal/15 transition-colors"
              >
                {s.heading}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-9">
        {sections.map((section, si) => (
          <div key={section.heading} id={sectionId(section.heading)} className="scroll-mt-24">
            <h3 className="font-display text-ink text-[20px] md:text-[22px] mb-3">
              <a href={`#${sectionId(section.heading)}`} className="hover:text-teal-deep transition-colors">
                {section.heading}
              </a>
            </h3>
            <ul className="space-y-1">
              {section.items.map((item, ii) => {
                const key = itemKey(si, ii);
                const id = `${slug}-${key}`;
                return (
                  <li key={key} className="flex items-start gap-3 py-1.5">
                    <input
                      id={id}
                      type="checkbox"
                      checked={!!checked[key]}
                      onChange={() => toggle(key)}
                      aria-describedby={item.note ? `${id}-note` : undefined}
                      className="mt-1 h-[18px] w-[18px] shrink-0 cursor-pointer accent-teal"
                    />
                    <label htmlFor={id} className="cursor-pointer text-[16px] leading-relaxed text-muted">
                      <span className={checked[key] ? "text-ink/50 line-through" : "text-ink"}>{item.text}</span>
                      {item.note && (
                        <span id={`${id}-note`} className="block text-[13px] text-muted">
                          {item.note}
                        </span>
                      )}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {LEAD_CAPTURE_ENABLED && (
        <div className="mt-10">
          <LeadMagnetForm source={slug} checklistTitle={title} />
        </div>
      )}

      <div className="no-print mt-12" id={`${slug}-faq`}>
        <h2 className="font-display text-ink text-[24px] md:text-[28px] mb-4">
          Questions about this checklist
        </h2>
        {/* <details> keeps every answer in the DOM while collapsed, so crawlers read them. */}
        <div>
          {faq.map(({ q, a }) => (
            <details key={q} className="group border-b border-ink/[0.08]">
              <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-[17px] text-ink">{q}</h3>
                <span
                  aria-hidden="true"
                  className="relative w-7 h-7 shrink-0 rounded-full border border-ink/[0.12] text-muted transition-colors duration-200 group-open:bg-teal/15 group-open:border-teal/30 group-open:text-teal"
                >
                  <span className="absolute left-1/2 top-1/2 w-2.5 h-px -translate-x-1/2 -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-1/2 w-px h-2.5 -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-200 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="text-muted text-[15px] leading-relaxed pb-4 max-w-[640px]">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
