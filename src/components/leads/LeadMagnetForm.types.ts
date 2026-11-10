export type LeadFormStatus = "idle" | "loading" | "success" | "error";

export type LeadMagnetFormProps = {
  /** Checklist slug, sent to the API as `source`. */
  source: string;
  /** Shown in the heading, e.g. "IT Offboarding Checklist". */
  checklistTitle: string;
};

export type LeadResponse = {
  ok: boolean;
  downloadUrl?: string;
  /** False when the download link could not be emailed; the link is still returned. */
  emailed?: boolean;
  error?: string;
};
