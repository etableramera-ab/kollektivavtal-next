export interface FinderFollowUp {
  question: string;
  description: string;
  options: {
    label: string;
    agreementSlug: string | null;
  }[];
}

export interface FinderBranch {
  label: string;
  question?: string;
  occupations: {
    label: string;
    agreementSlug: string | null;
    followUp?: FinderFollowUp;
  }[];
}

export interface FinderSector {
  value: "privat" | "kommun_region" | "stat";
  label: string;
  description: string;
  branches: FinderBranch[];
}

const bankFollowUp: FinderFollowUp = {
  question: "Vilket av detta stämmer för dig?",
  description:
    "Välj bara om du känner igen både arbetsgivarens och ditt fackliga avtalsområde.",
  options: [
    {
      label: "Finansarbetsgivarna + medlem i Finansförbundet",
      agreementSlug: "bankavtalet-finansforbundet",
    },
    {
      label: "Finansarbetsgivarna + medlem i ett Saco-förbund inom PTK",
      agreementSlug: "bankavtalet-saco",
    },
    { label: "Annat eller jag vet inte", agreementSlug: null },
  ],
};

const insuranceFollowUp: FinderFollowUp = {
  question: "Vilket försäkringsavtal gäller på arbetsplatsen?",
  description:
    "Både arbetsgivaren och det fackliga avtalsområdet avgör vilket avtal som gäller. Välj bara ett namn du känner igen.",
  options: [
    {
      label: "FAO:s avtal med Forena",
      agreementSlug: "forsakringsavtalet-forena",
    },
    {
      label: "FAO:s avtal med Akavia eller Sveriges Ingenjörer",
      agreementSlug: "forsakringsavtalet-saco",
    },
    {
      label: "Folksam/Fremia, annat eller jag vet inte",
      agreementSlug: null,
    },
  ],
};

const pharmacyFollowUp: FinderFollowUp = {
  question: "Vilket apoteksavtal är arbetsgivaren bunden till?",
  description:
    "Det här gäller privata apoteksföretag. Välj bara ett avtalsområde du känner igen. Sjukhus- och regionfarmaceuter omfattas inte av dessa privata avtal.",
  options: [
    {
      label: "Svensk Handel – Apoteksanställda",
      agreementSlug: "apoteksavtalet-svensk-handel",
    },
    {
      label: "Almega Tjänsteförbunden – bransch Apotek",
      agreementSlug: "apoteksforetagen-almega",
    },
    {
      label: "Sjukhus/region, annat eller jag vet inte",
      agreementSlug: null,
    },
  ],
};

const journalistFollowUp: FinderFollowUp = {
  question: "Vilket journalistavtal gäller på arbetsplatsen?",
  description:
    "Yrkesrollen räcker inte för att avgöra avtalet. Välj bara ett avtalsområde som arbetsgivaren eller Journalistförbundet har bekräftat.",
  options: [
    {
      label: "Dagspress – dag- eller kvällstidning",
      agreementSlug: "journalistavtalet-dagspress",
    },
    {
      label: "Public service – Journalistförbundets område på SVT, SR eller UR",
      agreementSlug: "journalistavtalet-public-service",
    },
    {
      label: "Tidskrift eller magasin",
      agreementSlug: "journalistavtalet-tidskrift",
    },
    {
      label: "Etermedier – radio eller tv utanför public service",
      agreementSlug: "journalistavtalet-etermedier",
    },
    {
      label: "Bemanningsföretag för journalister",
      agreementSlug: "journalistavtalet-bemanning",
    },
    {
      label: "Frilans, annat avtalsområde eller jag vet inte",
      agreementSlug: null,
    },
  ],
};

const privateForestWoodFollowUp: FinderFollowUp = {
  question: "Vilket avtalsområde är arbetsgivaren bunden till?",
  description:
    "Yrkesrollen räcker inte. Välj bara ett avtal som arbetsgivaren eller GS har bekräftat. Statligt arbete hos Skogsstyrelsen finns under statlig sektor.",
  options: [
    {
      label: "Privat skogsbruk – Skogsavtalet (Gröna arbetsgivare/GS)",
      agreementSlug: "skogsavtalet-privat",
    },
    {
      label: "Sågverksindustri – Sågverksavtalet (Industriarbetsgivarna/GS)",
      agreementSlug: "sagverksavtalet-industriarbetsgivarna",
    },
    {
      label: "Träindustri – Träindustriavtalet (TMF/GS)",
      agreementSlug: "traindustriavtalet-tmf",
    },
    {
      label: "Annat, statligt, tjänsteman eller jag vet inte",
      agreementSlug: null,
    },
  ],
};

