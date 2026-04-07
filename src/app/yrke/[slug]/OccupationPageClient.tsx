"use client";

import Link from "next/link";
import {
  ArrowRight, Scale, MessageCircle,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getOccupationHeroImage } from "@/lib/sector-images";
import FaqAccordion from "@/components/FaqAccordion";
import AgreementChat from "@/components/AgreementChat";
import type { Occupation } from "@/data/occupations";

interface Props {
  occupation: Occupation;
  agreementName: string;
  agreementShortName: string;
  agreementSlug: string;
  relatedOccupations: { slug: string; title: string; median: number }[];
}

const demandColors: Record<string, string> = {
  "Mycket hög efterfrågan": "bg-green-100 text-green-800",
  "Hög efterfrågan": "bg-green-50 text-green-700",
  "Normal efterfrågan": "bg-gray-100 text-gray-700",
  "Minskande": "bg-yellow-100 text-yellow-800",
};

const serif = { fontFamily: "var(--font-dm-serif, var(--font-serif))" };

export default function OccupationPageClient({
  occupation: occ,
  agreementName,
  agreementShortName,
  agreementSlug,
  relatedOccupations,
}: Props) {
  const suggestedQuestions = occ.faq.slice(0, 3).map((f) => f.question);
  const pensionMonthlyEstimate = Math.round(occ.salary.median * 0.045);
  const obMonthlyEstimate = occ.obRates ? 3000 : 0;

  const demandBadge = Object.entries(demandColors).find(([k]) =>
    occ.demandOutlook.startsWith(k)
  );

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        style={{ backgroundImage: `linear-gradient(135deg, rgba(15,118,110,0.82) 0%, rgba(10,95,89,0.87) 100%), url('${getOccupationHeroImage(occ.category)}')`, backgroundSize: "cover", backgroundPosition: "center" }}
        className="text-white pt-10 pb-10 sm:pb-14"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <nav className="flex items-center gap-1.5 text-[13px] text-white/60 mb-5">
              <Link href="/yrke" className="hover:text-white transition-colors">Yrken</Link>
              <span className="text-white/40">/</span>
              <span className="text-white/90">{occ.title}</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl md:text-[56px] leading-tight" style={serif}>
              Lön som {occ.titleGenitive} 2026
            </h1>

            {/* Salary highlight */}
            <p className="mt-4 text-[40px] sm:text-[52px] leading-none" style={{ ...serif, color: "#D97706" }}>
              {occ.salary.median.toLocaleString("sv-SE")} kr
            </p>
            <p className="text-white/60 text-sm mt-1">medianlön per månad · Källa: SCB Lönestatistik 2025</p>

            {/* Badges — sector, agreement, demand, education */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">{occ.sector}</span>
              <Link href={`/avtal/${agreementSlug}`} className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium hover:bg-white/25 transition-colors">
                {agreementShortName} →
              </Link>
              {demandBadge && (
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${demandBadge[1]}`}>
                  {occ.demandOutlook.split(" — ")[0]}
                </span>
              )}
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                {occ.education.length > 30 ? occ.education.split(".")[0] : occ.education}
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── AEO ─── */}
      <section className="py-6">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-r-lg border-l-[3px] border-l-primary bg-[#F0FDFA] p-5">
            <p className="text-sm sm:text-base text-text-primary leading-relaxed">{occ.aeoAnswer}</p>
          </div>
        </div>
      </section>

      {/* ─── TWO-COLUMN LAYOUT ─── */}
      <section className="pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 pt-6">

            {/* ── LEFT COLUMN: Main content ── */}
            <div className="space-y-12">

              {/* Agreement info */}
              <div>
                <h2 className="text-2xl sm:text-[32px] text-text-primary mb-2" style={serif}>
                  Ditt kollektivavtal: {agreementShortName}
                </h2>
                <p className="text-sm text-text-secondary mb-3">{occ.description}</p>
                <Link href={`/avtal/${agreementSlug}`} className="inline-flex items-center gap-1 text-[15px] font-semibold text-primary hover:underline">
                  Läs hela avtalet <ArrowRight size={14} />
                </Link>

                {/* Conditions grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-0 mt-6">
                  {[
                    { label: "Arbetstid", value: occ.workHours },
                    { label: "Semester", value: occ.vacation },
                    { label: "Pension", value: occ.pension },
                    { label: "Övertid", value: occ.overtimeRate },
                    { label: "Uppsägning", value: occ.noticePeriod },
                    { label: "Föräldralön", value: occ.parentalPay },
                  ].map((item) => (
                    <div key={item.label} className="py-3 border-b border-border">
                      <p className="text-[13px] font-semibold text-text-secondary uppercase tracking-wide">{item.label}</p>
                      <p className="text-[16px] text-text-primary mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* OB table */}
              {occ.obRates && (
                <div>
                  <h2 className="text-2xl sm:text-[32px] text-text-primary mb-4" style={serif}>OB-tillägg</h2>
                  <div className="rounded-xl border border-border bg-white overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="text-left p-4 font-semibold">Tid</th>
                          <th className="text-left p-4 font-semibold">Tillägg/tim</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { tid: "Vardagskväll", rate: occ.obRates.weekdayEvening },
                          { tid: "Natt", rate: occ.obRates.night },
                          { tid: "Helg", rate: occ.obRates.weekend },
                          { tid: "Storhelg", rate: occ.obRates.holiday },
                        ].map((r, i) => (
                          <tr key={r.tid} className={`border-b border-surface-dark last:border-0 ${i % 2 === 1 ? "bg-background" : ""}`}>
                            <td className="p-4 text-text-primary">{r.tid}</td>
                            <td className="p-4 font-medium text-text-primary">{r.rate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* What you lose */}
              <div className="rounded-r-xl border-l-[3px] border-l-primary bg-[#F0FDFA] p-6">
                <h3 className="font-semibold text-text-primary text-lg mb-2">Vad förlorar du utan kollektivavtal?</h3>
                <p className="text-text-primary leading-relaxed">
                  Utan kollektivavtal förlorar du som {occ.titleGenitive} uppskattningsvis{" "}
                  <span className="text-[24px] font-normal text-accent" style={serif}>~{pensionMonthlyEstimate.toLocaleString("sv-SE")} kr/mån</span> i pension
                  {obMonthlyEstimate > 0 ? `, ca ${obMonthlyEstimate.toLocaleString("sv-SE")} kr/mån i OB-tillägg` : ""}
                  {" "}och föräldralön.
                </p>
                <Link href="/jamfor" className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-3 hover:underline">
                  Jämför inkomstförsäkringar <ArrowRight size={14} />
                </Link>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl sm:text-[28px] text-text-primary mb-6" style={serif}>
                  Vanliga frågor om lön som {occ.titleGenitive}
                </h2>
                <FaqAccordion items={occ.faq} />
              </div>
            </div>

            {/* ── RIGHT COLUMN: Sticky sidebar ── */}
            <div className="space-y-6 lg:sticky lg:top-[80px] lg:self-start">

              {/* Salary overview */}
              <div className="rounded-xl border border-border bg-white p-6">
                <p className="font-semibold text-text-primary text-[16px] mb-4">Lön 2026</p>
                {[
                  { label: "Lägst (avtal)", value: occ.salary.minimum, highlight: false },
                  { label: "Median (SCB)", value: occ.salary.median, highlight: true },
                  { label: "Topp (P90)", value: occ.salary.p90, highlight: false },
                ].map((row, i) => (
                  <div key={row.label} className={`flex items-center justify-between py-3 ${i < 2 ? "border-b border-surface-dark" : ""}`}>
                    <span className="text-sm text-text-secondary">{row.label}</span>
                    <span className={`text-[20px] ${row.highlight ? "text-accent font-semibold" : "text-text-primary"}`} style={serif}>
                      {row.value.toLocaleString("sv-SE")} kr
                    </span>
                  </div>
                ))}
              </div>

              {/* AI Chat */}
              <div className="rounded-xl border border-border bg-white p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle size={20} className="text-primary" />
                  <p className="font-semibold text-text-primary text-[16px]">Fråga AI-experten</p>
                </div>
                <AgreementChat
                  agreementSlug={agreementSlug}
                  agreementName={agreementShortName}
                  suggestedQuestions={suggestedQuestions}
                />
              </div>

              {/* Related occupations */}
              {relatedOccupations.length > 0 && (
                <div className="rounded-xl border border-border bg-white p-6">
                  <p className="font-semibold text-text-primary text-[16px] mb-4">Relaterade yrken</p>
                  {relatedOccupations.slice(0, 4).map((r, i) => (
                    <Link key={r.slug} href={`/yrke/${r.slug}`} className="block">
                      <div className={`flex items-center justify-between py-3 hover:bg-background -mx-2 px-2 rounded transition-colors ${i < Math.min(relatedOccupations.length, 4) - 1 ? "border-b border-surface-dark" : ""}`}>
                        <span className="text-[15px] font-medium text-text-primary">{r.title}</span>
                        <span className="text-[16px] text-accent" style={serif}>{r.median.toLocaleString("sv-SE")} kr</span>
                      </div>
                    </Link>
                  ))}
                  <Link href="/yrke" className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-3 hover:underline">
                    Se alla 50 yrken <ArrowRight size={14} />
                  </Link>
                </div>
              )}

              {/* CTA block */}
              <div className="rounded-xl bg-primary p-6 text-center">
                <p className="font-semibold text-white text-[16px]">Se ditt kollektivavtal</p>
                <p className="text-sm text-white/80 mt-1">{agreementName}</p>
                <Link
                  href={`/avtal/${agreementSlug}`}
                  className="block mt-4 w-full py-3 rounded-lg text-white text-[15px] font-semibold text-center transition-all duration-200 hover:-translate-y-px"
                  style={{ background: "linear-gradient(135deg, #D97706 0%, #B45309 100%)" }}
                >
                  Läs {agreementShortName} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CROSS-SELLING (full-width) ─── */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="https://allaadvokater.se" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-white p-5 hover:border-primary hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(15,118,110,0.08)] transition-all duration-200">
              <div className="flex items-center gap-3">
                <Scale size={24} className="text-primary shrink-0" />
                <div>
                  <p className="font-semibold text-text-primary text-sm">Behöver du juridisk hjälp?</p>
                  <p className="text-xs text-text-secondary">Hitta en arbetsrättsjurist</p>
                </div>
              </div>
            </a>
            <Link href={`/avtal/${agreementSlug}`} className="block rounded-xl border border-border bg-white p-5 hover:border-primary hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(15,118,110,0.08)] transition-all duration-200">
              <div className="flex items-center gap-3">
                <ArrowRight size={24} className="text-primary shrink-0" />
                <div>
                  <p className="font-semibold text-text-primary text-sm">Se ditt kollektivavtal</p>
                  <p className="text-xs text-text-secondary">{agreementName}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── DISCLAIMER ─── */}
      <section className="pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 leading-relaxed">
            Lönerna är baserade på SCB:s lönestrukturstatistik och lägsta nivåer i aktuellt kollektivavtal.
            Individuell lön beror på erfarenhet, arbetsgivare, ort och lokala förhandlingar.
            Källa: SCB, {agreementShortName}.
          </div>
        </div>
      </section>
    </>
  );
}
