"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, ShieldCheck } from "lucide-react";
import { agreements } from "@/data/agreements";
import { isVerifiedAgreement } from "@/lib/verified-agreements";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

type SectorFilter = "alla" | "privat" | "kommun_region" | "stat";

const filters: { value: SectorFilter; label: string }[] = [
  { value: "alla", label: "Alla" },
  { value: "privat", label: "Privat sektor" },
  { value: "kommun_region", label: "Kommun/region" },
  { value: "stat", label: "Stat" },
];

export default function AvtalOverview() {
  const [sector, setSector] = useState<SectorFilter>("alla");

  const filtered =
    sector === "alla"
      ? agreements
      : agreements.filter((a) => a.sector === sector);

  return (
    <>
      <section className="bg-primary text-white py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-2xl sm:text-4xl" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>
              Kollektivavtal i Sverige
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Hitta och förstå ditt kollektivavtal. Vi sammanfattar villkor, löner, OB-tillägg och
              pension på klarspråk.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-[12px] bg-blue-50 border border-blue-200 p-5">
              <p className="text-sm sm:text-base text-blue-900 leading-relaxed">
                Sverige har omkring 617 kollektivavtal som täcker 92% av alla anställda. Här
                sammanfattar vi de största avtalen på klarspråk — med lönetabeller, OB-tillägg,
                semesterregler och AI-expert som svarar på dina frågor.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-wrap gap-2 mb-8">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setSector(f.value)}
                  className={`rounded-[8px] px-4 py-2.5 text-sm font-medium transition-colors min-h-[44px] ${
                    sector === f.value
                      ? "bg-primary text-white"
                      : "bg-white border border-border text-text-secondary hover:text-primary hover:border-primary"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((a, i) => (
              <AnimatedSection key={a.slug} delay={i * 0.05}>
                <Link href={`/avtal/${a.slug}`} className="block h-full">
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
                    transition={{ duration: 0.2 }}
                    className="group rounded-[12px] border border-border bg-white p-5 shadow-sm h-full flex flex-col"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                          {a.shortName}
                        </h2>
                        {isVerifiedAgreement(a.slug) && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                            <ShieldCheck className="w-3 h-3" />
                            Verifierad
                          </span>
                        )}
                      </div>
                      <span className="shrink-0 rounded-[6px] bg-background text-text-secondary text-xs font-medium px-2 py-1">
                        {a.sectorLabel}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mt-2 leading-snug flex-1">
                      {a.summary.slice(0, 120)}...
                    </p>
                    <div className="flex items-center gap-1 text-xs text-text-secondary mt-3">
                      <Users size={14} />
                      <span>{a.employeeCount.toLocaleString("sv-SE")} anställda</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-3">
                      Läs mer <ArrowRight size={14} />
                    </span>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <p className="text-sm text-text-secondary mt-10 text-center">
              {agreements.length} av 617 avtal sammanfattade. Fler läggs till löpande.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
