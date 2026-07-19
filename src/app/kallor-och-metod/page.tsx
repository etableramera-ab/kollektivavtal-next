import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  ExternalLink,
  FileText,
  MessageSquare,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { courtCases } from "@/data/court-cases";
import { AGREEMENTS_WITH_SOURCE_MATCHED_WAGE_TABLES } from "@/lib/agreement-fact-status";
import {
  publicOccupations,
  scbOccupationWageSource,
} from "@/lib/public-occupations";
import { VERIFIED_AGREEMENTS } from "@/lib/verified-agreements";

export const metadata: Metadata = {
  title: "Källor och metod | kollektivavtal.ai",
  description:
    "Så arbetar kollektivavtal.ai med källor, granskning, SCB-statistik, rättsfall och AI-svar.",
  alternates: { canonical: "https://kollektivavtal.ai/kallor-och-metod" },
};

const serif = { fontFamily: "var(--font-dm-serif, var(--font-serif))" };

export default function KallorOchMetodPage() {
  const agreementCount = VERIFIED_AGREEMENTS.size;
  const wageTableCount = AGREEMENTS_WITH_SOURCE_MATCHED_WAGE_TABLES.size;
  const occupationCount = publicOccupations.length;
  const courtCaseCount = courtCases.length.toLocaleString("sv-SE");

  return (
    <>
      <section className="bg-primary text-white pt-12 pb-12 sm:pb-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1
            className="text-4xl leading-tight sm:text-5xl md:text-[56px]"
            style={serif}
          >
            Källor och metod
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
            Vi publicerar hellre mindre information med tydligt källstöd än
            många osäkra uppgifter.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <section className="py-12 sm:py-16">
          <h2 className="text-2xl font-bold text-text-primary">
            Så arbetar vi
          </h2>
          <div className="mt-5 space-y-4 leading-relaxed text-text-primary">
            <p>
              kollektivavtal.ai är en oberoende guide. Vi granskar underlag,
              förklarar i egna ord och visar när något behöver kontrolleras i
              originalkällan.
            </p>
            <p>
              Ett aktuellt källunderlag betyder inte automatiskt att varje
              siffra på en sida är kontrollerad. Därför begränsar vi vad som
              visas och pausar innehåll där underlaget inte räcker.
            </p>
          </div>
        </section>

        <section className="pb-12 sm:pb-16">
          <h2 className="text-2xl font-bold text-text-primary">
            Det här är kontrollerat
          </h2>

          <div className="mt-6 space-y-4">
            <article className="rounded-[12px] border border-border bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 shrink-0 text-accent" size={22} />
                <div>
                  <h3 className="font-semibold text-text-primary">
                    Kollektivavtal
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    För {agreementCount} avtalsöversikter har namn, parter,
                    giltighet och officiell källa kontrollerats. Vi visar inte
                    fullständiga avtalstexter och återger inte villkor
                    ordagrant. På avtalssidorna finns direkta hänvisningar till
                    organisationernas officiella information.
                  </p>
                  <Link
                    href="/avtal"
                    className="mt-3 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    Se avtalen <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </article>

            <article className="rounded-[12px] border border-border bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 shrink-0 text-accent" size={22} />
                <div>
                  <h3 className="font-semibold text-text-primary">
                    Siffror i avtalen
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    Lönetabeller publiceras först när beloppen kan matchas mot
                    underlaget. {wageTableCount > 0
                      ? `Just nu gäller det ${wageTableCount} avtal.`
                      : "Just nu visas inga avtalsbaserade lönetabeller."} Annan
                    osäker sifferinformation hålls också dold tills den har
                    kontrollerats mot det officiella källunderlaget.
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded-[12px] border border-border bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start gap-3">
                <BarChart3 className="mt-0.5 shrink-0 text-accent" size={22} />
                <div>
                  <h3 className="font-semibold text-text-primary">
                    Lönestatistik per yrke
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {occupationCount} yrkessidor använder SCB:s
                    lönestrukturstatistik för {scbOccupationWageSource.year}.
                    Siffrorna gäller hela ekonomin, alla sektorer och kvinnor
                    och män sammantaget. De är inte en individuell löneprognos
                    eller en lägstalön enligt kollektivavtal.
                  </p>
                  <a
                    href={scbOccupationWageSource.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    Öppna SCB:s statistik <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </article>

            <article className="rounded-[12px] border border-border bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start gap-3">
                <Scale className="mt-0.5 shrink-0 text-accent" size={22} />
                <div>
                  <h3 className="font-semibold text-text-primary">Rättsfall</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {courtCaseCount} rättsfall har länk till en officiell
                    publicering hos Arbetsdomstolen eller Domstolsverket. Våra
                    texter är korta sammanfattningar; den officiella domen är
                    alltid den källa som gäller.
                  </p>
                  <a
                    href="https://www.arbetsdomstolen.se/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    Besök Arbetsdomstolen <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="pb-12 sm:pb-16">
          <div className="rounded-[12px] border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle
                className="mt-0.5 shrink-0 text-amber-700"
                size={22}
              />
              <div>
                <h2 className="text-xl font-bold text-amber-950">
                  När underlaget inte räcker
                </h2>
                <p className="mt-2 leading-relaxed text-amber-900">
                  Då gissar vi inte. Avtal, jämförelser, artiklar och verktyg
                  som saknar tillräckligt källstöd hålls stängda tills de har
                  kontrollerats. Vi visar heller inte ogranskade kopplingar
                  mellan ett rättsfall och ett visst avtal.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-12 sm:pb-16">
          <div className="rounded-[12px] border border-border bg-[#E8EEE9] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <MessageSquare className="mt-0.5 shrink-0 text-accent" size={22} />
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  Så fungerar AI-guiden
                </h2>
                <p className="mt-2 leading-relaxed text-text-secondary">
                  AI-guiden förklarar information i egna ord och ska säga till
                  när källunderlaget inte räcker. Den ger vägledning, inte
                  juridisk rådgivning eller bindande besked. Kontrollera alltid
                  originalkällan före ett viktigt beslut.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-20">
          <h2 className="text-2xl font-bold text-text-primary">
            Hjälp oss att bli bättre
          </h2>
          <p className="mt-4 leading-relaxed text-text-primary">
            Har du hittat ett fel, en ny officiell källa eller information som
            behöver granskas? Skriv gärna till oss. Vi uppskattar konkreta
            hänvisningar till originalkällan.
          </p>
          <a
            href="mailto:info@kollektivavtal.ai"
            className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Kontakta oss <ArrowRight size={16} />
          </a>
        </section>
      </main>
    </>
  );
}
