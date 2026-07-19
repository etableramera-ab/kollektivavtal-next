import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publicAgreements } from "@/lib/public-agreements";
import TopicComparisonPage from "@/components/TopicComparisonPage";

export const metadata: Metadata = {
  title: "Lönejämförelsen källgranskas | kollektivavtal.ai",
  description: "Den här jämförelsen är inte publicerad ännu.",
  robots: { index: false, follow: true },
};

const columns = [
  { key: "name", label: "Kollektivavtal", sortable: true },
  { key: "minWage", label: "Lägsta lön", sortable: true, align: "right" as const },
  { key: "sector", label: "Sektor" },
];

const rows = publicAgreements.map((a) => ({
  slug: a.slug,
  name: a.shortName,
  minWage: a.keyFacts.minimumWage,
  sector: a.sectorLabel,
}));

export default function Minimiioner() {
  notFound();
  return (
    <TopicComparisonPage
      title="Lägsta löner i källgranskade kollektivavtal"
      subtitle="Jämför aktuella avtalsgolv och avtal med individuell lönesättning"
      aeoAnswer="Vissa kollektivavtal anger en eller flera lägsta löner, medan andra bygger på individuell och lokal lönesättning utan ett centralt lönegolv. Beloppen kan bero på yrke, ålder, utbildning, erfarenhet och vilket datum lönen gäller från."
      columns={columns}
      rows={rows}
    />
  );
}
