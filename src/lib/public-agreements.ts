import type { Agreement } from "@/data/agreements";
import {
  AGREEMENTS_WITH_SOURCE_MATCHED_WAGE_TABLES,
  createPublicAgreementView,
} from "@/lib/agreement-fact-status";

type PublicAgreementBase = Pick<
  Agreement,
  "slug" | "sector" | "sectorLabel"
>;

// Deliberately separate from the older raw agreement database. Client pages
// may import this module without sending unreviewed legacy content to users.
const PUBLIC_AGREEMENT_BASES: PublicAgreementBase[] = [
  { slug: "hok-kommunal", sector: "kommun_region", sectorLabel: "Kommun/region" },
  { slug: "handelsavtalet", sector: "privat", sectorLabel: "Privat handel" },
  { slug: "lager-ehandelsavtalet", sector: "privat", sectorLabel: "Privat handel" },
  { slug: "byggavtalet", sector: "privat", sectorLabel: "Privat bygg" },
  { slug: "byggforetagen-tjanstemannaavtal", sector: "privat", sectorLabel: "Privat bygg" },
  { slug: "ab-kommunalt", sector: "kommun_region", sectorLabel: "Kommun/region" },
  { slug: "hok-vision", sector: "kommun_region", sectorLabel: "Kommun/region" },
  { slug: "hotell-restaurang", sector: "privat", sectorLabel: "Privat hotell/restaurang" },
  { slug: "besoksnaringens-tjanstemannaavtal", sector: "privat", sectorLabel: "Privat hotell/restaurang" },
  { slug: "villkorsavtal-saco", sector: "stat", sectorLabel: "Statlig sektor" },
  { slug: "villkorsavtal-seko", sector: "stat", sectorLabel: "Statlig sektor" },
  { slug: "i-avtalet", sector: "privat", sectorLabel: "Privat industri" },
  { slug: "stal-och-metall", sector: "privat", sectorLabel: "Privat industri" },
  { slug: "stal-metallindustrin-tjansteman", sector: "privat", sectorLabel: "Privat stål- och metallindustri" },
  { slug: "gruvindustrin-tjansteman", sector: "privat", sectorLabel: "Privat gruvindustri" },
  { slug: "gruvindustrin-if-metall", sector: "privat", sectorLabel: "Privat gruvindustri" },
  { slug: "gemensamma-metall", sector: "privat", sectorLabel: "Privat industri" },
  { slug: "glasavtalet-industri", sector: "privat", sectorLabel: "Privat industri" },
  { slug: "samhallsavtalet", sector: "privat", sectorLabel: "Samhall" },
  { slug: "lakare-kommun", sector: "kommun_region", sectorLabel: "Kommun/region" },
  { slug: "vag-banavtalet-seko", sector: "privat", sectorLabel: "Privat anläggning" },
  { slug: "spartrafikavtalet", sector: "privat", sectorLabel: "Privat spårtrafik" },
  { slug: "branschavtal-kommunikation", sector: "privat", sectorLabel: "Privat post och kommunikation" },
  { slug: "branschavtal-energi-efa", sector: "privat", sectorLabel: "Privat energi" },
  { slug: "glasmasteriavtalet", sector: "privat", sectorLabel: "Privat bygg" },
  { slug: "entreprenadmaskinavtalet", sector: "privat", sectorLabel: "Privat bygg" },
  { slug: "plat-ventilationsavtalet", sector: "privat", sectorLabel: "Privat bygg" },
  { slug: "maleriavtalet", sector: "privat", sectorLabel: "Privat bygg" },
  { slug: "laraavtalet", sector: "kommun_region", sectorLabel: "Kommun/region" },
  { slug: "sjukskoterska-avtal", sector: "kommun_region", sectorLabel: "Kommun/region" },
  { slug: "vvs-montorsavtalet", sector: "privat", sectorLabel: "Privat installation" },
  { slug: "hok-akademiker", sector: "kommun_region", sectorLabel: "Kommun/region" },
  { slug: "teknikavtalet-ifmetall", sector: "privat", sectorLabel: "Privat industri" },
  { slug: "teknikavtalet-tjansteman", sector: "privat", sectorLabel: "Privat industri" },
  { slug: "handelns-tjanstemannaavtal", sector: "privat", sectorLabel: "Privat handel" },
  { slug: "it-avtalet", sector: "privat", sectorLabel: "Privat IT/tech" },
  { slug: "telekomavtalet", sector: "privat", sectorLabel: "Privat IT/telekom" },
  { slug: "innovationsavtalet", sector: "privat", sectorLabel: "Privat teknikkonsult" },
  { slug: "grona-avtalet", sector: "privat", sectorLabel: "Privat tjänstesektor" },
  { slug: "systembolagsavtalet", sector: "privat", sectorLabel: "Privat handel" },
  { slug: "transportavtalet", sector: "privat", sectorLabel: "Privat transport" },
  { slug: "vardforetagarna-bransch-e", sector: "privat", sectorLabel: "Privat vård och omsorg" },
  { slug: "vardforetagarna-bransch-f", sector: "privat", sectorLabel: "Privat äldreomsorg" },
  { slug: "vardforetagarna-bransch-g", sector: "privat", sectorLabel: "Privat personlig assistans" },
  { slug: "livsmedelsavtalet", sector: "privat", sectorLabel: "Privat livsmedelsindustri" },
  { slug: "livsmedelsindustrin-tjanstemannaavtal", sector: "privat", sectorLabel: "Privat livsmedelsindustri" },
  { slug: "serviceentreprenad-fastighets-seko", sector: "privat", sectorLabel: "Privat service" },
  { slug: "serviceentreprenad-kommunal", sector: "privat", sectorLabel: "Privat service" },
  { slug: "fremia-personlig-assistans", sector: "privat", sectorLabel: "Privat personlig assistans" },
  { slug: "bussbranschavtalet", sector: "privat", sectorLabel: "Privat transport" },
  { slug: "tjanstemannaavtalet-transportforetagen", sector: "privat", sectorLabel: "Privat transport" },
  { slug: "tjanstemannaavtalet-motorbranschen", sector: "privat", sectorLabel: "Privat motorbransch" },
  { slug: "motorbranschavtalet", sector: "privat", sectorLabel: "Privat motorbransch" },
  { slug: "bankavtalet-finansforbundet", sector: "privat", sectorLabel: "Privat bank/finans" },
  { slug: "bankavtalet-saco", sector: "privat", sectorLabel: "Privat bank/finans" },
  { slug: "forsakringsavtalet-forena", sector: "privat", sectorLabel: "Privat försäkring" },
  { slug: "forsakringsavtalet-saco", sector: "privat", sectorLabel: "Privat försäkring" },
  { slug: "apoteksavtalet-svensk-handel", sector: "privat", sectorLabel: "Privat apotek" },
  { slug: "apoteksforetagen-almega", sector: "privat", sectorLabel: "Privat apotek" },
  { slug: "journalistavtalet-dagspress", sector: "privat", sectorLabel: "Privat media" },
  { slug: "journalistavtalet-public-service", sector: "privat", sectorLabel: "Privat media" },
  { slug: "journalistavtalet-tidskrift", sector: "privat", sectorLabel: "Privat media" },
  { slug: "journalistavtalet-etermedier", sector: "privat", sectorLabel: "Privat media" },
  { slug: "journalistavtalet-bemanning", sector: "privat", sectorLabel: "Privat media" },
  { slug: "sobona-bok-besoksnaring-kulturarv", sector: "kommun_region", sectorLabel: "Kommunalt företag" },
  { slug: "sobona-bok-energi", sector: "kommun_region", sectorLabel: "Kommunalt företag" },
  { slug: "sobona-bok-fastigheter", sector: "kommun_region", sectorLabel: "Kommunalt företag" },
  { slug: "sobona-bok-flygplatser", sector: "kommun_region", sectorLabel: "Kommunalt företag" },
  { slug: "sobona-bok-vatten-miljo", sector: "kommun_region", sectorLabel: "Kommunalt företag" },
  { slug: "friskoleavtalet-larare", sector: "privat", sectorLabel: "Privat utbildning" },
  { slug: "friskoleavtalet-kommunal", sector: "privat", sectorLabel: "Privat utbildning" },
  { slug: "svenska-kyrkan-tjansteman", sector: "privat", sectorLabel: "Svenska kyrkan" },
  { slug: "svenska-kyrkan-kommunal", sector: "privat", sectorLabel: "Svenska kyrkan" },
  { slug: "svemek-avtalet", sector: "privat", sectorLabel: "Privat industri" },
  { slug: "kemiskt-avtal-ifmetall", sector: "privat", sectorLabel: "Privat kemi" },
  { slug: "ikem-tjanstemannaavtal", sector: "privat", sectorLabel: "Privat kemi" },
  { slug: "installationsavtalet", sector: "privat", sectorLabel: "Privat installation" },
  { slug: "bemanningsavtalet", sector: "privat", sectorLabel: "Privat bemanning" },
  { slug: "kompetensforetagen-tjansteman", sector: "privat", sectorLabel: "Privat bemanning" },
  { slug: "fastighetsavtalet", sector: "privat", sectorLabel: "Privat fastighet" },
  { slug: "bevaknings-sakerhetsavtalet", sector: "privat", sectorLabel: "Privat bevakning och säkerhet" },
  { slug: "fastigheter-arbetare-almega", sector: "privat", sectorLabel: "Privat fastighet" },
  { slug: "f-avtalet-fastigo", sector: "privat", sectorLabel: "Fastighetsarbete" },
  { slug: "skogsavtalet-privat", sector: "privat", sectorLabel: "Privat skogsbruk" },
  { slug: "sagverksavtalet-industriarbetsgivarna", sector: "privat", sectorLabel: "Privat sågverksindustri" },
  { slug: "sagverksindustrin-tjansteman", sector: "privat", sectorLabel: "Privat sågverksindustri" },
  { slug: "traindustriavtalet-tmf", sector: "privat", sectorLabel: "Privat träindustri" },
  { slug: "traindustrin-tjansteman-tmf", sector: "privat", sectorLabel: "Privat träindustri" },
  { slug: "massa-pappersindustrin-pappers", sector: "privat", sectorLabel: "Privat massa- och pappersindustri" },
  { slug: "massa-pappersindustrin-tjansteman", sector: "privat", sectorLabel: "Privat massa- och pappersindustri" },
  { slug: "skogsavtalet", sector: "stat", sectorLabel: "Statligt skogsbruk" },
  { slug: "villkorsavtal-ofr", sector: "stat", sectorLabel: "Statlig sektor" },
];

function createSafeAgreementBase(base: PublicAgreementBase): Agreement {
  return {
    ...base,
    name: "",
    shortName: "",
    parties: { unions: [], employers: [] },
    employeeCount: 0,
    validPeriod: "",
    summary: "",
    keyFacts: {
      minimumWage: "",
      overtimeRate: "",
      obWeekday: "",
      obNight: "",
      obWeekend: "",
      obHoliday: "",
      vacationDays: "",
      parentalPay: "",
      noticePeriod: "",
      pension: "",
      workHoursPerWeek: "",
    },
    wageTable: [],
    faq: [],
    sources: [],
    relatedAgreements: [],
    aiSystemPrompt: "",
  };
}

export const publicAgreements = PUBLIC_AGREEMENT_BASES.map((base) =>
  createPublicAgreementView(createSafeAgreementBase(base))
);

export const publicWageAgreements = publicAgreements.filter((agreement) =>
  AGREEMENTS_WITH_SOURCE_MATCHED_WAGE_TABLES.has(agreement.slug)
);

// Re-enable individual comparisons only after the comparison model itself has
// been reviewed. Keeping this as a literal empty list prevents legacy pairs
// from being included in client bundles.
export const publicComparisons: Array<{ slug1: string; slug2: string }> = [];
