/** Raw JSON body accepted by landing_captureLead. Every field is untrusted until validated. */
export type LeadRequestBody = {
  email?: unknown;
  source?: unknown;
  consent?: unknown;
  /** Honeypot: real visitors never fill it in. */
  website?: unknown;
};

export type ValidLead = {
  /** Trimmed and lowercased. */
  email: string;
  /** A checklist slug present in downloads.json. */
  source: string;
};

export type LeadSuccessResponse = {
  ok: true;
  downloadUrl?: string;
  emailed?: boolean;
};

export type LeadErrorResponse = {
  ok: false;
  error: string;
};

export type LeadConfig = {
  brevoApiKey: string;
  brevoListId: number;
  senderEmail: string;
  downloadBaseUrl: string;
};
