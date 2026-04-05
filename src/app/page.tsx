"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  FileText,
  Users,
  ShieldCheck,
  MessageSquare,
  Building2,
  Cpu,
  HardHat,
  ShoppingCart,
  Truck,
  UtensilsCrossed,
  Landmark,
  ArrowRight,
  Scale,
  Shield,
  Rocket,
  Check,
  X,
  Calculator,
  TrendingUp,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CountUp } from "@/components/ui/CountUp";
import SalaryChart from "@/components/SalaryChart";
import { blogPosts } from "@/data/blog-posts";
import { courtCases as allCourtCases } from "@/data/court-cases";

const latestCases = allCourtCases.slice(0, 3);

const quickLinks = [
  "Handelsavtalet",
  "Teknikavtalet",
  "Byggavtalet",
  "HÖK Kommunal",
  "IT-avtalet",
];

const keyStats = [
  { number: 225, suffix: "", label: "avtal sammanfattade — fler på väg", icon: FileText },
  { number: 3.4, suffix: "", label: "miljoner anställda täckta", icon: Users },
  { number: 92, suffix: "%", label: "avtalstäckning", icon: ShieldCheck },
  { number: 225, suffix: "", label: "AI-experten svarar", icon: MessageSquare },
];

const agreements = [
  {
    name: "HÖK Kommunal",
    desc: "Huvudöverenskommelse för kommunalt anställda inom vård, omsorg och skola",
    employees: "~1 100 000",
    icon: Building2,
    slug: "hok-kommunal",
  },
  {
    name: "Teknikavtalet",
    desc: "Industrins största avtal för ingenjörer, tekniker och montörer",
    employees: "~300 000",
    icon: Cpu,
    slug: "teknikavtalet",
  },
  {
    name: "Handelsavtalet",
    desc: "Avtal för anställda inom detaljhandel och partihandel",
    employees: "~250 000",
    icon: ShoppingCart,
    slug: "handelsavtalet",
  },
  {
    name: "Byggavtalet",
    desc: "Avtal för byggnadsarbetare och anläggningspersonal",
    employees: "~150 000",
    icon: HardHat,
    slug: "byggavtalet",
  },
  {
    name: "IT-avtalet",
    desc: "Avtal för anställda inom IT- och telekombranschen",
    employees: "~100 000",
    icon: Cpu,
    slug: "it-avtalet",
  },
  {
    name: "Transportavtalet",
    desc: "Avtal för yrkesförare, lagerarbetare och logistikpersonal",
    employees: "~120 000",
    icon: Truck,
    slug: "transportavtalet",
  },
  {
    name: "Hotell & Restaurang",
    desc: "Avtal för anställda inom hotell-, restaurang- och caféverksamhet",
    employees: "~130 000",
    icon: UtensilsCrossed,
    slug: "hotell-restaurang",
  },
  {
    name: "Statliga villkorsavtal",
    desc: "Villkorsavtal för statligt anställda inom myndigheter och verk",
    employees: "~270 000",
    icon: Landmark,
    slug: "statliga-villkorsavtal",
  },
];

const comparisonRows = [
  {
    feature: "Tjänstepension",
    med: "4,5% av lön",
    utan: "0 kr (om arbetsgivaren inte erbjuder)",
  },
  {
    feature: "Föräldralön",
    med: "Upp till 90% löneutfyllnad",
    utan: "Bara Försäkringskassans ersättning",
  },
  {
    feature: "OB-tillägg",
    med: "43–172 kr/tim",
    utan: "Inget OB garanterat",
  },
  {
    feature: "Inkomstförsäkring",
    med: "Ingår via facket",
    utan: "Måste tecknas privat",
  },
  {
    feature: "Uppsägningstid",
    med: "Upp till 6 mån",
    utan: "1 mån enligt LAS",
  },
];


