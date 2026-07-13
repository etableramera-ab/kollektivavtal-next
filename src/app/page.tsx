"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchAutocomplete from "@/components/SearchAutocomplete";
import {
  FileText,
  Users,
  ShieldCheck,
  ArrowRight,
  Check,
  X,
  Calculator,
  TrendingUp,
  BarChart3,
  Building2,
  Cpu,
  HardHat,
  ShoppingCart,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CountUp } from "@/components/ui/CountUp";
import SalaryChart from "@/components/SalaryChart";
import { publicOccupations } from "@/lib/public-occupations";

const quickLinks = [
  { label: "Handelsavtalet", slug: "handelsavtalet" },
  { label: "Teknikavtalet IF Metall", slug: "teknikavtalet-ifmetall" },
  { label: "Byggavtalet", slug: "byggavtalet" },
  { label: "HÖK Kommunal", slug: "hok-kommunal" },
  { label: "VVS-avtalet", slug: "vvs-montorsavtalet" },
  { label: "Installationsavtalet", slug: "installationsavtalet" },
];

const tools = [
  { title: "SCB-löner", desc: "Officiell lönestatistik", href: "/yrke", icon: Calculator },
  { title: "Rättsfall", desc: "Domar från Arbetsdomstolen", href: "/rattsfall", icon: BarChart3 },
  { title: "Avtalsperioder", desc: "Perioder från källorna", href: "/statistik/avtalsrorelsen", icon: TrendingUp },
];

const topAgreements = [
  { name: "HÖK Kommunal", desc: "Kommunalt anställda inom vård, omsorg och skola", icon: Building2, slug: "hok-kommunal", img: "/Images/sectors/vard-omsorg.jpg", alt: "Vårdpersonal i arbetsmiljö" },
  { name: "Teknikavtalet IF Metall", desc: "Industriarbetare inom teknikföretag", icon: Cpu, slug: "teknikavtalet-ifmetall", img: "/Images/sectors/industri.jpg", alt: "Industriarbetare vid maskin" },
  { name: "Handelsavtalet", desc: "Anställda inom detaljhandel och partihandel", icon: ShoppingCart, slug: "handelsavtalet", img: "/Images/sectors/handel.jpg", alt: "Butiksanställd i handelsmiljö" },
  { name: "Byggavtalet", desc: "Byggnadsarbetare och anläggningspersonal", icon: HardHat, slug: "byggavtalet", img: "/Images/sectors/bygg-anlaggning.jpg", alt: "Byggnadsarbetare på arbetsplats" },
];

const topOccupations = ["sjukskoterska", "elektriker", "larare-grundskola", "systemutvecklare"]
  .map((slug) => publicOccupations.find((occupation) => occupation.slug === slug))
  .filter((occupation): occupation is NonNullable<typeof occupation> => Boolean(occupation));

const comparisonRows = [
  { feature: "Tjänstepension", med: "Kan regleras i avtalet", utan: "Beror på arbetsgivarens erbjudande" },
  { feature: "Föräldralön", med: "Kan ge extra ersättning", utan: "Ingen avtalsreglerad utfyllnad" },
  { feature: "OB-tillägg", med: "Kan regleras i avtalet", utan: "Beror på anställningsvillkoren" },
  { feature: "Omställningsstöd", med: "Kan ingå genom avtalet", utan: "Beror på arbetsgivarens lösning" },
  { feature: "Uppsägningstid", med: "Kan komplettera lagens regler", utan: "Lag och anställningsavtal gäller" },
];

const serif = { fontFamily: "var(--font-serif)" };

