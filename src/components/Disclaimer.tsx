"use client";

import { AlertCircle } from "lucide-react";
import { useLocale } from "@/lib/useLocale";

export default function Disclaimer() {
  const { locale, dict } = useLocale();

  return (
    <div lang={locale} dir={locale === "ar" || locale === "fa" ? "rtl" : "ltr"} className="bg-surface-dark border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-start gap-2">
        <AlertCircle size={16} className="text-text-secondary mt-0.5 shrink-0" />
        <p className="text-xs text-text-secondary">
          {dict.agreement.disclaimer} {dict.agreement.chatDisclaimer}
        </p>
      </div>
    </div>
  );
}
