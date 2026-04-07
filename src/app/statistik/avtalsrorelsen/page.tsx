"use client";

import { useState } from "react";
import { Check, Clock, Mail } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const timeline = [
  {
    period: "Mars 2025",
    title: "Märket satt — 6,4% på 2 år",
    desc: "IF Metall, Unionen och Teknikarbetsgivarna enades om 3,4% första året och 3,0% andra året.",
    done: true,
  },
  {
    period: "April–Oktober 2025",
    title: "Privata avtal klara",
    desc: "Teknikavtalet, Handelsavtalet, Byggavtalet, Hotell & Restaurang och fler avtal följer märket.",
    done: true,
  },
  {
    period: "November 2025 – Mars 2026",
    title: "Offentliga avtal klara",
    desc: "HÖK Kommunal, AB Kommunalt, statliga avtal och övriga offentliga avtal tecknas.",
    done: true,
  },
  {
    period: "2026",
    title: "Lugnt avtalsår",
    desc: "Bara 4 mindre avtal omförhandlas under 2026. De flesta avtal löper till mars 2027.",
    done: false,
  },
  {
    period: "Våren 2027",
    title: "Stor avtalsrörelse",
    desc: "Närmare 500 avtal omförhandlas för 3,4 miljoner anställda. Den största avtalsrörelsen på flera år.",
    done: false,
  },
];

const statusTable = [
  { name: "HÖK Kommunal", status: "Klart", validUntil: "Mars 2027", next: "Våren 2027", color: "bg-success" },
  { name: "AB Kommunalt", status: "Löpande", validUntil: "Löpande", next: "Löpande uppdateringar", color: "bg-blue-500" },
  { name: "Teknikavtalet", status: "Klart", validUntil: "Mars 2027", next: "Våren 2027", color: "bg-success" },
  { name: "Handelsavtalet", status: "Klart", validUntil: "Mars 2027", next: "Våren 2027", color: "bg-success" },
  { name: "Byggavtalet", status: "Klart", validUntil: "2027", next: "2027", color: "bg-success" },
];

const results = [
  { title: "Löneökning", desc: "6,4% på 2 år — det s.k. märket som sätter takten för hela arbetsmarknaden" },
  { title: "Arbetstidsförkortning", desc: "Fler avtal inkluderar arbetstidsförkortning, motsvarande ungefär en extra semesterdag per år" },
  { title: "Deltid = heltid vid övertid", desc: "Från 2026 får deltidsanställda inom handeln samma övertidsersättning som heltidsanställda" },
  { title: "Höjda pensionsavsättningar", desc: "Flera avtal har höjt arbetsgivarens pensionsavsättning, särskilt inom industrin" },
];

export default function Avtalsrorelsen() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  return (
    <>
      <section className="bg-primary text-white pt-[120px] pb-10 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl md:text-[56px]" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
              Avtalsrörelsen 2025–2027
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Status, resultat och nästa omförhandling
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[12px] bg-blue-50 border border-blue-200 p-4 sm:p-5">
            <p className="text-sm text-blue-900 leading-relaxed">
              Avtalsrörelsen 2025 resulterade i det så kallade märket på 6,4% löneökning över två
              år. De flesta avtal löper till mars 2027, då nästa stora avtalsrörelse väntar.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-8">Tidslinje</h2>
          </AnimatedSection>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-6">
              {timeline.map((item, i) => (
                <AnimatedSection key={item.period} delay={i * 0.1}>
                  <div className="relative pl-12 sm:pl-16">
                    <div
                      className={`absolute left-2.5 sm:left-4.5 top-1 w-3 h-3 rounded-full border-2 ${
                        item.done
                          ? "bg-success border-success"
                          : "bg-white border-border"
                      }`}
                    />
                    <div className="rounded-[12px] border border-border bg-white p-4 sm:p-5 shadow-sm">
                      <p className="text-xs font-medium text-accent">{item.period}</p>
                      <h3 className="font-semibold text-text-primary mt-1">{item.title}</h3>
                      <p className="text-sm text-text-secondary mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Status table */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-6">
              Status per avtal
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            {/* Desktop */}
            <div className="hidden md:block rounded-[12px] border border-border bg-white shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-background">
                    <th className="text-left p-4 font-semibold text-text-primary">Avtal</th>
                    <th className="text-left p-4 font-semibold text-text-primary">Status</th>
                    <th className="text-left p-4 font-semibold text-text-primary">Gäller t.o.m.</th>
                    <th className="text-left p-4 font-semibold text-text-primary">Nästa omförhandling</th>
                  </tr>
                </thead>
                <tbody>
                  {statusTable.map((row) => (
                    <tr key={row.name} className="border-b border-border last:border-0">
                      <td className="p-4 font-medium text-text-primary">{row.name}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium text-white px-2.5 py-1 rounded-full ${row.color}`}>
                          {row.status === "Klart" && <Check size={12} />}
                          {row.status === "Löpande" && <Clock size={12} />}
                          {row.status}
                        </span>
                      </td>
                      <td className="p-4 text-text-secondary">{row.validUntil}</td>
                      <td className="p-4 text-text-secondary">{row.next}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="md:hidden space-y-3">
              {statusTable.map((row) => (
                <div key={row.name} className="rounded-[12px] border border-border bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-text-primary text-sm">{row.name}</p>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium text-white px-2 py-0.5 rounded-full ${row.color}`}>
                      {row.status === "Klart" && <Check size={10} />}
                      {row.status === "Löpande" && <Clock size={10} />}
                      {row.status}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Gäller t.o.m. {row.validUntil} — nästa: {row.next}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Resultat */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-6">
              Vad blev resultatet?
            </h2>
          </AnimatedSection>
          <div className="space-y-3">
            {results.map((r, i) => (
              <AnimatedSection key={r.title} delay={i * 0.05}>
                <div className="rounded-[12px] border border-border bg-white p-4 sm:p-5 shadow-sm">
                  <h3 className="font-semibold text-text-primary text-sm">{r.title}</h3>
                  <p className="text-sm text-text-secondary mt-1 leading-relaxed">{r.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <p className="text-xs text-text-secondary mt-4">
            Källa: Medlingsinstitutet, fackförbundens pressmeddelanden, egen sammanställning
          </p>
        </div>
      </section>

      {/* 2027 framåtblick */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-[12px] border-2 border-accent bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-text-primary mb-3">
                Blick framåt — avtalsrörelsen 2027
              </h2>
              <p className="text-text-primary leading-relaxed">
                Under 2027 ska närmare 500 av arbetsmarknadens 617 avtal omförhandlas för 3,4
                miljoner anställda. Det blir den största avtalsrörelsen på flera år. Följ
                utvecklingen här.
              </p>

              <div className="mt-5">
                <p className="text-sm font-medium text-text-primary mb-3">
                  Vill du bli notifierad när avtalsrörelsen 2027 startar?
                </p>
                {emailSent ? (
                  <div className="flex items-center gap-2 text-sm text-success">
                    <Check size={16} />
                    <span>Tack, vi meddelar dig</span>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (email.trim()) setEmailSent(true);
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="din@email.se"
                      required
                      className="flex-1 rounded-[8px] border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    />
                    <button
                      type="submit"
                      className="rounded-[8px] bg-accent text-white px-4 py-3 text-sm font-medium hover:bg-accent/90 transition-colors min-h-[44px] flex items-center gap-1"
                    >
                      <Mail size={16} />
                      Bevaka
                    </button>
                  </form>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
