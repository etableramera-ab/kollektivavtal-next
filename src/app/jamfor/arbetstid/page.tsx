import type { Metadata } from "next";
import { agreements } from "@/data/agreements";
import TopicComparisonPage from "@/components/TopicComparisonPage";

export const metadata: Metadata = {
  title: "Arbetstid per kollektivavtal 2026 — Veckoarbetstid och förkortning | kollektivavtal.ai",
  description: "Jämför veckoarbetstid per kollektivavtal 2026. Bank och försäkring har 38,75 tim, stat 39,75 tim, de flesta 40 tim.",
};

const columns = [
  { key: "name", label: "Kollektivavtal", sortable: true },
  { key: "hours", label: "Arbetstid/vecka", sortable: true },
  { key: "sector", label: "Sektor" },
];

const rows = agreements.map((a) => ({
  slug: a.slug,
  name: a.shortName,
  hours: a.keyFacts.workHoursPerWeek,
  sector: a.sectorLabel,
}));

export default function Arbetstid() {
  return (
    <TopicComparisonPage
      title="Arbetstid per kollektivavtal 2026"
      subtitle="Jämför veckoarbetstid och arbetstidsförkortning"
      aeoAnswer="De flesta avtal har 40 timmars arbetsvecka. Bank och försäkring sticker ut med 38,75 timmar. Statliga avtal ger 39 timmar 45 minuter. Teknikavtalet har tidbank med 92 minuter per vecka i arbetstidsförkortning."
      columns={columns}
      rows={rows}
    />
  );
}
