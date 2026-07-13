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
import { publicAgreements } from "@/lib/public-agreements";
import { createPublicAgreementView } from "@/lib/agreement-fact-status";
import { buildLocalizedUrl, getOgLocale, getOgAlternateLocales, type Locale } from "@/lib/metadata";
import AgreementPageClient from "@/app/avtal/[slug]/AgreementPageClient";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return publicAgreements.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const agreement = getAgreementBySlug(resolved.slug);
  if (!agreement || !isVerifiedAgreement(resolved.slug)) return {};

  const isEn = resolved.locale === "en";

  return {
    title: isEn
      ? `${agreement.name} 2026 — Wages, conditions & benefits | kollektivavtal.ai`
      : `${agreement.name} 2026 — Löner, OB-tillägg, semester och villkor | kollektivavtal.ai`,
    description: isEn
      ? `Overview of ${agreement.name}: parties, validity period, conditions and source status.`
      : `Översikt av ${agreement.name}: parter, giltighetsperiod, villkor och tydlig information om källunderlaget.`,
    alternates: {
      canonical: `https://kollektivavtal.ai/${resolved.locale}/avtal/${resolved.slug}`,
      languages: {
        "sv": `https://kollektivavtal.ai/avtal/${resolved.slug}`,
        "en": `https://kollektivavtal.ai/en/avtal/${resolved.slug}`,
        "ar": `https://kollektivavtal.ai/ar/avtal/${resolved.slug}`,
        "so": `https://kollektivavtal.ai/so/avtal/${resolved.slug}`,
        "fa": `https://kollektivavtal.ai/fa/avtal/${resolved.slug}`,
        "es": `https://kollektivavtal.ai/es/avtal/${resolved.slug}`,
        "pl": `https://kollektivavtal.ai/pl/avtal/${resolved.slug}`,
        "x-default": `https://kollektivavtal.ai/avtal/${resolved.slug}`,
      },
    },
    openGraph: {
      url: buildLocalizedUrl(resolved.locale as Locale, `/avtal/${resolved.slug}`),
      locale: getOgLocale(resolved.locale as Locale),
      alternateLocale: getOgAlternateLocales(resolved.locale as Locale),
    },
  };
}

export default async function LocaleAgreementPage({ params }: PageProps) {
  const resolved = await params;
  const agreement = getAgreementBySlug(resolved.slug);
  if (!agreement || !isVerifiedAgreement(resolved.slug)) notFound();
  const publicAgreement = createPublicAgreementView(agreement);

  const keyFactCards = [
    { label: "Lägsta lön", value: publicAgreement.keyFacts.minimumWage, icon: Banknote },
    { label: "Arbetstid/vecka", value: publicAgreement.keyFacts.workHoursPerWeek, icon: Clock },
    { label: "Semester", value: publicAgreement.keyFacts.vacationDays, icon: CalendarDays },
    { label: "OB natt", value: publicAgreement.keyFacts.obNight, icon: Moon },
    { label: "Föräldralön", value: publicAgreement.keyFacts.parentalPay, icon: Baby },
    { label: "Pension", value: publicAgreement.keyFacts.pension, icon: PiggyBank },
  ];

  const relatedAgreements = agreement.relatedAgreements
    .map((slug) => agreements.find((a) => a.slug === slug))
    .filter((a) => a && isVerifiedAgreement(a.slug));

  const suggestedQuestions = publicAgreement.faq.slice(0, 3).map((f) => f.question);

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
      agreement={publicAgreement}
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
