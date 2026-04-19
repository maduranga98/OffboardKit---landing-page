import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogThumb } from "@/components/Blog";
import { posts } from "@/data/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — OffboardKit Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const { emoji, gradient, tag, title, date, read } = post;

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-28 md:pb-36">
        <div className="max-w-[760px] mx-auto px-6 md:px-12">
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

          <div className="border border-warm-white/10 rounded-2xl p-8 md:p-12 bg-slate/20 text-center">
            <p className="text-[17px] text-mist leading-relaxed">
              Full article coming soon. In the meantime, explore our other
              resources or{" "}
              <Link href="/#contact" className="text-teal-light hover:underline">
                get in touch
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
