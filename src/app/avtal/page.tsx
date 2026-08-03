"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronRight, ShieldCheck } from "lucide-react";
import { publicAgreements } from "@/lib/public-agreements";
import { isVerifiedAgreement } from "@/lib/verified-agreements";
import {
  getSearchMatchScore,
  matchesSearchText,
} from "@/lib/search-normalization";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

type SectorFilter = "alla" | "privat" | "kommun_region" | "stat";

const filters: { value: SectorFilter; label: string }[] = [
  { value: "alla", label: "Alla" },
  { value: "privat", label: "Privat sektor" },
  { value: "kommun_region", label: "Kommun/region" },
  { value: "stat", label: "Stat" },
];

const serif = { fontFamily: "var(--font-dm-serif, var(--font-serif))" };

// Handpicked major workplace agreements with current official source material.
const featuredSlugs = [
  "hok-kommunal",
  "teknikavtalet-ifmetall",
  "handelsavtalet",
  "byggavtalet",
  "ab-kommunalt",
  "teknikavtalet-tjansteman",
  "handelns-tjanstemannaavtal",
  "hotell-restaurang",
];

const featuredImages: Record<string, { src: string; alt: string }> = {
  "hok-kommunal":      { src: "/Images/sectors/vard-omsorg.jpg", alt: "Vårdpersonal i arbetsmiljö" },
  "teknikavtalet-ifmetall": { src: "/Images/sectors/industri.jpg", alt: "Industriarbetare vid maskin" },
  "teknikavtalet-tjansteman": { src: "/Images/sectors/industri.jpg", alt: "Tjänstemän inom teknikindustrin" },
  "teknikavtalet":     { src: "/Images/sectors/industri.jpg", alt: "Industriarbetare vid maskin" },
  "handelsavtalet":    { src: "/Images/sectors/handel.jpg", alt: "Butiksanställd i handelsmiljö" },
  "handelns-tjanstemannaavtal": { src: "/Images/sectors/handel.jpg", alt: "Tjänstemän inom handeln" },
  "byggavtalet":       { src: "/Images/sectors/bygg-anlaggning.jpg", alt: "Byggnadsarbetare på arbetsplats" },
  "ab-kommunalt":      { src: "/Images/sectors/skola-utbildning.jpg", alt: "Lärare i skolmiljö" },
  "it-avtalet":        { src: "/Images/sectors/it-tech.jpg", alt: "IT-utvecklare vid dator" },
  "transportavtalet":  { src: "/Images/sectors/transport.jpg", alt: "Lastbilschaufför" },
  "hotell-restaurang": { src: "/Images/sectors/hotell-restaurang.jpg", alt: "Kock i restaurangkök" },
  "installationsavtalet": { src: "/Images/sectors/bygg-anlaggning.jpg", alt: "Elektriker på arbetsplats" },
  "vvs-montorsavtalet": { src: "/Images/sectors/bygg-anlaggning.jpg", alt: "VVS-montör på arbetsplats" },
};

const top8 = featuredSlugs.map((slug) => publicAgreements.find((a) => a.slug === slug)!).filter(Boolean);
const top8Slugs = new Set(featuredSlugs);

const PAGE_SIZE = 30;

function agreementSearchScore(agreement: (typeof publicAgreements)[number], query: string) {
  const nameScore = Math.max(
    getSearchMatchScore(agreement.name, query),
    getSearchMatchScore(agreement.shortName, query)
  );
  const metadataScore = Math.max(
    getSearchMatchScore(agreement.sectorLabel, query),
    ...agreement.parties.unions.map((value) => getSearchMatchScore(value, query)),
    ...agreement.parties.employers.map((value) => getSearchMatchScore(value, query))
  );
  const summaryScore = getSearchMatchScore(agreement.summary, query);
  return nameScore * 100 + metadataScore * 10 + summaryScore;
}

