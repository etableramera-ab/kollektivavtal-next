import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Disclaimer from "@/components/Disclaimer";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
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
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://kollektivavtal.ai",
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
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX";

  return (
    <html lang="sv">
      <head>
        <meta name="theme-color" content="#0F2B46" />
        <meta name="google-site-verification" content="Bm7t4B2dfkjxPTdY8c6p6-m7cY-r_fFtXhKgI5SpUl8" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9148299323154794" crossOrigin="anonymous"></script>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Disclaimer />
        <Footer />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
      </body>
    </html>
  );
}
