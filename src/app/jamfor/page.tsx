"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, BarChart3 } from "lucide-react";
import { publicAgreements, publicComparisons } from "@/lib/public-agreements";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const topics: Array<{ href: string; title: string; desc: string; icon: typeof BarChart3 }> = [];

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
      <section className="bg-primary-dark text-white pt-10 pb-10 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-2xl sm:text-4xl font-extrabold">Jämför kollektivavtal</h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Se skillnaderna i OB-tillägg, löner, semester, pension och mer — alla avtal jämförda
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="border-l-[3px] border-l-accent bg-[#EFE7DA] p-6">
            <h2 className="text-xl text-text-primary">Jämförelserna källgranskas</h2>
            <p className="mt-2 text-text-secondary">
              Vi öppnar en jämförelse först när samma uppgift har kontrollerats i båda avtalen.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-r-lg border-l-[3px] border-l-primary bg-[#F0FDFA] p-4 sm:p-5">
            <p className="text-sm text-text-primary leading-relaxed">
              Svenska kollektivavtal har olika villkor. Här jämför vi OB-tillägg, minimilöner, semester, pension och mer för de avtalsområden där underlaget räcker.
            </p>
          </div>
        </div>
      </section>

      {/* Topic grid */}
      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-6" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>Jämför per ämne</h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-stretch">
            {topics.map((t, i) => (
              <AnimatedSection key={t.href} delay={i * 0.05}>
                <Link href={t.href} className="flex flex-col items-center justify-center rounded-sm border border-border bg-card p-4 hover:border-primary transition-colors text-center h-full min-h-[160px]">
                  <t.icon size={24} className="mx-auto text-primary mb-2" />
                  <p className="font-semibold text-text-primary text-sm">{t.title}</p>
                  <p className="text-xs text-text-secondary mt-1 line-clamp-2 min-h-[32px]">{t.desc}</p>
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
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-4" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>Jämför två avtal</h2>
            <div className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-1">
                <label className="text-xs text-text-secondary mb-1 block">Avtal 1</label>
                <select value={a1} onChange={(e) => setA1(e.target.value)} className="w-full rounded-[8px] border border-border px-3 py-2.5 text-sm outline-none focus:border-accent">
                  <option value="">Välj avtal...</option>
                  {publicAgreements.map((a) => <option key={a.slug} value={a.slug}>{a.shortName}</option>)}
                </select>
              </div>
              <span className="text-text-secondary text-sm font-medium pb-2">vs</span>
              <div className="flex-1">
                <label className="text-xs text-text-secondary mb-1 block">Avtal 2</label>
                <select value={a2} onChange={(e) => setA2(e.target.value)} className="w-full rounded-[8px] border border-border px-3 py-2.5 text-sm outline-none focus:border-accent">
                  <option value="">Välj avtal...</option>
                  {publicAgreements.map((a) => <option key={a.slug} value={a.slug}>{a.shortName}</option>)}
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
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-6" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>Populära jämförelser</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {publicComparisons.map((c, i) => {
              const a1 = publicAgreements.find((a) => a.slug === c.slug1);
              const a2 = publicAgreements.find((a) => a.slug === c.slug2);
              if (!a1 || !a2) return null;
              const sorted = [c.slug1, c.slug2].sort();
              return (
                <AnimatedSection key={`${c.slug1}-${c.slug2}`} delay={i * 0.03}>
                  <Link href={`/jamfor/${sorted[0]}-vs-${sorted[1]}`} className="block rounded-sm border border-border bg-card p-4 hover:border-primary transition-colors">
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
