"use client";

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
  ChevronRight,
  ArrowRight,
  Scale,
  Shield,
  ExternalLink,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import FaqAccordion from "@/components/FaqAccordion";
import AgreementChat from "@/components/AgreementChat";
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

interface Props {
  agreement: Agreement;
  keyFactCards: KeyFactCard[];
  relatedAgreements: RelatedAgreement[];
  suggestedQuestions: string[];
}

export default function AgreementPageClient({
  agreement,
  keyFactCards,
  relatedAgreements,
  suggestedQuestions,
}: Props) {
  const obRows = [
    { tid: "Vardagskväll", tillagg: agreement.keyFacts.obWeekday },
    { tid: "Natt", tillagg: agreement.keyFacts.obNight },
    { tid: "Lördag/söndag", tillagg: agreement.keyFacts.obWeekend },
    { tid: "Storhelg", tillagg: agreement.keyFacts.obHoliday },
  ];

  return (
    <>
      {/* Hero / Breadcrumb */}
      <section className="bg-primary text-white py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Hem</Link>
              <ChevronRight size={14} />
              <Link href="/avtal" className="hover:text-white transition-colors">Kollektivavtal</Link>
              <ChevronRight size={14} />
              <span className="text-white/90">{agreement.shortName}</span>
            </nav>

            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              {agreement.name}
            </h1>
            <p className="mt-2 text-base sm:text-lg text-white/80">
              Gäller {agreement.employeeCount.toLocaleString("sv-SE")} anställda inom{" "}
              {agreement.sectorLabel.toLowerCase()}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-[6px] bg-white/15 px-3 py-1 text-xs font-medium">
                {agreement.sectorLabel}
              </span>
              <span className="rounded-[6px] bg-white/15 px-3 py-1 text-xs font-medium">
                {agreement.validPeriod}
              </span>
              {agreement.parties.unions.map((u) => (
                <span key={u} className="rounded-[6px] bg-white/15 px-3 py-1 text-xs font-medium">
                  {u}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* AEO answer box */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-[12px] bg-blue-50 border border-blue-200 p-5 sm:p-6">
              <p className="text-sm sm:text-base text-blue-900 leading-relaxed">
                {agreement.summary}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Nyckeltal */}
      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {keyFactCards.map((card, i) => {
              const Icon = iconMap[card.label] || Banknote;
              return (
                <AnimatedSection key={card.label} delay={i * 0.05}>
                  <div className="rounded-[12px] border border-border bg-white p-4 sm:p-5 shadow-sm">
                    <Icon size={20} className="text-accent mb-2" />
                    <p className="text-xs text-text-secondary">{card.label}</p>
                    <p className="text-sm font-semibold text-text-primary mt-0.5">{card.value}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sammanfattning */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4">
              Om {agreement.shortName}
            </h2>
            <div className="text-text-primary leading-relaxed space-y-4">
              <p>{agreement.summary}</p>
              <p>
                Avtalsparterna är {agreement.parties.unions.join(", ")} på arbetstagarsidan och{" "}
                {agreement.parties.employers.join(", ")} på arbetsgivarsidan.
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
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-6">
              Lönetabell — {agreement.shortName}
            </h2>
          </AnimatedSection>

          {/* Desktop table */}
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

          {/* Mobile cards */}
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
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-6">OB-tillägg</h2>
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
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4">Övertidsersättning</h2>
            <p className="text-text-primary">{agreement.keyFacts.overtimeRate}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Semester och ledighet */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4">Semester och ledighet</h2>
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
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4">Pension</h2>
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
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-6">
              Vanliga frågor om {agreement.shortName}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <FaqAccordion items={agreement.faq} />
          </AnimatedSection>
        </div>
      </section>

      {/* AI-chatt */}
      <section className="py-12 sm:py-16">
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

      {/* Relaterade avtal */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-6">Se även</h2>
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
              <a
                href="https://allaadvokater.se"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
                  transition={{ duration: 0.2 }}
                  className="rounded-[12px] border border-border bg-white p-5 shadow-sm flex items-center gap-4"
                >
                  <Scale size={28} className="text-accent shrink-0" />
                  <div>
                    <p className="font-semibold text-text-primary">Behöver du juridisk hjälp?</p>
                    <p className="text-sm text-text-secondary">Hitta en arbetsrättsjurist</p>
                  </div>
                </motion.div>
              </a>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <a
                href="https://allaforsakringar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
                  transition={{ duration: 0.2 }}
                  className="rounded-[12px] border border-border bg-white p-5 shadow-sm flex items-center gap-4"
                >
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
              <a
                href={agreement.sources[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Läs det officiella avtalet
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
