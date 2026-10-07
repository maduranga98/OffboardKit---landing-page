export type JsonLdNode = {
  "@type": string | string[];
  [key: string]: unknown;
};

export type JsonLdDocument = JsonLdNode & { "@context": "https://schema.org" };

export type BreadcrumbCrumb = {
  name: string;
  /** Site-relative path, e.g. "/blog". */
  path: string;
};

export type ArticleInput = {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  image?: string;
};
