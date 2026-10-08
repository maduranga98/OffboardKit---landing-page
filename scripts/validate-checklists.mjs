// Content rules for the checklist data files. Run: npm run checklists:check
import { loadChecklists } from "./lib/load-checklists.mjs";

const words = (s) => s.trim().split(/\s+/).length;
const errors = [];

for (const { checklist: c } of await loadChecklists()) {
  const items = c.sections.reduce((n, s) => n + s.items.length, 0);
  if (items < 40 || items > 60) errors.push(`${c.slug}: ${items} items (need 40-60)`);
  const intro = words(c.intro);
  if (intro < 120 || intro > 180) errors.push(`${c.slug}: intro is ${intro} words (need 120-180)`);
  if (c.faq.length < 4 || c.faq.length > 5) errors.push(`${c.slug}: ${c.faq.length} FAQs (need 4-5)`);
  for (const f of c.faq) {
    const n = words(f.a);
    if (n < 40 || n > 80) errors.push(`${c.slug}: FAQ "${f.q}" answer is ${n} words (need 40-80)`);
  }
  if (!new RegExp(`^/downloads/${c.slug}-[a-z0-9]{8}\\.pdf$`).test(c.pdfFile)) {
    errors.push(`${c.slug}: pdfFile "${c.pdfFile}" must be /downloads/${c.slug}-<8 chars>.pdf`);
  }
  console.log(`${c.slug}: ${c.sections.length} sections, ${items} items, intro ${intro} words, ${c.faq.length} FAQs`);
}

if (errors.length) {
  console.error("\n" + errors.map((e) => " - " + e).join("\n"));
  process.exit(1);
}
console.log("checklists:check passed.");
