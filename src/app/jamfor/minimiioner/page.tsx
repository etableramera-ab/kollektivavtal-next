import type { Metadata } from "next";
import { agreements } from "@/data/agreements";
import TopicComparisonPage from "@/components/TopicComparisonPage";

export const metadata: Metadata = {
  title: "Minimilöner per kollektivavtal 2026 — Lägsta löner alla branscher | kollektivavtal.ai",
  description: "Lägsta löner i Sverige sätts av kollektivavtal. Se minimilön per avtal och bransch 2026.",
};

const columns = [
  { key: "name", label: "Kollektivavtal", sortable: true },
  { key: "minWage", label: "Lägsta lön", sortable: true, align: "right" as const },
  { key: "sector", label: "Sektor" },
];

const rows = agreements.map((a) => ({
  slug: a.slug,
  name: a.shortName,
  minWage: a.keyFacts.minimumWage,
  sector: a.sectorLabel,
}));

export default function Minimiioner() {
  return (
    <TopicComparisonPage
      title="Minimilöner per kollektivavtal 2026"
      subtitle="Lägsta löner i Sverige sätts av kollektivavtalen — inte lagen"
      aeoAnswer="Sverige har ingen lagstadgad minimilön. Lägsta löner sätts i kollektivavtal — från ca 24 400 kr/mån i hotell och restaurang till ca 33 000 kr med yrkesbevis i bygg. IT-avtalet och Bankavtalet har individuell lönesättning utan fast golv."
      columns={columns}
      rows={rows}
    />
  );
}
