import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Banknote,
  Clock,
  CalendarDays,
  Moon,
  Baby,
  PiggyBank,
} from "lucide-react";
import { agreements, getAgreementBySlug } from "@/data/agreements";
import { getCourtCasesByAgreement } from "@/data/court-cases";
import { isVerifiedAgreement } from "@/lib/verified-agreements";
import AgreementPageClient from "@/app/avtal/[slug]/AgreementPageClient";

interface PageProps {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  return agreements.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const agreement = getAgreementBySlug(params.slug);
  if (!agreement) return {};

  const isEn = params.locale === "en";

  return {
    title: isEn
      ? `${agreement.name} 2026 — Wages, conditions & benefits | kollektivavtal.ai`
      : `${agreement.name} 2026 — Löner, OB-tillägg, semester och villkor | kollektivavtal.ai`,
    description: isEn
      ? `Everything about ${agreement.name}: wages, benefits, vacation, pension and more. Covers ${agreement.employeeCount.toLocaleString("en")} employees.`
      : `Allt om ${agreement.name}: löner från ${agreement.keyFacts.minimumWage}, OB-tillägg, semester, pension och mer. Gäller ${agreement.employeeCount.toLocaleString("sv-SE")} anställda.`,
    alternates: {
      canonical: `https://kollektivavtal.ai/avtal/${params.slug}`,
      languages: {
        sv: `https://kollektivavtal.ai/avtal/${params.slug}`,
        en: `https://kollektivavtal.ai/en/avtal/${params.slug}`,
      },
    },
  };
}

export default function LocaleAgreementPage({ params }: PageProps) {
  const agreement = getAgreementBySlug(params.slug);
  if (!agreement) notFound();

  const keyFactCards = [
    { label: "Lägsta lön", value: agreement.keyFacts.minimumWage, icon: Banknote },
    { label: "Arbetstid/vecka", value: agreement.keyFacts.workHoursPerWeek, icon: Clock },
    { label: "Semester", value: agreement.keyFacts.vacationDays, icon: CalendarDays },
    { label: "OB natt", value: agreement.keyFacts.obNight, icon: Moon },
    { label: "Föräldralön", value: agreement.keyFacts.parentalPay, icon: Baby },
    { label: "Pension", value: agreement.keyFacts.pension, icon: PiggyBank },
  ];

  const relatedAgreements = agreement.relatedAgreements
    .map((slug) => agreements.find((a) => a.slug === slug))
    .filter(Boolean);

  const suggestedQuestions = agreement.faq.slice(0, 3).map((f) => f.question);

  const relatedCases = getCourtCasesByAgreement(agreement.slug).map((c) => ({
    id: c.id,
    caseNumber: c.caseNumber,
    date: c.date,
    title: c.title,
    summary: c.summary,
    topic: c.topic,
    outcome: c.outcome,
  }));

  return (
    <AgreementPageClient
      agreement={agreement}
      isVerified={isVerifiedAgreement(agreement.slug)}
      keyFactCards={keyFactCards.map((c) => ({
        label: c.label,
        value: c.value,
        iconName: c.icon.displayName || c.label,
      }))}
      relatedAgreements={relatedAgreements.map((a) => ({
        slug: a!.slug,
        name: a!.name,
        shortName: a!.shortName,
        employeeCount: a!.employeeCount,
        sectorLabel: a!.sectorLabel,
      }))}
      suggestedQuestions={suggestedQuestions}
      relatedCases={relatedCases}
    />
  );
}
