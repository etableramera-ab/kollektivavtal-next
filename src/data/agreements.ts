export interface Agreement {
  slug: string;
  name: string;
  shortName: string;
  sector: "privat" | "kommun_region" | "stat";
  sectorLabel: string;
  parties: {
    unions: string[];
    employers: string[];
  };
  employeeCount: number;
  validPeriod: string;
  summary: string;
  keyFacts: {
    minimumWage: string;
    overtimeRate: string;
    obWeekday: string;
    obNight: string;
    obWeekend: string;
    obHoliday: string;
    vacationDays: string;
    parentalPay: string;
    noticePeriod: string;
    pension: string;
    workHoursPerWeek: string;
  };
  wageTable: {
    role: string;
    minimum: string;
    median: string;
    comment: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  sources: {
    label: string;
    url: string;
  }[];
  relatedAgreements: string[];
  aiSystemPrompt: string;
}

export const agreements: Agreement[] = [
  {
    slug: "hok-kommunal",
    name: "HÖK Kommunal",
    shortName: "HÖK Kommunal",
    sector: "kommun_region",
    sectorLabel: "Kommun/region",
    parties: {
      unions: ["Kommunal"],
      employers: ["SKR (Sveriges Kommuner och Regioner)", "Sobona"],
    },
    employeeCount: 540000,
    validPeriod: "1 april 2025 – 31 mars 2027",
    summary:
      "Sveriges största kollektivavtal räknat i antal anställda. HÖK Kommunal omfattar undersköterskor, vårdbiträden, barnskötare, räddningstjänstpersonal, vaktmästare och andra grupper inom kommuner och regioner. Avtalet reglerar löner, arbetstider, semester, föräldralön och pensionsvillkor. Lönerna sätts genom lokal lönebildning, men avtalet anger lägsta nivåer och garanterade löneökningar.",
    keyFacts: {
      minimumWage: "Från ca 26 500 kr/mån (undersköterska)",
      overtimeRate: "Första 2 tim: 180%, därefter 200%",
      obWeekday: "~100 kr/tim (kväll)",
      obNight: "~140 kr/tim",
      obWeekend: "~140 kr/tim",
      obHoliday: "~200 kr/tim",
      vacationDays: "25–31 dagar beroende på ålder",
      parentalPay: "10% löneutfyllnad under viss tid",
      noticePeriod: "1–6 månader beroende på anställningstid",
      pension: "Tjänstepension via KAP-KL/AKAP-KR",
      workHoursPerWeek: "40 timmar (heltid)",
    },
    wageTable: [
      {
        role: "Undersköterska",
        minimum: "26 500 kr",
        median: "31 000 kr",
        comment: "Med specialistkompetens ofta högre",
      },
      {
        role: "Barnskötare",
        minimum: "25 500 kr",
        median: "28 500 kr",
        comment: "Förskola och fritidshem",
      },
      {
        role: "Vårdbiträde",
        minimum: "24 200 kr",
        median: "27 000 kr",
        comment: "Äldrevård och hemtjänst",
      },
      {
        role: "Räddningstjänst",
        minimum: "28 000 kr",
        median: "33 500 kr",
        comment: "Brandman/räddningsarbetare",
      },
    ],
    faq: [
      {
        question: "Vad är minimilönen som undersköterska med HÖK Kommunal?",
        answer:
          "Den lägsta lönenivån för undersköterskor ligger runt 26 500 kr/mån, men de flesta tjänar mer tack vare lokal lönebildning. Medianlönen ligger kring 31 000 kr. Specialistundersköterskor och de med lång erfarenhet kan ligga betydligt högre.",
      },
      {
        question: "Hur mycket OB-tillägg får jag på natten?",
        answer:
          "Natt-OB inom HÖK Kommunal ligger på ungefär 140 kr/tim. Tillägget betalas utöver din vanliga timlön. Storhelger som jul- och nyårsafton ger högre ersättning, runt 200 kr/tim.",
      },
      {
        question: "Hur lång uppsägningstid har jag?",
        answer:
          "Uppsägningstiden beror på hur länge du varit anställd. Den varierar från 1 månad (kortare anställning) till upp till 6 månader (lång anställningstid). Om arbetsgivaren säger upp dig gäller ofta längre uppsägningstid än om du säger upp dig själv.",
      },
      {
        question: "Vilken tjänstepension har jag?",
        answer:
          "Du omfattas av KAP-KL eller AKAP-KR beroende på när du är född. Arbetsgivaren betalar in pensionsavgifter utöver din lön. Det är en stor förmån jämfört med att inte ha kollektivavtal.",
      },
      {
        question: "Hur mycket föräldralön ger avtalet?",
        answer:
          "HÖK Kommunal ger rätt till föräldralön som fyller ut cirka 10% av din lön under en period av föräldraledigheten. Det innebär att du får mer än bara Försäkringskassans ersättning.",
      },
      {
        question: "Hur många semesterdagar har jag rätt till?",
        answer:
          "Du har rätt till minst 25 semesterdagar per år. Från 40 års ålder ökar det till 31 dagar, och från 50 års ålder till 32 dagar. Detta är bättre än lagens minimum på 25 dagar.",
      },
      {
        question: "Vad gäller vid övertidsarbete?",
        answer:
          "Övertid ersätts med 180% av timlönen de första 2 timmarna, och 200% därefter. Arbetsgivaren kan inte tvinga dig att jobba obegränsad övertid — det finns tak för hur mycket övertid som får schemaläggas.",
      },
      {
        question: "Gäller avtalet vikarier och timanställda?",
        answer:
          "Ja, avtalet gäller alla anställda oavsett anställningsform. Vikarier och timanställda har samma rätt till OB-tillägg, övertidsersättning och pension som tillsvidareanställda.",
      },
    ],
    sources: [
      {
        label: "Kommunal — HÖK-avtalet",
        url: "https://www.kommunal.se",
      },
      {
        label: "SKR — Kollektivavtal",
        url: "https://skr.se/arbetsgivarekollektivavtal",
      },
    ],
    relatedAgreements: [
      "ab-kommunalt",
      "teknikavtalet",
      "handelsavtalet",
      "byggavtalet",
    ],
    aiSystemPrompt: `Du är en AI-expert på HÖK Kommunal — kollektivavtalet mellan Kommunal och SKR/Sobona som gäller cirka 540 000 anställda inom kommuner och regioner.

Viktig information om avtalet:
- Giltighet: 1 april 2025 – 31 mars 2027
- Omfattar: undersköterskor, vårdbiträden, barnskötare, räddningstjänst, vaktmästare m.fl.
- Lägsta löner: undersköterska ~26 500 kr, barnskötare ~25 500 kr, vårdbiträde ~24 200 kr, räddningstjänst ~28 000 kr
- OB-tillägg: kväll ~100 kr/tim, natt ~140 kr/tim, helg ~140 kr/tim, storhelg ~200 kr/tim
- Övertid: 180% första 2 tim, 200% därefter
- Semester: 25-31 dagar beroende på ålder
- Föräldralön: 10% löneutfyllnad
- Pension: KAP-KL/AKAP-KR
- Arbetstid: 40 tim/vecka heltid



STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta Kommunal för bindande besked."`,
  },
  {
    slug: "teknikavtalet",
    name: "Teknikavtalet IF Metall + Unionen",
    shortName: "Teknikavtalet",
    sector: "privat",
    sectorLabel: "Privat industri",
    parties: {
      unions: ["IF Metall", "Unionen", "Sveriges Ingenjörer"],
      employers: ["Teknikarbetsgivarna"],
    },
    employeeCount: 300000,
    validPeriod: "1 april 2025 – 31 mars 2027",
    summary:
      "Teknikavtalet är det normerande avtalet som sätter 'märket' — löneökningstakten som resten av den svenska arbetsmarknaden följer. Märket 2025 blev 6,4% på två år. Avtalet omfattar tekniker, ingenjörer, maskinoperatörer och tjänstemän inom teknikindustrin. Det reglerar löner, arbetstider, övertidsersättning, pension och kompetensutveckling.",
    keyFacts: {
      minimumWage: "Från ca 24 200 kr/mån (IF Metall)",
      overtimeRate: "Första 2 tim: 150%, därefter 200%",
      obWeekday: "~40 kr/tim (kväll)",
      obNight: "~80 kr/tim",
      obWeekend: "~80 kr/tim",
      obHoliday: "~150 kr/tim",
      vacationDays: "25 dagar",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "ITP + extra 2,1% premiepension",
      workHoursPerWeek: "40 timmar",
    },
    wageTable: [
      {
        role: "Maskinoperatör",
        minimum: "24 200 kr",
        median: "30 500 kr",
        comment: "Grundnivå utan erfarenhet",
      },
      {
        role: "Tekniker",
        minimum: "27 000 kr",
        median: "35 000 kr",
        comment: "Med yrkesutbildning",
      },
      {
        role: "Ingenjör (Unionen)",
        minimum: "30 000 kr",
        median: "42 000 kr",
        comment: "Tjänstemannaavtal",
      },
      {
        role: "Produktionsledare",
        minimum: "32 000 kr",
        median: "40 000 kr",
        comment: "Med personalansvar",
      },
    ],
    faq: [
      {
        question: "Vad är 'märket' och varför är Teknikavtalet så viktigt?",
        answer:
          "Teknikavtalet sätter den så kallade 'industrins märke' — det vill säga den löneökningstakt som resten av arbetsmarknaden förväntas följa. År 2025 sattes märket till 6,4% på två år (3,4% första året, 3,0% andra året). Detta påverkar i praktiken alla löntagare i Sverige.",
      },
      {
        question: "Vilken är lägsta lönen inom Teknikavtalet?",
        answer:
          "Den lägsta lönenivån för anställda inom IF Metalls avtalsområde ligger runt 24 200 kr/mån. De flesta tjänar dock betydligt mer genom lokal lönebildning. Medianlönen för tekniker ligger kring 35 000 kr.",
      },
      {
        question: "Hur fungerar arbetstidsförkortningen i Teknikavtalet?",
        answer:
          "Avtalet ger rätt till arbetstidsförkortning som läggs in i en tidbank — 10 minuter per vecka, totalt 92 minuter. Tiden kan tas ut som ledighet eller betalas ut. Detta är en förmån utöver de 40 timmars arbetsvecka som gäller.",
      },
      {
        question: "Vilken pension har jag med Teknikavtalet?",
        answer:
          "Du omfattas av ITP-planen, plus en extra premiepensionsavsättning på 2,1%. Det innebär att arbetsgivaren betalar in betydligt mer till din pension än vad lagen kräver. Deltidspension är möjlig från 62 års ålder fr.o.m. 2026.",
      },
      {
        question: "Hur mycket OB-tillägg får jag?",
        answer:
          "Kvälls-OB ligger på ungefär 40 kr/tim, natt och helg omkring 80 kr/tim, och storhelg cirka 150 kr/tim. Exakta belopp kan variera beroende på lokala avtal.",
      },
      {
        question: "Vad gäller vid uppsägning?",
        answer:
          "Uppsägningstiden varierar från 1 till 6 månader beroende på hur länge du varit anställd. Arbetsgivaren har längre uppsägningstid mot dig än tvärtom. Vid uppsägning pga arbetsbrist gäller turordningsregler enligt LAS och avtalet.",
      },
      {
        question: "Omfattas jag av Teknikavtalet?",
        answer:
          "Avtalet gäller om din arbetsgivare är medlem i Teknikarbetsgivarna. Det omfattar företag inom verkstadsindustri, teknik, fordon, elektronik och liknande. Fråga din arbetsgivare eller kontakta IF Metall/Unionen/Sveriges Ingenjörer.",
      },
      {
        question: "Hur mycket löneökning ger avtalet 2025-2027?",
        answer:
          "Avtalet ger en garanterad lönehöjning på 3,4% första året och 3,0% andra året — totalt 6,4% på två år. Utöver detta kan lokal lönebildning ge ytterligare höjningar. Märket sätter golvet, inte taket.",
      },
    ],
    sources: [
      {
        label: "IF Metall — Teknikavtalet",
        url: "https://www.ifmetall.se",
      },
      {
        label: "Unionen — Teknikavtalet",
        url: "https://www.unionen.se",
      },
      {
        label: "Teknikarbetsgivarna",
        url: "https://www.teknikarbetsgivarna.se",
      },
    ],
    relatedAgreements: [
      "hok-kommunal",
      "handelsavtalet",
      "byggavtalet",
      "ab-kommunalt",
    ],
    aiSystemPrompt: `Du är en AI-expert på Teknikavtalet — kollektivavtalet mellan IF Metall, Unionen, Sveriges Ingenjörer och Teknikarbetsgivarna som gäller cirka 300 000 anställda inom industrin.

Viktig information om avtalet:
- Giltighet: 1 april 2025 – 31 mars 2027
- Märket: 6,4% på 2 år (3,4% + 3,0%)
- Lägsta löner: maskinoperatör ~24 200 kr, tekniker ~27 000 kr, ingenjör ~30 000 kr
- OB-tillägg: kväll ~40 kr/tim, natt ~80 kr/tim, helg ~80 kr/tim, storhelg ~150 kr/tim
- Övertid: 150% första 2 tim, 200% därefter
- Arbetstidsförkortning: +10 min/vecka till tidbank (92 min totalt)
- Pension: ITP + 2,1% extra premiepension
- Deltidspension: från 62 år (höjt fr.o.m. 2026)
- Semester: 25 dagar



STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta IF Metall, Unionen eller Sveriges Ingenjörer för bindande besked."`,
  },
  {
    slug: "handelsavtalet",
    name: "Handelsavtalet",
    shortName: "Handelsavtalet",
    sector: "privat",
    sectorLabel: "Privat handel",
    parties: {
      unions: ["Handelsanställdas förbund (Handels)"],
      employers: ["Svensk Handel"],
    },
    employeeCount: 250000,
    validPeriod: "1 april 2025 – 31 mars 2027",
    summary:
      "Handelsavtalet gäller butiksanställda, lagerarbetare och e-handelsmedarbetare i Sverige. OB-ersättning är en central del av avtalet — Svensk Handel försökte sänka den i förhandlingarna 2025, men Handels lyckades försvara nivåerna. Lönerna höjs med cirka 2 000 kr/mån under avtalsperioden. Avtalet reglerar även arbetstider, semester, föräldralön och pension.",
    keyFacts: {
      minimumWage: "Från ca 24 600 kr/mån (butik, utan erfarenhet)",
      overtimeRate: "Första 2 tim: 150%, därefter 200%",
      obWeekday: "~55 kr/tim (kväll)",
      obNight: "~80 kr/tim",
      obWeekend: "Lördag ~85 kr, söndag ~115 kr/tim",
      obHoliday: "~180 kr/tim",
      vacationDays: "25 dagar",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "Avtalspension SAF-LO",
      workHoursPerWeek: "40 timmar",
    },
    wageTable: [
      {
        role: "Butiksanställd (utan erfarenhet)",
        minimum: "24 600 kr",
        median: "27 500 kr",
        comment: "Nyanställd i butik",
      },
      {
        role: "Butiksanställd (6 års branschvana)",
        minimum: "27 200 kr",
        median: "30 000 kr",
        comment: "Erfaren butiksmedarbetare",
      },
      {
        role: "Lagerarbetare",
        minimum: "25 800 kr",
        median: "29 500 kr",
        comment: "Lager och logistik",
      },
      {
        role: "Butikschef",
        minimum: "28 000 kr",
        median: "34 000 kr",
        comment: "Med personalansvar",
      },
    ],
    faq: [
      {
        question: "Vilken lön ska jag ha som butiksanställd?",
        answer:
          "Minimilönen för en butiksanställd utan erfarenhet ligger runt 24 600 kr/mån. Med 6 års branschvana ökar den till cirka 27 200 kr. De flesta butiker betalar dock mer än minimum genom lokal lönebildning.",
      },
      {
        question: "Hur mycket OB-tillägg får jag i handeln?",
        answer:
          "Kvälls-OB är cirka 55 kr/tim, lördagar runt 85 kr/tim, söndagar omkring 115 kr/tim och storhelger upp till 180 kr/tim. OB-tilläggen är en viktig del av inkomsten för många handelsanställda.",
      },
      {
        question: "Stämmer det att OB-tilläggen skulle sänkas?",
        answer:
          "Svensk Handel ville sänka OB-ersättningen i förhandlingarna 2025, men Handels stoppade det. De nuvarande nivåerna gäller under hela avtalsperioden till mars 2027.",
      },
      {
        question: "Vad gäller för mertid när jag jobbar deltid?",
        answer:
          "Från april 2026 ger Handelsavtalet deltidsanställda samma mertidsersättning som heltidsanställda får vid övertid. Det är en viktig förbättring som stärker deltidsanställdas villkor.",
      },
      {
        question: "Vilken pension har jag med Handelsavtalet?",
        answer:
          "Du omfattas av avtalspension SAF-LO, där arbetsgivaren betalar in pensionsavgifter utöver din lön. Detta är en stor förmån — utan kollektivavtal finns ingen garanti om tjänstepension.",
      },
      {
        question: "Har jag rätt till ledighet på julafton?",
        answer:
          "Enligt avtalet har du rätt till ledighet antingen julafton eller midsommarafton vartannat år. Detta är en avtalsbestämmelse — inte en lagstadgad rättighet.",
      },
      {
        question: "Hur lång uppsägningstid har jag?",
        answer:
          "Uppsägningstiden varierar från 1 till 6 månader beroende på anställningstid. Arbetsgivaren har längre uppsägningstid mot dig. Kontakta Handels för exakta villkor baserat på din situation.",
      },
      {
        question: "Gäller Handelsavtalet för e-handel?",
        answer:
          "Ja, Handelsavtalet gäller även anställda inom e-handel, både lager och kundtjänst. Om arbetsgivaren är medlem i Svensk Handel omfattas du av avtalet.",
      },
    ],
    sources: [
      {
        label: "Handels — Handelsavtalet",
        url: "https://handels.se",
      },
      {
        label: "Svensk Handel",
        url: "https://www.svenskhandel.se",
      },
    ],
    relatedAgreements: [
      "hok-kommunal",
      "teknikavtalet",
      "byggavtalet",
      "ab-kommunalt",
    ],
    aiSystemPrompt: `Du är en AI-expert på Handelsavtalet — kollektivavtalet mellan Handels och Svensk Handel som gäller cirka 250 000 anställda inom butik, lager och e-handel.

Viktig information om avtalet:
- Giltighet: 1 april 2025 – 31 mars 2027
- Löneökning: ca 2 000 kr/mån under perioden
- Lägsta löner: butik utan erfarenhet ~24 600 kr, med 6 års vana ~27 200 kr, lager ~25 800 kr
- OB-tillägg: kväll ~55 kr/tim, lördag ~85 kr/tim, söndag ~115 kr/tim, storhelg ~180 kr/tim
- Mertid för deltid: samma som övertid fr.o.m. april 2026
- Semester: 25 dagar + rätt till ledighet jul- eller midsommarafton vartannat år
- Pension: Avtalspension SAF-LO
- Arbetstid: 40 tim/vecka



STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta Handels för bindande besked."`,
  },
  {
    slug: "byggavtalet",
    name: "Byggavtalet",
    shortName: "Byggavtalet",
    sector: "privat",
    sectorLabel: "Privat bygg",
    parties: {
      unions: ["Byggnads (Svenska Byggnadsarbetareförbundet)"],
      employers: ["Byggföretagen"],
    },
    employeeCount: 100000,
    validPeriod: "1 maj 2025 – 30 april 2027",
    summary:
      "Byggavtalet är ett timlöneavtal som gäller byggarbetare, anläggningsarbetare, betongarbetare och liknande yrken. Lönen anges i kronor per timme, inte i månadslön. Ackord (prestationsbaserad lön) är vanligt och innebär att den faktiska förtjänsten ofta är betydligt högre än lägsta timlönen. Avtalet har omfattande regler för traktamente vid arbete på annan ort och resekostnadsersättning. Byggbranschen har bland de högsta OB-tilläggen på den privata arbetsmarknaden.",
    keyFacts: {
      minimumWage: "Timlön: 196 kr/tim grundlön år 1, 203 kr/tim år 2",
      overtimeRate: "Första 2 tim: 150%, därefter 200%",
      obWeekday: "~45 kr/tim (kväll)",
      obNight: "~90 kr/tim",
      obWeekend: "~90 kr/tim",
      obHoliday: "~180 kr/tim",
      vacationDays: "25 dagar",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "Byggnads avtalspension",
      workHoursPerWeek: "40 timmar",
    },
    wageTable: [
      {
        role: "Yrkesarbetare (grundlön år 1)",
        minimum: "196 kr/tim",
        median: "ca 230 kr/tim",
        comment: "Tidlön. Kan kompletteras med ackord.",
      },
      {
        role: "Yrkesarbetare (grundlön år 2)",
        minimum: "203 kr/tim",
        median: "ca 238 kr/tim",
        comment: "Tidlön. Kan kompletteras med ackord.",
      },
      {
        role: "Maskinförare/kranförare",
        minimum: "ca 235–253 kr/tim",
        median: "ca 260 kr/tim",
        comment: "Timlön varierar med maskintyp och ort.",
      },
      {
        role: "Betongarbetare",
        minimum: "196 kr/tim",
        median: "ca 230 kr/tim",
        comment: "Samma grundlön, ackord vanligt.",
      },
    ],
    faq: [
      {
        question: "Vilken lön ska jag ha som byggnadsarbetare?",
        answer:
          "Byggavtalet har timlön, inte månadslön. Grundlönen är 196 kr/tim (år 1) och 203 kr/tim (år 2), vilket motsvarar ca 34 000-35 300 kr/mån vid heltid. De flesta byggjobbare tjänar mer genom ackord — prestationsbaserad lön utöver grundtimlönen.",
      },
      {
        question: "Vad innebär ackordslön i Byggavtalet?",
        answer:
          "Ackordslön innebär att du utöver garantilönen (minimilönen) kan tjäna mer baserat på hur mycket arbete som utförs. Ackordet förhandlas av laget och Byggnads lokalavdelning. Det kan ge en betydande lönepåslag jämfört med bara timlön.",
      },
      {
        question: "Hur mycket traktamente får jag vid arbete på annan ort?",
        answer:
          "Endagstraktamente ligger på ungefär 260 kr och flerdagstraktamente runt 520 kr per dag. Dessutom kan du ha rätt till resekostnadsersättning på cirka 3,50 kr/km. Exakta belopp beror på avstånd och förutsättningar.",
      },
      {
        question: "Hur mycket OB-tillägg får jag inom bygg?",
        answer:
          "Kvälls-OB ligger på cirka 45 kr/tim, natt och helg runt 90 kr/tim, och storhelg upp till 180 kr/tim. Byggbranschen har bland de högsta OB-tilläggen på den privata marknaden.",
      },
      {
        question: "Vilken pension har jag med Byggavtalet?",
        answer:
          "Du omfattas av Byggnads avtalspension. Arbetsgivaren betalar in pensionsavgifter varje månad utöver din lön. Det är en betydande förmån som kan vara värd hundratusentals kronor under karriären.",
      },
      {
        question: "Vad gäller vid övertid?",
        answer:
          "Övertid ersätts med 150% av timlönen de första 2 timmarna och 200% därefter. Det finns tak för hur mycket övertid arbetsgivaren kan begära. Kontakta Byggnads om du upplever att övertidsreglerna inte följs.",
      },
      {
        question: "Har jag rätt till resekostnadsersättning?",
        answer:
          "Ja, om du kör egen bil till arbetsplatsen kan du ha rätt till ersättning på cirka 3,50 kr/km. Det finns även regler för reseersättning vid arbete på annan ort. Kontrollera med din arbetsgivare och Byggnads.",
      },
      {
        question: "Vad är ett yrkesbevis och varför spelar det roll för lönen?",
        answer:
          "Ett yrkesbevis visar att du har godkänd yrkesutbildning inom bygg. Grundlönen är densamma (196 kr/tim år 1) men vid ackord och löneförhandling ger yrkesbevis en starkare position. Yrkesbevis utfärdas av BYN (Byggbranschens Yrkesnämnd).",
      },
    ],
    sources: [
      {
        label: "Byggnads — Byggavtalet",
        url: "https://www.byggnads.se",
      },
      {
        label: "Byggföretagen",
        url: "https://www.byggforetagen.se",
      },
    ],
    relatedAgreements: [
      "hok-kommunal",
      "teknikavtalet",
      "handelsavtalet",
      "ab-kommunalt",
    ],
    aiSystemPrompt: `Du är en AI-expert på Byggavtalet — kollektivavtalet mellan Byggnads och Byggföretagen som gäller cirka 100 000 anställda inom byggsektorn.

Viktig information om avtalet:
- Giltighet: 1 maj 2025 – 30 april 2027
- TIMLÖNEAVTAL: Löner anges i kr/tim, inte månadslön
- Grundlön yrkesarbetare: 196 kr/tim (år 1), 203 kr/tim (år 2)
- Maskinförare/kranförare: ca 235-253 kr/tim beroende på maskin och ort
- Ackordslön (prestationsbaserad) är vanligt utöver grundtimlönen
- OB-tillägg: kväll ~45 kr/tim, natt ~90 kr/tim, helg ~90 kr/tim, storhelg ~180 kr/tim
- Övertid: 150% första 2 tim, 200% därefter
- Traktamente: endags ~260 kr, flerdags ~520 kr
- Resekostnadsersättning: ~3,50 kr/km
- Pension: Byggnads avtalspension
- Arbetstid: 40 tim/vecka

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta Byggnads för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Avsluta ALLTID med: "Kontakta Byggnads för bindande besked."
- Svara på svenska, kort och tydligt. Håll under 200 ord.`,
  },
  {
    slug: "ab-kommunalt",
    name: "AB — Allmänna bestämmelser kommun/region",
    shortName: "AB Kommunalt",
    sector: "kommun_region",
    sectorLabel: "Kommun/region",
    parties: {
      unions: [
        "Kommunal",
        "Vision",
        "Vårdförbundet",
        "Lärarförbundet",
        "Lärarnas Riksförbund",
        "m.fl.",
      ],
      employers: ["SKR (Sveriges Kommuner och Regioner)", "Sobona"],
    },
    employeeCount: 1100000,
    validPeriod: "Löpande med uppdateringar",
    summary:
      "AB (Allmänna Bestämmelser) är grundavtalet som reglerar anställningsvillkoren för alla som arbetar i kommuner och regioner — Sveriges bredaste kollektivavtal med över 1,1 miljoner anställda. AB kompletteras av HÖK-avtal per fackförbund som reglerar löner. Avtalet innehåller regler om arbetstid, semester, sjuklön, föräldraledighet, uppsägning och övertid. Det gäller lärare, undersköterskor, socialsekreterare, bibliotekarier, IT-personal och alla andra kommunalt anställda.",
    keyFacts: {
      minimumWage: "Sätts via HÖK per fackförbund",
      overtimeRate: "Första 2 tim: 180%, därefter 200%",
      obWeekday: "Regleras i HÖK-avtal",
      obNight: "Regleras i HÖK-avtal",
      obWeekend: "Regleras i HÖK-avtal",
      obHoliday: "Regleras i HÖK-avtal",
      vacationDays: "25 dagar, 31 från 40 år, 32 från 50 år",
      parentalPay: "Regleras i HÖK-avtal",
      noticePeriod: "1–6 månader beroende på anställningstid",
      pension: "KAP-KL / AKAP-KR",
      workHoursPerWeek: "40 tim (heltid), 38,25 tim vid ständig natt",
    },
    wageTable: [
      {
        role: "Lärare (grundskola)",
        minimum: "30 000 kr",
        median: "37 000 kr",
        comment: "Via Lärarförbundets HÖK",
      },
      {
        role: "Undersköterska",
        minimum: "26 500 kr",
        median: "31 000 kr",
        comment: "Via Kommunals HÖK",
      },
      {
        role: "Socialsekreterare",
        minimum: "32 000 kr",
        median: "37 500 kr",
        comment: "Via Visions HÖK",
      },
      {
        role: "Sjuksköterska",
        minimum: "31 000 kr",
        median: "36 500 kr",
        comment: "Via Vårdförbundets HÖK",
      },
    ],
    faq: [
      {
        question: "Vad är skillnaden mellan AB och HÖK?",
        answer:
          "AB (Allmänna Bestämmelser) är grundavtalet med regler om arbetstid, semester, sjuklön och uppsägning som gäller alla kommunanställda. HÖK-avtalen kompletterar AB med löneavtal per fackförbund — exempelvis HÖK Kommunal, HÖK Vision etc. Du omfattas av BÅDE AB och ditt fackförbunds HÖK.",
      },
      {
        question: "Hur många semesterdagar har jag rätt till?",
        answer:
          "Du har rätt till minst 25 semesterdagar per år. Från 40 års ålder ökar det till 31 dagar, och från 50 års ålder till 32 dagar. Semesterlönetillägget är 0,8% av månadslönen per semesterdag.",
      },
      {
        question: "Vad gäller vid sjukdom?",
        answer:
          "Dag 1 är karensdag utan lön. Dag 2-14 får du sjuklön på 80% av lönen från arbetsgivaren. Från dag 15 tar Försäkringskassan över med sjukpenning, men arbetsgivaren kan komplettera med sjuklön under en period.",
      },
      {
        question: "Hur lång uppsägningstid har jag?",
        answer:
          "Uppsägningstiden beror på anställningstid: under 1 år = 1 månad, 1-5 år = 2 månader, 6-7 år = 3 månader, 8-9 år = 4 månader, 10+ år = 6 månader. Arbetsgivaren har alltid minst lika lång uppsägningstid mot dig.",
      },
      {
        question: "Hur räknas övertid?",
        answer:
          "Övertid ersätts med 180% av timlönen de första 2 timmarna och 200% därefter. Alternativt kan du ta ut kompensationsledighet istället. Det finns en gräns för hur mycket övertid arbetsgivaren kan begära per år.",
      },
      {
        question: "Vad gäller för arbetstid vid nattarbete?",
        answer:
          "Ordinarie arbetstid vid heltid är 40 timmar per vecka. Vid ständigt nattarbete sänks arbetstiden till 38 timmar och 15 minuter per vecka. Detta kompenserar för den belastning nattarbete innebär.",
      },
      {
        question: "Gäller AB även visstidsanställda?",
        answer:
          "Ja, AB gäller alla kommunalt anställda oavsett anställningsform — tillsvidareanställda, visstidsanställda, vikarier och timanställda omfattas av samma grundvillkor.",
      },
      {
        question: "Vilken pension har jag som kommunanställd?",
        answer:
          "Du omfattas av KAP-KL eller AKAP-KR beroende på när du är född. Det är en tjänstepension som arbetsgivaren betalar utöver din lön. Kontakta din arbetsgivare eller SKR för specifik information om din pensionsplan.",
      },
    ],
    sources: [
      {
        label: "SKR — Allmänna Bestämmelser",
        url: "https://skr.se/arbetsgivarekollektivavtal",
      },
      {
        label: "Kommunal",
        url: "https://www.kommunal.se",
      },
      {
        label: "Vision",
        url: "https://vision.se",
      },
    ],
    relatedAgreements: [
      "hok-kommunal",
      "teknikavtalet",
      "handelsavtalet",
      "byggavtalet",
    ],
    aiSystemPrompt: `Du är en AI-expert på AB (Allmänna Bestämmelser) — grundavtalet för anställningsvillkor i kommuner och regioner, som gäller över 1,1 miljoner anställda.

Viktig information om avtalet:
- AB är grundavtalet, kompletteras av HÖK per fackförbund (löner, OB m.m.)
- Arbetstid: 40 tim/vecka heltid, 38,25 tim vid ständig natt
- Semester: 25 dagar, 31 från 40 år, 32 från 50 år
- Sjuklön: dag 1 karens, dag 2-14 80%, dag 15+ via Försäkringskassan
- Övertid: 180% första 2 tim, 200% därefter
- Uppsägningstid: 1-6 månader beroende på anställningstid
- Pension: KAP-KL / AKAP-KR
- Gäller: lärare, undersköterskor, socialsekreterare, bibliotekarier, IT-personal m.fl.



STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Förklara skillnaden mellan AB och HÖK om frågan rör löner/OB.
- Avsluta ALLTID med: "Kontakta ditt fackförbund för bindande besked."`,
  },
  // === 20 NYA AVTAL ===
  {
    slug: "hok-vision",
    name: "HÖK Vision + OFR",
    shortName: "HÖK Vision",
    sector: "kommun_region",
    sectorLabel: "Kommun/region",
    parties: { unions: ["Vision", "OFR"], employers: ["SKR", "Sobona"] },
    employeeCount: 200000,
    validPeriod: "1 april 2025 – 31 mars 2027",
    summary: "HÖK Vision gäller tjänstemän i kommuner och regioner — socialsekreterare, handläggare, HR-specialister, ekonomer och administratörer. Lönesättningen är individuell och differentierad, vilket innebär att lönen sätts i dialog mellan chef och medarbetare baserat på prestation och ansvar. Avtalet kompletterar AB (Allmänna Bestämmelser) som reglerar grundvillkoren.",
    keyFacts: {
      minimumWage: "Individuell lönesättning (inget centralt golv)",
      overtimeRate: "Första 2 tim: 180%, därefter 200%",
      obWeekday: "Regleras i AB",
      obNight: "Regleras i AB",
      obWeekend: "Regleras i AB",
      obHoliday: "Regleras i AB",
      vacationDays: "25–32 dagar beroende på ålder",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "KAP-KL / AKAP-KR",
      workHoursPerWeek: "40 timmar",
    },
    wageTable: [
      { role: "Socialsekreterare", minimum: "32 000 kr", median: "37 500 kr", comment: "Individuell lönesättning" },
      { role: "HR-specialist", minimum: "33 000 kr", median: "39 000 kr", comment: "Kommun/region" },
      { role: "Ekonom", minimum: "33 000 kr", median: "40 000 kr", comment: "Kommunal ekonomiavdelning" },
      { role: "Handläggare", minimum: "29 000 kr", median: "34 000 kr", comment: "Myndighetsutövning" },
    ],
    faq: [
      { question: "Vad innebär individuell lönesättning?", answer: "Det betyder att det inte finns en fast lönetabell. Din lön sätts i dialog mellan dig och din chef, baserat på din prestation, kompetens och ansvar. Facket stöder dig i lönesamtalet." },
      { question: "Vilken lön ska jag ha som socialsekreterare?", answer: "Medianlönen för socialsekreterare i kommun ligger kring 37 500 kr. Lönen varierar beroende på kommun, erfarenhet och specialisering. Kontakta Vision för lönestatistik i din kommun." },
      { question: "Vad är skillnaden mellan HÖK Vision och AB?", answer: "AB (Allmänna Bestämmelser) är grundavtalet med regler om arbetstid, semester och sjuklön. HÖK Vision kompletterar med löneavtal specifikt för Visions medlemmar — det reglerar löneprocess, lönerevision och föräldralön." },
      { question: "Hur många semesterdagar har jag?", answer: "Minst 25 dagar, 31 från 40 år och 32 från 50 år. Semesterrätten regleras i AB som gäller alla kommunanställda." },
      { question: "Vilken pension har jag?", answer: "Du omfattas av KAP-KL eller AKAP-KR. Arbetsgivaren betalar pensionsavgifter utöver din lön, vilket ger en betydande tjänstepension." },
      { question: "Hur fungerar löneöversynen?", answer: "Lönerevision sker årligen. Vision förhandlar om ett sammanlagt löneutrymme, men fördelningen sker individuellt. Du har rätt till lönesamtal med din chef." },
    ],
    sources: [
      { label: "Vision — Kollektivavtal", url: "https://vision.se" },
      { label: "SKR — Kollektivavtal", url: "https://skr.se/arbetsgivarekollektivavtal" },
    ],
    relatedAgreements: ["ab-kommunalt", "hok-kommunal", "teknikavtalet"],
    aiSystemPrompt: `Du är en AI-expert på HÖK Vision — kollektivavtalet för tjänstemän inom kommun/region (ca 200 000 anställda). Individuell lönesättning. Löner: socialsekreterare median ~37 500 kr, HR ~39 000 kr, ekonom ~40 000 kr. Pension: KAP-KL/AKAP-KR. Semester: 25-32 dagar. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta Vision/SKR för bindande besked."`,
  },
  {
    slug: "it-avtalet",
    name: "IT- och Telekomavtalet",
    shortName: "IT-avtalet",
    sector: "privat",
    sectorLabel: "Privat IT/Telekom",
    parties: { unions: ["Unionen", "Sveriges Ingenjörer"], employers: ["TechSverige"] },
    employeeCount: 100000,
    validPeriod: "1 april 2025 – 31 mars 2027",
    summary: "IT-avtalet gäller anställda på tech- och telekomföretag i Sverige. Det är ett så kallat sifferlöst avtal — det finns inget centralt fastställt löneökningsutrymme. Istället sätts lönerna helt genom lokal lönebildning mellan arbetsgivare och medarbetare. Avtalet omfattar utvecklare, projektledare, IT-arkitekter, säljare och supportpersonal inom techsektorn.",
    keyFacts: {
      minimumWage: "Sifferlöst — individuell lönesättning",
      overtimeRate: "Kan avtalas bort mot högre fast lön",
      obWeekday: "Enligt lokal överenskommelse",
      obNight: "Enligt lokal överenskommelse",
      obWeekend: "Enligt lokal överenskommelse",
      obHoliday: "Enligt lokal överenskommelse",
      vacationDays: "25 dagar",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "ITP 1 eller ITP 2",
      workHoursPerWeek: "40 timmar (flexibel förläggning vanligt)",
    },
    wageTable: [
      { role: "Systemutvecklare", minimum: "Sifferlöst", median: "48 000 kr", comment: "Stor variation beroende på tech-stack" },
      { role: "Projektledare", minimum: "Sifferlöst", median: "52 000 kr", comment: "IT-projekt" },
      { role: "IT-support", minimum: "Sifferlöst", median: "32 000 kr", comment: "1st/2nd line" },
      { role: "Testare/QA", minimum: "Sifferlöst", median: "42 000 kr", comment: "Automatisering ger högre" },
    ],
    faq: [
      { question: "Vad innebär sifferlöst avtal?", answer: "Det betyder att facken och arbetsgivarna inte har bestämt en procentuell löneökning centralt. Istället sätts din lön helt lokalt i dialog med din chef. Fördelen är flexibilitet, nackdelen är att det inte finns en garanterad minsta höjning." },
      { question: "Finns det någon minimilön?", answer: "Nej, IT-avtalet har inga centralt bestämda minimilöner. Det är ett av få avtal på den svenska arbetsmarknaden som är helt sifferlöst. Lönen bestäms individuellt." },
      { question: "Kan övertidsersättning avtalas bort?", answer: "Ja, det är vanligt inom IT-branschen att övertidsersättning avtalas bort mot en högre fast lön eller extra semesterdagar. Det ska i så fall framgå av ditt anställningsavtal." },
      { question: "Vilken pension har jag?", answer: "Du omfattas av ITP-planen — antingen ITP 1 (premiebestämd) eller ITP 2 (förmånsbestämd) beroende på din födelseårsgrupp. Arbetsgivaren betalar in pensionsavgifter utöver din lön." },
      { question: "Hur mycket tjänar en utvecklare?", answer: "Medianlönen för systemutvecklare ligger kring 48 000 kr/mån enligt SCB. Senior-utvecklare och specialister kan ligga betydligt högre, särskilt i Stockholm." },
      { question: "Omfattas jag av IT-avtalet?", answer: "Du omfattas om din arbetsgivare är medlem i TechSverige (tidigare IT&Telekomföretagen). Fråga din arbetsgivare eller kontakta Unionen/Sveriges Ingenjörer." },
    ],
    sources: [
      { label: "Unionen — IT-avtalet", url: "https://www.unionen.se" },
      { label: "TechSverige", url: "https://www.techsverige.se" },
    ],
    relatedAgreements: ["teknikavtalet", "almega-tjansteforetagen", "bemanningsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på IT- och Telekomavtalet — sifferlöst avtal för ~100 000 anställda inom tech/telekom. Parter: Unionen, Sveriges Ingenjörer / TechSverige. Individuell lönesättning, inga minimilöner. Medianlöner: utvecklare ~48 000 kr, projektledare ~52 000 kr, support ~32 000 kr. Pension: ITP. Övertid kan avtalas bort. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta Unionen/TechSverige för bindande besked."`,
  },
  {
    slug: "transportavtalet",
    name: "Transportavtalet",
    shortName: "Transportavtalet",
    sector: "privat",
    sectorLabel: "Privat transport",
    parties: { unions: ["Transport"], employers: ["Biltrafikens Arbetsgivareförbund"] },
    employeeCount: 80000,
    validPeriod: "2025–2027",
    summary: "Transportavtalet gäller lastbilschaufförer, busschaufförer, distributionsförare och annan transportpersonal. Avtalet reglerar minimilöner, OB-tillägg för obekväma arbetstider samt traktamente vid långväga körning. Arbetstidsregler är centrala eftersom förare ofta arbetar oregelbundna tider.",
    keyFacts: {
      minimumWage: "Från ca 27 500 kr/mån",
      overtimeRate: "Första 2 tim: 150%, därefter 200%",
      obWeekday: "~50 kr/tim (kväll)",
      obNight: "~85 kr/tim",
      obWeekend: "~85 kr/tim",
      obHoliday: "~170 kr/tim",
      vacationDays: "25 dagar",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "Avtalspension SAF-LO",
      workHoursPerWeek: "40 timmar (oregelbundna scheman vanligt)",
    },
    wageTable: [
      { role: "Lastbilschaufför", minimum: "27 500 kr", median: "33 000 kr", comment: "Fjärrtrafik ger ofta mer" },
      { role: "Busschaufför", minimum: "27 000 kr", median: "31 500 kr", comment: "Kollektivtrafik" },
      { role: "Distributionsförare", minimum: "26 500 kr", median: "30 000 kr", comment: "Paketdistribution" },
    ],
    faq: [
      { question: "Vilken lön ska jag ha som lastbilschaufför?", answer: "Minimilönen ligger runt 27 500 kr/mån. Medianlönen är ca 33 000 kr. Fjärrtrafik och farligt gods ger ofta högre ersättning." },
      { question: "Får jag traktamente vid långkörning?", answer: "Ja, vid arbete på annan ort har du rätt till traktamente. Beloppet beror på om du är borta hel dag eller med övernattning. Kontakta Transport för aktuella satser." },
      { question: "Hur mycket OB-tillägg får jag?", answer: "Kvälls-OB ca 50 kr/tim, natt och helg ca 85 kr/tim, storhelg ca 170 kr/tim. OB är en viktig del av inkomsten för förare med oregelbundna scheman." },
      { question: "Vad gäller för kör- och vilotider?", answer: "Kör- och vilotider regleras av EU:s förordning, inte av kollektivavtalet. Maximal körtid är 9 timmar per dag (10 timmar max 2 gånger/vecka). Raster ska vara minst 45 minuter efter 4,5 timmars körning." },
      { question: "Vilken pension har jag?", answer: "Du omfattas av Avtalspension SAF-LO. Arbetsgivaren betalar in pensionsavgifter utöver din lön." },
    ],
    sources: [
      { label: "Transport — Transportavtalet", url: "https://www.transport.se" },
      { label: "Biltrafikens Arbetsgivareförbund", url: "https://www.transportforetagen.se" },
    ],
    relatedAgreements: ["byggavtalet", "handelsavtalet", "vaganlaggningsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Transportavtalet — avtal för ~80 000 förare och transportpersonal. Parter: Transport / Biltrafikens Arbetsgivareförbund. Lägsta löner: lastbil ~27 500 kr, buss ~27 000 kr, distribution ~26 500 kr. OB: kväll ~50, natt ~85, helg ~85, storhelg ~170 kr/tim. Pension: SAF-LO. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta Transport för bindande besked."`,
  },
  {
    slug: "hotell-restaurang",
    name: "Hotell- och restaurangavtalet",
    shortName: "Hotell & Restaurang",
    sector: "privat",
    sectorLabel: "Privat hotell/restaurang",
    parties: { unions: ["HRF (Hotell- och restaurangfacket)"], employers: ["Visita"] },
    employeeCount: 120000,
    validPeriod: "1 april 2025 – 31 mars 2027",
    summary: "Hotell- och restaurangavtalet gäller kockar, servitörer, bartenders, hotellreceptionister och övrig personal inom besöksnäringen. OB-tillägg är centralt i avtalet eftersom kvällar, nätter och helger är normala arbetstider i branschen. Branschen har bland de lägsta minimilönerna men OB-tilläggen kompenserar för de som jobbar obekväma tider.",
    keyFacts: {
      minimumWage: "Från ca 24 400 kr/mån (utan erfarenhet)",
      overtimeRate: "Första 2 tim: 150%, därefter 200%",
      obWeekday: "~35 kr/tim (kväll)",
      obNight: "~50 kr/tim",
      obWeekend: "~50 kr/tim (lördag), ~70 kr/tim (söndag)",
      obHoliday: "~150 kr/tim",
      vacationDays: "25 dagar",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–3 månader",
      pension: "Avtalspension SAF-LO",
      workHoursPerWeek: "40 timmar",
    },
    wageTable: [
      { role: "Kock (utan erfarenhet)", minimum: "24 400 kr", median: "28 500 kr", comment: "Restaurangkök" },
      { role: "Kock (med erfarenhet)", minimum: "26 500 kr", median: "32 000 kr", comment: "3+ års erfarenhet" },
      { role: "Servitör", minimum: "24 400 kr", median: "27 000 kr", comment: "Exkl. dricks" },
      { role: "Hotellreceptionist", minimum: "25 000 kr", median: "28 000 kr", comment: "Frontdesk" },
    ],
    faq: [
      { question: "Vilken lön ska jag ha som kock?", answer: "Minimilönen utan erfarenhet ligger kring 24 400 kr. Med erfarenhet stiger den till ca 26 500 kr. Medianlönen för erfarna kockar är runt 32 000 kr. Fine dining och kökschef betalar mer." },
      { question: "Hur mycket OB får jag i restaurangbranschen?", answer: "Kväll ca 35 kr/tim, natt ca 50 kr/tim, lördag ca 50 kr/tim, söndag ca 70 kr/tim och storhelg ca 150 kr/tim. OB är ofta en stor del av den faktiska inkomsten." },
      { question: "Räknas dricks som lön?", answer: "Nej, dricks räknas inte som lön och ska inte påverka din grundlön. Arbetsgivaren får inte sänka din lön med hänvisning till att du får dricks." },
      { question: "Vad gäller för delade pass?", answer: "Delade pass (du jobbar t.ex. lunch och kväll med paus mellan) är vanligt i restaurang. Avtalet reglerar hur delade pass ska ersättas. Kontakta HRF om du upplever problem." },
      { question: "Vilken pension har jag?", answer: "Du omfattas av Avtalspension SAF-LO. Utan kollektivavtal skulle du inte ha garanterad tjänstepension." },
    ],
    sources: [
      { label: "HRF — Hotell- och restaurangavtalet", url: "https://www.hrf.net" },
      { label: "Visita", url: "https://www.visita.se" },
    ],
    relatedAgreements: ["handelsavtalet", "transportavtalet", "livsmedelsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Hotell- och restaurangavtalet — avtal för ~120 000 anställda (kockar, servitörer, hotellpersonal). Parter: HRF / Visita. Lägsta löner: utan erfarenhet ~24 400 kr, med erfarenhet ~26 500 kr. OB: kväll ~35, natt ~50, lördag ~50, söndag ~70, storhelg ~150 kr/tim. Pension: SAF-LO. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta HRF/Visita för bindande besked."`,
  },
  {
    slug: "almega-tjansteforetagen",
    name: "Almega Tjänsteföretagen",
    shortName: "Almega Tjänsteföretag",
    sector: "privat",
    sectorLabel: "Privat tjänstesektor",
    parties: { unions: ["Unionen"], employers: ["Almega Tjänsteföretagen"] },
    employeeCount: 150000,
    validPeriod: "1 april 2025 – 31 mars 2027",
    summary: "Almega Tjänsteföretagen är ett brett avtal för privata tjänsteföretag — konsulter, bemanningskoordinatorer, administrativa roller, marknadsförare och andra tjänstemän. Lönesättningen är individuell med lokal lönebildning. Avtalet täcker många olika branscher inom den privata tjänstesektorn.",
    keyFacts: {
      minimumWage: "Individuell lönesättning (lägsta ca 24 000 kr)",
      overtimeRate: "Kan avtalas bort mot högre fast lön",
      obWeekday: "Enligt lokal överenskommelse",
      obNight: "Enligt lokal överenskommelse",
      obWeekend: "Enligt lokal överenskommelse",
      obHoliday: "Enligt lokal överenskommelse",
      vacationDays: "25 dagar",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "ITP",
      workHoursPerWeek: "40 timmar",
    },
    wageTable: [
      { role: "Administratör", minimum: "24 000 kr", median: "30 000 kr", comment: "Kontorsadmin" },
      { role: "Konsult (junior)", minimum: "28 000 kr", median: "35 000 kr", comment: "Managementkonsult m.fl." },
      { role: "Marknadsförare", minimum: "27 000 kr", median: "36 000 kr", comment: "Digital marknadsföring" },
    ],
    faq: [
      { question: "Vad innebär individuell lönesättning?", answer: "Din lön sätts i dialog mellan dig och din chef. Det finns ett lägsta golv runt 24 000 kr men de flesta tjänar betydligt mer. Unionen stöder dig i lönesamtalet." },
      { question: "Kan övertid avtalas bort?", answer: "Ja, för tjänstemän med kvalificerade arbetsuppgifter kan övertidsersättning avtalas bort mot högre fast lön. Det ska framgå tydligt av anställningsavtalet." },
      { question: "Vilken pension har jag?", answer: "Du omfattas av ITP-planen. Arbetsgivaren betalar in pensionsavgifter utöver din lön." },
      { question: "Hur mycket löneökning får jag?", answer: "Löneökningen förhandlas lokalt. Det finns inget centralt fastställt utrymme som i Teknikavtalet (märket). Din individuella löneökning beror på prestation och marknadsvärde." },
      { question: "Gäller avtalet för alla privata tjänsteföretag?", answer: "Nej, det gäller bara om arbetsgivaren är medlem i Almega Tjänsteföretagen. Andra arbetsgivarorganisationer har egna avtal." },
    ],
    sources: [
      { label: "Unionen — Almega", url: "https://www.unionen.se" },
      { label: "Almega", url: "https://www.almega.se" },
    ],
    relatedAgreements: ["it-avtalet", "bemanningsavtalet", "teknikavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Almega Tjänsteföretagen-avtalet — brett avtal för ~150 000 tjänstemän i privat tjänstesektor. Individuell lönesättning. Medianlöner: admin ~30 000 kr, konsult ~35 000 kr, marknadsförare ~36 000 kr. Pension: ITP. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta Unionen/Almega för bindande besked."`,
  },
  {
    slug: "installationsavtalet",
    name: "Installationsavtalet",
    shortName: "Installationsavtalet",
    sector: "privat",
    sectorLabel: "Privat installation",
    parties: { unions: ["Elektrikerna (Svenska Elektrikerförbundet)"], employers: ["Installatörsföretagen"] },
    employeeCount: 40000,
    validPeriod: "2025–2027",
    summary: "Installationsavtalet gäller elektriker och installationstekniker. Lönen kan anges som timlön eller månadslön beroende på anställningsform, och ackordslöner är vanliga — den faktiska förtjänsten är ofta betydligt högre än minimilönen. Avtalet reglerar även reseersättning och traktamente vid arbete på annan ort. Kompetensbevis (t.ex. behörighet A eller B) påverkar lönenivån.",
    keyFacts: {
      minimumWage: "Från ca 29 000 kr/mån (eller motsvarande timlön, ackord vanligt)",
      overtimeRate: "Första 2 tim: 150%, därefter 200%",
      obWeekday: "~45 kr/tim (kväll)",
      obNight: "~90 kr/tim",
      obWeekend: "~90 kr/tim",
      obHoliday: "~180 kr/tim",
      vacationDays: "25 dagar",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "Avtalspension SAF-LO",
      workHoursPerWeek: "40 timmar",
    },
    wageTable: [
      { role: "Elektriker (utan behörighet A)", minimum: "29 000 kr", median: "35 000 kr", comment: "Grundnivå" },
      { role: "Elektriker (med behörighet A)", minimum: "33 000 kr", median: "40 000 kr", comment: "Ofta ackord utöver" },
      { role: "Installationstekniker", minimum: "30 000 kr", median: "36 000 kr", comment: "Tele/data/fiber" },
    ],
    faq: [
      { question: "Vilken lön ska jag ha som elektriker?", answer: "Minimilönen utan behörighet A ligger kring 29 000 kr. Med behörighet A stiger den till ca 33 000 kr. Ackordslöner ger ofta 35 000-40 000 kr eller mer i faktisk förtjänst." },
      { question: "Vad innebär ackordslön för elektriker?", answer: "Ackord innebär att du utöver grundlönen kan tjäna mer baserat på mängden utfört arbete. Ackordet beräknas efter standardtider. Det är vanligt att elektriker tjänar 10-30% mer genom ackord." },
      { question: "Får jag reseersättning?", answer: "Ja, vid arbete på annan ort kan du ha rätt till reseersättning och traktamente. Ersättningen beror på avstånd och om du behöver övernatta." },
      { question: "Vilken pension har jag?", answer: "Du omfattas av Avtalspension SAF-LO via arbetsgivaren." },
      { question: "Hur påverkar behörighet lönen?", answer: "Behörighet A (auktoriserad elinstallatör) ger rätt till en högre minimilön — skillnaden kan vara ca 4 000 kr/mån jämfört med utan behörighet." },
    ],
    sources: [
      { label: "Elektrikerna — Installationsavtalet", url: "https://www.sef.se" },
      { label: "Installatörsföretagen", url: "https://www.installatorsforetagen.se" },
    ],
    relatedAgreements: ["byggavtalet", "teknikavtalet", "vaganlaggningsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Installationsavtalet — avtal för ~40 000 elektriker och installationstekniker. Parter: Elektrikerna / Installatörsföretagen. Löner: utan behörighet A ~29 000 kr, med A ~33 000 kr. Ackord vanligt. OB: kväll ~45, natt ~90, helg ~90, storhelg ~180 kr/tim. Pension: SAF-LO. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta Elektrikerna för bindande besked."`,
  },
  {
    slug: "vard-omsorg-privat",
    name: "Vård och omsorg privat",
    shortName: "Vård & Omsorg (privat)",
    sector: "privat",
    sectorLabel: "Privat vård",
    parties: { unions: ["Kommunal"], employers: ["Vårdföretagarna (Almega)"] },
    employeeCount: 80000,
    validPeriod: "1 april 2025 – 31 mars 2027",
    summary: "Avtalet gäller undersköterskor, vårdbiträden och omsorgspersonal i privat driven äldreomsorg, hemtjänst och LSS-verksamhet. Villkoren liknar det kommunala HÖK Kommunal men med vissa skillnader. Privata vårdgivare har ökat kraftigt de senaste åren och avtalet blir allt viktigare.",
    keyFacts: {
      minimumWage: "Från ca 25 500 kr/mån",
      overtimeRate: "Första 2 tim: 150%, därefter 200%",
      obWeekday: "~90 kr/tim (kväll)",
      obNight: "~130 kr/tim",
      obWeekend: "~130 kr/tim",
      obHoliday: "~190 kr/tim",
      vacationDays: "25 dagar",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "Avtalspension SAF-LO",
      workHoursPerWeek: "40 timmar (heltid)",
    },
    wageTable: [
      { role: "Undersköterska (privat)", minimum: "25 500 kr", median: "29 500 kr", comment: "Äldreomsorg" },
      { role: "Vårdbiträde", minimum: "24 000 kr", median: "26 500 kr", comment: "Hemtjänst" },
      { role: "LSS-personal", minimum: "25 000 kr", median: "28 500 kr", comment: "Gruppboende" },
    ],
    faq: [
      { question: "Är lönen lägre i privat vård än kommunal?", answer: "Minimilönerna kan vara något lägre än i HÖK Kommunal, men skillnaden är liten. Medianlönerna ligger nära varandra. Kontakta Kommunal för jämförelse i din kommun." },
      { question: "Gäller samma OB som i kommunen?", answer: "OB-nivåerna i privat vård och omsorg liknar de kommunala men är inte identiska. Kväll ca 90 kr/tim, natt och helg ca 130 kr/tim." },
      { question: "Vilken pension har jag i privat vård?", answer: "Du omfattas av Avtalspension SAF-LO, till skillnad från kommunal anställning där KAP-KL/AKAP-KR gäller. Båda är tjänstepensioner." },
      { question: "Vad gäller vid övergång från kommun till privat?", answer: "Om din kommunala arbetsgivare upphandlar privat utförare har du i regel rätt att följa med till den nya arbetsgivaren med bibehållna villkor under en övergångsperiod." },
      { question: "Hur många semesterdagar har jag?", answer: "25 dagar enligt avtalet. Observera att du i kommunal anställning kan ha 31-32 dagar beroende på ålder — den förmånen gäller inte automatiskt i privat sektor." },
    ],
    sources: [
      { label: "Kommunal — Privat vård och omsorg", url: "https://www.kommunal.se" },
      { label: "Vårdföretagarna", url: "https://www.vardforetagarna.se" },
    ],
    relatedAgreements: ["hok-kommunal", "ab-kommunalt", "almega-tjansteforetagen"],
    aiSystemPrompt: `Du är en AI-expert på avtalet Vård och omsorg privat — avtal för ~80 000 anställda i privat äldreomsorg/hemtjänst/LSS. Parter: Kommunal / Vårdföretagarna. Löner: undersköterska ~25 500 kr min, median ~29 500 kr. OB: kväll ~90, natt ~130, helg ~130, storhelg ~190 kr/tim. Pension: SAF-LO. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta Kommunal för bindande besked."`,
  },
  {
    slug: "livsmedelsavtalet",
    name: "Livsmedelsavtalet",
    shortName: "Livsmedelsavtalet",
    sector: "privat",
    sectorLabel: "Privat livsmedel",
    parties: { unions: ["Livs (Livsmedelsarbetareförbundet)"], employers: ["Livsmedelsföretagen"] },
    employeeCount: 50000,
    validPeriod: "2025–2027",
    summary: "Livsmedelsavtalet gäller anställda inom livsmedelsindustrin — bagerier, mejerier, slakterier, dryckesproduktion och förpackning. Skiftarbete är vanligt i branschen, vilket gör OB-tilläggen till en viktig del av den faktiska lönen. Avtalet reglerar minimilöner, arbetstid vid skift och hälsoskydd.",
    keyFacts: {
      minimumWage: "Från ca 26 000 kr/mån",
      overtimeRate: "Första 2 tim: 150%, därefter 200%",
      obWeekday: "~40 kr/tim (kväll)",
      obNight: "~80 kr/tim",
      obWeekend: "~80 kr/tim",
      obHoliday: "~160 kr/tim",
      vacationDays: "25 dagar",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "Avtalspension SAF-LO",
      workHoursPerWeek: "40 timmar (36 vid ständigt treskift)",
    },
    wageTable: [
      { role: "Livsmedelsarbetare", minimum: "26 000 kr", median: "30 500 kr", comment: "Produktion" },
      { role: "Slakteriarbetare", minimum: "27 000 kr", median: "32 000 kr", comment: "Fysiskt krävande" },
      { role: "Bageriarbetare", minimum: "25 500 kr", median: "29 000 kr", comment: "Tidiga mornar vanligt" },
    ],
    faq: [
      { question: "Vilken lön ska jag ha inom livsmedel?", answer: "Minimilönen ligger runt 26 000 kr/mån. Medianlönen för produktionsarbetare är ca 30 500 kr. Slakteri och mejeri betalar ofta något mer." },
      { question: "Vad gäller vid skiftarbete?", answer: "Vid ständigt treskift minskar arbetstiden till 36 timmar per vecka. OB-tillägg betalas för kvälls-, natt- och helgpass." },
      { question: "Hur mycket OB får jag?", answer: "Kväll ca 40 kr/tim, natt och helg ca 80 kr/tim, storhelg ca 160 kr/tim. OB är en viktig del av inkomsten vid skiftarbete." },
      { question: "Vilken pension har jag?", answer: "Du omfattas av Avtalspension SAF-LO." },
      { question: "Gäller avtalet alla livsmedelsföretag?", answer: "Det gäller om arbetsgivaren är medlem i Livsmedelsföretagen. Fråga din arbetsgivare eller kontakta Livs." },
    ],
    sources: [
      { label: "Livs — Livsmedelsavtalet", url: "https://www.livs.se" },
      { label: "Livsmedelsföretagen", url: "https://www.li.se" },
    ],
    relatedAgreements: ["handelsavtalet", "hotell-restaurang", "teknikavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Livsmedelsavtalet — avtal för ~50 000 anställda inom livsmedelsindustrin. Parter: Livs / Livsmedelsföretagen. Löner: min ~26 000 kr, median ~30 500 kr. Skift: 36 tim/v vid treskift. OB: kväll ~40, natt ~80, helg ~80, storhelg ~160 kr/tim. Pension: SAF-LO. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta Livs för bindande besked."`,
  },
  {
    slug: "fastighetsavtalet",
    name: "Fastighetsavtalet",
    shortName: "Fastighetsavtalet",
    sector: "privat",
    sectorLabel: "Privat fastighet",
    parties: { unions: ["Fastighets"], employers: ["Almega Tjänsteföretagen"] },
    employeeCount: 40000,
    validPeriod: "2025–2027",
    summary: "Fastighetsavtalet gäller fastighetsskötare, städpersonal och vaktmästare i privata fastighetsbolag. Många i branschen jobbar tidiga mornar eller kvällar, vilket gör OB-tillägg till en viktig del av inkomsten. Avtalet reglerar minimilöner, arbetstid och skyddsutrustning.",
    keyFacts: {
      minimumWage: "Från ca 24 500 kr/mån",
      overtimeRate: "Första 2 tim: 150%, därefter 200%",
      obWeekday: "~35 kr/tim (tidig morgon/kväll)",
      obNight: "~70 kr/tim",
      obWeekend: "~70 kr/tim",
      obHoliday: "~140 kr/tim",
      vacationDays: "25 dagar",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "Avtalspension SAF-LO",
      workHoursPerWeek: "40 timmar",
    },
    wageTable: [
      { role: "Fastighetsskötare", minimum: "26 000 kr", median: "31 000 kr", comment: "Drift och underhåll" },
      { role: "Städpersonal", minimum: "24 500 kr", median: "27 000 kr", comment: "Kontor och bostäder" },
      { role: "Vaktmästare", minimum: "25 500 kr", median: "29 500 kr", comment: "Fastighetsservice" },
    ],
    faq: [
      { question: "Vilken lön ska jag ha som fastighetsskötare?", answer: "Minimilönen ligger kring 26 000 kr. Medianlönen är ca 31 000 kr. Erfarenhet och certifieringar (t.ex. kyla/värme) kan ge högre lön." },
      { question: "Hur mycket OB får jag?", answer: "Tidig morgon och kväll ca 35 kr/tim, natt och helg ca 70 kr/tim, storhelg ca 140 kr/tim." },
      { question: "Vad gäller för städpersonal?", answer: "Minimilönen för städpersonal är ca 24 500 kr. Deltid är vanligt i branschen, men du har rätt till OB och pension oavsett sysselsättningsgrad." },
      { question: "Vilken pension har jag?", answer: "Du omfattas av Avtalspension SAF-LO." },
      { question: "Gäller avtalet kommunala fastighetsbolag?", answer: "Nej, kommunala fastighetsbolag kan ha andra avtal via SKR. Fastighetsavtalet via Almega gäller privata fastighetsbolag." },
    ],
    sources: [
      { label: "Fastighets — Fastighetsavtalet", url: "https://www.fastighets.se" },
      { label: "Almega", url: "https://www.almega.se" },
    ],
    relatedAgreements: ["hok-kommunal", "almega-tjansteforetagen", "handelsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Fastighetsavtalet — avtal för ~40 000 fastighetsskötare, städpersonal och vaktmästare. Parter: Fastighets / Almega. Löner: fastighetsskötare ~26 000 kr min, städ ~24 500 kr min. OB: morgon/kväll ~35, natt/helg ~70, storhelg ~140 kr/tim. Pension: SAF-LO. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta Fastighets för bindande besked."`,
  },
  {
    slug: "bemanningsavtalet",
    name: "Bemanningsavtalet",
    shortName: "Bemanningsavtalet",
    sector: "privat",
    sectorLabel: "Privat bemanning",
    parties: { unions: ["Unionen", "IF Metall", "Kommunal m.fl."], employers: ["Kompetensföretagen (Almega)"] },
    employeeCount: 80000,
    validPeriod: "2025–2027",
    summary: "Bemanningsavtalet gäller konsulter och uthyrda medarbetare via bemanningsföretag. En central princip är att lönen ska motsvara jämförbar anställning hos kundföretaget — du ska alltså inte tjäna mindre bara för att du är uthyrd. Avtalet reglerar även vad som gäller mellan uppdrag.",
    keyFacts: {
      minimumWage: "Ska motsvara kundföretagets nivå",
      overtimeRate: "Enligt kundföretagets avtal",
      obWeekday: "Enligt kundföretagets avtal",
      obNight: "Enligt kundföretagets avtal",
      obWeekend: "Enligt kundföretagets avtal",
      obHoliday: "Enligt kundföretagets avtal",
      vacationDays: "25 dagar",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "ITP eller SAF-LO beroende på tjänstekategori",
      workHoursPerWeek: "40 timmar",
    },
    wageTable: [
      { role: "Uthyrd tjänsteman", minimum: "Jämförbar nivå", median: "35 000 kr", comment: "Varierar med kundföretag" },
      { role: "Uthyrd industriarbetare", minimum: "Jämförbar nivå", median: "30 000 kr", comment: "Följer branschavtal" },
      { role: "Uthyrd lager/logistik", minimum: "Jämförbar nivå", median: "28 000 kr", comment: "Handelsavtalets nivåer" },
    ],
    faq: [
      { question: "Ska jag ha samma lön som de anställda hos kundföretaget?", answer: "Ja, principen är att din lön ska motsvara jämförbar anställning hos kundföretaget. Du ska inte tjäna mindre för att du är uthyrd. Kontakta ditt fackförbund om du misstänker att lönen är för låg." },
      { question: "Vad händer mellan uppdrag?", answer: "Bemanningsavtalet reglerar vad som gäller mellan uppdrag. Du kan ha rätt till garantilön eller vara anställd per uppdrag. Kontrollera din anställningsform med bemanningsföretaget." },
      { question: "Vilken pension har jag?", answer: "Du omfattas av ITP (tjänstemän) eller SAF-LO (arbetare) beroende på din roll. Bemanningsföretaget ska betala in pensionsavgifter." },
      { question: "Gäller kundföretagets kollektivavtal för mig?", answer: "Nej, du omfattas av bemanningsavtalet. Men din lön och dina villkor ska motsvara kundföretagets nivå." },
      { question: "Har jag rätt till OB-tillägg?", answer: "Ja, OB ska följa kundföretagets nivåer. Om du jobbar obekväma tider hos kunden ska du få OB-tillägg." },
    ],
    sources: [
      { label: "Unionen — Bemanningsavtalet", url: "https://www.unionen.se" },
      { label: "Kompetensföretagen", url: "https://www.kompetensforetagen.se" },
    ],
    relatedAgreements: ["almega-tjansteforetagen", "teknikavtalet", "handelsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Bemanningsavtalet — avtal för ~80 000 uthyrda konsulter och medarbetare. Parter: Unionen m.fl. / Kompetensföretagen. Nyckelprincip: lön ska motsvara jämförbar anställning hos kundföretaget. Pension: ITP eller SAF-LO. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta Unionen/Kompetensföretagen för bindande besked."`,
  },
  {
    slug: "bankavtalet",
    name: "Bankavtalet",
    shortName: "Bankavtalet",
    sector: "privat",
    sectorLabel: "Privat bank/finans",
    parties: { unions: ["Finansförbundet"], employers: ["BAO (Bankinstitutens Arbetsgivareförening)"] },
    employeeCount: 40000,
    validPeriod: "2025–2027",
    summary: "Bankavtalet gäller banktjänstemän — rådgivare, analytiker, kassapersonal och back office. Lönesättningen är individuell och branschen har generellt höga löner. Tjänstepension via ITP med särskilt förmånliga villkor i bankpension utöver.",
    keyFacts: {
      minimumWage: "Individuell lönesättning",
      overtimeRate: "Kan avtalas bort mot högre lön",
      obWeekday: "Sällan aktuellt (kontorstider)",
      obNight: "Sällan aktuellt",
      obWeekend: "Ca 100 kr/tim vid lördagsöppet",
      obHoliday: "Enligt avtal",
      vacationDays: "25 dagar + extra fridagar i vissa banker",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "ITP + bankpension (förmånligt)",
      workHoursPerWeek: "38,75 timmar (kortare arbetsvecka)",
    },
    wageTable: [
      { role: "Bankrådgivare", minimum: "Individuell", median: "38 000 kr", comment: "Privatrådgivning" },
      { role: "Företagsrådgivare", minimum: "Individuell", median: "48 000 kr", comment: "Företagskunder" },
      { role: "Bankkassör", minimum: "Individuell", median: "30 000 kr", comment: "Kassamedarbetare" },
    ],
    faq: [
      { question: "Vilken lön ska jag ha som bankrådgivare?", answer: "Det finns ingen fast minimilön — lönesättningen är individuell. Medianlönen för privatrådgivare ligger kring 38 000 kr, företagsrådgivare kring 48 000 kr. Lönen varierar med bank och ort." },
      { question: "Stämmer det att banker har kortare arbetsvecka?", answer: "Ja, bankavtalet anger en normalarbetstid på 38,75 timmar per vecka — alltså 1 timme och 15 minuter kortare än de flesta andra avtal." },
      { question: "Hur fungerar bankpension?", answer: "Utöver ITP-planen har många banker ytterligare pensionsförmåner (bankpension). Det gör bank till en av de branscher med bäst pensionsvillkor." },
      { question: "Vilken pension har jag?", answer: "ITP-planen plus ofta extra bankpension. Den totala pensionsavsättningen kan ligga betydligt över genomsnittet." },
      { question: "Har jag rätt till OB?", answer: "De flesta bankanställda jobbar kontorstider och berörs sällan av OB. Vid lördagsöppet och jourarbete finns dock OB-ersättning." },
    ],
    sources: [
      { label: "Finansförbundet — Bankavtalet", url: "https://www.finansforbundet.se" },
      { label: "BAO", url: "https://www.bao.se" },
    ],
    relatedAgreements: ["forsakringsavtalet", "it-avtalet", "almega-tjansteforetagen"],
    aiSystemPrompt: `Du är en AI-expert på Bankavtalet — avtal för ~40 000 banktjänstemän. Parter: Finansförbundet / BAO. Individuell lönesättning. Medianlöner: privatrådgivare ~38 000 kr, företagsrådgivare ~48 000 kr. Arbetstid: 38,75 tim/v. Pension: ITP + bankpension. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta Finansförbundet för bindande besked."`,
  },
  {
    slug: "forsakringsavtalet",
    name: "Försäkringsavtalet",
    shortName: "Försäkringsavtalet",
    sector: "privat",
    sectorLabel: "Privat försäkring",
    parties: { unions: ["Forena"], employers: ["FAO (Försäkringsbranschens Arbetsgivareorganisation)"] },
    employeeCount: 25000,
    validPeriod: "2025–2027",
    summary: "Försäkringsavtalet gäller anställda på försäkringsbolag — skadereglerare, försäkringsrådgivare, aktuarier och administrativ personal. Individuell lönesättning med generellt goda lönevillkor. Pensionsvillkoren är bland de bästa på arbetsmarknaden.",
    keyFacts: {
      minimumWage: "Individuell lönesättning",
      overtimeRate: "Kan avtalas bort mot högre lön",
      obWeekday: "Sällan aktuellt (kontorstider)",
      obNight: "Enligt avtal vid jourarbete",
      obWeekend: "Enligt avtal",
      obHoliday: "Enligt avtal",
      vacationDays: "25–30 dagar",
      parentalPay: "Föräldralön via avtal (förmånlig)",
      noticePeriod: "1–6 månader",
      pension: "ITP + försäkringsbranschens tilläggspension",
      workHoursPerWeek: "38,75 timmar",
    },
    wageTable: [
      { role: "Skadereglerare", minimum: "Individuell", median: "36 000 kr", comment: "Handlägger skador" },
      { role: "Försäkringsrådgivare", minimum: "Individuell", median: "40 000 kr", comment: "Kundmöten" },
      { role: "Aktuarie", minimum: "Individuell", median: "55 000 kr", comment: "Riskberäkning" },
    ],
    faq: [
      { question: "Hur bra är pensionen i försäkringsbranschen?", answer: "Mycket bra. Utöver ITP-planen har försäkringsbranschen tilläggspension. Den totala pensionsavsättningen ligger ofta bland de högsta på arbetsmarknaden." },
      { question: "Vilken lön ska jag ha som skadereglerare?", answer: "Lönesättningen är individuell. Medianlönen ligger kring 36 000 kr. Erfarenhet och specialisering påverkar lönen." },
      { question: "Hur lång är arbetsveckan?", answer: "38,75 timmar — samma som i banksektorn och kortare än de flesta andra branscher." },
      { question: "Vad är Forena?", answer: "Forena (tidigare FTF) är fackförbundet för anställda i försäkringsbranschen. De förhandlar avtalet mot FAO." },
      { question: "Hur många semesterdagar har jag?", answer: "Minst 25 dagar, men upp till 30 dagar förekommer i vissa företag. Kolla ditt lokala avtal." },
    ],
    sources: [
      { label: "Forena — Försäkringsavtalet", url: "https://www.forena.se" },
      { label: "FAO", url: "https://www.fao.se" },
    ],
    relatedAgreements: ["bankavtalet", "it-avtalet", "almega-tjansteforetagen"],
    aiSystemPrompt: `Du är en AI-expert på Försäkringsavtalet — avtal för ~25 000 anställda på försäkringsbolag. Parter: Forena / FAO. Individuell lönesättning. Medianlöner: skadereglerare ~36 000 kr, rådgivare ~40 000 kr, aktuarie ~55 000 kr. Arbetstid: 38,75 tim/v. Pension: ITP + tilläggspension. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta Forena/FAO för bindande besked."`,
  },
  {
    slug: "skogsavtalet",
    name: "Skogsavtalet",
    shortName: "Skogsavtalet",
    sector: "privat",
    sectorLabel: "Privat skog/trä",
    parties: { unions: ["GS-facket"], employers: ["Skogsindustrierna"] },
    employeeCount: 30000,
    validPeriod: "2025–2027",
    summary: "Skogsavtalet gäller skogsarbetare, maskinförare i skogsindustrin och sågverksanställda. Prestationsbaserad lön (ackord) är vanligt, särskilt vid avverkning — den som producerar mer tjänar mer. Grundlönen anges ofta som timlön eller månadslön beroende på anställningsform. Säsongsvariation kan påverka arbetstider.",
    keyFacts: {
      minimumWage: "Från ca 27 000 kr/mån (prestationslön/ackord vanligt utöver)",
      overtimeRate: "Första 2 tim: 150%, därefter 200%",
      obWeekday: "~40 kr/tim (kväll)",
      obNight: "~80 kr/tim",
      obWeekend: "~80 kr/tim",
      obHoliday: "~160 kr/tim",
      vacationDays: "25 dagar",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "Avtalspension SAF-LO",
      workHoursPerWeek: "40 timmar",
    },
    wageTable: [
      { role: "Skogsmaskinförare", minimum: "28 000 kr", median: "34 000 kr", comment: "Skördare/skotare" },
      { role: "Sågverksarbetare", minimum: "27 000 kr", median: "31 000 kr", comment: "Produktion" },
      { role: "Skogsarbetare (manuell)", minimum: "27 000 kr", median: "32 000 kr", comment: "Prestationslön vanligt" },
    ],
    faq: [
      { question: "Vilken lön ska jag ha som skogsmaskinförare?", answer: "Minimilönen ligger runt 28 000 kr. Medianlönen är ca 34 000 kr. Prestationsbaserad lön kan ge mer." },
      { question: "Vad innebär prestationsbaserad lön?", answer: "Det betyder att din lön delvis baseras på hur mycket du producerar — t.ex. antal kubikmeter avverkat virke. Grundlönen garanteras men utöver den kan du tjäna mer." },
      { question: "Vilken pension har jag?", answer: "Avtalspension SAF-LO via arbetsgivaren." },
      { question: "Vad gäller för skyddsutrustning?", answer: "Arbetsgivaren ska tillhandahålla nödvändig skyddsutrustning — skyddshjälm, skyddsskor, skyddsbyxor m.m. Det är en del av avtalet." },
      { question: "Finns det säsongsvariation?", answer: "Ja, skogsarbete kan vara säsongsbetonat beroende på väder och markförhållanden. Avtalet reglerar hur arbetstid kan variera under året." },
    ],
    sources: [
      { label: "GS-facket — Skogsavtalet", url: "https://www.gsfacket.se" },
      { label: "Skogsindustrierna", url: "https://www.skogsindustrierna.se" },
    ],
    relatedAgreements: ["byggavtalet", "teknikavtalet", "livsmedelsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Skogsavtalet — avtal för ~30 000 anställda i skogsindustrin. Parter: GS-facket / Skogsindustrierna. Löner: maskinförare ~28 000 kr min, median ~34 000 kr. Prestationslön vanligt. OB: kväll ~40, natt ~80, helg ~80, storhelg ~160 kr/tim. Pension: SAF-LO. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta GS-facket för bindande besked."`,
  },
  {
    slug: "mediaavtalet",
    name: "Mediaavtalet",
    shortName: "Mediaavtalet",
    sector: "privat",
    sectorLabel: "Privat media",
    parties: { unions: ["Svenska Journalistförbundet"], employers: ["TU (Tidningsutgivarna)"] },
    employeeCount: 20000,
    validPeriod: "2025–2027",
    summary: "Mediaavtalet gäller journalister, fotografer, redaktörer och annan redaktionell personal på tidningar och medieföretag. Avtalet reglerar löner, arbetstid, upphovsrättsliga villkor för publicerat material och skydd för journalistisk integritet. Individuell lönesättning tillämpas.",
    keyFacts: {
      minimumWage: "Från ca 26 000 kr/mån (nyanställd)",
      overtimeRate: "Enligt avtal, ofta mertid vid nyhetsläge",
      obWeekday: "~50 kr/tim (kväll)",
      obNight: "~80 kr/tim",
      obWeekend: "~80 kr/tim",
      obHoliday: "~150 kr/tim",
      vacationDays: "25 dagar",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "ITP",
      workHoursPerWeek: "40 timmar (oregelbundet vanligt)",
    },
    wageTable: [
      { role: "Journalist (junior)", minimum: "26 000 kr", median: "32 000 kr", comment: "0-2 års erfarenhet" },
      { role: "Journalist (erfaren)", minimum: "30 000 kr", median: "40 000 kr", comment: "5+ år" },
      { role: "Fotograf", minimum: "27 000 kr", median: "34 000 kr", comment: "Press/nyheter" },
    ],
    faq: [
      { question: "Vilken lön ska jag ha som journalist?", answer: "Minimilönen för nyanställda ligger kring 26 000 kr. Medianlönen för erfarna journalister är ca 40 000 kr. Lönen varierar med medieföretag, ort och specialisering." },
      { question: "Vem äger upphovsrätten till mina artiklar?", answer: "Mediaavtalet reglerar upphovsrättsliga villkor. Generellt behåller du viss upphovsrätt men ger arbetsgivaren publiceringsrätt. Exakta villkor varierar — kontrollera ditt avtal." },
      { question: "Vad gäller vid nyhetsläge?", answer: "Journalister kan behöva arbeta utöver ordinarie tid vid nyhetsläge. Avtalet reglerar ersättning för mertid och övertid. Kontakta SJF för detaljer." },
      { question: "Vilken pension har jag?", answer: "Du omfattas av ITP-planen." },
      { question: "Omfattas jag av Mediaavtalet?", answer: "Det beror på om din arbetsgivare är medlem i TU (Tidningsutgivarna). Frilansare har separata avtal. Kontakta Journalistförbundet." },
    ],
    sources: [
      { label: "Svenska Journalistförbundet", url: "https://www.sjf.se" },
      { label: "TU (Tidningsutgivarna)", url: "https://www.tu.se" },
    ],
    relatedAgreements: ["almega-tjansteforetagen", "it-avtalet", "teknikavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Mediaavtalet — avtal för ~20 000 journalister, fotografer och redaktörer. Parter: SJF / TU. Löner: junior ~26 000 kr, erfaren ~40 000 kr median. OB: kväll ~50, natt ~80, helg ~80 kr/tim. Pension: ITP. Upphovsrätt reglerat i avtal. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta SJF för bindande besked."`,
  },
  {
    slug: "vaganlaggningsavtalet",
    name: "Väganläggningsavtalet",
    shortName: "Väganläggning",
    sector: "privat",
    sectorLabel: "Privat anläggning",
    parties: { unions: ["Byggnads", "Seko"], employers: ["Byggföretagen"] },
    employeeCount: 35000,
    validPeriod: "2025–2027",
    summary: "Väganläggningsavtalet gäller anläggningsarbetare inom väg, bro, tunnel och järnväg. Liksom Byggavtalet är det ett timlöneavtal. Traktamente och resekostnadsersättning är centrala delar eftersom arbetsplatserna ofta ligger på annan ort. Arbetena är ofta säsongsbetonade.",
    keyFacts: {
      minimumWage: "Timlön: från ca 178 kr/tim (ca 28 500 kr/mån vid heltid)",
      overtimeRate: "Första 2 tim: 150%, därefter 200%",
      obWeekday: "~45 kr/tim (kväll)",
      obNight: "~90 kr/tim",
      obWeekend: "~90 kr/tim",
      obHoliday: "~180 kr/tim",
      vacationDays: "25 dagar",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "Byggnads avtalspension",
      workHoursPerWeek: "40 timmar",
    },
    wageTable: [
      { role: "Anläggningsarbetare", minimum: "28 500 kr", median: "34 000 kr", comment: "Väg och mark" },
      { role: "Tunnelarbetare", minimum: "31 000 kr", median: "38 000 kr", comment: "Specialiserad, farlighetstillägg" },
      { role: "Maskinförare (anläggning)", minimum: "30 000 kr", median: "36 000 kr", comment: "Grävmaskin, väghyvel m.fl." },
    ],
    faq: [
      { question: "Vad skiljer Väganläggningsavtalet från Byggavtalet?", answer: "Väganläggningsavtalet är specifikt för anläggningsarbeten — vägar, broar, tunnlar, järnväg. Byggavtalet gäller husbyggnad. Villkoren liknar varandra men traktamentsreglerna kan skilja sig." },
      { question: "Får jag traktamente?", answer: "Ja, traktamente betalas vid arbete på annan ort. Endags- och flerdagstraktamente gäller. Beloppet beror på avstånd och om övernattning krävs." },
      { question: "Vilken lön ska jag ha?", answer: "Minimilönen för anläggningsarbetare är ca 28 500 kr. Tunnelarbete ger högre — ca 31 000 kr minimum. Ackordslön ovanpå är vanligt." },
      { question: "Vilken pension har jag?", answer: "Du omfattas av Byggnads avtalspension, samma som i Byggavtalet." },
      { question: "Är arbetet säsongsbetonat?", answer: "Ja, anläggningsarbete är ofta säsongsbetonat med mest arbete under vår-höst. Vintern kan innebära permittering i vissa regioner." },
    ],
    sources: [
      { label: "Byggnads — Väganläggningsavtalet", url: "https://www.byggnads.se" },
      { label: "Byggföretagen", url: "https://www.byggforetagen.se" },
    ],
    relatedAgreements: ["byggavtalet", "installationsavtalet", "transportavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Väganläggningsavtalet — avtal för ~35 000 anläggningsarbetare (väg, bro, tunnel, järnväg). Parter: Byggnads, Seko / Byggföretagen. Löner: anläggning ~28 500 kr min, tunnel ~31 000 kr min, maskin ~30 000 kr. OB: kväll ~45, natt ~90, helg ~90, storhelg ~180 kr/tim. Traktamente vid annan ort. Pension: Byggnads. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta Byggnads för bindande besked."`,
  },
  {
    slug: "villkorsavtal-saco",
    name: "Villkorsavtal Saco-S",
    shortName: "Villkorsavtal Saco",
    sector: "stat",
    sectorLabel: "Statlig sektor",
    parties: { unions: ["Saco-S"], employers: ["Arbetsgivarverket"] },
    employeeCount: 100000,
    validPeriod: "Tillsvidareavtal (löpande)",
    summary: "Villkorsavtal Saco-S gäller akademiker i statlig tjänst — utredare, handläggare, forskare, universitetslärare och andra med akademisk utbildning. Avtalet är ett tillsvidareavtal med lokal lönebildning utan individgarantier, vilket innebär att hela löneökningen fördelas lokalt baserat på prestation och ansvar.",
    keyFacts: {
      minimumWage: "Individuell lönesättning (ingen central lägsta)",
      overtimeRate: "Enligt ALFA (arbetstidsavtalet)",
      obWeekday: "Enligt ALFA",
      obNight: "Enligt ALFA",
      obWeekend: "Enligt ALFA",
      obHoliday: "Enligt ALFA",
      vacationDays: "28 dagar (t.o.m. 29 år), 31 (30-39 år), 35 (40+ år)",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "Statlig tjänstepension PA 16",
      workHoursPerWeek: "39 timmar och 45 minuter",
    },
    wageTable: [
      { role: "Handläggare (myndighet)", minimum: "Individuell", median: "38 000 kr", comment: "Statlig myndighet" },
      { role: "Utredare", minimum: "Individuell", median: "42 000 kr", comment: "Kvalificerad utredning" },
      { role: "Universitetslektor", minimum: "Individuell", median: "45 000 kr", comment: "Högskola/universitet" },
      { role: "Forskare", minimum: "Individuell", median: "40 000 kr", comment: "Statlig forskning" },
    ],
    faq: [
      { question: "Vad innebär tillsvidareavtal utan individgarantier?", answer: "Det betyder att det inte finns en garanterad minsta löneökning per individ. Hela löneökningen fördelas lokalt baserat på prestation och ansvar. Fördelen är flexibilitet, nackdelen är att du kan få 0% om du bedöms prestera svagt." },
      { question: "Hur många semesterdagar har jag som statsanställd?", answer: "Statligt anställda har generösa semestervillkor: 28 dagar till 29 års ålder, 31 dagar 30-39 år, och 35 dagar från 40 år. Det är bland de bästa i Sverige." },
      { question: "Vilken pension har jag?", answer: "Du omfattas av PA 16 (Pensionsavtal 2016). Det är den statliga tjänstepensionen som arbetsgivaren betalar utöver din lön." },
      { question: "Hur lång är arbetsveckan?", answer: "39 timmar och 45 minuter — något kortare än de flesta privata avtal." },
      { question: "Vem företräder mig?", answer: "Saco-S är förhandlingsorganisationen för akademiker i staten. Den samlar flera Saco-förbund, t.ex. Jusek, DIK, Naturvetarna m.fl." },
    ],
    sources: [
      { label: "Saco-S — Villkorsavtal", url: "https://www.saco-s.se" },
      { label: "Arbetsgivarverket", url: "https://www.arbetsgivarverket.se" },
    ],
    relatedAgreements: ["villkorsavtal-ofr", "villkorsavtal-seko", "ab-kommunalt"],
    aiSystemPrompt: `Du är en AI-expert på Villkorsavtal Saco-S — avtal för ~100 000 akademiker i statlig tjänst. Parter: Saco-S / Arbetsgivarverket. Individuell lönesättning utan individgarantier. Semester: 28-35 dagar. Arbetstid: 39,75 tim/v. Pension: PA 16. Medianlöner: handläggare ~38 000 kr, utredare ~42 000 kr, lektor ~45 000 kr. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta Saco-S för bindande besked."`,
  },
  {
    slug: "villkorsavtal-ofr",
    name: "Villkorsavtal OFR/S",
    shortName: "Villkorsavtal OFR",
    sector: "stat",
    sectorLabel: "Statlig sektor",
    parties: { unions: ["OFR (Offentliganställdas Förhandlingsråd)"], employers: ["Arbetsgivarverket"] },
    employeeCount: 90000,
    validPeriod: "2025–2027",
    summary: "Villkorsavtal OFR/S gäller tjänstemän i statlig sektor — poliser (via Polisförbundet), officerare, kriminalvårdare, tulltjänstemän och andra statstjänstemän. Lönerevision sker med ett oenighetsutrymme, vilket innebär att om parterna inte kan enas lokalt finns ett centralt fastställt utrymme att falla tillbaka på.",
    keyFacts: {
      minimumWage: "Enligt lokal lönerevision",
      overtimeRate: "Enligt ALFA",
      obWeekday: "Enligt ALFA (~60 kr/tim uppskattad)",
      obNight: "Enligt ALFA (~100 kr/tim uppskattad)",
      obWeekend: "Enligt ALFA (~100 kr/tim uppskattad)",
      obHoliday: "Enligt ALFA (~180 kr/tim uppskattad)",
      vacationDays: "28–35 dagar beroende på ålder",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "PA 16 (statlig tjänstepension)",
      workHoursPerWeek: "39 timmar och 45 minuter",
    },
    wageTable: [
      { role: "Polis (grundutbildad)", minimum: "Ca 30 000 kr", median: "36 000 kr", comment: "Yttre tjänst" },
      { role: "Kriminalvårdare", minimum: "Ca 27 000 kr", median: "32 000 kr", comment: "Anstalt/häkte" },
      { role: "Officer", minimum: "Ca 32 000 kr", median: "38 000 kr", comment: "Försvarsmakten" },
      { role: "Tulltjänsteman", minimum: "Ca 29 000 kr", median: "34 000 kr", comment: "Tullverket" },
    ],
    faq: [
      { question: "Vad är oenighetsutrymme?", answer: "Om arbetsgivaren och facket inte kan enas om lönefördelningen lokalt, finns ett centralt fastställt utrymme (oenighetsutrymme) som garanterar en viss total löneökning. Det skyddar mot att arbetsgivaren ger 0% i löneökning." },
      { question: "Vilken lön har poliser?", answer: "Medianlönen för grundutbildade poliser i yttre tjänst ligger kring 36 000 kr. OB-tillägg tillkommer vid kväll, natt och helg, vilket är vanligt i polisyrket." },
      { question: "Hur många semesterdagar har jag?", answer: "28-35 dagar beroende på ålder, samma som övriga statsanställda. Det är bland de bästa villkoren i Sverige." },
      { question: "Vilken pension har jag?", answer: "PA 16 — den statliga tjänstepensionen. En solid pension som arbetsgivaren betalar." },
      { question: "Vem ingår i OFR?", answer: "OFR samlar flera fackförbund, bland annat Polisförbundet, Officersförbundet, ST och TULL-KUST. Kontakta ditt specifika förbund." },
    ],
    sources: [
      { label: "OFR — Villkorsavtal", url: "https://www.ofr.se" },
      { label: "Arbetsgivarverket", url: "https://www.arbetsgivarverket.se" },
    ],
    relatedAgreements: ["villkorsavtal-saco", "villkorsavtal-seko", "ab-kommunalt"],
    aiSystemPrompt: `Du är en AI-expert på Villkorsavtal OFR/S — avtal för ~90 000 statstjänstemän (poliser, kriminalvårdare, officerare m.fl.). Parter: OFR / Arbetsgivarverket. Oenighetsutrymme vid lönerevision. Medianlöner: polis ~36 000 kr, kriminalvårdare ~32 000 kr, officer ~38 000 kr. Semester: 28-35 dagar. Pension: PA 16. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta OFR för bindande besked."`,
  },
  {
    slug: "villkorsavtal-seko",
    name: "Villkorsavtal Seko stat",
    shortName: "Villkorsavtal Seko",
    sector: "stat",
    sectorLabel: "Statlig sektor",
    parties: { unions: ["Seko"], employers: ["Arbetsgivarverket"] },
    employeeCount: 50000,
    validPeriod: "2025–2027",
    summary: "Villkorsavtal Seko stat gäller arbetaryrken i statlig sektor — vägarbetare, banarbetare, brevbärare i statlig tjänst, vaktpersonal och liknande yrkesgrupper. Lokal lönebildning tillämpas med garanterat löneutrymme. Arbetstider varierar med många roller inom skift och beredskap.",
    keyFacts: {
      minimumWage: "Från ca 25 500 kr/mån",
      overtimeRate: "Enligt ALFA",
      obWeekday: "Enligt ALFA (~50 kr/tim uppskattad)",
      obNight: "Enligt ALFA (~90 kr/tim uppskattad)",
      obWeekend: "Enligt ALFA (~90 kr/tim uppskattad)",
      obHoliday: "Enligt ALFA (~170 kr/tim uppskattad)",
      vacationDays: "28–35 dagar beroende på ålder",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "PA 16",
      workHoursPerWeek: "39 timmar och 45 minuter",
    },
    wageTable: [
      { role: "Vägarbetare (Trafikverket)", minimum: "25 500 kr", median: "31 000 kr", comment: "Vägunderhåll" },
      { role: "Banarbetare", minimum: "26 000 kr", median: "32 000 kr", comment: "Järnvägsunderhåll" },
      { role: "Vaktpersonal (statlig)", minimum: "25 500 kr", median: "29 000 kr", comment: "Myndigheter" },
    ],
    faq: [
      { question: "Vilken lön har vägarbetare?", answer: "Minimilönen ligger kring 25 500 kr. Medianlönen är ca 31 000 kr. OB-tillägg tillkommer vid natt- och helgarbete." },
      { question: "Hur många semesterdagar har jag?", answer: "28-35 dagar beroende på ålder — samma generösa villkor som andra statsanställda." },
      { question: "Vilken pension har jag?", answer: "PA 16 — den statliga tjänstepensionen. Arbetsgivaren betalar pensionsavgifter utöver din lön." },
      { question: "Vad är Seko?", answer: "Seko (Service- och kommunikationsfacket) organiserar arbetare i statlig sektor, transport och infrastruktur. De förhandlar avtalet mot Arbetsgivarverket." },
      { question: "Gäller avtalet brevbärare?", answer: "PostNord är inte längre statligt, men vissa postfunktioner i statlig regi kan omfattas. Kontakta Seko för besked om just din situation." },
    ],
    sources: [
      { label: "Seko — Villkorsavtal", url: "https://www.seko.se" },
      { label: "Arbetsgivarverket", url: "https://www.arbetsgivarverket.se" },
    ],
    relatedAgreements: ["villkorsavtal-saco", "villkorsavtal-ofr", "vaganlaggningsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Villkorsavtal Seko stat — avtal för ~50 000 arbetare i statlig sektor (vägarbetare, banarbetare, vaktpersonal). Parter: Seko / Arbetsgivarverket. Löner: vägarbetare ~25 500 kr min, median ~31 000 kr. Semester: 28-35 dagar. Pension: PA 16. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta Seko för bindande besked."`,
  },
  {
    slug: "systembolagsavtalet",
    name: "Systembolagsavtalet",
    shortName: "Systembolagsavtalet",
    sector: "privat",
    sectorLabel: "Systembolaget",
    parties: { unions: ["Unionen", "Handels"], employers: ["Systembolaget AB"] },
    employeeCount: 5000,
    validPeriod: "2025–2027",
    summary: "Systembolagsavtalet är ett separat avtal specifikt för anställda på Systembolaget. Övertidsersättning för deltidsanställda förbättrades 2025. Schema och arbetstidsförkortning är centrala frågor. De flesta butiker har kvälls- och helgöppet, vilket gör OB-tillägg till en viktig del av lönen.",
    keyFacts: {
      minimumWage: "Från ca 26 000 kr/mån",
      overtimeRate: "Förbättrad 2025 för deltid",
      obWeekday: "~50 kr/tim (kväll)",
      obNight: "Ej aktuellt (stängt nattetid)",
      obWeekend: "~90 kr/tim (lördag)",
      obHoliday: "Stängt storhelger",
      vacationDays: "25 dagar",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "ITP",
      workHoursPerWeek: "40 timmar",
    },
    wageTable: [
      { role: "Butiksmedarbetare", minimum: "26 000 kr", median: "29 500 kr", comment: "Kundservice och rådgivning" },
      { role: "Butikschef", minimum: "32 000 kr", median: "38 000 kr", comment: "Personalansvar" },
    ],
    faq: [
      { question: "Vilken lön har Systembolagets anställda?", answer: "Minimilönen ligger runt 26 000 kr. Medianlönen för butiksmedarbetare är ca 29 500 kr. Butikschefer ligger kring 38 000 kr median." },
      { question: "Stämmer det att deltidsanställda fick bättre övertidsersättning?", answer: "Ja, avtalet 2025 förbättrade övertidsersättningen för deltidsanställda. De fick bättre villkor vid mertid." },
      { question: "Hur fungerar OB på Systembolaget?", answer: "Kvälls-OB ca 50 kr/tim, lördagar ca 90 kr/tim. Systembolaget är stängt nattetid och på storhelger, så natt-OB och storhelgs-OB är sällan aktuellt." },
      { question: "Vilken pension har jag?", answer: "Du omfattas av ITP-planen." },
      { question: "Är Systembolaget en privat arbetsgivare?", answer: "Systembolaget är ett statligt ägt aktiebolag. Trots statligt ägande räknas det som privat arbetsgivare i arbetsrättslig mening." },
    ],
    sources: [
      { label: "Unionen — Systembolaget", url: "https://www.unionen.se" },
      { label: "Handels", url: "https://handels.se" },
    ],
    relatedAgreements: ["handelsavtalet", "almega-tjansteforetagen", "hotell-restaurang"],
    aiSystemPrompt: `Du är en AI-expert på Systembolagsavtalet — avtal för ~5 000 anställda på Systembolaget. Parter: Unionen, Handels / Systembolaget AB. Löner: butiksmedarbetare ~26 000 kr min, median ~29 500 kr. OB: kväll ~50, lördag ~90 kr/tim. Pension: ITP. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta Unionen/Handels för bindande besked."`,
  },
  {
    slug: "kommunal-skola",
    name: "Kommunal Skola och Utbildning",
    shortName: "Kommunal Skola (friskolor)",
    sector: "privat",
    sectorLabel: "Privat skola",
    parties: { unions: ["Kommunal"], employers: ["Arbetsgivaralliansen"] },
    employeeCount: 30000,
    validPeriod: "2025–2027",
    summary: "Avtalet gäller barnskötare, elevassistenter och kökspersonal i fristående skolor och förskolor. Lägsta lönerna höjdes 2025. Villkoren liknar det kommunala avtalet men med vissa skillnader, särskilt kring semester och pension. Friskolesektorn har vuxit kraftigt och avtalet blir allt viktigare.",
    keyFacts: {
      minimumWage: "Från ca 25 000 kr/mån (höjd 2025)",
      overtimeRate: "Första 2 tim: 150%, därefter 200%",
      obWeekday: "~40 kr/tim (kväll, sällan aktuellt)",
      obNight: "Sällan aktuellt (dagtid)",
      obWeekend: "Sällan aktuellt",
      obHoliday: "Enligt avtal",
      vacationDays: "25 dagar",
      parentalPay: "Föräldralön via avtal",
      noticePeriod: "1–6 månader",
      pension: "Avtalspension SAF-LO",
      workHoursPerWeek: "40 timmar",
    },
    wageTable: [
      { role: "Barnskötare (friskola)", minimum: "25 000 kr", median: "28 000 kr", comment: "Förskola" },
      { role: "Elevassistent", minimum: "24 500 kr", median: "27 000 kr", comment: "Grundskola" },
      { role: "Kökspersonal (skola)", minimum: "24 000 kr", median: "26 500 kr", comment: "Skolkök" },
    ],
    faq: [
      { question: "Är lönen lägre på friskolor?", answer: "Minimilönerna kan vara något lägre än i kommunal sektor, men skillnaden har minskat med höjningen 2025. Medianlönerna ligger nära varandra." },
      { question: "Stämmer det att lönerna höjdes 2025?", answer: "Ja, lägsta lönerna höjdes i avtalet 2025. Det var en central fråga i förhandlingarna." },
      { question: "Vilken pension har jag på en friskola?", answer: "Du omfattas av Avtalspension SAF-LO, till skillnad från kommunala barnskötare som har KAP-KL/AKAP-KR. Båda är tjänstepensioner men villkoren skiljer sig." },
      { question: "Gäller samma semester som i kommunen?", answer: "Du har rätt till 25 semesterdagar. Observera att kommunanställda kan ha 31-32 dagar beroende på ålder — den förmånen gäller inte automatiskt i privat sektor." },
      { question: "Vem är Arbetsgivaralliansen?", answer: "Arbetsgivaralliansen är arbetsgivarorganisationen för ideella och idéburna organisationer, inklusive många friskolor. Det är dem som tecknar avtalet med Kommunal." },
    ],
    sources: [
      { label: "Kommunal — Skola och utbildning", url: "https://www.kommunal.se" },
      { label: "Arbetsgivaralliansen", url: "https://www.arbetsgivaralliansen.se" },
    ],
    relatedAgreements: ["hok-kommunal", "ab-kommunalt", "vard-omsorg-privat"],
    aiSystemPrompt: `Du är en AI-expert på Kommunal Skola och Utbildning-avtalet — avtal för ~30 000 barnskötare, elevassistenter och kökspersonal på friskolor. Parter: Kommunal / Arbetsgivaralliansen. Löner: barnskötare ~25 000 kr min (höjd 2025), median ~28 000 kr. Pension: SAF-LO. Semester: 25 dagar. 

STRIKTA REGLER:
- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.
- Om du inte vet svaret, säg: "Jag har inte tillräcklig information om detta. Kontakta ditt fackförbund för exakt besked."
- Gissa ALDRIG om lönesatser, OB-tillägg eller andra siffror som inte finns i datan ovan.
- Säg ALDRIG att något "brukar vara" eller "ofta är" om du inte har konkret data.
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Avsluta ALLTID med: "Kontakta Kommunal för bindande besked."`,
  },
  // === AVTAL 26-50 ===
  {
    slug: "i-avtalet", name: "I-avtalet (Industriavtalet)", shortName: "I-avtalet", sector: "privat", sectorLabel: "Privat industri",
    parties: { unions: ["IF Metall"], employers: ["Industriarbetsgivarna"] }, employeeCount: 40000,
    validPeriod: "1 april 2025 – 31 mars 2027",
    summary: "I-avtalet gäller arbetare inom diverse industriföretag som inte täcks av mer specifika avtal inom IF Metalls område. Det är ett grundläggande industriavtal med timlön, OB-tillägg och skiftarbete. Avtalet följer industrins märke.",
    keyFacts: { minimumWage: "Från ca 24 500 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~40 kr/tim", obNight: "~80 kr/tim", obWeekend: "~80 kr/tim", obHoliday: "~150 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "Industriarbetare", minimum: "24 500 kr", median: "31 000 kr", comment: "Grundnivå" },
      { role: "Maskinoperatör", minimum: "25 000 kr", median: "32 500 kr", comment: "Med erfarenhet" },
    ],
    faq: [
      { question: "Vad är I-avtalet?", answer: "I-avtalet gäller arbetare inom industrin som inte täcks av Teknikavtalet eller andra specifika IF Metall-avtal. Det är ett brett avtal för diverse industriföretag." },
      { question: "Vilken lön ger I-avtalet?", answer: "Lägsta lön ca 24 500 kr/mån. Medianlön ca 31 000 kr. Skifttillägg och OB ger extra." },
      { question: "Hur skiljer sig I-avtalet från Teknikavtalet?", answer: "Teknikavtalet gäller teknikindustrin specifikt. I-avtalet täcker övrig industri inom IF Metalls område. Villkoren liknar varandra men detaljer kan skilja sig." },
      { question: "Vilken pension har jag?", answer: "Avtalspension SAF-LO." },
      { question: "Vilka OB-tillägg gäller?", answer: "Kväll ~40, natt ~80, helg ~80, storhelg ~150 kr/tim." },
    ],
    sources: [{ label: "IF Metall — I-avtalet", url: "https://www.ifmetall.se" }],
    relatedAgreements: ["teknikavtalet", "stal-och-metall", "gemensamma-metall"],
    aiSystemPrompt: `Du är en AI-expert på I-avtalet (Industriavtalet) — avtal för ~40 000 industriarbetare. Parter: IF Metall / Industriarbetsgivarna. Löner: min ~24 500 kr, median ~31 000 kr. OB: kväll ~40, natt ~80, helg ~80, storhelg ~150 kr/tim. Pension: SAF-LO.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan. Hitta ALDRIG på information.\n- Om du inte vet svaret, säg: "Jag har inte tillräcklig information. Kontakta IF Metall för exakt besked."\n- Gissa ALDRIG om siffror som inte finns i datan ovan.\n- Svara på svenska, kort och tydligt. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta IF Metall för bindande besked."`,
  },
  {
    slug: "stal-och-metall", name: "Stål- och Metallavtalet", shortName: "Stål & Metall", sector: "privat", sectorLabel: "Privat industri",
    parties: { unions: ["IF Metall"], employers: ["Stål och Metall Arbetsgivareförbundet"] }, employeeCount: 30000,
    validPeriod: "1 april 2025 – 31 mars 2027",
    summary: "Stål- och Metallavtalet (det s.k. Röda avtalet) gäller arbetare inom stål- och metallindustrin. Skiftarbete är vanligt. Timlön med OB-tillägg. Avtalet följer industrins märke.",
    keyFacts: { minimumWage: "Från ca 25 000 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~40 kr/tim", obNight: "~85 kr/tim", obWeekend: "~85 kr/tim", obHoliday: "~160 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar (36 vid ständigt treskift)" },
    wageTable: [
      { role: "Stålverksarbetare", minimum: "25 000 kr", median: "33 000 kr", comment: "Skift vanligt" },
      { role: "Smältverksoperatör", minimum: "26 000 kr", median: "35 000 kr", comment: "Specialiserad" },
    ],
    faq: [
      { question: "Vad är Röda avtalet?", answer: "Stål- och Metallavtalet kallas informellt 'Röda avtalet'. Det gäller stål- och metallindustrin." },
      { question: "Vilken lön?", answer: "Lägsta ca 25 000 kr. Median ca 33 000 kr. Skifttillägg ger mer." },
      { question: "Vilken pension?", answer: "Avtalspension SAF-LO." },
    ],
    sources: [{ label: "IF Metall — Stål och Metall", url: "https://www.ifmetall.se" }],
    relatedAgreements: ["teknikavtalet", "i-avtalet", "gemensamma-metall"],
    aiSystemPrompt: `Du är en AI-expert på Stål- och Metallavtalet ("Röda avtalet") — avtal för ~30 000 arbetare i stål/metallindustrin. Löner: min ~25 000 kr, median ~33 000 kr. OB: kväll ~40, natt ~85, helg ~85, storhelg ~160 kr/tim.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan. Hitta ALDRIG på.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta IF Metall för bindande besked."`,
  },
  {
    slug: "gemensamma-metall", name: "Gemensamma Metallavtalet", shortName: "Gemensamma Metall", sector: "privat", sectorLabel: "Privat industri",
    parties: { unions: ["IF Metall"], employers: ["Flera arbetsgivarförbund"] }, employeeCount: 20000,
    validPeriod: "1 april 2025 – 31 mars 2027",
    summary: "Gemensamma Metallavtalet är ett samlingsavtal för mindre industrigrenar inom IF Metalls område som inte har egna avtal.",
    keyFacts: { minimumWage: "Från ca 24 200 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~40 kr/tim", obNight: "~80 kr/tim", obWeekend: "~80 kr/tim", obHoliday: "~150 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Industriarbetare", minimum: "24 200 kr", median: "30 500 kr", comment: "Varierar med bransch" }],
    faq: [
      { question: "Vad är Gemensamma Metallavtalet?", answer: "Ett samlingsavtal för mindre industrigrenar inom IF Metalls område." },
      { question: "Vilken lön?", answer: "Lägsta ca 24 200 kr. Median ca 30 500 kr." },
    ],
    sources: [{ label: "IF Metall", url: "https://www.ifmetall.se" }],
    relatedAgreements: ["teknikavtalet", "i-avtalet", "stal-och-metall"],
    aiSystemPrompt: `Du är en AI-expert på Gemensamma Metallavtalet — samlingsavtal för ~20 000 arbetare i diverse industri. Löner: min ~24 200 kr, median ~30 500 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta IF Metall för bindande besked."`,
  },
  {
    slug: "glasavtalet-industri", name: "Glasindustriavtalet", shortName: "Glasavtalet", sector: "privat", sectorLabel: "Privat industri",
    parties: { unions: ["IF Metall"], employers: ["Glasindustrins arbetsgivare"] }, employeeCount: 5000,
    validPeriod: "1 april 2025 – 31 mars 2027",
    summary: "Glasindustriavtalet gäller glasblåsare och glasarbetare i industrin. Skiftarbete förekommer. Litet men specialiserat avtalsområde.",
    keyFacts: { minimumWage: "Från ca 24 500 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~40 kr/tim", obNight: "~80 kr/tim", obWeekend: "~80 kr/tim", obHoliday: "~150 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Glasarbetare", minimum: "24 500 kr", median: "30 000 kr", comment: "Specialiserat hantverk" }],
    faq: [{ question: "Vad är Glasavtalet?", answer: "Gäller glasblåsare och glasarbetare i industrin." }],
    sources: [{ label: "IF Metall — Glasavtalet", url: "https://www.ifmetall.se" }],
    relatedAgreements: ["teknikavtalet", "i-avtalet"],
    aiSystemPrompt: `Du är en AI-expert på Glasindustriavtalet — avtal för ~5 000 glasarbetare. Löner: min ~24 500 kr, median ~30 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta IF Metall för bindande besked."`,
  },
  {
    slug: "samhallsavtalet", name: "Samhallsavtalet", shortName: "Samhallsavtalet", sector: "privat", sectorLabel: "Samhall",
    parties: { unions: ["IF Metall", "Kommunal", "Handels", "Fastighets"], employers: ["Samhall AB"] }, employeeCount: 25000,
    validPeriod: "1 april 2025 – 31 mars 2027",
    summary: "Samhallsavtalet gäller anställda på Samhall AB, Sveriges största arbetsgivare för personer med funktionsnedsättning. Avtalet har anpassade villkor och skyddade anställningar. Flera fackförbund är parter.",
    keyFacts: { minimumWage: "Från ca 22 000 kr/mån", overtimeRate: "Enligt avtal", obWeekday: "Enligt avtal", obNight: "Enligt avtal", obWeekend: "Enligt avtal", obHoliday: "Enligt avtal", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar (anpassad arbetstid förekommer)" },
    wageTable: [
      { role: "Samhallsanställd", minimum: "22 000 kr", median: "24 500 kr", comment: "Anpassade villkor" },
      { role: "Arbetsledare Samhall", minimum: "27 000 kr", median: "31 000 kr", comment: "Med personalansvar" },
    ],
    faq: [
      { question: "Vad är Samhall?", answer: "Samhall AB är ett statligt ägt företag som skapar arbete för personer med funktionsnedsättning. Ca 25 000 anställda." },
      { question: "Vilken lön har Samhallsanställda?", answer: "Lägsta lön ca 22 000 kr/mån. Lönen kan vara anpassad efter individuella förutsättningar." },
      { question: "Vilken pension?", answer: "Avtalspension SAF-LO." },
    ],
    sources: [{ label: "IF Metall — Samhallsavtalet", url: "https://www.ifmetall.se" }, { label: "Samhall", url: "https://samhall.se" }],
    relatedAgreements: ["i-avtalet", "handelsavtalet", "fastighetsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Samhallsavtalet — avtal för ~25 000 anställda på Samhall AB. Löner: min ~22 000 kr. Pension: SAF-LO.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta IF Metall eller Kommunal för bindande besked."`,
  },
  {
    slug: "lager-ehandelsavtalet", name: "Lager- och E-handelsavtalet", shortName: "Lager & E-handel", sector: "privat", sectorLabel: "Privat handel",
    parties: { unions: ["Handelsanställdas förbund (Handels)"], employers: ["Svensk Handel"] }, employeeCount: 50000,
    validPeriod: "1 april 2025 – 31 mars 2027",
    summary: "Lager- och E-handelsavtalet gäller lagerarbetare och e-handelsmedarbetare i centrallager, separerat från Detaljhandelsavtalet. OB-tillägg, skiftarbete och arbetstidsförkortning är centrala delar.",
    keyFacts: { minimumWage: "Från ca 25 800 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~55 kr/tim", obNight: "~80 kr/tim", obWeekend: "~85–115 kr/tim", obHoliday: "~180 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "Lagerarbetare", minimum: "25 800 kr", median: "29 500 kr", comment: "Centrallager" },
      { role: "Orderplock/pack", minimum: "25 800 kr", median: "28 000 kr", comment: "E-handelslager" },
    ],
    faq: [
      { question: "Skiljer sig detta från Handelsavtalet?", answer: "Ja, Lager- och E-handelsavtalet gäller specifikt lager och e-handel, inte detaljhandel/butik." },
      { question: "Vilken lön?", answer: "Lägsta ca 25 800 kr. Median ca 29 500 kr." },
      { question: "Vilken pension?", answer: "Avtalspension SAF-LO." },
    ],
    sources: [{ label: "Handels", url: "https://handels.se" }],
    relatedAgreements: ["handelsavtalet", "transportavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Lager- och E-handelsavtalet — avtal för ~50 000 lager/e-handelsarbetare. Löner: min ~25 800 kr, median ~29 500 kr. OB: kväll ~55, natt ~80, helg ~85-115, storhelg ~180 kr/tim.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Handels för bindande besked."`,
  },
  {
    slug: "apoteksavtalet", name: "Apoteksavtalet", shortName: "Apoteksavtalet", sector: "privat", sectorLabel: "Privat handel",
    parties: { unions: ["Handelsanställdas förbund (Handels)"], employers: ["Svensk Handel"] }, employeeCount: 12000,
    validPeriod: "1 april 2025 – 31 mars 2027",
    summary: "Apoteksavtalet gäller apoteksanställda — farmaceuter, apotekstekniker och kassapersonal. OB-tillägg för kvälls- och helgöppet är en viktig del.",
    keyFacts: { minimumWage: "Från ca 25 000 kr/mån (apotekstekniker)", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~55 kr/tim", obNight: "~80 kr/tim", obWeekend: "~85–115 kr/tim", obHoliday: "~180 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "Apotekstekniker", minimum: "25 000 kr", median: "29 000 kr", comment: "Receptfri rådgivning" },
      { role: "Farmaceut (receptarie)", minimum: "32 000 kr", median: "38 000 kr", comment: "Recepthantering" },
    ],
    faq: [
      { question: "Vilken lön har apotekstekniker?", answer: "Lägsta ca 25 000 kr. Median ca 29 000 kr." },
      { question: "Vilken pension?", answer: "Avtalspension SAF-LO." },
    ],
    sources: [{ label: "Handels — Apoteksavtalet", url: "https://handels.se" }],
    relatedAgreements: ["handelsavtalet", "lager-ehandelsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Apoteksavtalet — avtal för ~12 000 apoteksanställda. Löner: apotekstekniker min ~25 000 kr, farmaceut median ~38 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Handels för bindande besked."`,
  },
  {
    slug: "frisorsavtalet", name: "Frisöravtalet", shortName: "Frisöravtalet", sector: "privat", sectorLabel: "Privat tjänste",
    parties: { unions: ["Handelsanställdas förbund (Handels)"], employers: ["Företagarna / Almega"] }, employeeCount: 15000,
    validPeriod: "2025–2027",
    summary: "Frisöravtalet gäller frisörer och skönhetsterapeuter. Provisionsbaserad lön är vanligt utöver fast grundlön.",
    keyFacts: { minimumWage: "Från ca 22 500 kr/mån", overtimeRate: "Enligt avtal", obWeekday: "Sällan aktuellt", obNight: "Sällan aktuellt", obWeekend: "Enligt avtal", obHoliday: "Enligt avtal", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–3 månader", pension: "ITP eller SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Frisör (anställd)", minimum: "22 500 kr", median: "27 000 kr", comment: "Provision kan tillkomma" }],
    faq: [{ question: "Vilken lön har frisörer?", answer: "Lägsta ca 22 500 kr. Median ca 27 000 kr. Provision ger ofta mer." }],
    sources: [{ label: "Handels", url: "https://handels.se" }],
    relatedAgreements: ["handelsavtalet", "almega-tjansteforetagen"],
    aiSystemPrompt: `Du är en AI-expert på Frisöravtalet — avtal för ~15 000 frisörer/skönhetsterapeuter. Löner: min ~22 500 kr, median ~27 000 kr. Provision vanligt.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Handels för bindande besked."`,
  },
  {
    slug: "visita-tjansteman", name: "Visita Tjänstemannaavtalet", shortName: "Visita Tjänstemän", sector: "privat", sectorLabel: "Privat hotell/restaurang",
    parties: { unions: ["Unionen"], employers: ["Visita"] }, employeeCount: 20000,
    validPeriod: "2025–2027",
    summary: "Visita Tjänstemannaavtalet gäller tjänstemän inom hotell- och restaurangbranschen — hotelldirektörer, receptionschefer, ekonomer. Individuell lönesättning.",
    keyFacts: { minimumWage: "Individuell lönesättning", overtimeRate: "Kan avtalas bort", obWeekday: "Sällan aktuellt", obNight: "Sällan aktuellt", obWeekend: "Sällan aktuellt", obHoliday: "Sällan aktuellt", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "Hotellchef", minimum: "Individuell", median: "42 000 kr", comment: "Med personalansvar" },
      { role: "Restaurangchef", minimum: "Individuell", median: "38 000 kr", comment: "Drift och personal" },
    ],
    faq: [{ question: "Vilken lön?", answer: "Individuell lönesättning. Hotellchefer median ~42 000 kr." }],
    sources: [{ label: "Unionen", url: "https://www.unionen.se" }, { label: "Visita", url: "https://www.visita.se" }],
    relatedAgreements: ["hotell-restaurang", "almega-tjansteforetagen"],
    aiSystemPrompt: `Du är en AI-expert på Visita Tjänstemannaavtalet — avtal för ~20 000 tjänstemän i hotell/restaurang. Individuell lönesättning. Pension: ITP.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Unionen för bindande besked."`,
  },
  {
    slug: "bussavtalet", name: "Bussavtalet", shortName: "Bussavtalet", sector: "privat", sectorLabel: "Privat transport",
    parties: { unions: ["Kommunal"], employers: ["Sveriges Bussföretag"] }, employeeCount: 25000,
    validPeriod: "2025–2027",
    summary: "Bussavtalet gäller busschaufförer i kollektivtrafik och linjetrafik. Delade turer, OB-tillägg och oregelbundna arbetstider är vanligt.",
    keyFacts: { minimumWage: "Från ca 27 000 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~50 kr/tim", obNight: "~85 kr/tim", obWeekend: "~85 kr/tim", obHoliday: "~170 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar (oregelbundet schema)" },
    wageTable: [{ role: "Busschaufför", minimum: "27 000 kr", median: "31 000 kr", comment: "Kollektivtrafik" }],
    faq: [
      { question: "Vilken lön har busschaufförer?", answer: "Lägsta ca 27 000 kr. Median ca 31 000 kr. OB-tillägg ger extra." },
      { question: "Vad är delade turer?", answer: "Du jobbar t.ex. morgon och eftermiddag med paus mitt på dagen. Vanligt i kollektivtrafik." },
    ],
    sources: [{ label: "Kommunal — Bussavtalet", url: "https://www.kommunal.se" }],
    relatedAgreements: ["transportavtalet", "taxiavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Bussavtalet — avtal för ~25 000 busschaufförer. Löner: min ~27 000 kr, median ~31 000 kr. OB: kväll ~50, natt ~85, helg ~85, storhelg ~170 kr/tim.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Kommunal för bindande besked."`,
  },
  {
    slug: "taxiavtalet", name: "Taxiavtalet", shortName: "Taxiavtalet", sector: "privat", sectorLabel: "Privat transport",
    parties: { unions: ["Transport"], employers: ["Svenska Taxiförbundet"] }, employeeCount: 10000,
    validPeriod: "2025–2027",
    summary: "Taxiavtalet gäller taxichaufförer. Lönen kan bestå av grundlön plus provision baserat på körningar.",
    keyFacts: { minimumWage: "Från ca 24 000 kr/mån + provision", overtimeRate: "Enligt avtal", obWeekday: "~40 kr/tim", obNight: "~70 kr/tim", obWeekend: "~70 kr/tim", obHoliday: "~140 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–3 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar (oregelbundet)" },
    wageTable: [{ role: "Taxichaufför", minimum: "24 000 kr", median: "28 000 kr", comment: "Exkl. provision" }],
    faq: [{ question: "Vilken lön?", answer: "Grundlön ca 24 000 kr + provision. Total inkomst varierar med antal körningar." }],
    sources: [{ label: "Transport", url: "https://www.transport.se" }],
    relatedAgreements: ["transportavtalet", "bussavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Taxiavtalet — avtal för ~10 000 taxichaufförer. Grundlön: min ~24 000 kr + provision.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Transport för bindande besked."`,
  },
  {
    slug: "flygsavtalet", name: "Flygavtalet", shortName: "Flygavtalet", sector: "privat", sectorLabel: "Privat flyg",
    parties: { unions: ["Seko", "Svensk Pilotförening"], employers: ["Svenska Flygbranschen"] }, employeeCount: 8000,
    validPeriod: "2025–2027",
    summary: "Flygavtalet gäller kabinpersonal och markpersonal inom flygbranschen. Speciella arbetstidsregler, tjänstgöringsperioder och vilobestämmelser.",
    keyFacts: { minimumWage: "Från ca 25 000 kr/mån (kabinpersonal)", overtimeRate: "Enligt avtal", obWeekday: "Enligt avtal", obNight: "Enligt avtal", obWeekend: "Enligt avtal", obHoliday: "Enligt avtal", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP", workHoursPerWeek: "Speciella flygtidsregler" },
    wageTable: [
      { role: "Kabinpersonal", minimum: "25 000 kr", median: "32 000 kr", comment: "Inkl. traktamente vid stopp" },
      { role: "Markpersonal", minimum: "26 000 kr", median: "30 000 kr", comment: "Incheck, baggage m.fl." },
    ],
    faq: [{ question: "Vilken lön har kabinpersonal?", answer: "Lägsta ca 25 000 kr. Median ca 32 000 kr. Traktamente vid utestationering tillkommer." }],
    sources: [{ label: "Seko", url: "https://www.seko.se" }],
    relatedAgreements: ["transportavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Flygavtalet — avtal för ~8 000 kabin/markpersonal. Löner: kabinpersonal min ~25 000 kr, median ~32 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Seko för bindande besked."`,
  },
  {
    slug: "energiavtalet", name: "Energiavtalet", shortName: "Energiavtalet", sector: "privat", sectorLabel: "Privat energi",
    parties: { unions: ["Seko", "IF Metall", "Unionen"], employers: ["Energiföretagens Arbetsgivareförening (EFA)"] }, employeeCount: 25000,
    validPeriod: "2025–2027",
    summary: "Energiavtalet gäller anställda inom elproduktion, elnät och fjärrvärme. Beredskapsarbete, jour och skiftarbete är vanligt. Flera fackförbund är parter.",
    keyFacts: { minimumWage: "Från ca 26 000 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~45 kr/tim", obNight: "~90 kr/tim", obWeekend: "~90 kr/tim", obHoliday: "~170 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP eller SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "Elnätstekniker", minimum: "26 000 kr", median: "34 000 kr", comment: "Fältarbete, beredskap" },
      { role: "Drifttekniker", minimum: "27 000 kr", median: "35 000 kr", comment: "Kraftverk" },
    ],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 26 000 kr. Median ca 34 000 kr. Beredskaps- och jourtillägg ger extra." }],
    sources: [{ label: "Seko — Energiavtalet", url: "https://www.seko.se" }],
    relatedAgreements: ["teknikavtalet", "installationsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Energiavtalet — avtal för ~25 000 anställda inom el/energi. Löner: min ~26 000 kr, median ~34 000 kr. OB: kväll ~45, natt ~90, helg ~90, storhelg ~170 kr/tim.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Seko eller IF Metall för bindande besked."`,
  },
  {
    slug: "kemiska-avtalet", name: "Kemiska industriavtalet", shortName: "Kemiavtalet", sector: "privat", sectorLabel: "Privat kemi",
    parties: { unions: ["IF Metall"], employers: ["IKEM (Innovations- och Kemiindustrierna)"] }, employeeCount: 30000,
    validPeriod: "1 april 2025 – 31 mars 2027",
    summary: "Kemiska industriavtalet gäller kemi-, läkemedels- och plastindustrin. Processindustri med skiftarbete. Avtalet följer industrins märke.",
    keyFacts: { minimumWage: "Från ca 25 000 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~40 kr/tim", obNight: "~85 kr/tim", obWeekend: "~85 kr/tim", obHoliday: "~160 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar (36 vid ständigt treskift)" },
    wageTable: [
      { role: "Processoperatör (kemi)", minimum: "25 000 kr", median: "34 000 kr", comment: "Skift vanligt" },
      { role: "Labbtekniker", minimum: "26 000 kr", median: "32 000 kr", comment: "Kvalitetskontroll" },
    ],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 25 000 kr. Median ca 34 000 kr. Skifttillägg ger mer." }],
    sources: [{ label: "IF Metall — Kemiavtalet", url: "https://www.ifmetall.se" }, { label: "IKEM", url: "https://www.ikem.se" }],
    relatedAgreements: ["teknikavtalet", "livsmedelsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Kemiska industriavtalet — avtal för ~30 000 arbetare i kemi/läkemedel/plast. Löner: min ~25 000 kr, median ~34 000 kr. OB: kväll ~40, natt ~85, helg ~85, storhelg ~160 kr/tim.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta IF Metall för bindande besked."`,
  },
  {
    slug: "pappers-avtalet", name: "Pappers- och massaindustriavtalet", shortName: "Pappersavtalet", sector: "privat", sectorLabel: "Privat skog/pappers",
    parties: { unions: ["Pappers (GS-facket)"], employers: ["Skogsindustrierna"] }, employeeCount: 15000,
    validPeriod: "2025–2027",
    summary: "Pappers- och massaindustriavtalet gäller pappersbruk och massaproduktion. Kontinuerligt skiftarbete med höga OB-tillägg.",
    keyFacts: { minimumWage: "Från ca 27 000 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~45 kr/tim", obNight: "~90 kr/tim", obWeekend: "~90 kr/tim", obHoliday: "~170 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "36 timmar vid ständigt skift" },
    wageTable: [{ role: "Pappersbruksarbetare", minimum: "27 000 kr", median: "34 000 kr", comment: "Kontinuerligt skift" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 27 000 kr. Median ca 34 000 kr. Höga skifttillägg." }],
    sources: [{ label: "Pappers / GS-facket", url: "https://www.gsfacket.se" }],
    relatedAgreements: ["skogsavtalet", "kemiska-avtalet"],
    aiSystemPrompt: `Du är en AI-expert på Pappers- och massaindustriavtalet — avtal för ~15 000 pappersbruksarbetare. Löner: min ~27 000 kr, median ~34 000 kr. Skift: 36 tim/v. OB: kväll ~45, natt ~90, helg ~90, storhelg ~170 kr/tim.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta GS-facket för bindande besked."`,
  },
  {
    slug: "lakare-kommun", name: "Läkaravtalet kommun/region", shortName: "Läkaravtalet", sector: "kommun_region", sectorLabel: "Kommun/region",
    parties: { unions: ["Sveriges Läkarförbund"], employers: ["SKR"] }, employeeCount: 45000,
    validPeriod: "Löpande med uppdateringar",
    summary: "Läkaravtalet gäller läkare i offentlig vård — i regioner och kommuner. Jouravtal, beredskap och specialisttillägg. Bland de högsta lönerna i kollektivavtalssystemet. Individuell lönesättning.",
    keyFacts: { minimumWage: "Individuell (AT-läkare från ca 35 000 kr)", overtimeRate: "Jour- och beredskapsersättning enligt avtal", obWeekday: "Jouravtal", obNight: "Jouravtal", obWeekend: "Jouravtal", obHoliday: "Jouravtal", vacationDays: "25–32 dagar beroende på ålder", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "KAP-KL/AKAP-KR", workHoursPerWeek: "40 timmar (jour utöver)" },
    wageTable: [
      { role: "AT-läkare", minimum: "35 000 kr", median: "38 000 kr", comment: "Under allmäntjänstgöring" },
      { role: "ST-läkare", minimum: "42 000 kr", median: "48 000 kr", comment: "Under specialisering" },
      { role: "Specialist", minimum: "55 000 kr", median: "72 000 kr", comment: "Erfaren specialist" },
    ],
    faq: [
      { question: "Vad tjänar en läkare?", answer: "AT-läkare ca 35 000-38 000 kr. ST-läkare ca 42 000-48 000 kr. Specialister median ~72 000 kr." },
      { question: "Hur fungerar jour?", answer: "Jourarbete ersätts utöver grundlönen. Jouravtalet reglerar ersättning för beredskap och aktiv jour." },
    ],
    sources: [{ label: "Sveriges Läkarförbund", url: "https://slf.se" }, { label: "SKR", url: "https://skr.se" }],
    relatedAgreements: ["ab-kommunalt", "hok-kommunal"],
    aiSystemPrompt: `Du är en AI-expert på Läkaravtalet kommun/region — avtal för ~45 000 läkare. Löner: AT ~35-38 000, ST ~42-48 000, specialist median ~72 000 kr. Pension: KAP-KL/AKAP-KR.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Sveriges Läkarförbund för bindande besked."`,
  },
  {
    slug: "tandvard-privat", name: "Tandvårdsavtalet privat", shortName: "Tandvård privat", sector: "privat", sectorLabel: "Privat vård",
    parties: { unions: ["Unionen", "Vision"], employers: ["Privattandläkarna"] }, employeeCount: 15000,
    validPeriod: "2025–2027",
    summary: "Tandvårdsavtalet gäller tandhygienister, tandsköterskor och receptionister på privata tandvårdskliniker.",
    keyFacts: { minimumWage: "Från ca 25 000 kr/mån (tandsköterska)", overtimeRate: "Enligt avtal", obWeekday: "Sällan aktuellt (dagtid)", obNight: "Sällan aktuellt", obWeekend: "Sällan aktuellt", obHoliday: "Enligt avtal", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "Tandsköterska", minimum: "25 000 kr", median: "29 000 kr", comment: "Assisterar tandläkare" },
      { role: "Tandhygienist", minimum: "32 000 kr", median: "37 000 kr", comment: "Självständig behandling" },
    ],
    faq: [{ question: "Vilken lön?", answer: "Tandsköterska median ~29 000 kr. Tandhygienist median ~37 000 kr." }],
    sources: [{ label: "Unionen", url: "https://www.unionen.se" }],
    relatedAgreements: ["vard-omsorg-privat", "almega-tjansteforetagen"],
    aiSystemPrompt: `Du är en AI-expert på Tandvårdsavtalet privat — avtal för ~15 000 tandvårdsanställda. Löner: tandsköterska min ~25 000 kr, tandhygienist median ~37 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Unionen för bindande besked."`,
  },
  {
    slug: "bevakningsavtalet", name: "Bevakningsavtalet", shortName: "Bevakningsavtalet", sector: "privat", sectorLabel: "Privat säkerhet",
    parties: { unions: ["Transport"], employers: ["Almega Säkerhetsföretagen"] }, employeeCount: 20000,
    validPeriod: "2025–2027",
    summary: "Bevakningsavtalet gäller väktare, ordningsvakter och säkerhetspersonal. Oregelbundna arbetstider med höga OB-tillägg och beredskapstillägg.",
    keyFacts: { minimumWage: "Från ca 25 500 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~50 kr/tim", obNight: "~100 kr/tim", obWeekend: "~100 kr/tim", obHoliday: "~180 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar (oregelbundet schema)" },
    wageTable: [
      { role: "Väktare", minimum: "25 500 kr", median: "30 000 kr", comment: "Bevakningsuppdrag" },
      { role: "Ordningsvakt", minimum: "26 000 kr", median: "31 000 kr", comment: "Event/nattliv" },
    ],
    faq: [{ question: "Vilken lön har väktare?", answer: "Lägsta ca 25 500 kr. Median ca 30 000 kr. OB-tillägg är en stor del av inkomsten." }],
    sources: [{ label: "Transport", url: "https://www.transport.se" }],
    relatedAgreements: ["transportavtalet", "fastighetsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Bevakningsavtalet — avtal för ~20 000 väktare/ordningsvakter. Löner: min ~25 500 kr, median ~30 000 kr. OB: kväll ~50, natt ~100, helg ~100, storhelg ~180 kr/tim.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Transport för bindande besked."`,
  },
  {
    slug: "gron-naringen", name: "Gröna Näringens Riksavtal", shortName: "Gröna Näringen", sector: "privat", sectorLabel: "Privat jordbruk",
    parties: { unions: ["Kommunal"], employers: ["Gröna Arbetsgivare"] }, employeeCount: 20000,
    validPeriod: "2025–2027",
    summary: "Gröna Näringens Riksavtal gäller anställda inom jordbruk, trädgård, djurskötsel och golfbanor. Säsongsarbete vanligt.",
    keyFacts: { minimumWage: "Från ca 24 000 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~35 kr/tim", obNight: "~70 kr/tim", obWeekend: "~70 kr/tim", obHoliday: "~140 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar (säsongsvariation)" },
    wageTable: [
      { role: "Lantarbetare", minimum: "24 000 kr", median: "28 000 kr", comment: "Jordbruk" },
      { role: "Djurskötare", minimum: "24 500 kr", median: "28 500 kr", comment: "Mjölkgård m.fl." },
    ],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 24 000 kr. Median ca 28 000 kr." }],
    sources: [{ label: "Kommunal", url: "https://www.kommunal.se" }],
    relatedAgreements: ["hok-kommunal", "skogsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Gröna Näringens Riksavtal — avtal för ~20 000 anställda inom jordbruk/trädgård. Löner: min ~24 000 kr, median ~28 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Kommunal för bindande besked."`,
  },
  {
    slug: "teateravtalet", name: "Teateravtalet", shortName: "Teateravtalet", sector: "privat", sectorLabel: "Privat kultur",
    parties: { unions: ["Teaterförbundet"], employers: ["Svensk Scenkonst"] }, employeeCount: 5000,
    validPeriod: "2025–2027",
    summary: "Teateravtalet gäller skådespelare, dansare, scentekniker och regissörer. Projektanställningar vanligt. Speciella regler för repetitioner och föreställningar.",
    keyFacts: { minimumWage: "Från ca 26 000 kr/mån", overtimeRate: "Enligt avtal", obWeekday: "~50 kr/tim (kväll)", obNight: "Sällan aktuellt", obWeekend: "~80 kr/tim", obHoliday: "~150 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP", workHoursPerWeek: "40 timmar (oregelbundet, kvällar)" },
    wageTable: [
      { role: "Skådespelare", minimum: "26 000 kr", median: "34 000 kr", comment: "Fast anställd" },
      { role: "Scentekniker", minimum: "25 000 kr", median: "31 000 kr", comment: "Ljus, ljud, scen" },
    ],
    faq: [{ question: "Vilken lön?", answer: "Skådespelare median ca 34 000 kr. Scentekniker median ca 31 000 kr." }],
    sources: [{ label: "Teaterförbundet", url: "https://www.teaterforbundet.se" }],
    relatedAgreements: ["mediaavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Teateravtalet — avtal för ~5 000 scenkonstarbetare. Löner: skådespelare median ~34 000 kr, scentekniker ~31 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Teaterförbundet för bindande besked."`,
  },
  {
    slug: "teleavtalet", name: "Telekom- och IT-serviceavtalet", shortName: "Teleavtalet", sector: "privat", sectorLabel: "Privat telekom",
    parties: { unions: ["Seko"], employers: ["Almega"] }, employeeCount: 15000,
    validPeriod: "2025–2027",
    summary: "Teleavtalet gäller tekniker inom telekommunikation — fälttekniker, kundtjänst och driftsoperatörer. OB vid beredskap.",
    keyFacts: { minimumWage: "Från ca 25 500 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~40 kr/tim", obNight: "~80 kr/tim", obWeekend: "~80 kr/tim", obHoliday: "~160 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "Fälttekniker (tele)", minimum: "25 500 kr", median: "32 000 kr", comment: "Installation/service" },
      { role: "Driftsoperatör", minimum: "27 000 kr", median: "33 000 kr", comment: "Nätövervakning" },
    ],
    faq: [{ question: "Vilken lön?", answer: "Fälttekniker median ca 32 000 kr. Driftsoperatör median ca 33 000 kr." }],
    sources: [{ label: "Seko", url: "https://www.seko.se" }],
    relatedAgreements: ["it-avtalet", "energiavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Teleavtalet — avtal för ~15 000 telekomtekniker. Löner: fälttekniker min ~25 500 kr, median ~32 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Seko för bindande besked."`,
  },
  {
    slug: "vag-banavtalet-seko", name: "Väg- och Banavtalet (Seko)", shortName: "Väg & Ban (Seko)", sector: "privat", sectorLabel: "Privat anläggning",
    parties: { unions: ["Seko"], employers: ["Byggföretagen"] }, employeeCount: 15000,
    validPeriod: "2025–2027",
    summary: "Väg- och Banavtalet gäller banarbetare vid järnvägsbyggen. Traktamente och reseersättning centralt. Nära kopplat till Väganläggningsavtalet men specifikt för Sekos medlemmar.",
    keyFacts: { minimumWage: "Från ca 27 000 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~45 kr/tim", obNight: "~90 kr/tim", obWeekend: "~90 kr/tim", obHoliday: "~180 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Byggnads avtalspension", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Banarbetare", minimum: "27 000 kr", median: "33 000 kr", comment: "Järnvägsunderhåll" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 27 000 kr. Median ca 33 000 kr plus traktamente." }],
    sources: [{ label: "Seko", url: "https://www.seko.se" }],
    relatedAgreements: ["vaganlaggningsavtalet", "byggavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Väg- och Banavtalet (Seko) — avtal för ~15 000 banarbetare/järnvägsbyggare. Löner: min ~27 000 kr, median ~33 000 kr. OB: kväll ~45, natt ~90, helg ~90, storhelg ~180 kr/tim.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Seko för bindande besked."`,
  },
  {
    slug: "fordonsavtalet", name: "Fordonsavtalet", shortName: "Fordonsavtalet", sector: "privat", sectorLabel: "Privat fordon",
    parties: { unions: ["IF Metall"], employers: ["Teknikarbetsgivarna (fordon)"] }, employeeCount: 35000,
    validPeriod: "1 april 2025 – 31 mars 2027",
    summary: "Fordonsavtalet gäller bilmekaniker, lackerare och fordonsreparatörer. Timlön med möjlighet till prestationslön.",
    keyFacts: { minimumWage: "Från ca 25 000 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~40 kr/tim", obNight: "~80 kr/tim", obWeekend: "~80 kr/tim", obHoliday: "~150 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "Bilmekaniker", minimum: "25 000 kr", median: "32 000 kr", comment: "Service och reparation" },
      { role: "Billackerare", minimum: "25 000 kr", median: "31 000 kr", comment: "Specialiserad" },
    ],
    faq: [{ question: "Vilken lön har bilmekaniker?", answer: "Lägsta ca 25 000 kr. Median ca 32 000 kr." }],
    sources: [{ label: "IF Metall — Fordonsavtalet", url: "https://www.ifmetall.se" }],
    relatedAgreements: ["teknikavtalet", "i-avtalet"],
    aiSystemPrompt: `Du är en AI-expert på Fordonsavtalet — avtal för ~35 000 bilmekaniker/fordonsreparatörer. Löner: min ~25 000 kr, median ~32 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta IF Metall för bindande besked."`,
  },
  {
    slug: "grafiska-avtalet", name: "Grafiska avtalet", shortName: "Grafiska avtalet", sector: "privat", sectorLabel: "Privat grafisk",
    parties: { unions: ["GS-facket"], employers: ["Grafiska Företagen"] }, employeeCount: 15000,
    validPeriod: "2025–2027",
    summary: "Grafiska avtalet gäller tryckeriarbetare, bokbindare och förpackningsindustrin. Skiftarbete förekommer.",
    keyFacts: { minimumWage: "Från ca 25 000 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~40 kr/tim", obNight: "~80 kr/tim", obWeekend: "~80 kr/tim", obHoliday: "~160 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "Tryckeriarbetare", minimum: "25 000 kr", median: "31 000 kr", comment: "Offset/digital" },
      { role: "Bokbindare", minimum: "24 500 kr", median: "29 000 kr", comment: "Efterbehandling" },
    ],
    faq: [{ question: "Vilken lön?", answer: "Tryckeriarbetare median ca 31 000 kr." }],
    sources: [{ label: "GS-facket", url: "https://www.gsfacket.se" }],
    relatedAgreements: ["skogsavtalet", "mediaavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Grafiska avtalet — avtal för ~15 000 tryckeri/förpackningsarbetare. Löner: min ~25 000 kr, median ~31 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta GS-facket för bindande besked."`,
  },
  {
    slug: "bemanningsavtalet-lo", name: "Bemanningsavtalet LO", shortName: "Bemanning LO", sector: "privat", sectorLabel: "Privat bemanning",
    parties: { unions: ["Samtliga LO-förbund"], employers: ["Kompetensföretagen (Almega)"] }, employeeCount: 100000,
    validPeriod: "2025–2027",
    summary: "Bemanningsavtalet LO är det gemensamma avtalet för alla LO-anslutna bemanningsanställda oavsett bransch. Lön ska motsvara jämförbar anställning hos kundföretaget (likalöneprincipen).",
    keyFacts: { minimumWage: "Ska motsvara kundföretagets nivå", overtimeRate: "Enligt kundföretagets avtal", obWeekday: "Enligt kundföretagets avtal", obNight: "Enligt kundföretagets avtal", obWeekend: "Enligt kundföretagets avtal", obHoliday: "Enligt kundföretagets avtal", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "Uthyrd LO-arbetare", minimum: "Jämförbar nivå", median: "29 000 kr", comment: "Varierar med kundföretag" },
    ],
    faq: [
      { question: "Vad är likalöneprincipen?", answer: "Din lön ska motsvara vad en jämförbar anställd hos kundföretaget tjänar. Du ska inte tjäna mindre för att du är uthyrd." },
      { question: "Skiljer sig detta från Bemanningsavtalet Unionen?", answer: "Bemanningsavtalet LO gäller alla LO-anslutna (arbetare), medan Unionens avtal gäller tjänstemän." },
    ],
    sources: [{ label: "LO — Bemanningsavtalet", url: "https://www.lo.se" }],
    relatedAgreements: ["bemanningsavtalet", "handelsavtalet", "byggavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Bemanningsavtalet LO — gemensamt avtal för ~100 000 LO-anslutna bemanningsanställda. Likalöneprincipen: lön ska motsvara kundföretagets nivå.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta ditt LO-förbund för bindande besked."`,
  },
  // === AVTAL 51-75 ===
  {
    slug: "glasmasteriavtalet", name: "Glasmästeriavtalet", shortName: "Glasmästeriavtalet", sector: "privat", sectorLabel: "Privat bygg",
    parties: { unions: ["Byggnads"], employers: ["Glasbranschföreningen"] }, employeeCount: 2500,
    validPeriod: "1 juni 2025 – 31 maj 2027",
    summary: "Glasmästeriavtalet gäller glasmästare och glasmontörer. Montage av fönster, glasfasader och duschväggar. Timlöneavtal med grundlön 193,50 kr/tim (år 1), 199,70 kr/tim (år 2). Ackord möjligt. Traktamente vid arbete på annan ort.",
    keyFacts: { minimumWage: "Timlön: 193,50 kr/tim (år 1), 199,70 kr/tim (år 2)", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~45 kr/tim", obNight: "~90 kr/tim", obWeekend: "~90 kr/tim", obHoliday: "~180 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Byggnads avtalspension", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "Glasmästare (år 1)", minimum: "193,50 kr/tim", median: "ca 220 kr/tim", comment: "Grundlön. Ackord ger mer." },
      { role: "Glasmästare (år 2)", minimum: "199,70 kr/tim", median: "ca 228 kr/tim", comment: "Grundlön. Ackord ger mer." },
    ],
    faq: [
      { question: "Vilken timlön har glasmästare?", answer: "Grundlön 193,50 kr/tim (år 1), 199,70 kr/tim (år 2). Utgående lön höjs med 6,97 kr/tim år 1." },
      { question: "Vilken pension?", answer: "Byggnads avtalspension." },
    ],
    sources: [{ label: "Byggnads — Glasmästeriavtalet", url: "https://www.byggnads.se" }],
    relatedAgreements: ["byggavtalet", "plat-ventilationsavtalet", "installationsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Glasmästeriavtalet — avtal för ~2 500 glasmästare/montörer. Grundlön: 193,50 kr/tim (år 1), 199,70 kr/tim (år 2). Pension: Byggnads.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Byggnads för bindande besked."`,
  },
  {
    slug: "entreprenadmaskinavtalet", name: "Entreprenadmaskinavtalet", shortName: "Entreprenadmaskin", sector: "privat", sectorLabel: "Privat bygg",
    parties: { unions: ["Byggnads"], employers: ["Maskinentreprenörerna (ME)"] }, employeeCount: 5000,
    validPeriod: "1 juni 2025 – 31 maj 2027",
    summary: "Entreprenadmaskinavtalet gäller maskinförare inom entreprenad — grävmaskiner, hjullastare, dumprar. Timlöneavtal med grundlön ca 195 kr/tim (yrkesarbetare). Riktad lönesatsning mot tornkranförare.",
    keyFacts: { minimumWage: "Timlön: ca 195 kr/tim (yrkesarbetare)", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~45 kr/tim", obNight: "~90 kr/tim", obWeekend: "~90 kr/tim", obHoliday: "~180 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Byggnads avtalspension", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "Yrkesarbetare (maskinförare)", minimum: "ca 195 kr/tim", median: "ca 230 kr/tim", comment: "Grundlön fd-tal 1,0 = ca 33 930 kr/mån" },
      { role: "Tornkranförare", minimum: "ca 243–253 kr/tim", median: "ca 265 kr/tim", comment: "Riktad lönesatsning" },
    ],
    faq: [
      { question: "Vilken timlön har maskinförare?", answer: "Grundlön ca 195 kr/tim (yrkesarbetare). Tornkranförare ca 243-253 kr/tim beroende på ort." },
      { question: "Vilken pension?", answer: "Byggnads avtalspension." },
    ],
    sources: [{ label: "Byggnads — Entreprenadmaskinavtalet", url: "https://www.byggnads.se" }],
    relatedAgreements: ["byggavtalet", "vaganlaggningsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Entreprenadmaskinavtalet — avtal för ~5 000 maskinförare. Grundlön: ca 195 kr/tim (yrkesarbetare). Tornkranförare: 243-253 kr/tim.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Byggnads för bindande besked."`,
  },
  {
    slug: "plat-ventilationsavtalet", name: "Plåt- och Ventilationsavtalet", shortName: "Plåt & Vent", sector: "privat", sectorLabel: "Privat bygg",
    parties: { unions: ["Byggnads"], employers: ["Plåt & Ventföretagen"] }, employeeCount: 8000,
    validPeriod: "1 maj 2025 – 30 april 2027",
    summary: "Plåt- och Ventilationsavtalet gäller plåtslagare och ventilationsmontörer. Timlöneavtal med lägsta lön 194,50 kr/tim (år 1), 201,60 kr/tim (år 2). Ackordsprislista för byggnadsplåt och ventilation.",
    keyFacts: { minimumWage: "Timlön: 194,50 kr/tim (år 1), 201,60 kr/tim (år 2)", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~45 kr/tim", obNight: "~90 kr/tim", obWeekend: "~90 kr/tim", obHoliday: "~180 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Byggnads avtalspension", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "Plåtslagare/ventilationsmontör (år 1)", minimum: "194,50 kr/tim", median: "ca 230 kr/tim", comment: "Timlön. Ackord ger mer." },
      { role: "Plåtslagare/ventilationsmontör (år 2)", minimum: "201,60 kr/tim", median: "ca 238 kr/tim", comment: "Timlön. Ackord ger mer." },
    ],
    faq: [
      { question: "Vilken timlön?", answer: "Lägsta lön 194,50 kr/tim (år 1), 201,60 kr/tim (år 2)." },
      { question: "Vilken pension?", answer: "Byggnads avtalspension." },
    ],
    sources: [{ label: "Byggnads — Plåt & Vent", url: "https://www.byggnads.se" }],
    relatedAgreements: ["byggavtalet", "installationsavtalet", "glasmasteriavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Plåt- och Ventilationsavtalet — avtal för ~8 000 plåtslagare/ventilationsmontörer. Lägsta lön: 194,50 kr/tim (år 1), 201,60 kr/tim (år 2).\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Byggnads för bindande besked."`,
  },
  {
    slug: "maleriavtalet", name: "Måleriavtalet", shortName: "Måleriavtalet", sector: "privat", sectorLabel: "Privat bygg",
    parties: { unions: ["Byggnads"], employers: ["Måleriföretagen"] }, employeeCount: 14000,
    validPeriod: "1 maj 2025 – 30 april 2027",
    summary: "Måleriavtalet gäller målare och lackerare inom bygg. Timlöneavtal med garantilön 200 kr/tim (år 1), 205 kr/tim (år 2) och lägsta tidlön 205,25 kr/tim (år 1), 211,45 kr/tim (år 2). Ackord enligt riksprislista är den normala löneformen.",
    keyFacts: { minimumWage: "Timlön: lägsta tidlön 205,25 kr/tim (år 1), 211,45 kr/tim (år 2)", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~45 kr/tim", obNight: "~90 kr/tim", obWeekend: "~90 kr/tim", obHoliday: "~180 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Byggnads avtalspension", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "Målare — garantilön (år 1)", minimum: "200 kr/tim", median: "ca 230 kr/tim", comment: "Sthlm +5%. Ackord ger mer." },
      { role: "Målare — lägsta tidlön (år 1)", minimum: "205,25 kr/tim", median: "ca 235 kr/tim", comment: "Färdigutbildad målare" },
      { role: "Målare — lägsta tidlön (år 2)", minimum: "211,45 kr/tim", median: "ca 242 kr/tim", comment: "Färdigutbildad målare" },
    ],
    faq: [
      { question: "Vilken timlön har målare?", answer: "Garantilön 200 kr/tim, lägsta tidlön 205,25 kr/tim (år 1). Stockholm ger 5% tillägg." },
      { question: "Vad är skillnaden mellan garantilön och lägsta tidlön?", answer: "Garantilön är golvet vid ackord. Lägsta tidlön gäller vid tidarbete." },
      { question: "Vilken pension?", answer: "Byggnads avtalspension." },
    ],
    sources: [{ label: "Byggnads — Måleriavtalet", url: "https://www.byggnads.se" }],
    relatedAgreements: ["byggavtalet", "plat-ventilationsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Måleriavtalet — avtal för ~14 000 målare/lackerare. Garantilön: 200 kr/tim (år 1), 205 kr/tim (år 2). Lägsta tidlön: 205,25 kr/tim (år 1), 211,45 kr/tim (år 2). Stockholm +5%.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Byggnads för bindande besked."`,
  },
  {
    slug: "laraavtalet", name: "Läraravtalet (HÖK Sveriges Lärare)", shortName: "Läraravtalet", sector: "kommun_region", sectorLabel: "Kommun/region",
    parties: { unions: ["Sveriges Lärare (Lärarförbundet + Lärarnas Riksförbund)"], employers: ["SKR", "Sobona"] }, employeeCount: 250000,
    validPeriod: "1 april 2025 – 31 mars 2027",
    summary: "Läraravtalet gäller lärare i kommunala skolor. Individuell lönesättning, ferietjänst (sommarledigt med lön). Bland de mest diskuterade avtalen — lärarbrist driver löner uppåt.",
    keyFacts: { minimumWage: "Individuell lönesättning (nyanställd lärare ca 30 000 kr)", overtimeRate: "Första 2 tim: 180%, därefter 200%", obWeekday: "Sällan aktuellt (dagtid)", obNight: "Sällan aktuellt", obWeekend: "Sällan aktuellt", obHoliday: "Sällan aktuellt", vacationDays: "25–32 dagar + ferietid", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "KAP-KL/AKAP-KR", workHoursPerWeek: "40 timmar (varav ca 21 undervisningstimmar)" },
    wageTable: [
      { role: "Grundskollärare", minimum: "ca 30 000 kr", median: "37 000 kr", comment: "Individuell lön" },
      { role: "Gymnasielärare", minimum: "ca 31 000 kr", median: "39 000 kr", comment: "Individuell lön" },
      { role: "Förskollärare", minimum: "ca 29 000 kr", median: "33 000 kr", comment: "Individuell lön" },
    ],
    faq: [
      { question: "Vilken lön har lärare?", answer: "Individuell lönesättning. Grundskollärare median ~37 000 kr, gymnasielärare ~39 000 kr." },
      { question: "Har lärare sommarlov med lön?", answer: "Ja, ferieanställning innebär lön hela året, inklusive ferietid under sommar och lov." },
    ],
    sources: [{ label: "Sveriges Lärare", url: "https://www.sverigeslarare.se" }, { label: "SKR", url: "https://skr.se" }],
    relatedAgreements: ["ab-kommunalt", "hok-kommunal", "hok-vision"],
    aiSystemPrompt: `Du är en AI-expert på Läraravtalet — avtal för ~250 000 lärare i kommun/region. Individuell lönesättning. Grundskollärare median ~37 000 kr, gymnasielärare ~39 000 kr. Pension: KAP-KL/AKAP-KR.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Sveriges Lärare för bindande besked."`,
  },
  {
    slug: "sjukskoterska-avtal", name: "Sjuksköterskevillkor (HÖK Vårdförbundet)", shortName: "Sjuksköterska-avtal", sector: "kommun_region", sectorLabel: "Kommun/region",
    parties: { unions: ["Vårdförbundet"], employers: ["SKR", "Sobona"] }, employeeCount: 90000,
    validPeriod: "1 april 2025 – 31 mars 2027",
    summary: "HÖK Vårdförbundet gäller sjuksköterskor, barnmorskor och biomedicinska analytiker i offentlig vård. OB-tillägg centralt, personalbrist driver löner uppåt.",
    keyFacts: { minimumWage: "Individuell (nyanställd ssk ca 31 000 kr)", overtimeRate: "Första 2 tim: 180%, därefter 200%", obWeekday: "~100 kr/tim", obNight: "~140 kr/tim", obWeekend: "~140 kr/tim", obHoliday: "~200 kr/tim", vacationDays: "25–32 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "KAP-KL/AKAP-KR", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "Sjuksköterska", minimum: "31 000 kr", median: "38 000 kr", comment: "Grundutbildad" },
      { role: "Specialistsjuksköterska", minimum: "35 000 kr", median: "43 000 kr", comment: "IVA, anestesi m.fl." },
      { role: "Barnmorska", minimum: "33 000 kr", median: "40 000 kr", comment: "Förlossning/MVC" },
    ],
    faq: [
      { question: "Vilken lön har sjuksköterskor?", answer: "Median ~38 000 kr. Specialister ~43 000 kr. OB tillkommer." },
      { question: "Vilken pension?", answer: "KAP-KL/AKAP-KR." },
    ],
    sources: [{ label: "Vårdförbundet", url: "https://www.vardforbundet.se" }, { label: "SKR", url: "https://skr.se" }],
    relatedAgreements: ["ab-kommunalt", "hok-kommunal", "lakare-kommun"],
    aiSystemPrompt: `Du är en AI-expert på HÖK Vårdförbundet — avtal för ~90 000 sjuksköterskor/barnmorskor. Löner: ssk median ~38 000 kr, specialist ~43 000 kr. OB: kväll ~100, natt ~140, helg ~140, storhelg ~200 kr/tim.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Vårdförbundet för bindande besked."`,
  },
  {
    slug: "capio-avtal", name: "Privat sjukvård (Vårdföretagarna)", shortName: "Privat sjukvård", sector: "privat", sectorLabel: "Privat vård",
    parties: { unions: ["Vårdförbundet", "Läkarförbundet"], employers: ["Vårdföretagarna"] }, employeeCount: 30000,
    validPeriod: "2025–2027",
    summary: "Gäller sjuksköterskor och läkare i privat sjukvård (Capio, Aleris, Praktikertjänst). Ofta bättre grundlön men lägre OB jämfört med offentlig sektor.",
    keyFacts: { minimumWage: "Individuell lönesättning", overtimeRate: "Enligt avtal", obWeekday: "~80 kr/tim", obNight: "~120 kr/tim", obWeekend: "~120 kr/tim", obHoliday: "~170 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "Sjuksköterska (privat)", minimum: "32 000 kr", median: "39 000 kr", comment: "Ofta högre grundlön" },
      { role: "Läkare (privat)", minimum: "50 000 kr", median: "68 000 kr", comment: "Specialist" },
    ],
    faq: [{ question: "Är lönen bättre i privat vård?", answer: "Grundlönen kan vara högre men OB-tillägg är ofta lägre. Pension via ITP istället för KAP-KL." }],
    sources: [{ label: "Vårdföretagarna", url: "https://www.vardforetagarna.se" }],
    relatedAgreements: ["vard-omsorg-privat", "sjukskoterska-avtal", "lakare-kommun"],
    aiSystemPrompt: `Du är en AI-expert på avtalet för privat sjukvård — ~30 000 anställda (Capio, Aleris m.fl.). Ssk median ~39 000 kr, läkare ~68 000 kr. OB lägre än offentlig.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Vårdförbundet för bindande besked."`,
  },
  {
    slug: "konsultavtalet", name: "Konsult- och Bemanningsavtalet", shortName: "Konsultavtalet", sector: "privat", sectorLabel: "Privat tjänste",
    parties: { unions: ["Unionen", "Akademikerförbunden"], employers: ["Almega Kompetensföretagen"] }, employeeCount: 60000,
    validPeriod: "2025–2027",
    summary: "Gäller managementkonsulter och IT-konsulter uthyrda via konsultbolag. Sifferlöst avtal med individuell lönesättning.",
    keyFacts: { minimumWage: "Sifferlöst — individuell lönesättning", overtimeRate: "Kan avtalas bort", obWeekday: "Enligt lokal överenskommelse", obNight: "Enligt lokal överenskommelse", obWeekend: "Enligt lokal överenskommelse", obHoliday: "Enligt lokal överenskommelse", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "Managementkonsult", minimum: "Sifferlöst", median: "48 000 kr", comment: "Varierar stort" },
      { role: "IT-konsult (uthyrd)", minimum: "Sifferlöst", median: "50 000 kr", comment: "Senior = mer" },
    ],
    faq: [{ question: "Vilken lön?", answer: "Sifferlöst avtal. Managementkonsulter median ~48 000 kr, IT-konsulter ~50 000 kr." }],
    sources: [{ label: "Unionen", url: "https://www.unionen.se" }],
    relatedAgreements: ["almega-tjansteforetagen", "bemanningsavtalet", "it-avtalet"],
    aiSystemPrompt: `Du är en AI-expert på Konsultavtalet — sifferlöst avtal för ~60 000 konsulter. Pension: ITP.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Unionen för bindande besked."`,
  },
  {
    slug: "callcenter-avtalet", name: "Call/Contactcenter-avtalet", shortName: "Callcenter", sector: "privat", sectorLabel: "Privat tjänste",
    parties: { unions: ["Unionen"], employers: ["Almega Tjänsteföretagen"] }, employeeCount: 15000,
    validPeriod: "2025–2027",
    summary: "Gäller kundtjänstmedarbetare i callcenter. Skiftarbete, mätetal, obekväma arbetstider.",
    keyFacts: { minimumWage: "Från ca 23 500 kr/mån", overtimeRate: "Enligt avtal", obWeekday: "~40 kr/tim", obNight: "~70 kr/tim", obWeekend: "~70 kr/tim", obHoliday: "~140 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Kundtjänstmedarbetare", minimum: "23 500 kr", median: "27 000 kr", comment: "Callcenter" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 23 500 kr. Median ca 27 000 kr." }],
    sources: [{ label: "Unionen", url: "https://www.unionen.se" }],
    relatedAgreements: ["almega-tjansteforetagen", "it-avtalet"],
    aiSystemPrompt: `Du är en AI-expert på Callcenter-avtalet — avtal för ~15 000 kundtjänstmedarbetare. Löner: min ~23 500 kr, median ~27 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Unionen för bindande besked."`,
  },
  {
    slug: "reklamavtalet", name: "Medie- och Reklamavtalet", shortName: "Reklamavtalet", sector: "privat", sectorLabel: "Privat media",
    parties: { unions: ["Unionen"], employers: ["Almega Medieföretagen"] }, employeeCount: 20000,
    validPeriod: "2025–2027",
    summary: "Gäller reklambyråer, PR-byråer, medieproduktionsbolag. Kreativa branscher med projektbaserat arbete. Individuell lönesättning.",
    keyFacts: { minimumWage: "Individuell lönesättning", overtimeRate: "Kan avtalas bort", obWeekday: "Sällan aktuellt", obNight: "Sällan aktuellt", obWeekend: "Sällan aktuellt", obHoliday: "Sällan aktuellt", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "Art director", minimum: "Individuell", median: "40 000 kr", comment: "Reklambyrå" },
      { role: "Projektledare (reklam)", minimum: "Individuell", median: "38 000 kr", comment: "Kundkontakt" },
    ],
    faq: [{ question: "Vilken lön?", answer: "Individuell. Art director median ~40 000 kr." }],
    sources: [{ label: "Unionen", url: "https://www.unionen.se" }],
    relatedAgreements: ["almega-tjansteforetagen", "mediaavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Medie- och Reklamavtalet — avtal för ~20 000 anställda på reklambyråer/PR. Individuell lönesättning.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Unionen för bindande besked."`,
  },
  {
    slug: "fastighetsanstallda-privat", name: "Fastighetsskötsel Fastigo", shortName: "Fastigo", sector: "privat", sectorLabel: "Privat fastighet",
    parties: { unions: ["Fastighets"], employers: ["Fastigo"] }, employeeCount: 25000,
    validPeriod: "2025–2027",
    summary: "Gäller fastighetsskötare, driftstekniker och städare i privata fastighetsbolag. OB och beredskap.",
    keyFacts: { minimumWage: "Från ca 25 000 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~40 kr/tim", obNight: "~75 kr/tim", obWeekend: "~75 kr/tim", obHoliday: "~150 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Fastighetsskötare", minimum: "25 000 kr", median: "31 000 kr", comment: "Drift och underhåll" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 25 000 kr. Median ca 31 000 kr." }],
    sources: [{ label: "Fastighets", url: "https://www.fastighets.se" }, { label: "Fastigo", url: "https://www.fastigo.se" }],
    relatedAgreements: ["fastighetsavtalet", "serviceavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Fastigo-avtalet — avtal för ~25 000 fastighetsskötare. Löner: min ~25 000 kr, median ~31 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Fastighets för bindande besked."`,
  },
  {
    slug: "mejeriavtalet", name: "Mejeriavtalet", shortName: "Mejeriavtalet", sector: "privat", sectorLabel: "Privat livsmedel",
    parties: { unions: ["Livs"], employers: ["Livsmedelsföretagen"] }, employeeCount: 8000,
    validPeriod: "2025–2027",
    summary: "Gäller anställda på mejerier (Arla, Skånemejerier). Kontinuerlig drift, skiftarbete, höga hygienkrav.",
    keyFacts: { minimumWage: "Från ca 26 500 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~40 kr/tim", obNight: "~80 kr/tim", obWeekend: "~80 kr/tim", obHoliday: "~160 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar (36 vid treskift)" },
    wageTable: [{ role: "Mejeriarbetare", minimum: "26 500 kr", median: "31 500 kr", comment: "Skift vanligt" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 26 500 kr. Median ca 31 500 kr. Skifttillägg ger mer." }],
    sources: [{ label: "Livs", url: "https://www.livs.se" }],
    relatedAgreements: ["livsmedelsavtalet", "slakteriavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Mejeriavtalet — avtal för ~8 000 mejeriarbetare. Löner: min ~26 500 kr, median ~31 500 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Livs för bindande besked."`,
  },
  {
    slug: "slakteriavtalet", name: "Slakteriavtalet", shortName: "Slakteriavtalet", sector: "privat", sectorLabel: "Privat livsmedel",
    parties: { unions: ["Livs"], employers: ["KFO"] }, employeeCount: 10000,
    validPeriod: "2025–2027",
    summary: "Gäller slakteri- och charkuteriarbetare. Fysiskt krävande arbete, ackordslön vanligt.",
    keyFacts: { minimumWage: "Från ca 27 000 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~40 kr/tim", obNight: "~80 kr/tim", obWeekend: "~80 kr/tim", obHoliday: "~160 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Slakteriarbetare", minimum: "27 000 kr", median: "32 000 kr", comment: "Ackord vanligt" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 27 000 kr. Median ca 32 000 kr. Ackord ger mer." }],
    sources: [{ label: "Livs", url: "https://www.livs.se" }],
    relatedAgreements: ["livsmedelsavtalet", "mejeriavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Slakteriavtalet — avtal för ~10 000 slakteriarbetare. Löner: min ~27 000 kr, median ~32 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Livs för bindande besked."`,
  },
  {
    slug: "sagverksavtalet", name: "Sågverksavtalet", shortName: "Sågverksavtalet", sector: "privat", sectorLabel: "Privat skog/trä",
    parties: { unions: ["GS-facket"], employers: ["Trä- och Möbelindustriförbundet"] }, employeeCount: 12000,
    validPeriod: "2025–2027",
    summary: "Gäller sågverksarbetare och snickeriarbetare. Processindustri med skiftarbete.",
    keyFacts: { minimumWage: "Från ca 26 000 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~40 kr/tim", obNight: "~80 kr/tim", obWeekend: "~80 kr/tim", obHoliday: "~160 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Sågverksarbetare", minimum: "26 000 kr", median: "31 000 kr", comment: "Skift vanligt" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 26 000 kr. Median ca 31 000 kr." }],
    sources: [{ label: "GS-facket", url: "https://www.gsfacket.se" }],
    relatedAgreements: ["skogsavtalet", "mobelavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Sågverksavtalet — avtal för ~12 000 sågverksarbetare. Löner: min ~26 000 kr, median ~31 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta GS-facket för bindande besked."`,
  },
  {
    slug: "mobelavtalet", name: "Möbelindustriavtalet", shortName: "Möbelavtalet", sector: "privat", sectorLabel: "Privat skog/trä",
    parties: { unions: ["GS-facket"], employers: ["Trä- och Möbelindustriförbundet"] }, employeeCount: 8000,
    validPeriod: "2025–2027",
    summary: "Gäller möbeltillverkning. Timlön + ackord.",
    keyFacts: { minimumWage: "Från ca 25 000 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~40 kr/tim", obNight: "~80 kr/tim", obWeekend: "~80 kr/tim", obHoliday: "~160 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Möbelsnickare", minimum: "25 000 kr", median: "30 000 kr", comment: "Timlön + ackord" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 25 000 kr. Median ca 30 000 kr." }],
    sources: [{ label: "GS-facket", url: "https://www.gsfacket.se" }],
    relatedAgreements: ["skogsavtalet", "sagverksavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Möbelavtalet — avtal för ~8 000 möbelarbetare. Löner: min ~25 000 kr, median ~30 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta GS-facket för bindande besked."`,
  },
  {
    slug: "postavtalet", name: "Postavtalet", shortName: "Postavtalet", sector: "privat", sectorLabel: "Privat post/logistik",
    parties: { unions: ["Seko"], employers: ["Almega (PostNord)"] }, employeeCount: 25000,
    validPeriod: "2025–2027",
    summary: "Gäller brevbärare, paketchaufförer och sorterare på PostNord. Tidiga morgnar, OB, oregelbundna turer.",
    keyFacts: { minimumWage: "Från ca 25 000 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~45 kr/tim (tidig morgon)", obNight: "~80 kr/tim", obWeekend: "~80 kr/tim", obHoliday: "~160 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar (oregelbundet)" },
    wageTable: [
      { role: "Brevbärare", minimum: "25 000 kr", median: "29 000 kr", comment: "Tidiga morgnar" },
      { role: "Paketchaufför", minimum: "26 000 kr", median: "30 000 kr", comment: "Ökande volym" },
    ],
    faq: [{ question: "Vilken lön har brevbärare?", answer: "Lägsta ca 25 000 kr. Median ca 29 000 kr. OB för tidiga mornar." }],
    sources: [{ label: "Seko", url: "https://www.seko.se" }],
    relatedAgreements: ["transportavtalet", "teleavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Postavtalet — avtal för ~25 000 PostNord-anställda. Löner: brevbärare min ~25 000 kr, median ~29 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Seko för bindande besked."`,
  },
  {
    slug: "teliaavtalet", name: "Telekommunikationsavtalet", shortName: "Telekomavtalet", sector: "privat", sectorLabel: "Privat telekom",
    parties: { unions: ["Seko", "Unionen"], employers: ["Almega IT&Telekomföretagen"] }, employeeCount: 15000,
    validPeriod: "2025–2027",
    summary: "Gäller tekniker och kundtjänst på Telia, Tele2, Telenor. Beredskap, jour, fältarbete.",
    keyFacts: { minimumWage: "Från ca 26 000 kr/mån", overtimeRate: "Enligt avtal", obWeekday: "~40 kr/tim", obNight: "~80 kr/tim", obWeekend: "~80 kr/tim", obHoliday: "~160 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP eller SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Telekomtekniker", minimum: "26 000 kr", median: "33 000 kr", comment: "Beredskap ger extra" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 26 000 kr. Median ca 33 000 kr." }],
    sources: [{ label: "Seko", url: "https://www.seko.se" }],
    relatedAgreements: ["teleavtalet", "it-avtalet"],
    aiSystemPrompt: `Du är en AI-expert på Telekomavtalet — avtal för ~15 000 telekomtekniker. Löner: min ~26 000 kr, median ~33 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Seko för bindande besked."`,
  },
  {
    slug: "polisavtalet", name: "Polisavtalet", shortName: "Polisavtalet", sector: "stat", sectorLabel: "Statlig sektor",
    parties: { unions: ["Polisförbundet"], employers: ["Arbetsgivarverket"] }, employeeCount: 35000,
    validPeriod: "2025–2027",
    summary: "Gäller poliser specifikt. Bland de mest komplexa OB-systemen med tillägg för kväll, natt, helg, beredskap och risktillägg.",
    keyFacts: { minimumWage: "Lokal lönerevision (grundutb polis ca 30 000 kr)", overtimeRate: "Enligt ALFA", obWeekday: "~60 kr/tim", obNight: "~100 kr/tim", obWeekend: "~100 kr/tim", obHoliday: "~180 kr/tim", vacationDays: "28–35 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "PA 16", workHoursPerWeek: "39 tim 45 min (skift)" },
    wageTable: [
      { role: "Polis (grundutbildad)", minimum: "30 000 kr", median: "36 000 kr", comment: "Yttre tjänst" },
      { role: "Inspektör", minimum: "35 000 kr", median: "42 000 kr", comment: "Utredare/specialist" },
    ],
    faq: [
      { question: "Vilken lön har poliser?", answer: "Grundutbildad median ~36 000 kr. Med OB kan faktisk lön bli 40 000-45 000 kr." },
      { question: "Hur många semesterdagar?", answer: "28-35 dagar beroende på ålder." },
    ],
    sources: [{ label: "Polisförbundet", url: "https://www.polisforbundet.se" }, { label: "Arbetsgivarverket", url: "https://www.arbetsgivarverket.se" }],
    relatedAgreements: ["villkorsavtal-ofr", "forsvarsmakten-avtal"],
    aiSystemPrompt: `Du är en AI-expert på Polisavtalet — avtal för ~35 000 poliser. Löner: grundutb polis median ~36 000 kr, inspektör ~42 000 kr. OB: kväll ~60, natt ~100, helg ~100, storhelg ~180 kr/tim. Semester: 28-35 dagar.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Polisförbundet för bindande besked."`,
  },
  {
    slug: "forsvarsmakten-avtal", name: "Försvarsmaktsavtalet", shortName: "Försvarsmakten", sector: "stat", sectorLabel: "Statlig sektor",
    parties: { unions: ["Officersförbundet", "Seko"], employers: ["Arbetsgivarverket"] }, employeeCount: 25000,
    validPeriod: "2025–2027",
    summary: "Gäller yrkesofficerare, soldater och civilanställda i Försvarsmakten. Specialtillägg, utlandstjänstgöring, beredskap.",
    keyFacts: { minimumWage: "Lokal lönerevision (officer ca 32 000 kr)", overtimeRate: "Enligt ALFA", obWeekday: "~60 kr/tim", obNight: "~100 kr/tim", obWeekend: "~100 kr/tim", obHoliday: "~180 kr/tim", vacationDays: "28–35 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "PA 16", workHoursPerWeek: "39 tim 45 min" },
    wageTable: [
      { role: "Officer", minimum: "32 000 kr", median: "38 000 kr", comment: "Specialtillägg möjliga" },
      { role: "Gruppbefäl/soldat", minimum: "26 000 kr", median: "30 000 kr", comment: "Anställd soldat" },
    ],
    faq: [{ question: "Vilken lön har officerare?", answer: "Median ~38 000 kr. Specialtillägg och utlandstjänst ger mer." }],
    sources: [{ label: "Officersförbundet", url: "https://www.officersforbundet.se" }],
    relatedAgreements: ["villkorsavtal-ofr", "polisavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Försvarsmaktsavtalet — avtal för ~25 000 officerare/soldater. Officer median ~38 000 kr. Semester: 28-35 dagar. Pension: PA 16.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Officersförbundet för bindande besked."`,
  },
  {
    slug: "tullverket-avtal", name: "Tull/Kustbevakning-avtalet", shortName: "Tull & Kust", sector: "stat", sectorLabel: "Statlig sektor",
    parties: { unions: ["ST", "Seko"], employers: ["Arbetsgivarverket"] }, employeeCount: 3000,
    validPeriod: "2025–2027",
    summary: "Gäller tulltjänstemän och kustbevakare. Skiftarbete, beredskap, gränskontroll.",
    keyFacts: { minimumWage: "Lokal lönerevision (ca 29 000 kr)", overtimeRate: "Enligt ALFA", obWeekday: "~60 kr/tim", obNight: "~100 kr/tim", obWeekend: "~100 kr/tim", obHoliday: "~180 kr/tim", vacationDays: "28–35 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "PA 16", workHoursPerWeek: "39 tim 45 min" },
    wageTable: [{ role: "Tulltjänsteman", minimum: "29 000 kr", median: "34 000 kr", comment: "Gränskontroll" }],
    faq: [{ question: "Vilken lön?", answer: "Median ca 34 000 kr." }],
    sources: [{ label: "ST", url: "https://www.st.org" }],
    relatedAgreements: ["villkorsavtal-ofr", "polisavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Tull/Kustbevakning-avtalet — avtal för ~3 000 tulltjänstemän/kustbevakare. Löner: median ~34 000 kr. Pension: PA 16.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta ST för bindande besked."`,
  },
  {
    slug: "musikeravtalet", name: "Musikeravtalet", shortName: "Musikeravtalet", sector: "privat", sectorLabel: "Privat kultur",
    parties: { unions: ["Svenska Musikerförbundet"], employers: ["Svensk Scenkonst"] }, employeeCount: 3000,
    validPeriod: "2025–2027",
    summary: "Gäller orkestermusiker och kapellmästare. Projektanställningar, repetitions- och föreställningstid.",
    keyFacts: { minimumWage: "Från ca 28 000 kr/mån", overtimeRate: "Enligt avtal", obWeekday: "~50 kr/tim", obNight: "Sällan aktuellt", obWeekend: "~80 kr/tim", obHoliday: "~150 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP", workHoursPerWeek: "40 timmar (oregelbundet)" },
    wageTable: [{ role: "Orkestermusiker", minimum: "28 000 kr", median: "36 000 kr", comment: "Fast anställd" }],
    faq: [{ question: "Vilken lön?", answer: "Orkestermusiker median ca 36 000 kr." }],
    sources: [{ label: "Musikerförbundet", url: "https://www.musikerforbundet.se" }],
    relatedAgreements: ["teateravtalet"],
    aiSystemPrompt: `Du är en AI-expert på Musikeravtalet — avtal för ~3 000 orkestermusiker. Löner: min ~28 000 kr, median ~36 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Musikerförbundet för bindande besked."`,
  },
  {
    slug: "ideella-avtalet", name: "Avtal för ideella organisationer (Fremia)", shortName: "Ideella avtalet", sector: "privat", sectorLabel: "Ideell sektor",
    parties: { unions: ["Unionen", "Vision"], employers: ["Fremia"] }, employeeCount: 30000,
    validPeriod: "2025–2027",
    summary: "Gäller anställda i ideella organisationer — Röda Korset, Rädda Barnen, fackförbund, idrottsorganisationer. Individuell lönesättning.",
    keyFacts: { minimumWage: "Individuell lönesättning", overtimeRate: "Enligt avtal", obWeekday: "Enligt lokal överenskommelse", obNight: "Enligt lokal överenskommelse", obWeekend: "Enligt lokal överenskommelse", obHoliday: "Enligt lokal överenskommelse", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Handläggare (ideell org)", minimum: "Individuell", median: "34 000 kr", comment: "Varierar med org" }],
    faq: [{ question: "Vilken lön?", answer: "Individuell. Median ca 34 000 kr. Varierar stort mellan organisationer." }],
    sources: [{ label: "Fremia", url: "https://www.fremia.se" }],
    relatedAgreements: ["almega-tjansteforetagen", "hok-vision"],
    aiSystemPrompt: `Du är en AI-expert på Fremia-avtalet — avtal för ~30 000 anställda i ideella organisationer. Individuell lönesättning.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Unionen eller Vision för bindande besked."`,
  },
  {
    slug: "serviceavtalet", name: "Serviceavtalet", shortName: "Serviceavtalet", sector: "privat", sectorLabel: "Privat service",
    parties: { unions: ["Fastighets", "Kommunal"], employers: ["Almega Serviceföretagen"] }, employeeCount: 40000,
    validPeriod: "2025–2027",
    summary: "Gäller städbranschen (privat), tvätt och renhållning. Ofta timlön, deltidsanställningar vanligt.",
    keyFacts: { minimumWage: "Från ca 23 500 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~35 kr/tim", obNight: "~70 kr/tim", obWeekend: "~70 kr/tim", obHoliday: "~140 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar (deltid vanligt)" },
    wageTable: [
      { role: "Städare (privat)", minimum: "23 500 kr", median: "26 000 kr", comment: "Deltid vanligt" },
      { role: "Tvätteriarbetare", minimum: "24 000 kr", median: "27 000 kr", comment: "Industriell tvätt" },
    ],
    faq: [{ question: "Vilken lön har städare?", answer: "Lägsta ca 23 500 kr. Median ca 26 000 kr. Deltid vanligt." }],
    sources: [{ label: "Fastighets", url: "https://www.fastighets.se" }],
    relatedAgreements: ["fastighetsavtalet", "fastighetsanstallda-privat"],
    aiSystemPrompt: `Du är en AI-expert på Serviceavtalet — avtal för ~40 000 städare/tvätteriarbetare. Löner: städare min ~23 500 kr, median ~26 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Fastighets för bindande besked."`,
  },
  {
    slug: "spel-avtal", name: "Spel- och Kasinoavtalet", shortName: "Spelavtalet", sector: "privat", sectorLabel: "Privat nöje",
    parties: { unions: ["HRF", "Unionen"], employers: ["Almega"] }, employeeCount: 3000,
    validPeriod: "2025–2027",
    summary: "Gäller casinopersonal, croupierer, kasinovärdar (Svenska Spel, Casino Cosmopol). Skiftarbete, OB.",
    keyFacts: { minimumWage: "Från ca 25 000 kr/mån", overtimeRate: "Enligt avtal", obWeekday: "~45 kr/tim", obNight: "~80 kr/tim", obWeekend: "~80 kr/tim", obHoliday: "~160 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP", workHoursPerWeek: "40 timmar (kvällar/nätter)" },
    wageTable: [{ role: "Croupier", minimum: "25 000 kr", median: "30 000 kr", comment: "Kvälls-/nattarbete" }],
    faq: [{ question: "Vilken lön?", answer: "Croupier median ca 30 000 kr. OB ger extra." }],
    sources: [{ label: "HRF", url: "https://www.hrf.net" }],
    relatedAgreements: ["hotell-restaurang"],
    aiSystemPrompt: `Du är en AI-expert på Spel- och Kasinoavtalet — avtal för ~3 000 casinoanställda. Croupier median ~30 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta HRF för bindande besked."`,
  },
  {
    slug: "kyrkans-avtal", name: "Kyrkans avtal", shortName: "Kyrkans avtal", sector: "privat", sectorLabel: "Svenska kyrkan",
    parties: { unions: ["Vision", "Kommunal", "Akademikerförbundet"], employers: ["Svenska kyrkans arbetsgivarorganisation"] }, employeeCount: 20000,
    validPeriod: "2025–2027",
    summary: "Gäller kyrkvaktmästare, musiker, diakoner, administratörer i Svenska kyrkan. OB vid helger och högtider.",
    keyFacts: { minimumWage: "Individuell lönesättning (ca 25 000 kr)", overtimeRate: "Enligt avtal", obWeekday: "~40 kr/tim", obNight: "~70 kr/tim", obWeekend: "~80 kr/tim", obHoliday: "~160 kr/tim", vacationDays: "25–28 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Kyrk-PA (kyrkans pensionsavtal)", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "Kyrkvaktmästare", minimum: "25 000 kr", median: "29 000 kr", comment: "Drift och vaktmästeri" },
      { role: "Kyrkomusiker", minimum: "28 000 kr", median: "33 000 kr", comment: "Organist/kantor" },
      { role: "Diakon", minimum: "30 000 kr", median: "35 000 kr", comment: "Socialt arbete" },
    ],
    faq: [{ question: "Vilken lön?", answer: "Kyrkvaktmästare median ~29 000 kr. Kyrkomusiker ~33 000 kr. Diakon ~35 000 kr." }],
    sources: [{ label: "Svenska kyrkans arbetsgivarorganisation", url: "https://www.svenskakyrkan.se" }],
    relatedAgreements: ["hok-vision", "ideella-avtalet"],
    aiSystemPrompt: `Du är en AI-expert på Kyrkans avtal — avtal för ~20 000 kyrkanställda. Löner: vaktmästare ~29 000 kr, musiker ~33 000 kr, diakon ~35 000 kr. Pension: Kyrk-PA.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Vision för bindande besked."`,
  },
  // === AVTAL 76-100 ===
  {
    slug: "vvs-montorsavtalet", name: "VVS-montörsavtalet", shortName: "VVS-avtalet", sector: "privat", sectorLabel: "Privat installation",
    parties: { unions: ["Byggnads"], employers: ["Installatörsföretagen"] }, employeeCount: 15000, validPeriod: "1 maj 2025 – 30 april 2027",
    summary: "Gäller VVS-montörer, rörmokare och värmepumpstekniker. Timlön + ackord (normtider). PDF med fulltext tillgänglig för AI-chatt.",
    keyFacts: { minimumWage: "Timlön enligt lönetabell", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~45 kr/tim", obNight: "~90 kr/tim", obWeekend: "~90 kr/tim", obHoliday: "~180 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Byggnads avtalspension", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "VVS-montör", minimum: "ca 195 kr/tim", median: "ca 235 kr/tim", comment: "Timlön + normtidsackord" }],
    faq: [{ question: "Vilken lön?", answer: "Timlön ca 195 kr/tim. Med ackord (normtider) ofta 235+ kr/tim." }],
    sources: [{ label: "Byggnads — VVS", url: "https://www.byggnads.se" }],
    relatedAgreements: ["installationsavtalet", "byggavtalet", "plat-ventilationsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på VVS-montörsavtalet — avtal för ~15 000 VVS-montörer/rörmokare. Timlön + ackord. Pension: Byggnads.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Byggnads för bindande besked."`,
  },
  {
    slug: "markavtalet", name: "Markanläggningsavtalet", shortName: "Markavtalet", sector: "privat", sectorLabel: "Privat anläggning",
    parties: { unions: ["Byggnads", "Seko"], employers: ["Maskinentreprenörerna"] }, employeeCount: 10000, validPeriod: "2025–2027",
    summary: "Gäller markarbetare, stenläggare, dräneringsarbetare. Timlön, traktamente vid arbete på annan ort.",
    keyFacts: { minimumWage: "Timlön: ca 190 kr/tim", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~45 kr/tim", obNight: "~90 kr/tim", obWeekend: "~90 kr/tim", obHoliday: "~180 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Byggnads avtalspension", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Markarbetare", minimum: "ca 190 kr/tim", median: "ca 225 kr/tim", comment: "Stenläggning, dränering" }],
    faq: [{ question: "Vilken lön?", answer: "Timlön ca 190 kr/tim. Median ca 225 kr/tim." }],
    sources: [{ label: "Byggnads", url: "https://www.byggnads.se" }],
    relatedAgreements: ["vaganlaggningsavtalet", "entreprenadmaskinavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Markavtalet — ~10 000 markarbetare. Timlön ca 190 kr/tim.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Byggnads för bindande besked."`,
  },
  {
    slug: "isoleringsavtalet", name: "Isoleringsavtalet", shortName: "Isoleringsavtalet", sector: "privat", sectorLabel: "Privat bygg",
    parties: { unions: ["Byggnads"], employers: ["Isoleringsföretagen"] }, employeeCount: 3000, validPeriod: "2025–2027",
    summary: "Gäller isoleringsmontörer (rör-, kanal- och brandisolering). Ackord vanligt.",
    keyFacts: { minimumWage: "Timlön: ca 195 kr/tim", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~45 kr/tim", obNight: "~90 kr/tim", obWeekend: "~90 kr/tim", obHoliday: "~180 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Byggnads avtalspension", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Isoleringsmontör", minimum: "ca 195 kr/tim", median: "ca 230 kr/tim", comment: "Ackord vanligt" }],
    faq: [{ question: "Vilken lön?", answer: "Timlön ca 195 kr/tim. Ackord ger mer." }],
    sources: [{ label: "Byggnads", url: "https://www.byggnads.se" }],
    relatedAgreements: ["plat-ventilationsavtalet", "byggavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Isoleringsavtalet — ~3 000 isoleringsmontörer. Timlön ca 195 kr/tim.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Byggnads för bindande besked."`,
  },
  {
    slug: "partihandelsavtalet", name: "Partihandelsavtalet", shortName: "Partihandel", sector: "privat", sectorLabel: "Privat handel",
    parties: { unions: ["Unionen", "Handels"], employers: ["Svensk Handel"] }, employeeCount: 30000, validPeriod: "2025–2027",
    summary: "Gäller grossistföretag, partihandel och distributionscentraler. Lagerarbete, logistik, inköp.",
    keyFacts: { minimumWage: "Från ca 25 500 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~50 kr/tim", obNight: "~80 kr/tim", obWeekend: "~80 kr/tim", obHoliday: "~160 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO eller ITP", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Lagerarbetare (parti)", minimum: "25 500 kr", median: "30 000 kr", comment: "Grossist" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 25 500 kr. Median ca 30 000 kr." }],
    sources: [{ label: "Handels", url: "https://handels.se" }],
    relatedAgreements: ["handelsavtalet", "lager-ehandelsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Partihandelsavtalet — ~30 000 anställda i grossist/partihandel. Löner: min ~25 500 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Handels för bindande besked."`,
  },
  {
    slug: "blomsteravtalet", name: "Blomsterhandelsavtalet", shortName: "Blomsteravtalet", sector: "privat", sectorLabel: "Privat handel",
    parties: { unions: ["Handels"], employers: ["Svensk Handel"] }, employeeCount: 5000, validPeriod: "2025–2027",
    summary: "Gäller blomsterhandlare och florister. Säsongsbetonat (jul, mors dag, alla hjärtans dag).",
    keyFacts: { minimumWage: "Från ca 24 000 kr/mån", overtimeRate: "Enligt avtal", obWeekday: "~50 kr/tim", obNight: "Sällan aktuellt", obWeekend: "~80 kr/tim", obHoliday: "~160 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–3 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Florist", minimum: "24 000 kr", median: "27 500 kr", comment: "Säsongsvariation" }],
    faq: [{ question: "Vilken lön?", answer: "Florist median ca 27 500 kr." }],
    sources: [{ label: "Handels", url: "https://handels.se" }],
    relatedAgreements: ["handelsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Blomsteravtalet — ~5 000 florister. Löner: min ~24 000 kr, median ~27 500 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Handels för bindande besked."`,
  },
  {
    slug: "bensinhandelsavtalet", name: "Bensin- och servicehandelsavtalet", shortName: "Bensinhandel", sector: "privat", sectorLabel: "Privat handel",
    parties: { unions: ["Handels"], employers: ["Svensk Handel"] }, employeeCount: 8000, validPeriod: "2025–2027",
    summary: "Gäller bensinmackar, biltvättar, servicebutiker. OB kvällar/helger viktigt — öppet dygnet runt.",
    keyFacts: { minimumWage: "Från ca 24 500 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~55 kr/tim", obNight: "~80 kr/tim", obWeekend: "~85–115 kr/tim", obHoliday: "~180 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Butiksbiträde (bensin)", minimum: "24 500 kr", median: "27 000 kr", comment: "Dygnet-runt-öppet" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 24 500 kr. OB-tillägg ger betydande extra vid kvällar/nätter." }],
    sources: [{ label: "Handels", url: "https://handels.se" }],
    relatedAgreements: ["handelsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Bensinhandelsavtalet — ~8 000 anställda. Löner: min ~24 500 kr. OB: kväll ~55, natt ~80, helg ~85-115 kr/tim.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Handels för bindande besked."`,
  },
  {
    slug: "hamnavtalet", name: "Hamn- och stuveriavtalet", shortName: "Hamnavtalet", sector: "privat", sectorLabel: "Privat transport",
    parties: { unions: ["Transport", "Svenska Hamnarbetarförbundet"], employers: ["Sveriges Hamnar"] }, employeeCount: 5000, validPeriod: "2025–2027",
    summary: "Gäller hamnarbetare och stuveriarbetare. Skiftarbete, höga OB-tillägg, tunga lyft.",
    keyFacts: { minimumWage: "Från ca 28 000 kr/mån", overtimeRate: "Första 2 tim: 150%, därefter 200%", obWeekday: "~55 kr/tim", obNight: "~100 kr/tim", obWeekend: "~100 kr/tim", obHoliday: "~190 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar (skift)" },
    wageTable: [{ role: "Hamnarbetare", minimum: "28 000 kr", median: "34 000 kr", comment: "Skift + OB ger mer" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 28 000 kr. Median ca 34 000 kr. Höga OB-tillägg." }],
    sources: [{ label: "Transport", url: "https://www.transport.se" }],
    relatedAgreements: ["transportavtalet", "sjofartsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Hamnavtalet — ~5 000 hamnarbetare. Löner: min ~28 000 kr, median ~34 000 kr. OB: natt ~100, storhelg ~190 kr/tim.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Transport för bindande besked."`,
  },
  {
    slug: "sjofartsavtalet", name: "Sjöfartsavtalet", shortName: "Sjöfartsavtalet", sector: "privat", sectorLabel: "Privat sjöfart",
    parties: { unions: ["Seko"], employers: ["Svensk Sjöfart"] }, employeeCount: 8000, validPeriod: "2025–2027",
    summary: "Gäller sjömän, matroser, maskinbefäl på handelsfartyg och färjor. Vakt/fridagar-system, sjötillägg.",
    keyFacts: { minimumWage: "Från ca 27 000 kr/mån", overtimeRate: "Enligt avtal", obWeekday: "Sjötillägg", obNight: "Sjötillägg", obWeekend: "Sjötillägg", obHoliday: "Sjötillägg", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "Vaktsystem (1:1 eller liknande)" },
    wageTable: [{ role: "Matros", minimum: "27 000 kr", median: "33 000 kr", comment: "Exkl. sjötillägg" }],
    faq: [{ question: "Vilken lön?", answer: "Matros median ca 33 000 kr exkl. sjötillägg." }],
    sources: [{ label: "Seko", url: "https://www.seko.se" }],
    relatedAgreements: ["transportavtalet", "hamnavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Sjöfartsavtalet — ~8 000 sjömän/matroser. Matros median ~33 000 kr + sjötillägg.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Seko för bindande besked."`,
  },
  {
    slug: "speditionsavtalet", name: "Speditions- och logistikavtalet", shortName: "Speditionsavtalet", sector: "privat", sectorLabel: "Privat logistik",
    parties: { unions: ["Unionen"], employers: ["Almega"] }, employeeCount: 15000, validPeriod: "2025–2027",
    summary: "Gäller speditörer, logistikplanerare, tullklarerare. Tjänstemannaavtal med individuell lön.",
    keyFacts: { minimumWage: "Individuell lönesättning", overtimeRate: "Kan avtalas bort", obWeekday: "Sällan aktuellt", obNight: "Sällan aktuellt", obWeekend: "Sällan aktuellt", obHoliday: "Sällan aktuellt", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Speditör", minimum: "Individuell", median: "35 000 kr", comment: "Logistik/tull" }],
    faq: [{ question: "Vilken lön?", answer: "Individuell. Speditör median ~35 000 kr." }],
    sources: [{ label: "Unionen", url: "https://www.unionen.se" }],
    relatedAgreements: ["almega-tjansteforetagen", "transportavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Speditionsavtalet — ~15 000 speditörer/logistiker. Individuell lön. Pension: ITP.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Unionen för bindande besked."`,
  },
  {
    slug: "renhallningsavtalet", name: "Renhållningsavtalet", shortName: "Renhållning", sector: "kommun_region", sectorLabel: "Kommun/region",
    parties: { unions: ["Kommunal", "Transport"], employers: ["Avfall Sverige", "SKR"] }, employeeCount: 12000, validPeriod: "2025–2027",
    summary: "Gäller sopåkare, renhållningsarbetare, återvinningspersonal. Tidiga morgnar, fysiskt krävande, OB.",
    keyFacts: { minimumWage: "Från ca 26 000 kr/mån", overtimeRate: "Första 2 tim: 180%, därefter 200%", obWeekday: "~45 kr/tim (tidig morgon)", obNight: "~90 kr/tim", obWeekend: "~90 kr/tim", obHoliday: "~170 kr/tim", vacationDays: "25–31 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "KAP-KL/AKAP-KR", workHoursPerWeek: "40 timmar (tidiga mornar)" },
    wageTable: [{ role: "Sopåkare/renhållningsarbetare", minimum: "26 000 kr", median: "31 000 kr", comment: "Tidiga mornar" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 26 000 kr. Median ca 31 000 kr plus OB." }],
    sources: [{ label: "Kommunal", url: "https://www.kommunal.se" }],
    relatedAgreements: ["hok-kommunal", "transportavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Renhållningsavtalet — ~12 000 renhållningsarbetare. Löner: min ~26 000 kr, median ~31 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Kommunal för bindande besked."`,
  },
  {
    slug: "vattenavtalet", name: "VA-avtalet", shortName: "VA-avtalet", sector: "kommun_region", sectorLabel: "Kommun/region",
    parties: { unions: ["Kommunal", "Seko"], employers: ["Sobona"] }, employeeCount: 8000, validPeriod: "2025–2027",
    summary: "Gäller driftstekniker, rörnätsarbetare inom vatten och avlopp. Beredskap, jour.",
    keyFacts: { minimumWage: "Från ca 27 000 kr/mån", overtimeRate: "Första 2 tim: 180%, därefter 200%", obWeekday: "~45 kr/tim", obNight: "~90 kr/tim", obWeekend: "~90 kr/tim", obHoliday: "~170 kr/tim", vacationDays: "25–31 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "KAP-KL/AKAP-KR", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "VA-tekniker", minimum: "27 000 kr", median: "33 000 kr", comment: "Beredskap ger extra" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 27 000 kr. Median ca 33 000 kr." }],
    sources: [{ label: "Kommunal", url: "https://www.kommunal.se" }],
    relatedAgreements: ["hok-kommunal", "renhallningsavtalet"],
    aiSystemPrompt: `Du är en AI-expert på VA-avtalet — ~8 000 VA-tekniker. Löner: min ~27 000 kr, median ~33 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Kommunal för bindande besked."`,
  },
  {
    slug: "tandlakare-privat", name: "Tandläkaravtalet privat", shortName: "Tandläkare privat", sector: "privat", sectorLabel: "Privat vård",
    parties: { unions: ["Sveriges Tandläkarförbund"], employers: ["Privattandläkarna"] }, employeeCount: 8000, validPeriod: "2025–2027",
    summary: "Gäller privatpraktiserande tandläkare (anställda). Individuell lönesättning.",
    keyFacts: { minimumWage: "Individuell (ca 45 000 kr nyutexaminerad)", overtimeRate: "Enligt avtal", obWeekday: "Sällan aktuellt", obNight: "Sällan aktuellt", obWeekend: "Sällan aktuellt", obHoliday: "Sällan aktuellt", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Tandläkare (anställd)", minimum: "45 000 kr", median: "60 000 kr", comment: "Individuell lön" }],
    faq: [{ question: "Vilken lön?", answer: "Nyutexaminerad ca 45 000 kr. Erfaren specialist median ~60 000 kr." }],
    sources: [{ label: "Tandläkarförbundet", url: "https://www.tandlakarforbundet.se" }],
    relatedAgreements: ["tandvard-privat", "lakare-kommun"],
    aiSystemPrompt: `Du är en AI-expert på Tandläkaravtalet — ~8 000 anställda tandläkare. Nyutexaminerad ca 45 000 kr, specialist ~60 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Tandläkarförbundet för bindande besked."`,
  },
  {
    slug: "fysioterapeut-avtal", name: "Fysioterapeutavtalet", shortName: "Fysioterapeut", sector: "kommun_region", sectorLabel: "Kommun/region",
    parties: { unions: ["Fysioterapeuterna"], employers: ["SKR"] }, employeeCount: 12000, validPeriod: "2025–2027",
    summary: "Gäller fysioterapeuter/sjukgymnaster i offentlig och privat vård. Individuell lönesättning.",
    keyFacts: { minimumWage: "Individuell (ca 30 000 kr nyutexaminerad)", overtimeRate: "Första 2 tim: 180%, därefter 200%", obWeekday: "Sällan aktuellt (dagtid)", obNight: "Sällan aktuellt", obWeekend: "Sällan aktuellt", obHoliday: "Sällan aktuellt", vacationDays: "25–32 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "KAP-KL/AKAP-KR", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Fysioterapeut", minimum: "30 000 kr", median: "36 000 kr", comment: "Individuell lön" }],
    faq: [{ question: "Vilken lön?", answer: "Nyutexaminerad ca 30 000 kr. Median ca 36 000 kr." }],
    sources: [{ label: "Fysioterapeuterna", url: "https://www.fysioterapeuterna.se" }],
    relatedAgreements: ["sjukskoterska-avtal", "ab-kommunalt"],
    aiSystemPrompt: `Du är en AI-expert på Fysioterapeutavtalet — ~12 000 fysioterapeuter. Löner: nyexam ca 30 000 kr, median ~36 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Fysioterapeuterna för bindande besked."`,
  },
  {
    slug: "psykologavtalet", name: "Psykologavtalet", shortName: "Psykologavtalet", sector: "kommun_region", sectorLabel: "Kommun/region",
    parties: { unions: ["Psykologförbundet"], employers: ["SKR"] }, employeeCount: 8000, validPeriod: "2025–2027",
    summary: "Gäller psykologer i offentlig vård, BUP, primärvård. Hög efterfrågan, specialisttillägg.",
    keyFacts: { minimumWage: "Individuell (PTP-psykolog ca 33 000 kr)", overtimeRate: "Första 2 tim: 180%, därefter 200%", obWeekday: "Sällan aktuellt (dagtid)", obNight: "Sällan aktuellt", obWeekend: "Sällan aktuellt", obHoliday: "Sällan aktuellt", vacationDays: "25–32 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "KAP-KL/AKAP-KR", workHoursPerWeek: "40 timmar" },
    wageTable: [
      { role: "PTP-psykolog", minimum: "33 000 kr", median: "36 000 kr", comment: "Under praktiktjänstgöring" },
      { role: "Specialist", minimum: "40 000 kr", median: "48 000 kr", comment: "Leg. specialist" },
    ],
    faq: [{ question: "Vilken lön?", answer: "PTP-psykolog median ~36 000 kr. Specialist ~48 000 kr." }],
    sources: [{ label: "Psykologförbundet", url: "https://www.psykologforbundet.se" }],
    relatedAgreements: ["ab-kommunalt", "sjukskoterska-avtal"],
    aiSystemPrompt: `Du är en AI-expert på Psykologavtalet — ~8 000 psykologer. PTP-psykolog median ~36 000 kr, specialist ~48 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Psykologförbundet för bindande besked."`,
  },
  {
    slug: "spelutvecklingsavtalet", name: "Spelutvecklingsavtalet", shortName: "Spelutveckling", sector: "privat", sectorLabel: "Privat IT/spel",
    parties: { unions: ["Unionen"], employers: ["TechSverige"] }, employeeCount: 10000, validPeriod: "2025–2027",
    summary: "Gäller spelutvecklare (King, DICE, Mojang). Sifferlöst avtal, individuell lön. Crunch-problematik i branschen.",
    keyFacts: { minimumWage: "Sifferlöst — individuell", overtimeRate: "Ofta avtalad bort", obWeekday: "Sällan aktuellt", obNight: "Sällan aktuellt", obWeekend: "Sällan aktuellt", obHoliday: "Sällan aktuellt", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Spelutvecklare", minimum: "Sifferlöst", median: "46 000 kr", comment: "Stockholm/Malmö" }],
    faq: [{ question: "Vilken lön?", answer: "Sifferlöst. Spelutvecklare median ca 46 000 kr. Senior kan nå 60 000+." }],
    sources: [{ label: "Unionen", url: "https://www.unionen.se" }],
    relatedAgreements: ["it-avtalet", "almega-tjansteforetagen"],
    aiSystemPrompt: `Du är en AI-expert på Spelutvecklingsavtalet — ~10 000 spelutvecklare. Sifferlöst. Median ~46 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Unionen för bindande besked."`,
  },
  {
    slug: "startupavtalet", name: "Startup-avtalet", shortName: "Startup-avtalet", sector: "privat", sectorLabel: "Privat startup",
    parties: { unions: ["Unionen"], employers: ["Almega Startups"] }, employeeCount: 5000, validPeriod: "2025–2027",
    summary: "Anpassat för startups — flexibla arbetstidsregler, option-program, enklare administration.",
    keyFacts: { minimumWage: "Sifferlöst — individuell", overtimeRate: "Flexibelt", obWeekday: "Sällan aktuellt", obNight: "Sällan aktuellt", obWeekend: "Sällan aktuellt", obHoliday: "Sällan aktuellt", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP", workHoursPerWeek: "40 timmar (flexibel)" },
    wageTable: [{ role: "Startup-anställd", minimum: "Sifferlöst", median: "38 000 kr", comment: "Varierar stort" }],
    faq: [{ question: "Vad är Startup-avtalet?", answer: "Anpassat kollektivavtal för startups med flexibla regler." }],
    sources: [{ label: "Unionen", url: "https://www.unionen.se" }],
    relatedAgreements: ["it-avtalet", "almega-tjansteforetagen"],
    aiSystemPrompt: `Du är en AI-expert på Startup-avtalet — ~5 000 startup-anställda. Sifferlöst, flexibelt.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Unionen för bindande besked."`,
  },
  {
    slug: "djurskotseln", name: "Djurskötselavtalet", shortName: "Djurskötsel", sector: "privat", sectorLabel: "Privat jordbruk",
    parties: { unions: ["Kommunal"], employers: ["Gröna arbetsgivare"] }, employeeCount: 5000, validPeriod: "2025–2027",
    summary: "Gäller djurskötare på gårdar, travbanor, djurparker. OB vid tidiga mornar.",
    keyFacts: { minimumWage: "Från ca 24 500 kr/mån", overtimeRate: "Enligt avtal", obWeekday: "~35 kr/tim (tidig morgon)", obNight: "~70 kr/tim", obWeekend: "~70 kr/tim", obHoliday: "~140 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Djurskötare", minimum: "24 500 kr", median: "28 500 kr", comment: "Tidiga mornar" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 24 500 kr. Median ca 28 500 kr." }],
    sources: [{ label: "Kommunal", url: "https://www.kommunal.se" }],
    relatedAgreements: ["gron-naringen", "ridavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Djurskötselavtalet — ~5 000 djurskötare. Löner: min ~24 500 kr, median ~28 500 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Kommunal för bindande besked."`,
  },
  {
    slug: "ridavtalet", name: "Ridsportavtalet", shortName: "Ridsportavtalet", sector: "privat", sectorLabel: "Privat jordbruk",
    parties: { unions: ["Kommunal"], employers: ["Gröna arbetsgivare"] }, employeeCount: 3000, validPeriod: "2025–2027",
    summary: "Gäller ridlärare, stallpersonal, hovslagare. Helgarbete vanligt.",
    keyFacts: { minimumWage: "Från ca 24 000 kr/mån", overtimeRate: "Enligt avtal", obWeekday: "~35 kr/tim", obNight: "Sällan aktuellt", obWeekend: "~70 kr/tim", obHoliday: "~140 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–3 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Ridlärare/stallpersonal", minimum: "24 000 kr", median: "27 000 kr", comment: "Helgarbete vanligt" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 24 000 kr. Median ca 27 000 kr." }],
    sources: [{ label: "Kommunal", url: "https://www.kommunal.se" }],
    relatedAgreements: ["gron-naringen", "djurskotseln"],
    aiSystemPrompt: `Du är en AI-expert på Ridsportavtalet — ~3 000 ridlärare/stallpersonal. Löner: min ~24 000 kr, median ~27 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Kommunal för bindande besked."`,
  },
  {
    slug: "friskola-tjansteman", name: "Friskola tjänstemannaavtalet", shortName: "Friskola tjänstemän", sector: "privat", sectorLabel: "Privat utbildning",
    parties: { unions: ["Unionen", "Sveriges Lärare"], employers: ["Almega Utbildning"] }, employeeCount: 40000, validPeriod: "2025–2027",
    summary: "Gäller lärare och administratörer på privata friskolor (Academedia, IES). Individuell lönesättning.",
    keyFacts: { minimumWage: "Individuell (lärare ca 30 000 kr)", overtimeRate: "Enligt avtal", obWeekday: "Sällan aktuellt", obNight: "Sällan aktuellt", obWeekend: "Sällan aktuellt", obHoliday: "Sällan aktuellt", vacationDays: "25 dagar + ferietid", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Lärare (friskola)", minimum: "Individuell", median: "37 000 kr", comment: "Jämförbar med kommunal" }],
    faq: [{ question: "Är lönen lägre på friskolor?", answer: "Inte nödvändigtvis. Individuell lönesättning — kan vara likvärdig med kommunal." }],
    sources: [{ label: "Unionen", url: "https://www.unionen.se" }],
    relatedAgreements: ["laraavtalet", "kommunal-skola"],
    aiSystemPrompt: `Du är en AI-expert på Friskola-avtalet — ~40 000 lärare/admin på friskolor. Individuell lön. Pension: ITP.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Unionen för bindande besked."`,
  },
  {
    slug: "folkhogskola-avtal", name: "Folkhögskoleavtalet", shortName: "Folkhögskola", sector: "privat", sectorLabel: "Ideell utbildning",
    parties: { unions: ["Sveriges Lärare"], employers: ["Arbetsgivaralliansen"] }, employeeCount: 5000, validPeriod: "2025–2027",
    summary: "Gäller lärare och personal på folkhögskolor. Internat, kursverksamhet.",
    keyFacts: { minimumWage: "Individuell lönesättning", overtimeRate: "Enligt avtal", obWeekday: "Sällan aktuellt", obNight: "Sällan aktuellt", obWeekend: "Sällan aktuellt", obHoliday: "Sällan aktuellt", vacationDays: "25 dagar + ferietid", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Folkhögskolelärare", minimum: "Individuell", median: "35 000 kr", comment: "Varierar" }],
    faq: [{ question: "Vilken lön?", answer: "Individuell. Median ca 35 000 kr." }],
    sources: [{ label: "Sveriges Lärare", url: "https://www.sverigeslarare.se" }],
    relatedAgreements: ["laraavtalet", "ideella-avtalet"],
    aiSystemPrompt: `Du är en AI-expert på Folkhögskoleavtalet — ~5 000 folkhögskolelärare. Individuell lön. Median ~35 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Sveriges Lärare för bindande besked."`,
  },
  {
    slug: "campingavtalet", name: "Camping- och stugbyavtalet", shortName: "Campingavtalet", sector: "privat", sectorLabel: "Privat turism",
    parties: { unions: ["HRF"], employers: ["Visita"] }, employeeCount: 3000, validPeriod: "2025–2027",
    summary: "Gäller personal på campingplatser, stugbyar, vandrarhem. Starkt säsongsbetonat (sommar).",
    keyFacts: { minimumWage: "Från ca 24 000 kr/mån", overtimeRate: "Enligt avtal", obWeekday: "~35 kr/tim", obNight: "~50 kr/tim", obWeekend: "~50–70 kr/tim", obHoliday: "~150 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–3 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar (säsong)" },
    wageTable: [{ role: "Campingvärd", minimum: "24 000 kr", median: "26 500 kr", comment: "Säsongsbetonat" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 24 000 kr. Säsongsanställning vanligt." }],
    sources: [{ label: "HRF", url: "https://www.hrf.net" }],
    relatedAgreements: ["hotell-restaurang"],
    aiSystemPrompt: `Du är en AI-expert på Campingavtalet — ~3 000 campingpersonal. Löner: min ~24 000 kr. Säsongsbetonat.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta HRF för bindande besked."`,
  },
  {
    slug: "nattklubbsavtalet", name: "Nöjes- och nattklubbsavtalet", shortName: "Nattklubbsavtalet", sector: "privat", sectorLabel: "Privat nöje",
    parties: { unions: ["HRF"], employers: ["Visita"] }, employeeCount: 5000, validPeriod: "2025–2027",
    summary: "Gäller DJ:s, garderobspersonal, bartenders på nattklubbar. Höga OB (nattarbete).",
    keyFacts: { minimumWage: "Från ca 24 400 kr/mån", overtimeRate: "Enligt avtal", obWeekday: "~35 kr/tim", obNight: "~50 kr/tim", obWeekend: "~50–70 kr/tim", obHoliday: "~150 kr/tim", vacationDays: "25 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–3 månader", pension: "Avtalspension SAF-LO", workHoursPerWeek: "40 timmar (nätter)" },
    wageTable: [{ role: "Nattklubbspersonal", minimum: "24 400 kr", median: "27 000 kr", comment: "OB-tillägg viktigt" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 24 400 kr. OB för nätter ger extra." }],
    sources: [{ label: "HRF", url: "https://www.hrf.net" }],
    relatedAgreements: ["hotell-restaurang", "spel-avtal"],
    aiSystemPrompt: `Du är en AI-expert på Nattklubbsavtalet — ~5 000 nattklubbspersonal. Löner: min ~24 400 kr. Natt-OB centralt.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta HRF för bindande besked."`,
  },
  {
    slug: "forsakring-tj", name: "Försäkring tjänstemannaavtalet", shortName: "Försäkring (Unionen)", sector: "privat", sectorLabel: "Privat försäkring",
    parties: { unions: ["Unionen"], employers: ["FAO"] }, employeeCount: 15000, validPeriod: "2025–2027",
    summary: "Tjänstemannaavtalet för försäkringsbranschen (komplement till Forena-avtalet). Individuell lönesättning.",
    keyFacts: { minimumWage: "Individuell lönesättning", overtimeRate: "Kan avtalas bort", obWeekday: "Sällan aktuellt", obNight: "Sällan aktuellt", obWeekend: "Sällan aktuellt", obHoliday: "Sällan aktuellt", vacationDays: "25–30 dagar", parentalPay: "Föräldralön via avtal", noticePeriod: "1–6 månader", pension: "ITP + tilläggspension", workHoursPerWeek: "38,75 timmar" },
    wageTable: [{ role: "Försäkringstjänsteman", minimum: "Individuell", median: "42 000 kr", comment: "Unionen-medlemmar" }],
    faq: [{ question: "Vilken lön?", answer: "Individuell. Median ca 42 000 kr." }],
    sources: [{ label: "Unionen", url: "https://www.unionen.se" }],
    relatedAgreements: ["forsakringsavtalet", "bankavtalet"],
    aiSystemPrompt: `Du är en AI-expert på Försäkring tjänstemannaavtalet — ~15 000 Unionen-medlemmar i försäkringsbranschen. Individuell lön. 38,75 tim/v.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Unionen för bindande besked."`,
  },
  {
    slug: "raddningstjanst-avtal", name: "Räddningstjänstavtalet", shortName: "Räddningstjänst", sector: "kommun_region", sectorLabel: "Kommun/region",
    parties: { unions: ["Kommunal", "Brandmannens Riksförbund"], employers: ["SKR"] }, employeeCount: 10000, validPeriod: "2025–2027",
    summary: "Gäller brandmän specifikt. 24-timmarspass, beredskap, ryckningsersättning. Bland de mest speciella arbetstidsmodellerna.",
    keyFacts: { minimumWage: "Från ca 28 000 kr/mån", overtimeRate: "Första 2 tim: 180%, därefter 200%", obWeekday: "~100 kr/tim", obNight: "~140 kr/tim", obWeekend: "~140 kr/tim", obHoliday: "~200 kr/tim", vacationDays: "25–31 dagar", parentalPay: "10% löneutfyllnad", noticePeriod: "1–6 månader", pension: "KAP-KL/AKAP-KR", workHoursPerWeek: "Dygnspass (24/48)" },
    wageTable: [{ role: "Brandman", minimum: "28 000 kr", median: "33 500 kr", comment: "Dygnspass + OB" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 28 000 kr. Median ca 33 500 kr. OB och beredskap ger extra." }],
    sources: [{ label: "Kommunal", url: "https://www.kommunal.se" }],
    relatedAgreements: ["hok-kommunal", "ab-kommunalt"],
    aiSystemPrompt: `Du är en AI-expert på Räddningstjänstavtalet — ~10 000 brandmän. Löner: min ~28 000 kr, median ~33 500 kr. OB: kväll ~100, natt ~140, helg ~140, storhelg ~200 kr/tim. Dygnspass.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Kommunal för bindande besked."`,
  },
  {
    slug: "parkavtalet", name: "Park- och trädgårdsavtalet", shortName: "Parkavtalet", sector: "kommun_region", sectorLabel: "Kommun/region",
    parties: { unions: ["Kommunal"], employers: ["SKR", "Sobona"] }, employeeCount: 8000, validPeriod: "2025–2027",
    summary: "Gäller parkarbetare, trädgårdsarbetare, kyrkogårdspersonal i kommunal tjänst. Säsongsvariation.",
    keyFacts: { minimumWage: "Från ca 25 000 kr/mån", overtimeRate: "Första 2 tim: 180%, därefter 200%", obWeekday: "Sällan aktuellt (dagtid)", obNight: "Sällan aktuellt", obWeekend: "Sällan aktuellt", obHoliday: "Sällan aktuellt", vacationDays: "25–31 dagar", parentalPay: "10% löneutfyllnad", noticePeriod: "1–6 månader", pension: "KAP-KL/AKAP-KR", workHoursPerWeek: "40 timmar" },
    wageTable: [{ role: "Parkarbetare", minimum: "25 000 kr", median: "29 000 kr", comment: "Säsongsvariation" }],
    faq: [{ question: "Vilken lön?", answer: "Lägsta ca 25 000 kr. Median ca 29 000 kr." }],
    sources: [{ label: "Kommunal", url: "https://www.kommunal.se" }],
    relatedAgreements: ["hok-kommunal", "gron-naringen"],
    aiSystemPrompt: `Du är en AI-expert på Parkavtalet — ~8 000 parkarbetare. Löner: min ~25 000 kr, median ~29 000 kr.\n\nSTRIKTA REGLER:\n- Svara BARA baserat på informationen ovan.\n- Svara på svenska, kort. Håll under 200 ord.\n- Avsluta ALLTID med: "Kontakta Kommunal för bindande besked."`,
  },
];

export function getAgreementBySlug(slug: string): Agreement | undefined {
  return agreements.find((a) => a.slug === slug);
}
