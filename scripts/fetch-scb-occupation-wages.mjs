import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const SOURCE_URL =
  "https://www.statistikdatabasen.scb.se/Resources/PX/bulk/ssd/sv/TAB5932_sv.zip";
const SOURCE_PAGE =
  "https://www.statistikdatabasen.scb.se/pxweb/sv/ssd/START__AM__AM0110__AM0110A/LoneSpridSektYrk4AN/";
const YEAR = "2025";

// Only direct, unambiguous matches between our occupation and SCB's SSYK label.
const SSYK_BY_SLUG = {
  vardbitrade: "5330",
  sjukskoterska: "2221",
  barnskotare: "5311",
  forskollararare: "2343",
  "larare-grundskola": "2341",
  "larare-gymnasium": "2330",
  ambulanssjukvardare: "5326",
  brandman: "5411",
  kassapersonal: "5230",
  lagerarbetare: "4322",
  butikschef: "5221",
  elektriker: "7411",
  anlaggningsarbetare: "7114",
  snickare: "7111",
  betongarbetare: "7113",
  malare: "7131",
  rormokare: "7125",
  svetsare: "7212",
  "cnc-opertor": "7223",
  systemutvecklare: "2512",
  lastbilschauffor: "8332",
  busschauffor: "8331",
  kock: "5120",
  servitor: "5131",
  hotellreceptionist: "4224",
  bartender: "5132",
  bankradgivare: "3312",
  polis: "3360",
  kriminalvardare: "5412",
  fastighetsskotare: "5152",
  frisor: "5141",
  "personlig-assistent": "5343",
};

const response = await fetch(SOURCE_URL);
if (!response.ok) throw new Error(`SCB svarade ${response.status}`);
const archive = "/tmp/scb-occupation-wages.zip";
writeFileSync(archive, Buffer.from(await response.arrayBuffer()));
const raw = execFileSync("unzip", ["-p", archive], { maxBuffer: 80 * 1024 * 1024 });
const csv = new TextDecoder("windows-1252").decode(raw);
const wantedCodes = new Set(Object.values(SSYK_BY_SLUG));
const byCode = {};

for (const line of csv.split(/\r?\n/)) {
  const match = line.match(
    /^"0 samtliga sektorer","(\d{4}) ([^"]+)","totalt","(\d{4})","([^"]+)",([^,]+)$/
  );
  if (!match || match[3] !== YEAR || !wantedCodes.has(match[1])) continue;
  const [, code, label, , measure, rawValue] = match;
  const value = Number(rawValue);
  if (!Number.isFinite(value)) continue;
  byCode[code] ||= { code, label };
  if (measure === "Medianlön") byCode[code].median = value;
  if (measure === "10:e percentilen") byCode[code].p10 = value;
  if (measure === "90:e percentilen") byCode[code].p90 = value;
}

const occupations = Object.entries(SSYK_BY_SLUG)
  .map(([slug, code]) => ({ slug, ...byCode[code] }))
  .filter((row) => row.median && row.p10 && row.p90);

writeFileSync(
  "src/data/scb-occupation-wages.json",
  JSON.stringify(
    {
      source: "SCB, lönestrukturstatistik för hela ekonomin",
      sourceUrl: SOURCE_PAGE,
      year: Number(YEAR),
      fetchedAt: new Date().toISOString().slice(0, 10),
      occupations,
    },
    null,
    2
  ) + "\n"
);

console.log(`Sparade ${occupations.length} säkra yrkesmatchningar från SCB ${YEAR}.`);
