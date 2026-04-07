"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronRight } from "lucide-react";
import { occupations } from "@/data/occupations";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const categories = [
  "Alla", "Vård & Omsorg", "Handel", "Bygg", "Industri", "IT",
  "Transport", "Hotell & Restaurang", "Bank", "Stat", "Övriga",
];

type SortBy = "highest" | "lowest" | "alpha";

const serif = { fontFamily: "var(--font-dm-serif, var(--font-serif))" };

const featuredSlugs = [
  "systemutvecklare",
  "sjukskoterska",
  "byggnadsarbetare",
  "butikssaljare",
  "lastbilschauffor",
  "kock",
  "larare-grundskola",
  "elektriker",
];

const featuredImages: Record<string, { src: string; alt: string }> = {
  "systemutvecklare":   { src: "/Images/sectors/it-tech.jpg", alt: "IT-utvecklare vid dator" },
  "sjukskoterska":      { src: "/Images/sectors/vard-omsorg.jpg", alt: "Sjuksköterska i vårdmiljö" },
  "byggnadsarbetare":   { src: "/Images/sectors/bygg-anlaggning.jpg", alt: "Byggnadsarbetare på arbetsplats" },
  "butikssaljare":      { src: "/Images/sectors/handel.jpg", alt: "Butiksanställd i handelsmiljö" },
  "lastbilschauffor":   { src: "/Images/sectors/transport.jpg", alt: "Lastbilschaufför" },
  "kock":               { src: "/Images/sectors/hotell-restaurang.jpg", alt: "Kock i restaurangkök" },
  "larare-grundskola":  { src: "/Images/sectors/skola-utbildning.jpg", alt: "Lärare i skolmiljö" },
  "elektriker":         { src: "/Images/sectors/industri.jpg", alt: "Elektriker vid installation" },
};

const featuredSet = new Set(featuredSlugs);

// Salary stats
const allMedians = occupations.map((o) => o.salary.median).sort((a, b) => a - b);
const highestOcc = occupations.reduce((a, b) => (a.salary.median > b.salary.median ? a : b));
const lowestOcc = occupations.reduce((a, b) => (a.salary.median < b.salary.median ? a : b));
const medianOfMedians = allMedians[Math.floor(allMedians.length / 2)];

