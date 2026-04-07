import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Rättsfall — Arbetsdomstolens domar | kollektivavtal.ai",
  description: "Sök bland 2 009 domar från Arbetsdomstolen. Filtrerade per ämne, år och avtal.",
  alternates: { canonical: "https://kollektivavtal.ai/rattsfall" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
