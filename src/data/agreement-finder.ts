export interface FinderBranch {
  label: string;
  occupations: {
    label: string;
    agreementSlug: string | null; // null = "Kommer snart"
  }[];
}

export interface FinderSector {
  value: "privat" | "kommun_region" | "stat";
  label: string;
  description: string;
  branches: FinderBranch[];
}

export const finderData: FinderSector[] = [
  {
    value: "privat",
    label: "Privat sektor",
    description: "Arbetar du på ett privat företag?",
    branches: [
      {
        label: "Industri & Teknik",
        occupations: [
          { label: "Maskinoperatör", agreementSlug: "teknikavtalet" },
          { label: "Tekniker", agreementSlug: "teknikavtalet" },
          { label: "Ingenjör", agreementSlug: "teknikavtalet" },
          { label: "Produktionsledare", agreementSlug: "teknikavtalet" },
        ],
      },
      {
        label: "Handel & E-handel",
        occupations: [
          { label: "Butiksanställd", agreementSlug: "handelsavtalet" },
          { label: "Lagerarbetare", agreementSlug: "handelsavtalet" },
          { label: "E-handelsmedarbetare", agreementSlug: "handelsavtalet" },
          { label: "Butikschef/tjänsteman", agreementSlug: "handelsavtalet" },
        ],
      },
      {
        label: "Bygg & Anläggning",
        occupations: [
          { label: "Byggnadsarbetare", agreementSlug: "byggavtalet" },
          { label: "Maskinförare", agreementSlug: "byggavtalet" },
          { label: "Betongarbetare", agreementSlug: "byggavtalet" },
          { label: "Anläggningsarbetare", agreementSlug: "byggavtalet" },
        ],
      },
      {
        label: "Transport & Logistik",
        occupations: [
          { label: "Yrkesförare", agreementSlug: null },
          { label: "Lagerarbetare (transport)", agreementSlug: null },
          { label: "Logistiksamordnare", agreementSlug: null },
        ],
      },
      {
        label: "Hotell & Restaurang",
        occupations: [
          { label: "Kock", agreementSlug: null },
          { label: "Servitör", agreementSlug: null },
          { label: "Hotellreceptionist", agreementSlug: null },
        ],
      },
      {
        label: "IT & Telekom",
        occupations: [
          { label: "Systemutvecklare", agreementSlug: "teknikavtalet" },
          { label: "IT-konsult", agreementSlug: null },
          { label: "Nätverkstekniker", agreementSlug: null },
        ],
      },
      {
        label: "Bank & Finans",
        occupations: [
          { label: "Bankrådgivare", agreementSlug: null },
          { label: "Försäkringshandläggare", agreementSlug: null },
        ],
      },
      {
        label: "Vård (privat)",
        occupations: [
          { label: "Undersköterska (privat)", agreementSlug: null },
          { label: "Sjuksköterska (privat)", agreementSlug: null },
        ],
      },
      {
        label: "Bemanning",
        occupations: [
          { label: "Konsult/uthyrd", agreementSlug: null },
        ],
      },
      {
        label: "Fastighet & Service",
        occupations: [
          { label: "Fastighetsskötare", agreementSlug: null },
          { label: "Städpersonal", agreementSlug: null },
        ],
      },
      {
        label: "Media & Kommunikation",
        occupations: [
          { label: "Journalist", agreementSlug: null },
          { label: "Grafisk formgivare", agreementSlug: null },
        ],
      },
      {
        label: "Livsmedel",
        occupations: [
          { label: "Livsmedelsarbetare", agreementSlug: null },
        ],
      },
      {
        label: "Skog & Trä",
        occupations: [
          { label: "Skogsarbetare", agreementSlug: null },
          { label: "Sågverksarbetare", agreementSlug: null },
        ],
      },
    ],
  },
  {
    value: "kommun_region",
    label: "Kommun/region",
    description: "Arbetar du i kommun, region eller kommunalt bolag?",
    branches: [
      {
        label: "Vård & Omsorg",
        occupations: [
          { label: "Undersköterska", agreementSlug: "hok-kommunal" },
          { label: "Vårdbiträde", agreementSlug: "hok-kommunal" },
          { label: "Sjuksköterska", agreementSlug: "ab-kommunalt" },
          { label: "Arbetsterapeut", agreementSlug: "ab-kommunalt" },
        ],
      },
      {
        label: "Skola & Förskola",
        occupations: [
          { label: "Barnskötare", agreementSlug: "hok-kommunal" },
          { label: "Förskollärare", agreementSlug: "ab-kommunalt" },
          { label: "Lärare (grundskola)", agreementSlug: "ab-kommunalt" },
          { label: "Lärare (gymnasium)", agreementSlug: "ab-kommunalt" },
        ],
      },
      {
        label: "Räddningstjänst",
        occupations: [
          { label: "Brandman/räddningsarbetare", agreementSlug: "hok-kommunal" },
          { label: "Larmoperatör", agreementSlug: "hok-kommunal" },
        ],
      },
      {
        label: "Administration",
        occupations: [
          { label: "Socialsekreterare", agreementSlug: "ab-kommunalt" },
          { label: "Handläggare", agreementSlug: "ab-kommunalt" },
          { label: "Ekonom", agreementSlug: "ab-kommunalt" },
        ],
      },
      {
        label: "Teknisk förvaltning",
        occupations: [
          { label: "Vaktmästare", agreementSlug: "hok-kommunal" },
          { label: "Fastighetstekniker", agreementSlug: "hok-kommunal" },
          { label: "IT-tekniker", agreementSlug: "ab-kommunalt" },
        ],
      },
      {
        label: "Kultur & Fritid",
        occupations: [
          { label: "Bibliotekarie", agreementSlug: "ab-kommunalt" },
          { label: "Fritidsledare", agreementSlug: "ab-kommunalt" },
        ],
      },
    ],
  },
  {
    value: "stat",
    label: "Stat",
    description: "Arbetar du på en myndighet eller statligt verk?",
    branches: [
      {
        label: "Myndigheter",
        occupations: [
          { label: "Handläggare", agreementSlug: null },
          { label: "Utredare", agreementSlug: null },
          { label: "Administratör", agreementSlug: null },
        ],
      },
      {
        label: "Universitet & Högskola",
        occupations: [
          { label: "Forskare", agreementSlug: null },
          { label: "Universitetslektor", agreementSlug: null },
          { label: "Administratör", agreementSlug: null },
        ],
      },
      {
        label: "Polisen",
        occupations: [
          { label: "Polis", agreementSlug: null },
          { label: "Civilanställd", agreementSlug: null },
        ],
      },
      {
        label: "Försvarsmakten",
        occupations: [
          { label: "Officer", agreementSlug: null },
          { label: "Civilanställd", agreementSlug: null },
        ],
      },
      {
        label: "Domstolsväsendet",
        occupations: [
          { label: "Domstolshandläggare", agreementSlug: null },
          { label: "Notarie", agreementSlug: null },
        ],
      },
    ],
  },
];
