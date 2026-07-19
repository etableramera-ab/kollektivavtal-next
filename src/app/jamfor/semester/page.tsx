import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publicAgreements } from "@/lib/public-agreements";
import TopicComparisonPage from "@/components/TopicComparisonPage";

export const metadata: Metadata = {
  title: "Semesterjämförelsen källgranskas | kollektivavtal.ai",
  description: "Den här jämförelsen är inte publicerad ännu.",
  robots: { index: false, follow: true },
};

const columns = [
  { key: "name", label: "Kollektivavtal", sortable: true },
  { key: "days", label: "Semesterdagar", sortable: true },
  { key: "sector", label: "Sektor" },
];

const rows = publicAgreements.map((a) => ({
  slug: a.slug,
  name: a.shortName,
  days: a.keyFacts.vacationDays,
  sector: a.sectorLabel,
}));

export default function Semester() {
  notFound();
  return (
    <TopicComparisonPage
      title="Semester i källgranskade kollektivavtal"
      subtitle="Jämför semesterregler som har kontrollerats mot aktuella avtal"
      aeoAnswer="Semesterreglerna skiljer sig mellan avtalsområden och kan påverkas av bland annat ålder, anställningsform och hur semestern tjänas in. Tabellen visar endast uppgifter som har kontrollerats mot aktuella avtalskällor."
      columns={columns}
      rows={rows}
    />
  );
}
