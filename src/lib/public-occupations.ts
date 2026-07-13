import { occupations, type Occupation } from "@/data/occupations";
import scbWages from "@/data/scb-occupation-wages.json";
import { isVerifiedAgreement } from "@/lib/verified-agreements";

const wagesBySlug = new Map(scbWages.occupations.map((row) => [row.slug, row]));

export const publicOccupations: Occupation[] = occupations
  .filter((occupation) => wagesBySlug.has(occupation.slug))
  .map((occupation) => {
    const wage = wagesBySlug.get(occupation.slug)!;
    return {
      ...occupation,
      agreement: isVerifiedAgreement(occupation.agreement) ? occupation.agreement : "",
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
      demandOutlook: "Ingen prognos publicerad",
      faq: [],
      relatedOccupations: occupation.relatedOccupations.filter((slug) => wagesBySlug.has(slug)),
    };
  });

export const scbOccupationWageSource = scbWages;

export function getPublicOccupationBySlug(slug: string) {
  return publicOccupations.find((occupation) => occupation.slug === slug);
}
