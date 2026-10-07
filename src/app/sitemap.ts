import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { toIsoDate } from "@/lib/dates";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/** Last git commit date of a source file, or undefined when git history is unavailable. */
function lastCommitDate(file: string): Date | undefined {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out ? new Date(out) : undefined;
  } catch {
    return undefined;
  }
}

const postDate = (p: (typeof posts)[number]) => new Date(toIsoDate(p.updated ?? p.date));

/**
 * Indexable routes only. lastModified is always a real date: post dates for articles,
 * the last git commit of the source file for static pages (never the build time).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const newestPost = new Date(Math.max(...posts.map((p) => postDate(p).getTime())));
  const home = lastCommitDate("src/app/page.tsx") ?? newestPost;
  const pricing = lastCommitDate("src/app/pricing/page.tsx") ?? newestPost;

  return [
    { url: SITE_URL, lastModified: home, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/pricing`, lastModified: pricing, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: newestPost, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: postDate(post),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
