import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Hitta ditt kollektivavtal — 3 frågor | kollektivavtal.ai",
  description: "Svara på tre frågor och se vilket kollektivavtal som kan vara relevant. Kontrollera alltid resultatet med arbetsgivaren eller facket.",
  alternates: { canonical: "https://kollektivavtal.ai/hitta-avtal" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
