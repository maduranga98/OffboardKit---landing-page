import { Linkedin } from "./icons";
import { Wordmark } from "./ui";

type FooterLink = { label: string; href: string };

function FooterCol({ title, items }: { title: string; items: FooterLink[] }) {
  return (
    <div>
      <div className="text-ink text-[11px] uppercase tracking-[0.16em] mb-4">
        {title}
      </div>
      <ul className="space-y-2.5">
        {items.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="text-muted hover:text-teal-deep text-[13px] transition-colors duration-200"
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
    <footer className="border-t border-ink/[0.08]">
      <div className="container-page pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:[grid-template-columns:1.5fr_1fr_1fr_1fr] gap-12">
          <div className="max-w-sm">
            <Wordmark />
            <p className="text-muted text-[13px] leading-relaxed mt-4">
              The all-in-one offboarding platform that ensures people leave with
              dignity — and their knowledge stays behind.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <a
                href="https://www.linkedin.com/company/offboardset/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OffboardSet on LinkedIn"
                className="w-9 h-9 rounded-lg bg-card border border-ink/[0.08] flex items-center justify-center text-muted hover:text-teal-deep hover:border-teal/30 transition-all duration-200"
              >
                <Linkedin size={15} />
              </a>
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
              {
                label: "Remote employee offboarding",
                href: "/blog/offboarding-remote-employees",
              },
              {
                label: "Workday alternative",
                href: "/blog/workday-alternatives",
              },
            ]}
          />
          <FooterCol
            title="Company"
            items={[
              { label: "Contact", href: "/#contact" },
              { label: "Pricing", href: "/#pricing" },
              { label: "Blog", href: "/blog" },
              { label: "Sitemap", href: "/sitemap.xml" },
            ]}
          />
        </div>

        <div className="mt-10 pt-6 border-t border-ink/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-muted text-[12px]">
            © 2026 Lumora Ventures PVT LTD. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[12px] text-muted">
            {["Privacy", "Terms", "Security"].map((item) => (
              <a key={item} href="#" className="hover:text-ink">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
