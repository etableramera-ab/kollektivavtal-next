"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
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
import {
  Scale,
  MessageSquare,
} from "lucide-react";
import { agreements } from "@/data/agreements";
import { calculateWage } from "@/lib/wage-calculator";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function Lonekalkylator() {
  const [agreementIdx, setAgreementIdx] = useState(0);
  const [roleIdx, setRoleIdx] = useState(0);
  const [years, setYears] = useState(5);
  const [employmentRate, setEmploymentRate] = useState(1.0);
  const [useOb, setUseOb] = useState(false);
  const [obHours, setObHours] = useState({
    weekdayEvening: 0,
    night: 0,
    weekend: 0,
    holiday: 0,
  });

  const agreement = agreements[agreementIdx];
  const roles = agreement.wageTable;

  const result = useMemo(
    () =>
      calculateWage({
        agreement,
        roleIndex: roleIdx,
        yearsExperience: years,
        employmentRate,
        obHours: useOb ? obHours : { weekdayEvening: 0, night: 0, weekend: 0, holiday: 0 },
      }),
    [agreement, roleIdx, years, employmentRate, useOb, obHours]
  );

  const chartData = [
    { name: "Din grundlön", value: result.baseWage, fill: "#0F766E" },
    { name: "Medianlön", value: result.medianWage, fill: "#D97706" },
    { name: "Utan avtal", value: 0, fill: "#E2E8F0" },
  ];

  function handleObChange(key: keyof typeof obHours, val: string) {
    setObHours((prev) => ({ ...prev, [key]: parseInt(val) || 0 }));
  }

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0F766E 0%, #0A5F59 40%, #0D6B64 100%)" }} className="text-white py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl md:text-[56px]" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
              Lönekalkylator
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Se vad du ska tjäna enligt ditt kollektivavtal
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* AEO box */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[12px] bg-blue-50 border border-blue-200 p-4 sm:p-5">
            <p className="text-sm text-blue-900 leading-relaxed">
              Med lönekalkylatorn kan du se vad du ska tjäna enligt ditt kollektivavtal. Ange
              bransch, yrke och erfarenhet för att se lägsta lön, medianlön, OB-tillägg och pension.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Input */}
            <AnimatedSection>
              <div className="rounded-[12px] border border-border bg-white p-5 sm:p-6 shadow-sm space-y-5">
                <h2 className="font-bold text-text-primary">Dina uppgifter</h2>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    Kollektivavtal
                  </label>
                  <select
                    value={agreementIdx}
                    onChange={(e) => {
                      setAgreementIdx(Number(e.target.value));
                      setRoleIdx(0);
                    }}
                    className="w-full rounded-[8px] border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white"
                  >
                    {agreements.map((a, i) => (
                      <option key={a.slug} value={i}>
                        {a.shortName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    Yrkesgrupp
                  </label>
                  <select
                    value={roleIdx}
                    onChange={(e) => setRoleIdx(Number(e.target.value))}
                    className="w-full rounded-[8px] border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white"
                  >
                    {roles.map((r, i) => (
                      <option key={r.role} value={i}>
                        {r.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    Erfarenhet: {years} år
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={30}
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full accent-accent"
                  />
                  <div className="flex justify-between text-xs text-text-secondary">
                    <span>0 år</span>
                    <span>30 år</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    Arbetstid
                  </label>
                  <select
                    value={employmentRate}
                    onChange={(e) => setEmploymentRate(Number(e.target.value))}
                    className="w-full rounded-[8px] border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white"
                  >
                    <option value={1.0}>Heltid 100%</option>
                    <option value={0.75}>Deltid 75%</option>
                    <option value={0.5}>Deltid 50%</option>
                    <option value={0.25}>Deltid 25%</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
                    <input
                      type="checkbox"
                      checked={useOb}
                      onChange={(e) => setUseOb(e.target.checked)}
                      className="accent-accent w-4 h-4"
                    />
                    <span className="text-sm font-medium text-text-primary">
                      Jag jobbar obekväm arbetstid
                    </span>
                  </label>
                </div>

                {useOb && (
                  <div className="space-y-3 pl-6 border-l-2 border-accent/20">
                    <p className="text-xs text-text-secondary">Uppskattade OB-timmar per månad</p>
                    {[
                      { key: "weekdayEvening" as const, label: "Vardagskväll" },
                      { key: "night" as const, label: "Natt" },
                      { key: "weekend" as const, label: "Helg" },
                      { key: "holiday" as const, label: "Storhelg" },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center gap-3">
                        <label className="text-sm text-text-primary w-28 shrink-0">{label}</label>
                        <input
                          type="number"
                          min={0}
                          max={200}
                          value={obHours[key]}
                          onChange={(e) => handleObChange(key, e.target.value)}
                          className="w-20 rounded-[8px] border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-center"
                        />
                        <span className="text-xs text-text-secondary">tim</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Result */}
            <AnimatedSection delay={0.15}>
              <div className="space-y-4">
                <div className="rounded-[12px] border-2 border-accent bg-white p-5 sm:p-6 shadow-sm">
                  <p className="text-sm text-text-secondary">Din uppskattade månadslön</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-1">
                    {result.totalEstimate.toLocaleString("sv-SE")} kr
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    Baserat på {agreement.shortName} — {roles[roleIdx]?.role}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[12px] border border-border bg-white p-4 shadow-sm">
                    <p className="text-xs text-text-secondary">Grundlön (lägst)</p>
                    <p className="text-lg font-bold text-text-primary">
                      {result.baseWage.toLocaleString("sv-SE")} kr
                    </p>
                  </div>
                  <div className="rounded-[12px] border border-border bg-white p-4 shadow-sm">
                    <p className="text-xs text-text-secondary">Medianlön (SCB)</p>
                    <p className="text-lg font-bold text-accent">
                      {result.medianWage.toLocaleString("sv-SE")} kr
                    </p>
                  </div>
                  {useOb && result.obTotal > 0 && (
                    <div className="rounded-[12px] border border-border bg-white p-4 shadow-sm">
                      <p className="text-xs text-text-secondary">OB-tillägg</p>
                      <p className="text-lg font-bold text-success">
                        +{result.obTotal.toLocaleString("sv-SE")} kr
                      </p>
                    </div>
                  )}
                  <div className="rounded-[12px] border border-border bg-white p-4 shadow-sm">
                    <p className="text-xs text-text-secondary">Pension (arbetsgivare)</p>
                    <p className="text-lg font-bold text-text-primary">
                      {result.pensionContribution.toLocaleString("sv-SE")} kr
                    </p>
                  </div>
                </div>

                {/* Chart */}
                <div className="rounded-[12px] border border-border bg-white p-4 shadow-sm">
                  <p className="text-sm font-medium text-text-primary mb-3">Jämförelse</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                      <XAxis
                        type="number"
                        tick={{ fontSize: 11, fill: "#64748B" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={100}
                        tick={{ fontSize: 11, fill: "#1A1A2E" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        formatter={(v) => [
                          Number(v) === 0
                            ? "Ingen garanti"
                            : `${Number(v).toLocaleString("sv-SE")} kr`,
                          "",
                        ]}
                        contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }}
                      />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                        {chartData.map((entry, i) => (
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/avtal/${agreement.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-accent text-white px-5 py-3 text-sm font-medium hover:bg-accent/90 transition-colors min-h-[44px]"
                  >
                    <MessageSquare size={16} />
                    Chatta med AI-expert
                  </Link>
                  <a
                    href="https://allaadvokater.se"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-border bg-white px-5 py-3 text-sm font-medium text-text-primary hover:border-accent hover:text-accent transition-colors min-h-[44px]"
                  >
                    <Scale size={16} />
                    Hitta arbetsrättsjurist
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 rounded-[12px] bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 leading-relaxed">
            Beräkningarna är uppskattningar baserade på lägsta löner i kollektivavtalet och
            lönestatistik från SCB. Din faktiska lön beror på lokala förhandlingar, individuell
            lönesättning och arbetsgivarens policy. Kontakta ditt fackförbund för exakta uppgifter.
          </div>
        </div>
      </section>
    </>
  );
}