export default function AvtalOverview() {
  const [sector, setSector] = useState<SectorFilter>("alla");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const isFiltering = sector !== "alla" || search.trim().length > 0;

  const listAgreements = useMemo(() => {
    let result = isFiltering
      ? [...publicAgreements]
      : publicAgreements.filter((a) => !top8Slugs.has(a.slug));
    if (sector !== "alla") result = result.filter((a) => a.sector === sector);
    if (search.trim()) {
      const q = search.trim();
      result = result.filter(
        (a) => [
          a.name,
          a.shortName,
          a.sectorLabel,
          a.summary,
          ...a.parties.unions,
          ...a.parties.employers,
        ].some((value) => matchesSearchText(value, q))
      );
    }
    return result.sort((a, b) => {
      if (search.trim()) {
        const scoreDifference =
          agreementSearchScore(b, search) - agreementSearchScore(a, search);
        if (scoreDifference !== 0) return scoreDifference;
      }
      return a.shortName.localeCompare(b.shortName, "sv");
    });
  }, [isFiltering, sector, search]);

  const paginated = listAgreements.slice(0, visibleCount);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-primary-dark text-white pt-12 pb-12 sm:pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl md:text-[56px]" style={serif}>
              Kollektivavtal i Sverige
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Utforska avtalsområden och villkor på klarspråk — med tydlig märkning av källunderlaget.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Sökning och filter ─── */}
      <div className="sticky top-[64px] z-40 border-y border-border border-t-primary bg-[#F0EEED]">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 sm:py-5 lg:px-8">
          <div className="space-y-3">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="search"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setVisibleCount(PAGE_SIZE); }}
                placeholder="Sök avtal, fack eller arbetsgivare..."
                aria-label="Sök bland kollektivavtal"
                className="h-11 w-full rounded-lg border border-border bg-white pl-10 pr-4 text-base text-text-primary outline-none placeholder:text-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/30 sm:text-sm"
              />
            </div>
            <div className="scrollbar-hide flex flex-nowrap gap-2 overflow-x-auto overscroll-x-contain pr-4">
              {filters.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  aria-pressed={sector === f.value}
                  onClick={() => { setSector(f.value); setVisibleCount(PAGE_SIZE); }}
                  className={`min-h-[40px] shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    sector === f.value
                      ? "bg-primary text-white"
                      : "border border-border bg-white text-[#374151] hover:border-primary hover:bg-[#F0FDFA]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Stora avtalsområden ─── */}
      {!isFiltering && (
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-5 text-2xl text-text-primary sm:text-[32px]" style={serif}>
            Stora avtalsområden
          </h2>
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
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                        <span className="rounded-full bg-primary text-white text-[12px] font-semibold px-3 py-0.5">
                          {a.sectorLabel}
                        </span>
                        <span className="text-sm font-medium text-text-secondary">
                          Källunderlag finns
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
      )}

      {/* ─── Avtalslista ─── */}
      <section className="py-8 pb-24 sm:py-10 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-1 text-2xl text-text-primary sm:text-[32px]" style={serif}>
            {isFiltering ? "Sökresultat" : "Fler avtal"}
          </h2>
          <p className="mb-6 text-[15px] text-text-secondary" aria-live="polite">
            {isFiltering
              ? `${listAgreements.length} avtal matchar`
              : `${listAgreements.length} fler avtal · ${publicAgreements.length} totalt`}
          </p>

          {/* Desktop table */}
          {paginated.length > 0 && (
          <div className="hidden md:block rounded-xl border border-border bg-white overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-dark border-b-2 border-border">
                  <th className="text-left px-5 py-3 text-[13px] font-semibold text-text-secondary uppercase tracking-wide">Avtalsnamn</th>
                  <th className="text-left px-5 py-3 text-[13px] font-semibold text-text-secondary uppercase tracking-wide">Sektor</th>
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
                    <td className="px-3 py-4"><ChevronRight size={16} className="text-text-secondary" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}

          {/* Mobile list */}
          {paginated.length > 0 && (
          <div className="md:hidden rounded-xl border border-border bg-white overflow-hidden">
            {paginated.map((a, i) => (
              <Link key={a.slug} href={`/avtal/${a.slug}`} className="block">
                <div className={`flex items-center justify-between gap-3 px-4 py-4 hover:bg-background transition-colors ${i < paginated.length - 1 ? "border-b border-surface-dark" : ""}`}>
                  <div className="min-w-0">
                    <p className="break-words font-semibold text-[16px] text-text-primary">
                      {a.shortName}
                      {isVerifiedAgreement(a.slug) && (
                        <ShieldCheck className="inline w-3.5 h-3.5 text-primary ml-1 -mt-0.5" />
                      )}
                    </p>
                    <p className="text-[13px] text-text-secondary mt-0.5">
                      {a.sectorLabel}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-text-secondary shrink-0" />
                </div>
              </Link>
            ))}
          </div>
          )}

          {paginated.length === 0 && (
            <div className="rounded-xl border border-border bg-white p-6 text-center">
              <p className="font-semibold text-text-primary">Inga avtal matchar din sökning</p>
              <p className="mt-1 text-sm text-text-secondary">Prova ett annat ord eller visa alla avtal igen.</p>
              <button
                type="button"
                onClick={() => { setSearch(""); setSector("alla"); setVisibleCount(PAGE_SIZE); }}
                className="mt-4 min-h-[44px] rounded-lg border border-primary px-5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Rensa sökningen
              </button>
            </div>
          )}

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
            Avtalsguiden uppdateras löpande. Kontrollera alltid källstatusen på avtalssidan.
          </p>
        </div>
      </section>
    </>
  );
}
