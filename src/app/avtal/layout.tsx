import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Alla 515 kollektivavtal i Sverige | kollektivavtal.ai",
  description: "Hitta och förstå ditt kollektivavtal. Löner, OB-tillägg, semester och pension sammanfattat på klarspråk.",
  alternates: { canonical: "https://kollektivavtal.ai/avtal" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
