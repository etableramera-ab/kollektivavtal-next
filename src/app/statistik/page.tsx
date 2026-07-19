"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CountUp } from "@/components/ui/CountUp";


const serif = { fontFamily: "var(--font-dm-serif, var(--font-serif))" };

const coverageData = [
  { name: "Hela arbetsmarknaden", value: 88, color: "#0F766E" },
  { name: "Offentlig sektor", value: 100, color: "#1a4570" },
  { name: "Privat sektor", value: 83, color: "#D97706" },
];

const keyStats = [
  { end: 600, prefix: "cirka ", suffix: "", label: "centrala kollektivavtal" },
  { end: 4, suffix: "+", label: "miljoner anställda omfattades 2025" },
  { end: 88, suffix: "%", label: "avtalstäckning 2025" },
];

export default function StatistikOverview() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-dark text-white pt-10 pb-10 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl md:text-[56px]" style={serif}>
              Arbetsmarknadsstatistik i Sverige
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Löner, avtalstäckning och avtalsrörelsen i siffror
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 1. Nyckeltal — horizontal row */}
      <section className="py-10 sm:py-12 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:flex md:justify-center md:gap-16">
            {keyStats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <div className={`text-center py-3 md:py-0 ${i > 0 ? "md:border-l md:border-border md:pl-16" : ""}`}>
                  <p className="text-3xl sm:text-[48px] text-primary leading-none" style={serif}>
                    <CountUp
                      end={stat.end}
                      prefix={stat.prefix || ""}
                      suffix={stat.suffix || ""}
                      duration={1.5}
                    />
                  </p>
                  <p className="text-[15px] text-text-secondary mt-2">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <p className="text-[13px] text-[#6B7280] mt-5 text-center">
            Källor: <a href="https://www.mi.se/forhandling-avtal/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Medlingsinstitutet om antalet avtal</a>
            {" · "}
            <a href="https://www.mi.se/nyheter/2026/kollektivavtal-for-mer-an-4-miljoner-anstallda/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">statistik för 2025</a>
          </p>
        </div>
      </section>

      {/* 3. Official wage statistics */}
      <section className="py-10 sm:py-12 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-8 mb-6">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-[40px] text-text-primary" style={serif}>
                Löner per yrke
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.1}>
            <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 shrink-0 text-primary" size={22} />
                <div>
                  <p className="leading-relaxed text-text-primary">
                    Se medianlön och lönespridning för tydligt matchade yrkesgrupper i SCB:s
                    officiella lönestrukturstatistik för 2025.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    Statistiken gäller hela ekonomin och är inte samma sak som lägstalön i ett
                    kollektivavtal.
                  </p>
                </div>
              </div>
            </div>
            <Link href="/yrke" className="inline-flex items-center gap-1 text-[15px] font-semibold text-primary mt-3 hover:underline min-h-[44px]">
              Se officiell lönestatistik <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* 4. Avtalstäckning */}
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-8 mb-6">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-[40px] text-text-primary" style={serif}>
                Avtalstäckning per sektor
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.1}>
            <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
              <div className="space-y-5">
                {coverageData.map((d) => (
                  <div key={d.name}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-sm text-text-primary">{d.name}</span>
                      <span className="text-sm font-semibold text-text-primary">{d.value}%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-surface-dark">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${d.value}%`, background: d.color }}
                      />
                    </div>
                  </div>
                ))}
                <p className="text-[13px] text-[#6B7280] pt-2">
                  Källa: <a href="https://www.mi.se/publikationer/kollektivavtalstackning-och-arbetsmarknadens-organisationer-2025/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Medlingsinstitutet 2025</a>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 5. Links */}
      <section className="py-10 sm:py-12 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/yrke" className="group rounded-xl border border-border bg-white p-6 hover:border-primary hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)] transition-all block">
              <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">Lönestatistik per yrke</h3>
              <p className="text-sm text-text-secondary mt-1">Median och lönespridning från SCB 2025</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-3">Se lönedata <ArrowRight size={14} /></span>
            </Link>
            <Link href="/statistik/avtalsrorelsen" className="group rounded-xl border border-border bg-white p-6 hover:border-primary hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)] transition-all block">
              <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">Avtalsperioder</h3>
              <p className="text-sm text-text-secondary mt-1">Perioder hämtade från avtalskällorna</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-3">Se perioderna <ArrowRight size={14} /></span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
