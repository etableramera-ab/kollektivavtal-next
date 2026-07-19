import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Guider källgranskas | kollektivavtal.ai",
  description: "Guiderna publiceras igen när varje siffra och avtalsuppgift har kontrollerats mot en tydlig källa.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://kollektivavtal.ai/blogg" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
