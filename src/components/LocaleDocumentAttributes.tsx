"use client";

import { useEffect } from "react";
import { useLocale } from "@/lib/useLocale";

export default function LocaleDocumentAttributes() {
  const { locale } = useLocale();

  useEffect(() => {
    const isRTL = locale === "ar" || locale === "fa";
    document.documentElement.lang = locale;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";

    return () => {
      document.documentElement.lang = "sv";
      document.documentElement.dir = "ltr";
    };
  }, [locale]);

  return null;
}