const sawmillFollowUp: FinderFollowUp = {
  question: "Vilket avtalsområde gäller på sågverket?",
  description:
    "Sågverksindustrin har separata avtal för arbetare och tjänstemän. Välj bara ett område som arbetsgivaren eller rätt fackförbund har bekräftat.",
  options: [
    {
      label: "Arbetaravtalet – Sågverksavtalet (GS/Industriarbetsgivarna)",
      agreementSlug: "sagverksavtalet-industriarbetsgivarna",
    },
    {
      label: "Tjänstemannaavtalet – Unionen, Sveriges Ingenjörer eller Ledarna",
      agreementSlug: "sagverksindustrin-tjansteman",
    },
    {
      label: "Entreprenör, bemanning, annat avtalsområde eller jag vet inte",
      agreementSlug: null,
    },
  ],
};

const pulpPaperFollowUp: FinderFollowUp = {
  question: "Vilket avtalsområde gäller på din arbetsplats?",
  description:
    "Bruk har separata avtal för arbetare och tjänstemän. Entreprenörer, bemanning och förpackningsfabriker kan omfattas av andra avtal.",
  options: [
    {
      label:
        "Arbetaravtalet för massa- och pappersindustrin – Pappers/Industriarbetsgivarna",
      agreementSlug: "massa-pappersindustrin-pappers",
    },
    {
      label: "Tjänstemannaavtal – Unionen, Sveriges Ingenjörer eller Ledarna",
      agreementSlug: "massa-pappersindustrin-tjansteman",
    },
    {
      label:
        "Förpackningsfabrik, entreprenör, bemanning, annat eller jag vet inte",
      agreementSlug: null,
    },
  ],
};

const privateCareFollowUp: FinderFollowUp = {
  question: "Vilket beskriver arbetsplatsen bäst?",
  description:
    "Välj bara ett alternativ om arbetsgivaren är ansluten till Vårdföretagarna.",
  options: [
    {
      label: "Äldreomsorg hos Vårdföretagarna",
      agreementSlug: "vardforetagarna-bransch-f",
    },
    {
      label: "Vård, behandling eller omsorg hos Vårdföretagarna",
      agreementSlug: "vardforetagarna-bransch-e",
    },
    { label: "Annan arbetsgivare eller jag vet inte", agreementSlug: null },
  ],
};

const lssFollowUp: FinderFollowUp = {
  question: "Vilket beskriver arbetsplatsen bäst?",
  description:
    "Arbetsgivarorganisationen avgör vilket avtal som kan vara relevant.",
  options: [
    {
      label: "LSS-boende hos Vårdföretagarna",
      agreementSlug: "vardforetagarna-bransch-e",
    },
    {
      label: "Personlig assistans eller ledsagning hos Vårdföretagarna",
      agreementSlug: "vardforetagarna-bransch-g",
    },
    {
      label: "Personlig assistans hos Fremia",
      agreementSlug: "fremia-personlig-assistans",
    },
    { label: "Annan arbetsgivare eller jag vet inte", agreementSlug: null },
  ],
};

const cleaningFollowUp: FinderFollowUp = {
  question: "Vilket av detta gäller på arbetsplatsen?",
  description:
    "Serviceentreprenadavtalen skiljer sig åt beroende på fackligt avtalsområde.",
  options: [
    {
      label: "Serviceentreprenadavtalet med Fastighets eller Seko",
      agreementSlug: "serviceentreprenad-fastighets-seko",
    },
    {
      label: "Serviceentreprenadavtalet med Kommunal",
      agreementSlug: "serviceentreprenad-kommunal",
    },
    { label: "Egen regi, hemservice, annat eller jag vet inte", agreementSlug: null },
  ],
};

const privatePropertyFollowUp: FinderFollowUp = {
  question: "Vilket fastighetsavtal gäller hos arbetsgivaren?",
  description:
    "Ägarformen räcker inte för att avgöra avtalet. Välj bara ett avtalsnamn eller en arbetsgivarorganisation som du känner igen.",
  options: [
    {
      label: "Almega Fastighetsarbetsgivarna – arbetaravtalet",
      agreementSlug: "fastigheter-arbetare-almega",
    },
    {
      label: "Fastigo – F-avtalet",
      agreementSlug: "f-avtalet-fastigo",
    },
    {
      label: "Sobona – BÖK Fastigheter",
      agreementSlug: "sobona-bok-fastigheter",
    },
    { label: "Annat eller jag vet inte", agreementSlug: null },
  ],
};

const steelIndustryFollowUp: FinderFollowUp = {
  question: "Vilket avtalsområde gäller på arbetsplatsen?",
  description:
    "Stål- och metallindustrin har skilda avtal för arbetare och tjänstemän. Välj bara det område som står angivet för din anställning.",
  options: [
    {
      label: "Arbetare – Stål- och metallindustrin (IF Metall)",
      agreementSlug: "stal-och-metall",
    },
    {
      label: "Tjänsteman – Unionen, Sveriges Ingenjörer eller Ledarna",
      agreementSlug: "stal-metallindustrin-tjansteman",
    },
    { label: "Annat avtalsområde eller jag vet inte", agreementSlug: null },
  ],
};

