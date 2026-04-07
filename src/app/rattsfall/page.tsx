"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Search, ArrowRight } from "lucide-react";
import { courtCases, getAvailableYears, getAvailableTopics } from "@/data/court-cases";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const serif = { fontFamily: "var(--font-dm-serif, var(--font-serif))" };
const INITIAL_COUNT = 20;

// Featured: 3 most recent (prefer guiding)
const guiding = courtCases.filter((c) => c.isGuiding);
const featured3 = guiding.length >= 3 ? guiding.slice(0, 3) : courtCases.slice(0, 3);
const featuredIds = new Set(featured3.map((c) => c.id));

export default function Rattsfall() {
  const [topic, setTopic] = useState("Alla");
  const [year, setYear] = useState("Alla");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const years = getAvailableYears();
  const topics = ["Alla", ...getAvailableTopics()];

  const filtered = useMemo(() => {
    let result = courtCases.filter((c) => !featuredIds.has(c.id));
    if (topic !== "Alla") result = result.filter((c) => c.topic === topic);
    if (year !== "Alla") result = result.filter((c) => c.year === parseInt(year));
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q) ||
          c.caseNumber.toLowerCase().includes(q) ||
          c.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }
    return result;
  }, [topic, year, search]);

  const visible = filtered.slice(0, visibleCount);

  // Reset count when filters change
  useMemo(() => setVisibleCount(INITIAL_COUNT), [topic, year, search]);

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0F766E 0%, #0A5F59 40%, #0D6B64 100%)" }} className="text-white pt-10 pb-10 sm:pb-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl md:text-[56px]" style={serif}>
              Rättsfall från Arbetsdomstolen
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              {courtCases.length.toLocaleString("sv-SE")} domar om kollektivavtal och arbetsrätt
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ZON 1: Featured top 3 */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Large featured */}
            <AnimatedSection>
              <Link href={`/rattsfall/${featured3[0].id}`} className="block h-full group md:col-span-3">
                <div className="rounded-xl p-8 sm:p-10 h-full min-h-[280px] flex flex-col justify-end transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]" style={{ background: "linear-gradient(135deg, #0F766E 0%, #0A5F59 100%)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-white/70">{featured3[0].date}</span>
                    {featured3[0].isGuiding && (
                      <span className="rounded-full bg-white/15 text-white text-xs font-semibold px-3 py-0.5">Vägledande</span>
                    )}
                    <span className="rounded-full bg-white/15 text-white text-xs font-medium px-3 py-0.5">{featured3[0].topic}</span>
                  </div>
                  <p className="text-white/60 text-sm mb-1">{featured3[0].caseNumber}</p>
                  <h2 className="text-2xl sm:text-[28px] text-white leading-snug" style={serif}>
                    {featured3[0].title || featured3[0].summary.substring(0, 100)}
                  </h2>
                  <p className="text-[15px] text-white/80 mt-2 line-clamp-3">{featured3[0].summary}</p>
                  <span className="text-[15px] font-semibold text-accent mt-4 inline-flex items-center gap-1">
                    Läs mer <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </AnimatedSection>

            {/* 2 side cards */}
            <div className="md:col-span-2 flex flex-col gap-4">
              {featured3.slice(1, 3).map((c, i) => (
                <AnimatedSection key={c.id} delay={(i + 1) * 0.1}>
                  <Link href={`/rattsfall/${c.id}`} className="block h-full group">
                    <div className="rounded-xl border border-border bg-white p-6 h-full hover:border-primary hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(15,118,110,0.08)] transition-all duration-200">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[13px] text-primary font-medium">{c.date}</span>
                        {c.isGuiding && (
                          <span className="rounded-full bg-primary text-white text-[11px] font-semibold px-2.5 py-0.5">Vägledande</span>
                        )}
                        <span className="rounded-full bg-[#F0FDFA] text-primary text-[11px] font-medium px-2.5 py-0.5 border border-primary/20">{c.topic}</span>
                      </div>
                      <p className="text-[13px] text-text-secondary mb-1">{c.caseNumber}</p>
                      <h3 className="text-[20px] text-text-primary leading-snug group-hover:text-primary transition-colors" style={serif}>
                        {c.title || c.summary.substring(0, 80)}
                      </h3>
                      <p className="text-sm text-text-secondary mt-2 line-clamp-2">{c.summary}</p>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ZON 2: Sticky search + filter */}
      <div className="sticky top-[64px] z-40 bg-white border-t border-b border-border shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-[360px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Sök i ${courtCases.length.toLocaleString("sv-SE")} domar...`}
                className="w-full h-11 rounded-lg border border-border pl-9 pr-4 text-sm outline-none placeholder:text-text-secondary focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-wrap gap-1.5 overflow-x-auto">
                {topics.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTopic(t)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors min-h-[32px] ${
                      topic === t
                        ? "bg-primary text-white"
                        : "bg-white border border-border text-[#374151] hover:bg-[#F0FDFA] hover:border-primary"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="shrink-0 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
              >
                <option value="Alla">Alla år</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ZON 3: Compact list */}
      <section className="py-8 sm:py-10 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-[32px] text-text-primary mb-1" style={serif}>Alla domar</h2>
          <p className="text-[15px] text-text-secondary mb-6">
            {filtered.length.toLocaleString("sv-SE")} domar
            {topic !== "Alla" ? ` inom ${topic}` : ""}
            {year !== "Alla" ? ` från ${year}` : ""}
          </p>

          <div className="rounded-xl border border-border bg-white overflow-hidden">
            {visible.map((c, i) => (
              <Link key={c.id} href={`/rattsfall/${c.id}`} className="block">
                <div className={`flex items-center gap-3 px-5 py-4 hover:bg-background transition-colors ${i < visible.length - 1 ? "border-b border-surface-dark" : ""}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-text-primary">{c.caseNumber}</span>
                      <span className="text-sm text-text-secondary">{c.date}</span>
                      <span className="rounded-full bg-[#F0FDFA] text-primary text-[12px] font-medium px-2.5 py-0.5 border border-primary/20">{c.topic}</span>
                      {c.isGuiding && (
                        <span className="rounded-full bg-primary text-white text-[11px] font-semibold px-2.5 py-0.5">Vägledande</span>
                      )}
                    </div>
                    <p className="text-[16px] font-medium text-text-primary truncate">
                      {c.title || c.summary.substring(0, 120)}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-text-secondary shrink-0" />
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-sm text-text-secondary text-center py-8">Inga domar matchar.</p>
          )}

          {visibleCount < filtered.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleCount((v) => v + INITIAL_COUNT)}
                className="px-6 py-3 rounded-lg border border-primary text-primary font-semibold text-[15px] hover:bg-primary hover:text-white transition-colors"
              >
                Visa fler domar ({filtered.length - visibleCount} kvar)
              </button>
            </div>
          )}

          <p className="text-xs text-[#6B7280] mt-8 text-center">
            Källa: Domstolsverkets öppna data. Referaten är offentliga handlingar.
          </p>
        </div>
      </section>
    </>
  );
}
