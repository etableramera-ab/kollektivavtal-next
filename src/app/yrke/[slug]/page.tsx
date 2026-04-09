import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { occupations, getOccupationBySlug } from "@/data/occupations";
import { getAgreementBySlug } from "@/data/agreements";
import OccupationPageClient from "./OccupationPageClient";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return occupations.map((o) => ({ slug: o.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const occ = getOccupationBySlug(params.slug);
  if (!occ) return {};
  return {
    title: `Lön som ${occ.titleGenitive} 2026 — Minimilön, OB-tillägg och villkor | kollektivavtal.ai`,
    description: `Vad tjänar en ${occ.titleGenitive} 2026? Lägsta lön enligt kollektivavtal är ${occ.salary.minimum.toLocaleString("sv-SE")} kr. Medianlön ${occ.salary.median.toLocaleString("sv-SE")} kr. Se OB-tillägg, semester, pension och mer.`,
    alternates: { canonical: `https://kollektivavtal.ai/yrke/${occ.slug}` },
    openGraph: {
      title: `Lön som ${occ.titleGenitive} 2026`,
      description: `Medianlön ${occ.salary.median.toLocaleString("sv-SE")} kr/mån. Se OB, pension och villkor.`,
      url: `https://kollektivavtal.ai/yrke/${occ.slug}`,
    },
  };
}

export default function OccupationPage({ params }: PageProps) {
  const occ = getOccupationBySlug(params.slug);
  if (!occ) notFound();

  const agreement = getAgreementBySlug(occ.agreement);
  const relatedOccs = occ.relatedOccupations
    .map((s) => occupations.find((o) => o.slug === s))
    .filter(Boolean)
    .map((o) => ({ slug: o!.slug, title: o!.title, median: o!.salary.median }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: occ.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hem", item: "https://kollektivavtal.ai" },
      { "@type": "ListItem", position: 2, name: "Yrken", item: "https://kollektivavtal.ai/yrke" },
      { "@type": "ListItem", position: 3, name: occ.title, item: `https://kollektivavtal.ai/yrke/${occ.slug}` },
    ],
  };

  const occupationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Occupation",
    name: occ.title,
    description: occ.description,
    occupationLocation: { "@type": "Country", name: "Sverige" },
    estimatedSalary: {
      "@type": "MonetaryAmountDistribution",
      name: "Månadslön",
      currency: "SEK",
      median: occ.salary.median,
      percentile10: occ.salary.minimum,
      percentile90: occ.salary.p90,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(occupationJsonLd) }} />
      <OccupationPageClient
        occupation={occ}
        agreementName={agreement?.name || ""}
        agreementShortName={agreement?.shortName || ""}
        agreementSlug={occ.agreement}
        relatedOccupations={relatedOccs}
      />
    </>
  );
}