const miningIndustryFollowUp: FinderFollowUp = {
  question: "Vilket avtalsområde gäller på arbetsplatsen?",
  description:
    "Gruvindustrin har skilda avtal för arbetare och tjänstemän. Välj bara det område som står angivet för din anställning.",
  options: [
    {
      label: "Arbetare – Gruvindustrins arbetaravtal (IF Metall)",
      agreementSlug: "gruvindustrin-if-metall",
    },
    {
      label: "Tjänsteman – Unionen, Sveriges Ingenjörer eller Ledarna",
      agreementSlug: "gruvindustrin-tjansteman",
    },
    { label: "Entreprenör, bemanning, annat eller jag vet inte", agreementSlug: null },
  ],
};

const chemicalIndustryFollowUp: FinderFollowUp = {
  question: "Vilket avtalsområde gäller hos IKEM-företaget?",
  description:
    "Kemi, läkemedel och närliggande industri har flera avtalsområden. Välj bara ett exakt avtalsnamn som arbetsgivaren eller facket har bekräftat.",
  options: [
    {
      label: "Arbetare – Kemiska fabriker (IF Metall/IKEM)",
      agreementSlug: "kemiskt-avtal-ifmetall",
    },
    {
      label: "Tjänsteman – IKEM:s tjänstemannaavtal",
      agreementSlug: "ikem-tjanstemannaavtal",
    },
    { label: "Annat IKEM-avtal eller jag vet inte", agreementSlug: null },
  ],
};

const foodIndustryFollowUp: FinderFollowUp = {
  question: "Vilket avtalsområde gäller på arbetsplatsen?",
  description:
    "Livsmedelsindustrin har skilda avtal för arbetare och tjänstemän. Välj bara det område som står angivet för din anställning.",
  options: [
    {
      label: "Arbetare – Livsmedelsavtalet",
      agreementSlug: "livsmedelsavtalet",
    },
    {
      label: "Tjänsteman – Livsmedelsindustrins tjänstemannaavtal",
      agreementSlug: "livsmedelsindustrin-tjanstemannaavtal",
    },
    { label: "Annat avtalsområde eller jag vet inte", agreementSlug: null },
  ],
};

const woodIndustryFollowUp: FinderFollowUp = {
  question: "Vilket avtalsområde gäller på träindustriföretaget?",
  description:
    "TMF:s träindustri har skilda avtal för arbetare och tjänstemän. Välj bara det område som står angivet för din anställning.",
  options: [
    {
      label: "Arbetare – Träindustriavtalet (GS/TMF)",
      agreementSlug: "traindustriavtalet-tmf",
    },
    {
      label: "Tjänsteman – Träindustrins tjänstemannaavtal",
      agreementSlug: "traindustrin-tjansteman-tmf",
    },
    { label: "Sågverk, annat avtalsområde eller jag vet inte", agreementSlug: null },
  ],
};

const hospitalityFollowUp: FinderFollowUp = {
  question: "Vilket avtalsområde gäller på arbetsplatsen?",
  description:
    "Besöksnäringen har skilda avtal för arbetare och tjänstemän. Välj bara det område som står angivet för din anställning.",
  options: [
    {
      label: "Arbetare – Gröna riksavtalet (HRF/Visita)",
      agreementSlug: "hotell-restaurang",
    },
    {
      label: "Tjänsteman – Besöksnäringens tjänstemannaavtal (Unionen/Visita)",
      agreementSlug: "besoksnaringens-tjanstemannaavtal",
    },
    { label: "Annat avtal eller jag vet inte", agreementSlug: null },
  ],
};

const privateTransportFollowUp: FinderFollowUp = {
  question: "Vilket avtalsområde är arbetsgivaren bunden till?",
  description:
    "Transport, spårtrafik och post har olika avtal. Välj bara ett exakt avtalsområde som arbetsgivaren eller facket har bekräftat.",
  options: [
    { label: "Åkeri eller transportföretag – Transportavtalet", agreementSlug: "transportavtalet" },
    { label: "Bussföretag – Bussbranschavtalet", agreementSlug: "bussbranschavtalet" },
    { label: "Tågföretagen – Spårtrafikavtalet", agreementSlug: "spartrafikavtalet" },
    {
      label: "PostNord eller annat företag i bransch Kommunikation",
      agreementSlug: "branschavtal-kommunikation",
    },
    { label: "Annat avtalsområde eller jag vet inte", agreementSlug: null },
  ],
};

const privateEnergyFollowUp: FinderFollowUp = {
  question: "Vilket avtalsområde är arbetsgivaren bunden till?",
  description:
    "Privata energiföretag, kommunala energibolag och installationsföretag har olika avtal. Välj bara ett område som arbetsgivaren eller facket har bekräftat.",
  options: [
    {
      label: "Privat energiföretag inom EFA – Branschavtal Energi",
      agreementSlug: "branschavtal-energi-efa",
    },
    {
      label: "Kommunalt energibolag inom Sobona – BÖK Energi",
      agreementSlug: "sobona-bok-energi",
    },
    {
      label: "Elinstallationsföretag – Installationsavtalet",
      agreementSlug: "installationsavtalet",
    },
    { label: "Annat avtalsområde eller jag vet inte", agreementSlug: null },
  ],
};

