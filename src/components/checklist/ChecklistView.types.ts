import type { Checklist } from "@/content/checklists/checklist.types";

export type ChecklistViewProps = {
  checklist: Checklist;
  /** Render the checklist's own intro paragraph above the sections. Off by default. */
  showIntro?: boolean;
};

/** Checked state keyed by "<sectionIndex>-<itemIndex>". */
export type CheckedMap = Record<string, true>;
