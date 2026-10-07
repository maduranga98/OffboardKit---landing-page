"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X } from "./icons";
import { Button } from "./ui";
import { Reveal } from "./Reveal";
import { enterprise, planGuarantees, plans } from "@/data/plans";

/** Billing toggle, plan cards, enterprise row and guarantees. Shared by / and /pricing. */
export function PlansGrid() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      {/* Billing toggle */}
      <Reveal className="flex items-center justify-center gap-3 mt-8">
        <button
          onClick={() => setAnnual(false)}
          className={`text-[13px] font-medium transition-colors duration-200 ${
            annual ? "text-muted" : "text-ink"
          }`}
        >
          Monthly
        </button>
        <button
          role="switch"
          aria-checked={annual}
          onClick={() => setAnnual((v) => !v)}
          className={`relative w-12 h-6 rounded-full border transition-colors duration-300 ${
            annual ? "bg-teal border-teal" : "bg-ink/10 border-ink/10"
          }`}
          aria-label="Annual billing"
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
              annual ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
        <button
          onClick={() => setAnnual(true)}
          className={`text-[13px] font-medium transition-colors duration-200 flex items-center gap-1.5 ${
            annual ? "text-ink" : "text-muted"
          }`}
        >
          Annual
          <span className="text-[11px] bg-teal/10 text-teal-deep border border-teal/25 rounded-full px-2 py-0.5 font-medium">
            Save 2 months
          </span>
        </button>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 items-start">
        {plans.map((p, i) => (
          <Reveal
            key={p.name}
            delay={i * 70}
            className={`relative rounded-2xl p-6 border flex flex-col transition-all duration-200 ${
              p.featured
                ? "border-teal bg-[#EAF4EF] shadow-teal lg:-mt-2"
                : "border-ink/[0.08] bg-card hover:shadow-card hover:-translate-y-0.5"
            }`}
          >
            {p.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal text-ink text-[10px] font-medium uppercase tracking-[0.16em] rounded-full px-3 py-1 whitespace-nowrap">
                Most popular
              </span>
            )}
            <h3 className={`text-ink font-semibold text-[14px] ${p.featured ? "mt-2" : ""}`}>
              {p.name}
            </h3>
            <div className="mt-2 flex items-baseline">
              <span className="font-display text-[32px] leading-none text-ink">
                ${annual ? p.annualPrice : p.monthlyPrice}
              </span>
              <span className="text-muted text-[13px] ml-1">
                {annual ? "/yr" : "/mo"}
              </span>
            </div>
            {annual && (
              <div className="text-teal-deep text-[11px] mt-1.5 font-medium">
                Save ${p.annualSaving} vs monthly
              </div>
            )}
            <div className="text-teal-deep text-[12px] mt-1.5 font-medium">
              {p.employees}
            </div>
            <div className="text-muted text-[11.5px] mt-0.5">{p.hrUsers}</div>
            <p className="text-muted text-[12.5px] mt-3 leading-relaxed min-h-[38px]">
              {p.desc}
            </p>

            <Button
              as="a"
              href={p.ctaHref}
              variant={p.featured ? "primary" : "outline"}
              className="w-full mt-5"
              size="md"
            >
              {p.cta}
            </Button>

            <ul className="mt-5 space-y-2">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2 text-[12.5px] text-ink/80">
                  <Check size={13} className="text-teal mt-0.5 shrink-0" strokeWidth={2.4} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {p.notIncluded.length > 0 && (
              <ul className="mt-3 space-y-1.5 border-t border-ink/[0.07] pt-3">
                {p.notIncluded.map((f) => (
                  <li key={f} className="flex gap-2 text-[12px] text-muted/70">
                    <X size={12} className="mt-0.5 shrink-0 text-muted/50" strokeWidth={2} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </div>

      {/* Enterprise row */}
      <Reveal className="mt-5 rounded-2xl border border-ink/[0.08] bg-card px-6 sm:px-7 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-ink font-semibold text-[15px] flex items-center gap-2">
            {enterprise.name}
            <span className="text-[11px] font-normal bg-ink/[0.06] text-muted rounded-full px-2 py-0.5">
              {enterprise.priceLabel}
            </span>
          </div>
          <p className="text-muted text-[12.5px] mt-1 leading-relaxed">
            {enterprise.summary}
          </p>
        </div>
        <Link
          href="/#contact"
          className="shrink-0 text-teal-deep text-[13px] border border-teal/30 rounded-lg px-4 py-2 hover:bg-teal/10 transition-colors duration-200 whitespace-nowrap font-medium"
        >
          Talk to sales →
        </Link>
      </Reveal>

      <Reveal className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
        {planGuarantees.map((text) => (
          <div
            key={text}
            className="bg-card/60 border border-ink/[0.06] rounded-xl px-4 py-3 text-muted text-[12px]"
          >
            {text}
          </div>
        ))}
      </Reveal>
    </>
  );
}