const industryWorkerOptions: FinderFollowUp["options"] = [
  { label: "Teknikavtalet IF Metall", agreementSlug: "teknikavtalet-ifmetall" },
  { label: "I-avtalet", agreementSlug: "i-avtalet" },
  { label: "Stål- och metallavtalet", agreementSlug: "stal-och-metall" },
  {
    label: "Gruvindustrins arbetaravtal",
    agreementSlug: "gruvindustrin-if-metall",
  },
  { label: "Gemensamma metallavtalet", agreementSlug: "gemensamma-metall" },
  { label: "Glasindustrins avtal", agreementSlug: "glasavtalet-industri" },
  { label: "Svemek-avtalet", agreementSlug: "svemek-avtalet" },
  { label: "Avtalet för kemiska fabriker", agreementSlug: "kemiskt-avtal-ifmetall" },
  { label: "Annat eller jag vet inte", agreementSlug: null },
];

const industryWorkerFollowUp: FinderFollowUp = {
  question: "Vilket kollektivavtal står angivet för din anställning?",
  description:
    "Närliggande industrijobb kan tillhöra olika avtal. Välj bara ett namn du känner igen.",
  options: industryWorkerOptions,
};

const industryTechnicianFollowUp: FinderFollowUp = {
  ...industryWorkerFollowUp,
  options: [
    { label: "Teknikavtalet för tjänstemän", agreementSlug: "teknikavtalet-tjansteman" },
    {
      label: "Massa- och pappersindustriavtalet för tjänstemän",
      agreementSlug: "massa-pappersindustrin-tjansteman",
    },
    {
      label: "Sågverksindustrins tjänstemannaavtal",
      agreementSlug: "sagverksindustrin-tjansteman",
    },
    {
      label: "Stål- och metallindustrins tjänstemannaavtal",
      agreementSlug: "stal-metallindustrin-tjansteman",
    },
    {
      label: "Gruvindustrins tjänstemannaavtal",
      agreementSlug: "gruvindustrin-tjansteman",
    },
    {
      label: "IKEM:s tjänstemannaavtal",
      agreementSlug: "ikem-tjanstemannaavtal",
    },
    {
      label: "Livsmedelsindustrins tjänstemannaavtal",
      agreementSlug: "livsmedelsindustrin-tjanstemannaavtal",
    },
    {
      label: "Träindustrins tjänstemannaavtal",
      agreementSlug: "traindustrin-tjansteman-tmf",
    },
    ...industryWorkerOptions,
  ],
};

const industrySalariedFollowUp: FinderFollowUp = {
  question: "Vilket kollektivavtal står angivet för din anställning?",
  description:
    "Välj bara ett avtal om du känner igen både det exakta avtalsnamnet och arbetsgivarens avtalsområde.",
  options: [
    { label: "Teknikavtalet för tjänstemän", agreementSlug: "teknikavtalet-tjansteman" },
    {
      label: "Massa- och pappersindustriavtalet för tjänstemän",
      agreementSlug: "massa-pappersindustrin-tjansteman",
    },
    {
      label: "Sågverksindustrins tjänstemannaavtal",
      agreementSlug: "sagverksindustrin-tjansteman",
    },
    {
      label: "Stål- och metallindustrins tjänstemannaavtal",
      agreementSlug: "stal-metallindustrin-tjansteman",
    },
    {
      label: "Gruvindustrins tjänstemannaavtal",
      agreementSlug: "gruvindustrin-tjansteman",
    },
    {
      label: "IKEM:s tjänstemannaavtal",
      agreementSlug: "ikem-tjanstemannaavtal",
    },
    {
      label: "Livsmedelsindustrins tjänstemannaavtal",
      agreementSlug: "livsmedelsindustrin-tjanstemannaavtal",
    },
    {
      label: "Träindustrins tjänstemannaavtal",
      agreementSlug: "traindustrin-tjansteman-tmf",
    },
    { label: "Annat eller jag vet inte", agreementSlug: null },
  ],
};

const constructionFollowUp: FinderFollowUp = {
  question: "Vilket kollektivavtal gäller för ditt arbete?",
  description:
    "Yrkena överlappar mellan flera bygg- och anläggningsavtal. Välj bara ett namn du känner igen.",
  options: [
    { label: "Byggavtalet", agreementSlug: "byggavtalet" },
    {
      label: "Byggföretagens tjänstemannaavtal",
      agreementSlug: "byggforetagen-tjanstemannaavtal",
    },
    { label: "Entreprenadmaskinavtalet", agreementSlug: "entreprenadmaskinavtalet" },
    { label: "Väg- och Banavtalet", agreementSlug: "vag-banavtalet-seko" },
    {
      label: "Maskinföraravtalet, Järnvägsinfrastrukturavtalet, annat eller jag vet inte",
      agreementSlug: null,
    },
  ],
};

