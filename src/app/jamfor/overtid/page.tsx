import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publicAgreements } from "@/lib/public-agreements";
import TopicComparisonPage from "@/components/TopicComparisonPage";

export const metadata: Metadata = {
  title: "Övertidsjämförelsen källgranskas | kollektivavtal.ai",
  description: "Den här jämförelsen är inte publicerad ännu.",
  robots: { index: false, follow: true },
};

const columns = [
  { key: "name", label: "Kollektivavtal", sortable: true },
  { key: "overtime", label: "Övertidsersättning", sortable: true },
  { key: "sector", label: "Sektor" },
];

const rows = publicAgreements.map((a) => ({
  slug: a.slug,
  name: a.shortName,
  overtime: a.keyFacts.overtimeRate,
  sector: a.sectorLabel,
}));

export default function Overtid() {
  notFound();
  return (
    <TopicComparisonPage
      title="Övertidsersättning i källgranskade kollektivavtal"
      subtitle="Jämför kontrollerade regler för betalning och kompensationsledighet"
      aeoAnswer="Övertid kan ersättas med ett tillägg, en formel på månadslönen, en procentsats eller kompensationsledighet. Nivån beror ofta på när arbetet utförs och om tiden räknas som enkel eller kvalificerad övertid."
      columns={columns}
      rows={rows}
    />
  );
}
