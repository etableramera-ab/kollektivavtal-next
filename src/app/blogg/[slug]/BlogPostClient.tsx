"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import FaqAccordion from "@/components/FaqAccordion";
import type { BlogPost } from "@/data/blog-posts";

const blogImages: Record<string, string> = {
  "loneforhojning-2026": "/Images/blog/loneforhojning-2026.jpg",
  "avtalsrorelsen-2027-guide": "/Images/blog/avtalsrorelsen-2027.jpg",
  "ob-tillagg-2026-alla-branscher": "/Images/blog/ob-tillagg-2026.jpg",
  "minimiion-sverige-2026": "/Images/blog/minimilon-2026.jpg",
  "uppsagningstid-enligt-kollektivavtal": "/Images/blog/uppsagningstid-2026.jpg",
  "foraldralon-kollektivavtal-2026": "/Images/blog/foraldralon-2026.jpg",
  "tjanstepension-kollektivavtal": "/Images/blog/tjanstepension-2026.jpg",
  "skillnad-med-utan-kollektivavtal": "/Images/blog/med-utan-kollektivavtal.jpg",
  "sa-fungerar-loneforhandling": "/Images/blog/loneforhandling-guide.jpg",
  "arbetstidsforkortning-2026": "/Images/blog/arbetstidsforkortning-2026.jpg",
};

interface Props {
  post: BlogPost;
  prevPost: { slug: string; title: string } | null;
  nextPost: { slug: string; title: string } | null;
}

export default function BlogPostClient({ post, prevPost, nextPost }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white pt-10 pb-10 sm:pb-14">
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

            <h1 className="text-3xl sm:text-4xl md:text-[56px] leading-tight" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>{post.title}</h1>
            <p className="text-sm text-white/60 mt-3">Av {post.author}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Header image */}
      {blogImages[post.slug] && (
        <div className="relative h-[200px] sm:h-[300px] w-full overflow-hidden">
          <Image
            src={blogImages[post.slug]}
            alt={`Illustration till ${post.title}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F8F7F4]" />
        </div>
      )}

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
                <h2 className="text-2xl sm:text-[32px] text-text-primary mb-3" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>{section.heading}</h2>
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
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-6" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>Vanliga frågor</h2>
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

      {/* Insurance ad — blog bottom */}
      <section className="py-6">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <a
            href={`https://allaforsakringar.com?utm_source=kollektivavtal&utm_medium=blog-bottom&utm_campaign=blogg-${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl p-8 sm:p-10 text-center border border-[#FDE68A] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all"
            style={{ background: "linear-gradient(135deg, #F8F7F4 0%, #FEF3C7 100%)" }}
          >
            <p className="text-2xl sm:text-[28px] text-text-primary" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
              Vill du jämföra försäkringar?
            </p>
            <p className="text-[16px] text-text-secondary mt-2 max-w-md mx-auto">
              Hitta rätt hemförsäkring, inkomstförsäkring och tjänstepension — oberoende jämförelser på ett ställe.
            </p>
            <span className="inline-block mt-4 px-8 py-3 rounded-lg text-white font-semibold text-[16px]" style={{ background: "#D97706" }}>
              Jämför på allaforsakringar.com →
            </span>
            <p className="text-[13px] text-[#6B7280] mt-3">Oberoende jämförelser · Gratis · Inga bindningar</p>
            <p className="text-[11px] text-[#9CA3AF] mt-1">Annons</p>
          </a>
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
