const fs = require('fs');

const cases = require('../src/data/court-cases-imported.json');
const OUTPUT = 'src/data/court-cases-imported.json';

// Matching function from rematch script
const MATCHERS = {
  'byggavtalet': ['byggnads', 'byggnadsarbetareförbundet', 'byggföretagen', 'byggavtal', 'byggindustri', 'sveriges byggindustrier'],
  'teknikavtalet': ['if metall', 'industrifacket metall', 'teknikarbetsgivarna', 'teknikavtal', 'verkstadsföreningen', 'metallarbetareförbundet', 'metallindustriarbetareförbundet'],
  'handelsavtalet': ['handelsanställda', 'svensk handel', 'handelsavtal', 'handelstjänstemannaförbundet'],
  'hok-kommunal': ['kommunalarbetareförbundet', 'svenska kommunalarbetareförbundet', 'sobona'],
  'hok-vision': ['vision', 'sktf'],
  'transportavtalet': ['transportarbetareförbundet', 'svenska transportarbetareförbundet', 'biltrafikens arbetsgivare', 'hamnarbetarförbundet', 'hamn'],
  'hotell-restaurang': ['hotell- och restaurangfacket', 'visita', 'restaurang', 'shr'],
  'almega-tjansteforetagen': ['almega'],
  'installationsavtalet': ['elektrikerförbundet', 'svenska elektrikerförbundet', 'installatörsföretagen', 'eio'],
  'skogsavtalet': ['gs-facket', 'skogsindustrierna', 'pappers', 'grafiska'],
  'mediaavtalet': ['journalistförbundet', 'tidningsutgivarna', 'medieföretagen'],
  'villkorsavtal-saco': ['saco-s', 'arbetsgivarverket.*saco'],
  'villkorsavtal-ofr': ['polisförbundet', 'officersförbundet', 'offentliganställdas förhandlingsråd', 'fackförbundet st', 'försvarsmakten', 'polis'],
  'villkorsavtal-seko': ['seko'],
  'bankavtalet': ['finansförbundet', 'bankinstitut', 'bankföreningen'],
  'forsakringsavtalet': ['forena', 'försäkringstjänstemannaförbundet', 'ftf'],
  'bemanningsavtalet': ['kompetensföretagen', 'bemanningsavtal', 'bemanningsföretagen'],
  'livsmedelsavtalet': ['livsmedelsarbetareförbundet', 'livsmedelsföretagen'],
  'fastighetsavtalet': ['fastighetsanställda', 'fastigo'],
};

function detectAgreement(text) {
  const lower = text.toLowerCase();
  for (const [slug, matchers] of Object.entries(MATCHERS)) {
    for (const m of matchers) {
      if (m.includes('.*')) {
        try { if (new RegExp(m, 'i').test(lower)) return slug; } catch {}
      } else if (lower.includes(m)) return slug;
    }
  }
  return null;
}

function detectTopic(keywords, summary) {
  const t = (keywords.join(' ') + ' ' + summary).toLowerCase();
  if (t.includes('uppsägning') || t.includes('avsked') || t.includes('sakliga skäl')) return 'Uppsägning';
  if (t.includes('lön') || (t.includes('ersättning') && !t.includes('skadestånd'))) return 'Lön';
  if (t.includes('diskriminering') || t.includes('jämställd')) return 'Diskriminering';
  if (t.includes('strejk') || t.includes('stridsåtgärd') || t.includes('blockad') || t.includes('fredsplikt')) return 'Stridsåtgärd';
  if (t.includes('arbetstid') || t.includes('övertid') || t.includes('semester')) return 'Arbetstid';
  if (t.includes('kollektivavtal') || t.includes('avtalstolk') || t.includes('tolkning')) return 'Kollektivavtalstolkning';
  if (t.includes('medbestämmande') || t.includes('mbl') || t.includes('förhandling') && t.includes('skyldighet')) return 'Medbestämmande';
  if (t.includes('omplacering') || t.includes('arbetsskyldighet')) return 'Arbetsskyldighet';
  if (t.includes('skadestånd')) return 'Skadestånd';
  if (t.includes('konkurrensklausul') || t.includes('kundklausul')) return 'Kollektivavtalstolkning';
  return 'Övrigt';
}

