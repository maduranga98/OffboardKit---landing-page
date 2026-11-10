import type { Metadata } from "next";
import type { SeoProps } from "@/components/Seo.types";
import {
  DEFAULT_OG_IMAGE,
  OG_IMAGE_SIZE,
  SITE_NAME,
  absoluteUrl,
  canonicalUrl,
} from "./site";

/** Builds the Next.js Metadata object for a route from the shared SEO props. */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noindex = false,
  publishedTime,
  modifiedTime,
}: SeoProps): Metadata {
  const url = canonicalUrl(path);
  const imageUrl = absoluteUrl(image ?? DEFAULT_OG_IMAGE);
  const imageSize = image ? {} : OG_IMAGE_SIZE;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [{ url: imageUrl, ...imageSize, alt: title }],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
