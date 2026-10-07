import type { EnterprisePlan, Plan } from "./plans.types";

/** Single source of truth for plan data: homepage, /pricing and JSON-LD all read from here. */
export const plans: Plan[] = [
  {
    name: "Basic",
    monthlyPrice: "10",
    annualPrice: "100",
    annualSaving: "20",
    employees: "Up to 10 employees",
    hrUsers: "1 HR user",
    desc: "Perfect for tiny teams with occasional exits.",
    features: [
      "3 offboardings per year",
      "1 offboarding template",
      "Checkbox & file upload tasks",
      "Last working day countdown",
      "Document upload (knowledge transfer)",
      "Employee exit portal",
      "Basic email notifications",
    ],
    notIncluded: ["Exit interviews", "Asset management", "Access revocation", "Alumni portal", "Analytics"],
    featured: false,
    cta: "Get started",
    ctaHref: "https://app.offboardset.com/signup",
  },
  {
    name: "Starter",
    monthlyPrice: "29",
    annualPrice: "290",
    annualSaving: "58",
    employees: "Up to 50 employees",
    hrUsers: "3 HR / Manager users",
    desc: "Unlimited offboardings for small businesses.",
    features: [
      "Unlimited offboardings",
      "5 offboarding templates",
      "All 6 task types + dependencies",
      "Basic exit interviews",
      "All 6 knowledge transfer item types",
      "Asset tracking (basic)",
      "Access revocation (10 integrations)",
      "Email & in-app notifications",
      "Remove OffboardSet branding",
    ],
    notIncluded: ["AI features", "Alumni portal", "Analytics dashboard", "Webhooks"],
    featured: false,
    cta: "Start trial",
    ctaHref: "https://app.offboardset.com/signup",
  },
  {
    name: "Growth",
    monthlyPrice: "79",
    annualPrice: "790",
    annualSaving: "158",
    employees: "Up to 200 employees",
    hrUsers: "10 HR / Manager users",
    desc: "The complete offboarding platform for growing teams.",
    features: [
      "Everything in Starter",
      "Unlimited templates + multi-step approvals",
      "AI exit sentiment analysis",
      "AI theme & risk extraction",
      "AI knowledge gap detection",
      "Knowledge Threads (Q&A with alumni)",
      "Full alumni portal + job board",
      "Boomerang hire pipeline",
      "Slack webhook integration",
      "Analytics (all time) + CSV / PDF export",
      "Full audit trail",
      "Priority email support (24h)",
    ],
    notIncluded: ["Pulse surveys", "Consulting pool", "Custom webhooks", "SSO / SAML"],
    featured: true,
    cta: "Start trial",
    ctaHref: "https://app.offboardset.com/signup",
  },
  {
    name: "Business",
    monthlyPrice: "199",
    annualPrice: "1,990",
    annualSaving: "398",
    employees: "Up to 500 employees",
    hrUsers: "25 HR / Manager users",
    desc: "Compliance-ready with advanced AI and alumni tools.",
    features: [
      "Everything in Growth",
      "Pulse surveys for alumni",
      "Consulting / gig requests pool",
      "Custom webhooks (HMAC-SHA256)",
      "Compliance audit export (PDF)",
      "Advanced analytics + benchmarking",
      "Scheduled analytics reports",
      "Custom branded email templates",
      "Historical trends dashboard",
      "Dedicated 90-min onboarding session",
      "Priority chat support (8h)",
    ],
    notIncluded: ["SSO / SAML", "HRIS integrations", "Custom data retention"],
    featured: false,
    cta: "Book a demo",
    ctaHref: "https://app.offboardset.com/signup",
  },
];

export const enterprise: EnterprisePlan = {
  name: "Enterprise",
  priceLabel: "Custom pricing",
  summary:
    "500+ employees · Unlimited users · White-label portal · SSO / SAML · HRIS integrations (BambooHR, Workday, Rippling, ADP) · Okta / Azure AD · GDPR / HIPAA · SOC 2 Type II · 99.9% SLA · Dedicated account manager",
};

export const planGuarantees: string[] = [
  "30-day money-back guarantee on annual plans",
  "No credit card required to start",
  "Non-profits get 30% off · Startups 20% off first year",
];

/**
 * UNVERIFIED MARKETING CLAIM: carried over verbatim from the live homepage.
 * The "~$1,600/mo" Rippling figure has no cited source; do not add other competitor numbers.
 * Assumptions are derived only from the claim itself: 200 employees, which fits the Growth plan.
 */
export const comparisonExample = {
  employees: 200,
  perSeatMonthly: "~$1,600",
  perSeatVendor: "Rippling",
  flatPlan: "Growth",
  flatMonthly: "$79",
};
