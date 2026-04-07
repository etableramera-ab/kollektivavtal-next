import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Lönestatistik per bransch 2026 | kollektivavtal.ai",
  description: "Se medianlöner per bransch i Sverige. Data från SCB:s lönestatistik.",
  alternates: { canonical: "https://kollektivavtal.ai/statistik/loner" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
