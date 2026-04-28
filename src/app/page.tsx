"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchAutocomplete from "@/components/SearchAutocomplete";
import {
  Search,
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
  MessageCircle,
  Shield,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CountUp } from "@/components/ui/CountUp";
import SalaryChart from "@/components/SalaryChart";
import { blogPosts } from "@/data/blog-posts";
import { courtCases as allCourtCases } from "@/data/court-cases";

const latestCases = allCourtCases.slice(0, 3);

const quickLinks = [
  { label: "Handelsavtalet", slug: "handelsavtalet" },
  { label: "Teknikavtalet", slug: "teknikavtalet" },
  { label: "Byggavtalet", slug: "byggavtalet" },
  { label: "HÖK Kommunal", slug: "hok-kommunal" },
  { label: "IT-avtalet", slug: "it-avtalet" },
  { label: "Transportavtalet", slug: "transportavtalet" },
];

const tools = [
  { title: "Hitta ditt avtal", desc: "Svara på 3 frågor", href: "/hitta-avtal", icon: Search },
  { title: "Lönekalkylator", desc: "Se vad du ska tjäna", href: "/lonekalkylator", icon: Calculator },
  { title: "Jämför villkor", desc: "OB, semester, pension", href: "/jamfor", icon: BarChart3 },
  { title: "Avtalsrörelsen", desc: "Följ 2025–2027", href: "/statistik/avtalsrorelsen", icon: TrendingUp },
];

const topAgreements = [
  { name: "HÖK Kommunal", desc: "Kommunalt anställda inom vård, omsorg och skola", employees: "~1 100 000", icon: Building2, slug: "hok-kommunal", img: "/Images/sectors/vard-omsorg.jpg", alt: "Vårdpersonal i arbetsmiljö" },
  { name: "Teknikavtalet", desc: "Ingenjörer, tekniker och montörer i industrin", employees: "~300 000", icon: Cpu, slug: "teknikavtalet", img: "/Images/sectors/industri.jpg", alt: "Industriarbetare vid maskin" },
  { name: "Handelsavtalet", desc: "Anställda inom detaljhandel och partihandel", employees: "~250 000", icon: ShoppingCart, slug: "handelsavtalet", img: "/Images/sectors/handel.jpg", alt: "Butiksanställd i handelsmiljö" },
  { name: "Byggavtalet", desc: "Byggnadsarbetare och anläggningspersonal", employees: "~150 000", icon: HardHat, slug: "byggavtalet", img: "/Images/sectors/bygg-anlaggning.jpg", alt: "Byggnadsarbetare på arbetsplats" },
];

const topOccupations = [
  { title: "Undersköterska", median: "31 000", slug: "underskoterska" },
  { title: "Elektriker", median: "35 000", slug: "elektriker" },
  { title: "Lärare", median: "37 000", slug: "larare-grundskola" },
  { title: "Systemutvecklare", median: "48 000", slug: "systemutvecklare" },
];

const comparisonRows = [
  { feature: "Tjänstepension", med: "4,5% av lön", utan: "0 kr (om arbetsgivaren inte erbjuder)" },
  { feature: "Föräldralön", med: "Upp till 90% löneutfyllnad", utan: "Bara Försäkringskassans ersättning" },
  { feature: "OB-tillägg", med: "43–172 kr/tim", utan: "Inget OB garanterat" },
  { feature: "Inkomstförsäkring", med: "Ingår via facket", utan: "Måste tecknas privat" },
  { feature: "Uppsägningstid", med: "Upp till 6 mån", utan: "1 mån enligt LAS" },
];

const serif = { fontFamily: "var(--font-dm-serif, var(--font-serif))" };

