/**
 * Lead capture stays off until a real Privacy Policy page exists. Set
 * NEXT_PUBLIC_LEAD_CAPTURE_ENABLED=true at build time to turn the form on.
 */
export const LEAD_CAPTURE_ENABLED = process.env.NEXT_PUBLIC_LEAD_CAPTURE_ENABLED === "true";

export const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "/api/lead";
