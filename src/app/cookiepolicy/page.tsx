import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookiepolicy - kollektivavtal.ai",
  description: "Information om hur kollektivavtal.ai hanterar cookies.",
  alternates: { canonical: "https://kollektivavtal.ai/cookiepolicy" },
};

export default function Cookiepolicy() {
  return (
    <section className="pt-12 pb-12 sm:pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-[56px] text-text-primary mb-6" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
          Cookiepolicy
        </h1>
        <p className="text-sm text-text-secondary mb-8">
          Senast uppdaterad: juli 2026
        </p>

        <div className="space-y-8 text-text-primary leading-relaxed">
          <div>
            <h2 className="text-lg font-bold mb-2">Vad är cookies?</h2>
            <p className="text-sm">
              Cookies är små textfiler som lagras i din webbläsare när du besöker en webbplats.
              De används för att webbplatsen ska fungera, för att analysera trafik och för att
              visa relevanta annonser.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Cookies vi använder</h2>
            <div className="space-y-4">
              <div className="rounded-[12px] border border-border bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-text-primary text-sm">Nödvändiga cookies</h3>
                <p className="text-sm text-text-secondary mt-1">
                  Teknisk lagring kan användas när det krävs för säkerhet och grundläggande
                  funktioner på sajten.
                </p>
                <p className="text-xs text-text-secondary mt-2">Lagringstid: sessionen</p>
              </div>

              <div className="rounded-[12px] border border-border bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-text-primary text-sm">Annonscookies (Google AdSense)</h3>
                <p className="text-sm text-text-secondary mt-1">
                  Google AdSense kan använda cookies eller liknande teknik för annonsering.
                  I EES visas Googles samtyckesruta där du kan godkänna eller avvisa de val som
                  erbjuds. Vilka cookies som används beror på ditt val och Googles tjänst.
                </p>
                <p className="text-xs text-text-secondary mt-2">
                  Cookies: diverse Google-cookies, lagringstid: varierar
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Hantera cookies</h2>
            <p className="text-sm">
              Du kan blockera eller radera cookies via din webbläsares inställningar. Observera
              att sajten kan fungera sämre om nödvändig lagring blockeras. Du kan också göra val
              i Googles samtyckesruta. För Googles annonsinställningar, besök{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Googles annonsinställningar
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Kontakt</h2>
            <p className="text-sm mb-3">
              Har du frågor om vår cookieanvändning? Kontakta oss:
            </p>
            <div className="rounded-[12px] border border-border bg-white p-5 shadow-sm inline-flex items-center gap-3">
              <Mail size={20} className="text-accent" />
              <a
                href="mailto:info@kollektivavtal.ai"
                className="text-sm text-accent hover:underline"
              >
                info@kollektivavtal.ai
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
