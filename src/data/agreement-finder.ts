export interface FinderBranch {
  label: string;
  occupations: {
    label: string;
    agreementSlug: string | null;
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
          { label: "Systembolagsanställd", agreementSlug: "systembolagsavtalet" },
        ],
      },
      {
        label: "Bygg & Anläggning",
        occupations: [
          { label: "Byggnadsarbetare", agreementSlug: "byggavtalet" },
          { label: "Maskinförare (bygg)", agreementSlug: "byggavtalet" },
          { label: "Betongarbetare", agreementSlug: "byggavtalet" },
          { label: "Anläggningsarbetare (väg/bro/tunnel)", agreementSlug: "vaganlaggningsavtalet" },
          { label: "Tunnelarbetare", agreementSlug: "vaganlaggningsavtalet" },
          { label: "Elektriker", agreementSlug: "installationsavtalet" },
          { label: "Installationstekniker", agreementSlug: "installationsavtalet" },
        ],
      },
      {
        label: "Transport & Logistik",
        occupations: [
          { label: "Lastbilschaufför", agreementSlug: "transportavtalet" },
          { label: "Busschaufför", agreementSlug: "transportavtalet" },
          { label: "Distributionsförare", agreementSlug: "transportavtalet" },
        ],
      },
      {
        label: "Hotell & Restaurang",
        occupations: [
          { label: "Kock", agreementSlug: "hotell-restaurang" },
          { label: "Servitör", agreementSlug: "hotell-restaurang" },
          { label: "Hotellreceptionist", agreementSlug: "hotell-restaurang" },
          { label: "Bartender", agreementSlug: "hotell-restaurang" },
        ],
      },
      {
        label: "IT & Telekom",
        occupations: [
          { label: "Systemutvecklare", agreementSlug: "it-avtalet" },
          { label: "Projektledare (IT)", agreementSlug: "it-avtalet" },
          { label: "IT-support", agreementSlug: "it-avtalet" },
          { label: "Testare/QA", agreementSlug: "it-avtalet" },
        ],
      },
      {
        label: "Bank & Finans",
        occupations: [
          { label: "Bankrådgivare", agreementSlug: "bankavtalet" },
          { label: "Företagsrådgivare (bank)", agreementSlug: "bankavtalet" },
          { label: "Bankkassör", agreementSlug: "bankavtalet" },
        ],
      },
      {
        label: "Försäkring",
        occupations: [
          { label: "Skadereglerare", agreementSlug: "forsakringsavtalet" },
          { label: "Försäkringsrådgivare", agreementSlug: "forsakringsavtalet" },
          { label: "Aktuarie", agreementSlug: "forsakringsavtalet" },
        ],
      },
      {
        label: "Vård (privat)",
        occupations: [
          { label: "Undersköterska (privat)", agreementSlug: "vard-omsorg-privat" },
          { label: "Vårdbiträde (privat)", agreementSlug: "vard-omsorg-privat" },
          { label: "LSS-personal", agreementSlug: "vard-omsorg-privat" },
        ],
      },
      {
        label: "Bemanning",
        occupations: [
          { label: "Uthyrd tjänsteman", agreementSlug: "bemanningsavtalet" },
          { label: "Uthyrd industriarbetare", agreementSlug: "bemanningsavtalet" },
          { label: "Uthyrd lager/logistik", agreementSlug: "bemanningsavtalet" },
        ],
      },
      {
        label: "Tjänsteföretag & Konsult",
        occupations: [
          { label: "Konsult (management)", agreementSlug: "almega-tjansteforetagen" },
          { label: "Administratör", agreementSlug: "almega-tjansteforetagen" },
          { label: "Marknadsförare", agreementSlug: "almega-tjansteforetagen" },
        ],
      },
      {
        label: "Fastighet & Service",
        occupations: [
          { label: "Fastighetsskötare", agreementSlug: "fastighetsavtalet" },
          { label: "Städpersonal", agreementSlug: "fastighetsavtalet" },
          { label: "Vaktmästare (privat)", agreementSlug: "fastighetsavtalet" },
        ],
      },
      {
        label: "Livsmedel",
        occupations: [
          { label: "Livsmedelsarbetare", agreementSlug: "livsmedelsavtalet" },
          { label: "Slakteriarbetare", agreementSlug: "livsmedelsavtalet" },
          { label: "Bageriarbetare", agreementSlug: "livsmedelsavtalet" },
        ],
      },
      {
        label: "Media & Kommunikation",
        occupations: [
          { label: "Journalist", agreementSlug: "mediaavtalet" },
          { label: "Fotograf", agreementSlug: "mediaavtalet" },
          { label: "Redaktör", agreementSlug: "mediaavtalet" },
        ],
      },
      {
        label: "Skog & Trä",
        occupations: [
          { label: "Skogsmaskinförare", agreementSlug: "skogsavtalet" },
          { label: "Sågverksarbetare", agreementSlug: "skogsavtalet" },
          { label: "Skogsarbetare", agreementSlug: "skogsavtalet" },
        ],
      },
      {
        label: "Skola (friskolor)",
        occupations: [
          { label: "Barnskötare (friskola)", agreementSlug: "kommunal-skola" },
          { label: "Elevassistent", agreementSlug: "kommunal-skola" },
          { label: "Kökspersonal (skola)", agreementSlug: "kommunal-skola" },
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
        label: "Administration & Tjänstemän",
        occupations: [
          { label: "Socialsekreterare", agreementSlug: "hok-vision" },
          { label: "Handläggare", agreementSlug: "hok-vision" },
          { label: "Ekonom", agreementSlug: "hok-vision" },
          { label: "HR-specialist", agreementSlug: "hok-vision" },
        ],
      },
      {
        label: "Teknisk förvaltning",
        occupations: [
          { label: "Vaktmästare", agreementSlug: "hok-kommunal" },
          { label: "Fastighetstekniker", agreementSlug: "hok-kommunal" },
          { label: "IT-tekniker (kommun)", agreementSlug: "hok-vision" },
        ],
      },
      {
        label: "Kultur & Fritid",
        occupations: [
          { label: "Bibliotekarie", agreementSlug: "hok-vision" },
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
        label: "Myndigheter (akademiker)",
        occupations: [
          { label: "Handläggare (akademiker)", agreementSlug: "villkorsavtal-saco" },
          { label: "Utredare", agreementSlug: "villkorsavtal-saco" },
          { label: "Forskare", agreementSlug: "villkorsavtal-saco" },
        ],
      },
      {
        label: "Myndigheter (tjänstemän)",
        occupations: [
          { label: "Handläggare (tjänsteman)", agreementSlug: "villkorsavtal-ofr" },
          { label: "Tulltjänsteman", agreementSlug: "villkorsavtal-ofr" },
          { label: "Administratör (statlig)", agreementSlug: "villkorsavtal-ofr" },
        ],
      },
      {
        label: "Universitet & Högskola",
        occupations: [
          { label: "Universitetslektor", agreementSlug: "villkorsavtal-saco" },
          { label: "Doktorand", agreementSlug: "villkorsavtal-saco" },
          { label: "Administratör (universitet)", agreementSlug: "villkorsavtal-ofr" },
        ],
      },
      {
        label: "Polisen",
        occupations: [
          { label: "Polis", agreementSlug: "villkorsavtal-ofr" },
          { label: "Civilanställd (polis)", agreementSlug: "villkorsavtal-ofr" },
        ],
      },
      {
        label: "Försvarsmakten",
        occupations: [
          { label: "Officer", agreementSlug: "villkorsavtal-ofr" },
          { label: "Civilanställd (försvar)", agreementSlug: "villkorsavtal-ofr" },
        ],
      },
      {
        label: "Kriminalvård & Domstol",
        occupations: [
          { label: "Kriminalvårdare", agreementSlug: "villkorsavtal-ofr" },
          { label: "Domstolshandläggare", agreementSlug: "villkorsavtal-saco" },
        ],
      },
      {
        label: "Infrastruktur & Service (statlig)",
        occupations: [
          { label: "Vägarbetare (Trafikverket)", agreementSlug: "villkorsavtal-seko" },
          { label: "Banarbetare", agreementSlug: "villkorsavtal-seko" },
          { label: "Vaktpersonal (statlig)", agreementSlug: "villkorsavtal-seko" },
        ],
      },
    ],
  },
];
