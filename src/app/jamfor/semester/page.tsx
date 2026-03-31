import type { Metadata } from "next";
import { agreements } from "@/data/agreements";
import TopicComparisonPage from "@/components/TopicComparisonPage";

export const metadata: Metadata = {
  title: "Semester per kollektivavtal 2026 — Antal dagar och semestertillägg | kollektivavtal.ai",
  description: "Jämför semestervillkor per kollektivavtal 2026. Se antal dagar, extra vid ålder och semestertillägg.",
};

const columns = [
  { key: "name", label: "Kollektivavtal", sortable: true },
  { key: "days", label: "Semesterdagar", sortable: true },
  { key: "sector", label: "Sektor" },
];

const rows = agreements.map((a) => ({
  slug: a.slug,
  name: a.shortName,
  days: a.keyFacts.vacationDays,
  sector: a.sectorLabel,
}));

export default function Semester() {
  return (
    <TopicComparisonPage
      title="Semester per kollektivavtal 2026"
      subtitle="Jämför semesterdagar och extra vid ålder"
      aeoAnswer="De flesta avtal ger 25 semesterdagar — lagens minimum. Statligt anställda har upp till 35 dagar från 40 år. Kommunanställda får 31 dagar från 40 och 32 från 50. Privata avtal ger oftast bara 25 dagar."
      columns={columns}
      rows={rows}
    />
  );
}
