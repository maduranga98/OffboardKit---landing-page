import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogThumb, BlogCard } from "@/components/Blog";
import { ArticleBody } from "@/components/ArticleBody";
import { posts } from "@/data/posts";
import { content } from "@/data/content";

type Props = { params: Promise<{ slug: string }> };

const SITE_URL = "https://offboardkit.com";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: [post.tag],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
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
  const { emoji, gradient, tag, title, date, read } = post;
  const body = content[slug];

  const related = posts.filter((p) => p.slug !== slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "OffboardKit" },
    publisher: { "@type": "Organization", name: "OffboardKit" },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-28 md:pb-36">
        <article className="max-w-[760px] mx-auto px-6 md:px-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-mist hover:text-warm-white transition-colors mb-10"
          >
            ← Back to blog
          </Link>

          <div className="rounded-2xl overflow-hidden mb-10">
            <BlogThumb emoji={emoji} gradient={gradient} />
          </div>

          <div className="text-[10px] uppercase tracking-[0.22em] text-teal mb-4">
            {tag}
          </div>
          <h1
            className="font-display text-warm-white leading-tight mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            {title}
          </h1>
          <p className="text-[13px] text-mist mb-10">
            {date} · {read}
          </p>

          {body ? (
            <ArticleBody markdown={body} />
          ) : (
            <div className="border border-warm-white/10 rounded-2xl p-8 md:p-12 bg-slate/20 text-center">
              <p className="text-[17px] text-mist leading-relaxed">
                Full article coming soon. In the meantime, explore our other
                resources or{" "}
                <Link
                  href="/#contact"
                  className="text-teal-light hover:underline"
                >
                  get in touch
                </Link>
                .
              </p>
            </div>
          )}

          <div className="mt-14 rounded-2xl border border-teal/25 bg-teal/[0.07] p-8 md:p-10 text-center">
            <h2 className="font-display text-warm-white text-[24px] md:text-[28px] mb-3">
              Run your offboarding the right way
            </h2>
            <p className="text-mist text-[16px] leading-relaxed mb-7 max-w-xl mx-auto">
              OffboardKit coordinates HR, IT, and managers, captures knowledge,
              and keeps every leaver in your alumni network — start free.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 font-medium rounded-[10px] text-[15px] px-5 py-3 bg-teal text-navy hover:bg-teal-light transition-colors"
              >
                Start free
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center gap-2 font-medium rounded-[10px] text-[15px] px-5 py-3 border border-warm-white/15 text-warm-white hover:border-teal/40 transition-colors"
              >
                See pricing
              </Link>
            </div>
          </div>
        </article>

        <div className="max-w-[1240px] mx-auto px-6 md:px-12 mt-24">
          <h2 className="font-display text-warm-white text-[24px] md:text-[28px] mb-8">
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
    </>
  );
}
