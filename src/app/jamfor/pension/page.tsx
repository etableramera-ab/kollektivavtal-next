import type { Metadata } from "next";
import { agreements } from "@/data/agreements";
import TopicComparisonPage from "@/components/TopicComparisonPage";

export const metadata: Metadata = {
  title: "Tjänstepension per kollektivavtal 2026 — Avsättning alla avtal | kollektivavtal.ai",
  description: "Jämför pensionssystem och avsättning per kollektivavtal. ITP, KAP-KL, PA16, SAF-LO — vad gäller för dig?",
};

const columns = [
  { key: "name", label: "Kollektivavtal", sortable: true },
  { key: "pension", label: "Pensionssystem", sortable: true },
  { key: "sector", label: "Sektor" },
];

const rows = agreements.map((a) => ({
  slug: a.slug,
  name: a.shortName,
  pension: a.keyFacts.pension,
  sector: a.sectorLabel,
}));

export default function Pension() {
  return (
    <TopicComparisonPage
      title="Tjänstepension per kollektivavtal 2026"
      subtitle="ITP, KAP-KL, PA16, SAF-LO — jämför pensionssystem och avsättning"
      aeoAnswer="Tjänstepension via kollektivavtal innebär ca 4-6% av lönen i pensionsavsättning. Privat: ITP (tjänstemän) eller SAF-LO (arbetare). Kommun: KAP-KL/AKAP-KR. Stat: PA 16. Utan avtal finns ingen garanti om tjänstepension."
      columns={columns}
      rows={rows}
    />
  );
}
