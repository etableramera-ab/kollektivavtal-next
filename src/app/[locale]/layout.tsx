import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import { locales, defaultLocale } from "@/lib/dictionaries";
import { notFound } from "next/navigation";
import { buildLocalizedUrl, getOgLocale, getOgAlternateLocales, type Locale } from "@/lib/metadata";

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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  return {
    alternates: {
      canonical: buildLocalizedUrl(locale, "/"),
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
    openGraph: {
      url: buildLocalizedUrl(locale, "/"),
      locale: getOgLocale(locale),
      alternateLocale: getOgAlternateLocales(locale),
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
