import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Jämförelser källgranskas | kollektivavtal.ai",
  description: "Jämförelseverktyget byggs om för att avtalsvillkor ska kunna jämföras rättvist och med tydliga källor.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://kollektivavtal.ai/jamfor" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
