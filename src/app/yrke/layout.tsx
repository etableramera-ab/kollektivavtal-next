import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Löner per yrke — SCB 2025 | kollektivavtal.ai",
  description: "Medianlön och lönespridning per yrke från SCB:s officiella lönestrukturstatistik 2025.",
  alternates: { canonical: "https://kollektivavtal.ai/yrke" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
