import sv from "./sv";
import en from "./en";
import type { Dictionary } from "./sv";

const dictionaries: Record<string, Dictionary> = { sv, en };

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale] || dictionaries.sv;
}

export const locales = ["sv", "en", "ar", "so", "fa", "es", "pl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sv";
export type { Dictionary };
