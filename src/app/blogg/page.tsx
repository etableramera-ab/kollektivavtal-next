"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const categories = ["Alla", "Löner", "Avtalsrörelsen", "Rättigheter", "Guider"];

export default function BloggOverview() {
  const [category, setCategory] = useState("Alla");

  const filtered = useMemo(() => {
    const posts = category === "Alla" ? blogPosts : blogPosts.filter((p) => p.category === category);
    return [...posts].sort((a, b) => b.publishDate.localeCompare(a.publishDate));
  }, [category]);

  return (
    <>
      <section style={{ background: "linear-gradient(135deg, #0F766E 0%, #0A5F59 40%, #0D6B64 100%)" }} className="text-white py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl md:text-[56px]" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>
              Nyheter och guider om kollektivavtal
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Löner, rättigheter, avtalsrörelsen och praktiska guider
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-16 sm:pb-20 pt-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-wrap gap-1.5 mb-8">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors min-h-[36px] ${
                    category === c
                      ? "bg-primary text-white"
                      : "bg-white border border-border text-[#374151] hover:bg-[#F0FDFA] hover:border-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {filtered.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.05}>
                <Link href={`/blogg/${post.slug}`} className="block">
                  <div className="rounded-[12px] border border-border bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="rounded-full bg-primary text-white text-[13px] font-semibold px-3.5 py-1">
                        {post.category}
                      </span>
                      <span className="text-xs text-text-secondary">{post.publishDate}</span>
                      <span className="text-xs text-text-secondary">{post.readingTime}</span>
                    </div>
                    <h2 className="text-[24px] text-text-primary leading-snug" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>
                      {post.title}
                    </h2>
                    <p className="text-sm text-text-secondary mt-2">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-[15px] font-semibold text-primary mt-3">
                      Läs mer <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
