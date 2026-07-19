import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publicAgreements } from "@/lib/public-agreements";
import TopicComparisonPage from "@/components/TopicComparisonPage";

export const metadata: Metadata = {
  title: "Arbetstidsjämförelsen källgranskas | kollektivavtal.ai",
  description: "Den här jämförelsen är inte publicerad ännu.",
  robots: { index: false, follow: true },
};

const columns = [
  { key: "name", label: "Kollektivavtal", sortable: true },
  { key: "hours", label: "Arbetstid/vecka", sortable: true },
  { key: "sector", label: "Sektor" },
];

const rows = publicAgreements.map((a) => ({
  slug: a.slug,
  name: a.shortName,
  hours: a.keyFacts.workHoursPerWeek,
  sector: a.sectorLabel,
}));

export default function Arbetstid() {
  notFound();
  return (
    <TopicComparisonPage
      title="Arbetstid i källgranskade kollektivavtal"
      subtitle="Jämför ordinarie arbetstid och viktiga undantag"
      aeoAnswer="Ordinarie arbetstid varierar med arbetstidens förläggning. Dagtid, skift, natt och helgarbete kan ha olika heltidsmått, och vissa avtal ger dessutom arbetstidsförkortning eller tidbank. Tabellen visar en kort sammanfattning av de kontrollerade reglerna."
      columns={columns}
      rows={rows}
    />
  );
}
