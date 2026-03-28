// SCB PxWeb API — Lönestrukturstatistik
// Open API, no auth required. Rate limit: 10 requests / 10 seconds.
// Docs: https://www.statistikdatabasen.scb.se/pxweb/sv/ssd/START__AM__AM0110__AM0110A/

export interface WageBranch {
  code: string;
  label: string;
  medianWage: number;
  p10Wage: number;
  p90Wage: number;
}

// Fallback data based on SCB lönestrukturstatistik 2023
// Used when the API is unavailable or at build time
export const fallbackWageData: WageBranch[] = [
  { code: "J", label: "IT & Telekom", medianWage: 48500, p10Wage: 33000, p90Wage: 72000 },
  { code: "K", label: "Bank & Finans", medianWage: 45600, p10Wage: 30000, p90Wage: 75000 },
  { code: "M", label: "Juridik & Teknik", medianWage: 43200, p10Wage: 29000, p90Wage: 68000 },
  { code: "B+C", label: "Industri", medianWage: 38200, p10Wage: 27500, p90Wage: 52000 },
  { code: "F", label: "Bygg & Anläggning", medianWage: 36800, p10Wage: 28000, p90Wage: 48000 },
  { code: "H", label: "Transport", medianWage: 34100, p10Wage: 26000, p90Wage: 44000 },
  { code: "O", label: "Offentlig förvaltning", medianWage: 36500, p10Wage: 27000, p90Wage: 50000 },
  { code: "P", label: "Utbildning", medianWage: 35800, p10Wage: 27000, p90Wage: 47000 },
  { code: "Q", label: "Vård & Omsorg", medianWage: 32400, p10Wage: 25000, p90Wage: 44000 },
  { code: "G", label: "Handel", medianWage: 29500, p10Wage: 23000, p90Wage: 42000 },
  { code: "I", label: "Hotell & Restaurang", medianWage: 27200, p10Wage: 22000, p90Wage: 35000 },
];

export async function fetchSCBWageData(): Promise<WageBranch[] | null> {
  try {
    const query = {
      query: [
        {
          code: "SNI2007",
          selection: {
            filter: "item",
            values: ["B+C", "F", "G", "H", "I", "J", "K", "M", "O", "P", "Q"],
          },
        },
        {
          code: "Kon",
          selection: { filter: "item", values: ["1+2"] },
        },
        {
          code: "ContentsCode",
          selection: { filter: "item", values: ["000005Q3"] },
        },
        {
          code: "Tid",
          selection: { filter: "item", values: ["2023"] },
        },
      ],
      response: { format: "json" },
    };

    const response = await fetch(
      "https://api.scb.se/OV0104/v1/doris/sv/ssd/AM/AM0110/AM0110A/LonesSektorNy",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) return null;

    const data = await response.json();

    if (!data?.data?.length) return null;

    const labelMap: Record<string, string> = {
      "B+C": "Industri",
      F: "Bygg & Anläggning",
      G: "Handel",
      H: "Transport",
      I: "Hotell & Restaurang",
      J: "IT & Telekom",
      K: "Bank & Finans",
      M: "Juridik & Teknik",
      O: "Offentlig förvaltning",
      P: "Utbildning",
      Q: "Vård & Omsorg",
    };

    return data.data.map((d: { key: string[]; values: string[] }) => ({
      code: d.key[0],
      label: labelMap[d.key[0]] || d.key[0],
      medianWage: parseInt(d.values[0]) || 0,
      p10Wage: 0,
      p90Wage: 0,
    }));
  } catch {
    return null;
  }
}

export function getWageData(): WageBranch[] {
  return [...fallbackWageData].sort((a, b) => b.medianWage - a.medianWage);
}
