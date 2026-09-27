import React from "react";
import Image from "next/image";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 bg-teal/10 border border-teal/25 text-teal-deep text-[11px] font-medium uppercase tracking-[0.18em] rounded-full px-3.5 py-1.5 ${className}`}
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
      className={`text-teal-deep text-[11px] font-medium uppercase tracking-[0.22em] ${className}`}
    >
      {children}
    </div>
  );
}

/** Serif section heading with the italic teal accent used across the page. */
export function SectionHeading({
  children,
  as: Tag = "h2",
  id,
  className = "mt-3.5",
}: {
  children: React.ReactNode;
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}) {
  return (
    <Tag
      id={id}
      className={`font-display text-ink ${className}`}
      style={{ fontSize: "clamp(28px, 3.2vw, 38px)", lineHeight: 1.1 }}
    >
      {children}
    </Tag>
  );
}

export function Accent({
  children,
  tone = "teal",
}: {
  children: React.ReactNode;
  tone?: "teal" | "ember";
}) {
  return (
    <em className={`italic pr-[0.1em] ${tone === "ember" ? "text-ember-deep" : "text-teal"}`}>
      {children}
    </em>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
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
    sm: "text-sm px-4 py-2",
    md: "text-[14px] px-4 py-2.5",
    lg: "text-[15px] px-[22px] py-[13px]",
  };
  const variants = {
    primary:
      "bg-teal text-ink hover:bg-teal-light shadow-teal hover:-translate-y-0.5",
    outline:
      "bg-transparent text-ink border border-ink/[0.12] hover:border-ink/25 hover:bg-card",
    ghost: "bg-transparent text-muted hover:text-ink",
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
      alt=""
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
        <span className="text-ink">Offboard</span>
        <span className="text-teal">Set</span>
      </div>
    </div>
  );
}
