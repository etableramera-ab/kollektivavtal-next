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
import { buildHreflangs, getOgAlternateLocales } from "@/lib/metadata";
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
  const agreement = getAgreementBySlug(slug);
  if (!agreement || !isVerifiedAgreement(slug)) return {};

  return {
    title: `${agreement.name} 2026 — Löner, OB-tillägg, semester och villkor | kollektivavtal.ai`,
    description: `Översikt av ${agreement.name}: parter, giltighetsperiod, villkor och tydlig information om källunderlaget.`,
    alternates: {
      canonical: `https://kollektivavtal.ai/avtal/${agreement.slug}`,
      languages: buildHreflangs(`/avtal/${agreement.slug}`),
    },
    openGraph: {
      title: `${agreement.name} 2026 — Löner, OB-tillägg och villkor`,
      description: `Sammanfattning av ${agreement.name} på klarspråk med tydlig information om källunderlaget.`,
      url: `https://kollektivavtal.ai/avtal/${agreement.slug}`,
      locale: "sv_SE",
      alternateLocale: getOgAlternateLocales("sv"),
    },
  };
}

export default async function AgreementPage({ params }: PageProps) {
  const { slug } = await params;
  const agreement = getAgreementBySlug(slug);
  if (!agreement || !isVerifiedAgreement(slug)) notFound();
  const publicAgreement = createPublicAgreementView(agreement);

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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
    </>
  );
}
