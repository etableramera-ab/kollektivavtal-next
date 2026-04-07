"use client";

import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface CompRow {
  label: string;
  v1: string;
  v2: string;
}

interface Props {
  name1: string;
  name2: string;
  slug1: string;
  slug2: string;
  rows: CompRow[];
}

export default function VsPageClient({ name1, name2, slug1, slug2, rows }: Props) {
  return (
    <>
      <section className="bg-primary text-white py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-6 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">Hem</Link>
              <ChevronRight size={14} />
              <Link href="/jamfor" className="hover:text-white transition-colors">Jämför</Link>
              <ChevronRight size={14} />
              <span className="text-white/90">{name1} vs {name2}</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl md:text-[56px]" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>
              {name1} vs {name2}
            </h1>
            <p className="mt-2 text-base text-white/80">
              Jämför löner, OB-tillägg, semester, pension och villkor
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            {/* Desktop table */}
            <div className="hidden md:block rounded-[12px] border border-border bg-white shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-background">
                    <th className="text-left p-4 font-semibold text-text-primary w-1/4">Villkor</th>
                    <th className="text-left p-4 font-semibold text-accent w-[37.5%]">
                      <Link href={`/avtal/${slug1}`} className="hover:underline">{name1}</Link>
                    </th>
                    <th className="text-left p-4 font-semibold text-primary w-[37.5%]">
                      <Link href={`/avtal/${slug2}`} className="hover:underline">{name2}</Link>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} className="border-b border-border last:border-0">
                      <td className="p-4 font-medium text-text-primary">{r.label}</td>
                      <td className="p-4 text-text-primary">{r.v1}</td>
                      <td className="p-4 text-text-primary">{r.v2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-2">
              {rows.map((r) => (
                <div key={r.label} className="rounded-[12px] border border-border bg-white p-3 shadow-sm">
                  <p className="text-xs font-medium text-text-secondary mb-2">{r.label}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[10px] text-accent font-medium">{name1}</p>
                      <p className="text-sm text-text-primary">{r.v1}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-primary font-medium">{name2}</p>
                      <p className="text-sm text-text-primary">{r.v2}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link href={`/avtal/${slug1}`} className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-accent text-white px-5 py-3 text-sm font-medium hover:bg-accent/90 transition-colors min-h-[44px]">
              Läs om {name1} <ArrowRight size={14} />
            </Link>
            <Link href={`/avtal/${slug2}`} className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-border bg-white px-5 py-3 text-sm font-medium text-text-primary hover:border-accent hover:text-accent transition-colors min-h-[44px]">
              Läs om {name2} <ArrowRight size={14} />
            </Link>
          </div>

          <p className="text-xs text-text-secondary mt-6">Källa: Respektive kollektivavtal, SCB. Uppgifterna är ungefärliga.</p>

          <div className="mt-8 rounded-[12px] bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 leading-relaxed">
            Jämförelsen är vägledande. Kontakta ditt fackförbund för exakta villkor i ditt avtal.
          </div>
        </div>
      </section>
    </>
  );
}
