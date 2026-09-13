import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Building,
  ClipboardList,
  Compass,
  DollarSign,
  Globe,
  Key,
  Layers,
  MessageSquare,
  RefreshCw,
  Repeat,
  ScrollText,
  Shield,
  Shuffle,
  Wrench,
} from "./icons";
import { Button, SectionLabel } from "./ui";
import { Reveal } from "./Reveal";
import { posts, type Post, type PostIcon } from "@/data/posts";

const postIcons: Record<PostIcon, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  layers: Layers,
  shuffle: Shuffle,
  building: Building,
  key: Key,
  compass: Compass,
  clipboard: ClipboardList,
  wrench: Wrench,
  brain: Brain,
  message: MessageSquare,
  refresh: RefreshCw,
  shield: Shield,
  repeat: Repeat,
  dollar: DollarSign,
  globe: Globe,
  scroll: ScrollText,
};

export function BlogThumb({ icon, gradient }: { icon: PostIcon; gradient: string }) {
  const Icon = postIcons[icon];
  return (
    <div
      className={`h-40 flex items-center justify-center bg-gradient-to-br ${gradient} relative`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy/60" />
      <div className="relative flex items-center justify-center h-14 w-14 rounded-2xl border border-warm-white/15 bg-navy/35 backdrop-blur-sm">
        <Icon size={24} strokeWidth={1.5} className="text-teal-light" />
      </div>
    </div>
  );
}

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-col h-full bg-slate/35 border border-warm-white/[0.07] rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-teal/25 transition-all duration-200"
    >
      <BlogThumb icon={post.icon} gradient={post.gradient} />
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
