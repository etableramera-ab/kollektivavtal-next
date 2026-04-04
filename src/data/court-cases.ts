import importedCases from "./court-cases-imported.json";

export interface CourtCase {
  id: string;
  externalId: string;
  caseNumber: string;
  caseNumbers: string[];
  date: string;
  year: number;
  title: string;
  summary: string;
  topic: string;
  keywords: string[];
  relatedAgreement: string | null;
  outcome: string;
  sourceUrl: string;
  isGuiding: boolean;
  type: string;
}

export const courtCases: CourtCase[] = importedCases as CourtCase[];

export function getCourtCaseById(id: string): CourtCase | undefined {
  return courtCases.find((c) => c.id === id);
}

export function getCourtCasesByAgreement(slug: string): CourtCase[] {
  return courtCases.filter((c) => c.relatedAgreement === slug);
}

export function getCourtCasesByYear(year: number): CourtCase[] {
  return courtCases.filter((c) => c.year === year);
}

export function getAvailableYears(): number[] {
  const years = new Set(courtCases.map((c) => c.year));
  return Array.from(years).sort((a, b) => b - a);
}

export function getAvailableTopics(): string[] {
  const topics = new Set(courtCases.map((c) => c.topic));
  return Array.from(topics).sort();
}
