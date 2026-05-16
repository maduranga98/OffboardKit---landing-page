import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 bg-teal/10 border border-teal/25 text-teal-light text-[11px] font-medium uppercase tracking-[0.18em] rounded-full px-3.5 py-1.5 ${className}`}
    >
      {children}
    </span>
  );
}

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div
      className={`text-teal text-[11px] font-medium uppercase tracking-[0.22em] ${className}`}
    >
      {children}
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost" | "tealghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  as?: "button" | "a";
  href?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  as: Tag = "button",
  href,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-[10px] transition-all duration-200 select-none";
  const sizes = {
    sm: "text-sm px-3.5 py-2",
    md: "text-[14px] px-4 py-2.5",
    lg: "text-[15px] px-5 py-3",
  };
  const variants = {
    primary:
      "bg-teal hover:bg-teal-light text-warm-white shadow-teal hover:shadow-[0_6px_22px_rgba(18,196,173,0.32)] hover:-translate-y-0.5",
    outline:
      "bg-transparent text-warm-white border border-warm-white/15 hover:border-warm-white/30 hover:bg-warm-white/[0.03]",
    ghost: "bg-transparent text-mist hover:text-warm-white",
    tealghost:
      "bg-teal/10 border border-teal/20 text-teal-light hover:bg-teal/15",
  };
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (Tag === "a" || href) {
    return (
      <a href={href || "#"} className={cls} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export function LogoMark({ size = 32 }: { size?: number }) {
  const s = size;
  return (
    <div
      className="flex items-center justify-center rounded-[10px]"
      style={{
        width: s,
        height: s,
        background: "linear-gradient(135deg, #12C4AD 0%, #0D9E8A 100%)",
        boxShadow:
          "0 4px 14px rgba(13,158,138,0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
      }}
    >
      <svg
        width={s * 0.55}
        height={s * 0.55}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0F1C2E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 4h3a2 2 0 0 1 2 2v14" />
        <path d="M3 20h18" />
        <path d="M13 20V4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
        <path d="M14 12l4 0" />
        <path d="M16 10l2 2-2 2" />
      </svg>
    </div>
  );
}

export function Wordmark({ size = "text-xl" }: { size?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark size={30} />
      <div className={`font-display ${size} leading-none`}>
        <span className="text-warm-white">HRExit</span>
        <span className="text-teal-light">Flow</span>
      </div>
    </div>
  );
}
