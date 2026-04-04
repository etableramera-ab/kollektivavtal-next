"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { courtCases, getAvailableYears, getAvailableTopics } from "@/data/court-cases";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const PER_PAGE = 20;

const topicColors: Record<string, string> = {
  Uppsägning: "bg-red-100 text-red-800 border-l-red-500",
  Lön: "bg-green-100 text-green-800 border-l-green-500",
  Diskriminering: "bg-purple-100 text-purple-800 border-l-purple-500",
  Stridsåtgärd: "bg-orange-100 text-orange-800 border-l-orange-500",
  Kollektivavtalstolkning: "bg-blue-100 text-blue-800 border-l-blue-500",
  Medbestämmande: "bg-cyan-100 text-cyan-800 border-l-cyan-500",
  Arbetstid: "bg-yellow-100 text-yellow-800 border-l-yellow-500",
  Arbetsskyldighet: "bg-indigo-100 text-indigo-800 border-l-indigo-500",
  Skadestånd: "bg-amber-100 text-amber-800 border-l-amber-500",
  Övrigt: "bg-gray-100 text-gray-800 border-l-gray-400",
};

export default function Rattsfall() {
  const [topic, setTopic] = useState("Alla");
  const [year, setYear] = useState("Alla");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const years = getAvailableYears();
  const topics = ["Alla", ...getAvailableTopics()];

  const filtered = useMemo(() => {
    let result = [...courtCases];
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

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  // Reset page when filters change
  useMemo(() => setPage(0), [topic, year, search]);

  return (
    <>
      <section className="bg-primary text-white py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Rättsfall från Arbetsdomstolen
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              {courtCases.length.toLocaleString("sv-SE")} domar om kollektivavtal och arbetsrätt (1993–2024)
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[12px] bg-blue-50 border border-blue-200 p-4 sm:p-5">
            <p className="text-sm text-blue-900 leading-relaxed">
              Arbetsdomstolen avgör tvister om kollektivavtal och arbetsrätt i Sverige. Referaten kommer
              från Domstolsverkets öppna data och är offentliga handlingar.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="relative mb-4">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Sök i domar..."
              className="w-full rounded-[8px] border border-border pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            />
          </div>

          {/* Filters */}
          <div className="space-y-3 mb-6">
            <div>
              <p className="text-xs font-medium text-text-secondary mb-1.5">Ämne</p>
              <div className="flex flex-wrap gap-1.5">
                {topics.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTopic(t)}
                    className={`rounded-[6px] px-2.5 py-1 text-xs font-medium transition-colors min-h-[32px] ${
                      topic === t
                        ? "bg-primary text-white"
                        : "bg-white border border-border text-text-secondary hover:border-primary"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-text-secondary mb-1.5">År</p>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="rounded-[6px] border border-border px-3 py-1.5 text-xs outline-none focus:border-accent"
              >
                <option value="Alla">Alla år</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-xs text-text-secondary mb-4">
            {filtered.length.toLocaleString("sv-SE")} domar
            {topic !== "Alla" ? ` inom ${topic}` : ""}
            {year !== "Alla" ? ` från ${year}` : ""}
          </p>

          {/* Results */}
          <div className="space-y-2">
            {paginated.map((c) => {
              const borderColor = topicColors[c.topic]?.split(" ").pop() || "border-l-gray-400";
              const badgeColor = topicColors[c.topic]?.split(" ").slice(0, 2).join(" ") || "bg-gray-100 text-gray-800";
              return (
                <Link key={c.id} href={`/rattsfall/${c.id}`} className="block">
                  <div className={`rounded-[10px] border border-border bg-white p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow border-l-4 ${borderColor}`}>
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span className="text-xs font-medium text-text-secondary">{c.caseNumber}</span>
                      <span className="text-xs text-text-secondary">{c.date}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${badgeColor}`}>{c.topic}</span>
                      {c.isGuiding && <span className="rounded-full px-2 py-0.5 text-[10px] font-medium bg-accent/10 text-accent">Vägledande</span>}
                    </div>
                    <h3 className="font-semibold text-text-primary text-sm leading-snug line-clamp-2">
                      {c.title || c.summary.substring(0, 120)}
                    </h3>
                    {c.summary && (
                      <p className="text-xs text-text-secondary mt-1 line-clamp-2">{c.summary}</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-sm text-text-secondary text-center py-8">Inga domar matchar.</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="rounded-[6px] border border-border p-2 hover:bg-background disabled:opacity-30 min-w-[36px] min-h-[36px] flex items-center justify-center"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm text-text-secondary px-3">
                Sida {page + 1} av {totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                disabled={page >= totalPages - 1}
                className="rounded-[6px] border border-border p-2 hover:bg-background disabled:opacity-30 min-w-[36px] min-h-[36px] flex items-center justify-center"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          <p className="text-xs text-text-secondary mt-6 text-center">
            Källa: Domstolsverkets öppna data. Referaten är offentliga handlingar.
          </p>
        </div>
      </section>
    </>
  );
}
