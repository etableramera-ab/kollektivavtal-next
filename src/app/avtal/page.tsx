"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronRight, ShieldCheck } from "lucide-react";
import { agreements } from "@/data/agreements";
import { isVerifiedAgreement } from "@/lib/verified-agreements";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

type SectorFilter = "alla" | "privat" | "kommun_region" | "stat";

const filters: { value: SectorFilter; label: string }[] = [
  { value: "alla", label: "Alla" },
  { value: "privat", label: "Privat sektor" },
  { value: "kommun_region", label: "Kommun/region" },
  { value: "stat", label: "Stat" },
];

const serif = { fontFamily: "var(--font-dm-serif, var(--font-serif))" };

// Handpicked top 8 workplace agreements (largest by employees, excluding structural/pension)
const featuredSlugs = [
  "hok-kommunal",       // 540 000 — vard-omsorg.jpg
  "teknikavtalet",      // 300 000 — industri.jpg
  "handelsavtalet",     // 250 000 — handel.jpg
  "byggavtalet",        // 100 000 — bygg-anlaggning.jpg
  "ab-kommunalt",       // 1 100 000 — skola-utbildning.jpg
  "it-avtalet",         // 100 000 — it-tech.jpg
  "transportavtalet",   // 80 000 — transport.jpg
  "hotell-restaurang",  // 120 000 — hotell-restaurang.jpg
];

const featuredImages: Record<string, { src: string; alt: string }> = {
  "hok-kommunal":      { src: "/Images/sectors/vard-omsorg.jpg", alt: "Vårdpersonal i arbetsmiljö" },
  "teknikavtalet":     { src: "/Images/sectors/industri.jpg", alt: "Industriarbetare vid maskin" },
  "handelsavtalet":    { src: "/Images/sectors/handel.jpg", alt: "Butiksanställd i handelsmiljö" },
  "byggavtalet":       { src: "/Images/sectors/bygg-anlaggning.jpg", alt: "Byggnadsarbetare på arbetsplats" },
  "ab-kommunalt":      { src: "/Images/sectors/skola-utbildning.jpg", alt: "Lärare i skolmiljö" },
  "it-avtalet":        { src: "/Images/sectors/it-tech.jpg", alt: "IT-utvecklare vid dator" },
  "transportavtalet":  { src: "/Images/sectors/transport.jpg", alt: "Lastbilschaufför" },
  "hotell-restaurang": { src: "/Images/sectors/hotell-restaurang.jpg", alt: "Kock i restaurangkök" },
};

const top8 = featuredSlugs.map((slug) => agreements.find((a) => a.slug === slug)!).filter(Boolean);
const top8Slugs = new Set(featuredSlugs);

const PAGE_SIZE = 30;

