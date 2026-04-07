"use client";

import Link from "next/link";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import {
  ChevronRight, ArrowRight, TrendingDown, Minus, TrendingUp, Scale, ExternalLink,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
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

export default function OccupationPageClient({
  occupation: occ,
  agreementName,
  agreementShortName,
  agreementSlug,
  relatedOccupations,
}: Props) {
  const chartData = [
    { name: "Lägst (avtal)", value: occ.salary.minimum, fill: "#E2E8F0" },
    { name: "Median (SCB)", value: occ.salary.median, fill: "#0F766E" },
    { name: "Topp (P90)", value: occ.salary.p90, fill: "#D97706" },
  ];

  const demandBadge = Object.entries(demandColors).find(([k]) =>
    occ.demandOutlook.startsWith(k)
  );

  const suggestedQuestions = occ.faq.slice(0, 3).map((f) => f.question);

  // Estimate what you lose without agreement
  const obMonthlyEstimate = occ.obRates ? 3000 : 0;
  const pensionMonthlyEstimate = Math.round(occ.salary.median * 0.045);

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0F766E 0%, #0A5F59 40%, #0D6B64 100%)" }} className="text-white py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-6 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">Hem</Link>
              <ChevronRight size={14} />
              <Link href="/yrke" className="hover:text-white transition-colors">Yrken</Link>
              <ChevronRight size={14} />
              <span className="text-white/90">{occ.title}</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl md:text-[56px] leading-tight" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>
              Lön som {occ.titleGenitive} 2026
            </h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-[6px] bg-white/15 px-3 py-1 text-xs font-medium">{occ.sector}</span>
              <Link href={`/avtal/${agreementSlug}`} className="rounded-[6px] bg-white/15 px-3 py-1 text-xs font-medium hover:bg-white/25 transition-colors">
                {agreementShortName}
              </Link>
              {demandBadge && (
                <span className={`rounded-[6px] px-3 py-1 text-xs font-medium ${demandBadge[1]}`}>
                  {occ.demandOutlook.split(" — ")[0]}
                </span>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* AEO box */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-[12px] bg-blue-50 border border-blue-200 p-5">
              <p className="text-sm sm:text-base text-blue-900 leading-relaxed">{occ.aeoAnswer}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Salary cards */}
      <section className="pb-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-3">
            <AnimatedSection delay={0}>
              <div className="rounded-[12px] border border-border bg-white p-4 shadow-sm text-center">
                <TrendingDown size={20} className="mx-auto text-text-secondary mb-1" />
                <p className="text-xs text-text-secondary">Lägst (avtal)</p>
                <p className="text-lg sm:text-2xl font-extrabold text-text-primary">{occ.salary.minimum.toLocaleString("sv-SE")}</p>
                <p className="text-xs text-text-secondary">kr/mån</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="rounded-[12px] border-2 border-accent bg-white p-4 shadow-sm text-center">
                <Minus size={20} className="mx-auto text-accent mb-1" />
                <p className="text-xs text-text-secondary">Median (SCB)</p>
                <p className="text-lg sm:text-2xl font-extrabold text-accent">{occ.salary.median.toLocaleString("sv-SE")}</p>
                <p className="text-xs text-text-secondary">kr/mån</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="rounded-[12px] border border-border bg-white p-4 shadow-sm text-center">
                <TrendingUp size={20} className="mx-auto text-success mb-1" />
                <p className="text-xs text-text-secondary">Topp (P90)</p>
                <p className="text-lg sm:text-2xl font-extrabold text-text-primary">{occ.salary.p90.toLocaleString("sv-SE")}</p>
                <p className="text-xs text-text-secondary">kr/mån</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Chart */}
      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-[12px] border border-border bg-white p-4 shadow-sm">
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11, fill: "#1A1A2E" }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v) => [`${Number(v).toLocaleString("sv-SE")} kr`, ""]} contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                    {chartData.map((entry, i) => (<Cell key={i} fill={entry.fill} />))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-text-secondary mt-2">Du ska tjäna minst {occ.salary.minimum.toLocaleString("sv-SE")} kr enligt ditt avtal</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Agreement info */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-4" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>
              Ditt kollektivavtal: {agreementShortName}
            </h2>
            <p className="text-sm text-text-secondary mb-4">{occ.description}</p>
            <Link href={`/avtal/${agreementSlug}`} className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline min-h-[44px]">
              Läs hela avtalet <ArrowRight size={14} />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
            {[
              { label: "Arbetstid", value: occ.workHours },
              { label: "Semester", value: occ.vacation },
              { label: "Pension", value: occ.pension },
              { label: "Övertid", value: occ.overtimeRate },
              { label: "Uppsägning", value: occ.noticePeriod },
              { label: "Föräldralön", value: occ.parentalPay },
            ].map((item, i) => (
              <AnimatedSection key={item.label} delay={i * 0.05}>
                <div className="rounded-[12px] border border-border bg-white p-3 shadow-sm">
                  <p className="text-xs text-text-secondary">{item.label}</p>
                  <p className="text-sm font-medium text-text-primary mt-0.5">{item.value}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* OB table */}
      {occ.obRates && (
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-[32px] text-text-primary mb-4" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>OB-tillägg</h2>
              <p className="text-sm text-text-secondary mb-4">Så mycket mer tjänar du på obekväm arbetstid</p>
              <div className="rounded-[12px] border border-border bg-white shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-background">
                      <th className="text-left p-4 font-semibold text-text-primary">Tid</th>
                      <th className="text-left p-4 font-semibold text-text-primary">Tillägg/tim</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { tid: "Vardagskväll", rate: occ.obRates.weekdayEvening },
                      { tid: "Natt", rate: occ.obRates.night },
                      { tid: "Helg", rate: occ.obRates.weekend },
                      { tid: "Storhelg", rate: occ.obRates.holiday },
                    ].map((r) => (
                      <tr key={r.tid} className="border-b border-border last:border-0">
                        <td className="p-4 text-text-primary">{r.tid}</td>
                        <td className="p-4 font-medium text-text-primary">{r.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* What you lose */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-[12px] border-2 border-accent bg-accent/5 p-5">
              <h2 className="font-bold text-text-primary mb-2">Vad förlorar du utan kollektivavtal?</h2>
              <p className="text-sm text-text-primary leading-relaxed">
                Utan kollektivavtal förlorar du som {occ.titleGenitive} uppskattningsvis ~{pensionMonthlyEstimate.toLocaleString("sv-SE")} kr/mån i pension
                {obMonthlyEstimate > 0 ? `, ca ${obMonthlyEstimate.toLocaleString("sv-SE")} kr/mån i OB-tillägg` : ""}
                {" "}och föräldralön.
              </p>
              <a href="https://allaforsakringar.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-3 hover:underline min-h-[44px]">
                Jämför inkomstförsäkringar <ArrowRight size={14} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Education & demand */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatedSection>
              <div className="rounded-[12px] border border-border bg-white p-5 shadow-sm">
                <h3 className="font-bold text-text-primary text-sm mb-2">Utbildning</h3>
                <p className="text-sm text-text-secondary">{occ.education}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="rounded-[12px] border border-border bg-white p-5 shadow-sm">
                <h3 className="font-bold text-text-primary text-sm mb-2">Efterfrågan</h3>
                <p className="text-sm text-text-secondary">{occ.demandOutlook}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-6" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>Vanliga frågor om lön som {occ.titleGenitive}</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <FaqAccordion items={occ.faq} />
          </AnimatedSection>
        </div>
      </section>

      {/* AI Chat */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <AgreementChat
              agreementSlug={agreementSlug}
              agreementName={agreementShortName}
              suggestedQuestions={suggestedQuestions}
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Related occupations */}
      {relatedOccupations.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-[32px] text-text-primary mb-6" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>Relaterade yrken</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedOccupations.map((r, i) => (
                <AnimatedSection key={r.slug} delay={i * 0.05}>
                  <Link href={`/yrke/${r.slug}`} className="block rounded-[12px] border border-border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-text-primary text-sm">{r.title}</p>
                      <p className="text-sm font-bold text-accent">{r.median.toLocaleString("sv-SE")} kr</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-accent mt-1">
                      Se lön <ArrowRight size={12} />
                    </span>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cross-selling */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AnimatedSection>
              <a href="https://allaadvokater.se" target="_blank" rel="noopener noreferrer" className="block rounded-[12px] border border-border bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <Scale size={24} className="text-accent shrink-0" />
                  <div>
                    <p className="font-semibold text-text-primary text-sm">Behöver du juridisk hjälp?</p>
                    <p className="text-xs text-text-secondary">Hitta en arbetsrättsjurist</p>
                  </div>
                </div>
              </a>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <Link href={`/avtal/${agreementSlug}`} className="block rounded-[12px] border border-border bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <ExternalLink size={24} className="text-accent shrink-0" />
                  <div>
                    <p className="font-semibold text-text-primary text-sm">Se ditt kollektivavtal</p>
                    <p className="text-xs text-text-secondary">{agreementName}</p>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[12px] bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 leading-relaxed">
            Lönerna är baserade på SCB:s lönestrukturstatistik och lägsta nivåer i aktuellt kollektivavtal.
            Individuell lön beror på erfarenhet, arbetsgivare, ort och lokala förhandlingar.
            Källa: SCB, {agreementShortName}.
          </div>
        </div>
      </section>
    </>
  );
}
