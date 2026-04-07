import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Löner per yrke 2026 — Medianlön och villkor | kollektivavtal.ai",
  description: "Se minimilön, medianlön och OB-tillägg för 50 yrken med kollektivavtal i Sverige.",
  alternates: { canonical: "https://kollektivavtal.ai/yrke" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
