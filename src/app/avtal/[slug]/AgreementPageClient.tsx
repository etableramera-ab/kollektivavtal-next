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
import {
  getPublicFactSourceNote,
  isPublicKeyFactAvailable,
} from "@/lib/agreement-fact-status";
import type { Agreement } from "@/data/agreements";

const iconMap: Record<string, LucideIcon> = {
  "Lägsta lön": Banknote,
  "Arbetstid/vecka": Clock,
  Semester: CalendarDays,
  "OB kväll/natt": Moon,
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

  const hasFact = (key: keyof Agreement["keyFacts"]) =>
    isPublicKeyFactAvailable(agreement.slug, key);
  const factSourceNote = getPublicFactSourceNote(agreement.slug);
  const obRows = [
    { key: "obWeekday" as const, tid: "Vardag", tillagg: agreement.keyFacts.obWeekday },
    { key: "obNight" as const, tid: "Kväll/natt", tillagg: agreement.keyFacts.obNight },
    { key: "obWeekend" as const, tid: "Helg", tillagg: agreement.keyFacts.obWeekend },
    { key: "obHoliday" as const, tid: "Helgdag/storhelg", tillagg: agreement.keyFacts.obHoliday },
  ].filter((row) => hasFact(row.key));
  const hasCoreFacts = ["minimumWage", "workHoursPerWeek", "pension"].some(
    (key) => hasFact(key as keyof Agreement["keyFacts"])
  );
  const hasVacationFact = hasFact("vacationDays");
  const hasParentalFact = hasFact("parentalPay");
  const hasLeaveFacts = hasVacationFact || hasParentalFact;
  const leaveSectionTitle =
    hasVacationFact && hasParentalFact
      ? "Semester och föräldraledighet"
      : hasVacationFact
        ? "Semester"
        : "Föräldraersättning";

  return (
    <>
      {/* Hero / Breadcrumb */}
      <section style={{ backgroundImage: `linear-gradient(rgba(22,75,63,0.9), rgba(22,75,63,0.9)), url('${getAgreementHeroImage(agreement.slug, agreement.sectorLabel)}')`, backgroundSize: "cover", backgroundPosition: "center" }} className="text-white pt-10 pb-10 sm:pb-12">
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
              Avtalsområde inom {agreement.sectorLabel.toLowerCase()}
            </p>

            <p className="mt-3 text-[13px] text-white/70">
              Giltighet: {agreement.validPeriod}
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

      {/* Nyckeltal visas först efter direkt matchning mot originalavtalet. */}
      {keyFactCards.length > 0 ? (
      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 items-stretch">
            {keyFactCards.map((card, i) => {
              const Icon = iconMap[card.label] || Banknote;
              return (
                <AnimatedSection key={card.label} delay={i * 0.05}>
                  <div className="rounded-sm border border-border bg-card p-4 sm:p-5 h-full flex flex-col">
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
      ) : (
        <section className="pb-12 sm:pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-r-lg border-l-[3px] border-l-accent bg-[#EFE7DA] p-5">
              <p className="font-semibold text-text-primary">Detaljerade villkor granskas</p>
              <p className="mt-1 text-[15px] leading-relaxed text-text-secondary">
                Lön, OB, arbetstid, ledighet och pension visas igen när varje uppgift har
                kontrollerats direkt mot originalavtalet.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* AI-chatt */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-[#E8EEE9] border border-[#C9D5CF] rounded-sm p-6 sm:p-8">
              <h2 className="text-[20px] font-semibold text-text-primary mb-1">Fråga AI-guiden om {agreement.shortName}</h2>
              <p className="text-[15px] text-text-secondary mb-5">Guiden svarar bara när källunderlaget räcker</p>
              <AgreementChat
                agreementSlug={agreement.slug}
                agreementName={agreement.shortName}
                suggestedQuestions={suggestedQuestions}
              />
            </div>
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
                Vi har ett aktuellt avtalsunderlag för {agreement.shortName}. Informationen
                sammanfattas i egna ord och publiceras stegvis när den har kontrollerats.
              </p>
              {hasCoreFacts && (
                <div className="space-y-2">
                  {hasFact("minimumWage") && (
                    <p>Lägsta lön: {agreement.keyFacts.minimumWage}.</p>
                  )}
                  {hasFact("workHoursPerWeek") && (
                    <p>Arbetstid: {agreement.keyFacts.workHoursPerWeek}.</p>
                  )}
                  {hasFact("pension") && (
                    <p>Pension: {agreement.keyFacts.pension}.</p>
                  )}
                </div>
              )}
            </div>
            <dl className="mt-6 grid gap-4 rounded-sm border border-border bg-background p-5 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-text-primary">Arbetstagarparter</dt>
                <dd className="mt-1 leading-relaxed text-text-secondary">
                  {agreement.parties.unions.join(", ")}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-text-primary">Arbetsgivarparter</dt>
                <dd className="mt-1 leading-relaxed text-text-secondary">
                  {agreement.parties.employers.join(", ")}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-semibold text-text-primary">Giltighet eller aktuell lydelse</dt>
                <dd className="mt-1 leading-relaxed text-text-secondary">
                  {agreement.validPeriod}
                </dd>
              </div>
            </dl>
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
            {factSourceNote && (
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                Faktagranskad {factSourceNote.reviewedAt} mot {factSourceNote.sections}.{" "}
                <a
                  href={factSourceNote.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent hover:underline"
                >
                  {factSourceNote.label}
                </a>
              </p>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Insurance ad — mid-article */}
      <section className="pb-6">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <a
            href={`https://allaforsakringar.com?utm_source=kollektivavtal&utm_medium=mid-article&utm_campaign=avtal-${agreement.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-r-[10px] border-l-[3px] border-l-accent bg-background p-5 flex items-center gap-4 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all"
          >
            <div className="shrink-0 w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center">
              <Shield size={20} className="text-accent" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-text-primary text-[17px]">Har du rätt försäkringsskydd?</p>
              <p className="text-[15px] text-text-secondary mt-0.5">Skyddet kan komma från flera håll. Jämför villkor och kontrollera vad som gäller för dig.</p>
              <p className="text-[15px] font-semibold text-accent mt-1">Jämför försäkringar gratis →</p>
            </div>
            <span className="text-[11px] text-[#9CA3AF] shrink-0 self-start">Annons</span>
          </a>
        </div>
      </section>

      {/* Lönetabell */}
      {agreement.wageTable.length > 0 ? (
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-6" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
              Lönetabell — {agreement.shortName}
            </h2>
            <WageDisclaimer isVerified={isVerified} />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="hidden md:block rounded-sm border border-border bg-card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-background">
                    <th className="text-left p-4 font-semibold text-text-primary">Kategori</th>
                    <th className="text-left p-4 font-semibold text-text-primary">Lägsta lön</th>
                    <th className="text-left p-4 font-semibold text-text-secondary">Kommentar</th>
                  </tr>
                </thead>
                <tbody>
                  {agreement.wageTable.map((row) => (
                    <tr key={row.role} className="border-b border-border last:border-0">
                      <td className="p-4 font-medium text-text-primary">{row.role}</td>
                      <td className="p-4 text-text-primary">{row.minimum}</td>
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
                <div className="rounded-sm border border-border bg-card p-4">
                  <p className="font-semibold text-text-primary text-sm">{row.role}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{row.comment}</p>
                  <div className="flex gap-4 mt-3">
                    <div>
                      <p className="text-xs text-text-secondary">Lägsta</p>
                      <p className="text-sm font-medium text-text-primary">{row.minimum}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <p className="text-xs text-text-secondary mt-3">
            Lägstanivåerna bygger på det angivna avtalsunderlaget. Kontrollera alltid aktuellt
            belopp hos avtalsparterna.
          </p>
        </div>
      </section>
      ) : hasFact("minimumWage") ? (
        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="border-l-[3px] border-l-accent bg-[#EFE7DA] p-5">
              <p className="font-semibold text-text-primary">Lönebestämmelser</p>
              <p className="text-[15px] text-text-secondary mt-1 leading-relaxed">
                {agreement.keyFacts.minimumWage}.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="border-l-[3px] border-l-accent bg-[#EFE7DA] p-5">
              <p className="font-semibold text-text-primary">Lönenivåer granskas</p>
              <p className="text-[15px] text-text-secondary mt-1 leading-relaxed">
                Vi publicerar inte en lönetabell för {agreement.shortName} förrän nivåerna har
                kontrollerats mot rätt del av avtalet. Kontakta avtalsparterna för aktuella belopp.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* OB-tillägg */}
      {obRows.length > 0 && (
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-6" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>OB-tillägg</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="rounded-sm border border-border bg-card overflow-hidden">
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
      )}

      {/* Övertid */}
      {hasFact("overtimeRate") && (
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-4" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>Övertidsersättning</h2>
            <p className="text-text-primary">{agreement.keyFacts.overtimeRate}</p>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* Semester och ledighet */}
      {hasLeaveFacts && (
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-4" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>{leaveSectionTitle}</h2>
            <div className="space-y-2 text-text-primary leading-relaxed">
              {hasVacationFact && (
                <p>Semester: {agreement.keyFacts.vacationDays}.</p>
              )}
              {hasParentalFact && (
                <p>Föräldraersättning: {agreement.keyFacts.parentalPay}.</p>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* Uppsägningstid */}
      {hasFact("noticePeriod") && (
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-4" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>Uppsägningstid</h2>
            <p className="text-text-primary leading-relaxed">
              {agreement.keyFacts.noticePeriod}.
            </p>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* Pension */}
      {hasFact("pension") && (
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-[32px] text-text-primary mb-4" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>Pension</h2>
            <p className="text-text-primary leading-relaxed">
              {agreement.keyFacts.pension}.
            </p>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* FAQ */}
      {agreement.faq.length > 0 && (
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
      )}

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
                    <div className="rounded-sm border border-border bg-card p-4 hover:border-primary transition-colors">
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
      {relatedAgreements.length > 0 && (
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
                    className="rounded-sm border border-border bg-card p-4"
                  >
                    <h3 className="font-semibold text-text-primary">{a.shortName}</h3>
                    <p className="text-xs text-text-secondary mt-1">
                      {a.sectorLabel}
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
      )}

      {/* Cross-selling */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <AnimatedSection>
              <a href="https://allaadvokater.se" target="_blank" rel="noopener noreferrer" className="block">
                <motion.div whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }} transition={{ duration: 0.2 }} className="rounded-[12px] border border-border bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center gap-4">
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
                <motion.div whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }} transition={{ duration: 0.2 }} className="rounded-[12px] border border-border bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center gap-4">
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
            Informationen är sammanfattad i egna ord och är vägledande. Kontakta
            avtalsparterna för bindande besked.{" "}
            {agreement.sources[0] && (
              <a href={agreement.sources[0].url} target="_blank" rel="noopener noreferrer" className="underline">
                Öppna angiven källa
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
