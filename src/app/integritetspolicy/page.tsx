import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Integritetspolicy — kollektivavtal.ai",
  description:
    "Så hanterar kollektivavtal.ai dina personuppgifter. Vi värnar om din integritet.",
};

export default function Integritetspolicy() {
  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-6">
          Integritetspolicy
        </h1>
        <p className="text-sm text-text-secondary mb-8">
          Senast uppdaterad: mars 2026
        </p>

        <div className="space-y-8 text-text-primary leading-relaxed">
          <div>
            <h2 className="text-lg font-bold mb-2">Personuppgiftsansvarig</h2>
            <p>
              Etablera Mera AB (org.nr 559444-2526) ansvarar for behandlingen av personuppgifter
              på kollektivavtal.ai. Kontakta oss på{" "}
              <a href="mailto:info@kollektivavtal.ai" className="text-accent hover:underline">
                info@kollektivavtal.ai
              </a>{" "}
              vid frågor.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Vilka uppgifter samlar vi in?</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>Chattloggar:</strong> Meddelanden du skickar via AI-chatten lagras i
                Supabase för att förbättra tjänsten. Inga personnummer, namn eller
                kontaktuppgifter krävs för att använda chatten.
              </li>
              <li>
                <strong>Analysdata:</strong> Vi använder Google Analytics (GA4) för att förstå hur
                sajten används — sidvisningar, sessionslängd, ungefärlig geografisk position.
                GA4 använder cookies (se vår{" "}
                <Link href="/cookiepolicy" className="text-accent hover:underline">
                  cookiepolicy
                </Link>
                ).
              </li>
              <li>
                <strong>Annonsdata:</strong> Google AdSense kan visa anpassade annonser baserat
                på dina intressen. Google samlar in data via cookies för detta syfte.
              </li>
              <li>
                <strong>E-postadress:</strong> Om du anger din e-post i ett notifieringsformulär
                lagras den för att kunna skicka den avisering du begärt.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Rättslig grund</h2>
            <p className="text-sm">
              Vi behandlar personuppgifter med stöd av berättigat intresse (artikel 6.1 f GDPR)
              för analys och tjänsteförbättring, samt samtycke (artikel 6.1 a GDPR) för
              annonscookies. Du kan när som helst återkalla ditt samtycke genom att rensa cookies
              i din webbläsare.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Delning med tredje part</h2>
            <p className="text-sm">
              Vi säljer aldrig dina personuppgifter. Data delas med:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
              <li>Google (Analytics och AdSense) — för analys och annonsering</li>
              <li>Supabase — för lagring av chattloggar (servrar inom EU/EES)</li>
              <li>Anthropic — för AI-behandling av chattmeddelanden</li>
              <li>Vercel — för hosting av webbplatsen</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Lagringstid</h2>
            <p className="text-sm">
              Chattloggar lagras i upp till 12 månader. Analysdata i Google Analytics lagras
              enligt Googles standardinställningar (14 månader). E-postadresser lagras tills du
              begär radering.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Dina rättigheter</h2>
            <p className="text-sm">
              Enligt GDPR har du rätt att begära tillgång till, rättelse av eller radering av
              dina personuppgifter. Du har också rätt att invända mot behandling och begära
              dataportabilitet. Kontakta{" "}
              <a href="mailto:info@kollektivavtal.ai" className="text-accent hover:underline">
                info@kollektivavtal.ai
              </a>{" "}
              för att utöva dina rättigheter. Du kan också lämna klagomål till
              Integritetsskyddsmyndigheten (IMY).
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Kontakt</h2>
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