export default function YrkeOverview() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Alla");
  const [sortBy, setSortBy] = useState<SortBy>("highest");

  const filtered = useMemo(() => {
    let result = [...occupations];
    if (category !== "Alla") result = result.filter((o) => o.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((o) =>
        o.title.toLowerCase().includes(q) || o.description.toLowerCase().includes(q)
      );
    }
    if (sortBy === "highest") result.sort((a, b) => b.salary.median - a.salary.median);
    else if (sortBy === "lowest") result.sort((a, b) => a.salary.median - b.salary.median);
    else result.sort((a, b) => a.title.localeCompare(b.title, "sv"));
    return result;
  }, [search, category, sortBy]);

  const featured = featuredSlugs.map((s) => occupations.find((o) => o.slug === s)!).filter(Boolean);
  const tableOccs = filtered.filter((o) => !featuredSet.has(o.slug));

  return (
    <>
      {/* ─── HERO ─── */}
      <section style={{ background: "linear-gradient(135deg, #0F766E 0%, #0A5F59 40%, #0D6B64 100%)" }} className="text-white pt-10 pb-10 sm:pb-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl md:text-[56px]" style={serif}>
              Löner per yrke 2026
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Se minimilön, medianlön och OB-tillägg för {occupations.length} yrken med kollektivavtal
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── SALARY STATS BAR ─── */}
      <section className="py-5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-primary/30 bg-[#F0FDFA] px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            {[
              { label: `Högst: ${highestOcc.title}`, value: `${highestOcc.salary.median.toLocaleString("sv-SE")} kr` },
              { label: "Median alla yrken", value: `${medianOfMedians.toLocaleString("sv-SE")} kr` },
              { label: `Lägst: ${lowestOcc.title}`, value: `${lowestOcc.salary.median.toLocaleString("sv-SE")} kr` },
            ].map((stat, i) => (
              <div key={stat.label} className={`${i > 0 ? "sm:border-l sm:border-border sm:pl-6" : ""} text-center sm:text-left`}>
                <p className="text-[13px] text-text-secondary">{stat.label}</p>
                <p className="text-[20px] text-primary" style={serif}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ZON 1: Featured 8 ─── */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {featured.map((o, i) => (
              <AnimatedSection key={o.slug} delay={i * 0.04}>
                <Link href={`/yrke/${o.slug}`} className="block h-full group">
                  <div className="rounded-xl border border-border bg-white overflow-hidden h-full hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(15,118,110,0.1)] transition-all duration-[250ms]">
                    <div className="relative h-[100px] sm:h-[120px]">
                      <Image
                        src={featuredImages[o.slug]?.src || "/Images/misc/meeting-room.jpg"}
                        alt={featuredImages[o.slug]?.alt || o.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-[18px] sm:text-[22px] text-text-primary group-hover:text-primary transition-colors leading-tight" style={serif}>
                        {o.title}
                      </h2>
                      <p className="text-[24px] sm:text-[28px] font-normal text-accent mt-1" style={serif}>
                        {o.salary.median.toLocaleString("sv-SE")} kr
                      </p>
                      <p className="text-[13px] text-text-secondary">medianlön/mån</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-2">
                        Se lön <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ZON 2: Sticky search + filter ─── */}
      <div className="sticky top-[64px] z-40 bg-white border-t border-b border-border shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-[360px]">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Sök bland ${occupations.length} yrken...`}
                className="w-full h-11 rounded-lg border border-border pl-10 pr-4 text-sm text-text-primary outline-none placeholder:text-text-secondary focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 overflow-x-auto">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors min-h-[36px] ${
                    category === c
                      ? "bg-primary text-white"
                      : "bg-white border border-border text-[#374151] hover:bg-[#F0FDFA] hover:border-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-1.5 mt-3">
            {([
              { value: "highest" as SortBy, label: "Högst lön" },
              { value: "lowest" as SortBy, label: "Lägst lön" },
              { value: "alpha" as SortBy, label: "A–Ö" },
            ]).map((s) => (
              <button
                key={s.value}
                onClick={() => setSortBy(s.value)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors min-h-[32px] ${
                  sortBy === s.value
                    ? "bg-accent text-white"
                    : "bg-white border border-border text-[#374151] hover:bg-[#F0FDFA] hover:border-accent"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── ZON 3: Table list ─── */}
      <section className="py-8 sm:py-10 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-[32px] text-text-primary mb-1" style={serif}>Alla yrken</h2>
          <p className="text-[15px] text-text-secondary mb-6">{filtered.length} yrken</p>

          {/* Desktop table */}
          <div className="hidden md:block rounded-xl border border-border bg-white overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-dark border-b-2 border-border">
                  <th className="text-left px-5 py-3 text-[13px] font-semibold text-text-secondary uppercase tracking-wide">Yrke</th>
                  <th className="text-left px-5 py-3 text-[13px] font-semibold text-text-secondary uppercase tracking-wide">Bransch</th>
                  <th className="text-right px-5 py-3 text-[13px] font-semibold text-text-secondary uppercase tracking-wide">Medianlön</th>
                  <th className="text-left px-5 py-3 text-[13px] font-semibold text-text-secondary uppercase tracking-wide">Sektor</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {tableOccs.map((o) => (
                  <tr key={o.slug} className="border-b border-surface-dark last:border-0 hover:bg-background transition-colors cursor-pointer group" onClick={() => window.location.href = `/yrke/${o.slug}`}>
                    <td className="px-5 py-3.5 font-semibold text-[16px] text-text-primary group-hover:text-primary transition-colors">{o.title}</td>
                    <td className="px-5 py-3.5 text-sm text-text-secondary">{o.category}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-[18px] text-accent" style={serif}>{o.salary.median.toLocaleString("sv-SE")} kr</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="rounded-full bg-[#F0FDFA] text-primary text-[12px] font-medium px-2.5 py-0.5">{o.sector}</span>
                    </td>
                    <td className="px-3 py-3.5"><ChevronRight size={16} className="text-text-secondary" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile list */}
          <div className="md:hidden rounded-xl border border-border bg-white overflow-hidden">
            {tableOccs.map((o, i) => (
              <Link key={o.slug} href={`/yrke/${o.slug}`} className="block">
                <div className={`flex items-center justify-between px-4 py-3.5 hover:bg-background transition-colors ${i < tableOccs.length - 1 ? "border-b border-surface-dark" : ""}`}>
                  <div>
                    <p className="font-semibold text-[16px] text-text-primary">{o.title}</p>
                    <p className="text-[13px] text-text-secondary mt-0.5">{o.category} · {o.sector}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[18px] text-accent" style={serif}>{o.salary.median.toLocaleString("sv-SE")} kr</span>
                    <ChevronRight size={16} className="text-text-secondary" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-sm text-text-secondary text-center py-8">Inga yrken matchar din sökning.</p>
          )}
        </div>
      </section>
    </>
  );
}
