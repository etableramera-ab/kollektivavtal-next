"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ChevronRight, ExternalLink, Scale, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { CourtCase } from "@/data/court-cases";

const topicBadge: Record<string, string> = {
  Uppsägning: "bg-red-100 text-red-800",
  Lön: "bg-green-100 text-green-800",
  Diskriminering: "bg-purple-100 text-purple-800",
  Stridsåtgärd: "bg-orange-100 text-orange-800",
  Kollektivavtalstolkning: "bg-blue-100 text-blue-800",
  Medbestämmande: "bg-cyan-100 text-cyan-800",
  Arbetstid: "bg-yellow-100 text-yellow-800",
  Arbetsskyldighet: "bg-indigo-100 text-indigo-800",
  Skadestånd: "bg-amber-100 text-amber-800",
  Övrigt: "bg-gray-100 text-gray-800",
};

interface Props {
  courtCase: CourtCase;
  relatedAgreement: { slug: string; name: string; shortName: string } | null;
}

export default function CourtCaseClient({ courtCase, relatedAgreement }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white pt-[120px] pb-10 sm:pb-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-6 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">Hem</Link>
              <ChevronRight size={14} />
              <Link href="/rattsfall" className="hover:text-white transition-colors">Rättsfall</Link>
              <ChevronRight size={14} />
              <span className="text-white/90">{courtCase.caseNumber}</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl md:text-[56px] leading-tight" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
              {courtCase.title || courtCase.caseNumber}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-[6px] bg-white/15 px-3 py-1 text-xs font-medium">
                {courtCase.caseNumber}
              </span>
              <span className="rounded-[6px] bg-white/15 px-3 py-1 text-xs font-medium">
                {courtCase.date}
              </span>
              <span className={`rounded-[6px] px-3 py-1 text-xs font-medium ${topicBadge[courtCase.topic] || "bg-gray-100 text-gray-800"}`}>
                {courtCase.topic}
              </span>
              {courtCase.isGuiding && (
                <span className="rounded-[6px] bg-accent/20 text-accent px-3 py-1 text-xs font-medium">
                  Vägledande dom
                </span>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Keywords */}
      {courtCase.keywords.length > 0 && (
        <section className="py-4 sm:py-6">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-1.5">
              {courtCase.keywords.map((kw) => (
                <span key={kw} className="rounded-full bg-background border border-border px-2.5 py-0.5 text-xs text-text-secondary">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Referat */}
      {courtCase.summary && (
        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-[32px] text-text-primary mb-4" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>Referat</h2>
              <div className="text-text-primary leading-relaxed text-sm sm:text-base">
                <p>{courtCase.summary}</p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Case numbers */}
      {courtCase.caseNumbers.length > 0 && (
        <section className="py-6 bg-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs text-text-secondary">
              Målnummer: {courtCase.caseNumbers.join(", ")}
            </p>
          </div>
        </section>
      )}

      {/* Related agreement */}
      {relatedAgreement && (
        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-[32px] text-text-primary mb-4" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>Relaterat avtal</h2>
              <Link
                href={`/avtal/${relatedAgreement.slug}`}
                className="block rounded-[12px] border border-border bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="font-semibold text-text-primary">{relatedAgreement.name}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-2">
                  Läs om avtalet <ArrowRight size={14} />
                </span>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Source */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-xs text-text-secondary mb-3">
              Källa: Domstolsverkets öppna data — {courtCase.caseNumber}. Referatet är en offentlig handling.
            </p>
            <a
              href={courtCase.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline min-h-[44px]"
            >
              <ExternalLink size={14} />
              Se domen på Domstolsverkets webbplats
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Cross-selling */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <a
              href="https://allaadvokater.se"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-[12px] border border-border bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <Scale size={28} className="text-accent shrink-0" />
                <div>
                  <p className="font-semibold text-text-primary">Behöver du juridisk hjälp i en arbetsrättstvist?</p>
                  <p className="text-sm text-text-secondary">Hitta en arbetsrättsjurist på allaadvokater.se</p>
                </div>
              </div>
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[12px] bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 leading-relaxed">
            Rättsfallsreferat från Domstolsverkets öppna data. Informationen är vägledande och ersätter inte
            den officiella domen. Kontakta ditt fackförbund eller en arbetsrättsjurist för juridisk rådgivning.
          </div>
        </div>
      </section>
    </>
  );
}
