import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { isVerifiedAgreement } from "@/lib/verified-agreements";
import { publicAgreements } from "@/lib/public-agreements";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return publicAgreements.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const agreement = publicAgreements.find((item) => item.slug === resolved.slug);
  if (!agreement || !isVerifiedAgreement(resolved.slug)) return {};

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
  const agreement = publicAgreements.find((item) => item.slug === resolved.slug);
  if (!agreement) notFound();
  if (!isVerifiedAgreement(resolved.slug)) notFound();

  redirect(`/avtal/${resolved.slug}`);
}
