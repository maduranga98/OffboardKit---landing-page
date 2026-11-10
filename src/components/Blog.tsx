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
import { Accent, Button, SectionHeading, SectionLabel } from "./ui";
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
      className={`h-40 flex items-center justify-center bg-navy bg-gradient-to-br ${gradient} relative`}
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
      className="group flex flex-col h-full bg-card border border-ink/[0.08] rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-card transition-all duration-200"
    >
      <BlogThumb icon={post.icon} gradient={post.gradient} />
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-[10px] uppercase tracking-[0.22em] text-teal-deep mb-3">
          {post.tag}
        </div>
        <h3 className="font-display text-[18px] text-ink leading-snug mb-2.5 group-hover:text-teal-deep transition-colors duration-200">
          {post.title}
        </h3>
        <p className="text-[13.5px] text-muted leading-relaxed flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-5 text-[12px] text-muted">
          <span>
            {post.date} · {post.read}
          </span>
          <span className="text-teal-deep font-medium">Read →</span>
        </div>
      </div>
    </Link>
  );
}

const alternativeLinks = [
  { href: "/blog/rippling-alternatives", label: "Rippling alternatives" },
  { href: "/blog/bamboohr-alternatives", label: "BambooHR alternatives" },
  { href: "/blog/workday-alternatives", label: "Workday alternatives" },
  { href: "/blog/lumos-alternatives", label: "Lumos alternatives" },
];

export function Blog() {
  const preview = posts.slice(0, 3);

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="py-24 md:py-[110px] bg-ink/[0.03] border-y border-ink/[0.07]"
    >
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto">
          <SectionLabel>From the blog</SectionLabel>
          <SectionHeading id="blog-heading">
            Offboarding insights for <Accent>HR teams</Accent>
          </SectionHeading>
          <p className="text-muted text-[15px] leading-relaxed mt-4">
            Practical playbooks on knowledge transfer, access revocation, exit
            interviews and alumni — written by HR operators, not marketers.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[18px] mt-11">
          {preview.map((p, i) => (
            <Reveal key={p.slug} delay={i * 50}>
              <BlogCard post={p} />
            </Reveal>
          ))}
        </div>

        <p className="text-center text-[13.5px] text-muted mt-8">
          Comparing tools? See the{" "}
          {alternativeLinks.map(({ href, label }, i) => (
            <span key={href}>
              {i > 0 && (i === alternativeLinks.length - 1 ? ", and " : ", ")}
              <Link href={href} className="text-teal-deep hover:underline">
                {label}
              </Link>
            </span>
          ))}{" "}
          guides.
        </p>

        <div className="flex justify-center mt-6">
          <Button as="a" href="/blog" variant="outline" size="md">
            View all articles <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </section>
  );
}
