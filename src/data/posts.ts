export type Post = {
  slug: string;
  tag: string;
  emoji: string;
  gradient: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
};

export const posts: Post[] = [
  {
    slug: "ultimate-employee-offboarding-checklist-2025",
    tag: "Checklist",
    emoji: "📋",
    gradient: "from-teal/25 to-navy/80",
    title: "The Ultimate Employee Offboarding Checklist (2025)",
    excerpt:
      "Every step HR, IT, and managers need to complete — from resignation to alumni.",
    date: "Dec 2, 2024",
    read: "8 min read",
  },
  {
    slug: "how-much-does-bad-offboarding-cost",
    tag: "Strategy",
    emoji: "💸",
    gradient: "from-ember/20 to-navy/80",
    title: "How Much Does a Bad Offboarding Really Cost?",
    excerpt:
      "The hidden costs go far beyond severance. Knowledge loss and security incidents add up fast.",
    date: "Nov 28, 2024",
    read: "6 min read",
  },
  {
    slug: "what-to-capture-before-senior-employee-leaves",
    tag: "Knowledge Transfer",
    emoji: "🧠",
    gradient: "from-slate/80 to-teal/20",
    title: "What to Capture Before a Senior Employee Leaves",
    excerpt:
      "A structured framework for extracting institutional knowledge before the last day.",
    date: "Nov 20, 2024",
    read: "7 min read",
  },
  {
    slug: "access-revocation-checklist",
    tag: "Security",
    emoji: "🔐",
    gradient: "from-warning/20 to-navy/80",
    title:
      "Access Revocation Checklist: Every System to Revoke When an Employee Leaves",
    excerpt:
      "From Slack and GitHub to shadow IT — the complete revocation list.",
    date: "Nov 14, 2024",
    read: "5 min read",
  },
  {
    slug: "exit-interview-questions-that-reveal-why-people-leave",
    tag: "Exit Interviews",
    emoji: "💬",
    gradient: "from-blue-500/25 to-navy/80",
    title: "Exit Interview Questions That Actually Reveal Why People Leave",
    excerpt:
      "Most exit interviews collect nothing useful. These 12 questions change that.",
    date: "Nov 8, 2024",
    read: "9 min read",
  },
  {
    slug: "why-best-hires-might-be-former-employees",
    tag: "Alumni",
    emoji: "🔁",
    gradient: "from-success/25 to-navy/80",
    title: "Why Your Best Hires Might Be Former Employees",
    excerpt: "Boomerang employees onboard 40% faster and stay longer.",
    date: "Oct 30, 2024",
    read: "6 min read",
  },
];
