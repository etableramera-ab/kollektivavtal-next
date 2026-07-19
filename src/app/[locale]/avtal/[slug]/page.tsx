import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import {
  Banknote,
  Clock,
  CalendarDays,
  Moon,
  Baby,
  PiggyBank,
} from "lucide-react";
import { getAgreementBySlug } from "@/data/agreements";
import { getCourtCasesByAgreement } from "@/data/court-cases";
import { isVerifiedAgreement } from "@/lib/verified-agreements";
import { publicAgreements } from "@/lib/public-agreements";
import {
  createPublicAgreementView,
  isPublicKeyFactAvailable,
} from "@/lib/agreement-fact-status";
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
  const sourceAgreement = getAgreementBySlug(resolved.slug);
  if (!sourceAgreement || !isVerifiedAgreement(resolved.slug)) return {};
  const agreement = createPublicAgreementView(sourceAgreement);

  const isEn = resolved.locale === "en";

  return {
    title: isEn
      ? `${agreement.name} 2026 — Sources and agreement status | kollektivavtal.ai`
      : `${agreement.name} 2026 — Källor och avtalsstatus | kollektivavtal.ai`,
    description: isEn
      ? `Overview of ${agreement.name}: parties, validity period, conditions and source status.`
      : `Översikt av ${agreement.name}: parter, giltighetsperiod, villkor och tydlig information om källunderlaget.`,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `https://kollektivavtal.ai/avtal/${resolved.slug}`,
    },
  };
}

export default async function LocaleAgreementPage({ params }: PageProps) {
  const resolved = await params;
  const sourceAgreement = getAgreementBySlug(resolved.slug);
  if (!sourceAgreement || !isVerifiedAgreement(resolved.slug)) notFound();
  const agreement = createPublicAgreementView(sourceAgreement);

  const keyFactCards = [
    { key: "minimumWage" as const, label: "Lägsta lön", value: agreement.keyFacts.minimumWage, icon: Banknote },
    { key: "workHoursPerWeek" as const, label: "Arbetstid/vecka", value: agreement.keyFacts.workHoursPerWeek, icon: Clock },
    { key: "vacationDays" as const, label: "Semester", value: agreement.keyFacts.vacationDays, icon: CalendarDays },
    { key: "obNight" as const, label: "OB kväll/natt", value: agreement.keyFacts.obNight, icon: Moon },
    { key: "parentalPay" as const, label: "Föräldralön", value: agreement.keyFacts.parentalPay, icon: Baby },
    { key: "pension" as const, label: "Pension", value: agreement.keyFacts.pension, icon: PiggyBank },
  ].filter((card) => isPublicKeyFactAvailable(agreement.slug, card.key));

  const relatedAgreements = agreement.relatedAgreements
    .map((slug) => publicAgreements.find((a) => a.slug === slug))
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

  redirect(`/avtal/${resolved.slug}`);

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
        sectorLabel: a!.sectorLabel,
      }))}
      suggestedQuestions={suggestedQuestions}
      relatedCases={relatedCases}
    />
  );
}
