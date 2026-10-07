import { content } from "./content";

export type PostIcon =
  | "layers"
  | "shuffle"
  | "building"
  | "key"
  | "compass"
  | "clipboard"
  | "wrench"
  | "brain"
  | "message"
  | "refresh"
  | "shield"
  | "repeat"
  | "dollar"
  | "globe"
  | "scroll";

type PostSource = {
  slug: string;
  /** Search result title (the " | OffboardSet" suffix is added by the layout template). */
  seoTitle: string;
  /** Meta description shown in search results (~150 characters). */
  description: string;
  tag: string;
  icon: PostIcon;
  gradient: string;
  title: string;
  excerpt: string;
  date: string;
  /** Set when the article is substantially revised. */
  updated?: string;
};

export type Post = PostSource & { read: string };

const WORDS_PER_MINUTE = 230;

function readTime(markdown: string | undefined): string {
  const words = markdown ? markdown.split(/\s+/).filter(Boolean).length : 0;
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`;
}

const sources: PostSource[] = [
  {
    slug: "bamboohr-alternatives",
    seoTitle: "7 Best BambooHR Alternatives for Offboarding",
    description:
      "Compare 7 BambooHR alternatives for employee offboarding on pricing, IT access revocation, and knowledge transfer. Find the right fit for your HR team.",
    tag: "Alternatives",
    icon: "layers",
    gradient: "from-success/25 to-navy/80",
    title:
      "7 Best BambooHR Alternatives for Employee Offboarding (2026 Comparison)",
    excerpt:
      "The best BambooHR alternatives for employee offboarding, compared on coverage and price. Seven options that close the IT revocation and knowledge transfer gaps BambooHR leaves open.",
    date: "Jun 30, 2026",
    updated: "Sep 26, 2026",
  },
  {
    slug: "rippling-alternatives",
    seoTitle: "6 Best Rippling Alternatives & Competitors",
    description:
      "Looking for a Rippling alternative? Compare 6 Rippling competitors for offboarding, access revocation, and HR workflows, without all-in platform lock-in.",
    tag: "Alternatives",
    icon: "shuffle",
    gradient: "from-blue-500/25 to-navy/80",
    title:
      "6 Best Rippling Alternatives in 2026: Offboarding Without the All-In Platform",
    excerpt:
      "Rippling's offboarding is excellent if you run payroll, devices, and identity through it. These six alternatives work without the platform lock-in.",
    date: "Jun 23, 2026",
    updated: "Sep 26, 2026",
  },
  {
    slug: "workday-alternatives",
    seoTitle: "6 Workday Alternatives for Mid-Size Teams",
    description:
      "The best Workday alternatives and competitors for offboarding at mid-size companies. Six lighter HR tools without the enterprise price or rollout time.",
    tag: "Alternatives",
    icon: "building",
    gradient: "from-ember/20 to-navy/80",
    title:
      "Workday Alternatives for Offboarding: 6 Options for Teams That Aren't Enterprise",
    excerpt:
      "The best Workday alternatives and competitors for offboarding, compared for mid-market teams. Six lighter options without the enterprise implementation budget or timeline.",
    date: "Jun 16, 2026",
    updated: "Sep 26, 2026",
  },
  {
    slug: "lumos-alternatives",
    seoTitle: "5 Best Lumos Alternatives & Competitors",
    description:
      "Compare 5 Lumos alternatives and competitors that cover SaaS access revocation plus knowledge transfer, exit interviews and the people side of offboarding.",
    tag: "Alternatives",
    icon: "key",
    gradient: "from-warning/20 to-navy/80",
    title:
      "5 Best Lumos Alternatives in 2026: Beyond Access Revocation",
    excerpt:
      "Lumos nails SaaS deprovisioning but stops at the security slice of an exit. Five alternatives that cover access, knowledge, and the people side.",
    date: "Jun 9, 2026",
    updated: "Sep 26, 2026",
  },
  {
    slug: "enboarder-alternatives",
    seoTitle: "6 Enboarder Alternatives for Offboarding",
    description:
      "Enboarder is onboarding-first. Compare 6 Enboarder alternatives built for offboarding: checklists, access revocation, knowledge capture, and exits.",
    tag: "Alternatives",
    icon: "compass",
    gradient: "from-teal/25 to-navy/80",
    title:
      "6 Best Enboarder Alternatives for Offboarding & Employee Transitions (2026)",
    excerpt:
      "Enboarder is journey-first and onboarding-heavy. If offboarding is your priority, these six alternatives handle the exit end of the lifecycle better.",
    date: "Jun 2, 2026",
    updated: "Sep 26, 2026",
  },
  {
    slug: "employee-offboarding-checklist",
    seoTitle: "Employee Offboarding Checklist for HR & IT",
    description:
      "A complete employee offboarding checklist for HR, IT, and managers: final pay, access revocation, device return, knowledge transfer, and exit interviews.",
    tag: "Checklist",
    icon: "clipboard",
    gradient: "from-teal/25 to-navy/80",
    title:
      "The Ultimate Employee Offboarding Checklist (2026): Every Step HR, IT & Managers Need",
    excerpt:
      "A complete checklist covering HR, IT, and manager tasks, from final pay to access revocation, so no exit slips through the cracks.",
    date: "May 19, 2026",
    updated: "Oct 7, 2026",
  },
  {
    slug: "best-employee-offboarding-software",
    seoTitle: "Best Employee Offboarding Software (2026)",
    description:
      "Compare the best employee offboarding software for 50-500 person companies: features, pricing, integrations, and which tools automate access revocation.",
    tag: "Software",
    icon: "wrench",
    gradient: "from-ember/20 to-navy/80",
    title:
      "Best Employee Offboarding Software in 2026: Honest Comparison for HR Teams",
    excerpt:
      "An unbiased breakdown of the top offboarding platforms: features, pricing, and which fits HR teams at 50-500 person companies.",
    date: "May 12, 2026",
    updated: "Oct 7, 2026",
  },
  {
    slug: "knowledge-transfer-template",
    seoTitle: "Knowledge Transfer Template for Leavers",
    description:
      "A free knowledge transfer template for when an employee leaves: capture projects, contacts, decisions, and tacit know-how before their last day.",
    tag: "Knowledge Transfer",
    icon: "brain",
    gradient: "from-slate/80 to-teal/20",
    title:
      "Knowledge Transfer Template When an Employee Leaves: The Complete Handover Framework",
    excerpt:
      "A structured template that captures tacit knowledge, key contacts, and decisions before the last day, not just SOPs.",
    date: "May 5, 2026",
    updated: "Oct 7, 2026",
  },
  {
    slug: "exit-interview-questions",
    seoTitle: "75 Exit Interview Questions to Ask",
    description:
      "75 exit interview questions across 7 themes, from reasons for leaving to management, pay, and culture, plus how to run the interview and analyse answers.",
    tag: "Exit Interviews",
    icon: "message",
    gradient: "from-blue-500/25 to-navy/80",
    title:
      "75 Exit Interview Questions That Actually Surface Why Employees Leave",
    excerpt:
      "Open-ended, non-leading questions across six themes, designed to build trend data rather than collect grievances.",
    date: "Apr 28, 2026",
    updated: "Oct 7, 2026",
  },
  {
    slug: "employee-offboarding-process",
    seoTitle: "Employee Offboarding Process: 8 Steps",
    description:
      "The employee offboarding process in 8 steps, from resignation to alumni: who owns each task, what the law requires, and how to avoid common mistakes.",
    tag: "Process",
    icon: "refresh",
    gradient: "from-success/25 to-navy/80",
    title:
      "Employee Offboarding Process: 8 Steps to a Structured, Legally Safe Exit",
    excerpt:
      "The eight phases every departure should follow, from resignation acceptance to alumni transition, without missing compliance steps.",
    date: "Apr 21, 2026",
    updated: "Sep 26, 2026",
  },
  {
    slug: "it-offboarding-checklist",
    seoTitle: "IT Offboarding Checklist: Revoke All Access",
    description:
      "An IT offboarding checklist to revoke every access point: SSO, SaaS apps, MFA, shared credentials, devices, and audit logs, on or before the last day.",
    tag: "Security",
    icon: "shield",
    gradient: "from-warning/20 to-navy/80",
    title:
      "IT Offboarding Checklist 2026: Revoke Every Access, Leave No Security Gap",
    excerpt:
      "Identity providers, SaaS, MFA, shared credentials, and device recovery: the full revocation list IT teams need on day zero.",
    date: "Apr 14, 2026",
    updated: "Oct 7, 2026",
  },
  {
    slug: "boomerang-employees-alumni-rehire-program",
    seoTitle: "Boomerang Employees: Build a Rehire Program",
    description:
      "How to attract boomerang employees with an alumni rehire program: touchpoints, referrals, and an alumni network that brings great people back.",
    tag: "Alumni",
    icon: "repeat",
    gradient: "from-success/25 to-navy/80",
    title:
      "Boomerang Employees: How to Build an Alumni Rehire Program That Actually Works",
    excerpt:
      "Why boomerangs onboard 44% faster, and the touchpoints, referrals, and alumni network that bring them back.",
    date: "Apr 7, 2026",
    updated: "Sep 26, 2026",
  },
  {
    slug: "cost-of-bad-employee-offboarding",
    seoTitle: "The Real Cost of Bad Employee Offboarding",
    description:
      "Bad offboarding costs $15K-$45K per exit in lost knowledge, idle SaaS licences, and security risk. See the math and estimate your own exposure.",
    tag: "Strategy",
    icon: "dollar",
    gradient: "from-ember/20 to-navy/80",
    title:
      "How Much Does a Bad Employee Offboarding Actually Cost? (With Calculator)",
    excerpt:
      "Knowledge loss, idle SaaS licences, and security incidents push the real cost to $15K–$45K per exit. Here's the math.",
    date: "Mar 31, 2026",
    updated: "Sep 26, 2026",
  },
  {
    slug: "offboarding-remote-employees",
    seoTitle: "Offboarding Remote Employees: Full Guide",
    description:
      "How to offboard remote employees: device return kits, async knowledge transfer, remote access revocation, and virtual exit interviews, step by step.",
    tag: "Remote",
    icon: "globe",
    gradient: "from-blue-500/25 to-navy/80",
    title:
      "Offboarding Remote Employees: The Complete Guide for Distributed HR Teams",
    excerpt:
      "Prepaid return kits, async knowledge transfer, and remote access revocation: what changes when the last day isn't in the office.",
    date: "Mar 24, 2026",
    updated: "Sep 26, 2026",
  },
  {
    slug: "employee-offboarding-policy-template",
    seoTitle: "Employee Offboarding Policy Template",
    description:
      "An employee offboarding policy template covering notice periods, knowledge transfer, data handling, and post-departure obligations, with what to include.",
    tag: "Policy",
    icon: "scroll",
    gradient: "from-slate/80 to-teal/20",
    title:
      "Employee Offboarding Policy Template: What to Include and Why Most Are Too Vague",
    excerpt:
      "Notice periods, knowledge transfer requirements, data handling, and post-departure obligations, in a policy template that holds up.",
    date: "Mar 17, 2026",
    updated: "Sep 26, 2026",
  },
];

export const posts: Post[] = sources.map((p) => ({
  ...p,
  read: readTime(content[p.slug]),
}));
