import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/Blog";
import { SectionLabel } from "@/components/ui";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog — HRExitFlow",
  description:
    "Practical playbooks on knowledge transfer, access revocation, exit interviews and alumni — written by HR operators, not marketers.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-28 md:pb-36">
        <div className="max-w-[1240px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-14">
            <SectionLabel>From the blog</SectionLabel>
            <h1
              className="font-display text-warm-white mt-4"
              style={{ fontSize: "clamp(34px, 4.6vw, 56px)", lineHeight: 1.05 }}
            >
              Offboarding insights for{" "}
              <em className="text-teal-light" style={{ fontStyle: "italic" }}>
                HR teams
              </em>
            </h1>
            <p className="text-mist text-[17px] leading-relaxed mt-5 max-w-2xl">
              Practical playbooks on knowledge transfer, access revocation, exit
              interviews and alumni — written by HR operators, not marketers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
