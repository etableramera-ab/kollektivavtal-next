import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publicAgreements } from "@/lib/public-agreements";
import { parseObNumber } from "@/data/comparisons";
import TopicComparisonPage from "@/components/TopicComparisonPage";

export const metadata: Metadata = {
  title: "OB-jämförelsen källgranskas | kollektivavtal.ai",
  description: "Den här jämförelsen är inte publicerad ännu.",
  robots: { index: false, follow: true },
};

const columns = [
  { key: "name", label: "Kollektivavtal", sortable: true },
  { key: "evening", label: "Kväll", sortable: true, align: "right" as const },
  { key: "night", label: "Natt", sortable: true, align: "right" as const },
  { key: "weekend", label: "Helg", sortable: true, align: "right" as const },
  { key: "holiday", label: "Storhelg", sortable: true, align: "right" as const },
  { key: "sector", label: "Sektor" },
];

const rows = publicAgreements
  .filter((a) => parseObNumber(a.keyFacts.obNight) > 0)
  .map((a) => ({
    slug: a.slug,
    name: a.shortName,
    evening: a.keyFacts.obWeekday,
    night: a.keyFacts.obNight,
    weekend: a.keyFacts.obWeekend,
    holiday: a.keyFacts.obHoliday,
    sector: a.sectorLabel,
    nightNum: parseObNumber(a.keyFacts.obNight),
  }))
  .sort((a, b) => b.nightNum - a.nightNum);

export default function OBTillagg() {
  notFound();
  return (
    <TopicComparisonPage
      title="OB-tillägg i källgranskade kollektivavtal"
      subtitle="Jämför kontrollerade regler för kväll, natt, helg och storhelg"
      aeoAnswer="OB kan vara ett fast belopp, en procentsats eller en formel och tiderna skiljer sig mellan avtalen. Tabellen sammanfattar de aktuella regler som har kunnat kontrolleras; öppna alltid avtalet för detaljer om exakt dag och klockslag."
      columns={columns}
      rows={rows}
      ctaText="Beräkna din OB-lön i lönekalkylatorn"
      ctaHref="/lonekalkylator"
    />
  );
}
