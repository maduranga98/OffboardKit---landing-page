import type { ChecklistExtras } from "./extras.types";

/**
 * "How OffboardSet helps" copy and related links, keyed by checklist slug.
 * Only describes behavior the product pages already state.
 */
export const checklistExtras: Record<string, ChecklistExtras> = {
  "employee-offboarding-checklist": {
    helps:
      "OffboardSet turns a checklist like this into a repeatable workflow. Every departure starts from a template for the role, department and exit type, and tasks are assigned to HR, IT and the manager with deadlines counted back from the last day. Overdue alerts fire when a task is late, and each completed step is time-stamped. Leavers get a secure exit portal link, with no account needed, to complete their own tasks and upload handoff documents.",
    related: [
      { label: "IT offboarding checklist: revoke access without gaps", href: "/blog/it-offboarding-checklist" },
      { label: "Knowledge transfer checklist for departing employees", href: "/blog/knowledge-transfer-template" },
      { label: "Exit interview software: a buyer's guide", href: "/exit-interview-software" },
      { label: "The 8-step employee offboarding process", href: "/blog/employee-offboarding-process" },
    ],
  },
  "it-offboarding-checklist": {
    helps:
      "OffboardSet tracks access revocation app by app until each one is confirmed, with overdue alerts and a time-stamped record of every step. IT sees the same exit plan as HR and the manager, so access removal and equipment return sit next to every other task. Connected tools are revoked on the last day rather than days later, and the Growth plan adds a full audit trail you can use when someone asks who did what and when.",
    related: [
      { label: "Employee offboarding checklist for HR, IT and managers", href: "/blog/employee-offboarding-checklist" },
      { label: "Knowledge transfer checklist for departing employees", href: "/blog/knowledge-transfer-template" },
      { label: "How to offboard remote employees", href: "/blog/offboarding-remote-employees" },
      { label: "Employee offboarding policy template", href: "/blog/employee-offboarding-policy-template" },
    ],
  },
  "knowledge-transfer-checklist": {
    helps:
      "OffboardSet prompts leavers through structured handoff sessions, and every document and decision is tagged and indexed so the successor has one place to look instead of a folder of files. Leavers can upload documents and add links to video walkthroughs recorded in the tools you already use. On Growth and above, AI knowledge gap detection compares a handoff against similar past roles and flags what is missing before the last day.",
    related: [
      { label: "Employee offboarding checklist for HR, IT and managers", href: "/blog/employee-offboarding-checklist" },
      { label: "IT offboarding checklist: revoke access without gaps", href: "/blog/it-offboarding-checklist" },
      { label: "Exit interview questions to ask departing employees", href: "/blog/exit-interview-questions" },
      { label: "The 8-step employee offboarding process", href: "/blog/employee-offboarding-process" },
    ],
  },
};
