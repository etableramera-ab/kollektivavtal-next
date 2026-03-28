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

Regler:
1. Svara ALLTID på svenska, kort och tydligt
2. Citera ALDRIG avtalstexten ordagrant — sammanfatta i egna ord
3. Hänvisa alltid till officiella källor (Kommunal, SKR) för exakta uppgifter
4. Påminn att svaret är vägledande, inte juridisk rådgivning
5. Vid osäkerhet: säg "Kontakta Kommunal för bindande besked"
6. Håll svaren under 200 ord om möjligt`,
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

Regler:
1. Svara ALLTID på svenska, kort och tydligt
2. Citera ALDRIG avtalstexten ordagrant — sammanfatta i egna ord
3. Hänvisa alltid till officiella källor (IF Metall, Unionen, Teknikarbetsgivarna)
4. Påminn att svaret är vägledande, inte juridisk rådgivning
5. Vid osäkerhet: säg "Kontakta ditt fackförbund för bindande besked"
6. Håll svaren under 200 ord om möjligt`,
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

Regler:
1. Svara ALLTID på svenska, kort och tydligt
2. Citera ALDRIG avtalstexten ordagrant — sammanfatta i egna ord
3. Hänvisa alltid till officiella källor (Handels, Svensk Handel)
4. Påminn att svaret är vägledande, inte juridisk rådgivning
5. Vid osäkerhet: säg "Kontakta Handels för bindande besked"
6. Håll svaren under 200 ord om möjligt`,
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
    validPeriod: "2025–2027",
    summary:
      "Byggavtalet gäller byggarbetare, anläggningsarbetare, betongarbetare och liknande yrken. Lönesättningen bygger ofta på ackord utöver minimilönen, vilket innebär att den faktiska förtjänsten kan vara betydligt högre. Avtalet har omfattande regler för traktamente vid arbete på annan ort och resekostnadsersättning. Byggbranschen har bland de högsta OB-tilläggen på den privata arbetsmarknaden.",
    keyFacts: {
      minimumWage: "Från ca 28 000 kr/mån (utan yrkesbevis)",
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
        role: "Byggnadsarbetare (utan yrkesbevis)",
        minimum: "28 000 kr",
        median: "33 000 kr",
        comment: "Grundnivå, ofta ackord utöver",
      },
      {
        role: "Byggnadsarbetare (med yrkesbevis)",
        minimum: "33 000 kr",
        median: "38 000 kr",
        comment: "Yrkesbevis ger högre lön",
      },
      {
        role: "Maskinförare",
        minimum: "34 000 kr",
        median: "39 000 kr",
        comment: "Grävmaskin, hjullastare m.fl.",
      },
      {
        role: "Betongarbetare",
        minimum: "30 000 kr",
        median: "36 000 kr",
        comment: "Specialiserad yrkesgrupp",
      },
    ],
    faq: [
      {
        question: "Vilken lön ska jag ha som byggnadsarbetare?",
        answer:
          "Minimilönen utan yrkesbevis ligger runt 28 000 kr/mån, med yrkesbevis cirka 33 000 kr. Men de flesta byggjobbare tjänar mer genom ackord — den faktiska medianlönen med yrkesbevis ligger kring 38 000 kr.",
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
          "Ett yrkesbevis visar att du har godkänd yrkesutbildning inom bygg. Det ger dig rätt till en högre minimilön — skillnaden kan vara omkring 5 000 kr/mån. Yrkesbevis utfärdas av BYN (Byggbranschens Yrkesnämnd).",
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
- Giltighet: 2025–2027
- Lägsta löner: utan yrkesbevis ~28 000 kr, med yrkesbevis ~33 000 kr, maskinförare ~34 000 kr
- Ackordslön är vanligt utöver grundlönen
- OB-tillägg: kväll ~45 kr/tim, natt ~90 kr/tim, helg ~90 kr/tim, storhelg ~180 kr/tim
- Övertid: 150% första 2 tim, 200% därefter
- Traktamente: endags ~260 kr, flerdags ~520 kr
- Resekostnadsersättning: ~3,50 kr/km
- Pension: Byggnads avtalspension
- Arbetstid: 40 tim/vecka

Regler:
1. Svara ALLTID på svenska, kort och tydligt
2. Citera ALDRIG avtalstexten ordagrant — sammanfatta i egna ord
3. Hänvisa alltid till officiella källor (Byggnads, Byggföretagen)
4. Påminn att svaret är vägledande, inte juridisk rådgivning
5. Vid osäkerhet: säg "Kontakta Byggnads för bindande besked"
6. Håll svaren under 200 ord om möjligt`,
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

Regler:
1. Svara ALLTID på svenska, kort och tydligt
2. Citera ALDRIG avtalstexten ordagrant — sammanfatta i egna ord
3. Hänvisa alltid till officiella källor (SKR, respektive fackförbund)
4. Påminn att svaret är vägledande, inte juridisk rådgivning
5. Vid osäkerhet: säg "Kontakta ditt fackförbund för bindande besked"
6. Förklara skillnaden mellan AB och HÖK om frågan rör löner/OB
7. Håll svaren under 200 ord om möjligt`,
  },
];

export function getAgreementBySlug(slug: string): Agreement | undefined {
  return agreements.find((a) => a.slug === slug);
}
