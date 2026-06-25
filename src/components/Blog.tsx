import Link from "next/link";
import { ArrowRight } from "./icons";
import { Button, SectionLabel } from "./ui";
import { Reveal } from "./Reveal";
import { posts, type Post } from "@/data/posts";

export function BlogThumb({ emoji, gradient }: { emoji: string; gradient: string }) {
  return (
    <div
      className={`h-40 flex items-center justify-center text-5xl bg-gradient-to-br ${gradient} relative`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy/60" />
      <span className="relative drop-shadow-lg">{emoji}</span>
    </div>
  );
}

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-col h-full bg-slate/35 border border-warm-white/[0.07] rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-teal/25 transition-all duration-200"
    >
      <BlogThumb emoji={post.emoji} gradient={post.gradient} />
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-[10px] uppercase tracking-[0.22em] text-teal mb-3">
          {post.tag}
        </div>
        <div className="text-[17px] text-warm-white leading-snug mb-2.5">
          {post.title}
        </div>
        <p className="text-[14px] text-mist leading-relaxed flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-5 text-[12px] text-mist">
          <span>
            {post.date} · {post.read}
          </span>
          <span className="text-teal-light font-medium">Read →</span>
        </div>
      </div>
    </Link>
  );
}

export function Blog() {
  const preview = posts.slice(0, 3);

  return (
    <section id="blog" className="py-28 md:py-36">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <Reveal className="max-w-3xl">
          <SectionLabel>From the blog</SectionLabel>
          <h2
            className="font-display text-warm-white mt-4"
            style={{ fontSize: "clamp(26px, 3.4vw, 44px)", lineHeight: 1.06 }}
          >
            Offboarding insights for{" "}
            <em className="text-teal-light" style={{ fontStyle: "italic" }}>
              HR teams
            </em>
          </h2>
          <p className="text-mist text-[17px] leading-relaxed mt-5 max-w-2xl">
            Practical playbooks on knowledge transfer, access revocation, exit
            interviews and alumni — written by HR operators, not marketers.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {preview.map((p, i) => (
            <Reveal key={p.slug} delay={i * 50}>
              <BlogCard post={p} />
            </Reveal>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/blog">
            <Button variant="outline" size="md">
              View all articles <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