const crossSelling = [
  {
    title: "Hitta en arbetsrättsjurist",
    href: "https://allaadvokater.se",
    icon: Scale,
  },
  {
    title: "Jämför försäkringar",
    href: "https://allaforsakringar.com",
    icon: Shield,
  },
  {
    title: "Starta eget?",
    href: "https://startaenskildfirma.se",
    icon: Rocket,
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-16 sm:py-24 md:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <AnimatedSection>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Förstå ditt kollektivavtal — på klarspråk
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Sveriges största AI-drivna guide till alla 617 kollektivavtal. Sök, jämför och chatta
              med en expert på just ditt avtal.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="mt-8 sm:mt-10 relative max-w-xl mx-auto group/search">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
              />
              <input
                type="text"
                placeholder="Sök på yrke, bransch eller företag..."
                className="w-full rounded-[12px] bg-white text-text-primary py-4 pl-12 pr-4 text-base shadow-lg outline-none placeholder:text-text-secondary focus:ring-2 focus:ring-accent transition-transform focus:scale-[1.02]"
              />
            </div>

            <div className="mt-5 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
              {quickLinks.map((label) => (
                <Link
                  key={label}
                  href={`/avtal/${label.toLowerCase().replace(/\s+/g, "-").replace(/ö/g, "o")}`}
                  className="shrink-0 rounded-[8px] bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors min-h-[44px] flex items-center"
                >
                  {label}
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Nyckeltal */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {keyStats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <div className="rounded-[12px] border border-border bg-white p-4 sm:p-6 shadow-sm text-center">
                  <stat.icon size={28} className="mx-auto text-accent mb-3" />
                  <p className="text-xl sm:text-2xl font-bold text-text-primary">
                    {i === 1 ? (
                      <><CountUp end={3} duration={1.5} />,<CountUp end={4} duration={1.5} /></>
                    ) : (
                      <CountUp end={stat.number} suffix={stat.suffix} duration={1.5} />
                    )}
                  </p>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Verktyg */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 sm:mb-10">
              Verktyg
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "Hitta ditt avtal",
                desc: "Svara på 3 frågor och hitta rätt avtal",
                href: "/hitta-avtal",
                icon: Search,
              },
              {
                title: "Lönekalkylator",
                desc: "Se vad du ska tjäna enligt ditt avtal",
                href: "/lonekalkylator",
                icon: Calculator,
              },
              {
                title: "Avtalsrörelsen",
                desc: "Följ avtalsrörelsen 2025–2027",
                href: "/statistik/avtalsrorelsen",
                icon: TrendingUp,
              },
            ].map((tool, i) => (
              <AnimatedSection key={tool.title} delay={i * 0.1}>
                <Link href={tool.href} className="block">
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
                    transition={{ duration: 0.2 }}
                    className="group rounded-[12px] border border-border bg-white p-6 shadow-sm text-center"
                  >
                    <tool.icon size={32} className="mx-auto text-accent mb-3" />
                    <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1">{tool.desc}</p>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Populära yrken */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 sm:mb-10">
              Populära yrken
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { title: "Undersköterska", median: "31 000", slug: "underskoterska" },
              { title: "Elektriker", median: "35 000", slug: "elektriker" },
              { title: "Kock", median: "28 000", slug: "kock" },
              { title: "Lärare", median: "37 000", slug: "larare-grundskola" },
              { title: "Lastbilschaufför", median: "32 000", slug: "lastbilschauffor" },
              { title: "Systemutvecklare", median: "48 000", slug: "systemutvecklare" },
              { title: "Butikssäljare", median: "27 000", slug: "butikssaljare" },
              { title: "Byggnadsarbetare", median: "33 000", slug: "byggnadsarbetare" },
            ].map((occ, i) => (
              <AnimatedSection key={occ.slug} delay={i * 0.05}>
                <Link href={`/yrke/${occ.slug}`} className="block">
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
                    transition={{ duration: 0.2 }}
                    className="group rounded-[12px] border border-border bg-white p-4 shadow-sm text-center"
                  >
                    <p className="font-semibold text-text-primary text-sm group-hover:text-accent transition-colors">{occ.title}</p>
                    <p className="text-lg font-bold text-accent mt-1">{occ.median} kr</p>
                    <p className="text-xs text-text-secondary">medianlön</p>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.4}>
            <Link href="/yrke" className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-6 hover:underline min-h-[44px]">
              Se alla 50 yrken <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Populära avtalsområden */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 sm:mb-10">
              Populära avtalsområden
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {agreements.map((a, i) => (
              <AnimatedSection key={a.slug} delay={i * 0.05}>
                <Link href={`/avtal/${a.slug}`} className="block h-full">
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
                    transition={{ duration: 0.2 }}
                    className="group rounded-[12px] border border-border bg-white p-5 shadow-sm h-full"
                  >
                    <a.icon size={24} className="text-accent mb-3" />
                    <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                      {a.name}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1 leading-snug">{a.desc}</p>
                    <p className="text-xs text-text-secondary mt-2">{a.employees} anställda</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-3">
                      Läs mer <ArrowRight size={14} />
                    </span>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Lönestatistik */}
      <section className="py-16 sm:py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 sm:mb-10">
              Lönestatistik per bransch
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="rounded-[12px] border border-border bg-white p-4 sm:p-6 shadow-sm">
              <SalaryChart />
            </div>
            <p className="text-xs text-text-secondary mt-3">Källa: SCB, egen bearbetning</p>
            <Link
              href="/statistik/loner"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-2 hover:underline min-h-[44px]"
            >
              Se fullständig lönestatistik <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Vad förlorar du utan kollektivavtal? */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
              Vad förlorar du utan kollektivavtal?
            </h2>
            <p className="text-text-secondary mb-8 sm:mb-10 max-w-2xl">
              Utan kollektivavtal saknar du tjänstepension, föräldralön, OB-tillägg och mycket mer.
            </p>
          </AnimatedSection>

          {/* Desktop table */}
          <AnimatedSection delay={0.1}>
            <div className="hidden md:block overflow-x-auto rounded-[12px] border border-border bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-background">
                    <th className="text-left p-4 font-semibold text-text-primary">Förmån</th>
                    <th className="text-left p-4 font-semibold text-success">Med kollektivavtal</th>
                    <th className="text-left p-4 font-semibold text-accent">Utan kollektivavtal</th>
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
                          <X size={14} className="text-accent shrink-0" />
                          {row.utan}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>

          {/* Mobile stacked cards */}
          <div className="md:hidden space-y-3">
            {comparisonRows.map((row, i) => (
              <AnimatedSection key={row.feature} delay={i * 0.05}>
                <div className="rounded-[12px] border border-border bg-white p-4 shadow-sm">
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
                      <X size={14} className="text-accent shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-accent">Utan kollektivavtal</p>
                        <p className="text-sm text-text-secondary">{row.utan}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <a
            href="https://allaforsakringar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-6 hover:underline min-h-[44px]"
          >
            Jämför försäkringar som kompenserar <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* Jämför villkor */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 sm:mb-10">
              Jämför villkor
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { title: "OB-tillägg", href: "/jamfor/ob-tillagg" },
              { title: "Minimilöner", href: "/jamfor/minimiioner" },
              { title: "Semester", href: "/jamfor/semester" },
              { title: "Pension", href: "/jamfor/pension" },
            ].map((item, i) => (
              <AnimatedSection key={item.href} delay={i * 0.05}>
                <Link href={item.href} className="block rounded-[12px] border border-border bg-white p-4 shadow-sm hover:shadow-md transition-shadow text-center">
                  <p className="font-semibold text-text-primary text-sm">{item.title}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-accent mt-1">
                    Jämför alla avtal <ArrowRight size={12} />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Senaste från Arbetsdomstolen */}
      <section className="py-16 sm:py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 sm:mb-10">
              Senaste arbetsrättsdomar
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {latestCases.map((c, i) => (
              <AnimatedSection key={c.id} delay={i * 0.1}>
                <Link href={`/rattsfall/${c.id}`} className="block h-full">
                  <div className="rounded-[12px] border border-border bg-white p-5 shadow-sm h-full hover:shadow-md transition-shadow">
                    <p className="text-xs text-text-secondary">{c.date}</p>
                    <h3 className="font-semibold text-text-primary mt-1 leading-snug">{c.caseNumber} — {c.title}</h3>
                    <p className="text-sm text-text-secondary mt-2 line-clamp-2">{c.summary}</p>
                    <span className="inline-block mt-3 text-xs font-medium bg-background text-text-secondary px-2 py-1 rounded-[6px]">
                      {c.topic}
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <Link
            href="/rattsfall"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-6 hover:underline min-h-[44px]"
          >
            Se alla rättsfall <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Senaste från bloggen */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 sm:mb-10">
              Senaste från bloggen
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {blogPosts.slice(0, 3).map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.1}>
                <Link href={`/blogg/${post.slug}`} className="block h-full">
                  <div className="rounded-[12px] border border-border bg-white p-5 shadow-sm hover:shadow-md transition-shadow h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-[4px] bg-accent/10 text-accent text-xs font-medium px-2 py-0.5">{post.category}</span>
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
            <Link href="/blogg" className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-6 hover:underline min-h-[44px]">
              Alla artiklar <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Cross-selling */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 sm:mb-10">
              Behöver du mer hjälp?
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {crossSelling.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
                    transition={{ duration: 0.2 }}
                    className="group rounded-[12px] border border-border bg-white p-6 shadow-sm text-center"
                  >
                    <item.icon size={32} className="mx-auto text-accent mb-3" />
                    <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                  </motion.div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
