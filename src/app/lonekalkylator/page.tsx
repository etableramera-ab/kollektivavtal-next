"use client";

import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { Scale, MessageCircle } from "lucide-react";
import { agreements } from "@/data/agreements";
import { calculateWage } from "@/lib/wage-calculator";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

function isHourlyWage(role: { minimum: string; median: string }): boolean {
  return role.minimum.includes("/tim") || role.median.includes("/tim") || role.minimum.includes("kr/h");
}

function parseKrNum(str: string): number {
  const match = str.replace(/\s/g, "").match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export default function Lonekalkylator() {
  const [agreementIdx, setAgreementIdx] = useState(0);
  const [roleIdx, setRoleIdx] = useState(0);
  const [years, setYears] = useState(5);
  const [employmentRate, setEmploymentRate] = useState(1.0);
  const [useOb, setUseOb] = useState(false);
  const [obHours, setObHours] = useState({
    weekdayEvening: 0, night: 0, weekend: 0, holiday: 0,
  });

  const agreement = agreements[agreementIdx];
  const roles = agreement.wageTable;
  const currentRole = roles[roleIdx] || roles[0];
  const hourly = isHourlyWage(currentRole);

  const result = useMemo(
    () => calculateWage({
      agreement, roleIndex: roleIdx, yearsExperience: years, employmentRate,
      obHours: useOb ? obHours : { weekdayEvening: 0, night: 0, weekend: 0, holiday: 0 },
    }),
    [agreement, roleIdx, years, employmentRate, useOb, obHours]
  );

  // For hourly agreements, the calculator returns the raw number (e.g. 196)
  // We need to show it as hourly + estimated monthly
  const baseHourly = hourly ? parseKrNum(currentRole.minimum) : 0;
  const medianHourly = hourly ? parseKrNum(currentRole.median) : 0;
  const baseMonthly = hourly ? baseHourly * 173 : result.baseWage;
  const medianMonthly = hourly ? medianHourly * 173 : result.medianWage;
  const totalEstimate = hourly ? Math.round(medianHourly * 173 * employmentRate) : result.totalEstimate;

  const chartData = [
    { name: "Din grundlön", value: baseMonthly, fill: "#0F766E" },
    { name: "Medianlön", value: medianMonthly, fill: "#D97706" },
  ];

  function handleObChange(key: keyof typeof obHours, val: string) {
    setObHours((prev) => ({ ...prev, [key]: parseInt(val) || 0 }));
  }

  return (
    <>
      <section style={{ background: "linear-gradient(135deg, #0F766E 0%, #0A5F59 40%, #0D6B64 100%)" }} className="text-white pt-10 pb-10 sm:pb-16">
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

      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-r-lg border-l-[3px] border-l-primary bg-[#F0FDFA] p-5">
            <p className="text-sm text-text-primary leading-relaxed">
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
              <div className="rounded-xl border border-border bg-white p-5 sm:p-6 shadow-sm space-y-5">
                <h2 className="font-bold text-text-primary">Dina uppgifter</h2>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Kollektivavtal</label>
                  <select value={agreementIdx} onChange={(e) => { setAgreementIdx(Number(e.target.value)); setRoleIdx(0); }} className="w-full rounded-lg border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
                    {agreements.map((a, i) => (<option key={a.slug} value={i}>{a.shortName}</option>))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Yrkesgrupp</label>
                  <select value={roleIdx} onChange={(e) => setRoleIdx(Number(e.target.value))} className="w-full rounded-lg border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
                    {roles.map((r, i) => (<option key={r.role} value={i}>{r.role}</option>))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Erfarenhet: {years} år</label>
                  <input type="range" min={0} max={30} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-primary" />
                  <div className="flex justify-between text-xs text-text-secondary"><span>0 år</span><span>30 år</span></div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Arbetstid</label>
                  <select value={employmentRate} onChange={(e) => setEmploymentRate(Number(e.target.value))} className="w-full rounded-lg border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
                    <option value={1.0}>Heltid 100%</option>
                    <option value={0.75}>Deltid 75%</option>
                    <option value={0.5}>Deltid 50%</option>
                    <option value={0.25}>Deltid 25%</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
                    <input type="checkbox" checked={useOb} onChange={(e) => setUseOb(e.target.checked)} className="accent-primary w-4 h-4" />
                    <span className="text-sm font-medium text-text-primary">Jag jobbar obekväm arbetstid</span>
                  </label>
                </div>

                {useOb && (
                  <div className="space-y-3 pl-6 border-l-2 border-primary/20">
                    <p className="text-xs text-text-secondary">Uppskattade OB-timmar per månad</p>
                    {[
                      { key: "weekdayEvening" as const, label: "Vardagskväll" },
                      { key: "night" as const, label: "Natt" },
                      { key: "weekend" as const, label: "Helg" },
                      { key: "holiday" as const, label: "Storhelg" },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center gap-3">
                        <label className="text-sm text-text-primary w-28 shrink-0">{label}</label>
                        <input type="number" min={0} max={200} value={obHours[key]} onChange={(e) => handleObChange(key, e.target.value)} className="w-20 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-center" />
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
                <div className="rounded-xl border-2 border-primary bg-white p-5 sm:p-6 shadow-sm">
                  {hourly ? (
                    <>
                      <p className="text-sm text-text-secondary">Timlön enligt avtal</p>
                      <p className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-1">
                        {medianHourly.toLocaleString("sv-SE")} kr/tim
                      </p>
                      <p className="text-sm text-text-secondary mt-2">
                        ≈ {totalEstimate.toLocaleString("sv-SE")} kr/mån (173 tim × {medianHourly} kr)
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-text-secondary">Din uppskattade månadslön</p>
                      <p className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-1">
                        {totalEstimate.toLocaleString("sv-SE")} kr
                      </p>
                    </>
                  )}
                  <p className="text-xs text-text-secondary mt-1">
                    Baserat på {agreement.shortName} — {currentRole.role}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
                    <p className="text-xs text-text-secondary">Grundlön (lägst)</p>
                    <p className="text-lg font-bold text-text-primary">
                      {hourly ? `${baseHourly} kr/tim` : `${result.baseWage.toLocaleString("sv-SE")} kr`}
                    </p>
                    {hourly && <p className="text-xs text-text-secondary">≈ {baseMonthly.toLocaleString("sv-SE")} kr/mån</p>}
                  </div>
                  <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
                    <p className="text-xs text-text-secondary">Medianlön</p>
                    <p className="text-lg font-bold text-accent">
                      {hourly ? `${medianHourly} kr/tim` : `${result.medianWage.toLocaleString("sv-SE")} kr`}
                    </p>
                    {hourly && <p className="text-xs text-text-secondary">≈ {medianMonthly.toLocaleString("sv-SE")} kr/mån</p>}
                  </div>
                  {useOb && result.obTotal > 0 && (
                    <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
                      <p className="text-xs text-text-secondary">OB-tillägg</p>
                      <p className="text-lg font-bold text-success">+{result.obTotal.toLocaleString("sv-SE")} kr</p>
                    </div>
                  )}
                  <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
                    <p className="text-xs text-text-secondary">Pension (arbetsgivare)</p>
                    <p className="text-lg font-bold text-text-primary">{result.pensionContribution.toLocaleString("sv-SE")} kr</p>
                  </div>
                </div>

                {/* Chart — only show if we have meaningful monthly values */}
                {baseMonthly > 0 && (
                  <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
                    <p className="text-sm font-medium text-text-primary mb-3">Jämförelse (månadslön)</p>
                    <ResponsiveContainer width="100%" height={140}>
                      <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                        <XAxis type="number" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} domain={[0, "auto"]} />
                        <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11, fill: "#1A1A2E" }} axisLine={false} tickLine={false} />
                        <Tooltip formatter={(v) => [`${Number(v).toLocaleString("sv-SE")} kr/mån`, ""]} contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} />
                        <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                          {chartData.map((entry, i) => (<Cell key={i} fill={entry.fill} />))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => { const btn = document.querySelector("[aria-label='Öppna AI-chatt']") as HTMLButtonElement; btn?.click(); }}
                    className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white min-h-[44px] transition-all hover:-translate-y-px"
                    style={{ background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)" }}
                  >
                    <MessageCircle size={16} />
                    Fråga AI-experten
                  </button>
                  <a
                    href="https://allaadvokater.se"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-5 py-3 text-sm font-medium text-text-primary hover:border-primary hover:text-primary transition-colors min-h-[44px]"
                  >
                    <Scale size={16} />
                    Hitta arbetsrättsjurist
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div className="mt-8 rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 leading-relaxed">
            Beräkningarna är uppskattningar baserade på lägsta löner i kollektivavtalet och
            lönestatistik från SCB. Din faktiska lön beror på lokala förhandlingar, individuell
            lönesättning och arbetsgivarens policy. Kontakta ditt fackförbund för exakta uppgifter.
          </div>
        </div>
      </section>
    </>
  );
}
