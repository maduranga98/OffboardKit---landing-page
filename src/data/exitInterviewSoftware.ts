import type { FaqItem } from "./faqs.types";

/** Article body for /exit-interview-software, authored in the markdown subset ArticleBody renders. */
export const exitInterviewSoftwareBody = `
Exit interview software helps HR teams collect, store and learn from the feedback people give when they leave. This buyer's guide explains what the category does, which features matter, what to ask vendors, and how to think about anonymity and manager access, so you can compare tools on substance instead of feature lists.

## What Exit Interview Software Does

Exit interview software replaces ad hoc conversations and scattered notes with a structured, repeatable process. It schedules the interview or sends the form, reminds the leaver, stores the answers in one place, and lets you look at responses across many departures instead of one at a time.

The value is consistency. A single exit interview is an anecdote: one person's view on one day. The same questions asked of everyone who leaves, stored in a form you can search and compare, start to show patterns in why people go and what could have changed their mind.

Most tools cover four jobs:

- **Collection:** question templates, forms or guided conversations, with reminders until the leaver completes them.
- **Storage:** responses kept securely with defined access, instead of in a personal notebook or email thread.
- **Analysis:** tagging, themes and trends by department, role or tenure.
- **Follow-through:** a way to turn what you learn into actions that someone owns.

## What to Look For

Feature lists look similar, so focus on how each capability works in practice for your team.

- **Flexible question sets.** You should be able to vary questions by role, level or exit type, and reuse a standard core so answers stay comparable. If you need ideas, start from a set of [exit interview questions you can adapt](/blog/exit-interview-questions).
- **Delivery options.** Some people prefer a short written form, others a live conversation. Check whether the tool supports the format your leavers will actually complete.
- **Completion tracking.** Reminders and a clear view of who has and has not responded save HR from chasing people manually.
- **Access controls.** Decide who should see raw responses, and confirm the tool can enforce it.
- **Anonymity options.** Understand exactly what is hidden, from whom, and how.
- **Analytics.** Look for theme tagging and trends you can filter by department, tenure or exit reason, and for exports if you analyze data elsewhere.
- **Fit with the wider exit process.** Exit interviews work best as one step in offboarding, alongside handover, access removal and equipment return, not as a separate silo.
- **Setup and admin effort.** A tool nobody has time to configure will not get used.

## Questions to Ask Every Vendor

Put the same questions to every vendor and compare the answers side by side.

1. Who can see individual responses, and how is that enforced: in the interface only, or at the data layer as well?
2. Can managers see responses? Can that be turned off, and can it be turned on for specific roles?
3. What does "anonymous" mean in your product, and what happens in a small team where the leaver is easy to identify?
4. How are responses stored, how long are they kept, and can we delete a leaver's data on request?
5. How do you analyze free-text answers, and can we see how a theme was derived?
6. Can we change the questions per role or exit type without vendor help?
7. What do we get out of the tool if we want to analyze exit data elsewhere?
8. How does it connect to the rest of our offboarding process, including handover and access removal?
9. How is pricing structured, and what changes as headcount grows? Ask for the details in writing and check them against our [pricing page](/pricing) for OffboardSet.

## Anonymity and Manager Access

These two topics are often mixed up, so separate them before you evaluate tools.

**Anonymous** means the organization cannot tell who said what. **Confidential** means responses are attributed but restricted to a small group, typically HR. Most exit interviews are confidential rather than anonymous, because exit feedback is more useful when you can follow up, and because the leaver is already known. True anonymity also breaks down in small teams, where a single comment can identify its author.

Manager access is a trade-off. Managers often want to see what their leavers said, and the feedback can help them improve. But people tend to be less candid if they expect their manager to read the answers, especially when the manager is part of the reason they are leaving. A common approach is to give HR or a small review group access to raw responses, and share themes with managers in aggregate and with names removed.

Whatever you choose, ask how the restriction is enforced. Hiding a field in the interface is weaker than restricting access in the database, because the data is still reachable some other way.

## From Exit Data to Turnover Insights

Exit data only reduces turnover if someone reads it and acts. A few habits make that more likely:

- **Tag reasons consistently.** Use a short, shared list such as compensation, management, growth, workload and flexibility, so reasons can be counted.
- **Look at groups, not individuals.** Compare by department, role or tenure, and be careful with small samples, where one person can distort the picture.
- **Combine sources.** Pair exit data with stay interviews and engagement survey results, so you hear from people who stay as well as those who go.
- **Assign owners.** A theme with no owner becomes a slide in a quarterly deck. Give each recurring issue a person and a review date.
- **Close the loop.** Tell managers and leadership what changed because of the feedback. It encourages honest answers next time.

## How OffboardSet Handles Exit Interviews

In OffboardSet, the exit interview is part of the offboarding workflow, assigned and tracked alongside every other task. It sits next to knowledge transfer, access revocation and equipment return in the same plan, with the same deadlines counted back from the last working day.

The Starter plan includes basic exit interviews. On Growth and above, AI sentiment analysis scores each response, and theme and risk extraction surfaces patterns across departures for HR leadership. These run quietly in the background, with nothing to configure.

On access, managers cannot see exit interview responses in OffboardSet. This is blocked in the interface and in the database security rules, not just hidden from view. For plan details, see the [OffboardSet pricing](/pricing) page, and for the rest of the exit process, use the [employee offboarding checklist](/blog/employee-offboarding-checklist).
`;

export const exitInterviewFaqs: FaqItem[] = [
  {
    q: "What is exit interview software?",
    a: "Exit interview software is a tool that helps HR teams run, record and analyze exit interviews in a consistent way. It sends questions to leavers, tracks completion, stores responses with controlled access, and helps you spot patterns across many departures instead of relying on notes from individual conversations.",
  },
  {
    q: "Should exit interviews be anonymous?",
    a: "It depends on your goal. Anonymous responses can be more candid, but you cannot follow up and small teams make anonymity hard to keep. Many organizations use confidential interviews instead: attributed answers, visible only to a small group such as HR. Decide up front and tell leavers clearly how their answers will be used.",
  },
  {
    q: "When should an exit interview happen?",
    a: "Most teams hold it in the final week or on the last day, once the decision is final and the handover is largely done. Some also follow up a few weeks later, when people can be more reflective. Whatever you choose, schedule it in advance and have someone outside the direct reporting line run it.",
  },
  {
    q: "Can managers see exit interview responses?",
    a: "In OffboardSet, no. Managers cannot see exit interview responses, and this is blocked both in the interface and in the database security rules. That protects candor from leavers. Whichever tool you choose, ask the vendor how access is restricted and whether the restriction is enforced beyond the screen.",
  },
  {
    q: "How does exit data help reduce turnover?",
    a: "Exit data shows why people leave, so you can fix the causes. Used consistently, it reveals recurring themes such as management, growth or workload by team. Turnover only falls when someone owns each theme, acts on it and checks later whether it changed, so pair the data with named owners.",
  },
];
