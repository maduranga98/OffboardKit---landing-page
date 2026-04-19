"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "./icons";
import { Button, Wordmark } from "./ui";

const links: [string, string][] = [
  ["Features", "#features"],
  ["How it works", "#how"],
  ["Pricing", "#pricing"],
  ["Blog", "#blog"],
  ["Contact", "#contact"],
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-navy/85 backdrop-blur-xl border-b border-warm-white/[0.06] transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      } px-6 md:px-12`}
    >
      <div className="max-w-[1240px] mx-auto flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <Wordmark />
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-mist hover:text-warm-white text-sm transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
          <Button variant="primary" size="sm">
            Start free <ArrowRight size={14} />
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-warm-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-4 pb-2 border-t border-warm-white/[0.06] pt-4">
          <div className="flex flex-col gap-1">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-mist hover:text-warm-white text-[15px]"
              >
                {label}
              </a>
            ))}
            <div className="flex gap-2 pt-3">
              <Button variant="outline" size="sm" className="flex-1">
                Sign in
              </Button>
              <Button variant="primary" size="sm" className="flex-1">
                Start free <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
