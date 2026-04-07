import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Arbetsmarknadsstatistik i Sverige | kollektivavtal.ai",
  description: "Lönestatistik, avtalstäckning och arbetsmarknadsdata från SCB och Medlingsinstitutet.",
  alternates: { canonical: "https://kollektivavtal.ai/statistik" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
