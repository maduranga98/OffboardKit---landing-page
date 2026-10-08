import type { Checklist } from "./checklist.types";

export const knowledgeTransfer: Checklist = {
  slug: "knowledge-transfer-checklist",
  title: "Knowledge Transfer Checklist",
  path: "/blog/knowledge-transfer-template",
  pdfFile: "/downloads/knowledge-transfer-checklist-bcf5e7f1.pdf",
  intro:
    "When someone leaves, the documents they wrote are the easy part. The hard part is the context that lives in their head: why a vendor was chosen, which client prefers a phone call, what breaks when you touch the legacy report, and who to call when something goes wrong. This checklist helps a departing employee, their manager and their successor capture that context before the last day. It starts with mapping responsibilities and ends with a sign-off, so the handover is reviewed rather than assumed. Start as early as the notice period allows, spread the work across several days, and have the successor ask questions as the material is produced. Adapt each section to the role, and add anything specific to your team's tools and customers.",
  sections: [
    {
      heading: "Map responsibilities",
      items: [
        { text: "List every area the person is responsible for, including informal duties." },
        { text: "Mark each area as critical, important or low priority." },
        { text: "Name the successor for each area, or flag it as unassigned." },
        { text: "Note which responsibilities can be stopped, merged or automated." },
        { text: "Record decisions the person is allowed to make alone, and those that need approval." },
        { text: "Agree the list with the manager before starting the handover." },
      ],
    },
    {
      heading: "Key contacts and relationships",
      items: [
        { text: "List internal contacts the person works with regularly and why." },
        { text: "List external contacts: customers, vendors, partners and agencies." },
        { text: "Note each contact's preferred channel, timing and communication style." },
        { text: "Write down the history of any sensitive or ongoing relationship." },
        { text: "Schedule introductions between the successor and each key contact." },
        { text: "Record who to escalate to when a contact is unresponsive or unhappy." },
      ],
    },
    {
      heading: "Recurring tasks and calendars",
      items: [
        { text: "List recurring tasks with frequency, owner and typical effort." },
        { text: "Write down the steps for each recurring task, including shortcuts and checks." },
        { text: "Record deadlines in the next quarter that the successor must meet." },
        { text: "Review the person's calendar for recurring meetings and decide who attends." },
        { text: "Transfer meeting ownership and invite the successor to the right ones." },
      ],
    },
    {
      heading: "Systems and credentials ownership",
      items: [
        { text: "List the systems the person owns or administers." },
        { text: "Note which accounts are personal and which are shared." },
        { text: "Move shared credentials into the approved password manager." },
        { text: "Name the new owner for each system and have them confirm access." },
        { text: "Record renewal dates, licenses and vendor contacts for owned tools." },
        { text: "Never share passwords by email or chat; use your approved vault." },
      ],
    },
    {
      heading: "Documents and where they live",
      items: [
        { text: "Create an index of key documents with links and a one-line description." },
        { text: "Move important files from personal drives or devices into shared locations." },
        { text: "Mark documents that are outdated, wrong or incomplete." },
        { text: "Note naming conventions and folder structures the person relies on." },
        { text: "Check that the successor can open every linked document." },
        { text: "Record where meeting notes, decisions and approvals are kept." },
      ],
    },
    {
      heading: "Open projects and status",
      items: [
        { text: "List all open projects with owner, status, next step and deadline." },
        { text: "Highlight risks, blockers and dependencies on other people." },
        { text: "Record commitments made to customers or colleagues that are not yet delivered." },
        { text: "Explain the reasoning behind important past decisions." },
        { text: "Decide which projects will be finished, handed over, paused or dropped." },
        { text: "Link each project to its documents, tickets and communication threads." },
      ],
    },
    {
      heading: "Video or walkthrough handover",
      items: [
        { text: "Record short walkthroughs of the trickiest tasks, tools and processes." },
        { text: "Record screen walkthroughs of tasks that are hard to explain in writing." },
        { text: "Keep each recording short and focused on one task." },
        { text: "Upload recordings to your shared storage or add external links, and name them clearly." },
        { text: "Add a short written summary beside each recording." },
        { text: "Check that the successor can view every recording." },
      ],
    },
    {
      heading: "Q&A session with the successor",
      items: [
        { text: "Schedule a live session after the written material is ready." },
        { text: "Let the successor read first and bring a list of questions." },
        { text: "Walk through a real task together, with the successor doing the work." },
        { text: "Record answers and add them to the handover documents." },
        { text: "Schedule a short follow-up for questions that come up after the first session." },
      ],
    },
    {
      heading: "Review and sign-off",
      items: [
        { text: "Have the successor confirm they understand each responsibility." },
        { text: "Have the manager review the handover for gaps." },
        { text: "Record anything that is still unresolved and who owns it." },
        { text: "Collect sign-off from the departing employee, successor and manager." },
        { text: "Set a check-in 30 days after the last day to pick up missed items." },
      ],
    },
  ],
  faq: [
    {
      q: "What is a knowledge transfer checklist?",
      a: "A knowledge transfer checklist is a structured list of what a departing employee must hand over before leaving. It covers responsibilities, contacts, recurring tasks, systems, documents and open projects, and finishes with a review. The aim is to capture context, not just file locations, so the successor can work independently.",
    },
    {
      q: "When should knowledge transfer start?",
      a: "Start as soon as notice is given. Good handover takes several days of focused work, plus time for the successor to ask questions and try the tasks. Compressing it into the final afternoon produces a list of files rather than an explanation, and gaps often only appear weeks later.",
    },
    {
      q: "What knowledge is easiest to lose?",
      a: "The undocumented knowledge: reasons behind decisions, relationship history, workarounds, and who to call when something breaks. Written processes are easy to copy, but context lives in people's heads. Recorded walkthroughs and a live question session with the successor are the most reliable ways to capture it.",
    },
    {
      q: "Who should own the handover?",
      a: "The manager owns the outcome, the departing employee provides the content, and the successor checks that it is usable. Giving the successor the job of asking questions and signing off is a simple way to find gaps early, while the leaver is still available to answer them.",
    },
    {
      q: "How do you handle a sudden departure?",
      a: "Work from what exists: the person's files, tickets, calendar and email, with their manager and close colleagues filling in context. Then ask if the leaver can answer a short list of questions after they go. Building handover habits during normal work makes sudden exits far less painful.",
    },
  ],
};
