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
import AgreementPageClient from "./AgreementPageClient";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return agreements.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const agreement = getAgreementBySlug(params.slug);
  if (!agreement) return {};

  return {
    title: `${agreement.name} 2026 — Löner, OB-tillägg, semester och villkor | kollektivavtal.ai`,
    description: `Allt om ${agreement.name}: löner från ${agreement.keyFacts.minimumWage}, OB-tillägg, semester, pension och mer. Gäller ${agreement.employeeCount.toLocaleString("sv-SE")} anställda.`,
    openGraph: {
      title: `${agreement.name} 2026 — Löner, OB-tillägg och villkor`,
      description: `Sammanfattning av ${agreement.name} på klarspråk. Gäller ${agreement.employeeCount.toLocaleString("sv-SE")} anställda inom ${agreement.sectorLabel.toLowerCase()}.`,
      url: `https://kollektivavtal.ai/avtal/${agreement.slug}`,
    },
  };
}

export default function AgreementPage({ params }: PageProps) {
  const agreement = getAgreementBySlug(params.slug);
  if (!agreement) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: agreement.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <AgreementPageClient
        agreement={agreement}
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
