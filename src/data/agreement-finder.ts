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
          { label: "Maskinoperatör", agreementSlug: null },
          { label: "Tekniker", agreementSlug: null },
          { label: "Ingenjör", agreementSlug: null },
          { label: "Produktionsledare", agreementSlug: null },
        ],
      },
      {
        label: "Handel & E-handel",
        occupations: [
          { label: "Butiksanställd", agreementSlug: "handelsavtalet" },
          { label: "Lagerarbetare", agreementSlug: "lager-ehandelsavtalet" },
          { label: "E-handelsmedarbetare", agreementSlug: "lager-ehandelsavtalet" },
          { label: "Butikschef/tjänsteman", agreementSlug: null },
          { label: "Systembolagsanställd", agreementSlug: null },
        ],
      },
      {
        label: "Bygg & Anläggning",
        occupations: [
          { label: "Byggnadsarbetare", agreementSlug: "byggavtalet" },
          { label: "Maskinförare (bygg)", agreementSlug: null },
          { label: "Betongarbetare", agreementSlug: "byggavtalet" },
          { label: "Anläggningsarbetare (väg/bro/tunnel)", agreementSlug: null },
          { label: "Tunnelarbetare", agreementSlug: null },
          { label: "Elektriker", agreementSlug: "installationsavtalet" },
          { label: "Installationstekniker", agreementSlug: "installationsavtalet" },
        ],
      },
      {
        label: "Transport & Logistik",
        occupations: [
          { label: "Lastbilschaufför", agreementSlug: null },
          { label: "Busschaufför", agreementSlug: null },
          { label: "Distributionsförare", agreementSlug: null },
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
          { label: "Systemutvecklare", agreementSlug: null },
          { label: "Projektledare (IT)", agreementSlug: null },
          { label: "IT-support", agreementSlug: null },
          { label: "Testare/QA", agreementSlug: null },
        ],
      },
      {
        label: "Bank & Finans",
        occupations: [
          { label: "Bankrådgivare", agreementSlug: null },
          { label: "Företagsrådgivare (bank)", agreementSlug: null },
          { label: "Bankkassör", agreementSlug: null },
        ],
      },
      {
        label: "Försäkring",
        occupations: [
          { label: "Skadereglerare", agreementSlug: null },
          { label: "Försäkringsrådgivare", agreementSlug: null },
          { label: "Aktuarie", agreementSlug: null },
        ],
      },
      {
        label: "Vård (privat)",
        occupations: [
          { label: "Undersköterska (privat)", agreementSlug: null },
          { label: "Vårdbiträde (privat)", agreementSlug: null },
          { label: "LSS-personal", agreementSlug: null },
        ],
      },
      {
        label: "Bemanning",
        occupations: [
          { label: "Uthyrd tjänsteman", agreementSlug: null },
          { label: "Uthyrd industriarbetare", agreementSlug: "bemanningsavtalet" },
          { label: "Uthyrd lager/logistik", agreementSlug: "bemanningsavtalet" },
        ],
      },
      {
        label: "Tjänsteföretag & Konsult",
        occupations: [
          { label: "Konsult (management)", agreementSlug: null },
          { label: "Administratör", agreementSlug: null },
          { label: "Marknadsförare", agreementSlug: null },
        ],
      },
      {
        label: "Fastighet & Service",
        occupations: [
          { label: "Fastighetsskötare", agreementSlug: null },
          { label: "Städpersonal", agreementSlug: null },
          { label: "Vaktmästare (privat)", agreementSlug: null },
        ],
      },
      {
        label: "Livsmedel",
        occupations: [
          { label: "Livsmedelsarbetare", agreementSlug: null },
          { label: "Slakteriarbetare", agreementSlug: null },
          { label: "Bageriarbetare", agreementSlug: null },
        ],
      },
      {
        label: "Media & Kommunikation",
        occupations: [
          { label: "Journalist", agreementSlug: null },
          { label: "Fotograf", agreementSlug: null },
          { label: "Redaktör", agreementSlug: null },
        ],
      },
      {
        label: "Skog & Trä",
        occupations: [
          { label: "Skogsmaskinförare", agreementSlug: null },
          { label: "Sågverksarbetare", agreementSlug: null },
          { label: "Skogsarbetare", agreementSlug: null },
        ],
      },
      {
        label: "Skola (friskolor)",
        occupations: [
          { label: "Barnskötare (friskola)", agreementSlug: null },
          { label: "Elevassistent", agreementSlug: null },
          { label: "Kökspersonal (skola)", agreementSlug: null },
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
          { label: "Sjuksköterska", agreementSlug: "sjukskoterska-avtal" },
          { label: "Arbetsterapeut", agreementSlug: "hok-akademiker" },
          { label: "Fysioterapeut", agreementSlug: "hok-akademiker" },
        ],
      },
      {
        label: "Skola & Förskola",
        occupations: [
          { label: "Barnskötare", agreementSlug: "hok-kommunal" },
          { label: "Förskollärare", agreementSlug: "laraavtalet" },
          { label: "Lärare (grundskola)", agreementSlug: "laraavtalet" },
          { label: "Lärare (gymnasium)", agreementSlug: "laraavtalet" },
          { label: "Elevassistent", agreementSlug: "hok-kommunal" },
        ],
      },
      {
        label: "Sjukvård (region)",
        occupations: [
          { label: "Sjuksköterska (region)", agreementSlug: "sjukskoterska-avtal" },
          { label: "Barnmorska", agreementSlug: "sjukskoterska-avtal" },
          { label: "Läkare (kommun/region)", agreementSlug: "lakare-kommun" },
          { label: "Biomedicinsk analytiker", agreementSlug: "sjukskoterska-avtal" },
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
        label: "Socialtjänst",
        occupations: [
          { label: "Socialsekreterare", agreementSlug: "hok-vision" },
          { label: "Biståndshandläggare", agreementSlug: "hok-vision" },
          { label: "Familjebehandlare", agreementSlug: "hok-vision" },
        ],
      },
      {
        label: "Administration & Tjänstemän",
        occupations: [
          { label: "Handläggare", agreementSlug: "hok-vision" },
          { label: "Ekonom", agreementSlug: "hok-vision" },
          { label: "HR-specialist", agreementSlug: "hok-vision" },
          { label: "Kommunikatör", agreementSlug: "hok-vision" },
        ],
      },
      {
        label: "Teknisk förvaltning",
        occupations: [
          { label: "Vaktmästare", agreementSlug: "hok-kommunal" },
          { label: "Fastighetstekniker", agreementSlug: "hok-kommunal" },
          { label: "IT-tekniker (kommun)", agreementSlug: "hok-vision" },
          { label: "VA-tekniker", agreementSlug: "hok-kommunal" },
        ],
      },
      {
        label: "Kost & Städ",
        occupations: [
          { label: "Kökspersonal (kommun)", agreementSlug: "hok-kommunal" },
          { label: "Kokerska", agreementSlug: "hok-kommunal" },
          { label: "Lokalvårdare", agreementSlug: "hok-kommunal" },
        ],
      },
      {
        label: "Kultur & Fritid",
        occupations: [
          { label: "Bibliotekarie", agreementSlug: "hok-akademiker" },
          { label: "Fritidsledare", agreementSlug: null },
          { label: "Kultursamordnare", agreementSlug: "hok-vision" },
        ],
      },
      {
        label: "Samhällsplanering & Miljö",
        occupations: [
          { label: "Planarkitekt", agreementSlug: "hok-akademiker" },
          { label: "Miljöinspektör", agreementSlug: "hok-vision" },
          { label: "Bygglovhandläggare", agreementSlug: "hok-vision" },
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
          { label: "Jurist (statlig)", agreementSlug: "villkorsavtal-saco" },
        ],
      },
      {
        label: "Myndigheter (tjänstemän)",
        occupations: [
          { label: "Handläggare (tjänsteman)", agreementSlug: "villkorsavtal-ofr" },
          { label: "Tulltjänsteman", agreementSlug: "villkorsavtal-ofr" },
          { label: "Administratör (statlig)", agreementSlug: "villkorsavtal-ofr" },
          { label: "Registrator", agreementSlug: "villkorsavtal-ofr" },
        ],
      },
      {
        label: "Universitet & Högskola",
        occupations: [
          { label: "Universitetslektor", agreementSlug: "villkorsavtal-saco" },
          { label: "Doktorand", agreementSlug: "villkorsavtal-saco" },
          { label: "Administratör (universitet)", agreementSlug: "villkorsavtal-ofr" },
          { label: "Forskningsingenjör", agreementSlug: "villkorsavtal-saco" },
        ],
      },
      {
        label: "Polisen",
        occupations: [
          { label: "Polis", agreementSlug: "villkorsavtal-ofr" },
          { label: "Civilanställd (polis)", agreementSlug: "villkorsavtal-ofr" },
          { label: "Forensiker", agreementSlug: "villkorsavtal-saco" },
        ],
      },
      {
        label: "Försvarsmakten",
        occupations: [
          { label: "Officer", agreementSlug: "villkorsavtal-ofr" },
          { label: "Specialistofficer", agreementSlug: "villkorsavtal-ofr" },
          { label: "Civilanställd (försvar)", agreementSlug: null },
        ],
      },
      {
        label: "Kriminalvård & Domstol",
        occupations: [
          { label: "Kriminalvårdare", agreementSlug: "villkorsavtal-ofr" },
          { label: "Domstolshandläggare", agreementSlug: null },
          { label: "Frivårdsinspektör", agreementSlug: "villkorsavtal-ofr" },
        ],
      },
      {
        label: "Tull & Kustbevakning",
        occupations: [
          { label: "Tulltjänsteman", agreementSlug: "villkorsavtal-ofr" },
          { label: "Kustbevakare", agreementSlug: "villkorsavtal-ofr" },
        ],
      },
      {
        label: "Infrastruktur & Transport",
        occupations: [
          { label: "Vägarbetare (Trafikverket)", agreementSlug: null },
          { label: "Banarbetare", agreementSlug: null },
          { label: "Signaltekniker", agreementSlug: null },
        ],
      },
      {
        label: "Service & Drift (statlig)",
        occupations: [
          { label: "Vaktmästare (statlig)", agreementSlug: null },
          { label: "Lokalvårdare (statlig)", agreementSlug: null },
          { label: "Vaktpersonal", agreementSlug: null },
        ],
      },
      {
        label: "Skogsbruk (statligt)",
        occupations: [
          { label: "Skogsarbetare (Skogsstyrelsen)", agreementSlug: "skogsavtalet" },
          { label: "Skogsvårdare", agreementSlug: "skogsavtalet" },
        ],
      },
    ],
  },
];
