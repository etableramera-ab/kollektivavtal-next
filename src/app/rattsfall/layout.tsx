import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Rättsfall — Arbetsdomstolens domar | kollektivavtal.ai",
  description: "Sök bland rättsfall med länkar till officiella publiceringar hos Arbetsdomstolen och Domstolsverket.",
  alternates: { canonical: "https://kollektivavtal.ai/rattsfall" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