export default function AvtalOverview() {
  const [sector, setSector] = useState<SectorFilter>("alla");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const listAgreements = useMemo(() => {
    let result = agreements.filter((a) => !top8Slugs.has(a.slug));
    if (sector !== "alla") result = result.filter((a) => a.sector === sector);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.shortName.toLowerCase().includes(q) ||
          a.sectorLabel.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => b.employeeCount - a.employeeCount);
  }, [sector, search]);

  const paginated = listAgreements.slice(0, visibleCount);

  return (
    <>
      {/* ─── HERO ─── */}
      <section style={{ background: "linear-gradient(135deg, #0F766E 0%, #0A5F59 40%, #0D6B64 100%)" }} className="text-white pt-12 pb-12 sm:pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl md:text-[56px]" style={serif}>
              Kollektivavtal i Sverige
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              515 avtal sammanfattade på klarspråk — löner, OB-tillägg, semester och pension.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── ZON 1: Featured top 8 ─── */}
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {top8.map((a, i) => (
              <AnimatedSection key={a.slug} delay={i * 0.04}>
                <Link href={`/avtal/${a.slug}`} className="block h-full group">
                  <div className="rounded-xl border border-border bg-white overflow-hidden h-full hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)] transition-all duration-[250ms]">
                    <div className="relative h-[120px] sm:h-[160px]">
                      <Image
                        src={featuredImages[a.slug]?.src || "/Images/misc/meeting-room.jpg"}
                        alt={featuredImages[a.slug]?.alt || a.shortName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="rounded-full bg-primary text-white text-[12px] font-semibold px-3 py-0.5">
                          {a.sectorLabel}
                        </span>
                        <span className="text-sm font-medium text-text-secondary">
                          {a.employeeCount.toLocaleString("sv-SE")} anställda
                        </span>
                      </div>
                      <h2 className="text-[22px] sm:text-[24px] text-text-primary group-hover:text-primary transition-colors" style={serif}>
                        {a.shortName}
                        {isVerifiedAgreement(a.slug) && (
                          <ShieldCheck className="inline w-4 h-4 text-primary ml-1.5 -mt-1" />
                        )}
                      </h2>
                      <p className="text-sm text-text-secondary mt-1 line-clamp-2 leading-snug">{a.summary}</p>
                      <span className="inline-flex items-center gap-1 text-[15px] font-semibold text-primary mt-3">
                        Läs mer <ChevronRight size={14} />
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
      <div className="sticky top-[64px] z-40 bg-[#F0EEED] border-t-2 border-t-primary border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="space-y-3">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setVisibleCount(PAGE_SIZE); }}
                placeholder="Sök bland 515 avtal..."
                className="w-full h-11 rounded-lg border border-border bg-white pl-10 pr-4 text-sm text-text-primary outline-none placeholder:text-text-secondary focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <div className="flex gap-2 flex-nowrap overflow-x-auto scrollbar-hide pr-4">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => { setSector(f.value); setVisibleCount(PAGE_SIZE); }}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors min-h-[40px] ${
                    sector === f.value
                      ? "bg-primary text-white"
                      : "bg-white border border-border text-[#374151] hover:border-primary hover:bg-[#F0FDFA]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── ZON 3: All agreements table ─── */}
      <section className="py-8 sm:py-10 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-[32px] text-text-primary mb-1" style={serif}>Alla avtal</h2>
          <p className="text-[15px] text-text-secondary mb-6">{listAgreements.length} avtal</p>

          {/* Desktop table */}
          <div className="hidden md:block rounded-xl border border-border bg-white overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-dark border-b-2 border-border">
                  <th className="text-left px-5 py-3 text-[13px] font-semibold text-text-secondary uppercase tracking-wide">Avtalsnamn</th>
                  <th className="text-left px-5 py-3 text-[13px] font-semibold text-text-secondary uppercase tracking-wide">Sektor</th>
                  <th className="text-right px-5 py-3 text-[13px] font-semibold text-text-secondary uppercase tracking-wide">Anställda</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((a) => (
                  <tr key={a.slug} className="border-b border-surface-dark last:border-0 hover:bg-background transition-colors cursor-pointer group" onClick={() => window.location.href = `/avtal/${a.slug}`}>
                    <td className="px-5 py-4">
                      <span className="font-semibold text-[16px] text-text-primary group-hover:text-primary transition-colors">
                        {a.shortName}
                      </span>
                      {isVerifiedAgreement(a.slug) && (
                        <ShieldCheck className="inline w-3.5 h-3.5 text-primary ml-1.5 -mt-0.5" />
                      )}
                    </td>
                    <td className="px-5 py-4 text-sm text-text-secondary">{a.sectorLabel}</td>
                    <td className="px-5 py-4 text-sm font-medium text-primary text-right">{a.employeeCount.toLocaleString("sv-SE")}</td>
                    <td className="px-3 py-4"><ChevronRight size={16} className="text-text-secondary" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile list */}
          <div className="md:hidden rounded-xl border border-border bg-white overflow-hidden">
            {paginated.map((a, i) => (
              <Link key={a.slug} href={`/avtal/${a.slug}`} className="block">
                <div className={`flex items-center justify-between px-4 py-4 hover:bg-background transition-colors ${i < paginated.length - 1 ? "border-b border-surface-dark" : ""}`}>
                  <div>
                    <p className="font-semibold text-[16px] text-text-primary">
                      {a.shortName}
                      {isVerifiedAgreement(a.slug) && (
                        <ShieldCheck className="inline w-3.5 h-3.5 text-primary ml-1 -mt-0.5" />
                      )}
                    </p>
                    <p className="text-[13px] text-text-secondary mt-0.5">
                      {a.sectorLabel} · {a.employeeCount.toLocaleString("sv-SE")} anställda
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-text-secondary shrink-0" />
                </div>
              </Link>
            ))}
          </div>

          {/* Load more */}
          {visibleCount < listAgreements.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                className="px-6 py-3 rounded-lg border border-primary text-primary font-semibold text-[15px] hover:bg-primary hover:text-white transition-colors"
              >
                Visa fler avtal ({listAgreements.length - visibleCount} kvar)
              </button>
            </div>
          )}

          <p className="text-xs text-[#6B7280] mt-8 text-center">
            {agreements.length} av 515 avtal sammanfattade. Fler läggs till löpande.
          </p>
        </div>
      </section>
    </>
  );
}
