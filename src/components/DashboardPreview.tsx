"use client";

import { useEffect, useState } from "react";
import {
  Home,
  LogOut,
  BookOpen,
  Key,
  BarChart2,
  Users,
} from "./icons";
import { LogoMark } from "./ui";

type NavLabel = "Dashboard" | "Offboardings" | "Knowledge" | "Access Control" | "Analytics" | "Alumni";

const navItems: [NavLabel, React.ComponentType<{ size?: number; className?: string }>][] = [
  ["Dashboard", Home],
  ["Offboardings", LogOut],
  ["Knowledge", BookOpen],
  ["Access Control", Key],
  ["Analytics", BarChart2],
  ["Alumni", Users],
];

const avatarBg = (c: string) =>
  ({
    teal: "bg-teal/20 border-teal/40 text-teal-light",
    warning: "bg-warning/20 border-warning/40 text-warning",
    success: "bg-success/20 border-success/40 text-emerald-300",
  }[c] ?? "bg-teal/20 border-teal/40 text-teal-light");

const statusPill = (k: string) =>
  ({
    teal: "bg-teal/[0.12] text-teal-light border border-teal/30",
    warning: "bg-warning/[0.12] text-warning border border-warning/30",
  }[k] ?? "");

export function DashboardPreview() {
  const [progress, setProgress] = useState({ jordan: 0, sarah: 0, alex: 0 });
  const [activeNav, setActiveNav] = useState<NavLabel>("Dashboard");

  useEffect(() => {
    const t = setTimeout(() => setProgress({ jordan: 78, sarah: 45, alex: 62 }), 800);
    return () => clearTimeout(t);
  }, []);

  const flows = [
    { name: "Jordan Mills", role: "Senior Engineer · Engineering", last: "Last day Dec 15", initials: "JM", color: "teal", pct: progress.jordan, status: "On track", statusKind: "teal" },
    { name: "Sarah Rahman", role: "Product Designer · Design", last: "Last day Dec 20", initials: "SR", color: "warning", pct: progress.sarah, status: "Needs attention", statusKind: "warning" },
    { name: "Alex Chen", role: "Account Executive · Sales", last: "Last day Dec 22", initials: "AC", color: "success", pct: progress.alex, status: "On track", statusKind: "teal" },
  ];

  const stats = [
    { label: "Exits this month", value: "7", delta: "+2 vs Nov", Icon: LogOut },
    { label: "Knowledge captured", value: "94%", delta: "↑ 12% MoM", Icon: BookOpen },
    { label: "Access revoked", value: "100%", delta: "All systems", Icon: Key },
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden border border-warm-white/[0.09] bg-navy/70 backdrop-blur-sm shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-warm-white/[0.07] bg-slate/40">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF6058]" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28CA42]" />
        </div>
        <div className="flex-1 mx-auto max-w-sm">
          <div className="text-center text-[11px] text-mist bg-navy/60 border border-warm-white/[0.06] rounded-md py-1 px-3 font-mono">
            app.offboardkit.com/dashboard
          </div>
        </div>
        <div className="w-12" />
      </div>

      {/* Body */}
      <div className="grid grid-cols-[200px_1fr] min-h-[440px]">
        {/* Sidebar */}
        <div className="border-r border-warm-white/[0.06] bg-navy/40 py-5">
          <div className="px-4 mb-5 flex items-center gap-2">
            <LogoMark size={22} />
            <div className="font-display text-[13px]">
              <span>Offboard</span>
              <span className="text-teal-light">Kit</span>
            </div>
          </div>
          <div className="px-2 space-y-0.5">
            {navItems.map(([label, Icon]) => {
              const active = label === activeNav;
              return (
                <button
                  key={label}
                  onClick={() => setActiveNav(label)}
                  className={`w-full flex items-center gap-2.5 pl-3 pr-2 py-2 rounded-md text-[12.5px] relative transition-colors duration-200 ${
                    active
                      ? "text-teal-light bg-teal/10"
                      : "text-mist hover:text-warm-white hover:bg-warm-white/[0.03]"
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r bg-teal-light" />
                  )}
                  <Icon size={14} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-6 mx-3 p-3 rounded-lg border border-teal/20 bg-teal/[0.08]">
            <div className="text-[11px] text-teal-light font-medium uppercase tracking-widest">
              Trial · 14 days
            </div>
            <div className="text-[11.5px] text-mist mt-1 leading-snug">
              Upgrade to unlock unlimited exits.
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[11px] text-mist uppercase tracking-widest">
                HR · Dec 2025
              </div>
              <div className="font-display text-[22px] mt-0.5">
                Active Offboardings
              </div>
            </div>
            <span className="text-[11px] text-teal-light bg-teal/[0.12] border border-teal/25 rounded-full px-3 py-1">
              4 active
            </span>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-slate/35 border border-warm-white/[0.07] rounded-xl p-3.5"
              >
                <div className="flex items-start justify-between">
                  <div className="text-[10.5px] uppercase tracking-widest text-mist">
                    {s.label}
                  </div>
                  <s.Icon size={13} className="text-teal-light" />
                </div>
                <div className="font-display text-[26px] mt-1.5 leading-none">
                  {s.value}
                </div>
                <div className="text-[10.5px] text-teal-light mt-1.5">
                  {s.delta}
                </div>
              </div>
            ))}
          </div>

          {/* Flow rows */}
          <div className="bg-slate/30 border border-warm-white/[0.07] rounded-xl overflow-hidden">
            <div className="px-4 py-2.5 text-[10.5px] uppercase tracking-widest text-mist grid grid-cols-[1fr_160px_120px] gap-4 border-b border-warm-white/[0.05]">
              <span>Employee</span>
              <span>Progress</span>
              <span className="text-right">Status</span>
            </div>
            {flows.map((f, idx) => (
              <div
                key={f.name}
                className={`px-4 py-3 grid grid-cols-[1fr_160px_120px] gap-4 items-center ${
                  idx !== flows.length - 1
                    ? "border-b border-warm-white/[0.04]"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-full border flex items-center justify-center text-[11px] font-medium ${avatarBg(f.color)}`}
                  >
                    {f.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] text-warm-white truncate">
                      {f.name}
                    </div>
                    <div className="text-[11px] text-mist truncate">
                      {f.role} · {f.last}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="h-1.5 rounded-full bg-warm-white/[0.08] overflow-hidden">
                    <div
                      className={`h-full transition-all duration-[1400ms] ease-out ${
                        f.statusKind === "warning"
                          ? "bg-warning"
                          : "bg-teal-light"
                      }`}
                      style={{ width: `${f.pct}%` }}
                    />
                  </div>
                  <div className="text-[10.5px] text-mist mt-1 font-mono">
                    {f.pct}%
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block text-[10.5px] rounded-full px-2.5 py-1 ${statusPill(f.statusKind)}`}
                  >
                    {f.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
