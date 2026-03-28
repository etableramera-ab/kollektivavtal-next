import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courtCases, getCourtCaseById } from "@/data/court-cases";
import { getAgreementBySlug } from "@/data/agreements";
import CourtCaseClient from "./CourtCaseClient";

interface PageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return courtCases.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const courtCase = getCourtCaseById(params.id);
  if (!courtCase) return {};

  return {
    title: `${courtCase.caseNumber} — ${courtCase.title} | kollektivavtal.ai`,
    description: courtCase.summary,
    openGraph: {
      title: `${courtCase.caseNumber} — ${courtCase.title}`,
      description: courtCase.summary,
      url: `https://kollektivavtal.ai/rattsfall/${courtCase.id}`,
    },
  };
}

export default function CourtCasePage({ params }: PageProps) {
  const courtCase = getCourtCaseById(params.id);
  if (!courtCase) notFound();

  const relatedAgreement = courtCase.relatedAgreement
    ? getAgreementBySlug(courtCase.relatedAgreement)
    : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${courtCase.caseNumber} — ${courtCase.title}`,
    datePublished: courtCase.date,
    author: {
      "@type": "Organization",
      name: "kollektivavtal.ai / Etablera Mera AB",
    },
    publisher: {
      "@type": "Organization",
      name: "kollektivavtal.ai",
      url: "https://kollektivavtal.ai",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <CourtCaseClient
        courtCase={courtCase}
        relatedAgreement={
          relatedAgreement
            ? { slug: relatedAgreement.slug, name: relatedAgreement.name, shortName: relatedAgreement.shortName }
            : null
        }
      />
    </>
  );
}