export default function Home() {
  const [activeTab, setActiveTab] = useState<"avtal" | "yrken">("avtal");

  return (
    <div className="bg-[#F4F1EA] text-[#17201D]">
      {/* ─── HERO ─── */}
      <section className="bg-[#164B3F] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pt-12 sm:pb-20 md:pt-12 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <AnimatedSection>
              <p className="text-sm font-semibold text-[#D8B37C] mb-4">
                Svenska kollektivavtal — på klarspråk
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-[56px] leading-[1.08] text-white" style={serif}>
                Hitta och förstå ditt kollektivavtal
              </h1>
              <p className="mt-5 text-[17px] sm:text-lg text-white/85 max-w-[520px] leading-[1.65]">
                Börja med att hitta avtalet som gäller för dig. Därifrån kan du
                läsa om lön, OB-tillägg och andra villkor med tydliga källor.
              </p>
              <p className="mt-6 text-xs text-white/60">
                Över 4 miljoner anställda · 88% avtalstäckning · Källa: Medlingsinstitutet
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="bg-[#FBFAF7] rounded-md p-6 sm:p-8 border border-white/20 shadow-[0_12px_32px_rgba(0,0,0,0.16)]">
                <p className="font-semibold text-text-primary text-lg mb-1">Vilket avtal gäller för dig?</p>
                <p className="text-sm text-text-secondary mb-4">Sök på avtal eller svara på tre enkla frågor.</p>
                <div className="mb-4">
                  <SearchAutocomplete variant="hero" />
                </div>
                <div className="flex flex-wrap gap-2 mb-5 justify-center">
                  {quickLinks.map((q) => (
                    <Link key={q.slug} href={`/avtal/${q.slug}`} className="rounded-sm border border-[#D8D1C5] px-3 py-1.5 text-sm text-[#285E52] hover:bg-[#E8EEE9] transition-colors duration-150">
                      {q.label}
                    </Link>
                  ))}
                </div>
                <Link href="/hitta-avtal" className="flex w-full h-12 rounded-sm bg-[#B56A2D] text-white text-[16px] font-semibold items-center justify-center transition-colors duration-150 hover:bg-[#955524]">
                  Hitta mitt avtal
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="bg-[#E6E1D8] py-8 -mt-px">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-10 sm:gap-12">
            {[
              { icon: FileText, num: 30, text: "avtal med aktuellt källunderlag" },
              { icon: Users, num: 4, text: "miljoner+ anställda" },
              { icon: ShieldCheck, num: 88, text: "% avtalstäckning", suffix: "%" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2.5">
                <item.icon size={22} strokeWidth={1.5} className="text-primary" />
                <div>
                  <span className="text-[24px] text-[#285E52]" style={serif}>
                    <CountUp end={item.num} duration={1.5} suffix={item.suffix === "%" ? "%" : ""} />
                  </span>
                  <span className="text-[15px] font-medium text-[#374151] ml-1.5">
                    {!item.suffix ? item.text : item.text.replace("% ", "")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI-CHATT SEKTION ─── */}
      <section className="py-12 sm:py-14 bg-[#EEEAE1] border-y border-[#D8D1C5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <AnimatedSection>
              <p className="text-sm font-semibold text-[#285E52] mb-4">
                AI-vägledning
              </p>
              <h2 className="text-3xl sm:text-4xl text-[#17201D] leading-tight" style={serif}>
                Chatta om ditt kollektivavtal
              </h2>
              <p className="mt-4 text-[17px] text-[#46514D] max-w-[520px] leading-[1.65]">
                Ställ frågor om lön, OB-tillägg, semester, uppsägningstid, pension — och få svar direkt.
              </p>
              <div className="mt-6 space-y-3">
                {["Svar på sekunder — inte timmar", "30 avtal med aktuellt källunderlag", "Tydligt när svaret behöver kontrolleras"].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <span className="text-[#285E52] text-lg">✓</span>
                    <span className="text-[15px] font-medium text-text-primary">{text}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="bg-[#FBFAF7] rounded-md border border-[#D8D1C5] p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-sm bg-[#285E52] flex items-center justify-center shrink-0 mt-0.5"><span className="text-white text-[10px] font-bold">AI</span></div>
                    <div className="bg-[#E8EEE9] rounded-sm px-4 py-2.5 text-[15px] text-[#17201D]">Hej! Jag hjälper dig förstå svenska kollektivavtal och hitta rätt avtal. Vad vill du veta?</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-sm bg-[#285E52] flex items-center justify-center shrink-0 mt-0.5"><span className="text-white text-[10px] font-bold">AI</span></div>
                    <div className="bg-[#E8EEE9] rounded-sm px-4 py-2.5 text-[15px] text-[#17201D]">För exakta avtalsvillkor väljer du ett avtal med källunderlag. Jag säger till när information behöver kontrolleras.</div>
                  </div>
                </div>
                <button
                  onClick={() => { const btn = document.querySelector("[aria-label='Öppna AI-chatt']") as HTMLButtonElement; btn?.click(); }}
                  className="block w-full py-3 rounded-sm bg-[#285E52] text-white text-[16px] font-semibold text-center transition-colors duration-150 hover:bg-[#164B3F]"
                >
                  Testa själv — ställ en fråga
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── VAD VILL DU GÖRA? ─── */}
      <section className="py-14 sm:py-16 bg-[#F4F1EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-8 mb-8">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl md:text-[48px] text-text-primary" style={serif}>Fler verktyg</h2>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tools.map((tool, i) => (
              <AnimatedSection key={tool.href} delay={i * 0.08}>
                <Link href={tool.href} className="block group">
                  <div className="rounded-sm border border-[#D8D1C5] bg-[#FBFAF7] p-5 min-h-[80px] flex items-start gap-4 border-l-[3px] border-l-[#285E52] hover:bg-white transition-colors duration-150">
                    <div className="shrink-0 w-11 h-11 rounded-sm bg-[#E8EEE9] flex items-center justify-center">
                      <tool.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary text-[16px]">{tool.title}</p>
                      <p className="text-[13px] text-text-secondary mt-0.5">{tool.desc}</p>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>

      {/* ─── UTFORSKA AVTAL OCH YRKEN ─── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-8 mb-8">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl md:text-[48px] text-text-primary" style={serif}>Utforska avtal och yrken</h2>
            </AnimatedSection>
          </div>

          <div className="flex gap-8 mb-8 border-b border-border">
            <button onClick={() => setActiveTab("avtal")} className={`pb-2 text-[15px] transition-colors ${activeTab === "avtal" ? "font-semibold text-primary border-b-[3px] border-primary" : "text-text-secondary hover:text-text-primary"}`}>
              Populära avtal
            </button>
            <button onClick={() => setActiveTab("yrken")} className={`pb-2 text-[15px] transition-colors ${activeTab === "yrken" ? "font-semibold text-primary border-b-[3px] border-primary" : "text-text-secondary hover:text-text-primary"}`}>
              Populära yrken
            </button>
          </div>

          {activeTab === "avtal" && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {topAgreements.map((a, i) => (
                  <AnimatedSection key={a.slug} delay={i * 0.08}>
                    <Link href={`/avtal/${a.slug}`} className="block h-full group">
                      <div className="rounded-sm border border-[#D8D1C5] bg-[#FBFAF7] h-full hover:border-[#285E52] transition-colors duration-150 overflow-hidden">
                        <div className="relative h-[140px] sm:h-[140px]">
                          <Image src={a.img} alt={a.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                        </div>
                        <div className="p-5">
                        <h3 className="text-[22px] text-text-primary group-hover:text-primary transition-colors duration-150" style={serif}>{a.name}</h3>
                        <p className="text-sm text-text-secondary mt-1 leading-snug">{a.desc}</p>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-3">Läs mer <ArrowRight size={14} /></span>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
              <AnimatedSection delay={0.35}>
                <Link href="/avtal" className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-6 hover:text-primary-dark hover:underline transition-colors duration-150 min-h-[44px]">
                  Se avtalsguiden <ArrowRight size={14} />
                </Link>
              </AnimatedSection>
            </div>
          )}

          {activeTab === "yrken" && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {topOccupations.map((occ, i) => (
                  <AnimatedSection key={occ.slug} delay={i * 0.08}>
                    <Link href={`/yrke/${occ.slug}`} className="block group">
                      <div className="rounded-sm border border-[#D8D1C5] bg-[#FBFAF7] p-5 text-center hover:border-[#285E52] transition-colors duration-150">
                        <p className="text-[22px] text-text-primary group-hover:text-primary transition-colors duration-150" style={serif}>{occ.title}</p>
                        <p className="text-2xl font-normal text-accent mt-2" style={serif}>{occ.salary.median.toLocaleString("sv-SE")} kr</p>
                        <p className="text-xs text-text-secondary mt-1">medianlön</p>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
              <AnimatedSection delay={0.35}>
                <Link href="/yrke" className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-6 hover:text-primary-dark hover:underline transition-colors duration-150 min-h-[44px]">
                  Se alla källmatchade yrken <ArrowRight size={14} />
                </Link>
              </AnimatedSection>
            </div>
          )}
        </div>
      </section>

      {/* ─── LÖNESTATISTIK ─── */}
      <section className="py-14 sm:py-16 bg-surface-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-8 mb-8">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl md:text-[48px] text-text-primary" style={serif}>Lönestatistik per bransch</h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.1}>
            <div className="rounded-sm border border-[#D8D1C5] bg-[#FBFAF7] p-6 sm:p-8">
              <SalaryChart />
            </div>
            <p className="text-[13px] text-[#6B7280] mt-3">Källa: SCB, egen bearbetning</p>
            <Link href="/statistik/loner" className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-2 hover:text-primary-dark hover:underline transition-colors duration-150 min-h-[44px]">
              Se fullständig lönestatistik <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── VAD FÖRLORAR DU? ─── */}
      <section className="py-16 sm:py-20" style={{ backgroundImage: "linear-gradient(rgba(22,75,63,0.91), rgba(22,75,63,0.91)), url('/Images/misc/signing-contract.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl md:text-[48px] text-white text-center" style={serif}>
              Vad kan kollektivavtalet reglera?
            </h2>
            <p className="text-white/80 mt-3 text-center max-w-2xl mx-auto">
              Exakta villkor skiljer sig mellan avtal och arbetsplatser.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="hidden md:block max-w-[800px] mx-auto mt-10 rounded-sm bg-[#FBFAF7] p-2">
              <table className="w-full text-[15px]">
                <thead>
                  <tr className="border-b border-surface-dark">
                    <th className="text-left p-4 font-semibold text-text-primary text-sm">Förmån</th>
                    <th className="text-left p-4 font-semibold text-primary text-sm">Med kollektivavtal</th>
                    <th className="text-left p-4 font-semibold text-red-600 text-sm">Utan kollektivavtal</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-b border-surface-dark last:border-0">
                      <td className="p-4 font-medium text-text-primary">{row.feature}</td>
                      <td className="p-4 text-text-primary">
                        <span className="inline-flex items-center gap-1.5">
                          <Check size={14} className="text-primary shrink-0" />
                          {row.med}
                        </span>
                      </td>
                      <td className="p-4 text-text-secondary">
                        <span className="inline-flex items-center gap-1.5">
                          <X size={14} className="text-red-500 shrink-0" />
                          {row.utan}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>

          <div className="md:hidden space-y-3 mt-10">
            {comparisonRows.map((row, i) => (
              <AnimatedSection key={row.feature} delay={i * 0.05}>
                <div className="rounded-lg bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                  <p className="font-semibold text-text-primary text-sm mb-3">{row.feature}</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-primary">Med kollektivavtal</p>
                        <p className="text-sm text-text-primary">{row.med}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <X size={14} className="text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-red-500">Utan kollektivavtal</p>
                        <p className="text-sm text-text-secondary">{row.utan}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.2}>
            <div className="max-w-[800px] mx-auto mt-10 rounded-[10px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <div>
                <p className="text-[18px] font-semibold text-white">Saknar du kollektivavtal?</p>
                <p className="text-[15px] text-white/80 mt-1">Se vilka försäkringar som kompenserar för tjänstepension, föräldralön och inkomstbortfall.</p>
              </div>
              <a
                href="https://allaforsakringar.com?utm_source=kollektivavtal&utm_medium=native&utm_campaign=forlorar-sektion"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-7 py-3 rounded-lg text-white font-semibold text-[15px] transition-all hover:-translate-y-px"
                style={{ background: "#B56A2D" }}
              >
                Jämför försäkringar →
              </a>
            </div>
            <p className="text-center mt-2 text-[11px] text-white/40">Annons</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-10 bg-surface-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-8">
          <Link href="/rattsfall" className="inline-flex items-center justify-center gap-1 text-sm font-medium text-primary min-h-[44px] hover:underline">
            Utforska arbetsrättsdomar <ArrowRight size={14} />
          </Link>
          <Link href="/blogg" className="inline-flex items-center justify-center gap-1 text-sm font-medium text-primary min-h-[44px] hover:underline">
            Läs guider och nyheter <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
