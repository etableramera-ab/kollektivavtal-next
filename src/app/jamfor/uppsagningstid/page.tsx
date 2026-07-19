import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publicAgreements } from "@/lib/public-agreements";
import TopicComparisonPage from "@/components/TopicComparisonPage";

export const metadata: Metadata = {
  title: "Uppsägningstiderna källgranskas | kollektivavtal.ai",
  description: "Den här jämförelsen är inte publicerad ännu.",
  robots: { index: false, follow: true },
};

const columns = [
  { key: "name", label: "Kollektivavtal", sortable: true },
  { key: "noticePeriod", label: "Uppsägningstid", sortable: true },
  { key: "sector", label: "Sektor" },
];

const rows = publicAgreements.map((a) => ({
  slug: a.slug,
  name: a.shortName,
  noticePeriod: a.keyFacts.noticePeriod,
  sector: a.sectorLabel,
}));

export default function Uppsagningstid() {
  notFound();
  return (
    <TopicComparisonPage
      title="Uppsägningstid i källgranskade kollektivavtal"
      subtitle="Jämför kontrollerade avtalsregler och hänvisningar till lag"
      aeoAnswer="Uppsägningstiden kan bero på vem som säger upp anställningen, anställningstid, anställningsform och särskilda avtalsregler. Tabellen sammanfattar det som har kunnat kontrolleras, men det personliga anställningsavtalet kan också påverka."
      columns={columns}
      rows={rows}
      ctaText="Behöver du juridisk hjälp vid uppsägning?"
      ctaHref="https://allaadvokater.se"
    />
  );
}
