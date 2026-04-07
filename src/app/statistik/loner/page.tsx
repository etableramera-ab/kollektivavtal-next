"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getWageData } from "@/lib/scb-wages";

type SortBy = "highest" | "lowest" | "alpha";

export default function LonerPage() {
  const allData = getWageData();
  const [sortBy, setSortBy] = useState<SortBy>("highest");

  const sorted = useMemo(() => {
    const data = [...allData];
    if (sortBy === "highest") return data.sort((a, b) => b.medianWage - a.medianWage);
    if (sortBy === "lowest") return data.sort((a, b) => a.medianWage - b.medianWage);
    return data.sort((a, b) => a.label.localeCompare(b.label, "sv"));
  }, [allData, sortBy]);

  return (
    <>
      <section className="bg-primary text-white py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl md:text-[56px]" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
              Lönestatistik per bransch
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Medianlöner i Sverige baserat på SCB:s lönestrukturstatistik
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[12px] bg-blue-50 border border-blue-200 p-4 sm:p-5">
            <p className="text-sm text-blue-900 leading-relaxed">
              Medianlönen i Sverige varierar kraftigt mellan branscher. IT och finans toppar listan
              medan hotell och restaurang ligger lägst. Statistiken nedan visar medianlöner — hälften
              tjänar mer, hälften tjänar mindre.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { value: "highest" as SortBy, label: "Högst lön" },
                { value: "lowest" as SortBy, label: "Lägst lön" },
                { value: "alpha" as SortBy, label: "Alfabetisk" },
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setSortBy(f.value)}
                  className={`rounded-[8px] px-4 py-2.5 text-sm font-medium transition-colors min-h-[44px] ${
                    sortBy === f.value
                      ? "bg-primary text-white"
                      : "bg-white border border-border text-text-secondary hover:text-primary hover:border-primary"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Chart */}
          <AnimatedSection delay={0.1}>
            <div className="rounded-[12px] border border-border bg-white p-4 sm:p-6 shadow-sm mb-6">
              <ResponsiveContainer width="100%" height={440}>
                <BarChart data={sorted} layout="vertical" margin={{ left: 0, right: 20 }}>
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
                  <Bar dataKey="medianWage" radius={[0, 6, 6, 0]} barSize={26}>
                    {sorted.map((_, i) => (
                      <Cell key={i} fill={i < 2 ? "#D97706" : "#0F766E"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedSection>

          {/* Table */}
          <AnimatedSection delay={0.15}>
            {/* Desktop */}
            <div className="hidden md:block rounded-[12px] border border-border bg-white shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-background">
                    <th className="text-left p-4 font-semibold text-text-primary">Bransch</th>
                    <th className="text-right p-4 font-semibold text-text-primary">Percentil 10</th>
                    <th className="text-right p-4 font-semibold text-accent">Medianlön</th>
                    <th className="text-right p-4 font-semibold text-text-primary">Percentil 90</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((d) => (
                    <tr key={d.code} className="border-b border-border last:border-0">
                      <td className="p-4 font-medium text-text-primary">{d.label}</td>
                      <td className="p-4 text-right text-text-secondary">
                        {d.p10Wage ? `${d.p10Wage.toLocaleString("sv-SE")} kr` : "—"}
                      </td>
                      <td className="p-4 text-right font-semibold text-accent">
                        {d.medianWage.toLocaleString("sv-SE")} kr
                      </td>
                      <td className="p-4 text-right text-text-secondary">
                        {d.p90Wage ? `${d.p90Wage.toLocaleString("sv-SE")} kr` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {sorted.map((d) => (
                <div key={d.code} className="rounded-[12px] border border-border bg-white p-4 shadow-sm">
                  <p className="font-semibold text-text-primary text-sm">{d.label}</p>
                  <div className="flex gap-4 mt-2">
                    <div>
                      <p className="text-xs text-text-secondary">P10</p>
                      <p className="text-sm text-text-primary">
                        {d.p10Wage ? `${d.p10Wage.toLocaleString("sv-SE")} kr` : "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Median</p>
                      <p className="text-sm font-semibold text-accent">
                        {d.medianWage.toLocaleString("sv-SE")} kr
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">P90</p>
                      <p className="text-sm text-text-primary">
                        {d.p90Wage ? `${d.p90Wage.toLocaleString("sv-SE")} kr` : "—"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-text-secondary mt-4">
              Källa: SCB lönestrukturstatistik 2023. Senast uppdaterad: mars 2026.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
