import type { Agreement } from "@/data/agreements";

export const AGREEMENTS_WITH_SOURCE_MATCHED_WAGE_TABLES = new Set([
  "fastighetsavtalet",
  "bemanningsavtalet",
  "villkorsavtal-saco",
  "villkorsavtal-ofr",
  "glasmasteriavtalet",
  "plat-ventilationsavtalet",
  "maleriavtalet",
  "vvs-montorsavtalet",
  "hok-akademiker",
]);

const UNMATCHED_NUMERIC_FACTS: Partial<
  Record<string, Array<keyof Agreement["keyFacts"]>>
> = {
  "hok-kommunal": ["minimumWage", "overtimeRate", "obNight", "obWeekend"],
  handelsavtalet: ["obHoliday"],
  byggavtalet: ["minimumWage"],
  "ab-kommunalt": ["workHoursPerWeek"],
  "hok-vision": ["overtimeRate", "vacationDays"],
  "hotell-restaurang": ["minimumWage", "overtimeRate", "obHoliday"],
  installationsavtalet: ["minimumWage"],
  bemanningsavtalet: [
    "minimumWage",
    "overtimeRate",
    "obWeekday",
    "obNight",
    "obWeekend",
    "obHoliday",
  ],
  "i-avtalet": ["minimumWage"],
  "stal-och-metall": ["minimumWage", "obHoliday"],
  "gemensamma-metall": ["minimumWage", "overtimeRate", "obHoliday"],
  "glasavtalet-industri": ["minimumWage"],
  samhallsavtalet: ["minimumWage"],
  "lakare-kommun": ["minimumWage", "vacationDays"],
  "vag-banavtalet-seko": ["minimumWage"],
  glasmasteriavtalet: ["minimumWage"],
  "plat-ventilationsavtalet": ["minimumWage", "overtimeRate", "obHoliday"],
  maleriavtalet: ["minimumWage"],
  laraavtalet: ["minimumWage", "overtimeRate", "vacationDays"],
  "sjukskoterska-avtal": [
    "minimumWage",
    "overtimeRate",
    "obNight",
    "obWeekend",
    "vacationDays",
  ],
  "hok-akademiker": ["overtimeRate", "vacationDays"],
  "teknikavtalet-ifmetall": ["minimumWage"],
  "svemek-avtalet": ["minimumWage", "obHoliday"],
  "kemiskt-avtal-ifmetall": ["minimumWage", "obHoliday"],
};

export function getPublicKeyFact(
  agreement: Agreement,
  key: keyof Agreement["keyFacts"]
): string {
  if (UNMATCHED_NUMERIC_FACTS[agreement.slug]?.includes(key)) {
    return "Kontrollera i den officiella avtalstexten";
  }
  return agreement.keyFacts[key];
}

export function createPublicAgreementView(agreement: Agreement): Agreement {
  const keyFacts = Object.fromEntries(
    (Object.keys(agreement.keyFacts) as Array<keyof Agreement["keyFacts"]>).map(
      (key) => [key, getPublicKeyFact(agreement, key)]
    )
  ) as Agreement["keyFacts"];

  return {
    ...agreement,
    summary: `${agreement.name} är ett kollektivavtal mellan ${agreement.parties.unions.join(
      ", "
    )} och ${agreement.parties.employers.join(
      ", "
    )}. Det lokala källunderlaget avser perioden ${agreement.validPeriod}.`,
    keyFacts,
    wageTable: AGREEMENTS_WITH_SOURCE_MATCHED_WAGE_TABLES.has(agreement.slug)
      ? agreement.wageTable.map((row) => ({
          ...row,
          median: "Ej publicerad",
          comment: "Lägstanivån ska alltid kontrolleras mot den officiella avtalstexten",
        }))
      : [],
    faq: [],
  };
}
