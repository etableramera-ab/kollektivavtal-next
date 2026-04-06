"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const texts = {
  sv: {
    message:
      "Vi använder cookies för att analysera trafik (Google Analytics) och visa annonser (Google AdSense). Du kan välja att bara acceptera nödvändiga cookies.",
    readMore: "Läs mer",
    necessary: "Bara nödvändiga",
    acceptAll: "Acceptera alla",
  },
  en: {
    message:
      "We use cookies for traffic analysis (Google Analytics) and advertising (Google AdSense). You can choose to accept only necessary cookies.",
    readMore: "Read more",
    necessary: "Necessary only",
    acceptAll: "Accept all",
  },
  ar: {
    message:
      "نستخدم ملفات تعريف الارتباط لتحليل حركة المرور (Google Analytics) والإعلانات (Google AdSense). يمكنك اختيار قبول ملفات تعريف الارتباط الضرورية فقط.",
    readMore: "اقرأ المزيد",
    necessary: "الضرورية فقط",
    acceptAll: "قبول الكل",
  },
  so: {
    message:
      "Waxaan isticmaalnaa cookies si aan u falanqayno taraafikada iyo xayeysiinta. Waxaad dooran kartaa inaad aqbasho cookies-ka lagama maarmaanka ah oo keliya.",
    readMore: "Akhri wax badan",
    necessary: "Lagama maarmaanka oo keliya",
    acceptAll: "Aqbal dhammaan",
  },
  fa: {
    message:
      "ما از کوکی‌ها برای تحلیل ترافیک و تبلیغات استفاده می‌کنیم. می‌توانید فقط کوکی‌های ضروری را بپذیرید.",
    readMore: "بیشتر بخوانید",
    necessary: "فقط ضروری",
    acceptAll: "پذیرش همه",
  },
  es: {
    message:
      "Usamos cookies para análisis de tráfico (Google Analytics) y publicidad (Google AdSense). Puedes elegir aceptar solo las cookies necesarias.",
    readMore: "Leer más",
    necessary: "Solo necesarias",
    acceptAll: "Aceptar todas",
  },
  pl: {
    message:
      "Używamy plików cookies do analizy ruchu (Google Analytics) i reklam (Google AdSense). Możesz zaakceptować tylko niezbędne pliki cookies.",
    readMore: "Czytaj więcej",
    necessary: "Tylko niezbędne",
    acceptAll: "Zaakceptuj wszystkie",
  },
};

function loadAnalyticsAndAds() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (gaId && !document.querySelector(`script[src*="googletagmanager"]`)) {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", gaId);
    };
  }

  const adClient = "ca-pub-9148299323154794";
  if (!document.querySelector(`script[src*="adsbygoogle"]`)) {
    const adScript = document.createElement("script");
    adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
    adScript.async = true;
    adScript.crossOrigin = "anonymous";
    document.head.appendChild(adScript);
  }
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  const locale =
    (["en", "ar", "so", "fa", "es", "pl"].find((l) =>
      pathname.startsWith(`/${l}`)
    ) as keyof typeof texts) || "sv";
  const t = texts[locale] || texts.sv;

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (stored === "all") {
      loadAnalyticsAndAds();
    } else if (stored !== "necessary") {
      const timer = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  function acceptAll() {
    localStorage.setItem("cookie-consent", "all");
    setVisible(false);
    loadAnalyticsAndAds();
  }

  function acceptNecessary() {
    localStorage.setItem("cookie-consent", "necessary");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-gray-700">
          <p>
            {t.message}{" "}
            <Link
              href="/cookiepolicy"
              className="underline text-blue-600 hover:text-blue-800"
            >
              {t.readMore}
            </Link>
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={acceptNecessary}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {t.necessary}
          </button>
          <button
            onClick={acceptAll}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {t.acceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}
