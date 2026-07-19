import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Aktuella avtalsperioder | kollektivavtal.ai",
  description: "Se giltighetsperioder som har kontrollerats mot organisationernas officiella avtalskällor.",
  alternates: { canonical: "https://kollektivavtal.ai/statistik/avtalsrorelsen" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
