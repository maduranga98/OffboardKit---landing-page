import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-28 md:pb-36">
        <div className="max-w-[760px] mx-auto px-6 md:px-12 text-center">
          <div className="text-[10px] uppercase tracking-[0.22em] text-teal mb-4">
            404
          </div>
          <h1
            className="font-display text-warm-white leading-tight mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            This page has been offboarded.
          </h1>
          <p className="text-mist text-[17px] leading-relaxed mb-10 max-w-xl mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has moved.
            Unlike a departing employee&apos;s knowledge, there&apos;s nothing
            to recover here — but the rest of the site is intact.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 font-medium rounded-[10px] text-[15px] px-5 py-3 bg-teal text-navy hover:bg-teal-light transition-colors"
            >
              Back to home
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 font-medium rounded-[10px] text-[15px] px-5 py-3 border border-warm-white/15 text-warm-white hover:border-teal/40 transition-colors"
            >
              Read the blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
