export interface ContentSection {
  heading: string;
  text: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  publishDate: string;
  updatedDate: string;
  author: string;
  category: string;
  readingTime: string;
  aeoAnswer: string;
  excerpt: string;
  content: ContentSection[];
  faq: { question: string; answer: string }[];
  relatedAgreements: string[];
  relatedOccupations: string[];
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "loneforhojning-2026",
    title: "Löneförhöjning 2026 — Så mycket höjs din lön enligt kollektivavtalet",
    metaDescription: "Löneförhöjningen 2026 styrs av märket på 6,4% över två år. Se hur mycket din lön höjs per bransch, när löneökningen kommer och vad som påverkar.",
    publishDate: "2026-03-15",
    updatedDate: "2026-03-31",
    author: "Redaktionen, kollektivavtal.ai",
    category: "Löner",
    readingTime: "6 min",
    aeoAnswer: "Löneförhöjningen 2026 styrs av det så kallade märket som sattes till 6,4% på två år — 3,4% första året och 3,0% andra året. De flesta kollektivavtal följer märket, men hur löneökningen fördelas beror på lokala förhandlingar.",
    excerpt: "Märket 2025 blev 6,4% på två år. Så påverkar det din lön 2026 — per bransch och avtal.",
    content: [
      {
        heading: "Vad är märket och varför styr det din lön?",
        text: "I Sverige sätts löneökningstakten genom den så kallade industrins märke. Det är Teknikavtalet — avtalet mellan IF Metall, Unionen, Sveriges Ingenjörer och Teknikarbetsgivarna — som sätter nivån. Märket 2025 landade på 6,4% under två år, fördelat som 3,4% det första året och 3,0% det andra.\n\nDet här är ingen lag, men i praktiken följer nästan alla kollektivavtal på den svenska arbetsmarknaden märket. Tanken är att alla löntagare ska ha en ungefärlig löneökning i samma takt, oavsett bransch.\n\nFör dig som anställd innebär det att din löneökning under 2026 sannolikt ligger kring 3,0% — om din arbetsgivare följer märket. Men den faktiska ökningen beror på om ditt avtal har centralt bestämd löneökning eller individuell lönesättning."
      },
      {
        heading: "Löneökning per avtalsområde 2026",
        text: "Olika avtal fördelar löneökningen på olika sätt. Här är en översikt:\n\nTeknikavtalet (IF Metall): 3,0% 2026, centralt fastställt.\nHandelsavtalet: Ca 3,0%, fördelas lokalt.\nHÖK Kommunal: Lokal lönebildning, inget centralt fastställt belopp men totalen ska följa märket.\nByggavtalet: 3,0% höjning av lägsta löner och ackordspriser.\nIT-avtalet: Sifferlöst — helt individuellt. Ingen garanterad ökning.\nStatliga avtal (Saco-S): Lokalt förhandlat utan individgarantier.\nStatliga avtal (OFR): Oenighetsutrymme på ca 3,0%.\n\nViktig distinktion: avtal med centralt fastställda procent ger alla minst den procenten. Avtal med individuell lönesättning (som IT-avtalet och HÖK Vision) innebär att din personliga ökning kan vara allt från 0% till 8% beroende på prestation och marknadsvärde."
      },
      {
        heading: "När kommer löneökningen?",
        text: "Lönerevisionsdatumet varierar mellan avtal. De flesta privata avtal har revision 1 april varje år. Kommunala avtal har ofta revision 1 april eller 1 oktober. Statliga avtal varierar.\n\nOm din arbetsgivare inte har genomfört löneöversynen i tid har du i de flesta fall rätt till retroaktiv betalning från avtalets revisionsdag. Kontakta ditt fackförbund om löneökningen dröjer."
      },
      {
        heading: "Arbetstidsförkortning dras av",
        text: "En viktig detalj som många missar: arbetstidsförkortning räknas in i det totala löneutrymmet. Avtalsrörelsen 2025 gav ca 0,5% i arbetstidsförkortning, vilket innebär att av de 3,0% kanske 2,5% går till ren löneökning och 0,5% till kortare arbetstid.\n\nDet innebär inte att du får mindre — du får istället mer fritid. Men i rena kronor kan löneökningen bli något lägre än du förväntat dig."
      },
      {
        heading: "Vad du kan göra för att maximera din löneökning",
        text: "Oavsett om ditt avtal har centralt bestämd löneökning eller individuell lönesättning finns det saker du kan göra:\n\nAnvänd SCB:s lönestatistik och vår lönekalkylator för att se vad du borde tjäna. Dokumentera dina prestationer under året. Förbered konkreta argument inför lönesamtalet. Kontakta ditt fackförbund för stöd — de har tillgång till detaljerad lönestatistik.\n\nKom ihåg att märket sätter golvet, inte taket. En bra förhandling kan ge mer.\n\nKälla: Medlingsinstitutet, IF Metall, Unionen, SCB."
      },
    ],
    faq: [
      { question: "När får jag min löneförhöjning 2026?", answer: "De flesta avtal har lönerevision 1 april 2026. Om din arbetsgivare inte har genomfört den har du rätt till retroaktiv betalning. Kontakta ditt fackförbund." },
      { question: "Hur mycket höjs min lön 2026?", answer: "Märket anger 3,0% för 2026 (år 2 av avtalsperioden). Den faktiska höjningen beror på ditt avtal och om lönen sätts centralt eller individuellt." },
      { question: "Vad är märket?", answer: "Märket är det löneökningsutrymme som sätts av industrin genom Teknikavtalet. Det anger takten för löneökningar på hela arbetsmarknaden — ca 3,0% 2026." },
      { question: "Gäller löneökningen alla?", answer: "Alla med kollektivavtal som följer märket. Sifferlösa avtal (t.ex. IT-avtalet) och de utan kollektivavtal har ingen garanterad ökning." },
      { question: "Vad händer om arbetsgivaren inte höjer min lön?", answer: "Om du har kollektivavtal med centralt fastställd ökning måste arbetsgivaren följa det. Kontakta facket om det inte sker. Utan kollektivavtal finns ingen garanti." },
    ],
    relatedAgreements: ["teknikavtalet", "handelsavtalet", "hok-kommunal", "byggavtalet"],
    relatedOccupations: ["underskoterska", "elektriker", "butikssaljare", "systemutvecklare"],
    tags: ["löneförhöjning", "märket", "2026", "löneökning"],
  },
  {
    slug: "avtalsrorelsen-2027-guide",
    title: "Avtalsrörelsen 2027 — Allt du behöver veta",
    metaDescription: "2027 omförhandlas 500 kollektivavtal för 3,4 miljoner anställda. Tidslinje, nyckelfrågor och vad det betyder för din lön.",
    publishDate: "2026-03-20",
    updatedDate: "2026-03-31",
    author: "Redaktionen, kollektivavtal.ai",
    category: "Avtalsrörelsen",
    readingTime: "7 min",
    aeoAnswer: "Under 2027 omförhandlas cirka 500 av Sveriges 515 kollektivavtal för 3,4 miljoner anställda. Det blir den största avtalsrörelsen på flera år. Förhandlingarna startar hösten 2026 och de stora avtalen löper ut 31 mars 2027.",
    excerpt: "500 avtal omförhandlas 2027 för 3,4 miljoner anställda. Här är den kompletta guiden.",
    content: [
      {
        heading: "Vad händer 2027?",
        text: "Våren 2027 löper de flesta av Sveriges kollektivavtal ut — de som tecknades i avtalsrörelsen 2025. Närmare 500 av arbetsmarknadens 515 avtal ska omförhandlas, och det berör 3,4 miljoner anställda.\n\nDet gör 2027 till den största avtalsrörelsen på flera år. Alla stora avtal — Teknikavtalet, Handelsavtalet, HÖK Kommunal, Byggavtalet, de statliga villkorsavtalen och många fler — ska förhandlas om samtidigt."
      },
      {
        heading: "Tidslinje — när händer vad?",
        text: "Hösten 2026: Fackförbunden börjar formulera sina krav. Avtalskonferenser hålls där medlemmarna får tycka till.\n\nJanuari–februari 2027: Yrkanden (krav) lämnas över. Industrin förhandlar först — det är tradition.\n\nMars 2027: Industrins märke ska vara klart innan 31 mars, då de flesta avtal löper ut. Om parterna inte enas kan medling begäras.\n\nApril–oktober 2027: Övriga avtal förhandlas och följer normalt märket.\n\nOm parterna inte enas? Då kan Medlingsinstitutet kopplas in. I sista hand kan strejk eller lockout bli aktuellt, men det är ovanligt i Sverige."
      },
      {
        heading: "Vilka frågor blir viktigast?",
        text: "Baserat på debatten och facken signaler kan vi räkna med att dessa frågor dominerar 2027:\n\nLöneökningar: Inflationen har normaliserats men reallönerna behöver återhämta sig. Facken vill sannolikt ha minst 3-4% per år.\n\nArbetstid: Unionen drev frågan hårt 2025 och fick delvis igenom arbetstidsförkortning. De kommer fortsätta trycka på för kortare arbetstid.\n\nPension: Pensionsavsättningarna behöver höjas i flera avtal. LO-förbunden prioriterar detta.\n\nAI och automatisering: En ny fråga som kan bli stor — vad händer med jobben när AI automatiserar arbetsuppgifter? Facken vill ha inflytande över hur ny teknik införs.\n\nKälla: Medlingsinstitutet, LO, Svenskt Näringsliv."
      },
      {
        heading: "Jämförelse med 2025",
        text: "Avtalsrörelsen 2025 resulterade i märket 6,4% på två år, arbetstidsförkortning motsvarande ca 1 dag per år, förbättrad övertidsersättning för deltid inom handeln, och höjda pensionsavsättningar i flera avtal.\n\n2027 kommer att bygga vidare på dessa resultat. Facken vill sannolikt ha mer av samma — högre löner, kortare arbetstid, bättre pensioner."
      },
      {
        heading: "Vad kan du göra?",
        text: "Håll dig uppdaterad — vi bevakar avtalsrörelsen 2027 här på kollektivavtal.ai. Engagera dig i ditt fackförbund — du kan påverka kraven. Kolla din lön redan nu med vår lönekalkylator — gå in starkare förberedd.\n\nKälla: Medlingsinstitutet, LO, TCO, Saco."
      },
    ],
    faq: [
      { question: "När börjar avtalsrörelsen 2027?", answer: "Förhandlingarna startar på allvar i januari–februari 2027. Förberedelserna med kravformuleringar börjar hösten 2026." },
      { question: "Vilka avtal berörs?", answer: "Cirka 500 av 515 avtal som löper ut 31 mars 2027, inklusive Teknikavtalet, Handelsavtalet, HÖK Kommunal och Byggavtalet." },
      { question: "Vad händer om parterna inte kommer överens?", answer: "Medlingsinstitutet kan kopplas in. I sista hand kan strejk (facket) eller lockout (arbetsgivaren) bli aktuellt." },
      { question: "Hur mycket löneökning kan jag förvänta mig?", answer: "Det beror på förhandlingarna, men baserat på inflationsutvecklingen och fackets krav kan 3-4% per år vara rimligt." },
      { question: "Påverkas jag om jag inte är fackmedlem?", answer: "Om du har kollektivavtal på arbetsplatsen gäller det dig oavsett fackmedlemskap. Men utan fack har du inget inflytande över kraven." },
    ],
    relatedAgreements: ["teknikavtalet", "handelsavtalet", "hok-kommunal", "byggavtalet", "ab-kommunalt"],
    relatedOccupations: ["underskoterska", "byggnadsarbetare", "butikssaljare", "lastbilschauffor"],
    tags: ["avtalsrörelsen", "2027", "förhandlingar", "märket"],
  },
  {
    slug: "ob-tillagg-2026-alla-branscher",
    title: "OB-tillägg 2026 — Så mycket extra får du per bransch",
    metaDescription: "Komplett guide till OB-tillägg 2026. Jämför ersättning för kväll, natt, helg och storhelg per bransch. Räkneexempel och tabeller.",
    publishDate: "2026-03-10",
    updatedDate: "2026-03-31",
    author: "Redaktionen, kollektivavtal.ai",
    category: "Löner",
    readingTime: "5 min",
    aeoAnswer: "OB-tillägg (obekväm arbetstid) varierar mellan 35 och 200 kr per timme beroende på bransch och tid. Högst OB har vård och kommun (~140 kr/tim natt), lägst hotell och restaurang (~50 kr/tim natt). Storhelg ger alltid mest — upp till 200 kr/tim.",
    excerpt: "OB-tillägg varierar kraftigt mellan branscher. Se vad du ska ha — kväll, natt, helg och storhelg.",
    content: [
      {
        heading: "Vad är OB-tillägg?",
        text: "OB står för obekväm arbetstid. Det är en extra ersättning du får utöver din vanliga timlön när du jobbar kvällar, nätter, helger eller storhelger. OB regleras i ditt kollektivavtal — det finns ingen lag som kräver OB.\n\nDet innebär att utan kollektivavtal kan din arbetsgivare schemalägga dig på natten utan att betala ett öre extra. Det gör OB-tillägg till en av de mest konkreta fördelarna med kollektivavtal."
      },
      {
        heading: "OB-tillägg per bransch 2026",
        text: "Här är en jämförelse av ungefärliga OB-satser per bransch:\n\nHÖK Kommunal (vård/omsorg): Kväll ~100 kr, natt ~140 kr, helg ~140 kr, storhelg ~200 kr.\nByggavtalet: Kväll ~45 kr, natt ~90 kr, helg ~90 kr, storhelg ~180 kr.\nHandelsavtalet: Kväll ~55 kr, lördag ~85 kr, söndag ~115 kr, storhelg ~180 kr.\nTransportavtalet: Kväll ~50 kr, natt ~85 kr, helg ~85 kr, storhelg ~170 kr.\nHotell & Restaurang: Kväll ~35 kr, natt ~50 kr, lördag ~50 kr, söndag ~70 kr, storhelg ~150 kr.\nStatliga avtal (OFR): Kväll ~60 kr, natt ~100 kr, helg ~100 kr, storhelg ~180 kr.\nIT-avtalet: Ofta inget OB — övertid kan vara avtalad bort.\n\nKälla: Respektive fackförbund, egen sammanställning."
      },
      {
        heading: "Räkneexempel — så mycket gör OB i kronor",
        text: "En undersköterska som jobbar 8 nattpass per månad får ca 8 × 8 × 140 = 8 960 kr extra per månad i natt-OB. Det ökar månadslönen från ca 31 000 kr till nästan 40 000 kr.\n\nEn kock som jobbar 10 kvällspass per månad får ca 10 × 6 × 35 = 2 100 kr extra. Helgarbete ger ytterligare tillägg.\n\nEn polis i yttre tjänst med blandade pass (kväll, natt, helg) kan få 4 000–8 000 kr extra i OB per månad."
      },
      {
        heading: "Varför skiljer sig OB så mycket mellan branscher?",
        text: "OB-nivåerna förhandlas i varje avtalsrörelse. Branscher där obekväm arbetstid är normen (vård, polis) har historiskt förhandlat fram höga OB-nivåer. Branscher där kvälls- och helgarbete alltid funnits men med lägre facklig förhandlingsstyrka (hotell, restaurang) har lägre nivåer.\n\nI avtalsrörelsen 2025 försökte Svensk Handel sänka OB-tilläggen för butiksanställda, men Handels stoppade det. OB-frågan är ofta en av de hetaste i avtalsförhandlingar.\n\nKälla: SCB, Medlingsinstitutet, respektive fackförbund."
      },
    ],
    faq: [
      { question: "Måste arbetsgivaren betala OB?", answer: "Bara om det finns kollektivavtal. Utan avtal finns ingen skyldighet att betala OB-tillägg." },
      { question: "Hur mycket OB får jag på natten?", answer: "Det varierar: vård ~140 kr/tim, bygg ~90 kr, handel ~80 kr, hotell/restaurang ~50 kr, stat ~100 kr." },
      { question: "Räknas OB in i pensionsgrundande lön?", answer: "Ja, i de flesta avtal räknas OB-tillägg in i den pensionsgrundande lönen." },
      { question: "Kan arbetsgivaren ta bort OB?", answer: "Inte ensidigt om det finns kollektivavtal. OB-nivåerna förhandlas mellan facket och arbetsgivaren." },
      { question: "Har alla yrken OB?", answer: "Nej. IT-konsulter och tjänstemän med sifferlösa avtal har ofta inget OB. Det gäller främst yrken med obekväma arbetstider." },
    ],
    relatedAgreements: ["hok-kommunal", "handelsavtalet", "hotell-restaurang", "transportavtalet"],
    relatedOccupations: ["underskoterska", "kock", "brandman", "servitor", "polis"],
    tags: ["OB-tillägg", "obekväm arbetstid", "natt", "helg", "2026"],
  },
  {
    slug: "minimiion-sverige-2026",
    title: "Minimilön i Sverige 2026 — Lägsta löner per bransch och yrke",
    metaDescription: "Sverige har ingen lagstadgad minimilön. Istället sätts lägsta löner i kollektivavtal. Se minimilön per bransch och yrke 2026.",
    publishDate: "2026-03-05",
    updatedDate: "2026-03-31",
    author: "Redaktionen, kollektivavtal.ai",
    category: "Löner",
    readingTime: "6 min",
    aeoAnswer: "Sverige har ingen lagstadgad minimilön. Istället sätts lägsta löner i kollektivavtal — från ca 24 000 kr/mån i handeln till ca 33 000 kr/mån i bygg med yrkesbevis. Cirka 92% av alla anställda omfattas av kollektivavtal med minimilöner.",
    excerpt: "Sverige har ingen lagstadgad minimilön. Här är lägsta löner per bransch och avtal 2026.",
    content: [
      {
        heading: "Varför har Sverige ingen lagstadgad minimilön?",
        text: "Till skillnad från de flesta länder i Europa har Sverige ingen lag som anger en minsta tillåten lön. Istället sätts lägsta löner genom kollektivavtal som förhandlas fram mellan fackförbund och arbetsgivarorganisationer.\n\nDen svenska modellen bygger på att parterna på arbetsmarknaden — inte politikerna — bestämmer lönevillkoren. Det gör att minimilönen anpassas per bransch och yrke istället för att vara en och samma siffra för alla."
      },
      {
        heading: "Lägsta löner per avtal 2026",
        text: "Här är de lägsta månadslönerna i de största kollektivavtalen:\n\nTeknikavtalet (industri): Ca 24 200 kr/mån.\nHandelsavtalet (butik): Ca 24 600 kr utan erfarenhet, ca 27 200 kr med 6 års vana.\nByggavtalet: Ca 28 000 kr utan yrkesbevis, ca 33 000 kr med yrkesbevis.\nHÖK Kommunal (undersköterska): Ca 26 500 kr.\nHotell & Restaurang: Ca 24 400 kr.\nInstallationsavtalet (elektriker): Ca 29 000 kr utan behörighet A.\nTransportavtalet (chaufför): Ca 27 500 kr.\nBankavtalet: Individuellt — inget golv.\nIT-avtalet: Sifferlöst — inget golv.\n\nKälla: Respektive fackförbund, egen sammanställning."
      },
      {
        heading: "Vad gäller utan kollektivavtal?",
        text: "Cirka 8% av alla anställda i Sverige saknar kollektivavtal. För dem finns ingen garanti om minimilön — arbetsgivaren kan i teorin betala vilken lön som helst, så länge den inte är så låg att den anses som utnyttjande.\n\nI praktiken innebär det att anställda utan avtal ofta har lägre lön, ingen tjänstepension, inget OB-tillägg och sämre uppsägningsskydd. Särskilt vanligt bland småföretag, nystartade bolag och utländska arbetsgivare."
      },
      {
        heading: "EU:s minimilönedirektiv — påverkas Sverige?",
        text: "EU antog 2022 ett minimilönedirektiv, men Sverige (och Danmark) undantas i praktiken. Direktivet kräver inte att länder med hög avtalstäckning (över 80%) inför lagstadgad minimilön. Sveriges 92% avtalstäckning gör att den svenska modellen skyddas.\n\nDock kan direktivet påverka indirekt — det sätter press på Sverige att säkerställa att avtalstäckningen förblir hög."
      },
      {
        heading: "Nordisk jämförelse",
        text: "Inget nordiskt land har lagstadgad minimilön. Danmark, Norge, Finland och Island har alla system som liknar det svenska — kollektivavtal sätter lägsta löner. Det nordiska systemet ger generellt högre lägsta löner än lagstadgade minimilöner i övriga Europa.\n\nKälla: SCB, Medlingsinstitutet, Eurostat."
      },
    ],
    faq: [
      { question: "Finns det minimilön i Sverige?", answer: "Nej, inte lagstadgad. Lägsta löner sätts genom kollektivavtal per bransch." },
      { question: "Vad är lägsta lön som butiksanställd?", answer: "Ca 24 600 kr/mån utan erfarenhet enligt Handelsavtalet 2026." },
      { question: "Vad är lägsta lönen i Sverige totalt?", answer: "De allra lägsta avtalade lönerna ligger runt 24 000–24 600 kr/mån (hotell/restaurang och handel)." },
      { question: "Vad gäller om jag inte har kollektivavtal?", answer: "Då finns ingen garanterad minimilön. Din lön bestäms helt av ditt anställningsavtal." },
      { question: "Kommer Sverige att införa lagstadgad minimilön?", answer: "Troligen inte. EU:s direktiv undantar länder med hög avtalstäckning som Sverige." },
    ],
    relatedAgreements: ["handelsavtalet", "hotell-restaurang", "teknikavtalet", "byggavtalet"],
    relatedOccupations: ["butikssaljare", "kock", "servitor", "diskare"],
    tags: ["minimilön", "lägsta lön", "2026", "kollektivavtal"],
  },
  {
    slug: "uppsagningstid-enligt-kollektivavtal",
    title: "Uppsägningstid 2026 — Vad gäller enligt ditt kollektivavtal?",
    metaDescription: "Uppsägningstiden varierar från 1 till 6 månader beroende på anställningstid och avtal. Se vad som gäller för dig 2026.",
    publishDate: "2026-02-25",
    updatedDate: "2026-03-31",
    author: "Redaktionen, kollektivavtal.ai",
    category: "Rättigheter",
    readingTime: "5 min",
    aeoAnswer: "Uppsägningstiden beror på din anställningstid och ditt kollektivavtal. Enligt LAS gäller 1 månad som minimum. Med kollektivavtal är det ofta 1-6 månader — ju längre du jobbat desto längre uppsägningstid. Arbetsgivaren har ofta längre uppsägningstid mot dig.",
    excerpt: "Uppsägningstiden varierar från 1 till 6 månader. Se vad som gäller per avtal och anställningstid.",
    content: [
      {
        heading: "Grundregeln — LAS",
        text: "Lagen om anställningsskydd (LAS) anger en minsta uppsägningstid på 1 månad. Men de flesta kollektivavtal ger bättre villkor med längre uppsägningstid baserat på anställningstid.\n\nViktig princip: arbetsgivaren har ofta längre uppsägningstid mot dig än du har mot arbetsgivaren. Det skyddar dig vid uppsägning från arbetsgivarens sida."
      },
      {
        heading: "Uppsägningstid per avtalsområde",
        text: "AB Kommunalt: Under 1 år = 1 mån, 1-5 år = 2 mån, 6-7 år = 3 mån, 8-9 år = 4 mån, 10+ år = 6 mån.\nTeknikavtalet: Liknande trappa som AB, 1-6 månader.\nHandelsavtalet: 1-6 månader beroende på anställningstid.\nStatliga avtal: 1-6 månader, ofta med extra omställningsavtal.\n\nVid provanställning: Provanställning kan avbrytas utan uppsägningstid under de första 6 månaderna. Du ska dock få besked 2 veckor i förväg."
      },
      {
        heading: "Vad händer om arbetsgivaren inte följer reglerna?",
        text: "Om arbetsgivaren säger upp dig med för kort uppsägningstid har du rätt till skadestånd. Kontakta ditt fackförbund omedelbart — de kan driva ärendet i förhandling eller Arbetsdomstolen.\n\nDu har också rätt till omställningsstöd via TRR (privat sektor) eller KOM-KL (kommunal sektor) för att hitta nytt jobb."
      },
      {
        heading: "Tips vid uppsägning",
        text: "Begär skriftlig uppsägning. Kolla din uppsägningstid i kollektivavtalet (inte bara LAS). Kontakta facket innan du skriver under något. Kolla om du har rätt till omställningsstöd. Dokumentera allt.\n\nKälla: LAS, respektive kollektivavtal."
      },
    ],
    faq: [
      { question: "Hur lång uppsägningstid har jag?", answer: "Det beror på din anställningstid och ditt kollektivavtal. Minimum är 1 månad enligt LAS. Med avtal ofta 1-6 månader." },
      { question: "Har arbetsgivaren längre uppsägningstid?", answer: "Ja, i de flesta avtal har arbetsgivaren längre uppsägningstid mot dig än du har mot arbetsgivaren." },
      { question: "Vad gäller vid provanställning?", answer: "Provanställning kan avbrytas utan uppsägningstid under de första 6 månaderna. Du ska dock få besked 2 veckor i förväg." },
      { question: "Vad händer om jag blir uppsagd fel?", answer: "Kontakta ditt fackförbund. Du kan ha rätt till skadestånd och ogiltigförklaring av uppsägningen." },
      { question: "Kan jag förhandla om längre uppsägningstid?", answer: "Ja, du kan ha längre uppsägningstid i ditt anställningsavtal. Kollektivavtalet anger minimum." },
    ],
    relatedAgreements: ["ab-kommunalt", "teknikavtalet", "handelsavtalet"],
    relatedOccupations: ["underskoterska", "butikssaljare", "systemutvecklare"],
    tags: ["uppsägningstid", "LAS", "uppsägning", "rättigheter"],
  },
  {
    slug: "foraldralon-kollektivavtal-2026",
    title: "Föräldralön 2026 — Så mycket extra får du via kollektivavtalet",
    metaDescription: "Föräldralön via kollektivavtal ger dig 10-90% utfyllnad utöver Försäkringskassans ersättning. Se vad ditt avtal ger 2026.",
    publishDate: "2026-02-15",
    updatedDate: "2026-03-31",
    author: "Redaktionen, kollektivavtal.ai",
    category: "Rättigheter",
    readingTime: "5 min",
    aeoAnswer: "Föräldralön via kollektivavtal fyller ut mellanskillnaden mellan Försäkringskassans ~80% av lönen och din fulla lön. HÖK Kommunal ger 10% utfyllnad, statliga avtal ger mer generöst. Utan avtal får du bara Försäkringskassans ersättning.",
    excerpt: "Kollektivavtalet ger dig extra föräldralön utöver Försäkringskassan. Se vad ditt avtal ger.",
    content: [
      {
        heading: "Så fungerar föräldralön",
        text: "Försäkringskassan betalar föräldrapenning på ca 80% av din lön (upp till ett tak på ca 41 000 kr/mån). Kollektivavtalet ger utfyllnad ovanpå det — antingen en procentuell utfyllnad av mellanskillnaden eller ett fast belopp under en viss period.\n\nDet innebär att du med kollektivavtal kan få 90-100% av din lön under delar av föräldraledigheten, istället för bara 80%."
      },
      {
        heading: "Föräldralön per avtal",
        text: "HÖK Kommunal: 10% löneutfyllnad under viss period.\nStatliga avtal: Bland de mest generösa — upp till 90% utfyllnad.\nTeknikavtalet (ITP): Föräldralön via avtal.\nHandelsavtalet (SAF-LO): Föräldralön via avtal.\nIT-avtalet: Föräldralön via ITP.\nBankavtalet: Generös föräldralön.\n\nExakta villkor och perioder varierar. Kontakta ditt fackförbund för ditt specifika avtal."
      },
      {
        heading: "Räkneexempel",
        text: "En anställd med 35 000 kr/mån:\nFörsäkringskassan betalar: ca 28 000 kr (80%).\nMed 10% föräldralön: +3 500 kr = 31 500 kr totalt.\nUtan kollektivavtal: bara 28 000 kr.\n\nSkillnaden: 3 500 kr/mån. Under 6 månader blir det 21 000 kr som du förlorar utan avtal."
      },
      {
        heading: "Vad förlorar du utan avtal?",
        text: "Utan kollektivavtal har du ingen rätt till föräldralön. Du får bara Försäkringskassans ersättning. Det kan innebära tiotusentals kronor i utebliven ersättning under föräldraledigheten.\n\nDessutom kan du sakna tjänstepensionsavsättning under ledigheten — ytterligare en förlust som påverkar dig långsiktigt.\n\nKälla: Försäkringskassan, respektive fackförbund."
      },
    ],
    faq: [
      { question: "Vad är föräldralön?", answer: "Extra ersättning utöver Försäkringskassans föräldrapenning, som din arbetsgivare betalar via kollektivavtalet." },
      { question: "Har alla rätt till föräldralön?", answer: "Bara de med kollektivavtal som inkluderar föräldralön. Utan avtal finns ingen garanti." },
      { question: "Hur mycket föräldralön ger mitt avtal?", answer: "Det varierar — 10% utfyllnad i HÖK Kommunal, mer generöst i statliga avtal. Kontakta ditt fackförbund." },
      { question: "Påverkas min pension under föräldraledigheten?", answer: "Med kollektivavtal fortsätter normalt pensionsavsättningarna. Utan avtal riskerar du att förlora pension." },
      { question: "Kan jag få föräldralön som pappa?", answer: "Ja, föräldralön gäller oavsett kön. Båda föräldrarna har rätt till samma villkor." },
    ],
    relatedAgreements: ["hok-kommunal", "teknikavtalet", "villkorsavtal-saco"],
    relatedOccupations: ["underskoterska", "sjukskoterska", "larare-grundskola"],
    tags: ["föräldralön", "föräldraledighet", "2026"],
  },
  {
    slug: "tjanstepension-kollektivavtal",
    title: "Tjänstepension via kollektivavtal 2026 — Så fungerar det",
    metaDescription: "ITP, KAP-KL, PA16, SAF-LO — vilken tjänstepension har du? Guide till pensionssystemen i Sveriges kollektivavtal 2026.",
    publishDate: "2026-02-10",
    updatedDate: "2026-03-31",
    author: "Redaktionen, kollektivavtal.ai",
    category: "Guider",
    readingTime: "6 min",
    aeoAnswer: "Tjänstepension via kollektivavtal innebär att din arbetsgivare betalar ca 4-6% av din lön i pensionsavgift utöver din lön. Privat sektor: ITP (tjänstemän) eller SAF-LO (arbetare). Kommun: KAP-KL/AKAP-KR. Stat: PA 16. Utan avtal — ingen garanti.",
    excerpt: "Din tjänstepension avgörs av ditt kollektivavtal. Här förklarar vi skillnaden mellan ITP, KAP-KL, PA16 och SAF-LO.",
    content: [
      {
        heading: "Varför är tjänstepension så viktig?",
        text: "Den allmänna pensionen från staten ger bara ca 50-60% av din slutlön. Tjänstepension fyller ut — och kan vara skillnaden mellan en ok och en bra pension.\n\nMed kollektivavtal betalar din arbetsgivare ca 4-6% av din lön varje månad till din tjänstepension. Utan avtal finns ingen garanti — arbetsgivaren kan välja att inte betala något alls."
      },
      {
        heading: "De fyra stora pensionssystemen",
        text: "ITP — Privat sektor (tjänstemän): ITP 1 (premiebestämd) eller ITP 2 (förmånsbestämd). Gäller inom Teknikavtalet, IT-avtalet, Almega m.fl. Arbetsgivaren betalar ca 4,5% + 30% på lönedelar över 7,5 inkomstbasbelopp.\n\nSAF-LO — Privat sektor (arbetare): Premiebestämd. Gäller inom Handelsavtalet, Byggavtalet, Transportavtalet m.fl. Arbetsgivaren betalar ca 4,5%.\n\nKAP-KL/AKAP-KR — Kommun och region: Gäller alla kommunanställda. Ca 4,5% av lönen. AKAP-KR är den nyare varianten.\n\nPA 16 — Statlig sektor: Gäller alla statsanställda. Generös pension med ca 4,5% + tillägg."
      },
      {
        heading: "Räkneexempel — vad är pensionen värd?",
        text: "En person med 35 000 kr/mån som arbetar 40 år:\nMed tjänstepension (4,5%): Arbetsgivaren betalar 1 575 kr/mån = 18 900 kr/år. Under 40 år, med avkastning, kan det bli 1,5-2 miljoner kronor extra i pension.\n\nUtan tjänstepension: 0 kr extra. Du får bara den allmänna pensionen.\n\nSkillnaden kan vara tusentals kronor per månad i pension."
      },
      {
        heading: "Vad händer utan kollektivavtal?",
        text: "Utan avtal finns ingen skyldighet för arbetsgivaren att betala tjänstepension. Vissa arbetsgivare erbjuder det ändå, men ofta med lägre avsättning och sämre villkor.\n\nDet gör tjänstepension till den kanske enskilt viktigaste förmånen i kollektivavtalet — den är värd hundratusentals kronor under ett yrkesliv.\n\nKälla: Collectum (ITP), Pensionsvalet (SAF-LO), KPA Pension (KAP-KL), SPV (PA 16)."
      },
    ],
    faq: [
      { question: "Vilken pension har jag?", answer: "Det beror på din sektor: ITP eller SAF-LO (privat), KAP-KL/AKAP-KR (kommun), PA 16 (stat)." },
      { question: "Hur mycket betalar arbetsgivaren?", answer: "Ca 4,5-6% av din lön, beroende på avtal och lönenivå." },
      { question: "Vad händer utan kollektivavtal?", answer: "Ingen garanterad tjänstepension. Arbetsgivaren kan välja att inte betala." },
      { question: "Kan jag påverka var pengarna placeras?", answer: "Ja, i de flesta system kan du välja fondförvaltare. Default-alternativ finns." },
      { question: "Hur stor blir min tjänstepension?", answer: "Beror på inbetalningar och avkastning. En tumregel: 4,5% av lönen under 40 år kan ge 5 000-10 000 kr/mån i pension." },
    ],
    relatedAgreements: ["teknikavtalet", "hok-kommunal", "villkorsavtal-saco", "handelsavtalet"],
    relatedOccupations: ["systemutvecklare", "underskoterska", "handlaggare-stat", "byggnadsarbetare"],
    tags: ["tjänstepension", "ITP", "KAP-KL", "PA16", "SAF-LO"],
  },
  {
    slug: "skillnad-med-utan-kollektivavtal",
    title: "Med eller utan kollektivavtal — Vad är skillnaden i kronor?",
    metaDescription: "Kollektivavtalet är värt 5 000-8 000 kr/mån i extra förmåner. Se den totala skillnaden i pension, OB, föräldralön och mer.",
    publishDate: "2026-02-01",
    updatedDate: "2026-03-31",
    author: "Redaktionen, kollektivavtal.ai",
    category: "Guider",
    readingTime: "6 min",
    aeoAnswer: "Kollektivavtal ger i genomsnitt 5 000-8 000 kr/mån i extra värde jämfört med att sakna avtal. Det inkluderar tjänstepension (~1 500 kr), föräldralön, OB-tillägg, bättre uppsägningstid, omställningsstöd och inkomstförsäkring via facket.",
    excerpt: "Kollektivavtalet är värt mer än du tror. Här räknar vi på den exakta skillnaden i kronor.",
    content: [
      {
        heading: "Det osynliga värdet",
        text: "Många ser bara lönen på lönespecen. Men kollektivavtalet ger en rad förmåner utöver den synliga lönen som kan vara värda tusentals kronor per månad. Här räknar vi igenom dem — en efter en."
      },
      {
        heading: "Jämförelse — med vs utan avtal",
        text: "Tjänstepension: Med avtal ca 4,5% (1 575 kr/mån vid 35 000 kr lön). Utan: 0 kr (ingen garanti).\n\nFöräldralön: Med avtal 10% utfyllnad. Utan: bara Försäkringskassans 80%.\n\nOB-tillägg: Med avtal upp till 200 kr/tim storhelg. Utan: inget OB garanterat.\n\nInkomstförsäkring: Via facket ingår ofta. Utan: måste tecknas privat (500-800 kr/mån).\n\nUppsägningstid: Med avtal upp till 6 månader. Utan: 1 mån enligt LAS.\n\nOmställningsstöd: Med avtal via TRR/KOM-KL. Utan: inget stöd.\n\nSjuklönetillägg: Med avtal utfyllnad. Utan: bara sjukpenning.\n\nSemester: Med avtal ofta fler dagar (stat 35 dagar). Utan: 25 dagar enligt lag."
      },
      {
        heading: "Räkneexempel — en person med 30 000 kr/mån",
        text: "Tjänstepension: +1 350 kr/mån\nOB-tillägg (8 kvällspass/mån): +3 200 kr/mån\nFöräldralön (utslaget per år): +500 kr/mån\nInkomstförsäkring (värde): +600 kr/mån\nOmställningsstöd (värde): +300 kr/mån\n\nTotalt: ca 5 950 kr/mån i extra värde. Det är nästan 72 000 kr per år som du förlorar utan kollektivavtal.\n\nKälla: Egen beräkning baserad på typiska avtalsvillkor."
      },
      {
        heading: "Vem saknar kollektivavtal?",
        text: "Cirka 8% av Sveriges anställda saknar kollektivavtal. Det är vanligast bland småföretag med färre än 10 anställda, nystartade tech-bolag, gig-ekonomin, vissa utländska arbetsgivare, och inom hushållsnära tjänster.\n\nOm du saknar avtal: prata med ditt fackförbund om möjligheten att teckna avtal. Du kan också jämföra försäkringar som delvis kompenserar.\n\nKälla: Medlingsinstitutet, SCB."
      },
    ],
    faq: [
      { question: "Vad är kollektivavtalet värt i kronor?", answer: "Ca 5 000-8 000 kr/mån beroende på bransch, inklusive pension, OB, föräldralön och försäkringar." },
      { question: "Kan jag få samma förmåner utan avtal?", answer: "Delvis — du kan teckna privat tjänstepension och inkomstförsäkring, men det kostar mer och ger ofta sämre villkor." },
      { question: "Hur vet jag om jag har kollektivavtal?", answer: "Fråga din arbetsgivare eller kontakta ett fackförbund. De kan kolla om din arbetsgivare är ansluten." },
      { question: "Vad gör facket om jag inte har avtal?", answer: "Facket kan hjälpa dig kräva att arbetsgivaren tecknar kollektivavtal." },
      { question: "Är det värt att vara fackmedlem?", answer: "Ja, om du vill ha inflytande över dina villkor och tillgång till rådgivning, inkomstförsäkring och förhandlingsstöd." },
    ],
    relatedAgreements: ["teknikavtalet", "handelsavtalet", "hok-kommunal"],
    relatedOccupations: ["underskoterska", "systemutvecklare", "butikssaljare"],
    tags: ["kollektivavtal", "förmåner", "pension", "OB"],
  },
  {
    slug: "sa-fungerar-loneforhandling",
    title: "Så fungerar löneförhandling — Guide för anställda 2026",
    metaDescription: "Steg-för-steg-guide till löneförhandling. Förbered dig, samla argument och förhandla rätt lön med hjälp av SCB-statistik.",
    publishDate: "2026-01-20",
    updatedDate: "2026-03-31",
    author: "Redaktionen, kollektivavtal.ai",
    category: "Guider",
    readingTime: "5 min",
    aeoAnswer: "En lyckad löneförhandling kräver förberedelse. Kolla din marknadslön via SCB-statistik, dokumentera dina prestationer, boka lönesamtal med din chef och presentera konkreta argument. Facket kan stödja dig i processen.",
    excerpt: "Steg-för-steg: så förhandlar du din lön effektivt. Med praktiska tips och lönestatistik.",
    content: [
      {
        heading: "Förbered dig med data",
        text: "Det viktigaste steget i en löneförhandling händer innan mötet. Kolla medianlönen för ditt yrke via SCB-statistik eller vår lönekalkylator. Jämför med vad du tjänar idag. Om du ligger under medianlönen har du ett starkt argument."
      },
      {
        heading: "Dokumentera dina prestationer",
        text: "Samla konkreta exempel på vad du bidragit med: projekt du drivit, problem du löst, extra ansvar du tagit, utbildningar du genomfört. Undvik vaga formuleringar — chefens budget kräver motivering."
      },
      {
        heading: "Boka lönesamtal",
        text: "De flesta kollektivavtal ger dig rätt till årligt lönesamtal med din chef. Boka det i god tid före lönerevisionen. Förbered en tydlig argumentation: vad du bidragit med, vad marknaden betalar, och vad du vill ha."
      },
      {
        heading: "Under förhandlingen",
        text: "Var saklig och konkret. Presentera dina argument med siffror. Lyssna på chefens perspektiv. Nämn aldrig kollegors löner — fokusera på ditt eget marknadsvärde. Be om tid att tänka om du får ett bud som känns lågt.\n\nOm du är fackmedlem kan du be om stöd från din fackliga representant."
      },
      {
        heading: "Om du inte får den ökning du vill ha",
        text: "Fråga vad som krävs för att nå den lönenivå du vill ha. Be om en plan med konkreta mål. Dokumentera överenskommelsen skriftligt. Kontakta facket om du upplever att lönesättningen inte följer avtalets intentioner.\n\nKom ihåg: löneförhandling är en process, inte ett engångstillfälle.\n\nKälla: Unionen, SCB, egen erfarenhet."
      },
    ],
    faq: [
      { question: "När ska jag förhandla lön?", answer: "I samband med den årliga lönerevisionen, vid byte av arbetsuppgifter, eller vid nyanställning." },
      { question: "Kan jag förhandla utan fack?", answer: "Ja, men facket ger stöd med lönestatistik och förhandlingstips. Som medlem har du tillgång till personlig rådgivning." },
      { question: "Vad gör jag om chefen säger nej?", answer: "Fråga vad som krävs för att nå önskad lön. Dokumentera. Kontakta facket om du upplever orättvis lönesättning." },
      { question: "Hur mycket kan jag begära?", answer: "Basera det på medianlönen för ditt yrke och din erfarenhet. Kolla vår lönekalkylator." },
      { question: "Ska jag nämna andra jobberbjudanden?", answer: "Bara om du verkligen har ett — det kan stärka din position men riskerar att skada relationen om det upplevs som hot." },
    ],
    relatedAgreements: ["teknikavtalet", "it-avtalet", "almega-tjansteforetagen"],
    relatedOccupations: ["systemutvecklare", "projektledare-it", "socionom"],
    tags: ["löneförhandling", "lön", "tips", "guide"],
  },
  {
    slug: "arbetstidsforkortning-2026",
    title: "Arbetstidsförkortning 2026 — Vilka avtal ger kortare arbetstid?",
    metaDescription: "Arbetstidsförkortning var den stora frågan 2025. Se vilka avtal som ger kortare arbetstid och vad det innebär i praktiken.",
    publishDate: "2026-01-10",
    updatedDate: "2026-03-31",
    author: "Redaktionen, kollektivavtal.ai",
    category: "Avtalsrörelsen",
    readingTime: "5 min",
    aeoAnswer: "Arbetstidsförkortning infördes i flera avtal 2025 — motsvarande ca 1 extra ledig dag per år. Teknikavtalet ger 92 minuter per vecka till tidbank. Unionen vill långsiktigt korta arbetstiden med 100 timmar per år.",
    excerpt: "Arbetstidsförkortning var den hetaste frågan 2025. Se vilka avtal som ger kortare arbetstid.",
    content: [
      {
        heading: "Bakgrund — stridsfrågan 2025",
        text: "Arbetstidsförkortning var den mest uppmärksammade frågan i avtalsrörelsen 2025. Unionen varslade om strejk för att driva igenom kortare arbetstid. Förhandlingarna gick till medling innan en uppgörelse nåddes.\n\nResultatet: ca 0,5% av löneutrymmet avsattes till arbetstidsförkortning. Det motsvarar ungefär en extra ledig dag per år — ett litet steg, men ett principiellt viktigt genombrott."
      },
      {
        heading: "Vilka avtal ger arbetstidsförkortning?",
        text: "Teknikavtalet: 92 minuter per vecka till tidbank (10 min/vecka nytt 2025). Kan tas ut som ledighet eller betalas ut.\n\nBankavtalet: 38,75 timmars arbetsvecka — redan kortare sedan länge.\n\nFörsäkringsavtalet: 38,75 timmar.\n\nStatliga avtal: 39 timmar och 45 minuter.\n\nFlera Unionen-avtal: Arbetstidsförkortning i tidbank.\n\nMånga avtal har ännu 40 timmars arbetsvecka men med kortare arbetstid som mål i kommande avtalsrörelser."
      },
      {
        heading: "Vad innebär det i praktiken?",
        text: "Teknikavtalets 92 minuter per vecka motsvarar ca 80 timmar per år — drygt 2 arbetsveckor. Du kan ta ut det som lediga dagar eller få det utbetalat.\n\nDen nya arbetstidsförkortningen (10 min/vecka) ger ca 8-9 extra timmar per år — ungefär en arbetsdag."
      },
      {
        heading: "Framtiden — Unionens vision",
        text: "Unionen har uttalat ett långsiktigt mål om att korta arbetstiden med 100 timmar per år — motsvarande ungefär 2,5 veckor. Det skulle innebära en normal arbetsvecka på ca 37,5 timmar.\n\nDet sker stegvis i varje avtalsrörelse. 2027 kan vi förvänta oss att arbetstid blir en central fråga igen.\n\nKälla: Unionen, Teknikarbetsgivarna, Medlingsinstitutet."
      },
    ],
    faq: [
      { question: "Har jag rätt till kortare arbetstid?", answer: "Det beror på ditt avtal. Kolla om ditt kollektivavtal har arbetstidsförkortning eller tidbank." },
      { question: "Hur fungerar tidbank?", answer: "Minuter avsätts varje vecka till en tidbank. Du kan ta ut dem som ledighet eller få dem utbetalda." },
      { question: "Kommer arbetstiden att kortas mer?", answer: "Sannolikt. Facken driver frågan aktivt och den blir en central del av avtalsrörelsen 2027." },
      { question: "Gäller det alla anställda?", answer: "Bara de vars kollektivavtal inkluderar arbetstidsförkortning. Inte alla avtal har det." },
      { question: "Vad kostar det arbetsgivaren?", answer: "Ca 0,5% av löneutrymmet. Det är en avvägning mot ren löneökning." },
    ],
    relatedAgreements: ["teknikavtalet", "bankavtalet", "forsakringsavtalet", "it-avtalet"],
    relatedOccupations: ["maskinoperator", "bankradgivare", "systemutvecklare"],
    tags: ["arbetstidsförkortning", "arbetstid", "2026", "tidbank"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
