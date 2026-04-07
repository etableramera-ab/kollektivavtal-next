"use client";

import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CountUp } from "@/components/ui/CountUp";
import { getWageData } from "@/lib/scb-wages";

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

export default function StatistikOverview() {
  const wageData = getWageData();

  return (
    <>
      <section className="bg-primary text-white py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl md:text-[56px]" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
              Arbetsmarknadsstatistik i Sverige
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Löner, avtalstäckning och avtalsrörelsen i siffror
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Nyckeltal */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {keyStats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <div className="rounded-[12px] border border-border bg-white p-4 sm:p-6 shadow-sm text-center">
                  <p className="text-2xl sm:text-3xl font-extrabold text-text-primary">
                    {stat.decimals ? (
                      <>{stat.end.toLocaleString("sv-SE")}{stat.suffix || ""}</>
                    ) : (
                      <CountUp end={stat.end} suffix={stat.suffix || ""} duration={1.5} />
                    )}
                  </p>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Avtalstäckning */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-8">
              Avtalstäckning per sektor
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="rounded-[12px] border border-border bg-white p-4 shadow-sm">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={coverageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {coverageData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value}%`, String(name)]}
                      contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {coverageData.map((d) => (
                  <div key={d.name} className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ background: d.color }}
                    />
                    <span className="text-sm text-text-primary flex-1">{d.name}</span>
                    <span className="text-sm font-semibold text-text-primary">{d.value}%</span>
                  </div>
                ))}
                <p className="text-xs text-text-secondary pt-2">
                  Källa: Medlingsinstitutet, egen sammanställning
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Lönefördelning */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-8">
              Medianlöner per bransch
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="rounded-[12px] border border-border bg-white p-4 sm:p-6 shadow-sm">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={wageData} layout="vertical" margin={{ left: 0, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis
                    type="number"
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    tick={{ fontSize: 11, fill: "#64748B" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="label"
                    width={130}
                    tick={{ fontSize: 12, fill: "#1A1A2E" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(v) => [`${Number(v).toLocaleString("sv-SE")} kr`, "Medianlön"]}
                    contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13 }}
                  />
                  <Bar dataKey="medianWage" radius={[0, 6, 6, 0]} barSize={24}>
                    {wageData.map((_, i) => (
                      <Cell key={i} fill={i < 2 ? "#D97706" : "#0F766E"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-text-secondary mt-3">
              Källa: SCB lönestrukturstatistik, egen sammanställning
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Links */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatedSection>
              <Link
                href="/statistik/loner"
                className="group rounded-[12px] border border-border bg-white p-6 shadow-sm hover:shadow-md transition-shadow block"
              >
                <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                  Lönestatistik per bransch
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  Detaljerad lönestatistik med percentiler och filter
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-3">
                  Se lönedata <ArrowRight size={14} />
                </span>
              </Link>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <Link
                href="/statistik/avtalsrorelsen"
                className="group rounded-[12px] border border-border bg-white p-6 shadow-sm hover:shadow-md transition-shadow block"
              >
                <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                  Avtalsrörelsen 2025-2027
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  Status, resultat och nästa omförhandling
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-3">
                  Följ utvecklingen <ArrowRight size={14} />
                </span>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
