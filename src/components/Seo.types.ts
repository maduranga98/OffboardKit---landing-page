export type SeoProps = {
  /** Full document title, suffix included. */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/pricing". Used for the canonical and og:url. */
  path: string;
  /** Absolute URL or site-relative path. Defaults to /og-default.png. */
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** ISO 8601. Only emitted when type is "article". */
  publishedTime?: string;
  /** ISO 8601. Only emitted when type is "article". */
  modifiedTime?: string;
};
