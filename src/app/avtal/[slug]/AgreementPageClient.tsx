"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  Clock,
  CalendarDays,
  Moon,
  Baby,
  PiggyBank,
  ArrowRight,
  Scale,
  Shield,
  ExternalLink,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import FaqAccordion from "@/components/FaqAccordion";
import AgreementChat from "@/components/AgreementChat";
import WageDisclaimer from "@/components/WageDisclaimer";
import { getAgreementHeroImage } from "@/lib/sector-images";
import type { Agreement } from "@/data/agreements";

const iconMap: Record<string, LucideIcon> = {
  "Lägsta lön": Banknote,
  "Arbetstid/vecka": Clock,
  Semester: CalendarDays,
  "OB natt": Moon,
  Föräldralön: Baby,
  Pension: PiggyBank,
};

interface KeyFactCard {
  label: string;
  value: string;
  iconName: string;
}

interface RelatedAgreement {
  slug: string;
  name: string;
  shortName: string;
  employeeCount: number;
  sectorLabel: string;
}

interface RelatedCase {
  id: string;
  caseNumber: string;
  date: string;
  title: string;
  summary: string;
  topic: string;
  outcome: string;
}

interface Props {
  agreement: Agreement;
  keyFactCards: KeyFactCard[];
  relatedAgreements: RelatedAgreement[];
  suggestedQuestions: string[];
  relatedCases: RelatedCase[];
  isVerified?: boolean;
}

