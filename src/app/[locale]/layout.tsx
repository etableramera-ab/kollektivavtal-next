import { locales, defaultLocale } from "@/lib/dictionaries";
import { notFound } from "next/navigation";

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
    <div dir={isRTL ? "rtl" : "ltr"} lang={params.locale}>
      {children}
    </div>
  );
}
