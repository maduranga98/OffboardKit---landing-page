import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogThumb, BlogCard } from "@/components/Blog";
import { ArticleBody } from "@/components/ArticleBody";
import { posts, type Post } from "@/data/posts";
import { content } from "@/data/content";

type Props = { params: Promise<{ slug: string }> };

const SITE_URL = "https://offboardset.com";

const toIso = (date: string) => new Date(date).toISOString();

// Strips the markdown subset used in article bodies down to plain text.
function toPlainText(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(^|\s)[*_]([^*_]+)[*_](?=\s|[.,;:!?]|$)/g, "$1$2")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s*(?:[-*]|\d+\.)\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Pulls "### Question" / answer pairs out of the article's "## FAQs" section.
function extractFaqs(markdown: string | undefined) {
  const section = markdown?.split(/^## FAQs?\s*$/m)[1]?.split(/^## /m)[0];
  if (!section) return [];
  return section
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const [question, ...rest] = block.trim().split("\n");
      const answer = toPlainText(rest.join("\n"));
      return { question: toPlainText(question), answer };
    })
    .filter((f) => f.question && f.answer);
}

// Same-topic posts first, then the most recent others.
function relatedPosts(post: Post, count = 3) {
  const others = posts.filter((p) => p.slug !== post.slug);
  return [
    ...others.filter((p) => p.tag === post.tag),
    ...others.filter((p) => p.tag !== post.tag),
  ].slice(0, count);
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.seoTitle,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${SITE_URL}/blog/${slug}`,
      siteName: "OffboardSet",
      publishedTime: toIso(post.date),
      modifiedTime: toIso(post.updated ?? post.date),
      tags: [post.tag],
      images: [
        { url: "/og-image.png", width: 1424, height: 751, alt: post.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const { icon, gradient, tag, title, date, updated, read } = post;
  const body = content[slug];
  const faqs = extractFaqs(body);
  const related = relatedPosts(post);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: post.description,
    datePublished: toIso(date),
    dateModified: toIso(updated ?? date),
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og-image.png`,
      width: 1424,
      height: 751,
    },
    inLanguage: "en-US",
    author: { "@type": "Organization", name: "OffboardSet", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "OffboardSet",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 235,
        height: 264,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
      url: `${SITE_URL}/blog/${slug}`,
    },
  };

  const faqSchema = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: title, item: `${SITE_URL}/blog/${slug}` },
    ],
  };

  return (
    <>
      <Navbar />
      <main className="pt-28 md:pt-36 pb-24 md:pb-[110px]">
        <article className="max-w-[760px] mx-auto px-6 md:px-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors mb-10"
          >
            ← Back to blog
          </Link>

          <div className="rounded-2xl overflow-hidden mb-10">
            <BlogThumb icon={icon} gradient={gradient} />
          </div>

          <div className="text-[10px] uppercase tracking-[0.22em] text-teal-deep mb-4">
            {tag}
          </div>
          <h1
            className="font-display text-ink leading-tight mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            {title}
          </h1>
          <p className="text-[13px] text-muted mb-10">
            {updated ? <>Updated {updated}</> : date} · {read}
          </p>

          {body ? (
            <ArticleBody markdown={body} />
          ) : (
            <div className="border border-ink/[0.08] rounded-2xl p-8 md:p-12 bg-card text-center">
              <p className="text-[17px] text-muted leading-relaxed">
                Full article coming soon. In the meantime, explore our other
                resources or{" "}
                <Link
                  href="/#contact"
                  className="text-teal-deep hover:underline"
                >
                  get in touch
                </Link>
                .
              </p>
            </div>
          )}

          <div className="mt-14 rounded-2xl border border-teal/25 bg-teal/[0.07] p-8 md:p-10 text-center">
            <h2 className="font-display text-ink text-[24px] md:text-[28px] mb-3">
              Run your offboarding the right way
            </h2>
            <p className="text-muted text-[16px] leading-relaxed mb-7 max-w-xl mx-auto">
              OffboardSet coordinates HR, IT, and managers, captures knowledge,
              and keeps every leaver in your alumni network.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 font-medium rounded-[10px] text-[15px] px-5 py-3 bg-teal text-ink hover:bg-teal-light transition-colors"
              >
                Get started
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center gap-2 font-medium rounded-[10px] text-[15px] px-5 py-3 border border-ink/[0.12] text-ink hover:border-teal/40 transition-colors"
              >
                See pricing
              </Link>
            </div>
          </div>
        </article>

        <div className="container-page mt-24">
          <h2 className="font-display text-ink text-[24px] md:text-[28px] mb-8">
            Keep reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
