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

export function calculateWage(input: WageInput): never {
  void input;
  throw new Error(
    "Lönekalkylatorn är pausad tills beräkningsreglerna har källgranskats per avtal."
  );
}
