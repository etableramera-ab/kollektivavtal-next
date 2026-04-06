"use client";

import { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
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
];

const tools = [
  {
    title: "Hitta ditt avtal",
    desc: "Svara på 3 frågor",
    href: "/hitta-avtal",
    icon: Search,
  },
  {
    title: "Lönekalkylator",
    desc: "Se vad du ska tjäna",
    href: "/lonekalkylator",
    icon: Calculator,
  },
  {
    title: "Jämför villkor",
    desc: "OB, semester, pension",
    href: "/jamfor",
    icon: BarChart3,
  },
  {
    title: "Avtalsrörelsen",
    desc: "Följ 2025–2027",
    href: "/statistik/avtalsrorelsen",
    icon: TrendingUp,
  },
];

const topAgreements = [
  { name: "HÖK Kommunal", desc: "Kommunalt anställda inom vård, omsorg och skola", employees: "~1 100 000", icon: Building2, slug: "hok-kommunal" },
  { name: "Teknikavtalet", desc: "Ingenjörer, tekniker och montörer i industrin", employees: "~300 000", icon: Cpu, slug: "teknikavtalet" },
  { name: "Handelsavtalet", desc: "Anställda inom detaljhandel och partihandel", employees: "~250 000", icon: ShoppingCart, slug: "handelsavtalet" },
  { name: "Byggavtalet", desc: "Byggnadsarbetare och anläggningspersonal", employees: "~150 000", icon: HardHat, slug: "byggavtalet" },
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

export default function Home() {
  const [activeTab, setActiveTab] = useState<"avtal" | "yrken">("avtal");

  return (
    <>
      {/* ─── HERO: Split layout ─── */}
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left column */}
            <AnimatedSection>
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-accent mb-4">
                Sveriges 617 kollektivavtal — på klarspråk
              </p>
              <h1 className="text-4xl sm:text-5xl leading-[1.15] text-white" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>
                Förstå ditt kollektivavtal
              </h1>
              <p className="mt-5 text-base sm:text-lg text-white/75 max-w-[480px] leading-relaxed">
                Sök bland alla 617 avtal. Jämför löner, OB-tillägg och villkor.
                Chatta med en AI-expert som kan just ditt avtal.
              </p>
              <p className="mt-6 text-xs text-white/50">
                3,4 miljoner anställda · 92% avtalstäckning · Källa: Medlingsinstitutet
              </p>
            </AnimatedSection>

            {/* Right column: search module */}
            <AnimatedSection delay={0.15}>
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                <p className="font-semibold text-text-primary text-lg mb-4">Hitta ditt avtal</p>
                <div className="relative mb-4">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Sök på yrke, bransch eller företag..."
                    className="w-full h-12 rounded-lg border border-border pl-10 pr-4 text-sm text-text-primary outline-none placeholder:text-text-secondary focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {quickLinks.map((q) => (
                    <Link
                      key={q.slug}
                      href={`/avtal/${q.slug}`}
                      className="rounded-full border border-border px-4 py-1.5 text-xs text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      {q.label}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/hitta-avtal"
                  className="block w-full h-12 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-semibold uppercase tracking-widest flex items-center justify-center transition-colors"
                >
                  Sök
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
            {[
              { icon: FileText, text: "617 avtal sammanfattade" },
              { icon: Users, text: "3,4 miljoner anställda" },
              { icon: ShieldCheck, text: "92% avtalstäckning" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <item.icon size={18} strokeWidth={1.5} className="text-primary" />
                <span className="text-sm font-semibold text-text-primary">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VAD VILL DU GÖRA? (1177-inspired) ─── */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-8 mb-8">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl text-text-primary" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>
                Vad vill du göra?
              </h2>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool, i) => (
              <AnimatedSection key={tool.href} delay={i * 0.05}>
                <Link href={tool.href} className="block group">
                  <div className="rounded-lg border border-border bg-white p-5 flex items-start gap-4 border-l-4 border-l-primary hover:border-l-accent hover:shadow-[0_2px_8px_rgba(15,118,110,0.06)] transition-all">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-[#F0FDFA] flex items-center justify-center">
                      <tool.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary text-[15px]">{tool.title}</p>
                      <p className="text-[13px] text-text-secondary mt-0.5">{tool.desc}</p>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── UTFORSKA AVTAL OCH YRKEN (tabbed) ─── */}
      <section className="py-14 sm:py-16 bg-surface-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-8 mb-8">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl text-text-primary" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>
                Utforska avtal och yrken
              </h2>
            </AnimatedSection>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab("avtal")}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === "avtal"
                  ? "text-primary border-b-2 border-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Populära avtal
            </button>
            <button
              onClick={() => setActiveTab("yrken")}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === "yrken"
                  ? "text-primary border-b-2 border-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Populära yrken
            </button>
          </div>

          {activeTab === "avtal" && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {topAgreements.map((a, i) => (
                  <AnimatedSection key={a.slug} delay={i * 0.05}>
                    <Link href={`/avtal/${a.slug}`} className="block h-full group">
                      <div className="rounded-lg border border-border bg-white p-5 h-full hover:shadow-[0_2px_12px_rgba(15,118,110,0.08)] transition-shadow">
                        <div className="w-10 h-10 rounded-full bg-[#F0FDFA] flex items-center justify-center mb-3">
                          <a.icon size={20} className="text-primary" />
                        </div>
                        <h3 className="text-xl text-text-primary group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>
                          {a.name}
                        </h3>
                        <p className="text-sm text-text-secondary mt-1 leading-snug">{a.desc}</p>
                        <p className="text-xs text-text-secondary mt-2">{a.employees} anställda</p>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-3">
                          Läs mer <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
              <AnimatedSection delay={0.25}>
                <Link href="/avtal" className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-6 hover:underline min-h-[44px]">
                  Se alla 617 avtal <ArrowRight size={14} />
                </Link>
              </AnimatedSection>
            </div>
          )}

          {activeTab === "yrken" && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {topOccupations.map((occ, i) => (
                  <AnimatedSection key={occ.slug} delay={i * 0.05}>
                    <Link href={`/yrke/${occ.slug}`} className="block group">
                      <div className="rounded-lg border border-border bg-white p-5 text-center hover:shadow-[0_2px_12px_rgba(15,118,110,0.08)] transition-shadow">
                        <p className="text-xl text-text-primary group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>
                          {occ.title}
                        </p>
                        <p className="text-2xl font-normal text-accent mt-2" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>
                          {occ.median} kr
                        </p>
                        <p className="text-xs text-text-secondary mt-1">medianlön</p>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
              <AnimatedSection delay={0.25}>
                <Link href="/yrke" className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-6 hover:underline min-h-[44px]">
                  Se alla 50 yrken <ArrowRight size={14} />
                </Link>
              </AnimatedSection>
            </div>
          )}
        </div>
      </section>

      {/* ─── LÖNESTATISTIK ─── */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-8 mb-8">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl text-text-primary" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>
                Lönestatistik per bransch
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.1}>
            <div className="rounded-lg border border-border bg-white p-4 sm:p-6">
              <SalaryChart />
            </div>
            <p className="text-xs text-text-secondary mt-3">Källa: SCB, egen bearbetning</p>
            <Link
              href="/statistik/loner"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-2 hover:underline min-h-[44px]"
            >
              Se fullständig lönestatistik <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── VAD FÖRLORAR DU? ─── */}
      <section className="py-14 sm:py-16 bg-surface-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-8 mb-8">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl text-text-primary" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>
                Vad förlorar du utan kollektivavtal?
              </h2>
              <p className="text-text-secondary mt-2 max-w-2xl">
                Utan kollektivavtal saknar du tjänstepension, föräldralön, OB-tillägg och mycket mer.
              </p>
            </AnimatedSection>
          </div>

          {/* Desktop table */}
          <AnimatedSection delay={0.1}>
            <div className="hidden md:block overflow-x-auto rounded-lg border border-border bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-background">
                    <th className="text-left p-4 font-semibold text-text-primary">Förmån</th>
                    <th className="text-left p-4 font-semibold text-success">Med kollektivavtal</th>
                    <th className="text-left p-4 font-semibold text-text-secondary">Utan kollektivavtal</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-b border-border last:border-0">
                      <td className="p-4 font-medium text-text-primary">{row.feature}</td>
                      <td className="p-4 text-text-primary">
                        <span className="inline-flex items-center gap-1.5">
                          <Check size={14} className="text-success shrink-0" />
                          {row.med}
                        </span>
                      </td>
                      <td className="p-4 text-text-secondary">
                        <span className="inline-flex items-center gap-1.5">
                          <X size={14} className="text-text-secondary shrink-0" />
                          {row.utan}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {comparisonRows.map((row, i) => (
              <AnimatedSection key={row.feature} delay={i * 0.05}>
                <div className="rounded-lg border border-border bg-white p-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">{row.feature}</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-success shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-success">Med kollektivavtal</p>
                        <p className="text-sm text-text-primary">{row.med}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <X size={14} className="text-text-secondary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-text-secondary">Utan kollektivavtal</p>
                        <p className="text-sm text-text-secondary">{row.utan}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SENASTE RÄTTSFALL ─── */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-8 mb-8">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl text-text-primary" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>
                Senaste arbetsrättsdomar
              </h2>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {latestCases.map((c, i) => (
              <AnimatedSection key={c.id} delay={i * 0.1}>
                <Link href={`/rattsfall/${c.id}`} className="block h-full">
                  <div className="rounded-lg border border-border bg-white p-5 h-full hover:shadow-[0_2px_12px_rgba(15,118,110,0.08)] transition-shadow">
                    <p className="text-xs text-text-secondary">{c.date}</p>
                    <h3 className="font-semibold text-text-primary mt-1 leading-snug text-sm">{c.caseNumber} — {c.title}</h3>
                    <p className="text-sm text-text-secondary mt-2 line-clamp-2">{c.summary}</p>
                    <span className="inline-block mt-3 text-xs font-medium bg-[#F0FDFA] text-primary px-2 py-1 rounded-md border border-primary/20">
                      {c.topic}
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <Link
            href="/rattsfall"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-6 hover:underline min-h-[44px]"
          >
            Se alla rättsfall <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ─── SENASTE BLOGGEN ─── */}
      <section className="py-14 sm:py-16 bg-surface-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-8 mb-8">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl text-text-primary" style={{ fontFamily: "var(--font-instrument-serif, var(--font-serif))" }}>
                Senaste från bloggen
              </h2>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {blogPosts.slice(0, 3).map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.1}>
                <Link href={`/blogg/${post.slug}`} className="block h-full">
                  <div className="rounded-lg border border-border bg-white p-5 hover:shadow-[0_2px_12px_rgba(15,118,110,0.08)] transition-shadow h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-md bg-[#F0FDFA] text-primary text-xs font-medium px-2 py-0.5 border border-primary/20">{post.category}</span>
                      <span className="text-xs text-text-secondary">{post.publishDate}</span>
                    </div>
                    <h3 className="font-semibold text-text-primary text-sm leading-snug">{post.title}</h3>
                    <p className="text-sm text-text-secondary mt-2 line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.3}>
            <Link href="/blogg" className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-6 hover:underline min-h-[44px]">
              Alla artiklar <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