export default function Home() {
  const [activeTab, setActiveTab] = useState<"avtal" | "yrken">("avtal");

  return (
    <>
      {/* ─── HERO ─── */}
      <section style={{ background: "linear-gradient(135deg, #0F766E 0%, #0A5F59 40%, #0D6B64 100%)" }} className="text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pt-12 sm:pb-20 md:pt-12 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <AnimatedSection>
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-accent mb-4">
                Sveriges 515 kollektivavtal — på klarspråk
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-[56px] leading-[1.1] text-white" style={serif}>
                Förstå ditt kollektivavtal
              </h1>
              <p className="mt-5 text-base sm:text-lg text-white/80 max-w-[480px] leading-relaxed">
                Sök bland alla 515 avtal. Jämför löner, OB-tillägg och villkor.
                Chatta med en AI-expert som kan just ditt avtal.
              </p>
              <p className="mt-6 text-xs text-white/60">
                3,4 miljoner anställda · 92% avtalstäckning · Källa: Medlingsinstitutet
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25),0_8px_20px_rgba(0,0,0,0.15)]">
                <p className="font-semibold text-text-primary text-lg mb-4">Hitta ditt avtal</p>
                <div className="mb-4">
                  <SearchAutocomplete variant="hero" />
                </div>
                <div className="flex flex-wrap gap-2 mb-5 justify-center">
                  {quickLinks.map((q) => (
                    <Link key={q.slug} href={`/avtal/${q.slug}`} className="rounded-full border border-border px-4 py-1.5 text-xs text-primary hover:bg-primary hover:text-white transition-all duration-200">
                      {q.label}
                    </Link>
                  ))}
                </div>
                <Link href="/hitta-avtal" className="block w-full h-12 rounded-lg text-white text-sm font-semibold uppercase tracking-widest flex items-center justify-center transition-all duration-200 hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(217,119,6,0.3)]" style={{ background: "linear-gradient(135deg, #D97706 0%, #B45309 100%)" }}>
                  Sök
                </Link>
                <button
                  onClick={() => { const btn = document.querySelector("[aria-label='Öppna AI-chatt']") as HTMLButtonElement; btn?.click(); }}
                  className="block w-full text-center text-sm font-medium text-[#7C3AED] mt-3 hover:underline"
                >
                  💬 Eller fråga AI-experten direkt →
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="bg-[#F0EEED] py-8 -mt-px">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-10 sm:gap-12">
            {[
              { icon: FileText, num: 515, text: "avtal sammanfattade" },
              { icon: Users, num: 3.4, text: "miljoner anställda", decimal: true },
              { icon: ShieldCheck, num: 92, text: "% avtalstäckning", suffix: "%" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2.5">
                <item.icon size={22} strokeWidth={1.5} className="text-primary" />
                <div>
                  <span className="text-[24px] text-primary" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
                    {item.decimal ? (
                      <>{item.num.toLocaleString("sv-SE")}</>
                    ) : (
                      <CountUp end={item.num} duration={1.5} suffix={item.suffix === "%" ? "%" : ""} />
                    )}
                  </span>
                  <span className="text-[15px] font-medium text-[#374151] ml-1.5">
                    {!item.suffix ? item.text : item.text.replace("% ", "")}
                  </span>
                </div>
              </div>
            ))}
            <button
              onClick={() => { const btn = document.querySelector("[aria-label='Öppna AI-chatt']") as HTMLButtonElement; btn?.click(); }}
              className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <MessageCircle size={22} strokeWidth={1.5} className="text-[#7C3AED]" />
              <span className="text-[15px] font-medium text-[#7C3AED]">AI-expert på alla avtal</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── AI-CHATT SEKTION ─── */}
      <section className="py-16 sm:py-20" style={{ background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 50%, #5B21B6 100%)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <AnimatedSection>
              <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-white/70 mb-4">
                AI-expert på 515 avtal
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-[44px] text-white leading-tight" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
                Chatta med en expert som läst hela ditt avtal
              </h2>
              <p className="mt-4 text-[17px] text-white/80 max-w-[480px] leading-relaxed">
                Ställ frågor om lön, OB-tillägg, semester, uppsägningstid, pension — och få svar direkt.
              </p>
              <div className="mt-6 space-y-3">
                {["Svar på sekunder — inte timmar", "Tränad på alla 515 avtal och 2 009 domar", "Helt gratis, alltid"].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <span className="text-accent text-lg">✓</span>
                    <span className="text-[16px] font-medium text-white">{text}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="bg-white rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2),0_8px_20px_rgba(0,0,0,0.12)]">
                <div className="space-y-3 mb-4">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center shrink-0 mt-0.5"><span className="text-white text-[10px] font-bold">AI</span></div>
                    <div className="bg-[#F5F3FF] rounded-xl px-4 py-2.5 text-sm text-text-primary">Hej! Jag kan svara på frågor om alla 515 kollektivavtal. Vad vill du veta?</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center shrink-0 mt-0.5"><span className="text-white text-[10px] font-bold">AI</span></div>
                    <div className="bg-[#F5F3FF] rounded-xl px-4 py-2.5 text-sm text-text-primary">Fråga om löner, OB-tillägg, semester, pension — jag har läst alla 515 avtal och kan hjälpa dig.</div>
                  </div>
                </div>
                <button
                  onClick={() => { const btn = document.querySelector("[aria-label='Öppna AI-chatt']") as HTMLButtonElement; btn?.click(); }}
                  className="block w-full py-3 rounded-lg text-white text-[16px] font-semibold text-center transition-all duration-200 hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(124,58,237,0.3)]"
                  style={{ background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)" }}
                >
                  Testa själv — ställ en fråga
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── VAD VILL DU GÖRA? ─── */}
      <section className="py-14 sm:py-16" style={{ background: "linear-gradient(180deg, #F0EEED 0%, #F8F7F4 100%)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-8 mb-8">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl md:text-[48px] text-text-primary" style={serif}>Vad vill du göra?</h2>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool, i) => (
              <AnimatedSection key={tool.href} delay={i * 0.08}>
                <Link href={tool.href} className="block group">
                  <div className="rounded-lg border border-border bg-white p-5 min-h-[80px] flex items-start gap-4 border-l-4 border-l-primary hover:border-l-accent hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)] transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                    <div className="shrink-0 w-11 h-11 rounded-full bg-[#F0FDFA] flex items-center justify-center">
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

          <AnimatedSection delay={0.3}>
            <a
              href="https://allaforsakringar.com?utm_source=kollektivavtal&utm_medium=verktyg&utm_campaign=startsida"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-lg border border-[#FDE68A] bg-[#FEF3C7] p-4 flex items-center gap-4 hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <Shield size={20} className="text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-text-primary text-[15px]">Jämför försäkringar</p>
                <p className="text-[13px] text-text-secondary">Hitta rätt skydd — oberoende jämförelser</p>
              </div>
              <span className="text-[11px] text-[#9CA3AF] shrink-0">Annons</span>
            </a>
          </AnimatedSection>
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
                      <div className="rounded-lg border border-border bg-white h-full hover:border-primary hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)] transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden">
                        <div className="relative h-[140px] sm:h-[140px]">
                          <Image src={a.img} alt={a.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                        </div>
                        <div className="p-5">
                        <h3 className="text-[22px] text-text-primary group-hover:text-primary transition-colors duration-150" style={serif}>{a.name}</h3>
                        <p className="text-sm text-text-secondary mt-1 leading-snug">{a.desc}</p>
                        <p className="text-xs text-text-secondary mt-2">{a.employees} anställda</p>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-3">Läs mer <ArrowRight size={14} /></span>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
              <AnimatedSection delay={0.35}>
                <Link href="/avtal" className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-6 hover:text-primary-dark hover:underline transition-colors duration-150 min-h-[44px]">
                  Se alla 515 avtal <ArrowRight size={14} />
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
                      <div className="rounded-lg border border-border bg-white p-5 text-center hover:border-primary hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)] transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                        <p className="text-[22px] text-text-primary group-hover:text-primary transition-colors duration-150" style={serif}>{occ.title}</p>
                        <p className="text-2xl font-normal text-accent mt-2" style={serif}>{occ.median} kr</p>
                        <p className="text-xs text-text-secondary mt-1">medianlön</p>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
              <AnimatedSection delay={0.35}>
                <Link href="/yrke" className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-6 hover:text-primary-dark hover:underline transition-colors duration-150 min-h-[44px]">
                  Se alla 50 yrken <ArrowRight size={14} />
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
            <div className="rounded-xl border border-border bg-white p-6 sm:p-8">
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
      <section className="py-16 sm:py-20" style={{ backgroundImage: "linear-gradient(135deg, rgba(13,94,88,0.88) 0%, rgba(15,118,110,0.85) 50%, rgba(20,184,166,0.88) 100%), url('/Images/misc/signing-contract.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl md:text-[48px] text-white text-center" style={serif}>
              Vad förlorar du utan kollektivavtal?
            </h2>
            <p className="text-white/80 mt-3 text-center max-w-2xl mx-auto">
              Utan kollektivavtal saknar du tjänstepension, föräldralön, OB-tillägg och mycket mer.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="hidden md:block max-w-[800px] mx-auto mt-10 rounded-xl bg-white p-2 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
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
                style={{ background: "#D97706" }}
              >
                Jämför försäkringar →
              </a>
            </div>
            <p className="text-center mt-2 text-[11px] text-white/40">Annons</p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── SENASTE RÄTTSFALL ─── */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-8 mb-8">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl md:text-[48px] text-text-primary" style={serif}>Senaste arbetsrättsdomar</h2>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {latestCases.map((c, i) => (
              <AnimatedSection key={c.id} delay={i * 0.1}>
                <Link href={`/rattsfall/${c.id}`} className="block h-full group">
                  <div className="rounded-[10px] border border-border bg-white p-6 h-full hover:border-primary hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)] transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                    <p className="text-[13px] text-primary font-medium">{c.date}</p>
                    <h3 className="text-text-primary mt-1 leading-snug text-[22px]" style={serif}>{c.caseNumber} — {c.title}</h3>
                    <p className="text-sm text-text-secondary mt-2 line-clamp-2">{c.summary}</p>
                    <span className="inline-block mt-3 text-xs font-medium bg-[#F0FDFA] text-primary px-3 py-1 rounded-full border border-primary/20">
                      {c.topic}
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <Link href="/rattsfall" className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-6 hover:text-primary-dark hover:underline transition-colors duration-150 min-h-[44px]">
            Se alla rättsfall <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ─── BLOGG ─── */}
      <section className="py-14 sm:py-16 bg-surface-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-8 mb-8">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl md:text-[48px] text-text-primary" style={serif}>Senaste från bloggen</h2>
            </AnimatedSection>
          </div>

          {blogPosts.length >= 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatedSection>
                <Link href={`/blogg/${blogPosts[0].slug}`} className="block h-full group">
                  <div className="rounded-[10px] p-8 sm:p-10 h-full min-h-[260px] flex flex-col justify-end transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]" style={{ backgroundImage: "linear-gradient(135deg, rgba(15,118,110,0.85) 0%, rgba(10,95,89,0.9) 100%), url('/Images/blog/avtalsrorelsen-2027.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
                    <span className="rounded-full bg-white/15 text-white text-xs font-medium px-3 py-1 self-start mb-3">
                      {blogPosts[0].category}
                    </span>
                    <p className="text-[13px] text-white/70 mb-1">{blogPosts[0].publishDate}</p>
                    <h3 className="text-2xl sm:text-[28px] text-white leading-snug" style={serif}>{blogPosts[0].title}</h3>
                    <p className="text-[15px] text-white/80 mt-2 line-clamp-2">{blogPosts[0].excerpt}</p>
                    <span className="text-sm font-medium text-accent mt-4 inline-flex items-center gap-1">
                      Läs mer <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>

              <div className="flex flex-col gap-4">
                {blogPosts.slice(1, 3).map((post, i) => (
                  <AnimatedSection key={post.slug} delay={(i + 1) * 0.1}>
                    <Link href={`/blogg/${post.slug}`} className="block h-full group">
                      <div className="rounded-[10px] border border-border bg-white p-6 h-full hover:border-primary hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)] transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="rounded-full bg-[#F0FDFA] text-primary text-xs font-medium px-3 py-0.5 border border-primary/20">{post.category}</span>
                          <span className="text-xs text-text-secondary">{post.publishDate}</span>
                        </div>
                        <h3 className="text-[22px] text-text-primary leading-snug group-hover:text-primary transition-colors duration-150" style={serif}>{post.title}</h3>
                        <p className="text-sm text-text-secondary mt-2 line-clamp-2">{post.excerpt}</p>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          )}

          <AnimatedSection delay={0.3}>
            <Link href="/blogg" className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-6 hover:text-primary-dark hover:underline transition-colors duration-150 min-h-[44px]">
              Alla artiklar <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
