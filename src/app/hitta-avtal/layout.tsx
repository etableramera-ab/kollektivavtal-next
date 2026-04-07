import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Hitta ditt kollektivavtal — 3 frågor | kollektivavtal.ai",
  description: "Svara på tre frågor och hitta rätt kollektivavtal för ditt yrke och din bransch.",
  alternates: { canonical: "https://kollektivavtal.ai/hitta-avtal" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
