import type { Metadata } from "next";
import { agreements } from "@/data/agreements";
import TopicComparisonPage from "@/components/TopicComparisonPage";

export const metadata: Metadata = {
  title: "Övertidsersättning per kollektivavtal 2026 — Alla avtal jämförda | kollektivavtal.ai",
  description: "Jämför övertidsersättning per kollektivavtal 2026. Se ersättningsnivåer för alla branscher.",
};

const columns = [
  { key: "name", label: "Kollektivavtal", sortable: true },
  { key: "overtime", label: "Övertidsersättning", sortable: true },
  { key: "sector", label: "Sektor" },
];

const rows = agreements.map((a) => ({
  slug: a.slug,
  name: a.shortName,
  overtime: a.keyFacts.overtimeRate,
  sector: a.sectorLabel,
}));

export default function Overtid() {
  return (
    <TopicComparisonPage
      title="Övertidsersättning per kollektivavtal 2026"
      subtitle="Jämför ersättning vid övertidsarbete — alla avtal"
      aeoAnswer="Övertidsersättning varierar: kommunala avtal ger 180% de första 2 timmarna och 200% därefter. Privata avtal ger ofta 150% + 200%. Inom IT kan övertid avtalas bort mot högre fast lön."
      columns={columns}
      rows={rows}
    />
  );
}