// 2026 cases from arbetsdomstolen.se
const newCases = [
  {
    caseNumber: "AD 2026 nr 27", date: "2026-03-25",
    title: "Belastningsregisterutdrag och dataskydd vid anställning",
    summary: "Fråga om arbetsgivarens mottagande och genomläsning av ett belastningsregisterutdrag utgör behandling av personuppgifter enligt dataskyddsförordningen. Arbetsdomstolen fann att enbart ta emot och läsa utdraget inte omfattas av GDPR.",
    keywords: ["Dataskydd", "Belastningsregister", "Personuppgifter"],
    parties: "Industrifacket Metall mot Motorbranschens Arbetsgivareförbund och Wallhamn AB",
  },
  {
    caseNumber: "AD 2026 nr 26", date: "2026-03-19",
    title: "Förhandlingsvägran — restaurangföretag svarade inte",
    summary: "Stockholms Lokala Samorganisation stämde ett restaurangföretag som inte inkom med svarsskrift trots föreläggande. Kärandens talan bifölls.",
    keywords: ["Förhandlingsvägran"],
    parties: "Stockholms Lokala Samorganisation mot V50 Restaurang AB",
  },
  {
    caseNumber: "AD 2026 nr 25", date: "2026-03-18",
    title: "Informationsskyldighet enligt MBL — inget besked på 7 månader",
    summary: "Fråga om arbetsgivarens skyldighet att fortlöpande informera facklig organisation enligt 19a § MBL. Bolaget hade inte lämnat information på sju månader. Arbetsdomstolen fann att informationsskyldigheten innebär att information ska lämnas när relevanta händelser inträffar, inte vid fasta intervall. Eftersom inget av vikt hade hänt friades bolaget.",
    keywords: ["Medbestämmande", "Informationsskyldighet", "MBL"],
    parties: "Industrifacket Metall mot TM Sweden AB",
  },
  {
    caseNumber: "AD 2026 nr 24", date: "2026-03-18",
    title: "Sommarkompensation för piloter — tolkning av kollektivavtal",
    summary: "Tvist om tolkning av kollektivavtalet mellan Svensk Pilotförening och SAS gällande sommarkompensation. En pilot som var föräldraledig under sommaren nekades kompensation. Arbetsdomstolen fann att avtalets formulering inte krävde tillgänglighet hela sommaren och gav pilotföreningen rätt.",
    keywords: ["Kollektivavtalstolkning", "Semester", "Föräldraledighet"],
    parties: "Svensk Pilotförening mot SAS",
  },
  {
    caseNumber: "AD 2026 nr 23", date: "2026-03-18",
    title: "Konkurrensklausul och kundklausul — skiljedomsavtalets räckvidd",
    summary: "Fråga om 2015 års avtal mellan Svenskt Näringsliv och PTK om konkurrensklausuler omfattar kundklausuler. Arbetsdomstolen fann att avtalet inte täcker kundklausuler oavsett deras omfång, och att skiljedomsklausulen därför inte var tillämplig.",
    keywords: ["Konkurrensklausul", "Skiljedom", "Kollektivavtalstolkning"],
    parties: "Enskild mot Nexer AB",
  },
  {
    caseNumber: "AD 2026 nr 22", date: "2026-03-18",
    title: "Påstådd olovlig stridsåtgärd avvisad",
    summary: "Ett polskt företag hävdade att Industrifacket Metall vidtagit olovlig stridsåtgärd. Arbetsdomstolen fann att ingen stridsåtgärd hade vidtagits och avslog käromålet.",
    keywords: ["Stridsåtgärd"],
    parties: "Meron Tadeusz Meronk Spolka Komandytowa mot Industrifacket Metall",
  },
  {
    caseNumber: "AD 2026 nr 9", date: "2026-02-19",
    title: "Vilken arbetsgivarorganisation ska stämmas vid flera medlemskap?",
    summary: "Processuell fråga om vilken arbetsgivarorganisation som ska vara svarande när arbetsgivaren är medlem i flera organisationer. Seko stämde Byggföretagen och Implenia. Domstolen klargjorde att den organisation som tecknat det relevanta kollektivavtalet ska stämmas först.",
    keywords: ["Rättegångshinder", "Processrätt"],
    parties: "Seko mot Byggföretagen och Implenia Sverige AB",
  },
  // 2025 cases
  {
    caseNumber: "AD 2025 nr 104", date: "2025-12-30",
    title: "Dom meddelad 30 december 2025",
    summary: "Dom meddelad av Arbetsdomstolen den 30 december 2025.",
    keywords: [],
    parties: "",
  },
  {
    caseNumber: "AD 2025 nr 103", date: "2025-12-23",
    title: "Dom meddelad 23 december 2025",
    summary: "Dom meddelad av Arbetsdomstolen den 23 december 2025.",
    keywords: [],
    parties: "",
  },
  {
    caseNumber: "AD 2025 nr 97", date: "2025-12-17",
    title: "Preskription och förhandlingsordning vid uppsägning",
    summary: "Fråga om tidpunkten för avslutande av förhandling och preskription av talan om ogiltigförklaring av uppsägning.",
    keywords: ["Preskription", "Uppsägning", "Förhandlingsskyldighet"],
    parties: "",
  },
  {
    caseNumber: "AD 2025 nr 88", date: "2025-11-12",
    title: "Dotterbolags förhandlingsskyldighet vid företagstransaktion",
    summary: "Fråga om ett dotterbolags skyldighet att förhandla enligt MBL i samband med företagstransaktioner och avtal som slutits av moderbolaget.",
    keywords: ["Medbestämmande", "Förhandlingsskyldighet", "MBL"],
    parties: "",
  },
  {
    caseNumber: "AD 2025 nr 81", date: "2025-10-16",
    title: "Facklig rättshjälp och rättegångskostnader",
    summary: "Fråga om facklig rättshjälp och medlems rätt till ersättning för rättegångskostnader.",
    keywords: ["Rättegångskostnader", "Facklig rättshjälp"],
    parties: "",
  },
  {
    caseNumber: "AD 2025 nr 68", date: "2025-09-24",
    title: "Designersroyalty — Snöbollen-lampan",
    summary: "Tvist om royalty för designern av Snöbollen-lampan. Fråga om Arbetsdomstolens behörighet.",
    keywords: ["Skadestånd", "Upphovsrätt"],
    parties: "",
  },
  {
    caseNumber: "AD 2025 nr 57", date: "2025-08-20",
    title: "Gravid lärares löneskydd under pandemi",
    summary: "Fråga om en gravid lärares rätt till löneskydd enligt EU:s mödradirektiv när hon omplacerades under pandemin.",
    keywords: ["Diskriminering", "Föräldraledighet", "EU-rätt"],
    parties: "",
  },
  {
    caseNumber: "AD 2025 nr 53", date: "2025-07-23",
    title: "Omplacering efter föräldraledighet — diskriminering",
    summary: "En assistent omplacerades efter föräldraledighet. Arbetsdomstolen fann att det utgjorde diskriminering.",
    keywords: ["Diskriminering", "Föräldraledighet", "Omplacering"],
    parties: "",
  },
  {
    caseNumber: "AD 2025 nr 50", date: "2025-07-02",
    title: "Förfalskad uppsägningshandling och elektronisk signatur",
    summary: "Tvist om bevisbördan vid påstått förfalskade uppsägningshandlingar med elektronisk signatur.",
    keywords: ["Uppsägning", "Bevisning"],
    parties: "",
  },
  {
    caseNumber: "AD 2025 nr 47", date: "2025-06-25",
    title: "Visselblåsarskydd — plastikkirurg anmälde missförhållanden",
    summary: "Fråga om skydd enligt visselblåsarlagen för en plastikkirurg som rapporterade om missförhållanden.",
    keywords: ["Uppsägning", "Visselblåsare"],
    parties: "",
  },
  {
    caseNumber: "AD 2025 nr 45", date: "2025-06-18",
    title: "Hamnarbetarstrejk — fredsplikt och stridsåtgärd",
    summary: "Arbetsgivarens yrkande om att hamnarbetarstrejk stred mot fredsplikten avslogs interimistiskt.",
    keywords: ["Stridsåtgärd", "Fredsplikt"],
    parties: "Svenska Hamnarbetarförbundet",
  },
  {
    caseNumber: "AD 2025 nr 44", date: "2025-06-18",
    title: "Skyddsombuds medverkan vid företagsförsäljning",
    summary: "Fråga om skyddsombuds rätt att delta vid planering av verksamhetsövergång och omorganisation.",
    keywords: ["Arbetsmiljö", "Skyddsombud"],
    parties: "",
  },
  {
    caseNumber: "AD 2025 nr 39", date: "2025-06-11",
    title: "Kollektivavtalstolkning om löneberäkning för vikarier",
    summary: "Tvist om tolkning av kollektivavtal gällande hur lön ska beräknas för tillfälligt anställda vikarier.",
    keywords: ["Kollektivavtalstolkning", "Lön"],
    parties: "",
  },
  {
    caseNumber: "AD 2025 nr 35", date: "2025-05-26",
    title: "Hamnarbetarförbundets stridsåtgärder — interimistiskt beslut",
    summary: "Arbetsgivarens invändningar mot hamnarbetarnas stridsåtgärder avslogs interimistiskt.",
    keywords: ["Stridsåtgärd", "Interimistiskt förordnande"],
    parties: "Svenska Hamnarbetarförbundet",
  },
  {
    caseNumber: "AD 2025 nr 29", date: "2025-05-14",
    title: "Taxiförares anställningsstatus och övertidsersättning",
    summary: "Tvist om taxiförares anställningsförhållande och rätt till övertidsersättning.",
    keywords: ["Anställningsavtal", "Lön", "Övertid"],
    parties: "",
  },
  {
    caseNumber: "AD 2025 nr 25", date: "2025-04-30",
    title: "Bisyssla som brandman nekad — brott mot kollektivavtal",
    summary: "Fråga om en arbetsgivares vägran att tillåta bisyssla som brandman utgjorde brott mot kollektivavtalet.",
    keywords: ["Bisyssla", "Kollektivavtalsbrott"],
    parties: "",
  },
  {
    caseNumber: "AD 2025 nr 23", date: "2025-04-25",
    title: "Avskedande av handläggare på Försäkringskassan",
    summary: "En handläggare på Försäkringskassan avskedades för att inte ha rapporterat ändrade förhållanden gällande egen ersättning.",
    keywords: ["Avskedande", "Offentlig anställning"],
    parties: "",
  },
  {
    caseNumber: "AD 2025 nr 17", date: "2025-04-02",
    title: "Byggavtalets tillämpning på trafikvakters ersättning",
    summary: "Fråga om Byggavtalets bestämmelser var tillämpliga på trafikvakters ersättning.",
    keywords: ["Kollektivavtalstolkning", "Lön"],
    parties: "",
  },
  {
    caseNumber: "AD 2025 nr 12", date: "2025-03-12",
    title: "Polisassistent avskedades efter dataintrång",
    summary: "En polisassistent avskedades efter att ha gjort nio otillåtna sökningar i polisens register under två års tid. Sökningarna gällde uppgifter om halvsysterns partner. Arbetsdomstolen fann att avskedandet var motiverat.",
    keywords: ["Avskedande", "Polis", "Dataintrång"],
    parties: "Svenska Polisförbundet mot Staten genom Polismyndigheten",
  },
  {
    caseNumber: "AD 2025 nr 3", date: "2025-02-03",
    title: "Politisk blockad — interimistiskt beslut om stridsåtgärd",
    summary: "Interimistiskt beslut gällande politisk blockad mot krigsmateriel till Israel. Hamnarbetarförbundet tilläts genomföra blockaden.",
    keywords: ["Stridsåtgärd", "Politisk aktion"],
    parties: "Svenska Hamnarbetarförbundet mot Sveriges Hamnar",
  },
  {
    caseNumber: "AD 2025 nr 2", date: "2025-01-23",
    title: "Politisk strejk — blockad av krigsmateriel till Israel",
    summary: "Prövning av lagligheten i hotad politisk stridsåtgärd mot krigsmateriel. Arbetsdomstolen avslog begäran om interimistiskt förbud.",
    keywords: ["Stridsåtgärd", "Politisk aktion", "Interimistiskt förordnande"],
    parties: "Svenska Hamnarbetarförbundet mot Sveriges Hamnar",
  },
  {
    caseNumber: "AD 2025 nr 1", date: "2025-01-22",
    title: "Skadeståndstvist — tingsrättens dom ändrad",
    summary: "Arbetsdomstolen ändrade tingsrättens dom i en skadeståndstvist.",
    keywords: ["Skadestånd"],
    parties: "",
  },
  {
    caseNumber: "AD 2025 nr 16", date: "2025-03-28",
    title: "Pensionsålder för helikopterpiloter",
    summary: "Tvist om pensionsålder för helikopterpiloter. Käromålet avvisades som otydligt.",
    keywords: ["Pension", "Avvisning"],
    parties: "",
  },
];

