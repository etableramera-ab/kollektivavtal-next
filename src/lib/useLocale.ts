"use client";

import { usePathname } from "next/navigation";
import { locales, defaultLocale, getDictionary, type Locale } from "@/lib/dictionaries";

export function useLocale() {
  const pathname = usePathname();
  const locale = (locales.find(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  ) || defaultLocale) as Locale;
  const dict = getDictionary(locale);
  return { locale, dict };
}

export const languageNames: Record<string, string> = {
  sv: "svenska",
  en: "English",
  ar: "العربية",
  so: "Soomaali",
  fa: "فارسی",
  es: "español",
  pl: "polski",
};
