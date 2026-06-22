import { Twitter, Linkedin, Github } from "./icons";
import { Wordmark } from "./ui";

type FooterLink = { label: string; href: string };

function FooterCol({ title, items }: { title: string; items: FooterLink[] }) {
  return (
    <div>
      <div className="text-warm-white text-xs uppercase tracking-[0.18em] mb-5">
        {title}
      </div>
      <ul className="space-y-3">
        {items.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="text-mist hover:text-warm-white text-[14px] transition-colors duration-200"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-warm-white/[0.07] bg-navy">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:[grid-template-columns:1.5fr_1fr_1fr_1fr] gap-12">
          <div className="max-w-sm">
            <Wordmark />
            <p className="text-mist text-[14px] leading-relaxed mt-5">
              The all-in-one offboarding platform that ensures people leave with
              dignity — and their knowledge stays behind.
            </p>
            <div className="flex items-center gap-2 mt-6">
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Github, label: "GitHub" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate/40 border border-warm-white/[0.08] flex items-center justify-center text-mist hover:text-teal-light hover:border-teal/30 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Product"
            items={[
              { label: "Features", href: "/#features" },
              { label: "How it works", href: "/#how" },
              { label: "Pricing", href: "/#pricing" },
              { label: "Get started", href: "/#contact" },
            ]}
          />
          <FooterCol
            title="Resources"
            items={[
              { label: "Blog", href: "/blog" },
              {
                label: "Offboarding checklist",
                href: "/blog/employee-offboarding-checklist",
              },
              {
                label: "Offboarding software",
                href: "/blog/best-employee-offboarding-software",
              },
              {
                label: "Exit interview questions",
                href: "/blog/exit-interview-questions",
              },
            ]}
          />
          <FooterCol
            title="Company"
            items={[
              { label: "Contact", href: "/#contact" },
              { label: "Pricing", href: "/#pricing" },
              { label: "Blog", href: "/blog" },
            ]}
          />
        </div>

        <div className="mt-16 pt-8 border-t border-warm-white/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-mist text-[13px]">
            © 2026 Lumora Ventures PVT LTD. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[13px] text-mist">
            {["Privacy", "Terms", "Security"].map((item) => (
              <a key={item} href="#" className="hover:text-warm-white">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
