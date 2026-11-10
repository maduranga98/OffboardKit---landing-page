export type ChecklistItem = {
  text: string;
  /** Optional short hint shown under the item. */
  note?: string;
};

export type ChecklistSection = {
  heading: string;
  items: ChecklistItem[];
};

export type ChecklistFaq = {
  q: string;
  a: string;
};

/** Single source of truth: the page UI, the PDF and the FAQPage JSON-LD all render from this. */
export type Checklist = {
  /** Also the lead-capture `source` value. Lowercase kebab-case. */
  slug: string;
  title: string;
  /** Site path of the page that hosts this checklist. */
  path: string;
  intro: string;
  sections: ChecklistSection[];
  faq: ChecklistFaq[];
  /** Site-relative path of the generated PDF, e.g. "/downloads/<slug>-<8 chars>.pdf". */
  pdfFile: string;
};
