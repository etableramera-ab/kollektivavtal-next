"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { courtCases } from "@/data/court-cases";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const topics = [
  "Alla",
  "Uppsägning",
  "Lön",
  "Diskriminering",
  "Stridsåtgärd",
  "Kollektivavtalstolkning",
  "Medbestämmande",
  "Arbetstid",
  "Övrigt",
];

const outcomes = ["Alla", "Facket vann", "Arbetsgivaren vann"];
const years = ["Alla", "2026", "2025", "2024"];

const topicColors: Record<string, string> = {
  Uppsägning: "bg-red-100 text-red-800 border-l-red-500",
  Lön: "bg-green-100 text-green-800 border-l-green-500",
  Diskriminering: "bg-purple-100 text-purple-800 border-l-purple-500",
  Stridsåtgärd: "bg-orange-100 text-orange-800 border-l-orange-500",
  Kollektivavtalstolkning: "bg-blue-100 text-blue-800 border-l-blue-500",
  Medbestämmande: "bg-cyan-100 text-cyan-800 border-l-cyan-500",
  Arbetstid: "bg-yellow-100 text-yellow-800 border-l-yellow-500",
  Övrigt: "bg-gray-100 text-gray-800 border-l-gray-400",
};

const outcomeColors: Record<string, string> = {
  "Facket vann": "bg-green-100 text-green-800",
  "Arbetsgivaren vann": "bg-red-100 text-red-800",
  Förlikning: "bg-gray-100 text-gray-600",
  Avvisad: "bg-gray-100 text-gray-600",
};

export default function Rattsfall() {
  const [topic, setTopic] = useState("Alla");
  const [outcome, setOutcome] = useState("Alla");
  const [year, setYear] = useState("Alla");

  const filtered = useMemo(() => {
    return courtCases.filter((c) => {
      if (topic !== "Alla" && c.topic !== topic) return false;
      if (outcome !== "Alla" && c.outcome !== outcome) return false;
      if (year !== "Alla" && !c.date.startsWith(year)) return false;
      return true;
    });
  }, [topic, outcome, year]);

  return (
    <>
      <section className="bg-primary text-white py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Rättsfall från Arbetsdomstolen
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Viktiga domar om kollektivavtal och arbetsrätt — sammanfattade på klarspråk
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[12px] bg-blue-50 border border-blue-200 p-4 sm:p-5">
            <p className="text-sm text-blue-900 leading-relaxed">
              Arbetsdomstolen avgör tvister om kollektivavtal och arbetsrätt i Sverige. Här
              sammanfattar vi de viktigaste domarna på klarspråk.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <AnimatedSection>
            <div className="space-y-3 mb-8">
              <div>
                <p className="text-xs font-medium text-text-secondary mb-2">Ämne</p>
                <div className="flex flex-wrap gap-1.5">
                  {topics.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTopic(t)}
                      className={`rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors min-h-[36px] ${
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
              <div className="flex gap-6">
                <div>
                  <p className="text-xs font-medium text-text-secondary mb-2">Utfall</p>
                  <div className="flex flex-wrap gap-1.5">
                    {outcomes.map((o) => (
                      <button
                        key={o}
                        onClick={() => setOutcome(o)}
                        className={`rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors min-h-[36px] ${
                          outcome === o
                            ? "bg-primary text-white"
                            : "bg-white border border-border text-text-secondary hover:border-primary"
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-text-secondary mb-2">År</p>
                  <div className="flex flex-wrap gap-1.5">
                    {years.map((y) => (
                      <button
                        key={y}
                        onClick={() => setYear(y)}
                        className={`rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors min-h-[36px] ${
                          year === y
                            ? "bg-primary text-white"
                            : "bg-white border border-border text-text-secondary hover:border-primary"
                        }`}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Results */}
          <div className="space-y-3">
            {filtered.length === 0 && (
              <p className="text-sm text-text-secondary text-center py-8">
                Inga rättsfall matchar dina filter.
              </p>
            )}
            {filtered.map((c, i) => {
              const borderColor = topicColors[c.topic]?.split(" ").pop() || "border-l-gray-400";
              return (
                <AnimatedSection key={c.id} delay={i * 0.03}>
                  <Link href={`/rattsfall/${c.id}`} className="block">
                    <div
                      className={`rounded-[12px] border border-border bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow border-l-4 ${borderColor}`}
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-text-secondary">
                          {c.caseNumber}
                        </span>
                        <span className="text-xs text-text-secondary">{c.date}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            topicColors[c.topic]?.split(" ").slice(0, 2).join(" ") ||
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {c.topic}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            outcomeColors[c.outcome] || "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {c.outcome}
                        </span>
                      </div>
                      <h3 className="font-semibold text-text-primary text-sm sm:text-base leading-snug">
                        {c.title}
                      </h3>
                      <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                        {c.summary}
                      </p>
                      {c.relatedAgreement && (
                        <span className="inline-block mt-2 text-xs bg-background text-text-secondary px-2 py-0.5 rounded-[4px]">
                          Relaterat avtal
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-2 ml-2">
                        Läs mer <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
