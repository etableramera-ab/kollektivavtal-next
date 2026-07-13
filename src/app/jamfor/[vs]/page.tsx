import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAgreementBySlug } from "@/data/agreements";
import { publicComparisons } from "@/lib/public-agreements";
import { isVerifiedAgreement } from "@/lib/verified-agreements";
import VsPageClient from "./VsPageClient";

interface PageProps {
  params: Promise<{ vs: string }>;
}

export const dynamicParams = false;

function parseVsSlug(vs: string) {
  const match = vs.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;
  return { slug1: match[1], slug2: match[2] };
}

export function generateStaticParams() {
  return publicComparisons.map((c) => {
    const sorted = [c.slug1, c.slug2].sort();
    return { vs: `${sorted[0]}-vs-${sorted[1]}` };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { vs } = await params;
  const parsed = parseVsSlug(vs);
  if (!parsed) return {};
  const a1 = getAgreementBySlug(parsed.slug1);
  const a2 = getAgreementBySlug(parsed.slug2);
  if (!a1 || !a2 || !isVerifiedAgreement(parsed.slug1) || !isVerifiedAgreement(parsed.slug2)) return {};
  return {
    title: `${a1.shortName} vs ${a2.shortName} — Jämför löner, OB och villkor 2026 | kollektivavtal.ai`,
    description: `Jämför ${a1.shortName} och ${a2.shortName}. Se skillnader i lön, OB-tillägg, semester, pension och övertid.`,
    alternates: { canonical: `https://kollektivavtal.ai/jamfor/${vs}` },
  };
}

export default async function VsPage({ params }: PageProps) {
  const { vs } = await params;
  const parsed = parseVsSlug(vs);
  if (!parsed) notFound();
  const a1 = getAgreementBySlug(parsed.slug1);
  const a2 = getAgreementBySlug(parsed.slug2);
  if (!a1 || !a2 || !isVerifiedAgreement(parsed.slug1) || !isVerifiedAgreement(parsed.slug2)) notFound();

  const rows = [
    { label: "Sektor", v1: a1.sectorLabel, v2: a2.sectorLabel },
    { label: "Anställda", v1: a1.employeeCount.toLocaleString("sv-SE"), v2: a2.employeeCount.toLocaleString("sv-SE") },
    { label: "Lägsta lön", v1: a1.keyFacts.minimumWage, v2: a2.keyFacts.minimumWage },
    { label: "OB kväll", v1: a1.keyFacts.obWeekday, v2: a2.keyFacts.obWeekday },
    { label: "OB natt", v1: a1.keyFacts.obNight, v2: a2.keyFacts.obNight },
    { label: "OB helg", v1: a1.keyFacts.obWeekend, v2: a2.keyFacts.obWeekend },
    { label: "Övertid", v1: a1.keyFacts.overtimeRate, v2: a2.keyFacts.overtimeRate },
    { label: "Semester", v1: a1.keyFacts.vacationDays, v2: a2.keyFacts.vacationDays },
    { label: "Pension", v1: a1.keyFacts.pension, v2: a2.keyFacts.pension },
    { label: "Arbetstid", v1: a1.keyFacts.workHoursPerWeek, v2: a2.keyFacts.workHoursPerWeek },
    { label: "Föräldralön", v1: a1.keyFacts.parentalPay, v2: a2.keyFacts.parentalPay },
    { label: "Uppsägningstid", v1: a1.keyFacts.noticePeriod, v2: a2.keyFacts.noticePeriod },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Vilket avtal ger högst lön — ${a1.shortName} eller ${a2.shortName}?`,
        acceptedAnswer: { "@type": "Answer", text: `Lägsta lönen i ${a1.shortName} är ${a1.keyFacts.minimumWage}. I ${a2.shortName} är den ${a2.keyFacts.minimumWage}. Jämför detaljerat i tabellen ovan.` },
      },
      {
        "@type": "Question",
        name: `Skiljer sig OB-tilläggen?`,
        acceptedAnswer: { "@type": "Answer", text: `Ja. ${a1.shortName} ger ${a1.keyFacts.obNight} natt-OB, medan ${a2.shortName} ger ${a2.keyFacts.obNight}.` },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <VsPageClient
        name1={a1.shortName}
        name2={a2.shortName}
        slug1={a1.slug}
        slug2={a2.slug}
        rows={rows}
      />
    </>
  );
}
