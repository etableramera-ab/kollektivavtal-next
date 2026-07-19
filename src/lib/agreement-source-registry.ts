import type { Agreement } from "@/data/agreements";

type PublicAgreementIdentity = Pick<
  Agreement,
  "name" | "shortName" | "parties" | "validPeriod" | "sources"
>;

// Public identity data is kept separate from the older hand-written summaries.
// Every entry below has been checked against a current official source.
export const PUBLIC_AGREEMENT_IDENTITIES = {
  byggavtalet: {
    name: "Byggavtalet",
    shortName: "Byggavtalet",
    parties: {
      unions: ["Svenska Byggnadsarbetareförbundet"],
      employers: ["Byggföretagen"],
    },
    validPeriod: "1 maj 2025 – 30 april 2027",
    sources: [
      {
        label: "Byggnads – Byggavtalet",
        url: "https://www.byggnads.se/stod-pa-jobbet/byggnads-kollektivavtal/avtalsrorelsen2025/ditt-avtal/byggavtalet/",
      },
      {
        label: "Byggavtalet 2025–2027 (PDF)",
        url: "https://www.byggnads.se/49ec78/siteassets/kollektivavtal/byggavtalet-2025-digital-utgava-1.pdf",
      },
    ],
  },
  glasmasteriavtalet: {
    name: "Glasmästeriavtalet",
    shortName: "Glasmästeriavtalet",
    parties: {
      unions: ["Svenska Byggnadsarbetareförbundet"],
      employers: ["Glasbranschföreningen"],
    },
    validPeriod: "1 maj 2025 – 30 april 2027",
    sources: [
      {
        label: "Byggnads – Glasmästeriavtalet",
        url: "https://www.byggnads.se/stod-pa-jobbet/byggnads-kollektivavtal/avtalsrorelsen2025/ditt-avtal/glasmasteriavtalet/",
      },
      {
        label: "Glasmästeriavtalet 2025–2027 (PDF)",
        url: "https://www.byggnads.se/4a728f/siteassets/kollektivavtal/glasmasteriavtalet-2025-2027.pdf",
      },
    ],
  },
  entreprenadmaskinavtalet: {
    name: "Entreprenadmaskinavtalet",
    shortName: "Entreprenadmaskinavtalet",
    parties: {
      unions: ["Svenska Byggnadsarbetareförbundet"],
      employers: ["Maskinentreprenörerna (ME)"],
    },
    validPeriod: "1 juni 2025 – 31 maj 2027",
    sources: [
      {
        label: "Byggnads – Entreprenadmaskinavtalet",
        url: "https://www.byggnads.se/stod-pa-jobbet/byggnads-kollektivavtal/avtalsrorelsen2025/ditt-avtal/entreprenadmaskinavtalet/",
      },
      {
        label: "Entreprenadmaskinavtalet 2025–2027 (PDF)",
        url: "https://www.byggnads.se/4a4eef/siteassets/kollektivavtal/entreprenadmaskinavtalet-2025-2027.pdf",
      },
    ],
  },
  "plat-ventilationsavtalet": {
    name: "Plåt- och Ventilationsavtalet",
    shortName: "Plåt- och Ventilationsavtalet",
    parties: {
      unions: ["Svenska Byggnadsarbetareförbundet"],
      employers: ["Plåt & Ventföretagen"],
    },
    validPeriod: "1 maj 2025 – 30 april 2027",
    sources: [
      {
        label: "Byggnads – Plåt- och Ventilationsavtalet",
        url: "https://www.byggnads.se/stod-pa-jobbet/byggnads-kollektivavtal/avtalsrorelsen2025/ditt-avtal/plat--och-ventilationsavtalet/",
      },
      {
        label: "Plåt- och Ventilationsavtalet 2025–2027 (PDF)",
        url: "https://www.byggnads.se/4a76c4/siteassets/kollektivavtal/plat--och-ventilationsavtalet-2025---2027.pdf",
      },
    ],
  },
  maleriavtalet: {
    name: "Kollektivavtal för måleriyrket",
    shortName: "Måleriavtalet",
    parties: {
      unions: ["Svenska Byggnadsarbetareförbundet"],
      employers: ["Måleriföretagen i Sverige"],
    },
    validPeriod: "1 maj 2025 – 30 april 2027",
    sources: [
      {
        label: "Byggnads – Kollektivavtal för måleriyrket",
        url: "https://www.byggnads.se/stod-pa-jobbet/byggnads-kollektivavtal/avtalsrorelsen2025/ditt-avtal/kollektivavtal-for-maleriyrket/",
      },
      {
        label: "Kollektivavtal för måleriyrket 2025–2027 (PDF)",
        url: "https://www.byggnads.se/4a4f6e/siteassets/kollektivavtal/kollektivavtal-for-maleriyrket-2025-2027.pdf",
      },
    ],
  },
  "vvs-montorsavtalet": {
    name: "Teknikinstallationsavtalet VVS & Kyl",
    shortName: "Teknikinstallationsavtalet",
    parties: {
      unions: ["Svenska Byggnadsarbetareförbundet"],
      employers: ["Installatörsföretagen"],
    },
    validPeriod: "1 maj 2025 – 30 april 2027",
    sources: [
      {
        label: "Byggnads – Teknikinstallationsavtalet VVS & Kyl",
        url: "https://www.byggnads.se/stod-pa-jobbet/byggnads-kollektivavtal/avtalsrorelsen2025/ditt-avtal/teknikinstallationsavtalet-vvs--kyl/",
      },
      {
        label: "Teknikinstallationsavtalet VVS & Kyl 2025–2027 (PDF)",
        url: "https://www.byggnads.se/4a7b02/siteassets/kollektivavtal/teknikinstallationsavtal-vvs-kyl-2025-2027.pdf",
      },
    ],
  },
  installationsavtalet: {
    name: "Installationsavtalet",
    shortName: "Installationsavtalet",
    parties: {
      unions: ["Svenska Elektrikerförbundet"],
      employers: ["Installatörsföretagen"],
    },
    validPeriod: "1 maj 2025 – 30 april 2027",
    sources: [
      {
        label: "Installatörsföretagen – kollektivavtal",
        url: "https://www.in.se/arbetsgivare/kollektivavtal/",
      },
      {
        label: "Installationsavtalet 2025–2027 (PDF)",
        url: "https://www.in.se/globalassets/dokument/arbetsgivarguiden/publik/kollektivavtal/installationsavtalet-2025-2027.pdf",
      },
    ],
  },
  "vag-banavtalet-seko": {
    name: "Väg- och banavtalet",
    shortName: "Väg- och banavtalet",
    parties: {
      unions: ["Seko, Service- och kommunikationsfacket"],
      employers: ["Byggföretagen"],
    },
    validPeriod: "1 maj 2025 – 30 april 2027",
    sources: [
      {
        label: "Seko – Väg- och banavtalet",
        url: "https://www.seko.se/branscher/vag-och-ban/kollektivavtal/",
      },
      {
        label: "Väg- och banavtalet 2025–2027 (PDF)",
        url: "https://www.seko.se/4a5cef/siteassets/kollektivavtal/branschavtal/vag-och-ban/vag-och-banavtalet-2025-2027-utgava-1.pdf",
      },
    ],
  },
  "i-avtalet": {
    name: "I-avtalet",
    shortName: "I-avtalet",
    parties: {
      unions: ["IF Metall"],
      employers: ["Innovations- och kemiindustrierna i Sverige (IKEM)"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "IF Metall – I-avtalet 2025–2027 (PDF)",
        url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/i-avtalet-2025-2027.pdf",
      },
      {
        label: "IKEM – de nya kollektivavtalen 2025",
        url: "https://www.ikem.se/nyheter/2025/de-nya-kollektivavtalen",
      },
    ],
  },
  "stal-och-metall": {
    name: "Stål- och metallindustrin",
    shortName: "Stål- och metallindustrin",
    parties: {
      unions: ["IF Metall"],
      employers: ["Föreningen Industriarbetsgivarna"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "IF Metall – Stål- och metallindustrin 2025–2027 (PDF)",
        url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/stal--och-metallindustrin-roda-avtalet.pdf",
      },
    ],
  },
  "gemensamma-metall": {
    name: "Gemensamma metallavtalet",
    shortName: "Gemensamma metall",
    parties: {
      unions: ["IF Metall"],
      employers: ["Innovations- och kemiindustrierna i Sverige (IKEM)"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "IF Metall – Gemensamma metall 2025–2027 (PDF)",
        url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/gemensamma-metall-2025-2027.pdf",
      },
      {
        label: "IKEM – de nya kollektivavtalen 2025",
        url: "https://www.ikem.se/nyheter/2025/de-nya-kollektivavtalen",
      },
    ],
  },
  "glasavtalet-industri": {
    name: "Glasindustrin",
    shortName: "Glasindustrin",
    parties: {
      unions: ["IF Metall"],
      employers: ["Innovations- och kemiindustrierna i Sverige (IKEM)"],
    },
    validPeriod: "1 juni 2025 – 31 maj 2027",
    sources: [
      {
        label: "IF Metall – Glasindustrin 2025–2027 (PDF)",
        url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/glasavtalet-2025-2027.pdf",
      },
      {
        label: "IKEM – Glasindustrin",
        url: "https://www.ikem.se/for-vara-medlemmar/arbetsgivarguiden/kollektivavtal/glasindustrin/",
      },
    ],
  },
  samhallsavtalet: {
    name: "Kollektivavtal Samhall",
    shortName: "Samhallavtalet",
    parties: {
      unions: [
        "IF Metall",
        "Kommunal",
        "Fastighets",
        "Handels",
        "GS-facket",
        "Seko",
        "Hotell- och restaurangfacket (HRF)",
        "Svenska Transportarbetareförbundet (Transport)",
      ],
      employers: ["Fremia", "Samhall AB"],
    },
    validPeriod: "1 oktober 2025 – 30 september 2027",
    sources: [
      {
        label: "Kollektivavtal Samhall 2025–2027 (PDF)",
        url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/samhall-lo-2025-2027.pdf",
      },
      {
        label: "Samhall – kollektivavtalet 2025–2027",
        url: "https://portalen.samhall.se/kollektivavtal/",
      },
    ],
  },
  "teknikavtalet-ifmetall": {
    name: "Teknikavtalet IF Metall",
    shortName: "Teknikavtalet IF Metall",
    parties: {
      unions: ["IF Metall"],
      employers: ["Teknikarbetsgivarna"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "IF Metall – Teknikavtalet IF Metall 2025–2027 (PDF)",
        url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/teknikavtalet-2025-2027.pdf",
      },
      {
        label: "Teknikföretagen – Avtal 2025",
        url: "https://www.teknikforetagen.se/avtal27-test/avtal-25/",
      },
    ],
  },
  "svemek-avtalet": {
    name: "SVEMEK-avtalet",
    shortName: "SVEMEK",
    parties: {
      unions: ["IF Metall"],
      employers: ["Föreningen Industriarbetsgivarna"],
    },
    validPeriod: "1 juni 2025 – 31 maj 2027",
    sources: [
      {
        label: "IF Metall – SVEMEK-avtalet 2025–2027 (PDF)",
        url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/svemek-2025-2027.pdf",
      },
      {
        label: "Industriarbetsgivarna – avtal för svetsmekanisk industri",
        url: "https://industriarbetsgivarna.se/nyheter/avtalsforhandlingar/nytt-avtal-for-svetsmekanisk-industri/",
      },
    ],
  },
  "kemiskt-avtal-ifmetall": {
    name: "Kemiska fabriker",
    shortName: "Kemiska fabriker",
    parties: {
      unions: ["IF Metall"],
      employers: ["Innovations- och kemiindustrierna i Sverige (IKEM)"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "IF Metall – Kemiska fabriker 2025–2027 (PDF)",
        url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/kemiska-fabriker-2025-2027.pdf",
      },
      {
        label: "IKEM – de nya kollektivavtalen 2025",
        url: "https://www.ikem.se/nyheter/2025/de-nya-kollektivavtalen",
      },
    ],
  },
  bemanningsavtalet: {
    name: "Bemanningsavtalet",
    shortName: "Bemanningsavtalet",
    parties: {
      unions: ["Samtliga förbund inom LO"],
      employers: ["Kompetensföretagen"],
    },
    validPeriod: "1 maj 2025 – 30 april 2027",
    sources: [
      {
        label: "LO – Bemanningsavtalet 2025–2027 (PDF)",
        url: "https://www.lo.se/media/0ygnhcpp/bemanningsavtalet_2025-05-01-2027-04-30.pdf",
      },
      {
        label: "Kompetensföretagen – Bemanningsavtalet 2025–2027 (PDF)",
        url: "https://www.kompetensforetagen.se/app/uploads/sites/5/2025/11/Kollektivavtal-bemanning-arbetare-2025-2027-artnr-6516-2505.pdf",
      },
    ],
  },
  "ab-kommunalt": {
    name: "Allmänna bestämmelser (AB 25)",
    shortName: "AB 25",
    parties: {
      unions: [
        "Svenska Kommunalarbetareförbundet (Kommunal)",
        "OFR:s förbundsområde Allmän kommunal verksamhet",
        "OFR:s förbundsområde Hälso- och sjukvård",
        "OFR:s förbundsområde Lärare",
        "OFR:s förbundsområde Läkare",
        "AkademikerAlliansen",
      ],
      employers: [
        "Sveriges Kommuner och Regioner (SKR)",
        "Sobona – Kommunala företagens arbetsgivarorganisation",
      ],
    },
    validPeriod: "I lydelse från och med 1 april 2025",
    sources: [
      {
        label: "SKR – Allmänna bestämmelser AB 25",
        url: "https://skr.se/kollektivavtal/allmannabestammelser.655.html",
      },
      {
        label: "SKR – AB 25 i original (PDF)",
        url: "https://skr.se/download/18.4c5d386919996f3b21151e81/1759306535392/Allmanna-Bestammelser-AB-25-i-lydelse-2025-04-01.pdf",
      },
      {
        label: "SKR – tjänstepension enligt kollektivavtal",
        url: "https://skr.se/kollektivavtal/pensionerochavtalsforsakringar/tjanstepensionenligtkollektivavtal.9234.html",
      },
    ],
  },
  "hok-kommunal": {
    name: "HÖK 25 med Svenska Kommunalarbetareförbundet",
    shortName: "HÖK 25 Kommunal",
    parties: {
      unions: ["Svenska Kommunalarbetareförbundet (Kommunal)"],
      employers: [
        "Sveriges Kommuner och Regioner (SKR)",
        "Sobona – Kommunala företagens arbetsgivarorganisation",
      ],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "SKR – HÖK 25 med Kommunal",
        url: "https://skr.se/kollektivavtal/huvudoverenskommelsehok/huvudoverenskommelsehokmedsvenskakommunalarbetareforbundet.8205.html",
      },
      {
        label: "SKR – HÖK 25 i original (PDF)",
        url: "https://skr.se/download/18.4d2a888c19913a970f86ce83/1757406196642/Huvudoverenskommelse-%28HOK%29-25-med-Kommunal.pdf",
      },
      {
        label: "SKR – AB 25 i original (PDF)",
        url: "https://skr.se/download/18.4c5d386919996f3b21151e81/1759306535392/Allmanna-Bestammelser-AB-25-i-lydelse-2025-04-01.pdf",
      },
      {
        label: "SKR – tjänstepension enligt kollektivavtal",
        url: "https://skr.se/kollektivavtal/pensionerochavtalsforsakringar/tjanstepensionenligtkollektivavtal.9234.html",
      },
    ],
  },
  "hok-vision": {
    name: "HÖK 25 med OFR Allmän kommunal verksamhet",
    shortName: "HÖK 25 OFR AKV",
    parties: {
      unions: [
        "OFR:s förbundsområde Allmän kommunal verksamhet (Vision, Akademikerförbundet SSR, Ledarna och Fackförbundet Scen och Film)",
      ],
      employers: [
        "Sveriges Kommuner och Regioner (SKR)",
        "Sobona – Kommunala företagens arbetsgivarorganisation",
      ],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "SKR – HÖK 25 med OFR Allmän kommunal verksamhet",
        url: "https://skr.se/kollektivavtal/huvudoverenskommelsehok/huvudoverenskommelsehokmedofrallmankommunalverksamhet.8207.html",
      },
    ],
  },
  laraavtalet: {
    name: "HÖK 25 med OFR:s förbundsområde Lärare",
    shortName: "HÖK 25 Lärare",
    parties: {
      unions: ["OFR:s förbundsområde Lärare (Sveriges Lärare)"],
      employers: [
        "Sveriges Kommuner och Regioner (SKR)",
        "Sobona – Kommunala företagens arbetsgivarorganisation",
      ],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "SKR – HÖK 25 Lärare",
        url: "https://skr.se/kollektivavtal/huvudoverenskommelsehok/huvudoverenskommelsehokmedofrsforbundsomradelarare.8209.html",
      },
    ],
  },
  "sjukskoterska-avtal": {
    name: "HÖK 25 med OFR:s förbundsområde Hälso- och sjukvård",
    shortName: "HÖK 25 Hälso- och sjukvård",
    parties: {
      unions: ["OFR:s förbundsområde Hälso- och sjukvård (Vårdförbundet)"],
      employers: [
        "Sveriges Kommuner och Regioner (SKR)",
        "Sobona – Kommunala företagens arbetsgivarorganisation",
      ],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "SKR – HÖK 25 Hälso- och sjukvård",
        url: "https://skr.se/kollektivavtal/huvudoverenskommelsehok/huvudoverenskommelsehokmedofrsforbundsomradehalsoochsjukvard.8208.html",
      },
    ],
  },
  "hok-akademiker": {
    name: "HÖK T med AkademikerAlliansen",
    shortName: "HÖK T AkademikerAlliansen",
    parties: {
      unions: ["AkademikerAlliansen och anslutna riksorganisationer"],
      employers: [
        "Sveriges Kommuner och Regioner (SKR)",
        "Sobona – Kommunala företagens arbetsgivarorganisation",
      ],
    },
    validPeriod:
      "Från och med 1 april 2025 och tills vidare (fem månaders ömsesidig uppsägningstid)",
    sources: [
      {
        label: "SKR – HÖK T med AkademikerAlliansen",
        url: "https://skr.se/kollektivavtal/huvudoverenskommelsehok/huvudoverenskommelsehoktmedakademikeralliansen.8206.html",
      },
    ],
  },
  "lakare-kommun": {
    name: "HÖK 25 med OFR:s förbundsområde Läkare",
    shortName: "HÖK 25 Läkare",
    parties: {
      unions: ["OFR:s förbundsområde Läkare (Sveriges läkarförbund)"],
      employers: [
        "Sveriges Kommuner och Regioner (SKR)",
        "Sobona – Kommunala företagens arbetsgivarorganisation",
      ],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "SKR – HÖK 25 Läkare",
        url: "https://skr.se/kollektivavtal/huvudoverenskommelsehok/huvudoverenskommelsehokmedofrsforbundsomradelakare.8225.html",
      },
    ],
  },
  "villkorsavtal-saco": {
    name: "Villkorsavtal-T mellan Arbetsgivarverket och Saco-S",
    shortName: "Villkorsavtal-T Saco-S",
    parties: {
      unions: ["Saco-S"],
      employers: ["Arbetsgivarverket"],
    },
    validPeriod: "Tills vidare; nuvarande lydelse från och med 1 januari 2026",
    sources: [
      {
        label: "Arbetsgivarverket – Villkorsavtal-T Saco-S",
        url: "https://www.arbetsgivarverket.se/avtal-och-skrifter/avtal/villkorsavtal-t-arbetsgivarverket---saco-s",
      },
    ],
  },
  "villkorsavtal-ofr": {
    name: "Villkorsavtal mellan Arbetsgivarverket och OFR/S,P,O",
    shortName: "Villkorsavtal OFR/S,P,O",
    parties: {
      unions: ["OFR/S,P,O"],
      employers: ["Arbetsgivarverket"],
    },
    validPeriod:
      "1 oktober 2025 – 30 september 2027; nuvarande lydelse från och med 1 januari 2026",
    sources: [
      {
        label: "Arbetsgivarverket – Villkorsavtal OFR/S,P,O",
        url: "https://www.arbetsgivarverket.se/avtal-och-skrifter/avtal/villkorsavtal-arbetsgivarverket---ofrspo",
      },
      {
        label: "Arbetsgivarverket – RALS 2025–2027 OFR/S,P,O",
        url: "https://www.arbetsgivarverket.se/avtal-och-skrifter/avtal/ramavtal-mellan-arbetsgivarverket-och-ofrspo",
      },
    ],
  },
  skogsavtalet: {
    name: "VISST – Villkorsavtal för skogligt arbete inom staten",
    shortName: "VISST 2026–2027",
    parties: {
      unions: ["GS-Facket för skogs-, trä- och grafisk bransch"],
      employers: ["Skogsstyrelsen"],
    },
    validPeriod: "1 januari 2026 – 31 december 2027",
    sources: [
      {
        label: "Skogsstyrelsen – VISST 2026–2027",
        url: "https://www.skogsstyrelsen.se/om-oss/var-verksamhet/jobba-hos-oss/kollektivavtal/",
      },
      {
        label: "Skogsstyrelsen – VISST 2026–2027 (PDF)",
        url: "https://www.skogsstyrelsen.se/globalassets/om-oss/kollektivavtal/visst-2026-2027.pdf",
      },
    ],
  },
  "lager-ehandelsavtalet": {
    name: "Lager- och E-handelsavtalet",
    shortName: "Lager & E-handel",
    parties: {
      unions: ["Handelsanställdas förbund"],
      employers: ["Svensk Handel"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Handels – lager och e-handel",
        url: "https://www.handels.se/vara-branscher/lager/",
      },
      {
        label: "Handels – OB-tillägg för lager",
        url: "https://www.handels.se/fakta-och-rad/lon-ob/ob-tillagg/",
      },
      {
        label: "Handels – avtalsresultat 2025–2027",
        url: "https://www.handels.se/avtalsrorelse/avtal-butik-lager-e-handel/",
      },
      {
        label: "Svensk Handel – kollektivavtal",
        url: "https://www.svenskhandel.se/arbetsgivarguiden/kollektivavtal/",
      },
    ],
  },
  handelsavtalet: {
    name: "Detaljhandelsavtalet",
    shortName: "Detaljhandelsavtalet",
    parties: {
      unions: ["Handelsanställdas förbund"],
      employers: ["Svensk Handel"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Handels – aktuellt avtalsresultat för butik",
        url: "https://www.handels.se/avtalsrorelse/avtal-butik-lager-e-handel/",
      },
      {
        label: "Svensk Handel – Detaljhandelsavtalet",
        url: "https://www.svenskhandel.se/arbetsgivarguiden/kollektivavtal/",
      },
      {
        label: "Installatörsföretagen – Detaljhandelsavtalet 2025–2027 (PDF)",
        url: "https://www.in.se/globalassets/dokument/arbetsgivarguiden/publik/kollektivavtal/detaljhandelsavtalet-2025-2027-in.pdf",
      },
    ],
  },
  "hotell-restaurang": {
    name: "Gröna riksavtalet",
    shortName: "Gröna riksavtalet",
    parties: {
      unions: ["Hotell- och restaurangfacket (HRF)"],
      employers: ["Visita"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "HRF – Gröna riksavtalet",
        url: "https://www.hrf.net/ladda-ned-grona-riksavtalet/",
      },
      {
        label: "Gröna riksavtalet 2025–2027 (PDF)",
        url: "https://www.hrf.net/app/uploads/2025/05/Grona-riksen-2025-2027-1.pdf",
      },
    ],
  },
  fastighetsavtalet: {
    name: "Fastighetsarbetsgivarna – Tjänstemannaavtal",
    shortName: "Fastighetsarbetsgivarna",
    parties: {
      unions: ["Unionen", "Ledarna", "Sveriges Ingenjörer", "Seko"],
      employers: ["Almega Tjänsteförbunden Fastighetsarbetsgivarna"],
    },
    validPeriod: "1 juni 2025 – 31 maj 2027",
    sources: [
      {
        label: "Unionen – Fastighetsarbetsgivarna",
        url: "https://www.unionen.se/kollektivavtal/almega-tjansteforbunden-fastighetsarbetsgivarna",
      },
      {
        label: "Fastighetsarbetsgivarna 2025–2027 (PDF)",
        url: "https://www.akavia.se/siteassets/03-rad-och-stod/kollektivavtal-privat-sektor/almega/kollektivavtal---avtal-2025---fastighetsarbetsgivarna---20250601.pdf",
      },
    ],
  },
} satisfies Record<string, PublicAgreementIdentity>;

export function getPublicAgreementIdentity(
  slug: string
): PublicAgreementIdentity | undefined {
  return PUBLIC_AGREEMENT_IDENTITIES[
    slug as keyof typeof PUBLIC_AGREEMENT_IDENTITIES
  ];
}
