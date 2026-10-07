import Link from "next/link";
import { checklistExtras } from "@/content/checklists/extras";

/** "How OffboardSet helps" paragraph plus related links, shown under a checklist page. */
export function ChecklistExtras({ slug }: { slug: string }) {
  const extras = checklistExtras[slug];
  if (!extras) return null;
  return (
    <div className="no-print">
      <h2 className="font-display text-ink text-[26px] md:text-[30px] mt-12 mb-4 leading-tight">
        How OffboardSet helps
      </h2>
      <p className="text-[17px] text-muted leading-relaxed my-5">{extras.helps}</p>

      <h2 className="font-display text-ink text-[26px] md:text-[30px] mt-12 mb-4 leading-tight">
        Related guides
      </h2>
      <ul className="my-5 space-y-2.5 list-none">
        {extras.related.map(({ label, href }) => (
          <li key={href} className="flex gap-3 text-muted leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal shrink-0" />
            <Link href={href} className="text-teal-deep hover:underline">
              {label}
            </Link>
          </li>
        ))}
        <li className="flex gap-3 text-muted leading-relaxed">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal shrink-0" />
          <Link href="/pricing" className="text-teal-deep hover:underline">
            OffboardSet pricing: flat plans with no per-seat fees
          </Link>
        </li>
      </ul>
    </div>
  );
}
