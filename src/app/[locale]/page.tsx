"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  ShieldCheck,
  Building2,
  Cpu,
  HardHat,
  ShoppingCart,
  Wrench,
  UtensilsCrossed,
  Landmark,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CountUp } from "@/components/ui/CountUp";
import SearchAutocomplete from "@/components/SearchAutocomplete";
import { getDictionary } from "@/lib/dictionaries";
import {
  publicOccupations,
  scbOccupationWageSource,
} from "@/lib/public-occupations";
import { VERIFIED_AGREEMENTS } from "@/lib/verified-agreements";

const publicOccupationBySlug = new Map(
  publicOccupations.map((occupation) => [occupation.slug, occupation])
);
const quickLinks = [
  { label: "Detaljhandelsavtalet", slug: "handelsavtalet" },
  { label: "Teknikavtalet IF Metall", slug: "teknikavtalet-ifmetall" },
  { label: "Byggavtalet", slug: "byggavtalet" },
  { label: "HÖK 25 Kommunal", slug: "hok-kommunal" },
  { label: "Installationsavtalet", slug: "installationsavtalet" },
];

export default function LocaleHomePage() {
  const params = useParams();
  const locale = (params.locale as string) || "sv";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar" || locale === "fa";
  const DirArrow = isRTL ? ArrowLeft : ArrowRight;

  const keyStats = [
    { number: VERIFIED_AGREEMENTS.size, suffix: "", label: dict.hero.stats.agreements, icon: FileText },
    { number: 4, suffix: "+", label: dict.hero.stats.employees, icon: Users },
    { number: 88, suffix: "%", label: dict.hero.stats.coverage, icon: ShieldCheck },
  ];

  const localize = (translations: Record<string, string>) =>
    translations[locale] ?? translations.sv;

  const agreements = [
    {
      name: "HÖK 25 Kommunal",
      icon: Building2,
      slug: "hok-kommunal",
    },
    {
      name: "Teknikavtalet IF Metall",
      icon: Cpu,
      slug: "teknikavtalet-ifmetall",
    },
    {
      name: "Detaljhandelsavtalet",
      icon: ShoppingCart,
      slug: "handelsavtalet",
    },
    {
      name: "Byggavtalet",
      icon: HardHat,
      slug: "byggavtalet",
    },
    {
      name: "AB 25",
      icon: Building2,
      slug: "ab-kommunalt",
    },
    {
      name: "Installationsavtalet",
      icon: Wrench,
      slug: "installationsavtalet",
    },
    {
      name: "Gröna riksavtalet",
      icon: UtensilsCrossed,
      slug: "hotell-restaurang",
    },
    {
      name: "Villkorsavtal-T Saco-S",
      icon: Landmark,
      slug: "villkorsavtal-saco",
    },
  ];

  const popularOccupations = [
    {
      slug: "sjukskoterska",
      title: localize({ sv: "Sjuksköterska", en: "Registered nurse", ar: "ممرض/ممرضة", so: "Kalkaaliye", fa: "پرستار", es: "Enfermero/a", pl: "Pielęgniarz/pielęgniarka" }),
    },
    {
      slug: "elektriker",
      title: localize({ sv: "Elektriker", en: "Electrician", ar: "كهربائي", so: "Koronto-yaqaan", fa: "برق‌کار", es: "Electricista", pl: "Elektryk" }),
    },
    { slug: "kock", title: localize({ sv: "Kock", en: "Chef", ar: "طاهي", so: "Cunto-kariye", fa: "آشپز", es: "Cocinero/a", pl: "Kucharz/kucharka" }) },
    {
      slug: "larare-grundskola",
      title: localize({ sv: "Grundskollärare", en: "Primary school teacher", ar: "معلم مدرسة ابتدائية", so: "Macallinka dugsiga hoose", fa: "معلم دبستان", es: "Profesor/a de primaria", pl: "Nauczyciel/ka szkoły podstawowej" }),
    },
    {
      slug: "lastbilschauffor",
      title: localize({ sv: "Lastbilschaufför", en: "Truck driver", ar: "سائق شاحنة", so: "Darawalka baabuurta xamuulka", fa: "راننده کامیون", es: "Conductor/a de camión", pl: "Kierowca ciężarówki" }),
    },
    {
      slug: "systemutvecklare",
      title: localize({ sv: "Systemutvecklare", en: "Software developer", ar: "مطور برمجيات", so: "Horumariye software", fa: "توسعه‌دهنده نرم‌افزار", es: "Desarrollador/a de software", pl: "Programista/ka" }),
    },
    {
      slug: "barnskotare",
      title: localize({ sv: "Barnskötare", en: "Childcare worker", ar: "مساعد رعاية أطفال", so: "Daryeelaha carruurta", fa: "مربی کودک", es: "Cuidador/a infantil", pl: "Opiekun/ka dziecięcy/a" }),
    },
    {
      slug: "snickare",
      title: localize({ sv: "Snickare", en: "Carpenter", ar: "نجار", so: "Nijaar", fa: "نجار", es: "Carpintero/a", pl: "Cieśla" }),
    },
  ].flatMap((item) => {
    const occupation = publicOccupationBySlug.get(item.slug);
    return occupation
      ? [{ ...item, median: occupation.salary.median }]
      : [];
  });

  const comparisonRowsData = Object.values(dict.comparisonRows);

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
            <div className="mt-8 sm:mt-10 relative max-w-xl mx-auto text-left">
              <SearchAutocomplete
                variant="hero"
                placeholder={dict.nav.search}
                agreementBasePath="/avtal"
                isRTL={isRTL}
                scope="agreements"
                showDetails={false}
                labels={{
                  agreements: dict.nav.agreements,
                  occupations: dict.nav.occupations,
                  noResults: dict.common.noResults,
                }}
              />
            </div>
            <p className="mt-2 text-xs text-white/70">
              {dict.home.searchSwedishNames}
            </p>

            <div className="mt-5 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
              {quickLinks.map((item) => (
                <Link
                  key={item.slug}
                  href={`/avtal/${item.slug}`}
                  className="shrink-0 rounded-[8px] bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors min-h-[44px] flex items-center"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
            {keyStats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <div className="rounded-[12px] border border-border bg-white p-4 sm:p-6 shadow-sm text-center">
                  <stat.icon size={28} className="mx-auto text-accent mb-3" />
                  <p className="text-xl sm:text-2xl font-bold text-text-primary">
                    <CountUp end={stat.number} suffix={stat.suffix} duration={1.5} />
                  </p>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-text-secondary">
            {dict.agreement.source}: {" "}
            <a
              href="https://www.mi.se/nyheter/2026/kollektivavtal-for-mer-an-4-miljoner-anstallda/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent hover:underline"
            >
              Medlingsinstitutet
            </a>
          </p>
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
            {popularOccupations.map((occ, i) => (
              <AnimatedSection key={occ.slug} delay={i * 0.05}>
                <div className="rounded-[12px] border border-border bg-white p-4 shadow-sm text-center">
                  <p className="font-semibold text-text-primary text-sm">{occ.title}</p>
                  <p className="text-lg font-bold text-accent mt-1">
                    {occ.median.toLocaleString("sv-SE")} kr
                  </p>
                  <p className="text-xs text-text-secondary">{dict.home.medianSalary}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-text-secondary">
            <a
              href={scbOccupationWageSource.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent hover:underline"
            >
              {dict.home.salarySource}
            </a>{" "}
            · {scbOccupationWageSource.year} · {localize({
              sv: "median för kvinnor och män, alla sektorer",
              en: "median for women and men, all sectors",
              ar: "الوسيط للنساء والرجال في جميع القطاعات",
              so: "mushaharka dhexe ee haweenka iyo ragga, dhammaan qaybaha",
              fa: "میانه برای زنان و مردان، همه بخش‌ها",
              es: "mediana de mujeres y hombres, todos los sectores",
              pl: "mediana dla kobiet i mężczyzn, wszystkie sektory",
            })} · {localize({
              sv: "Inte lägstalön eller individuell prognos",
              en: "Not a minimum wage or an individual forecast",
              ar: "ليست حداً أدنى للأجور ولا توقعاً فردياً",
              so: "Ma aha mushaharka ugu yar ama saadaal qofeed",
              fa: "حداقل دستمزد یا پیش‌بینی فردی نیست",
              es: "No es un salario mínimo ni una previsión individual",
              pl: "To nie jest płaca minimalna ani indywidualna prognoza",
            })}
          </p>
        </div>
      </section>

      {/* Popular Agreements */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 sm:mb-10">
              {dict.home.popularAgreements}
            </h2>
            <p className="-mt-6 mb-8 text-sm text-text-secondary">
              {dict.home.detailsInSwedish}
            </p>
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
                    <p className="text-sm text-text-secondary mt-1 leading-snug">{dict.home.detailsInSwedish}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-3">
                      {dict.home.openSwedishPage} <DirArrow size={14} />
                    </span>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
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
        </div>
      </section>
    </>
  );
}
