import type { SeoProps } from "./Seo.types";

/**
 * Renders the JSON-LD blocks for a route.
 *
 * Next.js App Router owns <head>, so the title, description, canonical, Open Graph
 * and Twitter tags come from `buildMetadata()` in `@/lib/seo` (exported via each
 * route's `metadata` / `generateMetadata`). Both take the same `SeoProps`.
 */
export function Seo({ jsonLd }: Pick<SeoProps, "jsonLd">) {
  if (!jsonLd) return null;
  const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Escape "<" so content can never close the script element.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
