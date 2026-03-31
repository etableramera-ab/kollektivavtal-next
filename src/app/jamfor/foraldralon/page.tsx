import type { Metadata } from "next";
import { agreements } from "@/data/agreements";
import TopicComparisonPage from "@/components/TopicComparisonPage";

export const metadata: Metadata = {
  title: "Föräldralön per kollektivavtal 2026 — Löneutfyllnad alla avtal | kollektivavtal.ai",
  description: "Jämför föräldralön per kollektivavtal. Se vilka avtal som ger bäst löneutfyllnad utöver Försäkringskassans ersättning.",
};

const columns = [
  { key: "name", label: "Kollektivavtal", sortable: true },
  { key: "parentalPay", label: "Föräldralön", sortable: true },
  { key: "sector", label: "Sektor" },
];

const rows = agreements.map((a) => ({
  slug: a.slug,
  name: a.shortName,
  parentalPay: a.keyFacts.parentalPay,
  sector: a.sectorLabel,
}));

export default function Foraldralon() {
  return (
    <TopicComparisonPage
      title="Föräldralön per kollektivavtal 2026"
      subtitle="Så mycket löneutfyllnad ger ditt avtal utöver Försäkringskassan"
      aeoAnswer="Föräldralön fyller ut mellanskillnaden mellan Försäkringskassans ca 80% och din fulla lön. HÖK Kommunal ger 10% utfyllnad, statliga avtal är mer generösa. Utan kollektivavtal får du bara Försäkringskassans ersättning."
      columns={columns}
      rows={rows}
    />
  );
}
