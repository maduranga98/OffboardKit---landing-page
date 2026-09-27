import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/Blog";
import { SectionLabel } from "@/components/ui";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Employee Offboarding Blog — Guides, Checklists & Comparisons",
  description:
    "Practical playbooks on knowledge transfer, access revocation, exit interviews and alumni — written by HR operators, not marketers.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Employee Offboarding Blog — Guides, Checklists & Comparisons",
    description:
      "Practical playbooks on knowledge transfer, access revocation, exit interviews and alumni networks.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 md:pt-36 pb-24 md:pb-[110px]">
        <div className="container-page">
          <div className="max-w-3xl mb-14">
            <SectionLabel>From the blog</SectionLabel>
            <h1
              className="font-display text-ink mt-4"
              style={{ fontSize: "clamp(26px, 3.4vw, 44px)", lineHeight: 1.06 }}
            >
              Offboarding insights for{" "}
              <em className="text-teal" style={{ fontStyle: "italic" }}>
                HR teams
              </em>
            </h1>
            <p className="text-muted text-[17px] leading-relaxed mt-5 max-w-2xl">
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
