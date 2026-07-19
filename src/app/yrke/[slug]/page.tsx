import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { publicOccupations, getPublicOccupationBySlug } from "@/lib/public-occupations";
import { isVerifiedAgreement } from "@/lib/verified-agreements";
import { publicAgreements } from "@/lib/public-agreements";
import OccupationPageClient from "./OccupationPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return publicOccupations.map((o) => ({ slug: o.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const occ = getPublicOccupationBySlug(slug);
  if (!occ) return {};
  return {
    title: `Lön som ${occ.titleGenitive} — SCB 2025 | kollektivavtal.ai`,
    description: `Medianlön, 10:e och 90:e percentil för ${occ.titleGenitive} enligt SCB:s lönestrukturstatistik 2025.`,
    alternates: { canonical: `https://kollektivavtal.ai/yrke/${occ.slug}` },
    openGraph: {
      title: `Lön som ${occ.titleGenitive} — SCB 2025`,
      description: `Medianlön ${occ.salary.median.toLocaleString("sv-SE")} kr/mån enligt SCB 2025.`,
      url: `https://kollektivavtal.ai/yrke/${occ.slug}`,
    },
  };
}

export default async function OccupationPage({ params }: PageProps) {
  const { slug } = await params;
  const occ = getPublicOccupationBySlug(slug);
  if (!occ) notFound();

  const agreement = isVerifiedAgreement(occ.agreement)
    ? publicAgreements.find((item) => item.slug === occ.agreement)
    : null;
  const relatedOccs = occ.relatedOccupations
    .map((s) => publicOccupations.find((o) => o.slug === s))
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
        agreementSlug={agreement?.slug || ""}
        relatedOccupations={relatedOccs}
      />
    </>
  );
}
