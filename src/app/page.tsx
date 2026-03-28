import Link from "next/link";
import {
  Search,
  FileText,
  Users,
  ShieldCheck,
  MessageSquare,
  Building2,
  Cpu,
  HardHat,
  ShoppingCart,
  Truck,
  UtensilsCrossed,
  Landmark,

  ArrowRight,
  Scale,
  Shield,
  Rocket,
  Check,
  X,
} from "lucide-react";
import SalaryChart from "@/components/SalaryChart";

const quickLinks = [
  "Handelsavtalet",
  "Teknikavtalet",
  "Byggavtalet",
  "HÖK Kommunal",
  "IT-avtalet",
];

const keyStats = [
  { label: "617 avtal sammanfattade", icon: FileText },
  { label: "3,4 miljoner anställda täckta", icon: Users },
  { label: "92% avtalstäckning", icon: ShieldCheck },
  { label: "AI-expert på varje avtal", icon: MessageSquare },
];

const agreements = [
  {
    name: "HÖK Kommunal",
    desc: "Huvudöverenskommelse för kommunalt anställda inom vård, omsorg och skola",
    employees: "~1 100 000",
    icon: Building2,
    slug: "hok-kommunal",
  },
  {
    name: "Teknikavtalet",
    desc: "Industrins största avtal för ingenjörer, tekniker och montörer",
    employees: "~300 000",
    icon: Cpu,
    slug: "teknikavtalet",
  },
  {
    name: "Handelsavtalet",
    desc: "Avtal för anställda inom detaljhandel och partihandel",
    employees: "~250 000",
    icon: ShoppingCart,
    slug: "handelsavtalet",
  },
  {
    name: "Byggavtalet",
    desc: "Avtal för byggnadsarbetare och anläggningspersonal",
    employees: "~150 000",
    icon: HardHat,
    slug: "byggavtalet",
  },
  {
    name: "IT-avtalet",
    desc: "Avtal för anställda inom IT- och telekombranschen",
    employees: "~100 000",
    icon: Cpu,
    slug: "it-avtalet",
  },
  {
    name: "Transportavtalet",
    desc: "Avtal för yrkesförare, lagerarbetare och logistikpersonal",
    employees: "~120 000",
    icon: Truck,
    slug: "transportavtalet",
  },
  {
    name: "Hotell & Restaurang",
    desc: "Avtal för anställda inom hotell-, restaurang- och caféverksamhet",
    employees: "~130 000",
    icon: UtensilsCrossed,
    slug: "hotell-restaurang",
  },
  {
    name: "Statliga villkorsavtal",
    desc: "Villkorsavtal för statligt anställda inom myndigheter och verk",
    employees: "~270 000",
    icon: Landmark,
    slug: "statliga-villkorsavtal",
  },
];

const comparisonRows = [
  {
    feature: "Tjänstepension",
    med: "4,5% av lön",
    utan: "0 kr (om arbetsgivaren inte erbjuder)",
  },
  {
    feature: "Föräldralön",
    med: "Upp till 90% löneutfyllnad",
    utan: "Bara Försäkringskassans ersättning",
  },
  {
    feature: "OB-tillägg",
    med: "43–172 kr/tim",
    utan: "Inget OB garanterat",
  },
  {
    feature: "Inkomstförsäkring",
    med: "Ingår via facket",
    utan: "Måste tecknas privat",
  },
  {
    feature: "Uppsägningstid",
    med: "Upp till 6 mån",
    utan: "1 mån enligt LAS",
  },
];

const courtCases = [
  {
    date: "2026-02-15",
    title: "AD 2026 nr 12 — Uppsägning pga arbetsbrist ogiltigförklarad",
    summary:
      "Arbetsdomstolen fann att arbetsgivaren inte fullgjort sin omplaceringsskyldighet enligt MBL innan uppsägning verkställdes.",
    area: "Teknikavtalet",
  },
  {
    date: "2026-01-28",
    title: "AD 2026 nr 8 — Brott mot övertidsregler i kollektivavtal",
    summary:
      "Arbetsgivare dömdes till skadestånd för systematiskt brott mot avtalade övertidsregler inom handeln.",
    area: "Handelsavtalet",
  },
  {
    date: "2026-01-10",
    title: "AD 2026 nr 3 — Diskriminering vid lönesättning",
    summary:
      "En kvinnlig anställd fick rätt i tvist om könsdiskriminerande lönesättning inom kommunal verksamhet.",
    area: "HÖK Kommunal",
  },
];