// Process and add
let added = 0;
let skipped = 0;

for (const nc of newCases) {
  const slug = nc.caseNumber.toLowerCase().replace(/\s+/g, '-');

  // Check if already exists
  if (cases.find(c => c.id === slug)) {
    skipped++;
    continue;
  }

  const year = parseInt(nc.date.substring(0, 4));
  const allText = nc.summary + ' ' + nc.parties + ' ' + nc.keywords.join(' ');

  cases.push({
    id: slug,
    externalId: '',
    caseNumber: nc.caseNumber,
    caseNumbers: [],
    date: nc.date,
    year,
    title: nc.title,
    summary: nc.summary,
    topic: detectTopic(nc.keywords, nc.summary),
    keywords: nc.keywords,
    relatedAgreement: detectAgreement(allText),
    outcome: 'Övrigt',
    sourceUrl: `https://www.arbetsdomstolen.se/sv/meddelade-domar/${year}/${nc.date}-${slug}/`,
    isGuiding: false,
    type: 'REFERAT',
  });
  added++;
}

// Sort by date descending
cases.sort((a, b) => b.date.localeCompare(a.date));

console.log(`Added: ${added} new cases`);
console.log(`Skipped: ${skipped} (already existed)`);
console.log(`Total: ${cases.length} cases`);

// Stats for new cases
const new2025 = cases.filter(c => c.year === 2025).length;
const new2026 = cases.filter(c => c.year === 2026).length;
console.log(`\n2025: ${new2025} cases`);
console.log(`2026: ${new2026} cases`);

// Show linked
const newLinked = cases.filter(c => c.year >= 2025 && c.relatedAgreement);
console.log(`\nLinked 2025-2026 cases:`);
for (const c of newLinked) {
  console.log(`  ${c.caseNumber} → ${c.relatedAgreement}`);
}

fs.writeFileSync(OUTPUT, JSON.stringify(cases, null, 2), 'utf-8');
console.log(`\nSaved to ${OUTPUT}`);
