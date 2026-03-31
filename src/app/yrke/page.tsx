"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { occupations } from "@/data/occupations";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const categories = [
  "Alla",
  "Vård & Omsorg",
  "Handel",
  "Bygg",
  "Industri",
  "IT",
  "Transport",
  "Hotell & Restaurang",
  "Bank",
  "Stat",
  "Övriga",
];

type SortBy = "highest" | "lowest" | "alpha";

export default function YrkeOverview() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Alla");
  const [sortBy, setSortBy] = useState<SortBy>("highest");

  const filtered = useMemo(() => {
    let result = [...occupations];
    if (category !== "Alla") result = result.filter((o) => o.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.description.toLowerCase().includes(q)
      );
    }
    if (sortBy === "highest") result.sort((a, b) => b.salary.median - a.salary.median);
    else if (sortBy === "lowest") result.sort((a, b) => a.salary.median - b.salary.median);
    else result.sort((a, b) => a.title.localeCompare(b.title, "sv"));
    return result;
  }, [search, category, sortBy]);

  return (
    <>
      <section className="bg-primary text-white py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Löner per yrke 2026
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Se minimilön, medianlön och OB-tillägg för {occupations.length} yrken med kollektivavtal
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[12px] bg-blue-50 border border-blue-200 p-4 sm:p-5">
            <p className="text-sm text-blue-900 leading-relaxed">
              Här hittar du löner och villkor för {occupations.length} vanliga yrken i Sverige. Se minimilön
              enligt kollektivavtal, medianlön från SCB och OB-tillägg per yrke.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative mb-4">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Sök yrke..."
                className="w-full rounded-[8px] border border-border pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors min-h-[36px] ${
                    category === c
                      ? "bg-primary text-white"
                      : "bg-white border border-border text-text-secondary hover:border-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex gap-1.5 mb-6">
              {[
                { value: "highest" as SortBy, label: "Högst lön" },
                { value: "lowest" as SortBy, label: "Lägst lön" },
                { value: "alpha" as SortBy, label: "A–Ö" },
              ].map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSortBy(s.value)}
                  className={`rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors min-h-[36px] ${
                    sortBy === s.value
                      ? "bg-accent text-white"
                      : "bg-white border border-border text-text-secondary hover:border-accent"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filtered.map((o, i) => (
              <AnimatedSection key={o.slug} delay={Math.min(i * 0.02, 0.3)}>
                <Link href={`/yrke/${o.slug}`} className="block h-full">
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
                    transition={{ duration: 0.2 }}
                    className="group rounded-[12px] border border-border bg-white p-4 shadow-sm h-full"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-semibold text-text-primary group-hover:text-accent transition-colors text-sm">
                        {o.title}
                      </h2>
                      <span className="shrink-0 rounded-[4px] bg-background text-text-secondary text-[10px] font-medium px-1.5 py-0.5">
                        {o.sector}
                      </span>
                    </div>
                    <p className="text-2xl font-extrabold text-accent mt-2">
                      {o.salary.median.toLocaleString("sv-SE")} kr
                    </p>
                    <p className="text-xs text-text-secondary">medianlön/mån</p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-accent mt-2">
                      Se lön och villkor <ArrowRight size={12} />
                    </span>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-sm text-text-secondary text-center py-8">
              Inga yrken matchar din sökning.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
