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
  { slug: "ab-kommunalt", sector: "kommun_region", sectorLabel: "Kommun/region" },
  { slug: "hok-vision", sector: "kommun_region", sectorLabel: "Kommun/region" },
  { slug: "hotell-restaurang", sector: "privat", sectorLabel: "Privat hotell/restaurang" },
  { slug: "villkorsavtal-saco", sector: "stat", sectorLabel: "Statlig sektor" },
  { slug: "i-avtalet", sector: "privat", sectorLabel: "Privat industri" },
  { slug: "stal-och-metall", sector: "privat", sectorLabel: "Privat industri" },
  { slug: "gemensamma-metall", sector: "privat", sectorLabel: "Privat industri" },
  { slug: "glasavtalet-industri", sector: "privat", sectorLabel: "Privat industri" },
  { slug: "samhallsavtalet", sector: "privat", sectorLabel: "Samhall" },
  { slug: "lakare-kommun", sector: "kommun_region", sectorLabel: "Kommun/region" },
  { slug: "vag-banavtalet-seko", sector: "privat", sectorLabel: "Privat anläggning" },
  { slug: "glasmasteriavtalet", sector: "privat", sectorLabel: "Privat bygg" },
  { slug: "entreprenadmaskinavtalet", sector: "privat", sectorLabel: "Privat bygg" },
  { slug: "plat-ventilationsavtalet", sector: "privat", sectorLabel: "Privat bygg" },
  { slug: "maleriavtalet", sector: "privat", sectorLabel: "Privat bygg" },
  { slug: "laraavtalet", sector: "kommun_region", sectorLabel: "Kommun/region" },
  { slug: "sjukskoterska-avtal", sector: "kommun_region", sectorLabel: "Kommun/region" },
  { slug: "vvs-montorsavtalet", sector: "privat", sectorLabel: "Privat installation" },
  { slug: "hok-akademiker", sector: "kommun_region", sectorLabel: "Kommun/region" },
  { slug: "teknikavtalet-ifmetall", sector: "privat", sectorLabel: "Privat industri" },
  { slug: "svemek-avtalet", sector: "privat", sectorLabel: "Privat industri" },
  { slug: "kemiskt-avtal-ifmetall", sector: "privat", sectorLabel: "Privat kemi" },
  { slug: "installationsavtalet", sector: "privat", sectorLabel: "Privat installation" },
  { slug: "bemanningsavtalet", sector: "privat", sectorLabel: "Privat bemanning" },
  { slug: "fastighetsavtalet", sector: "privat", sectorLabel: "Privat fastighet" },
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
