import type { Checklist } from "./checklist.types";

export const offboarding: Checklist = {
  slug: "employee-offboarding-checklist",
  title: "Employee Offboarding Checklist",
  path: "/blog/employee-offboarding-checklist",
  pdfFile: "/downloads/employee-offboarding-checklist-c14e80ed.pdf",
  intro:
    "Offboarding is everything that happens between an employee giving notice and the moment their working relationship with your company is cleanly closed. Most gaps come from unclear ownership: HR assumes IT will cut access, IT assumes the manager will flag the leaver, and the manager assumes HR is running the process. This checklist splits the work into the stages every exit passes through, from resignation to the weeks after the last day. Assign each item to a named owner, put a date next to it counted back from the last working day, and tick it off as it is done. Adapt it to your own policies, your country's rules and your contracts. It works best as a living template that you improve after every departure rather than a one-off list.",
  sections: [
    {
      heading: "Resignation and notice",
      items: [
        { text: "Get the resignation in writing and confirm it was received." },
        { text: "Agree and record the last working day with the employee." },
        { text: "Check the employment contract and policies for notice terms that apply." },
        { text: "Tell HR, IT and the manager the same day, with the confirmed last day." },
        { text: "Agree what the team and clients will be told, and when." },
        { text: "Open the offboarding record and assign an owner to every stage below." },
      ],
    },
    {
      heading: "HR and admin",
      items: [
        { text: "Confirm leave balances, outstanding time off and any approved absences in the notice period." },
        { text: "Review the contract for confidentiality, intellectual property and other continuing obligations." },
        { text: "Prepare a leaving letter or confirmation of employment if your process includes one." },
        { text: "Check for any open requests, such as expenses, training agreements or loans." },
        { text: "Update the org chart, team lists and internal directories for the last day." },
        { text: "Decide who covers the role during the gap and record it." },
      ],
    },
    {
      heading: "Payroll and benefits handoff",
      items: [
        { text: "Send the last working day to payroll and confirm the final pay date." },
        { text: "Calculate final pay items: salary to date, unused leave, bonuses or commission due." },
        { text: "Collect and approve any outstanding expense claims before the last day." },
        { text: "List benefits that end or change, and the date each one stops." },
        { text: "Explain any options for continuing benefits, and who the employee should contact." },
        { text: "Give the employee the documents they may need later, such as final pay information." },
      ],
    },
    {
      heading: "IT and access",
      items: [
        { text: "List every system, app, device and shared account the employee uses." },
        { text: "Agree the exact time access ends on the last day." },
        { text: "Suspend the main account (single sign-on or email) at the agreed time." },
        { text: "Remove access to apps that sit outside single sign-on." },
        { text: "Reset sessions and remove registered MFA devices." },
        { text: "Rotate shared passwords and keys the employee knew." },
        { text: "Set up email forwarding or an auto-reply, and transfer file ownership." },
      ],
    },
    {
      heading: "Knowledge transfer",
      items: [
        { text: "Name a successor for each area of responsibility." },
        { text: "List recurring tasks, deadlines and the calendar events attached to them." },
        { text: "Record open projects with their status, next step and deadline." },
        { text: "Document where key files, tools and credentials live." },
        { text: "Introduce the successor to key clients, vendors and internal contacts." },
        { text: "Hold at least one live handover session and let the successor ask questions." },
      ],
    },
    {
      heading: "Equipment return",
      items: [
        { text: "List all company equipment issued: laptop, phone, badge, keys, tokens and accessories." },
        { text: "Arrange pickup or a prepaid return for remote employees." },
        { text: "Check each returned item against the issue record." },
        { text: "Back up any company data needed, then wipe devices according to your process." },
        { text: "Update the asset register and note the condition of each item." },
      ],
    },
    {
      heading: "Exit interview",
      items: [
        { text: "Schedule the exit interview before the final week, with someone outside the direct reporting line." },
        { text: "Tell the employee how their answers will be stored and who will see them." },
        { text: "Use a consistent set of questions so answers can be compared over time." },
        { text: "Ask what worked, what did not, and what would have changed the decision to leave." },
        { text: "Record themes and follow-up actions, not just a summary of the conversation." },
      ],
    },
    {
      heading: "Last day",
      items: [
        { text: "Confirm all open tasks are handed over or reassigned." },
        { text: "Collect any remaining equipment, badges and keys." },
        { text: "Complete any acknowledgements or sign-offs your process requires." },
        { text: "Revoke access at the agreed time and confirm it worked." },
        { text: "Send the team a short farewell message the employee has agreed to." },
        { text: "Give the employee a point of contact for questions after they leave." },
      ],
    },
    {
      heading: "Post-departure",
      items: [
        { text: "Confirm final pay was processed correctly and on time." },
        { text: "Check access logs for activity after the last day." },
        { text: "Review forwarded email and auto-replies, then close them on schedule." },
        { text: "Archive or transfer remaining data, mailboxes and files." },
        { text: "Check in with the successor after 30 days for knowledge gaps." },
        { text: "Review what went well and badly, and update this checklist." },
        { text: "Decide whether to keep in touch through an alumni list, with the employee's agreement." },
      ],
    },
  ],
  faq: [
    {
      q: "What should an employee offboarding checklist include?",
      a: "A good checklist covers the full exit: notice and communication, HR and payroll tasks, access revocation, knowledge transfer, equipment return, the exit interview, the last day and follow-up afterwards. Each item should have a named owner and a date counted back from the last working day, so nothing relies on someone remembering.",
    },
    {
      q: "Who is responsible for offboarding?",
      a: "Offboarding is shared. HR usually owns the process and paperwork, IT owns access and devices, and the manager owns the handover of work and relationships. The most common failure is that nobody owns the whole list, so name one coordinator and give every task a specific owner and deadline.",
    },
    {
      q: "When should offboarding start?",
      a: "Start the day notice is given, not on the last day. Early start gives time for knowledge transfer, scheduling the exit interview and planning access removal. Even for a short notice period, sending the confirmed last day to HR, IT and the manager on day one prevents most missed steps.",
    },
    {
      q: "How is offboarding different for involuntary exits?",
      a: "Timing and tone change. Access and devices often need to be handled immediately, communication is more tightly controlled, and a long handover may not be possible. The same stages still apply, but plan the order in advance with HR, IT and legal or employment advisers so everything is consistent and respectful.",
    },
    {
      q: "Should the checklist be the same for every employee?",
      a: "Keep one core checklist and add steps by role. A software engineer needs code repository and cloud access removed, while a salesperson needs account ownership transferred. Starting from a shared template keeps exits consistent, and role-specific additions cover the risks that differ from person to person.",
    },
  ],
};
