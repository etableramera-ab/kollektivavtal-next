import type { Metadata } from "next";
import {
  Mail,
  Building2,
  FileText,
  ShieldCheck,
  AlertTriangle,
  MessageSquare,
  Scale,
  Globe,
  BarChart3,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Om kollektivavtal.ai — Mission, datakvalitet och företagsinfo",
  description:
    "kollektivavtal.ai drivs av Etablera Mera AB och är en oberoende informationsplattform som förklarar Sveriges 617 kollektivavtal på klarspråk med AI-stöd.",
};

const features = [
  {
    icon: FileText,
    title: "617 kollektivavtal",
    desc: "Hela svenska arbetsmarknaden täckt, från byggnadsarbetare till systemutvecklare",
  },
  {
    icon: MessageSquare,
    title: "AI-chattexpert",
    desc: "Ställ frågor om ditt avtal och få svar grundade i avtalstexten",
  },
  {
    icon: ShieldCheck,
    title: "Verifierad lönedata",
    desc: "32 avtal med data direkt från officiella avtalstexter, markerade med grön badge",
  },
  {
    icon: Scale,
    title: "2 009 rättsfall",
    desc: "Domar från Arbetsdomstolen kopplade till relevanta avtal",
  },
  {
    icon: BarChart3,
    title: "Löneverktyg",
    desc: "Kalkylator, jämförelser och SCB-statistik",
  },
  {
    icon: Globe,
    title: "7 språk",
    desc: "Svenska, engelska, arabiska, somaliska, persiska, spanska och polska",
  },
];

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/kollektivavtal-ai/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/kollektivavtal.ai",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61587547443940",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@Allakollektivavtal",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function OmOss() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white pt-[120px] pb-12 sm:pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-[56px] leading-tight" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
            Om kollektivavtal.ai
          </h1>
          <p className="mt-3 text-base sm:text-lg text-white/80">
            Sveriges oberoende plattform för kollektivavtal
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Mission */}
        <section className="py-12 sm:py-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Vår mission
          </h2>
          <div className="space-y-4 text-text-primary leading-relaxed">
            <p>
              kollektivavtal.ai finns för att göra arbetsmarknadens viktigaste
              dokument tillgängliga för alla. Sveriges kollektivavtal reglerar
              löner, arbetstider, semester och rättigheter för över 3,4 miljoner
              anställda — men informationen har historiskt varit fragmenterad
              över dussintals fackliga webbplatser, ofta bakom inloggning och
              skriven på svårtolkat juridiskt språk.
            </p>
            <p>
              Vi sammanfattar och förklarar alla 617 svenska kollektivavtal på
              klarspråk. Med hjälp av AI-teknik kan du ställa frågor om ditt
              avtal, jämföra villkor mellan branscher och förstå vad som
              faktiskt gäller på din arbetsplats.
            </p>
            <p>
              Plattformen är oberoende — vi är inte knutna till något
              fackförbund eller någon arbetsgivarorganisation. Vårt mål är att
              informationen ska vara tillgänglig för alla, oavsett facklig
              tillhörighet.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="pb-12 sm:pb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Vad vi erbjuder
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-[12px] border border-border bg-white p-5 shadow-sm"
              >
                <f.icon size={22} className="text-accent mb-2" />
                <p className="font-semibold text-text-primary text-sm">
                  {f.title}
                </p>
                <p className="text-sm text-text-secondary mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Company */}
        <section className="pb-12 sm:pb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Vem står bakom
          </h2>
          <div className="space-y-4 text-text-primary leading-relaxed">
            <p>
              kollektivavtal.ai drivs av Etablera Mera AB, ett svenskt
              mediehus som bygger och driver nischade digitala plattformar.
              Bolaget grundades av Kim Stockblom och har sin bas i Stockholm.
            </p>
            <p>
              Etablera Mera AB driver ett flertal sajter inom arbetsmarknad,
              juridik och företagande, däribland allaadvokater.se,
              redovisning.ai, startaenskildfirma.se och markochanlaggning.se.
            </p>
          </div>

          <div className="mt-6 rounded-[12px] border border-border bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <Building2 size={18} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-text-primary">Bolag</p>
                  <p className="text-text-secondary">Etablera Mera AB</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText size={18} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-text-primary">Org.nr</p>
                  <p className="text-text-secondary">559444-2526</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users size={18} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-text-primary">Grundare</p>
                  <p className="text-text-secondary">Kim Stockblom</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-text-primary">E-post</p>
                  <a
                    href="mailto:info@kollektivavtal.ai"
                    className="text-accent hover:underline"
                  >
                    info@kollektivavtal.ai
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:col-span-2">
                <Globe size={18} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-text-primary">Webbplatser</p>
                  <p className="text-text-secondary">
                    kollektivavtal.ai | allakollektivavtal.se
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data quality */}
        <section className="pb-12 sm:pb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Vår datakvalitet
          </h2>
          <p className="text-text-primary leading-relaxed mb-6">
            Vi tar datakvalitet på allvar. Vår information kommer från tre typer
            av källor:
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
              <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-800">
                  Verifierad data (grön badge)
                </p>
                <p className="text-sm text-green-700 mt-1">
                  32 avtal där löner, OB-tillägg och villkor är hämtade direkt
                  från officiella avtalstexter (PDF). Dessa markeras med
                  &quot;Verifierad lönedata&quot; på avtalssidan.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800">
                  Uppskattad data (gul badge)
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  Övriga avtal där löneuppgifter är uppskattningar baserade på
                  branschdata. Dessa markeras tydligt med &quot;Uppskattade
                  löneuppgifter&quot; och en uppmaning att kontrollera med
                  fackförbundet.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200">
              <Scale className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-blue-800">
                  Rättsfall och statistik
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  2 009 domar importerade från Domstolsverkets öppna API.
                  Lönestatistik från SCB via deras officiella API, i enlighet
                  med tecknat API-avtal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="pb-12 sm:pb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Viktig information
          </h2>
          <div className="rounded-[12px] bg-amber-50 border border-amber-200 p-5 space-y-3 text-sm text-amber-900 leading-relaxed">
            <p>
              Innehållet på kollektivavtal.ai är vägledande och ersätter inte
              officiella kollektivavtal. Vi sammanfattar avtal i egna ord —
              avtalstexter citeras aldrig ordagrant.
            </p>
            <p>
              AI-chattfunktionen är ett informationsverktyg, inte juridisk
              rådgivning. Svaren kan innehålla fel. Kontakta alltid ditt
              fackförbund eller en arbetsrättsjurist för bindande besked.
            </p>
            <p>
              Vi återpublicerar inte avtalstexter. Fulltext från avtals-PDF:er
              används enbart som intern kontext för AI-svarsgenering och visas
              aldrig publikt.
            </p>
            <p>
              SCB-data visas med &quot;Källa: SCB&quot; i enlighet med
              API-avtalet.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="pb-12 sm:pb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Kontakta oss
          </h2>
          <p className="text-text-primary leading-relaxed mb-6">
            Har du frågor, synpunkter eller vill samarbeta? Kontakta oss:
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <div className="rounded-[12px] border border-border bg-white p-5 shadow-sm">
              <Mail size={20} className="text-accent mb-2" />
              <p className="text-sm font-medium text-text-primary">
                Allmän kontakt
              </p>
              <a
                href="mailto:info@kollektivavtal.ai"
                className="text-sm text-accent hover:underline"
              >
                info@kollektivavtal.ai
              </a>
            </div>

            <div className="rounded-[12px] border border-border bg-white p-5 shadow-sm">
              <Building2 size={20} className="text-accent mb-2" />
              <p className="text-sm font-medium text-text-primary">
                Företagskontakt
              </p>
              <a
                href="mailto:kim@etableramera.se"
                className="text-sm text-accent hover:underline"
              >
                kim@etableramera.se
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Följ oss på ${social.name}`}
                className="text-text-secondary hover:text-accent transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="pb-16 sm:pb-20">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Flerspråkigt stöd
          </h2>
          <p className="text-text-primary leading-relaxed">
            kollektivavtal.ai finns på sju språk: svenska, engelska, arabiska,
            somaliska, persiska, spanska och polska. Använd språkväljaren högst
            upp på sidan för att byta språk.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { flag: "\u{1F1F8}\u{1F1EA}", name: "Svenska" },
              { flag: "\u{1F1EC}\u{1F1E7}", name: "English" },
              { flag: "\u{1F1F8}\u{1F1E6}", name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" },
              { flag: "\u{1F1F8}\u{1F1F4}", name: "Soomaali" },
              { flag: "\u{1F1EE}\u{1F1F7}", name: "\u0641\u0627\u0631\u0633\u06CC" },
              { flag: "\u{1F1EA}\u{1F1F8}", name: "Espa\u00F1ol" },
              { flag: "\u{1F1F5}\u{1F1F1}", name: "Polski" },
            ].map((lang) => (
              <span
                key={lang.name}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-border text-sm text-text-secondary"
              >
                <span>{lang.flag}</span>
                {lang.name}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Person schema for E-E-A-T */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            mainEntity: {
              "@type": "Organization",
              name: "Etablera Mera AB",
              url: "https://kollektivavtal.ai",
              founder: {
                "@type": "Person",
                name: "Kim Stockblom",
              },
              description:
                "Oberoende informationsplattform som sammanfattar och förklarar Sveriges 617 kollektivavtal.",
              email: "info@kollektivavtal.ai",
              sameAs: [
                "https://www.linkedin.com/company/kollektivavtal-ai/",
                "https://www.instagram.com/kollektivavtal.ai",
                "https://www.facebook.com/profile.php?id=61587547443940",
                "https://www.youtube.com/@Allakollektivavtal",
              ],
            },
          }),
        }}
      />
    </>
  );
}
