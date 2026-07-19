import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publicAgreements } from "@/lib/public-agreements";
import TopicComparisonPage from "@/components/TopicComparisonPage";

export const metadata: Metadata = {
  title: "Föräldraersättningen källgranskas | kollektivavtal.ai",
  description: "Den här jämförelsen är inte publicerad ännu.",
  robots: { index: false, follow: true },
};

const columns = [
  { key: "name", label: "Kollektivavtal", sortable: true },
  { key: "parentalPay", label: "Föräldralön", sortable: true },
  { key: "sector", label: "Sektor" },
];

const rows = publicAgreements.map((a) => ({
  slug: a.slug,
  name: a.shortName,
  parentalPay: a.keyFacts.parentalPay,
  sector: a.sectorLabel,
}));

export default function Foraldralon() {
  notFound();
  return (
    <TopicComparisonPage
      title="Föräldraersättning i källgranskade kollektivavtal"
      subtitle="Jämför kontrollerade regler om föräldralön och föräldrapenningtillägg"
      aeoAnswer="Extra ersättning vid föräldraledighet kan ligga i själva avtalet eller i en separat kollektivavtalad försäkring. Kvalifikationstid, ersättningsnivå och antal dagar varierar, så tabellen ska läsas tillsammans med villkoren för det aktuella avtalet."
      columns={columns}
      rows={rows}
    />
  );
}