const itFollowUp: FinderFollowUp = {
  question: "Vilket kollektivavtal gäller på din arbetsplats?",
  description:
    "IT- och konsultjobb kan tillhöra flera avtalsområden. Välj bara om du känner igen det exakta avtalsnamnet.",
  options: [
    { label: "IT-avtalet", agreementSlug: "it-avtalet" },
    { label: "Telekomavtalet", agreementSlug: "telekomavtalet" },
    { label: "Innovationsavtalet", agreementSlug: "innovationsavtalet" },
    { label: "Gröna avtalet", agreementSlug: "grona-avtalet" },
    { label: "Annat eller jag vet inte", agreementSlug: null },
  ],
};

const privateServiceFollowUp: FinderFollowUp = {
  question: "Vilket kollektivavtal gäller hos arbetsgivaren?",
  description:
    "Konsult- och tjänsteföretag kan tillhöra flera avtalsområden. Välj bara ett exakt avtalsnamn du känner igen.",
  options: [
    {
      label: "Gröna avtalet – Tjänsteföretagen/Medieföretagen",
      agreementSlug: "grona-avtalet",
    },
    {
      label: "Innovationsavtalet",
      agreementSlug: "innovationsavtalet",
    },
    { label: "Annat eller jag vet inte", agreementSlug: null },
  ],
};

const staffingSalariedFollowUp: FinderFollowUp = {
  question: "Vilket kollektivavtal gäller hos bemanningsföretaget?",
  description:
    "Välj bara om arbetsgivaren har kopplat in Kompetensföretagens avtal för tjänstemän och du känner igen avtalsnamnet. Medlemskap i Kompetensföretagen räcker inte ensamt.",
  options: [
    {
      label: "Kompetensföretagens avtal för tjänstemän",
      agreementSlug: "kompetensforetagen-tjansteman",
    },
    { label: "Annat eller jag vet inte", agreementSlug: null },
  ],
};

const securityFollowUp: FinderFollowUp = {
  question: "Omfattas arbetsgivaren av Bevaknings- och säkerhetsavtalet?",
  description:
    "Välj avtalet bara om arbetsgivaren är ett bevaknings- eller säkerhetsföretag som är bundet till avtalsområdet.",
  options: [
    {
      label: "Ja – Bevaknings- och säkerhetsavtalet",
      agreementSlug: "bevaknings-sakerhetsavtalet",
    },
    { label: "Nej eller jag vet inte", agreementSlug: null },
  ],
};

const independentSchoolMunicipalFollowUp: FinderFollowUp = {
  question: "Vilket kollektivavtal gäller på friskolan?",
  description:
    "Samma yrke kan tillhöra olika avtal. Välj bara Kommunals friskoleavtal om du känner igen både Almega Utbildning och Kommunal.",
  options: [
    {
      label: "Almega Utbildning – Friskoleavtalet (Kommunal)",
      agreementSlug: "friskoleavtalet-kommunal",
    },
    { label: "Annat eller jag vet inte", agreementSlug: null },
  ],
};

const stateAgreementFollowUp: FinderFollowUp = {
  question: "Vilket centralt statligt avtalsområde tillhör du?",
  description:
    "Det fackliga avtalsområdet avgör vilket av de centrala statliga avtalen som gäller.",
  options: [
    {
      label: "OFR/S,P,O – exempelvis ST eller Försvarsförbundet",
      agreementSlug: "villkorsavtal-ofr",
    },
    { label: "Saco-S", agreementSlug: "villkorsavtal-saco" },
    { label: "Seko", agreementSlug: "villkorsavtal-seko" },
    { label: "Annat, oorganiserad eller jag vet inte", agreementSlug: null },
  ],
};

