import type { Checklist } from "./checklist.types";
import { offboarding } from "./offboarding";
import { itOffboarding } from "./it-offboarding";
import { knowledgeTransfer } from "./knowledge-transfer";

export const checklists: Checklist[] = [offboarding, itOffboarding, knowledgeTransfer];

/** Blog post slug -> the checklist rendered inside that post. */
export const checklistByPostSlug: Record<string, Checklist> = Object.fromEntries(
  checklists.map((c) => [c.path.replace("/blog/", ""), c])
);

export { offboarding, itOffboarding, knowledgeTransfer };
