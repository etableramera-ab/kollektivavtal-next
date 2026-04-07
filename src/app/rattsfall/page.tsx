"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { courtCases, getAvailableYears, getAvailableTopics } from "@/data/court-cases";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const serif = { fontFamily: "var(--font-dm-serif, var(--font-serif))" };
const INITIAL_COUNT = 20;

export default function Rattsfall() {
  const [topic, setTopic] = useState("Alla");
  const [year, setYear] = useState("Alla");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const years = getAvailableYears();
  const topics = ["Alla", "Vägledande", ...getAvailableTopics()];

  const filtered = useMemo(() => {
    let result = [...courtCases];
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
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8 text-center">
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

      {/* Filter bar */}
      <section className="bg-white border-b border-border">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8 pt-4 pb-5">
          {/* Search */}
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Sök i ${courtCases.length.toLocaleString("sv-SE")} domar...`}
              className="w-full h-11 rounded-lg border border-border pl-9 pr-4 text-sm outline-none placeholder:text-text-secondary focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          {/* Pills + year */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1.5 flex-1 overflow-x-auto">
              {topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-[13px] transition-all min-h-[32px] ${
                    topic === t
                      ? "bg-primary text-white font-medium"
                      : "border border-border text-[#6B7280] hover:border-primary hover:text-primary"
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
      </section>

      {/* Case list */}
      <section className="py-6 sm:py-8 pb-16 sm:pb-20">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
          <p className="text-[15px] text-text-secondary mb-4">
            {filtered.length.toLocaleString("sv-SE")} domar
            {topic !== "Alla" ? ` — ${topic}` : ""}
            {year !== "Alla" ? ` från ${year}` : ""}
          </p>

          <div className="space-y-3">
            {visible.map((c) => (
              <Link key={c.id} href={`/rattsfall/${c.id}`} className="block group">
                <div className="rounded-[10px] border border-border bg-white px-5 py-4 sm:flex sm:gap-5 hover:border-primary hover:bg-[#FAFAF8] transition-all duration-150 cursor-pointer">
                  {/* Left: date + case number */}
                  <div className="sm:w-[100px] shrink-0 mb-2 sm:mb-0">
                    <p className="text-[13px] font-medium text-primary">{c.date}</p>
                    <p className="text-[12px] text-[#6B7280]">{c.caseNumber}</p>
                  </div>

                  {/* Right: badges + title + summary */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                      {c.isGuiding && (
                        <span className="rounded bg-[#F0FDFA] text-primary text-[11px] font-medium uppercase tracking-wide px-2 py-0.5 border border-[#D1E7E4]">
                          Vägledande
                        </span>
                      )}
                      <span className="rounded bg-[#FFF7ED] text-accent text-[11px] font-medium uppercase tracking-wide px-2 py-0.5 border border-[#FDE68A]">
                        {c.topic}
                      </span>
                    </div>
                    <p className="text-[16px] font-semibold text-text-primary line-clamp-2 leading-snug">
                      {c.title || c.summary.substring(0, 120)}
                    </p>
                    {c.summary && (
                      <p className="text-sm text-[#6B7280] mt-1 line-clamp-1">{c.summary}</p>
                    )}
                  </div>
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
                Visa fler ({filtered.length - visibleCount} kvar)
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
