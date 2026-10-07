import type { FaqItem } from "./faqs.types";

/** Rendered on / and emitted as FAQPage JSON-LD from this same array. */
export const homeFaqs: FaqItem[] = [
  {
    q: "What is employee offboarding software?",
    a: "Employee offboarding software replaces the scattered spreadsheets and tribal memory HR teams rely on when someone leaves. It gives every exit one structured checklist, one place to capture knowledge, one tracked access-revocation list and a time-stamped audit trail. OffboardSet is built only for the exit process, and it works alongside the HRIS you already use.",
  },
  {
    q: "How does OffboardSet handle access revocation and IT security during offboarding?",
    a: "OffboardSet tracks access revocation app by app until each removal is confirmed. Overdue alerts fire when a task is late, every step is time-stamped in an audit trail, and equipment returns are tracked, which reduces the risk of lingering logins. Starter includes access revocation across 10 integrations, and Growth adds a Slack webhook integration.",
  },
  {
    q: "What's included in an employee offboarding checklist?",
    a: "A complete employee offboarding checklist covers role-based offboarding tasks with owners and deadlines, access revocation, knowledge transfer, equipment return, an exit interview, final paperwork and an audit record. OffboardSet builds it from a template for the role, department and exit type, with deadlines counted back from the last working day.",
  },
  {
    q: "How does OffboardSet support knowledge transfer when an employee leaves?",
    a: "Leavers are prompted through structured handoff sessions, and every document, recording and decision is tagged and indexed. On Growth and above, AI-summarised handoff briefs condense it into one page for the successor, and AI knowledge gap detection flags what is missing before the last day. Starter supports all six knowledge transfer item types.",
  },
  {
    q: "How is OffboardSet priced compared to per-seat offboarding tools?",
    a: "OffboardSet uses flat, company-based pricing instead of per-seat fees: Basic is $10 per month, Starter $29, Growth $79 and Business $199, with custom Enterprise pricing. Per-seat tools charge for every employee, so cost rises with headcount. Starter and Growth include a 14-day free trial with no credit card required.",
  },
];

/** Rendered on /pricing and emitted as FAQPage JSON-LD from this same array. */
export const pricingFaqs: FaqItem[] = [
  {
    q: "How is OffboardSet priced compared to per-seat offboarding software?",
    a: "OffboardSet charges a flat monthly fee based on company size, not per employee. Basic is $10 per month for up to 10 employees, Starter $29 for up to 50, Growth $79 for up to 200 and Business $199 for up to 500. Per-seat tools bill for every employee, so their cost climbs with headcount. Annual billing gets you two months free.",
  },
  {
    q: "What's included in the Starter plan vs. the Growth plan?",
    a: "Starter ($29 per month) covers up to 50 employees and 3 users, with unlimited offboardings, 5 templates, basic exit interviews, basic asset tracking and access revocation across 10 integrations. Growth ($79 per month) covers up to 200 employees and 10 users and adds unlimited templates, multi-step approvals, AI exit analysis, the full alumni portal, boomerang hire pipeline, analytics and a full audit trail.",
  },
  {
    q: "Can I switch plans as my company grows?",
    a: "Plans are sized by company headcount, so you move up a tier as you outgrow your employee limit: Basic covers 10 employees, Starter 50, Growth 200, Business 500, and Enterprise goes beyond that. Each higher tier includes everything in the one below, so moving up never removes a capability. Contact us if you want to talk through timing before you change plans.",
  },
  {
    q: "Do you offer custom pricing for large enterprises?",
    a: "Yes. Enterprise is custom-priced for companies with 500 or more employees. It includes unlimited users, a white-label portal, SSO / SAML, HRIS integrations with BambooHR, Workday, Rippling and ADP, a 99.9% SLA and a dedicated account manager. Use the contact form to talk to sales and we will scope a plan around your company.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. Starter and Growth include a 14-day free trial, and no credit card is required to start. Plans begin at $10 per month for up to 10 employees. The Business plan comes with a dedicated 90-minute onboarding session, so book a demo if you would like to see it in action before you decide.",
  },
];
