import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Jämför kollektivavtal — OB, löner, semester | kollektivavtal.ai",
  description: "Jämför OB-tillägg, minimilöner, semester, pension och mer mellan alla kollektivavtal i Sverige.",
  alternates: { canonical: "https://kollektivavtal.ai/jamfor" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
