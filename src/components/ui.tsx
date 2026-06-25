import React from "react";
import Image from "next/image";

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
  return (
    <Image
      src="/logo.svg"
      alt="OffboardKit"
      width={size}
      height={size}
      priority
      style={{ width: size, height: size }}
    />
  );
}

export function Wordmark({ size = "text-xl" }: { size?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark size={30} />
      <div className={`font-display ${size} leading-none`}>
        <span className="text-warm-white">Offboard</span>
        <span className="text-teal-light">Kit</span>
      </div>
    </div>
  );
}
