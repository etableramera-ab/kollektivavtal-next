"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
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
  ArrowLeft,
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
import { getDictionary } from "@/lib/dictionaries";

const latestCases = allCourtCases.slice(0, 3);

const quickLinks = [
  "Handelsavtalet",
  "Teknikavtalet",
  "Byggavtalet",
  "HÖK Kommunal",
  "IT-avtalet",
];

export default function LocaleHomePage() {
  const params = useParams();
  const locale = (params.locale as string) || "sv";
  const dict = getDictionary(locale);
  const prefix = locale === "sv" ? "" : `/${locale}`;
  const isRTL = locale === "ar" || locale === "fa";
  const DirArrow = isRTL ? ArrowLeft : ArrowRight;

  const keyStats = [
    { number: 515, suffix: "", label: dict.hero.stats.agreements, icon: FileText },
    { number: 3.4, suffix: "", label: dict.hero.stats.employees, icon: Users },
    { number: 92, suffix: "%", label: dict.hero.stats.coverage, icon: ShieldCheck },
    { number: 515, suffix: "", label: dict.hero.stats.aiExpert, icon: MessageSquare },
  ];

  const t = (sv: string, en: string, ar: string) =>
    locale === "ar" ? ar : locale === "en" ? en : sv;

  const agreements = [
    {
      name: "HÖK Kommunal",
      desc: t("Huvudöverenskommelse för kommunalt anställda inom vård, omsorg och skola", "Main agreement for municipal employees in healthcare, care and education", "الاتفاقية الرئيسية للموظفين البلديين في الرعاية الصحية والتعليم"),
      employees: "~1 100 000",
      icon: Building2,
      slug: "hok-kommunal",
    },
    {
      name: "Teknikavtalet",
      desc: t("Industrins största avtal för ingenjörer, tekniker och montörer", "Industry's largest agreement for engineers, technicians and assemblers", "أكبر اتفاقية صناعية للمهندسين والفنيين والمركّبين"),
      employees: "~300 000",
      icon: Cpu,
      slug: "teknikavtalet",
    },
    {
      name: "Handelsavtalet",
      desc: t("Avtal för anställda inom detaljhandel och partihandel", "Agreement for employees in retail and wholesale", "اتفاقية للموظفين في تجارة التجزئة والجملة"),
      employees: "~250 000",
      icon: ShoppingCart,
      slug: "handelsavtalet",
    },
    {
      name: "Byggavtalet",
      desc: t("Avtal för byggnadsarbetare och anläggningspersonal", "Agreement for construction workers and infrastructure staff", "اتفاقية لعمال البناء والبنية التحتية"),
      employees: "~150 000",
      icon: HardHat,
      slug: "byggavtalet",
    },
    {
      name: "IT-avtalet",
      desc: t("Avtal för anställda inom IT- och telekombranschen", "Agreement for employees in IT and telecom", "اتفاقية للموظفين في قطاع تكنولوجيا المعلومات والاتصالات"),
      employees: "~100 000",
      icon: Cpu,
      slug: "it-avtalet",
    },
    {
      name: "Transportavtalet",
      desc: t("Avtal för yrkesförare, lagerarbetare och logistikpersonal", "Agreement for professional drivers, warehouse and logistics staff", "اتفاقية للسائقين المحترفين وعمال المستودعات واللوجستيات"),
      employees: "~120 000",
      icon: Truck,
      slug: "transportavtalet",
    },
    {
      name: "Hotell & Restaurang",
      desc: t("Avtal för anställda inom hotell-, restaurang- och caféverksamhet", "Agreement for employees in hotels, restaurants and cafés", "اتفاقية للموظفين في الفنادق والمطاعم والمقاهي"),
      employees: "~130 000",
      icon: UtensilsCrossed,
      slug: "hotell-restaurang",
    },
    {
      name: t("Statliga villkorsavtal", "Government Conditions Agreement", "اتفاقية شروط العمل الحكومية"),
      desc: t("Villkorsavtal för statligt anställda inom myndigheter och verk", "Conditions agreements for government employees in agencies and departments", "اتفاقية شروط للموظفين الحكوميين في الوكالات والإدارات"),
      employees: "~270 000",
      icon: Landmark,
      slug: "statliga-villkorsavtal",
    },
  ];

  const comparisonRowsData = Object.values(dict.comparisonRows);

  const crossSelling = [
    { title: dict.home.findLawyer, href: "https://allaadvokater.se", icon: Scale },
    { title: dict.home.compareInsurances, href: "https://allaforsakringar.com", icon: Shield },
    { title: dict.home.startBusiness, href: "https://startaenskildfirma.se", icon: Rocket },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-16 sm:py-24 md:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <AnimatedSection>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              {dict.hero.title}
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              {dict.hero.subtitle}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="mt-8 sm:mt-10 relative max-w-xl mx-auto group/search">
              <Search
                size={20}
                className={`absolute top-1/2 -translate-y-1/2 text-text-secondary ${isRTL ? "right-4" : "left-4"}`}
              />
              <input
                type="text"
                placeholder={dict.nav.search}
                className={`w-full rounded-[12px] bg-white text-text-primary py-4 text-base shadow-lg outline-none placeholder:text-text-secondary focus:ring-2 focus:ring-accent transition-transform focus:scale-[1.02] ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"}`}
              />
            </div>

            <div className="mt-5 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
              {quickLinks.map((label) => (
                <Link
                  key={label}
                  href={`${prefix}/avtal/${label.toLowerCase().replace(/\s+/g, "-").replace(/ö/g, "o")}`}
                  className="shrink-0 rounded-[8px] bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors min-h-[44px] flex items-center"
                >
                  {label}
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Key Stats */}
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

      {/* Tools */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 sm:mb-10">
              {dict.home.tools}
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: dict.nav.findAgreement,
                desc: dict.home.findAgreementDesc,
                href: `${prefix}/hitta-avtal`,
                icon: Search,
              },
              {
                title: dict.nav.calculator,
                desc: dict.home.calculatorDesc,
                href: `${prefix}/lonekalkylator`,
                icon: Calculator,
              },
              {
                title: dict.home.bargainingRound,
                desc: dict.home.bargainingRoundDesc,
                href: `${prefix}/statistik/avtalsrorelsen`,
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

      {/* Popular Occupations */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 sm:mb-10">
              {dict.home.popularOccupations}
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { title: t("Undersköterska", "Assistant Nurse", "مساعد تمريض"), median: "31 000", slug: "underskoterska" },
              { title: t("Elektriker", "Electrician", "كهربائي"), median: "35 000", slug: "elektriker" },
              { title: t("Kock", "Chef", "طاهي"), median: "28 000", slug: "kock" },
              { title: t("Lärare", "Teacher", "معلم"), median: "37 000", slug: "larare-grundskola" },
              { title: t("Lastbilschaufför", "Truck Driver", "سائق شاحنة"), median: "32 000", slug: "lastbilschauffor" },
              { title: t("Systemutvecklare", "Software Developer", "مطور برمجيات"), median: "48 000", slug: "systemutvecklare" },
              { title: t("Butikssäljare", "Sales Associate", "بائع"), median: "27 000", slug: "butikssaljare" },
              { title: t("Byggnadsarbetare", "Construction Worker", "عامل بناء"), median: "33 000", slug: "byggnadsarbetare" },
            ].map((occ, i) => (
              <AnimatedSection key={occ.slug} delay={i * 0.05}>
                <Link href={`${prefix}/yrke/${occ.slug}`} className="block">
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
                    transition={{ duration: 0.2 }}
                    className="group rounded-[12px] border border-border bg-white p-4 shadow-sm text-center"
                  >
                    <p className="font-semibold text-text-primary text-sm group-hover:text-accent transition-colors">{occ.title}</p>
                    <p className="text-lg font-bold text-accent mt-1">{occ.median} kr</p>
                    <p className="text-xs text-text-secondary">{dict.home.medianSalary}</p>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.4}>
            <Link href={`${prefix}/yrke`} className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-6 hover:underline min-h-[44px]">
              {dict.home.seeAllOccupations} <DirArrow size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Popular Agreements */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 sm:mb-10">
              {dict.home.popularAgreements}
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {agreements.map((a, i) => (
              <AnimatedSection key={a.slug} delay={i * 0.05}>
                <Link href={`${prefix}/avtal/${a.slug}`} className="block h-full">
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
                    <p className="text-xs text-text-secondary mt-2">{a.employees} {dict.home.employees}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-3">
                      {dict.home.readMore} <DirArrow size={14} />
                    </span>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Salary Stats */}
      <section className="py-16 sm:py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 sm:mb-10">
              {dict.home.salaryStats}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="rounded-[12px] border border-border bg-white p-4 sm:p-6 shadow-sm">
              <SalaryChart />
            </div>
            <p className="text-xs text-text-secondary mt-3">{dict.home.salarySource}</p>
            <Link
              href={`${prefix}/statistik/loner`}
              className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-2 hover:underline min-h-[44px]"
            >
              {dict.home.fullSalaryStats} <DirArrow size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Without Agreement Comparison */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
              {dict.home.withoutAgreement}
            </h2>
            <p className="text-text-secondary mb-8 sm:mb-10 max-w-2xl">
              {dict.home.withoutAgreementDesc}
            </p>
          </AnimatedSection>

          {/* Desktop table */}
          <AnimatedSection delay={0.1}>
            <div className="hidden md:block overflow-x-auto rounded-[12px] border border-border bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-background">
                    <th className={`${isRTL ? "text-right" : "text-left"} p-4 font-semibold text-text-primary`}>{dict.home.benefit}</th>
                    <th className={`${isRTL ? "text-right" : "text-left"} p-4 font-semibold text-success`}>{dict.home.withAgreement}</th>
                    <th className={`${isRTL ? "text-right" : "text-left"} p-4 font-semibold text-accent`}>{dict.home.withoutAgreementShort}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRowsData.map((row) => (
                    <tr key={row.feature} className="border-b border-border last:border-0">
                      <td className="p-4 font-medium text-text-primary">{row.feature}</td>
                      <td className="p-4 text-text-primary">
                        <span className="inline-flex items-center gap-1.5">
                          <Check size={14} className="text-success shrink-0" />
                          {row.with}
                        </span>
                      </td>
                      <td className="p-4 text-text-secondary">
                        <span className="inline-flex items-center gap-1.5">
                          <X size={14} className="text-accent shrink-0" />
                          {row.without}
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
            {comparisonRowsData.map((row, i) => (
              <AnimatedSection key={row.feature} delay={i * 0.05}>
                <div className="rounded-[12px] border border-border bg-white p-4 shadow-sm">
                  <p className="font-semibold text-text-primary text-sm mb-3">{row.feature}</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-success shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-success">{dict.home.withAgreement}</p>
                        <p className="text-sm text-text-primary">{row.with}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <X size={14} className="text-accent shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-accent">{dict.home.withoutAgreementShort}</p>
                        <p className="text-sm text-text-secondary">{row.without}</p>
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
            {dict.home.compareInsurance} <DirArrow size={14} />
          </a>
        </div>
      </section>

      {/* Compare Conditions */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 sm:mb-10">
              {dict.home.compareConditions}
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { title: dict.compare.obSupplement, href: `${prefix}/jamfor/ob-tillagg` },
              { title: dict.compare.minimumWages, href: `${prefix}/jamfor/minimiioner` },
              { title: dict.compare.vacation, href: `${prefix}/jamfor/semester` },
              { title: dict.compare.pension, href: `${prefix}/jamfor/pension` },
            ].map((item, i) => (
              <AnimatedSection key={item.href} delay={i * 0.05}>
                <Link href={item.href} className="block rounded-[12px] border border-border bg-white p-4 shadow-sm hover:shadow-md transition-shadow text-center">
                  <p className="font-semibold text-text-primary text-sm">{item.title}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-accent mt-1">
                    {dict.home.compareAll} <DirArrow size={12} />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Court Cases */}
      <section className="py-16 sm:py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 sm:mb-10">
              {dict.home.latestCases}
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {latestCases.map((c, i) => (
              <AnimatedSection key={c.id} delay={i * 0.1}>
                <Link href={`${prefix}/rattsfall/${c.id}`} className="block h-full">
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
            href={`${prefix}/rattsfall`}
            className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-6 hover:underline min-h-[44px]"
          >
            {dict.home.seeAllCases} <DirArrow size={14} />
          </Link>
        </div>
      </section>

      {/* Latest Blog */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 sm:mb-10">
              {dict.home.latestBlog}
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {blogPosts.slice(0, 3).map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.1}>
                <Link href={`${prefix}/blogg/${post.slug}`} className="block h-full">
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
            <Link href={`${prefix}/blogg`} className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-6 hover:underline min-h-[44px]">
              {dict.home.allArticles} <DirArrow size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Cross-selling */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 sm:mb-10">
              {dict.home.needMoreHelp}
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
