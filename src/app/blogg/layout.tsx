import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blogg — Nyheter och guider om kollektivavtal | kollektivavtal.ai",
  description: "Löner, rättigheter, avtalsrörelsen och praktiska guider om kollektivavtal i Sverige.",
  alternates: { canonical: "https://kollektivavtal.ai/blogg" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
