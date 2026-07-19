import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publicAgreements } from "@/lib/public-agreements";
import TopicComparisonPage from "@/components/TopicComparisonPage";

export const metadata: Metadata = {
  title: "Pensionsjämförelsen källgranskas | kollektivavtal.ai",
  description: "Den här jämförelsen är inte publicerad ännu.",
  robots: { index: false, follow: true },
};

const columns = [
  { key: "name", label: "Kollektivavtal", sortable: true },
  { key: "pension", label: "Pensionssystem", sortable: true },
  { key: "sector", label: "Sektor" },
];

const rows = publicAgreements.map((a) => ({
  slug: a.slug,
  name: a.shortName,
  pension: a.keyFacts.pension,
  sector: a.sectorLabel,
}));

export default function Pension() {
  notFound();
  return (
    <TopicComparisonPage
      title="Tjänstepension i källgranskade kollektivavtal"
      subtitle="Jämför vilket pensionsavtal som hör till respektive avtalsområde"
      aeoAnswer="Pensionssystem och premier skiljer sig mellan avtalsområden och kan även bero på ålder, lön och övergångsregler. Tabellen visar vilket pensionsavtal som källorna anger, men en personlig beräkning behöver göras hos pensionsvalcentralen eller arbetsgivaren."
      columns={columns}
      rows={rows}
    />
  );
}
