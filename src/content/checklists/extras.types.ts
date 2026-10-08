export type ChecklistRelatedLink = {
  label: string;
  /** Site-relative path. */
  href: string;
};

export type ChecklistExtras = {
  /** 3-4 sentences, tied to features the product pages already describe. */
  helps: string;
  related: ChecklistRelatedLink[];
};
