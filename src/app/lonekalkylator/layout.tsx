import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Lönekalkylator — Beräkna din avtalslön | kollektivavtal.ai",
  description: "Beräkna din lön enligt kollektivavtalet. Se grundlön, OB-tillägg, övertid och pension.",
  alternates: { canonical: "https://kollektivavtal.ai/lonekalkylator" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
