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
        url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/stal-och-metall-roda-avtalet.pdf",
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
  "kompetensforetagen-tjansteman": {
    name: "Kompetensföretagens avtal för tjänstemän",
    shortName: "Bemanning – tjänstemän",
    parties: {
      unions: ["Unionen", "Akademikerförbunden"],
      employers: ["Kompetensföretagen"],
    },
    validPeriod: "1 maj 2025 – 30 april 2027",
    sources: [
      {
        label: "Kompetensföretagens avtal för tjänstemän 2025–2027 (PDF)",
        url: "https://www.kompetensforetagen.se/app/uploads/sites/5/2025/11/Kollektivavtal-Kompetensforetagen-tjansteman-2025-2027-artnr-6512-2506.pdf",
      },
      {
        label: "Löneavtal för Unionen och Akademikerförbunden (PDF)",
        url: "https://www.kompetensforetagen.se/app/uploads/sites/5/2025/11/Loneavtal-Kompetensforetagen-tjansteman-2025-2027-artnr-6538-2505-1.pdf",
      },
      {
        label: "Kompetensföretagen – kollektivavtal",
        url: "https://www.kompetensforetagen.se/bli-medlem-2/kollektivavtal/",
      },
      {
        label: "Unionen – Kompetensföretagen",
        url: "https://www.unionen.se/kollektivavtal/kompetensforetagen",
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
      {
        label: "HÖK 25 OFR AKV (PDF)",
        url: "https://skr.se/download/18.4d2a888c19913a970f86d11f/1757406625508/Huvudoverenskommelse-%28HOK%29-25-med-OFR-AKV.pdf",
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
      {
        label: "HÖK 25 Lärare (PDF)",
        url: "https://skr.se/download/18.4d2a888c19913a970f86d2cf/1757406957810/HOK-25-OFRs-Larare.pdf",
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
      {
        label: "HÖK 25 Hälso- och sjukvård (PDF)",
        url: "https://skr.se/download/18.4d2a888c19913a970f86d134/1757406796925/HOK-25-OFR-H%C3%A4lso-och-sjukvard..pdf",
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
      {
        label: "HÖK T AkademikerAlliansen (PDF)",
        url: "https://skr.se/download/18.4d2a888c19913a970f86cfd2/1757406413579/HOK-T-med-AkademikerAlliansen-i-lydelse%202025-04-01.pdf",
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
      {
        label: "HÖK 25 Läkare (PDF)",
        url: "https://skr.se/download/18.2eae6b4519a0f5b858e1b6e7/1761294674524/H%C3%96K%2025%20L%C3%A4karf%C3%B6rbundet.pdf",
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
      {
        label: "Villkorsavtal-T Saco-S (PDF)",
        url: "https://www.arbetsgivarverket.se/globalassets/arbetsgivarverket/avtal-och-skrifter/avtal/villkorsavtal-t-arbetsgivarverket---saco-s/villkorsavtal-t-saco-s-6.0-20260114.pdf",
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
      {
        label: "Villkorsavtal OFR/S,P,O (PDF)",
        url: "https://www.arbetsgivarverket.se/globalassets/arbetsgivarverket/avtal-och-skrifter/avtal/villkorsavtal-arbetsgivarverket---ofrspo/villkorsavtal-ofr-s-p-o-6.0-20260114.pdf",
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
  "teknikavtalet-tjansteman": {
    name: "Teknikavtalet Unionen/Sveriges Ingenjörer/Ledarna",
    shortName: "Teknikavtalet tjänstemän",
    parties: {
      unions: ["Unionen", "Sveriges Ingenjörer", "Ledarna"],
      employers: ["Teknikarbetsgivarna"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Sveriges Ingenjörer – Teknikarbetsgivarna",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/teknikarbetsgivarna-tag-teknikforetagen/",
      },
      {
        label: "Teknikavtalet 2025–2027 (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/teknikarbetsgivarna-tag-teknikforetagen/?block=22155&mode=Index&resourcename=1.+Teknikavtalet+Unionen+Sveriges+Ingenj%C3%B6rer+Ledarna+2025-2027.pdf",
      },
    ],
  },
  "handelns-tjanstemannaavtal": {
    name: "Handelns tjänstemannaavtal",
    shortName: "Handelns tjänstemannaavtal",
    parties: {
      unions: ["Unionen", "Akademikerförbunden"],
      employers: ["Svensk Handel"],
    },
    validPeriod: "1 maj 2025 – 30 april 2027",
    sources: [
      {
        label: "Sveriges Ingenjörer – Svensk Handel",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/svensk_handel/",
      },
      {
        label: "Handelns tjänstemannaavtal 2025–2027 (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/svensk_handel/?block=22181&mode=Index&resourcename=3.+Kollektivavtal+-+Avtal+2025+-+Svensk+Handel+-+20250501-20270430.pdf",
      },
    ],
  },
  "it-avtalet": {
    name: "IT/Tech-avtalet",
    shortName: "IT/Tech-avtalet",
    parties: {
      unions: ["Unionen", "Sveriges Ingenjörer", "Akavia"],
      employers: ["TechSverige"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Unionen – IT-avtalet inom TechSverige",
        url: "https://www.unionen.se/kollektivavtal/it-avtalet-inom-techsverige",
      },
      {
        label: "Sveriges Ingenjörer – TechSverige IT",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/techsverige_it/",
      },
      {
        label: "IT/Tech-avtalets anställningsvillkor 2025–2027 (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/techsverige_it/?block=22163&mode=Index&resourcename=3.+Kollektivavtal+Allm%C3%A4nna+Anst%C3%A4llningsvillkor+-+Avtal+2025+-+TechSverige+IT+-+20250401.pdf",
      },
    ],
  },
  telekomavtalet: {
    name: "Telekom-avtalet inom TechSverige",
    shortName: "Telekom-avtalet",
    parties: {
      unions: [
        "Unionen",
        "Sveriges Ingenjörer",
        "Akavia",
        "Ledarna",
        "Seko",
      ],
      employers: ["TechSverige, avtalsområde Telekom"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Anställningsvillkor Telekom 2025–2027 (PDF)",
        url: "https://www.akavia.se/siteassets/03-rad-och-stod/kollektivavtal-privat-sektor/tech-och-it/kollektivavtal-allmanna-anstallningsvillkor---avtal-2025---techsverige-telekom.pdf",
      },
      {
        label: "Sveriges Ingenjörer – TechSverige Telekom",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/techsverige_telekom/",
      },
      {
        label: "Unionen – Telekom-avtalet inom TechSverige",
        url: "https://www.unionen.se/kollektivavtal/telekom-avtalet-inom-techsverige",
      },
      {
        label: "Seko – Telekomavtalet och bilagor",
        url: "https://www.seko.se/branscher/tele/kollektivavtal/",
      },
    ],
  },
  systembolagsavtalet: {
    name: "Systembolagsavtalet",
    shortName: "Systembolagsavtalet",
    parties: {
      unions: ["Unionen", "Akademikerförbunden"],
      employers: ["Svensk Handel"],
    },
    validPeriod: "1 maj 2025 – 30 april 2027",
    sources: [
      {
        label: "Unionen – Svensk Handel, Systembolagsanställda",
        url: "https://www.unionen.se/kollektivavtal/svensk-handel-systembolagsanstallda",
      },
      {
        label: "Sveriges Ingenjörer – Svensk Handel, Systembolaget",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/svensk-handel-systembolaget/",
      },
    ],
  },
  transportavtalet: {
    name: "Transportavtalet",
    shortName: "Transportavtalet",
    parties: {
      unions: ["Svenska Transportarbetareförbundet"],
      employers: ["Biltrafikens Arbetsgivareförbund"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Transport – aktuella kollektivavtal",
        url: "https://www.transport.se/medlemskap/kollektivavtal",
      },
      {
        label: "Transportföretagen – Transportavtalet 2025",
        url: "https://www.transportforetagen.se/nyhetslista/2025/april/transportavtalet-klart--kostnadsokningar-inom-market2/",
      },
    ],
  },
  "vardforetagarna-bransch-e": {
    name: "Vårdföretagarna – vård och omsorg, bransch E",
    shortName: "Vårdföretagarna bransch E",
    parties: {
      unions: ["Kommunal"],
      employers: ["Almega Vårdföretagarna"],
    },
    validPeriod: "1 juni 2025 – 31 maj 2027",
    sources: [
      {
        label: "Kommunal – Vårdföretagarna bransch E",
        url: "https://www.kommunal.se/nyhet/avtal-klart-2025-vardforetagarna-privat-vard-och-omsorg-bransch-e",
      },
      {
        label: "Vårdföretagarna – avtalsrörelse 2025",
        url: "https://www.vardforetagarna.se/avtalsrorelse-2025/",
      },
    ],
  },
  "vardforetagarna-bransch-f": {
    name: "Vårdföretagarna – äldreomsorg, bransch F",
    shortName: "Vårdföretagarna bransch F",
    parties: {
      unions: ["Kommunal"],
      employers: ["Almega Vårdföretagarna"],
    },
    validPeriod: "1 juni 2025 – 31 maj 2027",
    sources: [
      {
        label: "Kommunal – Vårdföretagarna bransch F",
        url: "https://www.kommunal.se/nyhet/avtal-klart-2025-vardforetagarna-privat-aldreomsorg-bransch-f",
      },
      {
        label: "Vårdföretagarna – avtalsrörelse 2025",
        url: "https://www.vardforetagarna.se/avtalsrorelse-2025/",
      },
    ],
  },
  "vardforetagarna-bransch-g": {
    name: "Vårdföretagarna – personlig assistans, bransch G",
    shortName: "Vårdföretagarna bransch G",
    parties: {
      unions: ["Kommunal"],
      employers: ["Almega Vårdföretagarna"],
    },
    validPeriod: "1 oktober 2025 – 30 september 2027",
    sources: [
      {
        label: "Kommunal – Vårdföretagarna bransch G",
        url: "https://www.kommunal.se/nyhet/avtal-klart-2025-vardforetagarna-personlig-assistans-bransch-g",
      },
    ],
  },
  livsmedelsavtalet: {
    name: "Livsmedelsavtalet med tilläggsavtal",
    shortName: "Livsmedelsavtalet",
    parties: {
      unions: ["Livsmedelsarbetareförbundet (Livs)"],
      employers: ["Livsmedelsföretagen"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Livsmedelsföretagen – aktuella kollektivavtal",
        url: "https://www.livsmedelsforetagen.se/medlem/kollektivavtal/",
      },
      {
        label: "Livsmedelsavtalet 2025–2027 (PDF)",
        url: "https://www.livs.se/globalassets/livs.se/arbetsplats--och-avtalsfragor/kollektivavtal/livsmedelsavtalet-2025.pdf",
      },
    ],
  },
  "serviceentreprenad-fastighets-seko": {
    name: "Serviceentreprenadavtalet – Fastighets och Seko",
    shortName: "Serviceentreprenad Fastighets/Seko",
    parties: {
      unions: ["Fastighetsanställdas Förbund", "Seko"],
      employers: ["Almega Tjänsteförbunden (Serviceföretagen)"],
    },
    validPeriod: "1 juni 2025 – 31 maj 2027",
    sources: [
      {
        label: "Serviceentreprenadavtalet 2025–2027 (PDF)",
        url: "https://www.fastighets.se/4a3e04/contentassets/ca8262aa379b44f38673df7101b0dd45/kollektivavtal-serviceentreprenad-fastighets-seko-2025-2027-artnr-6044-2506.pdf",
      },
    ],
  },
  "serviceentreprenad-kommunal": {
    name: "Serviceentreprenadavtalet – Kommunal",
    shortName: "Serviceentreprenad Kommunal",
    parties: {
      unions: ["Kommunal"],
      employers: ["Almega Tjänsteförbunden (Serviceföretagen)"],
    },
    validPeriod: "1 september 2025 – 31 augusti 2027",
    sources: [
      {
        label: "Serviceföretagen – Serviceentreprenad med Kommunal",
        url: "https://www.serviceforetagen.se/2025/09/04/nytt-kollektivavtal-for-serviceentreprenad-2/",
      },
    ],
  },
  "fremia-personlig-assistans": {
    name: "Fremia – personlig assistans",
    shortName: "Fremia personlig assistans",
    parties: {
      unions: ["Kommunal"],
      employers: ["Fremia"],
    },
    validPeriod: "1 november 2025 – 31 oktober 2027",
    sources: [
      {
        label: "Kommunal – Fremia personlig assistans",
        url: "https://www.kommunal.se/nyhet/avtal-klart-2025-fremia-personlig-assistans",
      },
    ],
  },
  "tjanstemannaavtalet-transportforetagen": {
    name: "Tjänstemannaavtalet för transportföretagen",
    shortName: "Transportföretagen tjänstemän",
    parties: {
      unions: [
        "Unionen",
        "Sveriges Ingenjörer",
        "Civilekonomerna (för SAS-företagen)",
      ],
      employers: [
        "Biltrafikens Arbetsgivareförbund",
        "Sjöfartens Arbetsgivareförbund",
        "Svenska Flygbranschen",
        "Sveriges Bussföretag",
        "Sveriges Hamnar",
      ],
    },
    validPeriod: "1 maj 2025 – 30 april 2027",
    sources: [
      {
        label: "Tjänstemannaavtalet för transportföretagen 2025–2027 (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/transportforetagen/?block=22176&mode=Index&resourcename=6.+Kollektivavtal+-+Avtal+2025+-+Transportf%C3%B6retagen+-+20250501.pdf",
      },
      {
        label: "Transportföretagen – avtalen och deras omfattning",
        url: "https://www.transportforetagen.se/nyhetslista/2025/april/storre-flexibilitet-i-transportforetagens-nya-tjanstemannaavtal/",
      },
    ],
  },
  "tjanstemannaavtalet-motorbranschen": {
    name: "Tjänstemannaavtalet för motorbranschen",
    shortName: "Motorbranschen tjänstemän",
    parties: {
      unions: ["Unionen", "Ledarna", "Sveriges Ingenjörer"],
      employers: ["Motorbranschens Arbetsgivareförbund"],
    },
    validPeriod:
      "1 maj 2025 – 30 april 2027 (Ledarnas avtal gäller tills vidare)",
    sources: [
      {
        label: "Tjänstemannaavtalet för motorbranschen 2025–2027 (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/transportforetagen/?block=22176&mode=Index&resourcename=5.+Kollektivavtal+-+Avtal+2025+-+Motorbranschen+-+20250501.pdf",
      },
      {
        label: "Unionen – Motorbranschens Arbetsgivareförbund",
        url: "https://www.unionen.se/kollektivavtal/motorbranschens-arbetsgivareforbund",
      },
      {
        label: "Transportföretagen – avtalen och deras omfattning",
        url: "https://www.transportforetagen.se/nyhetslista/2025/april/storre-flexibilitet-i-transportforetagens-nya-tjanstemannaavtal/",
      },
    ],
  },
  motorbranschavtalet: {
    name: "Motorbranschavtalet",
    shortName: "Motorbranschavtalet",
    parties: {
      unions: ["IF Metall"],
      employers: ["Motorbranschens Arbetsgivareförbund"],
    },
    validPeriod: "1 maj 2025 – 30 april 2027",
    sources: [
      {
        label: "Motorbranschavtalet 2025–2027 (PDF)",
        url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/motorbranschavtalet-20252027.pdf",
      },
      {
        label: "Transportföretagen – avtalet och dess omfattning",
        url: "https://www.transportforetagen.se/nyhetslista/2025/april/motorbranschavtalet-har-tecknats-for-verkstader-och-fordonsaterforsaljare/",
      },
    ],
  },
  "bankavtalet-finansforbundet": {
    name: "Kollektivavtal om löner och allmänna villkor – Finansförbundet",
    shortName: "Bankavtalet – Finansförbundet",
    parties: {
      unions: ["Finansförbundet"],
      employers: ["Finansarbetsgivarna (tidigare BAO)"],
    },
    validPeriod:
      "Tills vidare från 1 januari 2015 – aktuell lydelse 1 januari 2026",
    sources: [
      {
        label: "Finansarbetsgivarna–Finansförbundet, aktuell lydelse (PDF)",
        url: "https://www.finansforbundet.se/globalassets/material---bestall-hem/produkter/allmanna-villkor-finansforbundet-2026-01-01-002.pdf",
      },
      {
        label: "Pensionsavtal BTP, aktuell lydelse 2026 (PDF)",
        url: "https://www.finansforbundet.se/globalassets/material---bestall-hem/produkter/pensionsavtal-finansarbetsgivarna-finansforbundet-2026-01-01.pdf",
      },
      {
        label: "Finansarbetsgivarna – aktuella avtal",
        url: "https://www.finansarbetsgivarna.se/avtal",
      },
    ],
  },
  "bankavtalet-saco": {
    name: "Kollektivavtal om löner och allmänna villkor – Saco",
    shortName: "Bankavtalet – Saco",
    parties: {
      unions: [
        "Akavia",
        "Sveriges Ingenjörer",
        "övriga Saco-förbund anslutna till PTK",
      ],
      employers: ["Finansarbetsgivarna (tidigare BAO)"],
    },
    validPeriod:
      "Tills vidare från 1 januari 2015 – aktuell lydelse 1 januari 2026",
    sources: [
      {
        label: "Finansarbetsgivarna–Saco, aktuell lydelse (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/finansarbetsgivarna/?block=22144&mode=Index&resourcename=1.+Kollektivavtal+-+Avtal+2026+-+Finansarbetsgivarna+-+20260101.pdf",
      },
      {
        label: "Pensionsavtal BTP, aktuell lydelse 2026 (PDF)",
        url: "https://www.akavia.se/siteassets/03-rad-och-stod/kollektivavtal-privat-sektor/finansarbetsgivarna/pensionsavtal--finansarbetsgivarna-saco-20260101-sv.pdf",
      },
      {
        label: "Finansarbetsgivarna – aktuella avtal",
        url: "https://www.finansarbetsgivarna.se/avtal",
      },
    ],
  },
  "sobona-bok-besoksnaring-kulturarv": {
    name: "BÖK 25 Besöksnäring och kulturarv",
    shortName: "BÖK Besöksnäring och kulturarv",
    parties: {
      unions: [
        "Kommunal",
        "AkademikerAlliansen",
        "OFR Allmän kommunal verksamhet",
      ],
      employers: ["Sobona – Kommunala företagens arbetsgivarorganisation"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "BÖK 25 Besöksnäring och kulturarv (PDF)",
        url: "https://sobona.se/download/18.1eca47cd19c1c71f06dce0be/1772530261589/Avtal%20Bes%C3%B6ksn%C3%A4ring%20och%20kulturarv%202025.pdf",
      },
      {
        label: "Sobona – BÖK Besöksnäring och kulturarv",
        url: "https://sobona.se/arbetsgivarguiden/dokument-och-arbetsgivarinfo/sobonas-kollektivavtal/branschoverenskommelser-bok-och-branschbestammelser-bb/branschoverenskommelse-bok-besoksnaring-och-kulturarv",
      },
    ],
  },
  "sobona-bok-energi": {
    name: "BÖK 25 Energi",
    shortName: "BÖK Energi",
    parties: {
      unions: [
        "Kommunal",
        "Seko",
        "AkademikerAlliansen",
        "OFR Allmän kommunal verksamhet",
      ],
      employers: ["Sobona – Kommunala företagens arbetsgivarorganisation"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "BÖK 25 Energi (PDF)",
        url: "https://sobona.se/download/18.1eca47cd19c1c71f06dd16a5/1770224541432/Avtal%20Energi%202025.pdf",
      },
      {
        label: "Sobona – BÖK Energi",
        url: "https://sobona.se/arbetsgivarguiden/dokument-och-arbetsgivarinfo/sobonas-kollektivavtal/branschoverenskommelser-bok-och-branschbestammelser-bb/branschoverenskommelse-bok-energi",
      },
    ],
  },
  "sobona-bok-fastigheter": {
    name: "BÖK 25 Fastigheter",
    shortName: "BÖK Fastigheter",
    parties: {
      unions: [
        "Kommunal",
        "Fastighetsanställdas Förbund",
        "AkademikerAlliansen",
        "OFR Allmän kommunal verksamhet",
      ],
      employers: ["Sobona – Kommunala företagens arbetsgivarorganisation"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "BÖK 25 Fastigheter (PDF)",
        url: "https://sobona.se/download/18.1eca47cd19c1c71f06dd1afa/1770225129562/Avtal%20Fastigheter%202025.pdf",
      },
      {
        label: "Sobona – BÖK Fastigheter",
        url: "https://sobona.se/arbetsgivarguiden/dokument-och-arbetsgivarinfo/sobonas-kollektivavtal/branschoverenskommelser-bok-och-branschbestammelser-bb/branschoverenskommelse-bok-fastigheter",
      },
    ],
  },
  "sobona-bok-flygplatser": {
    name: "BÖK 25 Flygplatser",
    shortName: "BÖK Flygplatser",
    parties: {
      unions: [
        "Seko",
        "Svenska Transportarbetareförbundet",
        "AkademikerAlliansen",
        "OFR Allmän kommunal verksamhet",
      ],
      employers: ["Sobona – Kommunala företagens arbetsgivarorganisation"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "BÖK 25 Flygplatser (PDF)",
        url: "https://sobona.se/download/18.1eca47cd19c1c71f06dd1cfd/1770225395675/Avtal%20Flygplatser%202025.pdf",
      },
      {
        label: "Sobona – BÖK Flygplatser",
        url: "https://sobona.se/arbetsgivarguiden/dokument-och-arbetsgivarinfo/sobonas-kollektivavtal/branschoverenskommelser-bok-och-branschbestammelser-bb/branschoverenskommelse-bok-flygplatser",
      },
    ],
  },
  "sobona-bok-vatten-miljo": {
    name: "BÖK 25 Vatten och miljö",
    shortName: "BÖK Vatten och miljö",
    parties: {
      unions: [
        "Kommunal",
        "Svenska Transportarbetareförbundet",
        "AkademikerAlliansen",
        "OFR Allmän kommunal verksamhet",
      ],
      employers: ["Sobona – Kommunala företagens arbetsgivarorganisation"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "BÖK 25 Vatten och miljö (PDF)",
        url: "https://sobona.se/download/18.1eca47cd19c1c71f06dd35e9/1770226688715/Avtal%20Vatten%20och%20milj%C3%B6%202025.pdf",
      },
      {
        label: "Sobona – BÖK Vatten och miljö",
        url: "https://sobona.se/arbetsgivarguiden/dokument-och-arbetsgivarinfo/sobonas-kollektivavtal/branschoverenskommelser-bok-och-branschbestammelser-bb/branschoverenskommelse-bok-vatten-och-miljo",
      },
    ],
  },
  "friskoleavtalet-larare": {
    name: "Almega Friskoleavtalet",
    shortName: "Friskoleavtalet – lärare",
    parties: {
      unions: ["Sveriges Lärare"],
      employers: ["Almega Utbildning"],
    },
    validPeriod: "1 september 2025 – 31 augusti 2027",
    sources: [
      {
        label: "Friskoleavtalet 2025–2027 (PDF)",
        url: "https://www.sverigeslarare.se/siteassets/1.-rad-och-stod/kollektivavtal/almega/friskoleavtalet-2025-2027/almega_friskoleavtalet_kollektivavtal_2025_2027.pdf",
      },
      {
        label: "Sveriges Lärare – Almega Friskoleavtalet",
        url: "https://www.sverigeslarare.se/rad-och-stod/kollektivavtal/almega/almega-friskoleavtalet/",
      },
      {
        label: "Almega – avtalet och dess omfattning",
        url: "https://www.almega.se/2025/09/nytt-kollektivavtal-for-larare-i-friskolor/",
      },
    ],
  },
  "friskoleavtalet-kommunal": {
    name: "Almega Utbildning – Friskoleavtalet",
    shortName: "Friskoleavtalet – Kommunal",
    parties: {
      unions: ["Kommunal"],
      employers: ["Almega Utbildning"],
    },
    validPeriod: "1 november 2025 – 31 oktober 2027",
    sources: [
      {
        label: "Kommunal – Friskoleavtalet 2025",
        url: "https://www.kommunal.se/nyhet/avtal-klart-2025-almega-utbildning-friskoleavtalet",
      },
      {
        label: "Kommunal – avtal för förskola och skola",
        url: "https://www.kommunal.se/avtal/avtal-forskola-och-skola",
      },
      {
        label: "Almega – avtalsområdet Friskolor, Kommunal",
        url: "https://www.almega.se/avtal/62ce80f7-ff07-de11-b4e1-02bf9e69ca65/",
      },
    ],
  },
  "svenska-kyrkan-tjansteman": {
    name: "Svenska kyrkans Avtal 25 – Medarbetare Tjänstemän",
    shortName: "Svenska kyrkan – tjänstemän",
    parties: {
      unions: [
        "Vision",
        "Akademikerförbundet SSR och Akavia med förtecknade förbund",
        "Kyrkans Akademikerförbund (KyrkA)",
        "Sveriges Lärare",
      ],
      employers: ["Svenska kyrkans arbetsgivarorganisation"],
    },
    validPeriod: "1 maj 2025 – 30 april 2027, därefter tills vidare",
    sources: [
      {
        label: "Allmänna bestämmelser, giltiga från 1 maj 2026 (PDF)",
        url: "https://www.skao.se/media/iddkx44a/svenska-kyrkans-ab-25_tjaenstemaen_giltig_from_1maj2026.pdf",
      },
      {
        label: "Löneavtal – Medarbetare Tjänstemän (PDF)",
        url: "https://www.skao.se/media/oddjqehs/bilaga-1-sv-kyrkans-loeneavtal-25-medarbetare-tjm-rensat_medomslag.pdf",
      },
      {
        label: "Fullständigt protokoll och bilagor (PDF)",
        url: "https://www.skao.se/media/wuwd5mur/medarbetare-tjaenstemaen.pdf",
      },
      {
        label: "Svenska kyrkans arbetsgivarorganisation – Avtal 25",
        url: "https://www.skao.se/foer-arbetsgivare/kollektivavtal-2025/",
      },
      {
        label: "Svenska kyrkans arbetsgivarorganisation – lönestatistik",
        url: "https://www.skao.se/tjaenster-och-verktyg/loenestatistik-svenska-kyrkan/",
      },
    ],
  },
  "svenska-kyrkan-kommunal": {
    name: "Svenska kyrkans Avtal 25 – Medarbetare Kommunals avtalsområde",
    shortName: "Svenska kyrkan – Kommunal",
    parties: {
      unions: ["Kommunal"],
      employers: ["Svenska kyrkans arbetsgivarorganisation"],
    },
    validPeriod: "1 maj 2025 – 30 april 2027, därefter tills vidare",
    sources: [
      {
        label: "Allmänna bestämmelser, giltiga från 1 maj 2026 (PDF)",
        url: "https://www.skao.se/media/3mojjuhu/svenska-kyrkans-ab-25_kommunalsavtalsomraade_giltig_from_1maj2026.pdf",
      },
      {
        label: "Löneavtal – Kommunals avtalsområde (PDF)",
        url: "https://www.skao.se/media/3eedloxb/bilaga-1-sv-kyrkans-loeneaval-25-medarbetare-kom-rensat_medomslag-2.pdf",
      },
      {
        label: "Fullständigt protokoll och bilagor (PDF)",
        url: "https://www.skao.se/media/dhdfqhci/medarbetare-kommunals-avtalsomraade.pdf",
      },
      {
        label: "Svenska kyrkans arbetsgivarorganisation – Avtal 25",
        url: "https://www.skao.se/foer-arbetsgivare/kollektivavtal-2025/",
      },
      {
        label: "Svenska kyrkans arbetsgivarorganisation – lönestatistik",
        url: "https://www.skao.se/tjaenster-och-verktyg/loenestatistik-svenska-kyrkan/",
      },
    ],
  },
  "apoteksavtalet-svensk-handel": {
    name: "Apoteksanställda – Svensk Handel",
    shortName: "Apoteksavtalet – Svensk Handel",
    parties: {
      unions: ["Sveriges Farmaceuter", "Unionen"],
      employers: ["Svensk Handel"],
    },
    validPeriod: "1 maj 2025 – 30 april 2027",
    sources: [
      {
        label: "Unionen – Svensk Handel Apoteksanställda",
        url: "https://www.unionen.se/kollektivavtal/svensk-handel-apoteksanstallda",
      },
      {
        label: "Avtal Apoteksanställda 2025–2027 (PDF)",
        url: "https://www.sverigesfarmaceuter.se/globalassets/2-dokument/2-rad-och-stod/anstallning/kollektivavtal/apotek/svensk-handel/apoteksavtalet-2025-2027.pdf",
      },
      {
        label: "Svensk Handel – nya apoteksavtal 2025",
        url: "https://www.svenskhandel.se/nyhetscenter/pressmeddelanden/nya-apoteksavtal-tecknade-av-svensk-handel/",
      },
    ],
  },
  "apoteksforetagen-almega": {
    name: "Apoteksföretagen – Almega Tjänsteförbunden",
    shortName: "Apoteksavtalet – Almega",
    parties: {
      unions: ["Sveriges Farmaceuter", "Sveriges Ingenjörer", "Unionen"],
      employers: ["Almega Tjänsteförbunden, bransch Apotek"],
    },
    validPeriod: "1 maj 2025 – 30 april 2027",
    sources: [
      {
        label: "Unionen – Almega Tjänsteförbunden Apoteksföretagen",
        url: "https://www.unionen.se/kollektivavtal/almega-tjansteforbunden-apoteksforetagen",
      },
      {
        label: "Apoteksföretagen 2025–2027 (PDF)",
        url: "https://www.sverigesfarmaceuter.se/globalassets/2-dokument/2-rad-och-stod/anstallning/kollektivavtal/apotek/almega/kollektivavtal-apotek-tjansteman-2025-2027-sveriges-ingenjorer-sveriges-farmaceuter-unionen-artnr-6072-2505.pdf",
      },
      {
        label: "Almega – nya apoteksavtal 2025",
        url: "https://www.almega.se/2025/05/almega-tjansteforbunden-tecknar-nya-apoteksavtal-2/",
      },
    ],
  },
  "journalistavtalet-dagspress": {
    name: "Journalistavtalet – Dagspress",
    shortName: "Dagspressavtalet",
    parties: {
      unions: ["Svenska Journalistförbundet"],
      employers: ["Medieföretagen"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Journalistförbundet – Dagspressavtal",
        url: "https://www.sjf.se/vara-kollektivavtal/dagspressavtal",
      },
      {
        label: "Journalistavtalet Dagspress 2025–2027 (PDF)",
        url: "https://www.sjf.se/system/files/2025-06/Dagspress%20kollektivavtal%202025-2027.pdf",
      },
      {
        label: "Almega – nytt dagspressavtal 2025",
        url: "https://www.almega.se/2025/05/nytt-avtal-med-journalistforbundet/",
      },
    ],
  },
  "journalistavtalet-public-service": {
    name: "Journalistavtalet – Public Service",
    shortName: "Public Service-avtalet",
    parties: {
      unions: ["Svenska Journalistförbundet"],
      employers: ["Medieföretagen"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Journalistförbundet – Public service-avtal",
        url: "https://www.sjf.se/vara-kollektivavtal/public-service-avtal",
      },
      {
        label: "Journalistavtalet Public Service 2025–2027 (PDF)",
        url: "https://www.sjf.se/system/files/2025-05/Public%20service%20kollektivavtal%202025-2027.pdf",
      },
      {
        label: "Almega – nya avtal för public service 2025",
        url: "https://www.almega.se/2025/04/strejken-avblast-nya-avtal-for-public-service/",
      },
    ],
  },
  "journalistavtalet-tidskrift": {
    name: "Journalistavtalet – Tidskrifter",
    shortName: "Tidskriftsavtalet",
    parties: {
      unions: ["Svenska Journalistförbundet"],
      employers: ["Medieföretagen"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Journalistförbundet – Tidskriftsavtal",
        url: "https://www.sjf.se/vara-kollektivavtal/tidskriftsavtal",
      },
      {
        label: "Journalistavtalet Tidskrifter 2025–2027 (PDF)",
        url: "https://www.sjf.se/system/files/2025-07/Tidskrifter%20kollektivavtal%202025-2027.pdf",
      },
      {
        label: "Almega – nytt tidskriftsavtal 2025",
        url: "https://www.almega.se/2025/06/nytt-avtal-med-journalistforbundet-2/",
      },
    ],
  },
  "journalistavtalet-etermedier": {
    name: "Journalistavtalet – Etermedier",
    shortName: "Etermedieavtalet",
    parties: {
      unions: ["Svenska Journalistförbundet"],
      employers: ["Medieföretagen"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Journalistförbundet – Etermedieavtal",
        url: "https://www.sjf.se/vara-kollektivavtal/etermedieavtal",
      },
      {
        label: "Journalistavtalet Etermedier 2025–2027 (PDF)",
        url: "https://www.sjf.se/system/files/2025-07/Etermedier%20kollektivavtal%202025-2027.pdf",
      },
      {
        label: "Almega – nytt etermedieavtal 2025",
        url: "https://www.almega.se/2025/07/nytt-avtal-med-journalistforbundet-3/",
      },
    ],
  },
  "journalistavtalet-bemanning": {
    name: "Bemanningsavtalet – Journalister",
    shortName: "Bemanningsavtalet – journalister",
    parties: {
      unions: ["Svenska Journalistförbundet"],
      employers: ["Medieföretagen"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Journalistförbundet – Bemanningsavtal",
        url: "https://www.sjf.se/vara-kollektivavtal/bemanningsavtal",
      },
      {
        label: "Bemanningsavtalet för journalister 2025–2027 (PDF)",
        url: "https://www.sjf.se/system/files/2025-09/Bemanning%20kollektivavtal%202025-2027.pdf",
      },
      {
        label: "Almega – nytt bemanningsavtal för journalister 2025",
        url: "https://www.almega.se/2025/07/nytt-bemanningsavtal-med-journalistforbundet-2/",
      },
    ],
  },
  "massa-pappersindustrin-pappers": {
    name: "Massa- och pappersindustriavtalet (arbetare)",
    shortName: "Massa- och pappersindustrin – Pappers",
    parties: {
      unions: ["Svenska Pappersindustriarbetareförbundet (Pappers)"],
      employers: ["Föreningen Industriarbetsgivarna"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Massa- och pappersindustrin 2025–2027 (PDF)",
        url: "https://www.pappers.se/sites/default/files/2026-01/kollektivavtal-25-27.pdf",
      },
      {
        label: "Pappers – Avtal 2025",
        url: "https://www.pappers.se/avtal2025",
      },
      {
        label: "Industriarbetsgivarna – nytt avtal med Pappers",
        url: "https://industriarbetsgivarna.se/nyheter/avtalsforhandlingar/industriarbetsgivarna-har-traffat-avtal-med-pappers/",
      },
    ],
  },
  "massa-pappersindustrin-tjansteman": {
    name: "Massa- och pappersindustriavtalet – tjänstemän",
    shortName: "Massa och papper – tjänstemän",
    parties: {
      unions: ["Unionen", "Sveriges Ingenjörer", "Ledarna"],
      employers: ["Föreningen Industriarbetsgivarna"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Allmänna villkor för tjänstemän 2025–2027 (PDF)",
        url: "https://www.unionen.se/sites/default/files/files/Allm%C3%A4nna%20villkor%2C%20Partsgemensamma%20kommentarer%20MoP%202025-2027.pdf",
      },
      {
        label: "Avtalssamling för tjänstemän 2025–2027 (PDF)",
        url: "https://www.unionen.se/sites/default/files/files/MoP%20Avtalssamling%202025-2027.pdf",
      },
      {
        label: "Unionen – massa- och pappersindustrin",
        url: "https://www.unionen.se/kollektivavtal/industriarbetsgivarna-massa-och-pappersindustrin",
      },
      {
        label: "Sveriges Ingenjörer – massa- och pappersindustrin",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/massa--och-pappersindustrin/",
      },
      {
        label: "Ledarna – nytt avtal för massa och papper 2025",
        url: "https://www.ledarna.se/om-ledarna/nyheter/avtalsnyheter/nytt-avtal-ledarna-och-industriarbetsgivarna-massapapper-2025/",
      },
    ],
  },
  "skogsavtalet-privat": {
    name: "Skogsavtalet – privat skogsbruk",
    shortName: "Skogsavtalet – privat",
    parties: {
      unions: ["GS-facket"],
      employers: ["Gröna arbetsgivare"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Gröna arbetsgivare – avtalsinformation för skogsbruk",
        url: "https://www.grona.org/fokusfragor/avtal-2025/avtalsinformation---skogsbruk/",
      },
      {
        label: "Gröna arbetsgivare – nytt Skogsavtal 2025",
        url: "https://www.grona.org/nyhetscenter/2025/nytt-skogsavtal/",
      },
      {
        label: "GS – yrken inom Skogsavtalet",
        url: "https://www.gsfacket.se/om-oss/gs-branscher/skogsarbetaren/skogsarbetarnas-fackforbund/",
      },
    ],
  },
  "sagverksavtalet-industriarbetsgivarna": {
    name: "Sågverksavtalet",
    shortName: "Sågverksavtalet",
    parties: {
      unions: ["GS-facket"],
      employers: ["Föreningen Industriarbetsgivarna"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "GS – industriförhandlingarna 2025",
        url: "https://www.gsfacket.se/om-oss/press/nyheter/industriforhandlingarna-klara--64-procent-pa-tva-ar/",
      },
      {
        label: "Industriarbetsgivarna – avtal 2025 och avtalsområden",
        url: "https://industriarbetsgivarna.se/avtal25/",
      },
      {
        label: "GS – arbete inom sågverksindustrin",
        url: "https://www.gsfacket.se/om-oss/gs-branscher/sagverksarbetaren/",
      },
    ],
  },
  "sagverksindustrin-tjansteman": {
    name: "Sågverksindustrins tjänstemannaavtal",
    shortName: "Sågverksindustrin – tjänstemän",
    parties: {
      unions: ["Unionen", "Sveriges Ingenjörer", "Ledarna"],
      employers: ["Föreningen Industriarbetsgivarna"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Tjänstemän basindustrin 2025–2027 (PDF)",
        url: "https://www.unionen.se/sites/default/files/files/2025-%202027%20Tjm%20Basindustrin_250820.pdf",
      },
      {
        label: "Sågverksindustrins avtal och bilagor 2025–2027 (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/sagverksindustrin/?block=22151&mode=Index&resourcename=2.+S%C3%A4rstryck+-+avtal+och+bilagor+till+allm%C3%A4nna+anst%C3%A4llningsvillkor+-+S%C3%A5gverksindustrin+-+2025-04-01+-+2027-03-31.pdf",
      },
      {
        label: "Sveriges Ingenjörer – sågverksindustrin",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/sagverksindustrin/",
      },
      {
        label: "Unionen – sågverksindustrin",
        url: "https://www.unionen.se/kollektivavtal/industriarbetsgivarna-sagverksindustrin",
      },
      {
        label: "Ledarna – nytt avtal för sågverk 2025",
        url: "https://www.ledarna.se/om-ledarna/nyheter/avtalsnyheter/nytt-avtal-ledarna-och-industriarbetsgivarna-sagverk-2025/",
      },
    ],
  },
  "traindustriavtalet-tmf": {
    name: "Träindustriavtalet",
    shortName: "Träindustriavtalet",
    parties: {
      unions: ["GS-facket"],
      employers: ["Trä- och Möbelföretagen (TMF)"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "TMF – kollektivavtal 2025–2027",
        url: "https://www.tmf.se/arbetsgivarstod/alla-amnen-a-o/kollektivavtal/",
      },
      {
        label: "TMF – Träindustriavtalet 2025–2027",
        url: "https://www.tmf.se/arbetsgivarstod/alla-amnen-a-o/arbetstid/",
      },
      {
        label: "GS – trähusarbetare och Träindustriavtalet",
        url: "https://www.gsfacket.se/om-oss/gs-branscher/trahusarbetaren/",
      },
    ],
  },
  "traindustrin-tjansteman-tmf": {
    name: "Träindustrins tjänstemannaavtal",
    shortName: "Träindustrin – tjänstemän",
    parties: {
      unions: ["Unionen", "Sveriges Ingenjörer", "Ledarna"],
      employers: ["Trä- och Möbelföretagen (TMF)"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Träindustrins tjänstemannaavtal 2025–2027 (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/tmf_tra_och_mobelforetagen/?block=22169&mode=Index&resourcename=1.+Tj%C3%A4nstemannaavtal+Tr%C3%A4industri+2025+-+2027.pdf",
      },
      {
        label: "Sveriges Ingenjörer – TMF Trä- och Möbelföretagen",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/tmf_tra_och_mobelforetagen/",
      },
      {
        label: "Avtalsförändringar för Träindustrin 2025 (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/tmf_tra_och_mobelforetagen/?block=22169&mode=Index&resourcename=3.+Avtalsf%C3%B6r%C3%A4ndringar+i+TMF+f%C3%B6r+Tr%C3%A4industrin+-+2025.pdf",
      },
    ],
  },
  "gruvindustrin-if-metall": {
    name: "Gruvindustrins arbetaravtal",
    shortName: "Gruvindustrin – arbetare",
    parties: {
      unions: ["IF Metall"],
      employers: ["Föreningen Industriarbetsgivarna"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Gruvindustrins arbetaravtal 2025–2027 (PDF)",
        url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/gruvindustrin-2025-2027.pdf",
      },
    ],
  },
  "gruvindustrin-tjansteman": {
    name: "Gruvindustrins tjänstemannaavtal",
    shortName: "Gruvindustrin – tjänstemän",
    parties: {
      unions: ["Unionen", "Sveriges Ingenjörer", "Ledarna"],
      employers: ["Föreningen Industriarbetsgivarna"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Gruvindustrins tjänstemannabilaga 2025–2027 (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/gruvornas_arbetsgivareforbund/?block=22148&mode=Index&resourcename=2.+S%C3%A4rtryck+-+avtal+och+bilagor+till+allm%C3%A4nna+anst%C3%A4llningsvillkor+Gruvindustrin+2025-04-01+-+2027-03-31.pdf",
      },
      {
        label: "Gemensamma villkor för tjänstemän i basindustrin (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/gruvornas_arbetsgivareforbund/?block=22148&mode=Index&resourcename=1.+Basindustrin+-+Allm%C3%A4nna+anst%C3%A4llningsvillkor+2025+-+2027.pdf",
      },
      {
        label: "Sveriges Ingenjörer – gruvindustrin",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/gruvornas_arbetsgivareforbund/",
      },
    ],
  },
  "branschavtal-energi-efa": {
    name: "Branschavtal Energi (EFA)",
    shortName: "Energiavtalet – EFA",
    parties: {
      unions: ["Unionen", "Sveriges Ingenjörer", "Ledarna", "Seko"],
      employers: ["Energiföretagens Arbetsgivareförening (EFA)"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Branschavtal Energi 2025–2027 (PDF)",
        url: "https://www.seko.se/490235/siteassets/kollektivavtal/branschavtal/energi/kollektivavtal_efa_2025-2027.pdf",
      },
      {
        label: "Seko – kollektivavtal inom energi",
        url: "https://www.seko.se/branscher/energi/ditt-kollektivavtal/",
      },
      {
        label: "Unionen – Energiföretagens Arbetsgivareförening",
        url: "https://www.unionen.se/kollektivavtal/energiforetagens-arbetsgivareforening",
      },
      {
        label: "Sveriges Ingenjörer – Energiföretagen",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/energiforetagen/?cmpscreen=",
      },
      {
        label: "Seko – nytt energiavtal 2025",
        url: "https://www.seko.se/nyheter/2025/april/seko-overens-om-nytt-avtal-med-energiarbetsgivarna/",
      },
    ],
  },
  "branschavtal-kommunikation": {
    name: "Branschavtal Kommunikation",
    shortName: "Kommunikation och post",
    parties: {
      unions: [
        "Seko",
        "Fackförbundet ST",
        "Akavia",
        "SRAT",
        "Sveriges Ingenjörer",
        "Ledarna",
      ],
      employers: ["Almega Tjänsteförbunden, bransch Kommunikation"],
    },
    validPeriod: "1 augusti 2025 – 31 juli 2027",
    sources: [
      {
        label: "Branschavtal Kommunikation 2025–2027 (PDF)",
        url: "https://www.seko.se/4ada49/siteassets/kollektivavtal/branschavtal/kommunikation/kollektivavtal-bransch-kommunikation-2025-2027.pdf",
      },
      {
        label: "Seko – kollektivavtal inom post",
        url: "https://www.seko.se/branscher/post/kollektivavtal/",
      },
      {
        label: "PostNord – centralt avtal med lokala tillägg 2025–2027 (PDF)",
        url: "https://www.seko.se/491839/siteassets/kollektivavtal/branschavtal/post/branschavtal-2025-2027-med-postnordlokala-tillagg-till-intranat-publicering.pdf",
      },
    ],
  },
  spartrafikavtalet: {
    name: "Spårtrafikavtalet",
    shortName: "Spårtrafikavtalet",
    parties: {
      unions: ["Seko", "Fackförbundet ST", "Sveriges Ingenjörer", "SRAT"],
      employers: ["Tågföretagen"],
    },
    validPeriod: "1 maj 2025 – 30 april 2027",
    sources: [
      {
        label: "Spårtrafikavtalet 2025–2027 (PDF, lydelse 1 januari 2026)",
        url: "https://www.seko.se/48db46/siteassets/kollektivavtal/branschavtal/spartrafik/spartrafikavtalet_2025-2027-2.pdf",
      },
    ],
  },
  "villkorsavtal-seko": {
    name: "Villkorsavtal Arbetsgivarverket–Seko",
    shortName: "Villkorsavtal Seko",
    parties: {
      unions: ["Seko"],
      employers: ["Arbetsgivarverket"],
    },
    validPeriod: "1 oktober 2025 – 30 september 2027",
    sources: [
      {
        label: "Villkorsavtal Arbetsgivarverket–Seko (PDF, lydelse 1 januari 2026)",
        url: "https://www.arbetsgivarverket.se/globalassets/arbetsgivarverket/avtal-och-skrifter/avtal/villkorsavtal-arbetsgivarverket---seko/villkorsavtal-seko-6.0-20260114.pdf",
      },
      {
        label: "Arbetsgivarverket – Villkorsavtal Seko",
        url: "https://www.arbetsgivarverket.se/avtal-och-skrifter/avtal/villkorsavtal-arbetsgivarverket---seko",
      },
      {
        label: "Arbetsgivarverket – Ramavtal om löner Seko",
        url: "https://www.arbetsgivarverket.se/avtal-och-skrifter/avtal/ramavtal-mellan-arbetsgivarverket-och-seko",
      },
    ],
  },
  "stal-metallindustrin-tjansteman": {
    name: "Stål- och metallindustrins tjänstemannaavtal",
    shortName: "Stål & metall – tjänstemän",
    parties: {
      unions: ["Unionen", "Sveriges Ingenjörer", "Ledarna"],
      employers: ["Föreningen Industriarbetsgivarna"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Stål- och metallindustrins branschbilaga 2025–2027 (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/stal-och-metallforbundet/?block=22152&mode=Index&resourcename=2.+S%C3%A4rtryck+-+avtal+och+bilagor+till+allm%C3%A4nna+anst%C3%A4llningsvillkor+-+St%C3%A5l+och+Metall+2025-04-01+-+2027-03-31.pdf",
      },
      {
        label: "Gemensamma villkor för tjänstemän i basindustrin (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/stal-och-metallforbundet/?block=22152&mode=Index&resourcename=1.+Basindustrin+-+Allm%C3%A4nna+anst%C3%A4llningsvillkor+2025+-+2027+%282%29.pdf",
      },
      {
        label: "Sveriges Ingenjörer – stål- och metallindustrin",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/stal-och-metallforbundet/",
      },
    ],
  },
  "besoksnaringens-tjanstemannaavtal": {
    name: "Besöksnäringens tjänstemannaavtal",
    shortName: "Besöksnäringen – tjänstemän",
    parties: {
      unions: ["Unionen"],
      employers: ["Visita"],
    },
    validPeriod: "1 juni 2025 – 31 maj 2027",
    sources: [
      {
        label: "Besöksnäringens tjänstemannaavtal 2025–2027 (PDF)",
        url: "https://visita.se/app/uploads/2025/07/Visita-Unionen-2025-2027.pdf",
      },
      {
        label: "Unionen – Besöksnäringens tjänstemannaavtal",
        url: "https://www.unionen.se/kollektivavtal/visita-besoksnaringens-tjanstemannaavtal",
      },
      {
        label: "Visita – Avtalsextra 2025 (PDF)",
        url: "https://visita.se/app/uploads/2025/06/Avtalsextra-Unionen.pdf",
      },
    ],
  },
  "ikem-tjanstemannaavtal": {
    name: "IKEM:s tjänstemannaavtal",
    shortName: "IKEM – tjänstemän",
    parties: {
      unions: ["Unionen", "Sveriges Ingenjörer", "Naturvetarna", "Ledarna"],
      employers: ["Innovations- och kemiarbetsgivarna i Sverige (IKEM)"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "IKEM:s tjänstemannaavtal 2025–2027 (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/innovations-kemiindustrierna/?block=22150&mode=Index&resourcename=1.+IKEM-avtalet+1+april+2025+-+31+mars+2027.pdf",
      },
      {
        label: "Sveriges Ingenjörer – IKEM:s avtalsområde",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/innovations-kemiindustrierna/",
      },
    ],
  },
  "livsmedelsindustrin-tjanstemannaavtal": {
    name: "Livsmedelsindustrins tjänstemannaavtal",
    shortName: "Livsmedelsindustrin – tjänstemän",
    parties: {
      unions: ["Unionen", "Sveriges Ingenjörer", "Ledarna"],
      employers: ["Livsmedelsföretagen"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Livsmedelsindustrins tjänstemannaavtal 2025–2027 (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/livsmedelsforetagen/?block=22168&mode=Index&resourcename=1.+Tj%C3%A4nstemaannaavtalet-i-livsmedelsindustrin-2025-2027.pdf",
      },
      {
        label: "Sveriges Ingenjörer – Livsmedelsföretagen",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/livsmedelsforetagen/",
      },
      {
        label: "Arbetstidskonto för tjänstemän 2025–2027 (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/livsmedelsforetagen/?block=22168&mode=Index&resourcename=Arbetstidskonto+tj%C3%A4nstem%C3%A4n+-++Livsmedelsf%C3%B6retagen+-++2025-2027+-+250520.pdf",
      },
    ],
  },
  "byggforetagen-tjanstemannaavtal": {
    name: "Byggföretagens tjänstemannaavtal",
    shortName: "Byggföretagen – tjänstemän",
    parties: {
      unions: ["Unionen", "Sveriges Ingenjörer", "Ledarna"],
      employers: ["Byggföretagen"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Byggföretagens tjänstemannaavtal 2025–2027 (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/byggforetagen/?block=22154&mode=Index&resourcename=1.+Tj%C3%A4nstemannaavtalet+-+Byggf%C3%B6retagen+2025+-+2027.pdf",
      },
      {
        label: "Sveriges Ingenjörer – Byggföretagen",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/byggforetagen/",
      },
      {
        label: "Avtalsförändringar hos Byggföretagen 2025 (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/byggforetagen/?block=22154&mode=Index&resourcename=2.+Avtalsf%C3%B6r%C3%A4ndringar+-+Avtal+2025+-+Byggf%C3%B6retagen+-+250516.pdf",
      },
      {
        label: "Byggföretagen – nytt tjänstemannaavtal 2025",
        url: "https://byggforetagen.se/2025/05/nytt-avtal-klart-for-tjanstemannen-inom-byggbranschen/",
      },
    ],
  },
  innovationsavtalet: {
    name: "Innovationsavtalet",
    shortName: "Innovationsavtalet",
    parties: {
      unions: ["Unionen", "Sveriges Ingenjörer", "Sveriges Arkitekter"],
      employers: ["Innovationsföretagen"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Unionen – Innovationsföretagen",
        url: "https://www.unionen.se/kollektivavtal/innovationsforetagen",
      },
      {
        label: "Innovationsavtalet 2025–2027 (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/innovationsforetagen/?block=22162&mode=Index&resourcename=3.+Kollektivavtal+Allm%C3%A4nna+anst%C3%A4llningsvillkor++-+Avtal+2025+-+Innovationsf%C3%B6retagen+-+20250401.pdf",
      },
      {
        label: "Almega – nytt kollektivavtal för Innovationsföretagen",
        url: "https://www.almega.se/2025/04/nytt-kollektivavtal-for-innovationsforetagen-2/",
      },
    ],
  },
  "grona-avtalet": {
    name: "Gröna avtalet",
    shortName: "Gröna avtalet",
    parties: {
      unions: ["Unionen", "Akademikerförbunden"],
      employers: ["Almega Tjänsteföretagen", "Medieföretagen"],
    },
    validPeriod: "1 maj 2025 – 30 april 2027",
    sources: [
      {
        label: "Almega – nytt avtal för Tjänsteföretagen och Medieföretagen",
        url: "https://www.almega.se/2025/04/nytt-kollektivavtal-med-unionen-och-akademikerforbunden/",
      },
      {
        label: "Gröna avtalet 2025–2027 (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/tjansteforetagen_och_medieforetagen/?block=22171&mode=Index&resourcename=1.+Kollektivavtal+-+Avtal+2025+-+Medief%C3%B6retagen+Tj%C3%A4nstef%C3%B6retagen+gr%C3%B6na+avtalet+-+20250501.pdf",
      },
    ],
  },
  "forsakringsavtalet-forena": {
    name: "Försäkringsavtalet – FAO och Forena",
    shortName: "Försäkringsavtalet – Forena",
    parties: {
      unions: ["Forena"],
      employers: ["Försäkringsbranschens Arbetsgivareorganisation (FAO)"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Försäkringsavtalet FAO–Forena 2025–2027 (PDF)",
        url: "https://www.forena.se/media/sfjdzp4p/kollektivavtalfaoforena2025-2027.pdf",
      },
      {
        label: "FAO – nya kollektivavtal 2025",
        url: "https://www.fao.se/aktuellt/nyheter/nya-kollektivavtal-pa-fao-omradet--branschen-star-stadigt-med-blicken-mot-framtiden/",
      },
    ],
  },
  "forsakringsavtalet-saco": {
    name: "Försäkringsavtalet – akademiker",
    shortName: "Försäkringsavtalet – akademiker",
    parties: {
      unions: ["Akavia", "Sveriges Ingenjörer"],
      employers: ["Försäkringsbranschens Arbetsgivareorganisation (FAO)"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Sveriges Ingenjörer – försäkringsbranschen",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/forsakringsbranschen/",
      },
      {
        label: "Försäkringsavtalet FAO–Akavia/Sveriges Ingenjörer 2025–2027 (PDF)",
        url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/forsakringsbranschen/?block=22191&mode=Index&resourcename=3.+Kollektivavtal+-+Avtal+2025+-+F%C3%B6rs%C3%A4kringsbranschens+arbetsgivareorganisation+FAO+-+20250401+-+20270331.pdf",
      },
      {
        label: "FAO – förhandlingsprotokoll 2025 (PDF)",
        url: "https://www.fao.se/globalassets/cirkular/2025/lasa-dok/forhandlingsprotokoll-sacoforbunden-fao-2025-04-03.pdf",
      },
    ],
  },
  "bevaknings-sakerhetsavtalet": {
    name: "Bevaknings- och säkerhetsavtalet",
    shortName: "Bevaknings- och säkerhetsavtalet",
    parties: {
      unions: ["Svenska Transportarbetareförbundet"],
      employers: ["Almega Säkerhetsföretagen"],
    },
    validPeriod: "1 juni 2025 – 31 maj 2027",
    sources: [
      {
        label: "Transport – Bevaknings- och säkerhetsavtalet 2025",
        url: "https://www.transport.se/publicerat/avtal-klart-bevaknings-och-sakerhetsavtalet-2025",
      },
      {
        label: "Säkerhetsföretagen – nytt avtal 2025",
        url: "https://www.sakerhetsforetagen.se/2025/06/03/nytt-avtal-for-bevaknings-och-sakerhetsbranschen/",
      },
      {
        label: "Transport – yrken inom bevakningsavtalet",
        url: "https://avd.transport.se/avd-88/kalender/avtalspunkt-bevakning/",
      },
    ],
  },
  "fastigheter-arbetare-almega": {
    name: "Fastighetsavtalet – arbetare (Almega)",
    shortName: "Fastighetsavtalet – arbetare (Almega)",
    parties: {
      unions: ["Fastighetsanställdas Förbund"],
      employers: ["Almega Tjänsteförbunden, bransch Fastighetsarbetsgivarna"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Fastighets – Almega Fastighetsarbetsgivare",
        url: "https://www.fastighets.se/kollektivavtal/vara-kollektivavtal/almega-fastighetsarbetsgivare/",
      },
      {
        label: "Fastighetsavtalet för arbetare 2025–2027 (PDF)",
        url: "https://www.fastighets.se/49a08c/contentassets/3e30983e855d4780adef9611b4d62256/kollektivavtal-almega-fastigheter-2025-2027-fastighetsanstalldas-forbund-artnr-6554-2504.pdf",
      },
    ],
  },
  "f-avtalet-fastigo": {
    name: "F-avtalet – fastighetsarbete",
    shortName: "F-avtalet",
    parties: {
      unions: ["Fastighetsanställdas Förbund"],
      employers: ["Fastigo"],
    },
    validPeriod: "1 april 2025 – 31 mars 2027",
    sources: [
      {
        label: "Fastigo – F-avtalet 2025",
        url: "https://fastigo.se/nyheter/fastighetsbranschens-ledande-kollektivavtal-tecknat/",
      },
      {
        label: "Fastighets – Fastigo",
        url: "https://www.fastighets.se/kollektivavtal/vara-kollektivavtal/fastigo/",
      },
      {
        label: "F-avtalet 2025–2027 (PDF)",
        url: "https://www.fastighets.se/49b36f/contentassets/63ff67138286461ebbe8e9921b86aaf5/f-avtal-2025.pdf",
      },
    ],
  },
  bussbranschavtalet: {
    name: "Bussbranschavtalet",
    shortName: "Bussbranschavtalet",
    parties: {
      unions: ["Kommunal"],
      employers: ["Sveriges Bussföretag"],
    },
    validPeriod: "1 oktober 2025 – 30 september 2027",
    sources: [
      {
        label: "Kommunal – Bussbranschavtalet 2025",
        url: "https://www.kommunal.se/nyhet/avtal-klart-2025-sveriges-bussforetag",
      },
      {
        label: "Sveriges Bussföretag – avtalet och omfattningen",
        url: "https://www.transportforetagen.se/nyhetslista/2025/oktober/nytt-konkurrenskraftigt-avtal-klart-for-bussbranschen/?branch=5",
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
