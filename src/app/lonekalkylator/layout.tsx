import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Lönekalkylatorn byggs om | kollektivavtal.ai",
  description: "Lönekalkylatorn är tillfälligt stängd medan beräkningarna källgranskas.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://kollektivavtal.ai/lonekalkylator" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
