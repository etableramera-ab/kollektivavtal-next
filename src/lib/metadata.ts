export const LOCALES = ["sv", "en", "ar", "fa", "so", "es", "pl"] as const;
export type Locale = (typeof LOCALES)[number];

export const OG_LOCALES: Record<Locale, string> = {
  sv: "sv_SE",
  en: "en_US",
  ar: "ar_AR",
  fa: "fa_IR",
  so: "so_SO",
  es: "es_ES",
  pl: "pl_PL",
};

const BASE_URL = "https://kollektivavtal.ai";

export function buildLocalizedUrl(locale: Locale, path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (locale === "sv") return `${BASE_URL}${cleanPath}`;
  return `${BASE_URL}/${locale}${cleanPath}`;
}

export function buildHreflangs(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale] = buildLocalizedUrl(locale, path);
  }
  languages["x-default"] = buildLocalizedUrl("sv", path);
  return languages;
}

export function getOgLocale(locale: Locale): string {
  return OG_LOCALES[locale];
}

export function getOgAlternateLocales(currentLocale: Locale): string[] {
  return LOCALES.filter((l) => l !== currentLocale).map((l) => OG_LOCALES[l]);
}
