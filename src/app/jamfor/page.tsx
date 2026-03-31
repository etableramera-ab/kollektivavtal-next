"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, BarChart3, Banknote, CalendarDays, Baby, Clock, PiggyBank, Timer, Briefcase } from "lucide-react";
import { agreements } from "@/data/agreements";
import { vsComparisons } from "@/data/comparisons";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const topics = [
  { href: "/jamfor/ob-tillagg", title: "OB-tillägg", desc: "Kväll, natt, helg och storhelg per avtal", icon: BarChart3 },
  { href: "/jamfor/minimiioner", title: "Minimilöner", desc: "Lägsta löner per bransch och avtal", icon: Banknote },
  { href: "/jamfor/semester", title: "Semester", desc: "Antal dagar och extra vid ålder", icon: CalendarDays },
  { href: "/jamfor/foraldralon", title: "Föräldralön", desc: "Löneutfyllnad per avtal", icon: Baby },
  { href: "/jamfor/uppsagningstid", title: "Uppsägningstid", desc: "Per avtal och anställningstid", icon: Clock },
  { href: "/jamfor/pension", title: "Pension", desc: "System och avsättning per avtal", icon: PiggyBank },
  { href: "/jamfor/overtid", title: "Övertid", desc: "Ersättningsnivåer per avtal", icon: Timer },
  { href: "/jamfor/arbetstid", title: "Arbetstid", desc: "Veckoarbetstid och förkortning", icon: Briefcase },
];

export default function JamforOverview() {
  const router = useRouter();
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");

  function handleCompare() {
    if (a1 && a2 && a1 !== a2) {
      const sorted = [a1, a2].sort();
      router.push(`/jamfor/${sorted[0]}-vs-${sorted[1]}`);
    }
  }

  return (
    <>
      <section className="bg-primary text-white py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-2xl sm:text-4xl font-extrabold">Jämför kollektivavtal</h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Se skillnaderna i OB-tillägg, löner, semester, pension och mer — alla avtal jämförda
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[12px] bg-blue-50 border border-blue-200 p-4 sm:p-5">
            <p className="text-sm text-blue-900 leading-relaxed">
              Sverige har 617 kollektivavtal med olika villkor. Här jämför vi OB-tillägg, minimilöner, semester, pension och mer för alla 25 avtal vi sammanfattat.
            </p>
          </div>
        </div>
      </section>

      {/* Topic grid */}
      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-6">Jämför per ämne</h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {topics.map((t, i) => (
              <AnimatedSection key={t.href} delay={i * 0.05}>
                <Link href={t.href} className="block rounded-[12px] border border-border bg-white p-4 shadow-sm hover:shadow-md transition-shadow text-center">
                  <t.icon size={24} className="mx-auto text-accent mb-2" />
                  <p className="font-semibold text-text-primary text-sm">{t.title}</p>
                  <p className="text-xs text-text-secondary mt-1">{t.desc}</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Custom compare */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-4">Jämför två avtal</h2>
            <div className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-1">
                <label className="text-xs text-text-secondary mb-1 block">Avtal 1</label>
                <select value={a1} onChange={(e) => setA1(e.target.value)} className="w-full rounded-[8px] border border-border px-3 py-2.5 text-sm outline-none focus:border-accent">
                  <option value="">Välj avtal...</option>
                  {agreements.map((a) => <option key={a.slug} value={a.slug}>{a.shortName}</option>)}
                </select>
              </div>
              <span className="text-text-secondary text-sm font-medium pb-2">vs</span>
              <div className="flex-1">
                <label className="text-xs text-text-secondary mb-1 block">Avtal 2</label>
                <select value={a2} onChange={(e) => setA2(e.target.value)} className="w-full rounded-[8px] border border-border px-3 py-2.5 text-sm outline-none focus:border-accent">
                  <option value="">Välj avtal...</option>
                  {agreements.map((a) => <option key={a.slug} value={a.slug}>{a.shortName}</option>)}
                </select>
              </div>
              <button onClick={handleCompare} disabled={!a1 || !a2 || a1 === a2} className="rounded-[8px] bg-accent text-white px-6 py-2.5 text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 min-h-[44px]">
                Jämför
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Popular comparisons */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-6">Populära jämförelser</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {vsComparisons.map((c, i) => {
              const a1 = agreements.find((a) => a.slug === c.slug1);
              const a2 = agreements.find((a) => a.slug === c.slug2);
              if (!a1 || !a2) return null;
              const sorted = [c.slug1, c.slug2].sort();
              return (
                <AnimatedSection key={`${c.slug1}-${c.slug2}`} delay={i * 0.03}>
                  <Link href={`/jamfor/${sorted[0]}-vs-${sorted[1]}`} className="block rounded-[12px] border border-border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                    <p className="font-semibold text-text-primary text-sm">
                      {a1.shortName} vs {a2.shortName}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-accent mt-1">
                      Jämför <ArrowRight size={12} />
                    </span>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
