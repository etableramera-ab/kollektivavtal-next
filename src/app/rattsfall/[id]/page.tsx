import { permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { courtCases, getCourtCaseById } from "@/data/court-cases";
import CourtCaseClient from "./CourtCaseClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate static pages for cases from 2020+ (faster builds)
export function generateStaticParams() {
  return courtCases
    .filter((c) => c.year >= 2020)
    .map((c) => ({ id: c.id }));
}

// Allow dynamic rendering for older cases
export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const courtCase = getCourtCaseById(id);
  if (!courtCase) return {};

  const desc = courtCase.summary
    ? courtCase.summary.substring(0, 155) + (courtCase.summary.length > 155 ? "..." : "")
    : `${courtCase.caseNumber} — dom från Arbetsdomstolen.`;

  return {
    title: `${courtCase.caseNumber} — ${courtCase.title || "Arbetsdomstolen"} | kollektivavtal.ai`,
    description: desc,
    alternates: { canonical: `https://kollektivavtal.ai/rattsfall/${courtCase.id}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${courtCase.caseNumber} — ${courtCase.title || "Arbetsdomstolen"}`,
      description: desc,
      url: `https://kollektivavtal.ai/rattsfall/${courtCase.id}`,
    },
  };
}

export default async function CourtCasePage({ params }: PageProps) {
  const { id } = await params;
  const courtCase = getCourtCaseById(id);
  if (!courtCase) permanentRedirect("/rattsfall");

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
        relatedAgreement={null}
      />
    </>
  );
}
