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
import { getAgreementBySlug } from "@/data/agreements";
import { getCourtCasesByAgreement } from "@/data/court-cases";
import { isVerifiedAgreement } from "@/lib/verified-agreements";
import { publicAgreements } from "@/lib/public-agreements";
import {
  createPublicAgreementView,
  isPublicKeyFactAvailable,
} from "@/lib/agreement-fact-status";
import AgreementPageClient from "./AgreementPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return publicAgreements.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sourceAgreement = getAgreementBySlug(slug);
  if (!sourceAgreement || !isVerifiedAgreement(slug)) return {};
  const agreement = createPublicAgreementView(sourceAgreement);

  return {
    title: `${agreement.name} 2026 — Källor och avtalsstatus | kollektivavtal.ai`,
    description: `Översikt av ${agreement.name}: parter, giltighetsperiod, villkor och tydlig information om källunderlaget.`,
    alternates: {
      canonical: `https://kollektivavtal.ai/avtal/${agreement.slug}`,
      languages: {
        sv: `https://kollektivavtal.ai/avtal/${agreement.slug}`,
        "x-default": `https://kollektivavtal.ai/avtal/${agreement.slug}`,
      },
    },
    openGraph: {
      title: `${agreement.name} 2026 — Källor och avtalsstatus`,
      description: `Sammanfattning av ${agreement.name} på klarspråk med tydlig information om källunderlaget.`,
      url: `https://kollektivavtal.ai/avtal/${agreement.slug}`,
      locale: "sv_SE",
    },
  };
}

export default async function AgreementPage({ params }: PageProps) {
  const { slug } = await params;
  const sourceAgreement = getAgreementBySlug(slug);
  if (!sourceAgreement || !isVerifiedAgreement(slug)) notFound();
  const agreement = createPublicAgreementView(sourceAgreement);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hem",
        item: "https://kollektivavtal.ai",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kollektivavtal",
        item: "https://kollektivavtal.ai/avtal",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: agreement.name,
        item: `https://kollektivavtal.ai/avtal/${agreement.slug}`,
      },
    ],
  };

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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
    </>
  );
}
