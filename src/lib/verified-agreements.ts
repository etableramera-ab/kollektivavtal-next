// Avtal med aktuellt officiellt källunderlag tillgängligt för kontroll.
// Detta betyder inte att varje publik uppgift är hämtad ur en fullständig avtalstext.
export const VERIFIED_AGREEMENTS = new Set([
  "hok-kommunal",
  "handelsavtalet",
  "lager-ehandelsavtalet",
  "byggavtalet",
  "ab-kommunalt",
  "hok-vision",
  "hotell-restaurang",
  "villkorsavtal-saco",
  "i-avtalet",
  "stal-och-metall",
  "gemensamma-metall",
  "glasavtalet-industri",
  "samhallsavtalet",
  "lakare-kommun",
  "vag-banavtalet-seko",
  "glasmasteriavtalet",
  "entreprenadmaskinavtalet",
  "plat-ventilationsavtalet",
  "maleriavtalet",
  "laraavtalet",
  "sjukskoterska-avtal",
  "vvs-montorsavtalet",
  "hok-akademiker",
  "teknikavtalet-ifmetall",
  "svemek-avtalet",
  "kemiskt-avtal-ifmetall",
  "installationsavtalet",
  "bemanningsavtalet",
  "fastighetsavtalet",
  "skogsavtalet",
  "villkorsavtal-ofr",
]);

export function isVerifiedAgreement(slug: string): boolean {
  return VERIFIED_AGREEMENTS.has(slug);
}
