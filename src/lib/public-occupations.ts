import type { Occupation } from "@/data/occupations";
import scbWages from "@/data/scb-occupation-wages.json";

const wagesBySlug = new Map(scbWages.occupations.map((row) => [row.slug, row]));

type PublicOccupationBase = Pick<
  Occupation,
  "slug" | "title" | "titleGenitive" | "category"
>;

// Kept separate from the old hand-written occupation database so client
// bundles contain only the occupations matched to the official SCB table.
const PUBLIC_OCCUPATION_BASES: PublicOccupationBase[] = [
  { slug: "vardbitrade", title: "Vårdbiträde", titleGenitive: "vårdbiträde", category: "Vård & Omsorg" },
  { slug: "sjukskoterska", title: "Sjuksköterska", titleGenitive: "sjuksköterska", category: "Vård & Omsorg" },
  { slug: "barnskotare", title: "Barnskötare", titleGenitive: "barnskötare", category: "Skola & Utbildning" },
  { slug: "forskollararare", title: "Förskollärare", titleGenitive: "förskollärare", category: "Skola & Utbildning" },
  { slug: "larare-grundskola", title: "Lärare grundskola", titleGenitive: "grundskollärare", category: "Skola & Utbildning" },
  { slug: "larare-gymnasium", title: "Lärare gymnasium", titleGenitive: "gymnasielärare", category: "Skola & Utbildning" },
  { slug: "ambulanssjukvardare", title: "Ambulanssjukvårdare", titleGenitive: "ambulanssjukvårdare", category: "Vård & Omsorg" },
  { slug: "brandman", title: "Brandman", titleGenitive: "brandman", category: "Övriga" },
  { slug: "kassapersonal", title: "Kassapersonal", titleGenitive: "kassapersonal", category: "Handel" },
  { slug: "lagerarbetare", title: "Lagerarbetare", titleGenitive: "lagerarbetare", category: "Handel" },
  { slug: "butikschef", title: "Butikschef", titleGenitive: "butikschef", category: "Handel" },
  { slug: "elektriker", title: "Elektriker", titleGenitive: "elektriker", category: "Bygg" },
  { slug: "anlaggningsarbetare", title: "Anläggningsarbetare", titleGenitive: "anläggningsarbetare", category: "Bygg" },
  { slug: "snickare", title: "Snickare", titleGenitive: "snickare", category: "Bygg" },
  { slug: "betongarbetare", title: "Betongarbetare", titleGenitive: "betongarbetare", category: "Bygg" },
  { slug: "malare", title: "Målare", titleGenitive: "målare", category: "Bygg" },
  { slug: "rormokare", title: "Rörmokare", titleGenitive: "rörmokare", category: "Bygg" },
  { slug: "svetsare", title: "Svetsare", titleGenitive: "svetsare", category: "Industri" },
  { slug: "cnc-opertor", title: "CNC-operatör", titleGenitive: "CNC-operatör", category: "Industri" },
  { slug: "systemutvecklare", title: "Systemutvecklare", titleGenitive: "systemutvecklare", category: "IT" },
  { slug: "lastbilschauffor", title: "Lastbilschaufför", titleGenitive: "lastbilschaufför", category: "Transport" },
  { slug: "busschauffor", title: "Busschaufför", titleGenitive: "busschaufför", category: "Transport" },
  { slug: "kock", title: "Kock", titleGenitive: "kock", category: "Hotell & Restaurang" },
  { slug: "servitor", title: "Servitör", titleGenitive: "servitör", category: "Hotell & Restaurang" },
  { slug: "hotellreceptionist", title: "Hotellreceptionist", titleGenitive: "hotellreceptionist", category: "Hotell & Restaurang" },
  { slug: "bartender", title: "Bartender", titleGenitive: "bartender", category: "Hotell & Restaurang" },
  { slug: "bankradgivare", title: "Bankrådgivare", titleGenitive: "bankrådgivare", category: "Bank" },
  { slug: "polis", title: "Polis", titleGenitive: "polis", category: "Stat" },
  { slug: "kriminalvardare", title: "Kriminalvårdare", titleGenitive: "kriminalvårdare", category: "Stat" },
  { slug: "fastighetsskotare", title: "Fastighetsskötare", titleGenitive: "fastighetsskötare", category: "Övriga" },
  { slug: "frisor", title: "Frisör", titleGenitive: "frisör", category: "Övriga" },
  { slug: "personlig-assistent", title: "Personlig assistent", titleGenitive: "personlig assistent", category: "Övriga" },
];

export const publicOccupations: Occupation[] = PUBLIC_OCCUPATION_BASES.map(
  (occupation) => {
    const wage = wagesBySlug.get(occupation.slug)!;
    return {
      ...occupation,
      agreement: "",
      sector: "Alla sektorer",
      description: `${occupation.title} motsvarar SCB:s yrkesgrupp ${wage.code} ${wage.label}. Löneuppgifterna avser samtliga sektorer och totalt för kvinnor och män år ${scbWages.year}.`,
      aeoAnswer: `Medianlönen i SCB:s yrkesgrupp ${wage.label} var ${wage.median.toLocaleString("sv-SE")} kr per månad ${scbWages.year}. Den 10:e percentilen var ${wage.p10.toLocaleString("sv-SE")} kr och den 90:e percentilen ${wage.p90.toLocaleString("sv-SE")} kr.`,
      salary: { minimum: wage.p10, median: wage.median, p90: wage.p90 },
      obRates: null,
      workHours: "Kontrollera i det kollektivavtal som gäller på arbetsplatsen",
      vacation: "Kontrollera i det kollektivavtal som gäller på arbetsplatsen",
      pension: "Kontrollera i det kollektivavtal som gäller på arbetsplatsen",
      parentalPay: "Kontrollera i det kollektivavtal som gäller på arbetsplatsen",
      noticePeriod: "Kontrollera i det kollektivavtal som gäller på arbetsplatsen",
      overtimeRate: "Kontrollera i det kollektivavtal som gäller på arbetsplatsen",
      education: "",
      demandOutlook: "Ingen prognos publicerad",
      faq: [],
      relatedOccupations: [],
    };
  }
);

export const scbOccupationWageSource = scbWages;

export function getPublicOccupationBySlug(slug: string) {
  return publicOccupations.find((occupation) => occupation.slug === slug);
}
