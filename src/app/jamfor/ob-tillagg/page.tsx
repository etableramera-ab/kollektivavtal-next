import type { Metadata } from "next";
import { agreements } from "@/data/agreements";
import { parseObNumber } from "@/data/comparisons";
import TopicComparisonPage from "@/components/TopicComparisonPage";

export const metadata: Metadata = {
  title: "OB-tillägg 2026 — Jämför alla branscher och kollektivavtal | kollektivavtal.ai",
  description: "Se OB-tillägg per timme för alla kollektivavtal i Sverige. Jämför kväll, natt, helg och storhelg — från Handels till Byggnads.",
};

const columns = [
  { key: "name", label: "Kollektivavtal", sortable: true },
  { key: "evening", label: "Kväll", sortable: true, align: "right" as const },
  { key: "night", label: "Natt", sortable: true, align: "right" as const },
  { key: "weekend", label: "Helg", sortable: true, align: "right" as const },
  { key: "holiday", label: "Storhelg", sortable: true, align: "right" as const },
  { key: "sector", label: "Sektor" },
];

const rows = agreements
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
  return (
    <TopicComparisonPage
      title="OB-tillägg 2026 — Alla avtal jämförda"
      subtitle="Se hur mycket extra du får per timme vid kväll, natt, helg och storhelg"
      aeoAnswer="OB-tillägg varierar kraftigt mellan branscher. Kommun och region har bland de högsta med ca 140 kr/tim natt, medan hotell och restaurang ger ca 50 kr/tim. Byggbranschen ger upp till 180 kr/tim på storhelg. Utan kollektivavtal finns ingen rätt till OB."
      columns={columns}
      rows={rows}
      ctaText="Beräkna din OB-lön i lönekalkylatorn"
      ctaHref="/lonekalkylator"
    />
  );
}
