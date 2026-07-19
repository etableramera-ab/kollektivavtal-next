import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Integritetspolicy — kollektivavtal.ai",
  description:
    "Så hanterar kollektivavtal.ai dina personuppgifter. Vi värnar om din integritet.",
  alternates: { canonical: "https://kollektivavtal.ai/integritetspolicy" },
};

export default function Integritetspolicy() {
  return (
    <section className="pt-12 pb-12 sm:pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-[56px] text-text-primary mb-6" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
          Integritetspolicy
        </h1>
        <p className="text-sm text-text-secondary mb-8">
          Senast uppdaterad: juli 2026
        </p>

        <div className="space-y-8 text-text-primary leading-relaxed">
          <div>
            <h2 className="text-lg font-bold mb-2">Personuppgiftsansvarig</h2>
            <p>
              Etablera Mera AB (org.nr 559444-2526) ansvarar för behandlingen av personuppgifter
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
                <strong>AI-chatt:</strong> Meddelandet och en kort del av den aktuella
                chatthistoriken skickas till Anthropic för att skapa ett svar. Du behöver inte
                ange namn eller kontaktuppgifter. Skriv inte känsliga personuppgifter i chatten.
              </li>
              <li>
                <strong>Feedback på AI-svar:</strong> Om du väljer Ja eller Nej registreras i
                själva feedbacken bara valet, språk, chattläge och vilket avtal sidan gäller.
                Din fråga, AI-svaret och chatthistoriken skickas inte med i feedbacken.
              </li>
              <li>
                <strong>Annonsdata:</strong> Google AdSense kan visa anpassade annonser baserat
                på ditt samtycke. Mer information finns i vår{" "}
                <Link href="/cookiepolicy" className="text-accent hover:underline">cookiepolicy</Link>.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Rättslig grund</h2>
            <p className="text-sm">
              AI-meddelanden behandlas för att kunna leverera den funktion du själv använder.
              Ja/Nej-feedback används för att förbättra AI-guiden utan att spara chattens innehåll.
              Annonscookies och liknande teknik används efter samtycke där samtycke krävs. Du kan
              ändra dina val via Googles samtyckesruta eller webbläsarens inställningar.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Delning med tredje part</h2>
            <p className="text-sm">
              Vi säljer aldrig dina personuppgifter. Data delas med:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
              <li>Google AdSense — för annonsering och samtyckeshantering</li>
              <li>Anthropic — för AI-behandling av chattmeddelanden</li>
              <li>
                Vercel — för hosting och anonym sammanställning av Ja/Nej-feedback
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Lagringstid</h2>
            <p className="text-sm">
              Sajten sparar inte chattmeddelanden i en egen databas. Anthropic och Google
              behandlar uppgifter enligt sina respektive villkor och lagringsrutiner.
              Vår rapporteringsperiod för anonym Ja/Nej-feedback är 12 månader.
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
