"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "./icons";
import { Button, Wordmark } from "./ui";

const links: [string, string][] = [
  ["Features", "/#features"],
  ["How it works", "/#how"],
  ["Pricing", "/pricing"],
  ["Blog", "/blog"],
  ["Contact", "/#contact"],
];

const SIGN_IN = "https://app.offboardset.com/login";
const SIGN_UP = "https://app.offboardset.com/signup";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-paper/95 backdrop-blur-xl border-b border-ink/[0.08] transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_12px_rgba(15,28,46,0.05)]" : ""
      }`}
    >
      <div className="container-page h-16 md:h-[76px] flex items-center justify-between">
        <Link href="/" aria-label="OffboardSet home">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-7 lg:gap-9">
          {links.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-muted hover:text-ink text-sm transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2.5">
          <Button as="a" href={SIGN_IN} variant="ghost" size="sm">
            Sign in
          </Button>
          <Button as="a" href={SIGN_UP} variant="primary" size="sm">
            Start trial <ArrowRight size={14} />
          </Button>
        </div>

        <button
          className="md:hidden p-2 -mr-2 text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink/[0.08] px-4 sm:px-6 pt-3 pb-5">
          <div className="flex flex-col">
            {links.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-muted hover:text-ink text-[15px]"
              >
                {label}
              </Link>
            ))}
            <div className="flex gap-2 pt-4">
              <Button as="a" href={SIGN_IN} variant="outline" size="sm" className="flex-1">
                Sign in
              </Button>
              <Button as="a" href={SIGN_UP} variant="primary" size="sm" className="flex-1">
                Start trial <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
