import type { Agreement } from "@/data/agreements";

export interface WageInput {
  agreement: Agreement;
  roleIndex: number;
  yearsExperience: number;
  employmentRate: number; // 1.0 = heltid, 0.75, 0.5 etc
  obHours: {
    weekdayEvening: number;
    night: number;
    weekend: number;
    holiday: number;
  };
}

export interface WageResult {
  baseWage: number;
  medianWage: number;
  obTotal: number;
  obBreakdown: {
    weekdayEvening: number;
    night: number;
    weekend: number;
    holiday: number;
  };
  pensionContribution: number;
  totalEstimate: number;
}

function parseKr(str: string): number {
  const match = str.replace(/\s/g, "").match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function parseObRate(str: string): number {
  const match = str.match(/~?(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function getPensionRate(pensionStr: string): number {
  if (pensionStr.includes("ITP")) return 0.045;
  if (pensionStr.includes("KAP-KL") || pensionStr.includes("AKAP-KR")) return 0.045;
  if (pensionStr.includes("SAF-LO")) return 0.045;
  if (pensionStr.includes("Byggnads")) return 0.04;
  return 0.04;
}

export function calculateWage(input: WageInput): WageResult {
  const { agreement, roleIndex, yearsExperience, employmentRate, obHours } = input;

  const role = agreement.wageTable[roleIndex] || agreement.wageTable[0];
  const baseMin = parseKr(role.minimum);
  const median = parseKr(role.median);

  // Experience adjustment: +0.8% per year of experience, capped at 25 years
  const expYears = Math.min(yearsExperience, 25);
  const expMultiplier = 1 + expYears * 0.008;

  const adjustedBase = Math.round(baseMin * expMultiplier * employmentRate);
  const adjustedMedian = Math.round(median * expMultiplier * employmentRate);

  // OB calculation
  const obWeekday = parseObRate(agreement.keyFacts.obWeekday);
  const obNight = parseObRate(agreement.keyFacts.obNight);
  const obWeekend = parseObRate(agreement.keyFacts.obWeekend);
  const obHoliday = parseObRate(agreement.keyFacts.obHoliday);

  const obBreakdown = {
    weekdayEvening: obHours.weekdayEvening * obWeekday,
    night: obHours.night * obNight,
    weekend: obHours.weekend * obWeekend,
    holiday: obHours.holiday * obHoliday,
  };
  const obTotal =
    obBreakdown.weekdayEvening + obBreakdown.night + obBreakdown.weekend + obBreakdown.holiday;

  // Pension
  const pensionRate = getPensionRate(agreement.keyFacts.pension);
  const pensionContribution = Math.round(adjustedBase * pensionRate);

  const totalEstimate = adjustedBase + obTotal;

  return {
    baseWage: adjustedBase,
    medianWage: adjustedMedian,
    obTotal,
    obBreakdown,
    pensionContribution,
    totalEstimate,
  };
}
