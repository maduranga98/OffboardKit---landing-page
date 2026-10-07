export const SITE_URL = "https://offboardset.com";
export const SITE_NAME = "OffboardSet";
export const DEFAULT_OG_IMAGE = "/og-default.png";
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const LOGO = { path: "/logo.png", width: 235, height: 264 } as const;
export const LINKEDIN_URL = "https://www.linkedin.com/company/offboardset/";

/** Absolute URL for a site path or an already-absolute URL. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

/** Canonical URL: origin + path, no query, no hash, no trailing slash. */
export function canonicalUrl(path: string): string {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, "");
  return `${SITE_URL}${clean && !clean.startsWith("/") ? "/" : ""}${clean}`;
}
