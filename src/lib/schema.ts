import { plans } from "@/data/plans";
import type { FaqItem } from "@/data/faqs.types";
import type {
  ArticleInput,
  BreadcrumbCrumb,
  JsonLdDocument,
  JsonLdNode,
} from "./schema.types";
import {
  DEFAULT_OG_IMAGE,
  LINKEDIN_URL,
  LOGO,
  OG_IMAGE_SIZE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  canonicalUrl,
} from "./site";

const CONTEXT = "https://schema.org" as const;
const ORG_ID = `${SITE_URL}/#organization`;

const doc = (node: JsonLdNode): JsonLdDocument => ({
  "@context": CONTEXT,
  ...node,
});

const orgRef = { "@id": ORG_ID };

export function organizationSchema(): JsonLdDocument {
  return doc({
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: absoluteUrl(LOGO.path),
      contentUrl: absoluteUrl(LOGO.path),
      width: LOGO.width,
      height: LOGO.height,
      caption: SITE_NAME,
    },
    parentOrganization: { "@type": "Organization", name: "Lumora Ventures" },
    sameAs: [LINKEDIN_URL],
  });
}

export function websiteSchema(): JsonLdDocument {
  return doc({
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: orgRef,
    inLanguage: "en-US",
  });
}

/** Offers come from the shared plan data; Enterprise (custom pricing) is omitted. */
export function softwareApplicationSchema(): JsonLdDocument {
  return doc({
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Employee offboarding software that automates checklists, access revocation, knowledge transfer and exit interviews.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      url: canonicalUrl("/pricing"),
      price: plan.monthlyPrice,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: plan.monthlyPrice,
        priceCurrency: "USD",
        billingDuration: "P1M",
        unitCode: "MON",
      },
    })),
  });
}

/** Question/answer text is passed through unchanged so it matches the visible FAQ exactly. */
export function faqPageSchema(faqs: FaqItem[]): JsonLdDocument {
  return doc({
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  });
}

/** Home is prepended automatically; pass the remaining crumbs in order. */
export function breadcrumbSchema(crumbs: BreadcrumbCrumb[]): JsonLdDocument {
  const all: BreadcrumbCrumb[] = [{ name: "Home", path: "/" }, ...crumbs];
  return doc({
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: canonicalUrl(c.path),
    })),
  });
}

export function blogPostingSchema(input: ArticleInput): JsonLdDocument {
  const url = canonicalUrl(input.path);
  return doc({
    "@type": "BlogPosting",
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(input.image ?? DEFAULT_OG_IMAGE),
      width: OG_IMAGE_SIZE.width,
      height: OG_IMAGE_SIZE.height,
    },
    inLanguage: "en-US",
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(LOGO.path),
        width: LOGO.width,
        height: LOGO.height,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url, url },
  });
}
