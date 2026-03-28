"use client";

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
  Övrigt: "bg-gray-100 text-gray-800",
};

const outcomeBadge: Record<string, string> = {
  "Facket vann": "bg-green-100 text-green-800",
  "Arbetsgivaren vann": "bg-red-100 text-red-800",
  Förlikning: "bg-gray-100 text-gray-600",
  Avvisad: "bg-gray-100 text-gray-600",
};

interface Props {
  courtCase: CourtCase;
  relatedAgreement: { slug: string; name: string; shortName: string } | null;
}

export default function CourtCaseClient({ courtCase, relatedAgreement }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Hem</Link>
              <ChevronRight size={14} />
              <Link href="/rattsfall" className="hover:text-white transition-colors">Rättsfall</Link>
              <ChevronRight size={14} />
              <span className="text-white/90">{courtCase.caseNumber}</span>
            </nav>

            <h1 className="text-xl sm:text-3xl font-extrabold leading-tight">
              {courtCase.title}
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
              <span className={`rounded-[6px] px-3 py-1 text-xs font-medium ${outcomeBadge[courtCase.outcome] || "bg-gray-100 text-gray-600"}`}>
                {courtCase.outcome}
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Parties */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-[12px] border border-border bg-white p-4 shadow-sm">
              <p className="text-xs font-medium text-text-secondary mb-2">Parter</p>
              <div className="flex items-center gap-3 text-sm">
                <span className="font-medium text-text-primary">{courtCase.parties.union}</span>
                <span className="text-text-secondary">mot</span>
                <span className="font-medium text-text-primary">{courtCase.parties.employer}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Full text */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-4">Sammanfattning</h2>
            <div className="text-text-primary leading-relaxed space-y-4">
              <p>{courtCase.fullText}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Significance */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-4">Vad innebär detta?</h2>
            <div className="rounded-[12px] bg-blue-50 border border-blue-200 p-5">
              <p className="text-sm text-blue-900 leading-relaxed">{courtCase.significance}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Related agreement */}
      {relatedAgreement && (
        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-4">Relaterat avtal</h2>
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
              Källa: Arbetsdomstolen, {courtCase.caseNumber}. Sammanfattad i egna ord av kollektivavtal.ai.
            </p>
            <a
              href={courtCase.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline min-h-[44px]"
            >
              <ExternalLink size={14} />
              Läs hela domen på arbetsdomstolen.se
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
            Sammanfattningen är vägledande och ersätter inte den officiella domen. Kontakta ditt
            fackförbund eller en arbetsrättsjurist för juridisk rådgivning.
          </div>
        </div>
      </section>
    </>
  );
}
