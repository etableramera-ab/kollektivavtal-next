import type { Metadata } from "next";
import Script from "next/script";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Disclaimer from "@/components/Disclaimer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingChat from "@/components/FloatingChat";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kollektivavtal på klarspråk | kollektivavtal.ai",
  description:
    "Sök och jämför svenska kollektivavtal. Få källstyrd vägledning om lön, OB-tillägg, semester och andra villkor.",
  openGraph: {
    title: "Kollektivavtal på klarspråk | kollektivavtal.ai",
    description:
      "Sök och jämför svenska kollektivavtal med tydliga källor och försiktig AI-vägledning.",
    url: "https://kollektivavtal.ai",
    siteName: "kollektivavtal.ai",
    locale: "sv_SE",
    type: "website",
    images: [{ url: "https://kollektivavtal.ai/Images/og-image.png", width: 1200, height: 630, alt: "kollektivavtal.ai — kollektivavtal på klarspråk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kollektivavtal på klarspråk | kollektivavtal.ai",
    description: "Sök och jämför svenska kollektivavtal med tydliga källor och försiktig AI-vägledning.",
    images: ["https://kollektivavtal.ai/Images/og-image.png"],
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
    "Oberoende plattform som gör svenska kollektivavtal lättare att hitta och förstå. Drivs av Etablera Mera AB.",
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
        <meta name="theme-color" content="#164B3F" />
        <meta name="google-site-verification" content="Bm7t4B2dfkjxPTdY8c6p6-m7cY-r_fFtXhKgI5SpUl8" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${sourceSans.className} ${sourceSans.variable} ${sourceSerif.variable} antialiased`}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9148299323154794"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <ScrollToTop />
        <Header />
        <div className="bg-background">
          <main className="min-h-screen">{children}</main>
          <Disclaimer />
        </div>
        <Footer />
        <FloatingChat />
      </body>
    </html>
  );
}