export const finderData: FinderSector[] = [
  {
    value: "privat",
    label: "Privat sektor",
    description: "Arbetar du på ett privat företag?",
    branches: [
      {
        label: "Industri & Teknik",
        occupations: [
          {
            label: "Maskinoperatör",
            agreementSlug: null,
            followUp: industryWorkerFollowUp,
          },
          {
            label: "Tekniker",
            agreementSlug: null,
            followUp: industryTechnicianFollowUp,
          },
          {
            label: "Ingenjör",
            agreementSlug: null,
            followUp: industrySalariedFollowUp,
          },
          {
            label: "Produktionsledare",
            agreementSlug: null,
            followUp: industrySalariedFollowUp,
          },
          {
            label: "Arbetare eller tjänsteman inom stål- och metallindustri",
            agreementSlug: null,
            followUp: steelIndustryFollowUp,
          },
          {
            label: "Arbetare eller tjänsteman inom gruvindustri",
            agreementSlug: null,
            followUp: miningIndustryFollowUp,
          },
          {
            label: "Arbetare eller tjänsteman hos IKEM-företag (kemi/läkemedel/plast)",
            agreementSlug: null,
            followUp: chemicalIndustryFollowUp,
          },
        ],
      },
      {
        label: "Energi & Elkraft",
        occupations: [
          {
            label: "Drifttekniker eller processoperatör inom energi",
            agreementSlug: null,
            followUp: privateEnergyFollowUp,
          },
          {
            label: "Ingenjör eller tjänsteman inom energi",
            agreementSlug: null,
            followUp: privateEnergyFollowUp,
          },
          {
            label: "Montör eller tekniker inom elnät/elkraft",
            agreementSlug: null,
            followUp: privateEnergyFollowUp,
          },
        ],
      },
      {
        label: "Handel & E-handel",
        occupations: [
          { label: "Butiksanställd", agreementSlug: "handelsavtalet" },
          { label: "Lagerarbetare", agreementSlug: "lager-ehandelsavtalet" },
          { label: "E-handelsmedarbetare", agreementSlug: "lager-ehandelsavtalet" },
          { label: "Butikschef/tjänsteman", agreementSlug: null },
          { label: "Systembolagsanställd", agreementSlug: "systembolagsavtalet" },
        ],
      },
      {
        label: "Apotek (privat)",
        occupations: [
          {
            label: "Apotekare hos privat apoteksföretag",
            agreementSlug: null,
            followUp: pharmacyFollowUp,
          },
          {
            label: "Receptarie hos privat apoteksföretag",
            agreementSlug: null,
            followUp: pharmacyFollowUp,
          },
          {
            label: "Apotekstekniker hos privat apoteksföretag",
            agreementSlug: null,
            followUp: pharmacyFollowUp,
          },
          {
            label: "Annan apoteksmedarbetare hos privat apoteksföretag",
            agreementSlug: null,
            followUp: pharmacyFollowUp,
          },
        ],
      },
      {
        label: "Bygg & Anläggning",
        occupations: [
          { label: "Byggnadsarbetare", agreementSlug: "byggavtalet" },
          {
            label: "Maskinförare (bygg)",
            agreementSlug: null,
            followUp: constructionFollowUp,
          },
          { label: "Betongarbetare", agreementSlug: "byggavtalet" },
          {
            label: "Anläggningsarbetare (väg/bro/tunnel)",
            agreementSlug: null,
            followUp: constructionFollowUp,
          },
          {
            label: "Tunnelarbetare",
            agreementSlug: null,
            followUp: constructionFollowUp,
          },
          { label: "Elektriker", agreementSlug: "installationsavtalet" },
          { label: "Installationstekniker", agreementSlug: "installationsavtalet" },
          {
            label: "Tjänsteman, ingenjör eller arbetsledare hos byggföretag",
            agreementSlug: null,
            followUp: constructionFollowUp,
          },
        ],
      },
      {
        label: "Transport & Logistik",
        occupations: [
          {
            label: "Lastbilschaufför hos åkeri/transportföretag",
            agreementSlug: "transportavtalet",
          },
          { label: "Busschaufför", agreementSlug: "bussbranschavtalet" },
          {
            label: "Distributionsförare hos åkeri/transportföretag",
            agreementSlug: "transportavtalet",
          },
          {
            label: "Lokförare, tågvärd eller annan personal inom spårtrafik",
            agreementSlug: null,
            followUp: privateTransportFollowUp,
          },
          {
            label: "Brevbärare eller terminalpersonal hos PostNord",
            agreementSlug: null,
            followUp: privateTransportFollowUp,
          },
          {
            label: "Annat arbete inom transport, logistik eller kommunikation",
            agreementSlug: null,
            followUp: privateTransportFollowUp,
          },
        ],
      },
      {
        label: "Motorbranschen",
        occupations: [
          {
            label: "Fordonstekniker eller mekaniker hos verkstad/återförsäljare",
            agreementSlug: "motorbranschavtalet",
          },
          {
            label: "Tjänsteman hos verkstad/fordonsåterförsäljare",
            agreementSlug: "tjanstemannaavtalet-motorbranschen",
          },
        ],
      },
      {
        label: "Hotell & Restaurang",
        occupations: [
          { label: "Kock", agreementSlug: null, followUp: hospitalityFollowUp },
          { label: "Servitör", agreementSlug: null, followUp: hospitalityFollowUp },
          {
            label: "Hotellreceptionist",
            agreementSlug: null,
            followUp: hospitalityFollowUp,
          },
          { label: "Bartender", agreementSlug: null, followUp: hospitalityFollowUp },
          {
            label: "Tjänsteman, administratör eller chef inom besöksnäringen",
            agreementSlug: null,
            followUp: hospitalityFollowUp,
          },
        ],
      },
      {
        label: "IT & Telekom",
        occupations: [
          { label: "Systemutvecklare", agreementSlug: null, followUp: itFollowUp },
          { label: "Projektledare (IT)", agreementSlug: null, followUp: itFollowUp },
          { label: "IT-support", agreementSlug: null, followUp: itFollowUp },
          { label: "Testare/QA", agreementSlug: null, followUp: itFollowUp },
        ],
      },
      {
        label: "Bank & Finans",
        occupations: [
          { label: "Bankrådgivare", agreementSlug: null, followUp: bankFollowUp },
          {
            label: "Företagsrådgivare (bank)",
            agreementSlug: null,
            followUp: bankFollowUp,
          },
          { label: "Bankkassör", agreementSlug: null, followUp: bankFollowUp },
        ],
      },
      {
        label: "Försäkring",
        occupations: [
          { label: "Skadereglerare", agreementSlug: null, followUp: insuranceFollowUp },
          {
            label: "Försäkringsrådgivare",
            agreementSlug: null,
            followUp: insuranceFollowUp,
          },
          { label: "Aktuarie", agreementSlug: null, followUp: insuranceFollowUp },
        ],
      },
      {
        label: "Vård (privat)",
        occupations: [
          {
            label: "Undersköterska (privat)",
            agreementSlug: null,
            followUp: privateCareFollowUp,
          },
          {
            label: "Vårdbiträde (privat)",
            agreementSlug: null,
            followUp: privateCareFollowUp,
          },
          { label: "LSS-personal", agreementSlug: null, followUp: lssFollowUp },
        ],
      },
      {
        label: "Bemanning",
        occupations: [
          {
            label: "Uthyrd tjänsteman",
            agreementSlug: null,
            followUp: staffingSalariedFollowUp,
          },
          { label: "Uthyrd industriarbetare", agreementSlug: "bemanningsavtalet" },
          { label: "Uthyrd lager/logistik", agreementSlug: "bemanningsavtalet" },
        ],
      },
      {
        label: "Tjänsteföretag & Konsult",
        occupations: [
          {
            label: "Konsult (management)",
            agreementSlug: null,
            followUp: privateServiceFollowUp,
          },
          {
            label: "Administratör",
            agreementSlug: null,
            followUp: privateServiceFollowUp,
          },
          {
            label: "Marknadsförare",
            agreementSlug: null,
            followUp: privateServiceFollowUp,
          },
        ],
      },
      {
        label: "Bevakning & Säkerhet",
        occupations: [
          { label: "Väktare", agreementSlug: null, followUp: securityFollowUp },
          { label: "Skyddsvakt", agreementSlug: null, followUp: securityFollowUp },
          { label: "Ordningsvakt", agreementSlug: null, followUp: securityFollowUp },
          {
            label: "Operatör inom bevakning",
            agreementSlug: null,
            followUp: securityFollowUp,
          },
          {
            label: "Parkeringsvakt hos bevakningsföretag",
            agreementSlug: null,
            followUp: securityFollowUp,
          },
        ],
      },
      {
        label: "Fastighet & Service",
        occupations: [
          {
            label: "Fastighetsskötare",
            agreementSlug: null,
            followUp: privatePropertyFollowUp,
          },
          {
            label: "Städpersonal",
            agreementSlug: null,
            followUp: cleaningFollowUp,
          },
          {
            label: "Vaktmästare (privat)",
            agreementSlug: null,
            followUp: privatePropertyFollowUp,
          },
        ],
      },
      {
        label: "Livsmedel",
        occupations: [
          {
            label: "Livsmedelsarbetare",
            agreementSlug: null,
            followUp: foodIndustryFollowUp,
          },
          {
            label: "Slakteriarbetare",
            agreementSlug: null,
            followUp: foodIndustryFollowUp,
          },
          {
            label: "Bageriarbetare",
            agreementSlug: null,
            followUp: foodIndustryFollowUp,
          },
          {
            label: "Tjänsteman, ingenjör eller arbetsledare i livsmedelsindustrin",
            agreementSlug: null,
            followUp: foodIndustryFollowUp,
          },
        ],
      },
      {
        label: "Media & Kommunikation",
        occupations: [
          {
            label: "Journalist",
            agreementSlug: null,
            followUp: journalistFollowUp,
          },
          {
            label: "Fotograf",
            agreementSlug: null,
            followUp: journalistFollowUp,
          },
          {
            label: "Redaktör",
            agreementSlug: null,
            followUp: journalistFollowUp,
          },
        ],
      },
      {
        label: "Skog & Trä",
        occupations: [
          {
            label: "Skogsmaskinförare",
            agreementSlug: null,
            followUp: privateForestWoodFollowUp,
          },
          {
            label: "Sågverksarbetare",
            agreementSlug: null,
            followUp: sawmillFollowUp,
          },
          {
            label: "Skogsarbetare",
            agreementSlug: null,
            followUp: privateForestWoodFollowUp,
          },
          {
            label: "Träindustriarbetare/industrisnickare",
            agreementSlug: null,
            followUp: woodIndustryFollowUp,
          },
          {
            label: "Ingenjör eller teknisk tjänsteman i träindustrin",
            agreementSlug: null,
            followUp: woodIndustryFollowUp,
          },
          {
            label: "Administrativ tjänsteman eller chef i träindustrin",
            agreementSlug: null,
            followUp: woodIndustryFollowUp,
          },
          {
            label: "Ingenjör eller teknisk tjänsteman på sågverk",
            agreementSlug: null,
            followUp: sawmillFollowUp,
          },
          {
            label: "Administrativ tjänsteman på sågverk",
            agreementSlug: null,
            followUp: sawmillFollowUp,
          },
          {
            label: "Chef eller arbetsledare på sågverk",
            agreementSlug: null,
            followUp: sawmillFollowUp,
          },
        ],
      },
      {
        label: "Massa, papper & kartong",
        occupations: [
          {
            label: "Pappersbruksarbetare",
            agreementSlug: null,
            followUp: pulpPaperFollowUp,
          },
          {
            label: "Processoperatör inom massa/papper",
            agreementSlug: null,
            followUp: pulpPaperFollowUp,
          },
          {
            label: "Kartongbruksarbetare",
            agreementSlug: null,
            followUp: pulpPaperFollowUp,
          },
          {
            label: "Underhållsarbetare på massa- eller pappersbruk",
            agreementSlug: null,
            followUp: pulpPaperFollowUp,
          },
          {
            label: "Ingenjör eller teknisk tjänsteman på massa-/pappersbruk",
            agreementSlug: null,
            followUp: pulpPaperFollowUp,
          },
          {
            label: "Administrativ tjänsteman på massa-/pappersbruk",
            agreementSlug: null,
            followUp: pulpPaperFollowUp,
          },
          {
            label: "Chef eller arbetsledare på massa-/pappersbruk",
            agreementSlug: null,
            followUp: pulpPaperFollowUp,
          },
        ],
      },
      {
        label: "Skola (friskolor)",
        occupations: [
          {
            label: "Lärare eller studie- och yrkesvägledare",
            agreementSlug: "friskoleavtalet-larare",
          },
          {
            label: "Barnskötare (friskola)",
            agreementSlug: null,
            followUp: independentSchoolMunicipalFollowUp,
          },
          {
            label: "Elevassistent",
            agreementSlug: null,
            followUp: independentSchoolMunicipalFollowUp,
          },
          {
            label: "Kökspersonal (skola)",
            agreementSlug: null,
            followUp: independentSchoolMunicipalFollowUp,
          },
        ],
      },
      {
        label: "Svenska kyrkan (avtalsansluten arbetsgivare)",
        question: "Vilket avtalsområde tillhör du?",
        occupations: [
          {
            label: "Arbetare inom Kommunals avtalsområde",
            agreementSlug: "svenska-kyrkan-kommunal",
          },
          {
            label: "Tjänsteman",
            agreementSlug: "svenska-kyrkan-tjansteman",
          },
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
      {
        label: "Kommunalt bolag anslutet till Sobona",
        question: "Vilket av Sobonas verksamhetsområden arbetar du inom?",
        occupations: [
          {
            label: "Energi",
            agreementSlug: "sobona-bok-energi",
          },
          {
            label: "Fastigheter",
            agreementSlug: "sobona-bok-fastigheter",
          },
          {
            label: "Flygplatser",
            agreementSlug: "sobona-bok-flygplatser",
          },
          {
            label: "Vatten och miljö",
            agreementSlug: "sobona-bok-vatten-miljo",
          },
          {
            label: "Besöksnäring och kulturarv",
            agreementSlug: "sobona-bok-besoksnaring-kulturarv",
          },
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
          {
            label: "Civilanställd (försvar)",
            agreementSlug: null,
            followUp: stateAgreementFollowUp,
          },
        ],
      },
      {
        label: "Kriminalvård & Domstol",
        occupations: [
          { label: "Kriminalvårdare", agreementSlug: "villkorsavtal-ofr" },
          {
            label: "Domstolshandläggare",
            agreementSlug: null,
            followUp: stateAgreementFollowUp,
          },
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
          {
            label: "Vägarbetare (Trafikverket)",
            agreementSlug: null,
            followUp: stateAgreementFollowUp,
          },
          {
            label: "Banarbetare hos statlig arbetsgivare",
            agreementSlug: null,
            followUp: stateAgreementFollowUp,
          },
          {
            label: "Signaltekniker hos statlig arbetsgivare",
            agreementSlug: null,
            followUp: stateAgreementFollowUp,
          },
        ],
      },
      {
        label: "Service & Drift (statlig)",
        occupations: [
          {
            label: "Vaktmästare (statlig)",
            agreementSlug: null,
            followUp: stateAgreementFollowUp,
          },
          {
            label: "Lokalvårdare (statlig)",
            agreementSlug: null,
            followUp: stateAgreementFollowUp,
          },
          {
            label: "Vaktpersonal hos statlig arbetsgivare",
            agreementSlug: null,
            followUp: stateAgreementFollowUp,
          },
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
