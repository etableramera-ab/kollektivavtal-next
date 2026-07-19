import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import { locales, defaultLocale, getDictionary } from "@/lib/dictionaries";
import { notFound } from "next/navigation";
import { buildLocalizedUrl, getOgLocale, type Locale } from "@/lib/metadata";

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return locales
    .filter((l) => l !== defaultLocale)
    .map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const title = `${dict.hero.title} | kollektivavtal.ai`;
  return {
    title,
    description: dict.metadata.siteDescription,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: "https://kollektivavtal.ai",
    },
    openGraph: {
      title,
      description: dict.metadata.siteDescription,
      url: buildLocalizedUrl(locale, "/"),
      siteName: "kollektivavtal.ai",
      locale: getOgLocale(locale),
      type: "website",
      images: [{ url: "https://kollektivavtal.ai/Images/og-image.png", width: 1200, height: 630, alt: "kollektivavtal.ai" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.metadata.siteDescription,
      images: ["https://kollektivavtal.ai/Images/og-image.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  const isRTL = locale === "ar" || locale === "fa";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      lang={locale}
      className={isRTL ? notoSansArabic.variable : ""}
      style={isRTL ? { fontFamily: "var(--font-arabic), sans-serif" } : {}}
    >
      {children}
    </div>
  );
}
