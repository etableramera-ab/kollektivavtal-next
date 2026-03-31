export const vsComparisons = [
  { slug1: "teknikavtalet", slug2: "handelsavtalet" },
  { slug1: "hok-kommunal", slug2: "ab-kommunalt" },
  { slug1: "byggavtalet", slug2: "teknikavtalet" },
  { slug1: "handelsavtalet", slug2: "hotell-restaurang" },
  { slug1: "it-avtalet", slug2: "teknikavtalet" },
  { slug1: "hok-kommunal", slug2: "vard-omsorg-privat" },
  { slug1: "transportavtalet", slug2: "byggavtalet" },
  { slug1: "bankavtalet", slug2: "forsakringsavtalet" },
  { slug1: "villkorsavtal-saco", slug2: "villkorsavtal-ofr" },
  { slug1: "bemanningsavtalet", slug2: "almega-tjansteforetagen" },
];

export function parseObNumber(str: string): number {
  const match = str.match(/~?(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}
