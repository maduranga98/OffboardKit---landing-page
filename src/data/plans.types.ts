export type Plan = {
  name: string;
  /** Monthly price in USD, as displayed (no currency symbol). */
  monthlyPrice: string;
  /** Annual price in USD, as displayed (may contain thousands separators). */
  annualPrice: string;
  annualSaving: string;
  employees: string;
  hrUsers: string;
  desc: string;
  features: string[];
  notIncluded: string[];
  featured: boolean;
  cta: string;
  ctaHref: string;
};

export type EnterprisePlan = {
  name: string;
  priceLabel: string;
  summary: string;
};
