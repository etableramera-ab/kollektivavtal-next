"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { courtCases, getAvailableYears, getAvailableTopics } from "@/data/court-cases";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const serif = { fontFamily: "var(--font-dm-serif, var(--font-serif))" };
const INITIAL_COUNT = 20;

// Featured: 3 most recent by date
const featured3 = [...courtCases].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
const featuredIds = new Set(featured3.map((c) => c.id));

export default function Rattsfall() {
  const [topic, setTopic] = useState("Alla");
  const [year, setYear] = useState("Alla");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const years = getAvailableYears();
  const topics = ["Alla", "Vägledande", ...getAvailableTopics()];

  const filtered = useMemo(() => {
    let result = courtCases.filter((c) => !featuredIds.has(c.id));
    if (topic === "Vägledande") result = result.filter((c) => c.isGuiding);
    else if (topic !== "Alla") result = result.filter((c) => c.topic === topic);
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

      {/* Featured 3 */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-6 mb-6">
            <h2 className="text-3xl sm:text-[40px] text-text-primary" style={serif}>Senaste rättsfallen</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Large teal card */}
            <div className="md:col-span-3">
              <AnimatedSection>
                <Link href={`/rattsfall/${featured3[0].id}`} className="block group">
                  <div className="rounded-xl p-7 sm:p-8 h-[320px] overflow-hidden flex flex-col justify-end transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]" style={{ background: "linear-gradient(135deg, #0F766E 0%, #0A5F59 100%)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[13px] text-white/70">{featured3[0].date}</span>
                      {featured3[0].isGuiding && (
                        <span className="rounded bg-white/15 text-white text-[11px] font-medium px-2 py-0.5">Vägledande</span>
                      )}
                      <span className="rounded bg-white/15 text-white text-[11px] font-medium px-2 py-0.5">{featured3[0].topic}</span>
                    </div>
                    <p className="text-white/50 text-[13px] mb-1">{featured3[0].caseNumber}</p>
                    <h2 className="text-[20px] sm:text-[24px] text-white leading-snug line-clamp-4" style={serif}>
                      {featured3[0].title || featured3[0].summary.substring(0, 120)}
                    </h2>
                    <p className="text-[14px] text-white/75 mt-2 line-clamp-2">{featured3[0].summary}</p>
                    <span className="text-[14px] font-semibold text-accent mt-3 inline-flex items-center gap-1">
                      Läs mer <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            </div>

            {/* 2 side cards */}
            <div className="md:col-span-2 flex flex-col gap-6">
              {featured3.slice(1, 3).map((c, i) => (
                <AnimatedSection key={c.id} delay={(i + 1) * 0.1}>
                  <Link href={`/rattsfall/${c.id}`} className="block group">
                    <div className="rounded-xl border border-border bg-white p-5 h-[148px] overflow-hidden hover:border-primary hover:-translate-y-px hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)] transition-all duration-200">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[13px] text-primary font-medium">{c.date}</span>
                        {c.isGuiding && (
                          <span className="rounded bg-[#F0FDFA] text-primary text-[11px] font-medium px-2 py-0.5 border border-primary/20">Vägledande</span>
                        )}
                        <span className="rounded bg-[#F0FDFA] text-primary text-[11px] font-medium px-2 py-0.5 border border-primary/20">{c.topic}</span>
                      </div>
                      <p className="text-[12px] text-text-secondary mb-1">{c.caseNumber}</p>
                      <h3 className="text-[18px] text-text-primary leading-snug line-clamp-3 group-hover:text-primary transition-colors" style={serif}>
                        {c.title || c.summary.substring(0, 80)}
                      </h3>
                      <p className="text-[13px] text-text-secondary mt-1.5 line-clamp-2">{c.summary}</p>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky filter */}
      <div className="sticky top-[64px] z-40 bg-[#F0EEED] border-t-2 border-t-primary border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="space-y-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Sök i ${courtCases.length.toLocaleString("sv-SE")} domar...`}
                className="w-full h-11 rounded-lg border border-border bg-white pl-9 pr-4 text-sm outline-none placeholder:text-text-secondary focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 flex-nowrap shrink-0">
                {topics.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTopic(t)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-[13px] transition-all min-h-[36px] ${
                      topic === t
                        ? "bg-primary text-white font-medium"
                        : "bg-white border border-border text-[#374151] hover:border-primary hover:text-primary"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="shrink-0 rounded-lg border border-border bg-white px-3 h-[36px] text-sm outline-none focus:border-primary"
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

      {/* Compact rows */}
      <section className="py-6 sm:py-8 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-[15px] text-text-secondary mb-4">
            {filtered.length.toLocaleString("sv-SE")} domar
            {topic !== "Alla" ? ` — ${topic}` : ""}
            {year !== "Alla" ? ` från ${year}` : ""}
          </p>

          <div className="rounded-xl border border-border bg-white overflow-hidden">
            {visible.map((c, i) => (
              <Link key={c.id} href={`/rattsfall/${c.id}`} className="block">
                <div className={`px-5 py-3.5 hover:bg-[#F8F7F4] transition-colors cursor-pointer ${i < visible.length - 1 ? "border-b border-[#F0EEED]" : ""}`}>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-text-primary">{c.caseNumber}</span>
                    <span className="text-sm text-text-secondary">{c.date}</span>
                    <span className="rounded bg-[#F0FDFA] text-primary text-[11px] font-medium px-2 py-0.5 border border-primary/20">{c.topic}</span>
                    {c.isGuiding && (
                      <span className="rounded bg-[#F0FDFA] text-primary text-[11px] font-medium px-2 py-0.5 border border-primary/20">Vägledande</span>
                    )}
                  </div>
                  <p className="text-[16px] font-medium text-text-primary truncate">
                    {c.title || c.summary.substring(0, 120)}
                  </p>
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
                className="px-6 py-2.5 rounded-lg border border-primary text-primary font-medium text-sm hover:bg-primary hover:text-white transition-colors"
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