export default function AgreementPageClient({
  agreement,
  keyFactCards,
  relatedAgreements,
  suggestedQuestions,
  relatedCases,
  isVerified = false,
}: Props) {
  // Fix 2: Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const obRows = [
    { tid: "Vardagskväll", tillagg: agreement.keyFacts.obWeekday },
    { tid: "Natt", tillagg: agreement.keyFacts.obNight },
    { tid: "Lördag/söndag", tillagg: agreement.keyFacts.obWeekend },
    { tid: "Storhelg", tillagg: agreement.keyFacts.obHoliday },
  ];

  return (
    <>
      {/* Hero / Breadcrumb */}
      <section style={{ backgroundImage: `linear-gradient(135deg, rgba(15,118,110,0.82) 0%, rgba(10,95,89,0.87) 100%), url('${getAgreementHeroImage(agreement.slug, agreement.sectorLabel)}')`, backgroundSize: "cover", backgroundPosition: "center" }} className="text-white pt-[120px] pb-10 sm:pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <nav className="flex items-center gap-1.5 text-[13px] text-white/60 mb-6">
              <Link href="/avtal" className="hover:text-white transition-colors">Kollektivavtal</Link>
              <span className="text-white/40">/</span>
              <span className="text-white/90">{agreement.shortName}</span>
            </nav>

            <h1 className="text-4xl sm:text-5xl md:text-[56px] leading-tight" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
              {agreement.name}
            </h1>
            <p className="mt-2 text-base text-white/75">
              Gäller {agreement.employeeCount.toLocaleString("sv-SE")} anställda inom{" "}
              {agreement.sectorLabel.toLowerCase()}
            </p>

            <p className="mt-3 text-[13px] text-white/50">
              Parter: {agreement.parties.unions.join(", ")} + {agreement.parties.employers.join(", ")} · {agreement.validPeriod}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* AEO answer box */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-r-lg border-l-[3px] border-l-primary bg-[#F0FDFA] p-5 sm:p-6">
              <p className="text-sm sm:text-base text-text-primary leading-relaxed">
                {agreement.summary}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Fix 3: Nyckeltal — equal height cards */}
      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 items-stretch">
            {keyFactCards.map((card, i) => {
              const Icon = iconMap[card.label] || Banknote;
              return (
                <AnimatedSection key={card.label} delay={i * 0.05}>
                  <div className="rounded-[12px] border border-border bg-white p-4 sm:p-5 shadow-sm h-full flex flex-col">
                    <Icon size={20} className="text-accent mb-2 shrink-0" />
                    <p className="text-xs text-text-secondary">{card.label}</p>
                    <p className="text-sm font-semibold text-text-primary mt-0.5">{card.value}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI-chatt */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <AgreementChat
              agreementSlug={agreement.slug}
              agreementName={agreement.shortName}
              suggestedQuestions={suggestedQuestions}
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Fix 1: Sammanfattning — different text from AEO box */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-4" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
              Om {agreement.shortName}
            </h2>
            <div className="text-text-primary leading-relaxed space-y-4">
              <p>
                Avtalsparterna är {agreement.parties.unions.join(", ")} på arbetstagarsidan och{" "}
                {agreement.parties.employers.join(", ")} på arbetsgivarsidan.
                Avtalet gäller {agreement.employeeCount.toLocaleString("sv-SE")} anställda
                och löper under perioden {agreement.validPeriod}.
              </p>
              <p>
                Lägsta lön: {agreement.keyFacts.minimumWage}.
                Arbetstid: {agreement.keyFacts.workHoursPerWeek}.
                Pension: {agreement.keyFacts.pension}.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {agreement.sources.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-accent hover:underline min-h-[44px]"
                >
                  <ExternalLink size={14} />
                  {s.label}
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Lönetabell */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-6" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
              Lönetabell — {agreement.shortName}
            </h2>
            <WageDisclaimer isVerified={isVerified} />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="hidden md:block rounded-[12px] border border-border bg-white shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-background">
                    <th className="text-left p-4 font-semibold text-text-primary">Roll</th>
                    <th className="text-left p-4 font-semibold text-text-primary">Lägsta lön</th>
                    <th className="text-left p-4 font-semibold text-text-primary">Medianlön</th>
                    <th className="text-left p-4 font-semibold text-text-secondary">Kommentar</th>
                  </tr>
                </thead>
                <tbody>
                  {agreement.wageTable.map((row) => (
                    <tr key={row.role} className="border-b border-border last:border-0">
                      <td className="p-4 font-medium text-text-primary">{row.role}</td>
                      <td className="p-4 text-text-primary">{row.minimum}</td>
                      <td className="p-4 text-text-primary font-medium">{row.median}</td>
                      <td className="p-4 text-text-secondary text-xs">{row.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>

          <div className="md:hidden space-y-3">
            {agreement.wageTable.map((row, i) => (
              <AnimatedSection key={row.role} delay={i * 0.05}>
                <div className="rounded-[12px] border border-border bg-white p-4 shadow-sm">
                  <p className="font-semibold text-text-primary text-sm">{row.role}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{row.comment}</p>
                  <div className="flex gap-4 mt-3">
                    <div>
                      <p className="text-xs text-text-secondary">Lägsta</p>
                      <p className="text-sm font-medium text-text-primary">{row.minimum}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Median</p>
                      <p className="text-sm font-semibold text-accent">{row.median}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <p className="text-xs text-text-secondary mt-3">Källa: SCB, egen sammanställning</p>
        </div>
      </section>

      {/* OB-tillägg */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-6" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>OB-tillägg</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="rounded-[12px] border border-border bg-white shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-background">
                    <th className="text-left p-4 font-semibold text-text-primary">Tid</th>
                    <th className="text-left p-4 font-semibold text-text-primary">Tillägg per timme</th>
                  </tr>
                </thead>
                <tbody>
                  {obRows.map((row) => (
                    <tr key={row.tid} className="border-b border-border last:border-0">
                      <td className="p-4 font-medium text-text-primary">{row.tid}</td>
                      <td className="p-4 text-text-primary">{row.tillagg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Övertid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-4" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>Övertidsersättning</h2>
            <p className="text-text-primary">{agreement.keyFacts.overtimeRate}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Semester och ledighet */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-4" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>Semester och ledighet</h2>
            <p className="text-text-primary leading-relaxed">
              Semesterrätten enligt {agreement.shortName} är {agreement.keyFacts.vacationDays}.
              Föräldralön: {agreement.keyFacts.parentalPay}.
              Uppsägningstid: {agreement.keyFacts.noticePeriod}.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Pension */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-4" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>Pension</h2>
            <p className="text-text-primary leading-relaxed">
              Anställda som omfattas av {agreement.shortName} har tjänstepension via{" "}
              {agreement.keyFacts.pension}. Arbetsgivaren betalar in pensionsavgifter utöver lönen.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-6" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
              Vanliga frågor om {agreement.shortName}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <FaqAccordion items={agreement.faq} />
          </AnimatedSection>
        </div>
      </section>

      {/* Relaterade rättsfall */}
      {relatedCases.length > 0 && (
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-[32px] text-text-primary mb-6" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
                Rättsfall som rör {agreement.shortName}
              </h2>
            </AnimatedSection>
            <div className="space-y-3">
              {relatedCases.map((c, i) => (
                <AnimatedSection key={c.id} delay={i * 0.05}>
                  <Link href={`/rattsfall/${c.id}`} className="block">
                    <div className="rounded-[12px] border border-border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-text-secondary">{c.caseNumber}</span>
                        <span className="text-xs text-text-secondary">{c.date}</span>
                      </div>
                      <h3 className="font-semibold text-text-primary text-sm">{c.title}</h3>
                      <p className="text-sm text-text-secondary mt-1 line-clamp-2">{c.summary}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-2">
                        Läs mer <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Relaterade avtal */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-6" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>Se även</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {relatedAgreements.map((a, i) => (
              <AnimatedSection key={a.slug} delay={i * 0.05}>
                <Link href={`/avtal/${a.slug}`} className="block">
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
                    transition={{ duration: 0.2 }}
                    className="rounded-[12px] border border-border bg-white p-4 shadow-sm"
                  >
                    <h3 className="font-semibold text-text-primary">{a.shortName}</h3>
                    <p className="text-xs text-text-secondary mt-1">
                      {a.sectorLabel} — {a.employeeCount.toLocaleString("sv-SE")} anställda
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-2">
                      Läs mer <ArrowRight size={14} />
                    </span>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-selling */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <AnimatedSection>
              <a href="https://allaadvokater.se" target="_blank" rel="noopener noreferrer" className="block">
                <motion.div whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }} transition={{ duration: 0.2 }} className="rounded-[12px] border border-border bg-white p-5 shadow-sm flex items-center gap-4">
                  <Scale size={28} className="text-accent shrink-0" />
                  <div>
                    <p className="font-semibold text-text-primary">Behöver du juridisk hjälp?</p>
                    <p className="text-sm text-text-secondary">Hitta en arbetsrättsjurist</p>
                  </div>
                </motion.div>
              </a>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <a href="https://allaforsakringar.com" target="_blank" rel="noopener noreferrer" className="block">
                <motion.div whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }} transition={{ duration: 0.2 }} className="rounded-[12px] border border-border bg-white p-5 shadow-sm flex items-center gap-4">
                  <Shield size={28} className="text-accent shrink-0" />
                  <div>
                    <p className="font-semibold text-text-primary">Jämför inkomstförsäkringar</p>
                    <p className="text-sm text-text-secondary">Se alla alternativ</p>
                  </div>
                </motion.div>
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[12px] bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 leading-relaxed">
            Informationen är sammanfattad i egna ord och är vägledande. Kontakta{" "}
            {agreement.parties.unions[0]} för bindande besked.{" "}
            {agreement.sources[0] && (
              <a href={agreement.sources[0].url} target="_blank" rel="noopener noreferrer" className="underline">
                Läs det officiella avtalet
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