const crossSelling = [
  {
    title: "Hitta en arbetsrättsjurist",
    href: "https://allaadvokater.se",
    icon: Scale,
  },
  {
    title: "Jämför försäkringar",
    href: "https://allaforsakringar.com",
    icon: Shield,
  },
  {
    title: "Starta eget?",
    href: "https://startaenskildfirma.se",
    icon: Rocket,
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
            Förstå ditt kollektivavtal — på klarspråk
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            Sveriges största AI-drivna guide till alla 617 kollektivavtal. Sök, jämför och chatta
            med en expert på just ditt avtal.
          </p>

          <div className="mt-8 relative max-w-xl mx-auto">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
            />
            <input
              type="text"
              placeholder="Sök på yrke, bransch eller företag..."
              className="w-full rounded-[12px] bg-white text-text-primary py-4 pl-12 pr-4 text-base shadow-lg outline-none placeholder:text-text-secondary focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {quickLinks.map((label) => (
              <Link
                key={label}
                href={`/kollektivavtal/${label.toLowerCase().replace(/\s+/g, "-").replace(/ö/g, "o")}`}
                className="rounded-[8px] bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nyckeltal */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {keyStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[12px] border border-border bg-white p-5 sm:p-6 shadow-sm text-center"
              >
                <stat.icon size={28} className="mx-auto text-accent mb-3" />
                <p className="text-sm sm:text-base font-semibold text-text-primary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Populära avtalsområden */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8">
            Populära avtalsområden
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {agreements.map((a) => (
              <Link
                key={a.slug}
                href={`/kollektivavtal/${a.slug}`}
                className="group rounded-[12px] border border-border bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <a.icon size={24} className="text-accent mb-3" />
                <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                  {a.name}
                </h3>
                <p className="text-sm text-text-secondary mt-1 leading-snug">{a.desc}</p>
                <p className="text-xs text-text-secondary mt-2">{a.employees} anställda</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-3">
                  Läs mer <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lönestatistik */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8">
            Lönestatistik per bransch
          </h2>
          <div className="rounded-[12px] border border-border bg-white p-4 sm:p-6 shadow-sm">
            <SalaryChart />
          </div>
          <p className="text-xs text-text-secondary mt-3">Källa: SCB, egen bearbetning</p>
          <Link
            href="/statistik"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-2 hover:underline"
          >
            Se fullständig lönestatistik <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Vad förlorar du utan kollektivavtal? */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
            Vad förlorar du utan kollektivavtal?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl">
            Utan kollektivavtal saknar du tjänstepension, föräldralön, OB-tillägg och mycket mer.
          </p>
          <div className="overflow-x-auto rounded-[12px] border border-border bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background">
                  <th className="text-left p-4 font-semibold text-text-primary">Förmån</th>
                  <th className="text-left p-4 font-semibold text-success">Med kollektivavtal</th>
                  <th className="text-left p-4 font-semibold text-accent">Utan kollektivavtal</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-border last:border-0">
                    <td className="p-4 font-medium text-text-primary">{row.feature}</td>
                    <td className="p-4 text-text-primary">
                      <span className="inline-flex items-center gap-1.5">
                        <Check size={14} className="text-success" />
                        {row.med}
                      </span>
                    </td>
                    <td className="p-4 text-text-secondary">
                      <span className="inline-flex items-center gap-1.5">
                        <X size={14} className="text-accent" />
                        {row.utan}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <a
            href="https://allaforsakringar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-4 hover:underline"
          >
            Jämför försäkringar som kompenserar <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* Senaste från Arbetsdomstolen */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8">
            Senaste arbetsrättsdomar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {courtCases.map((c) => (
              <div
                key={c.title}
                className="rounded-[12px] border border-border bg-white p-5 shadow-sm"
              >
                <p className="text-xs text-text-secondary">{c.date}</p>
                <h3 className="font-semibold text-text-primary mt-1 leading-snug">{c.title}</h3>
                <p className="text-sm text-text-secondary mt-2 line-clamp-2">{c.summary}</p>
                <span className="inline-block mt-3 text-xs font-medium bg-background text-text-secondary px-2 py-1 rounded-[6px]">
                  {c.area}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/rattsfall"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-6 hover:underline"
          >
            Se alla rättsfall <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Cross-selling */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8">
            Behöver du mer hjälp?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {crossSelling.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[12px] border border-border bg-white p-6 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <item.icon size={32} className="mx-auto text-accent mb-3" />
                <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
