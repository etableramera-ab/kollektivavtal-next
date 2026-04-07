"use client";

import Link from "next/link";
import { ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import FaqAccordion from "@/components/FaqAccordion";
import type { BlogPost } from "@/data/blog-posts";

interface Props {
  post: BlogPost;
  prevPost: { slug: string; title: string } | null;
  nextPost: { slug: string; title: string } | null;
}

export default function BlogPostClient({ post, prevPost, nextPost }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-6 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">Hem</Link>
              <ChevronRight size={14} />
              <Link href="/blogg" className="hover:text-white transition-colors">Blogg</Link>
              <ChevronRight size={14} />
              <span className="text-white/90 truncate">{post.title}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="rounded-[6px] bg-white/15 px-3 py-1 text-xs font-medium">{post.category}</span>
              <span className="text-sm text-white/60">{post.publishDate}</span>
              <span className="text-sm text-white/60">{post.readingTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-[56px] leading-tight" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>{post.title}</h1>
            <p className="text-sm text-white/60 mt-3">Av {post.author}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* AEO */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-[12px] bg-blue-50 border border-blue-200 p-5">
              <p className="text-sm sm:text-base text-blue-900 leading-relaxed">{post.aeoAnswer}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {post.content.map((section, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div className="mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-[32px] text-text-primary mb-3" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>{section.heading}</h2>
                {section.text.split("\n\n").map((paragraph, j) => (
                  <p key={j} className="text-text-primary leading-relaxed mb-3 text-sm sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-6" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>Vanliga frågor</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <FaqAccordion items={post.faq} />
          </AnimatedSection>
        </div>
      </section>

      {/* Related links */}
      {(post.relatedAgreements.length > 0 || post.relatedOccupations.length > 0) && (
        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {post.relatedAgreements.length > 0 && (
              <AnimatedSection>
                <h3 className="font-bold text-text-primary text-sm mb-3">Relaterade avtal</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.relatedAgreements.map((slug) => (
                    <Link
                      key={slug}
                      href={`/avtal/${slug}`}
                      className="rounded-[6px] bg-white border border-border px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-accent hover:border-accent transition-colors"
                    >
                      {slug}
                    </Link>
                  ))}
                </div>
              </AnimatedSection>
            )}
            {post.relatedOccupations.length > 0 && (
              <AnimatedSection delay={0.1}>
                <h3 className="font-bold text-text-primary text-sm mb-3">Relaterade yrken</h3>
                <div className="flex flex-wrap gap-2">
                  {post.relatedOccupations.map((slug) => (
                    <Link
                      key={slug}
                      href={`/yrke/${slug}`}
                      className="rounded-[6px] bg-white border border-border px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-accent hover:border-accent transition-colors"
                    >
                      {slug}
                    </Link>
                  ))}
                </div>
              </AnimatedSection>
            )}
          </div>
        </section>
      )}

      {/* Prev/Next navigation */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between gap-4">
            {prevPost ? (
              <Link href={`/blogg/${prevPost.slug}`} className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors min-h-[44px]">
                <ArrowLeft size={14} />
                <span className="line-clamp-1">{prevPost.title}</span>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link href={`/blogg/${nextPost.slug}`} className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors min-h-[44px] text-right">
                <span className="line-clamp-1">{nextPost.title}</span>
                <ArrowRight size={14} />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[12px] bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 leading-relaxed">
            Informationen är vägledande och ersätter inte det officiella kollektivavtalet. Kontakta ditt fackförbund för bindande besked.
          </div>
        </div>
      </section>
    </>
  );
}
