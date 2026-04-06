import { Noto_Sans_Arabic } from "next/font/google";
import { locales, defaultLocale } from "@/lib/dictionaries";
import { notFound } from "next/navigation";

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

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(params.locale as (typeof locales)[number])) {
    notFound();
  }

  const isRTL = params.locale === "ar" || params.locale === "fa";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      lang={params.locale}
      className={isRTL ? notoSansArabic.variable : ""}
      style={isRTL ? { fontFamily: "var(--font-arabic), sans-serif" } : {}}
    >
      {children}
    </div>
  );
}
