import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Disclaimer from "@/components/Disclaimer";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kollektivavtal i Sverige 2026 — Hitta, förstå och jämför ditt avtal | kollektivavtal.ai",
  description:
    "Sveriges största guide till alla 617 kollektivavtal. Sök på ditt yrke, jämför avtal, chatta med AI-expert och se lönestatistik. Gratis och öppet för alla.",
  openGraph: {
    title: "Kollektivavtal i Sverige 2026 — Hitta, förstå och jämför ditt avtal",
    description:
      "Sveriges största guide till alla 617 kollektivavtal. Sök på ditt yrke, jämför avtal, chatta med AI-expert och se lönestatistik.",
    url: "https://kollektivavtal.ai",
    siteName: "kollektivavtal.ai",
    locale: "sv_SE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "kollektivavtal.ai",
    description: "617 kollektivavtal, AI-chatt, lönedata och rättsfall.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://kollektivavtal.ai",
    languages: {
      "sv": "https://kollektivavtal.ai",
      "en": "https://kollektivavtal.ai/en",
      "ar": "https://kollektivavtal.ai/ar",
      "so": "https://kollektivavtal.ai/so",
      "fa": "https://kollektivavtal.ai/fa",
      "es": "https://kollektivavtal.ai/es",
      "pl": "https://kollektivavtal.ai/pl",
      "x-default": "https://kollektivavtal.ai",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Etablera Mera AB",
  url: "https://kollektivavtal.ai",
  logo: "https://kollektivavtal.ai/logo.png",
  description:
    "Sveriges största AI-drivna plattform för kollektivavtal. Drivs av Etablera Mera AB.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@kollektivavtal.ai",
    contactType: "customer service",
  },
  sameAs: [
    "https://www.linkedin.com/company/kollektivavtal-ai/",
    "https://www.instagram.com/kollektivavtal.ai",
    "https://www.facebook.com/profile.php?id=61587547443940",
    "https://www.youtube.com/@Allakollektivavtal",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <head>
        <meta name="theme-color" content="#0F766E" />
        <meta name="google-site-verification" content="Bm7t4B2dfkjxPTdY8c6p6-m7cY-r_fFtXhKgI5SpUl8" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${dmSerifDisplay.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Disclaimer />
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
