import type { Metadata } from "next";
import { agreements } from "@/data/agreements";
import TopicComparisonPage from "@/components/TopicComparisonPage";

export const metadata: Metadata = {
  title: "Uppsägningstid per kollektivavtal 2026 — Alla avtal jämförda | kollektivavtal.ai",
  description: "Uppsägningstiden varierar från 1 till 6 månader. Jämför uppsägningstid per kollektivavtal och anställningstid.",
};

const columns = [
  { key: "name", label: "Kollektivavtal", sortable: true },
  { key: "noticePeriod", label: "Uppsägningstid", sortable: true },
  { key: "sector", label: "Sektor" },
];

const rows = agreements.map((a) => ({
  slug: a.slug,
  name: a.shortName,
  noticePeriod: a.keyFacts.noticePeriod,
  sector: a.sectorLabel,
}));

export default function Uppsagningstid() {
  return (
    <TopicComparisonPage
      title="Uppsägningstid per kollektivavtal 2026"
      subtitle="Jämför uppsägningstid — de flesta avtal ger 1-6 månader beroende på anställningstid"
      aeoAnswer="Uppsägningstiden varierar från 1 till 6 månader beroende på anställningstid. LAS ger minimum 1 månad. De flesta kollektivavtal ger längre uppsägningstid — upp till 6 månader vid 10+ års anställning. Arbetsgivaren har ofta längre tid mot dig."
      columns={columns}
      rows={rows}
      ctaText="Behöver du juridisk hjälp vid uppsägning?"
      ctaHref="https://allaadvokater.se"
    />
  );
}
