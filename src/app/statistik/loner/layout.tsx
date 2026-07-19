import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Löner per yrke — SCB 2025 | kollektivavtal.ai",
  description:
    "Se aktuell lönestatistik per yrke från SCB:s officiella statistik för 2025.",
  alternates: { canonical: "https://kollektivavtal.ai/statistik/loner" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
