import sv from "./sv";
import en from "./en";
import ar from "./ar";
import so from "./so";
import fa from "./fa";
import es from "./es";
import pl from "./pl";
import type { Dictionary } from "./sv";

const dictionaries: Record<string, Dictionary> = { sv, en, ar, so, fa, es, pl };

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale] || dictionaries.sv;
}

export const locales = ["sv", "en", "ar", "so", "fa", "es", "pl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sv";
export type { Dictionary };
