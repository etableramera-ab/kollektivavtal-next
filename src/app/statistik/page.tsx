"use client";

import Link from "next/link";
import Image from "next/image";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CountUp } from "@/components/ui/CountUp";
import { getWageData } from "@/lib/scb-wages";
import { occupations } from "@/data/occupations";
import { getOccupationHeroImage } from "@/lib/sector-images";

const serif = { fontFamily: "var(--font-dm-serif, var(--font-serif))" };

const coverageData = [
  { name: "Kommun/region", value: 100, color: "#0F766E" },
  { name: "Stat", value: 100, color: "#1a4570" },
  { name: "Privat (med avtal)", value: 83, color: "#D97706" },
  { name: "Privat (utan avtal)", value: 17, color: "#E2E8F0" },
];

const keyStats = [
  { end: 617, label: "kollektivavtal" },
  { end: 3.4, label: "miljoner anställda", decimals: true },
  { end: 92, suffix: "%", label: "avtalstäckning" },
  { end: 6.4, suffix: "%", label: "löneökningstakt (märket)", decimals: true },
];

const allSorted = [...occupations].sort((a, b) => b.salary.median - a.salary.median);
const top4 = allSorted.slice(0, 4);
const rest8 = allSorted.slice(4, 12);

export default function StatistikOverview() {
  const wageData = getWageData();

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0F766E 0%, #0A5F59 40%, #0D6B64 100%)" }} className="text-white pt-10 pb-10 sm:pb-16">
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
                    {stat.decimals ? (
                      <>{stat.end.toLocaleString("sv-SE")}{stat.suffix || ""}</>
                    ) : (
                      <CountUp end={stat.end} suffix={stat.suffix || ""} duration={1.5} />
                    )}
                  </p>
                  <p className="text-[15px] text-text-secondary mt-2">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <p className="text-[13px] text-[#6B7280] mt-5 text-center">Källa: Medlingsinstitutet, SCB</p>
        </div>
      </section>

      {/* 2. Populära yrken */}
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-8 mb-6">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-[40px] text-text-primary" style={serif}>
                Populära yrken — vad tjänar de?
              </h2>
              <p className="text-[16px] text-text-secondary mt-2">De högst betalda yrkena med kollektivavtal</p>
            </AnimatedSection>
          </div>

          {/* Top 4 with images */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {top4.map((o, i) => (
              <AnimatedSection key={o.slug} delay={i * 0.05}>
                <Link href={`/yrke/${o.slug}`} className="block h-full group">
                  <div className="rounded-xl border border-border bg-white overflow-hidden h-full hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(15,118,110,0.1)] transition-all duration-[250ms]">
                    <div className="relative h-[100px]">
                      <Image src={getOccupationHeroImage(o.category)} alt={o.title} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
                    </div>
                    <div className="p-4">
                      <p className="text-[16px] text-text-primary group-hover:text-primary transition-colors font-medium">{o.title}</p>
                      <p className="text-[24px] text-accent mt-1" style={serif}>{o.salary.median.toLocaleString("sv-SE")} kr</p>
                      <p className="text-[12px] text-text-secondary">medianlön/mån</p>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {/* Rest 8 as compact list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            {rest8.map((o, i) => (
              <AnimatedSection key={o.slug} delay={0.2 + i * 0.02}>
                <Link href={`/yrke/${o.slug}`} className="block">
                  <div className="flex items-center justify-between py-3 border-b border-surface-dark hover:bg-background -mx-2 px-2 rounded transition-colors">
                    <span className="text-[15px] font-medium text-text-primary">{o.title}</span>
                    <span className="text-[18px] text-accent shrink-0 ml-3" style={serif}>{o.salary.median.toLocaleString("sv-SE")} kr</span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <Link href="/yrke" className="inline-flex items-center gap-1 text-[15px] font-semibold text-primary mt-5 hover:underline min-h-[44px]">
            Se alla {occupations.length} yrken <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* 3. Medianlöner per bransch */}
      <section className="py-10 sm:py-12 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-8 mb-6">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-[40px] text-text-primary" style={serif}>
                Medianlöner per bransch
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.1}>
            <div className="rounded-xl border border-border bg-white p-4 sm:p-6">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={wageData} layout="vertical" margin={{ left: 0, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="label" width={130} tick={{ fontSize: 12, fill: "#1A1A2E" }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v) => [`${Number(v).toLocaleString("sv-SE")} kr`, "Medianlön"]} contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13 }} />
                  <Bar dataKey="medianWage" radius={[0, 6, 6, 0]} barSize={24}>
                    {wageData.map((_, i) => (<Cell key={i} fill={i < 2 ? "#D97706" : "#0F766E"} />))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[13px] text-[#6B7280] mt-3">Källa: SCB lönestrukturstatistik 2023</p>
            <Link href="/statistik/loner" className="inline-flex items-center gap-1 text-[15px] font-semibold text-primary mt-2 hover:underline min-h-[44px]">
              Se detaljerad lönestatistik <ArrowRight size={14} />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="rounded-xl border border-border bg-white p-4">
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={coverageData} cx="50%" cy="50%" innerRadius={55} outerRadius={100} paddingAngle={2} dataKey="value">
                      {coverageData.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value}%`, String(name)]} contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {coverageData.map((d) => (
                  <div key={d.name} className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ background: d.color }} />
                    <span className="text-sm text-text-primary flex-1">{d.name}</span>
                    <span className="text-sm font-semibold text-text-primary">{d.value}%</span>
                  </div>
                ))}
                <p className="text-[13px] text-[#6B7280] pt-2">Källa: Medlingsinstitutet</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 5. Links */}
      <section className="py-10 sm:py-12 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/statistik/loner" className="group rounded-xl border border-border bg-white p-6 hover:border-primary hover:shadow-md transition-all block">
              <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">Lönestatistik per bransch</h3>
              <p className="text-sm text-text-secondary mt-1">Detaljerad lönestatistik med percentiler och filter</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-3">Se lönedata <ArrowRight size={14} /></span>
            </Link>
            <Link href="/statistik/avtalsrorelsen" className="group rounded-xl border border-border bg-white p-6 hover:border-primary hover:shadow-md transition-all block">
              <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">Avtalsrörelsen 2025–2027</h3>
              <p className="text-sm text-text-secondary mt-1">Status, resultat och nästa omförhandling</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-3">Följ utvecklingen <ArrowRight size={14} /></span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
