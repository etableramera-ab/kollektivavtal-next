import type { Agreement } from "@/data/agreements";
import { getPublicAgreementIdentity } from "@/lib/agreement-source-registry";

export const PUBLIC_FACT_REVIEW_MESSAGE =
  "Granskas mot den officiella avtalstexten";

export interface PublicFactSourceNote {
  reviewedAt: string;
  sections: string;
  label: string;
  url: string;
}

interface PublicAgreementFactSet {
  summary: string;
  keyFacts: Partial<Agreement["keyFacts"]>;
  wageTable?: Agreement["wageTable"];
  faq?: Agreement["faq"];
  relatedAgreements?: string[];
  sourceNote: PublicFactSourceNote;
}

// Only facts matched claim by claim to a current source belong here.
// Older hand-written agreement data must never be exposed through this map.
const PUBLIC_SOURCE_MATCHED_FACTS: Partial<
  Record<string, PublicAgreementFactSet>
> = {
  "hok-kommunal": {
    summary:
      "HÖK 25 är löneavtalet mellan Kommunal och SKR/Sobona. Lönen sätts individuellt och lokalt, medan avtalet anger centrala löneutrymmen, individgaranti och generella lägstanivåer. De allmänna anställningsvillkoren finns i AB 25. Uppgifterna nedan är kontrollerade mot båda originalen för avtalsperioden 1 april 2025–31 mars 2027.",
    keyFacts: {
      minimumWage:
        "Från 1 januari 2026: 23 638 kr/mån för den som fyllt 19 år och 25 798 kr/mån med yrkesförberedande gymnasieutbildning. Det är generella avtalsgolv, inte särskilda yrkeslöner",
      overtimeRate:
        "Enkel övertid: 1,5 timmes ledighet eller 180 % av månadslönen/165 per timme. Kvalificerad övertid: 2 timmars ledighet eller 240 % av månadslönen/165 per timme",
      obWeekday:
        "Vardagar kl. 19.00–22.00: 26,40 kr/tim från 1 april 2026",
      obNight:
        "Vardagsnatt kl. 22.00–06.00: 58,40 kr/tim från 1 april 2026",
      obWeekend:
        "Helg och vissa fredagstider: 68,10 kr/tim. Natt kl. 22.00–06.00 mot lördag, söndag eller helgdag: 78,30 kr/tim från 1 april 2026",
      obHoliday:
        "Storhelg: 130,70 kr/tim. Natt kl. 22.00–06.00 under angiven storhelg: 156,90 kr/tim från 1 april 2026",
      vacationDays:
        "25 dagar till och med intjänandeåret då du fyller 39, 31 dagar från året du fyller 40 och 32 dagar från året du fyller 50",
      parentalPay:
        "Efter minst 180 dagars sammanhängande anställning: 10 % av lönebortfallet i högst 180 kalenderdagar per födsel och längst tills barnet är 24 månader, när avtalets villkor är uppfyllda",
      noticePeriod:
        "I kommun, region och kommunalförbund efter minst 12 månaders sammanhängande anställning: 3 månader när du säger upp dig och 6 månader när arbetsgivaren säger upp. Andra regler kan gälla hos Sobona-arbetsgivare",
      pension:
        "Tjänstepension regleras i ett separat pensionsavtal. De flesta omfattas av AKAP-KR, medan vissa fortsatt kan omfattas av KAP-KL. Kontrollera vilket pensionsavtal som gäller för dig",
      workHoursPerWeek:
        "Normalt 40 timmar per helgfri vecka. Vid arbete både vardag och sön-/helgdag normalt 38 timmar 15 minuter. Särskilda skiftmått och regler för vissa verksamheter finns",
    },
    wageTable: [
      {
        role: "Fyllt 19 år",
        minimum: "23 638 kr/mån",
        median: "",
        comment: "Generell lägstanivå 1 januari–31 december 2026",
      },
      {
        role: "Yrkesförberedande gymnasieutbildning",
        minimum: "25 798 kr/mån",
        median: "",
        comment: "Generell lägstanivå 1 januari–31 december 2026",
      },
      {
        role: "Fyllt 19 år",
        minimum: "24 676 kr/mån",
        median: "",
        comment: "Generell lägstanivå från 1 januari 2027",
      },
      {
        role: "Yrkesförberedande gymnasieutbildning",
        minimum: "26 572 kr/mån",
        median: "",
        comment: "Generell lägstanivå från 1 januari 2027",
      },
    ],
    faq: [
      {
        question: "Får alla 915 kronor mer i lön under 2026?",
        answer:
          "Nej. 915 kronor används för att beräkna det gemensamma löneutrymmet och fördelas individuellt. Om inget annat avtalas lokalt är individgarantin 600 kronor för en tillsvidareanställd Kommunal-medlem med månadslön. Avtalet har också undantag.",
      },
      {
        question: "Är 25 798 kronor minimilönen för undersköterskor?",
        answer:
          "Nej, inte som särskild yrkeslön. Beloppet är avtalets generella lägstanivå för den som har yrkesförberedande gymnasieutbildning. Den individuella lönen sätts lokalt.",
      },
      {
        question: "Vad är skillnaden mellan HÖK 25 och AB 25?",
        answer:
          "HÖK 25 innehåller Kommunals löneavtal och särskilda bestämmelser. AB 25 innehåller de allmänna villkoren, bland annat om arbetstid, övertid, OB, semester, föräldraledighet och uppsägning.",
      },
      {
        question: "Hur mycket OB får jag?",
        answer:
          "Det beror på exakt dag och klockslag. Från 1 april 2026 ligger de centrala nivåerna mellan 26,40 och 156,90 kronor per timme. Lokala eller särskilda regler kan påverka vilket belopp som gäller.",
      },
      {
        question: "Är heltidsmåttet alltid 40 timmar?",
        answer:
          "Nej. Grundregeln är 40 timmar per helgfri vecka, men arbete som är förlagt både till vardag och sön-/helgdag har normalt 38 timmar och 15 minuter. Skiftarbete och vissa verksamheter har andra mått.",
      },
    ],
    relatedAgreements: ["ab-kommunalt"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "HÖK 25 bilaga 1 §§ 1–2 och 7, bilaga 1a §§ 1 och 3, AB 25 §§ 13, 20–21, 27, 29 och 33 samt SKR:s aktuella pensionsinformation",
      label: "Öppna HÖK 25 i original",
      url: "https://skr.se/download/18.4d2a888c19913a970f86ce83/1757406196642/Huvudoverenskommelse-%28HOK%29-25-med-Kommunal.pdf",
    },
  },
  "ab-kommunalt": {
    summary:
      "AB 25 innehåller gemensamma anställningsvillkor för arbetstagare inom kommuner, regioner och berörda Sobona-företag när AB gäller. Lönerna regleras i respektive HÖK eller annat löneavtal. Uppgifterna nedan är kontrollerade mot AB 25 i lydelse från 1 april 2025.",
    keyFacts: {
      minimumWage:
        "AB 25 innehåller inga lönenivåer. Lön och eventuella lägstanivåer finns i det HÖK eller löneavtal som gäller för arbetstagaren",
      overtimeRate:
        "Enkel övertid: 1,5 timmes ledighet eller 180 % av månadslönen/165 per timme. Kvalificerad övertid: 2 timmars ledighet eller 240 % av månadslönen/165 per timme",
      obWeekday:
        "Vardagar kl. 19.00–22.00: 26,40 kr/tim från 1 april 2026",
      obNight:
        "Vardagsnatt kl. 22.00–06.00: 58,40 kr/tim från 1 april 2026",
      obWeekend:
        "Helg och vissa fredagstider: 68,10 kr/tim. Natt kl. 22.00–06.00 mot lördag, söndag eller helgdag: 78,30 kr/tim från 1 april 2026",
      obHoliday:
        "Storhelg: 130,70 kr/tim. Natt kl. 22.00–06.00 under angiven storhelg: 156,90 kr/tim från 1 april 2026",
      vacationDays:
        "25 dagar till och med intjänandeåret då du fyller 39, 31 dagar från året du fyller 40 och 32 dagar från året du fyller 50",
      parentalPay:
        "Efter minst 180 dagars sammanhängande anställning: 10 % av lönebortfallet i högst 180 kalenderdagar per födsel och längst tills barnet är 24 månader, när avtalets villkor är uppfyllda",
      noticePeriod:
        "I kommun, region och kommunalförbund efter minst 12 månaders sammanhängande anställning: 3 månader när du säger upp dig och 6 månader när arbetsgivaren säger upp. Andra regler kan gälla hos Sobona-arbetsgivare",
      pension:
        "Tjänstepension regleras i ett separat pensionsavtal. De flesta omfattas av AKAP-KR, medan vissa fortsatt kan omfattas av KAP-KL. Kontrollera vilket pensionsavtal som gäller för dig",
      workHoursPerWeek:
        "Normalt 40 timmar per helgfri vecka. Vid arbete både vardag och sön-/helgdag normalt 38 timmar 15 minuter. Kontinuerligt treskift: 34 timmar 20 minuter; intermittent treskift: 36 timmar 20 minuter",
    },
    faq: [
      {
        question: "Vad är skillnaden mellan AB 25 och HÖK?",
        answer:
          "AB 25 innehåller allmänna anställningsvillkor. HÖK innehåller löneavtal och särskilda bestämmelser för ett visst avtalsområde. För ett säkert svar kan båda behöva läsas tillsammans.",
      },
      {
        question: "Hur ersätts övertid?",
        answer:
          "De två första timmarna närmast före eller efter ordinarie arbetstid är normalt enkel övertid: 1,5 timmes ledighet eller 180 procent av månadslönen delad med 165. Annan tid är normalt kvalificerad övertid: 2 timmars ledighet eller 240 procent av samma timvärde.",
      },
      {
        question: "Hur många semesterdagar ger AB 25?",
        answer:
          "25 dagar till och med året du fyller 39, 31 dagar från året du fyller 40 och 32 dagar från året du fyller 50. Intjänande och betalning påverkas av avtalets övriga villkor.",
      },
      {
        question: "Vilken uppsägningstid gäller i kommun eller region?",
        answer:
          "Efter minst 12 månaders sammanhängande anställning är huvudregeln 3 månader när du själv säger upp dig och 6 månader när arbetsgivaren säger upp. Hos andra Sobona-arbetsgivare kan andra regler gälla.",
      },
    ],
    relatedAgreements: [
      "hok-kommunal",
      "hok-vision",
      "sjukskoterska-avtal",
      "laraavtalet",
      "lakare-kommun",
      "hok-akademiker",
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "AB 25 §§ 13, 20–21, 27, 29 och 33 samt SKR:s aktuella pensionsinformation",
      label: "Öppna AB 25 i original",
      url: "https://skr.se/download/18.4c5d386919996f3b21151e81/1759306535392/Allmanna-Bestammelser-AB-25-i-lydelse-2025-04-01.pdf",
    },
  },
  "hok-vision": {
    summary:
      "HÖK 25 gäller mellan SKR/Sobona och OFR Allmän kommunal verksamhet, där Vision, Akademikerförbundet SSR, Ledarna och Fackförbundet Scen och Film ingår. Lönen sätts individuellt och lokalt. Det garanterade utfallet 2026 är 3,0 procent av organisationens samlade lönesumma, inte en garanti för varje person. AB 25 innehåller de allmänna villkoren. Avtalet gäller 1 april 2025–31 mars 2027.",
    keyFacts: {
      minimumWage:
        "Ingen central lägstalön. Lönen sätts individuellt och differentierat. Det garanterade utfallet 2026 är 3,0 procent av organisationens lönesumma, inte en personlig lönegaranti",
      overtimeRate:
        "Enkel övertid: 1,5 timmes ledighet eller 180 % av månadslönen/165 per timme. Kvalificerad övertid: 2 timmars ledighet eller 240 % av månadslönen/165 per timme",
      obWeekday:
        "Vardagar kl. 19.00–22.00: 26,40 kr/tim från 1 april 2026",
      obNight:
        "Vardagsnatt kl. 22.00–06.00: 58,40 kr/tim från 1 april 2026",
      obWeekend:
        "Helg och vissa fredagstider: 68,10 kr/tim. Natt mot lördag, söndag eller helgdag: 78,30 kr/tim från 1 april 2026",
      obHoliday:
        "Storhelg: 130,70 kr/tim. Natt under angiven storhelg: 156,90 kr/tim från 1 april 2026",
      vacationDays:
        "25 dagar till och med året du fyller 39, 31 dagar från året du fyller 40 och 32 dagar från året du fyller 50",
      parentalPay:
        "Efter minst 180 dagars sammanhängande anställning: 10 % av lönebortfallet i högst 180 kalenderdagar per födsel och längst tills barnet är 24 månader, när villkoren är uppfyllda",
      noticePeriod:
        "I kommun, region och kommunalförbund efter minst 12 månaders sammanhängande anställning: 3 månader när du säger upp dig och 6 månader när arbetsgivaren säger upp. Andra regler kan gälla hos Sobona-arbetsgivare",
      pension:
        "Tjänstepensionen regleras separat. De flesta omfattas av AKAP-KR, men vissa kan fortfarande omfattas av KAP-KL",
      workHoursPerWeek:
        "Normalt 40 timmar per helgfri vecka. Vid arbete både vardag och sön-/helgdag är måttet normalt 38 timmar 15 minuter. Särskilda skiftmått kan gälla",
    },
    faq: [
      {
        question: "Får alla 3,0 procent högre lön 2026?",
        answer:
          "Nej. 3,0 procent är ett garanterat utfall för organisationens samlade lönesumma. Den individuella lönen bestäms lokalt och kan utvecklas annorlunda.",
      },
      {
        question: "Finns en central lägstalön?",
        answer:
          "Nej. HÖK 25 OFR AKV innehåller ingen central lägstalön. Lönen sätts individuellt och lokalt.",
      },
      {
        question: "Vad är skillnaden mellan HÖK 25 och AB 25?",
        answer:
          "HÖK 25 innehåller löneavtalet och områdets särskilda regler. AB 25 innehåller gemensamma villkor om bland annat arbetstid, övertid, OB, semester och uppsägning.",
      },
      {
        question: "Vilka fackförbund ingår i avtalsområdet?",
        answer:
          "OFR Allmän kommunal verksamhet omfattar Vision, Akademikerförbundet SSR, Ledarna och Fackförbundet Scen och Film.",
      },
    ],
    relatedAgreements: ["ab-kommunalt"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "HÖK 25 §§ 1 och 5, löneavtalet §§ 1–2 samt AB 25 §§ 13, 20–21, 27, 29 och 33",
      label: "Öppna HÖK 25 OFR AKV i original",
      url: "https://skr.se/download/18.4d2a888c19913a970f86d11f/1757406625508/Huvudoverenskommelse-%28HOK%29-25-med-OFR-AKV.pdf",
    },
  },
  laraavtalet: {
    summary:
      "HÖK 25 med OFR Lärare är avtalet mellan SKR/Sobona och Sveriges Lärare. Lönen sätts individuellt. Det garanterade utfallet 2026 är 3,0 procent av organisationens lönesumma, inte en garanti för varje lärare. AB 25 ger grundvillkoren och Bilaga M har särskilda regler om arbetstid och ferie för de lärare som omfattas. Avtalet gäller 1 april 2025–31 mars 2027.",
    keyFacts: {
      minimumWage:
        "Ingen central lägstalön. Lönen sätts individuellt. Det garanterade utfallet 2026 är 3,0 procent av organisationens lönesumma, inte en personlig lönegaranti",
      overtimeRate:
        "På reglerad arbetstid: enkel övertid ger 1,5 timmes ledighet eller 180 % av månadslönen/165 per timme; kvalificerad övertid ger 2 timmar eller 240 %. Reglerna gäller inte förtroendearbetstid",
      obWeekday:
        "På reglerad arbetstid vardagar kl. 19.00–22.00: 26,40 kr/tim från 1 april 2026. OB-regeln gäller inte förtroendearbetstid",
      obNight:
        "På reglerad arbetstid vardagsnatt kl. 22.00–06.00: 58,40 kr/tim från 1 april 2026. OB-regeln gäller inte förtroendearbetstid",
      obWeekend:
        "På reglerad arbetstid: 68,10 kr/tim under helg och vissa fredagstider, samt 78,30 kr/tim nattetid mot lördag, söndag eller helgdag från 1 april 2026",
      obHoliday:
        "På reglerad arbetstid: 130,70 kr/tim under storhelg och 156,90 kr/tim under angiven storhelgsnatt från 1 april 2026",
      vacationDays:
        "Semestertjänst följer AB 25: 25, 31 eller 32 dagar beroende på ålder. För ferieanställda läggs semesterledigheten normalt i de första 45 kalenderdagarna av ferieperioden och dagar kan inte sparas",
      parentalPay:
        "Efter minst 180 dagars sammanhängande anställning: 10 % av lönebortfallet i högst 180 kalenderdagar per födsel och längst tills barnet är 24 månader, när villkoren är uppfyllda",
      noticePeriod:
        "I kommun, region och kommunalförbund efter minst 12 månaders sammanhängande anställning: 3 månader när du säger upp dig och 6 månader när arbetsgivaren säger upp. Andra regler kan gälla hos Sobona-arbetsgivare",
      pension:
        "Tjänstepensionen regleras separat. De flesta omfattas av AKAP-KR, men vissa kan fortfarande omfattas av KAP-KL",
      workHoursPerWeek:
        "För heltidsanställda enligt Bilaga M är den genomsnittliga årsarbetstiden 1 767 timmar exklusive semester. Av detta är 1 360 timmar reglerad tid på 194 A-dagar; resten är förtroendearbetstid. Lokala eller enskilda avvikelser kan finnas",
    },
    faq: [
      {
        question: "Arbetar alla lärare 40 timmar i veckan?",
        answer:
          "Nej. För lärare som omfattas av Bilaga M används årsarbetstid. Den reglerade tiden är 1 360 timmar på 194 A-dagar och resten är förtroendearbetstid.",
      },
      {
        question: "Får alla lärare 3,0 procent högre lön 2026?",
        answer:
          "Nej. 3,0 procent gäller organisationens samlade lönesumma. Lönen sätts individuellt och utfallet för en enskild lärare kan bli ett annat.",
      },
      {
        question: "Är sommarlovet samma sak som semester?",
        answer:
          "Nej. För en ferieanställd består den längre arbetsfria perioden av ferie. Semesterledigheten räknas normalt till de första 45 kalenderdagarna av ferieperioden.",
      },
      {
        question: "Omfattas alla lärare av Bilaga M?",
        answer:
          "Nej. Bilagan har ett bestämt tillämpningsområde och lokala eller enskilda avtal kan ändra upplägget. Kontrollera anställningen och det lokala avtalet.",
      },
      {
        question: "Gäller övertidsersättning för förtroendearbetstid?",
        answer:
          "Nej. Bilaga M säger att AB:s övertids- och OB-regler inte gäller förtroendearbetstiden. De kan gälla arbete som beordras utöver den reglerade tiden.",
      },
    ],
    relatedAgreements: ["ab-kommunalt"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "HÖK 25 §§ 1 och 7, löneavtalet §§ 1–2, Bilaga M punkterna 1, 6–8, 14 och 18–20 samt AB 25",
      label: "Öppna HÖK 25 Lärare i original",
      url: "https://skr.se/download/18.4d2a888c19913a970f86d2cf/1757406957810/HOK-25-OFRs-Larare.pdf",
    },
  },
  "sjukskoterska-avtal": {
    summary:
      "HÖK 25 gäller mellan SKR/Sobona och OFR Hälso- och sjukvård, där Vårdförbundet är part. Det är inte en central lönetabell för sjuksköterskor. Lönen sätts individuellt och det garanterade utfallet 2026 är 3,0 procent av organisationens lönesumma, inte en personlig garanti. AB 25 och HÖK:s särskilda arbetstidsregler innehåller övriga villkor. Avtalet gäller 1 april 2025–31 mars 2027.",
    keyFacts: {
      minimumWage:
        "Ingen central lägstalön eller yrkeslön. Lönen sätts individuellt. Det garanterade utfallet 2026 är 3,0 procent av organisationens lönesumma, inte en personlig lönegaranti",
      overtimeRate:
        "Enkel övertid: 1,5 timmes ledighet eller 180 % av månadslönen/165 per timme. Kvalificerad övertid: 2 timmar eller 240 %. Den som har rätt till ersättning får dessutom 100 % av månadslönen/165 för nettot över 200 övertids- och mertidstimmar under året",
      obWeekday:
        "Vardagar kl. 19.00–22.00: 26,40 kr/tim från 1 april 2026",
      obNight:
        "Vardagsnatt kl. 22.00–06.00: 58,40 kr/tim från 1 april 2026",
      obWeekend:
        "Helg och vissa fredagstider: 68,10 kr/tim. Natt mot lördag, söndag eller helgdag: 78,30 kr/tim från 1 april 2026",
      obHoliday:
        "Storhelg: 130,70 kr/tim. Natt under angiven storhelg: 156,90 kr/tim från 1 april 2026",
      vacationDays:
        "25 dagar till och med året du fyller 39, 31 dagar från året du fyller 40 och 32 dagar från året du fyller 50",
      parentalPay:
        "Efter minst 180 dagars sammanhängande anställning: 10 % av lönebortfallet i högst 180 kalenderdagar per födsel och längst tills barnet är 24 månader, när villkoren är uppfyllda",
      noticePeriod:
        "I kommun, region och kommunalförbund efter minst 12 månaders sammanhängande anställning: 3 månader när du säger upp dig och 6 månader när arbetsgivaren säger upp. Andra regler kan gälla hos Sobona-arbetsgivare",
      pension:
        "Tjänstepensionen regleras separat. De flesta omfattas av AKAP-KR, men vissa kan fortfarande omfattas av KAP-KL",
      workHoursPerWeek:
        "Ständig natt är normalt 34 timmar 20 minuter när schemat även omfattar sön-/helgdag, annars 36 timmar. Vid rotation är måttet 36 timmar 20 minuter när minst 10 % är natt och 34 timmar 20 minuter när minst 30 % är natt. Lokala avtal kan avvika",
    },
    faq: [
      {
        question: "Finns en central lönetabell för sjuksköterskor?",
        answer:
          "Nej. HÖK 25 anger ingen central sjuksköterskelön eller lägstalön. Lönen bestäms individuellt och lokalt.",
      },
      {
        question: "Får alla 3,0 procent högre lön 2026?",
        answer:
          "Nej. Procentsatsen gäller Vårdförbundets samlade lönesumma hos arbetsgivaren. Den enskilda lönen kan utvecklas annorlunda.",
      },
      {
        question: "Vilket heltidsmått gäller vid nattarbete?",
        answer:
          "Det beror på schemat. Ständig natt är normalt 34 timmar 20 minuter när även helger ingår och 36 timmar vid enbart vardagsnätter. Rotation har egna mått beroende på andelen nattpass.",
      },
      {
        question: "När gäller den extra ersättningen efter 200 timmar?",
        answer:
          "Den gäller den som har rätt till övertids- eller mertidsersättning och vars sammanräknade nettotid överstiger 200 timmar under kalenderåret. Uttagen kompensationsledighet räknas av.",
      },
      {
        question: "Kan lokala arbetstidsregler finnas?",
        answer:
          "Ja. HÖK 25 tillåter lokala avtal om bland annat natt- och rotationsarbete. Därför behöver det lokala avtalet och schemat kontrolleras.",
      },
    ],
    relatedAgreements: ["ab-kommunalt"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "HÖK 25 §§ 1 och 6, löneavtalet §§ 1–2, anteckningar till AB punkterna 3, 5, 13 och 16 samt AB 25 §§ 13, 20–21, 27, 29 och 33",
      label: "Öppna HÖK 25 Hälso- och sjukvård i original",
      url: "https://skr.se/download/18.4d2a888c19913a970f86d134/1757406796925/HOK-25-OFR-H%C3%A4lso-och-sjukvard..pdf",
    },
  },
  "hok-akademiker": {
    summary:
      "HÖK T är tillsvidareavtalet mellan SKR/Sobona och AkademikerAlliansen. Lönen sätts individuellt och lokalt. Avtalet har varken central lägstalön eller en centralt bestämd procentsats för löneökningar. AB 25 reglerar de allmänna anställningsvillkoren. Nuvarande lydelse gäller från 1 april 2025.",
    keyFacts: {
      minimumWage:
        "Ingen central lägstalön och ingen centralt bestämd procentsats för löneökningar. Lönen sätts individuellt och lokalt",
      overtimeRate:
        "Enkel övertid: 1,5 timmes ledighet eller 180 % av månadslönen/165 per timme. Kvalificerad övertid: 2 timmars ledighet eller 240 % av månadslönen/165 per timme",
      obWeekday:
        "Vardagar kl. 19.00–22.00: 26,40 kr/tim från 1 april 2026",
      obNight:
        "Vardagsnatt kl. 22.00–06.00: 58,40 kr/tim från 1 april 2026",
      obWeekend:
        "Helg och vissa fredagstider: 68,10 kr/tim. Natt mot lördag, söndag eller helgdag: 78,30 kr/tim från 1 april 2026",
      obHoliday:
        "Storhelg: 130,70 kr/tim. Natt under angiven storhelg: 156,90 kr/tim från 1 april 2026",
      vacationDays:
        "25 dagar till och med året du fyller 39, 31 dagar från året du fyller 40 och 32 dagar från året du fyller 50",
      parentalPay:
        "Efter minst 180 dagars sammanhängande anställning: 10 % av lönebortfallet i högst 180 kalenderdagar per födsel och längst tills barnet är 24 månader, när villkoren är uppfyllda",
      noticePeriod:
        "I kommun, region och kommunalförbund efter minst 12 månaders sammanhängande anställning: 3 månader när du säger upp dig och 6 månader när arbetsgivaren säger upp. Andra regler kan gälla hos Sobona-arbetsgivare",
      pension:
        "Tjänstepensionen regleras separat. De flesta omfattas av AKAP-KR, men vissa kan fortfarande omfattas av KAP-KL",
      workHoursPerWeek:
        "Normalt 40 timmar per helgfri vecka. Vid arbete både vardag och sön-/helgdag är måttet normalt 38 timmar 15 minuter. Särskilda skiftmått kan gälla",
    },
    faq: [
      {
        question: "Har HÖK T en bestämd löneökning i procent?",
        answer:
          "Nej. Avtalet anger ingen central procentsats. Löneöversynen sker lokalt och lönen sätts individuellt.",
      },
      {
        question: "Finns en central lägstalön?",
        answer:
          "Nej. HÖK T innehåller ingen central lägstalön för akademikeryrkena.",
      },
      {
        question: "Vad är skillnaden mellan HÖK T och AB 25?",
        answer:
          "HÖK T reglerar löneprocessen och områdets särskilda frågor. AB 25 innehåller de gemensamma anställningsvillkoren.",
      },
      {
        question: "Hur länge gäller HÖK T?",
        answer:
          "Avtalet gäller tills vidare. Uppsägningstiden mellan de centrala parterna är fem kalendermånader och avtalet kan bara sägas upp med verkan från den 1 april.",
      },
    ],
    relatedAgreements: ["ab-kommunalt"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "HÖK T §§ 1 och 5, löneavtalet §§ 1–2 samt AB 25 §§ 13, 20–21, 27, 29 och 33",
      label: "Öppna HÖK T AkademikerAlliansen i original",
      url: "https://skr.se/download/18.4d2a888c19913a970f86cfd2/1757406413579/HOK-T-med-AkademikerAlliansen-i-lydelse%202025-04-01.pdf",
    },
  },
  "lakare-kommun": {
    summary:
      "HÖK 25 Läkare är avtalet mellan SKR/Sobona och OFR Läkare, där Sveriges läkarförbund ingår. Lönen sätts individuellt. Det garanterade utfallet 2026 är 3,0 procent av organisationens lönesumma, inte en personlig garanti. AT-läkare och andra läkare utan legitimation omfattas inte av de vanliga löneöversynsreglerna. AB 25 och läkarnas specialbestämmelser reglerar bland annat arbetstid, jour och beredskap. Avtalet gäller 1 april 2025–31 mars 2027.",
    keyFacts: {
      minimumWage:
        "Ingen central löne- eller yrkestabell. Lönen sätts individuellt. Det garanterade utfallet 2026 är 3,0 procent av organisationens lönesumma. AT-läkare och andra läkare utan legitimation omfattas inte av de vanliga löneöversynsreglerna",
      overtimeRate:
        "När arbetet är övertid enligt AB 25 är enkel övertid 1,5 timmes ledighet eller 180 % av månadslönen/165 och kvalificerad övertid 2 timmar eller 240 %. Jour och beredskap ersätts i stället enligt läkarnas specialregler",
      obWeekday:
        "Vid ordinarie arbete vardagar kl. 19.00–22.00 är AB-nivån 26,40 kr/tim från 1 april 2026. Aktivt arbete under jour eller beredskap följer i stället läkarnas särskilda tidsfaktorer. Lokala avtal kan avvika",
      obNight:
        "Vid ordinarie vardagsnatt kl. 22.00–06.00 är AB-nivån 58,40 kr/tim från 1 april 2026. Aktivt arbete under jour eller beredskap kl. 21.00–24.00 räknas med faktor 1,5 och kl. 00.00–07.00 med faktor 2",
      obWeekend:
        "Vid ordinarie helgarbete är AB-nivån 68,10 kr/tim och 78,30 kr/tim under angiven natt från 1 april 2026. Aktivt arbete under jour eller beredskap räknas med faktor 1,5 eller 2 beroende på tiden. Lokala avtal kan avvika",
      obHoliday:
        "Vid ordinarie storhelgsarbete är AB-nivån 130,70 kr/tim och 156,90 kr/tim under angiven natt från 1 april 2026. Aktivt arbete under jour eller beredskap på helgdag räknas med faktor 2; bunden tid har andra andelar",
      vacationDays:
        "AB 25 ger 25 dagar till och med året du fyller 39, 31 dagar från året du fyller 40 och 32 dagar från året du fyller 50. Vissa särskilda undervisningsbefattningar har egna regler",
      parentalPay:
        "Efter minst 180 dagars sammanhängande anställning: 10 % av lönebortfallet i högst 180 kalenderdagar per födsel och längst tills barnet är 24 månader, när villkoren är uppfyllda",
      noticePeriod:
        "För ett tidsbegränsat läkarförordnande är uppsägningstiden 3 månader efter minst 12 månaders anställning och annars 1 månad. För andra anställningar gäller AB 25:s regler",
      pension:
        "Tjänstepensionen regleras separat. De flesta omfattas av AKAP-KR, men vissa kan fortfarande omfattas av KAP-KL. Lokalt kan jourersättning i vissa fall avsättas till pension",
      workHoursPerWeek:
        "Ordinarie arbetstid förläggs normalt till helgfri måndag–fredag kl. 07.00–21.00. Efter lokal förhandling kan ordinarie tid läggas även utanför detta. Jour och beredskap följer särskilda regler",
    },
    faq: [
      {
        question: "Finns centrala löner för AT-, ST- och specialistläkare?",
        answer:
          "Nej. Avtalet har ingen central lönetabell för dessa grupper. Lönen sätts individuellt och lokalt.",
      },
      {
        question: "Får alla läkare 3,0 procent högre lön 2026?",
        answer:
          "Nej. 3,0 procent gäller organisationens samlade lönesumma, inte varje individ. AT-läkare och andra läkare utan legitimation omfattas dessutom inte av de vanliga löneöversynsreglerna.",
      },
      {
        question: "Är jourersättning samma sak som vanligt OB?",
        answer:
          "Nej. Läkarnas specialbestämmelser skiljer mellan bunden tid och aktivt arbete under jour eller beredskap. Tidpunkt, aktivitet, månadslön och eventuella lokala avtal påverkar ersättningen.",
      },
      {
        question: "Kan en utbildningsläkare avtala bort övertidsersättningen?",
        answer:
          "För en AT-, BT- eller ST-anställning som börjar 1 april 2026 eller senare får rätten inte avtalas bort före den första basspecialiteten. Därefter kan en sådan överenskommelse vara möjlig.",
      },
      {
        question: "Vilken uppsägningstid har ett tidsbegränsat förordnande?",
        answer:
          "Tre månader när läkaren har varit anställd hos arbetsgivaren i minst tolv månader, annars en månad. För andra tidsbegränsade anställningar behöver AB 25 kontrolleras.",
      },
    ],
    relatedAgreements: ["ab-kommunalt"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "HÖK 25 §§ 1 och 7, löneavtalet §§ 1–2, läkarnas specialbestämmelser punkterna 4–24 samt AB 25 §§ 20, 27 och 29",
      label: "Öppna HÖK 25 Läkare i original",
      url: "https://skr.se/download/18.2eae6b4519a0f5b858e1b6e7/1761294674524/H%C3%96K%2025%20L%C3%A4karf%C3%B6rbundet.pdf",
    },
  },
  "villkorsavtal-saco": {
    summary:
      "Villkorsavtal-T mellan Arbetsgivarverket och Saco-S reglerar statliga anställningsvillkor, men är inte själva löneavtalet. Löneprocessen finns i RALS 2010-T, som gäller tills vidare och saknar centralt löneutrymme och individuella garantier. Villkorsavtalets aktuella lydelse gäller från 1 januari 2026. Tjänstepensionen regleras separat i PA 16.",
    keyFacts: {
      minimumWage:
        "Ingen central lägstalön. Lönesättningen regleras i RALS 2010-T, som är sifferlöst och saknar både centralt angivet löneutrymme och individgarantier",
      overtimeRate:
        "Enkel övertid: månadslönen/94 per timme eller 1,5 timmes ledighet. Kvalificerad övertid: månadslönen/72 per timme eller 2 timmars ledighet. Enskilda eller lokala överenskommelser kan påverka rätten",
      obWeekday:
        "Villkorsavtal-T har ingen allmän central OB-tabell för ordinarie arbete. För oregelbunden arbetstid regleras arbetstid och arbetstidsberoende ersättningar i lokalt kollektivavtal",
      obNight:
        "Ingen allmän central OB-nivå. Natt kl. 22.00–06.00 räknas som kvalificerad övertid när arbetet faktiskt är beordrad övertid; ordinarie nattarbete regleras lokalt",
      obWeekend:
        "Ingen allmän central OB-nivå. Övertid från fredag kl. 19.00 till måndag kl. 07.00 är kvalificerad, men ordinarie helgarbete och dess tillägg regleras lokalt",
      obHoliday:
        "Ingen allmän central OB-nivå. Avtalet anger särskilda helgperioder som kvalificerad övertid när arbetet är övertid; ersättning för ordinarie helgdagsarbete regleras lokalt",
      vacationDays:
        "28 dagar till och med året du fyller 29, 31 dagar från året du fyller 30 och 35 dagar från året du fyller 40",
      parentalPay:
        "Föräldrapenningtillägg i högst 360 dagar per födsel eller adoption: 10 % på lönedelar under föräldrapenningtaket och 90 % på lönedelar över taket, när villkoren är uppfyllda",
      noticePeriod:
        "När du säger upp dig: 1 månad vid högst 1 års statlig anställning och 2 månader därefter. När arbetsgivaren säger upp: 1 månad vid högst 1 år och 3 månader därefter, eller längre tid om LAS ger det",
      pension:
        "Statlig tjänstepension regleras i PA 16. Vilken avdelning och vilka delar som gäller beror bland annat på födelseår",
      workHoursPerWeek:
        "För kontorsarbetstid är heltidsmåttet i genomsnitt 39 timmar 45 minuter under en helgfri vecka. Annan förläggning och oregelbunden arbetstid regleras lokalt",
    },
    faq: [
      {
        question: "Är Villkorsavtal-T också löneavtalet?",
        answer:
          "Nej. Villkorsavtal-T reglerar anställningsvillkor. Löneprocessen regleras i det separata avtalet RALS 2010-T.",
      },
      {
        question: "Finns en garanterad löneökning i procent?",
        answer:
          "Nej. RALS 2010-T är sifferlöst och innehåller varken ett centralt löneutrymme eller individuella garantier.",
      },
      {
        question: "Finns ett centralt OB-tillägg?",
        answer:
          "Inte som en allmän tabell i Villkorsavtal-T. För oregelbunden arbetstid bestäms arbetstid och tillägg i lokala kollektivavtal.",
      },
      {
        question: "Hur många semesterdagar får en statligt anställd?",
        answer:
          "28 dagar till och med året du fyller 29, 31 dagar från året du fyller 30 och 35 dagar från året du fyller 40.",
      },
      {
        question: "Vilket pensionsavtal gäller?",
        answer:
          "Den statliga tjänstepensionen regleras i PA 16, inte i Villkorsavtal-T. Födelseår och anställningsförhållanden påverkar vilka delar du omfattas av.",
      },
    ],
    relatedAgreements: ["villkorsavtal-ofr"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "Villkorsavtal-T 3 kap. 1 §, 4 kap. 6, 13, 17–23 och 26 §§, 5 kap. 3 §, 8 kap. 1–3 §§ och 14 kap. 2–3 §§ samt RALS 2010-T och PA 16",
      label: "Öppna Villkorsavtal-T Saco-S i original",
      url: "https://www.arbetsgivarverket.se/globalassets/arbetsgivarverket/avtal-och-skrifter/avtal/villkorsavtal-t-arbetsgivarverket---saco-s/villkorsavtal-t-saco-s-6.0-20260114.pdf",
    },
  },
  "villkorsavtal-ofr": {
    summary:
      "Villkorsavtalet mellan Arbetsgivarverket och OFR/S,P,O reglerar statliga anställningsvillkor. Löneprocessen finns i RALS 2025–2027. RALS saknar normalt centrala individgarantier. Procentsatserna 3,4 procent för 2025 och 2,9 procent för 2026 används bara vid en särskild oenighet och är inte automatiska löneökningar. Villkorsavtalets aktuella lydelse gäller från 1 januari 2026 och RALS gäller 1 oktober 2025–30 september 2027.",
    keyFacts: {
      minimumWage:
        "Ingen central lägstalön. RALS 2025–2027 saknar normalt centrala individgarantier. 3,4 % för 2025 och 2,9 % för 2026 används endast om lokala parter inte kan enas enligt avtalets särskilda ordning",
      overtimeRate:
        "Enkel övertid: månadslönen/94 per timme eller 1,5 timmes ledighet. Kvalificerad övertid: månadslönen/72 per timme eller 2 timmars ledighet. Enskilda eller lokala överenskommelser kan påverka rätten",
      obWeekday:
        "Villkorsavtalet har ingen allmän central OB-tabell för ordinarie arbete. För oregelbunden arbetstid regleras arbetstid och arbetstidsberoende ersättningar i lokalt kollektivavtal",
      obNight:
        "Ingen allmän central OB-nivå. Natt kl. 22.00–06.00 räknas som kvalificerad övertid när arbetet faktiskt är beordrad övertid; ordinarie nattarbete regleras lokalt",
      obWeekend:
        "Ingen allmän central OB-nivå. Övertid från fredag kl. 19.00 till måndag kl. 07.00 är kvalificerad, men ordinarie helgarbete och dess tillägg regleras lokalt",
      obHoliday:
        "Ingen allmän central OB-nivå. Avtalet anger särskilda helgperioder som kvalificerad övertid när arbetet är övertid; ersättning för ordinarie helgdagsarbete regleras lokalt",
      vacationDays:
        "28 dagar till och med året du fyller 29, 31 dagar från året du fyller 30 och 35 dagar från året du fyller 40",
      parentalPay:
        "Föräldrapenningtillägg i högst 360 dagar per födsel eller adoption: 10 % på lönedelar under föräldrapenningtaket och 90 % på lönedelar över taket, när villkoren är uppfyllda",
      noticePeriod:
        "När du säger upp dig: 1 månad vid högst 1 års statlig anställning och 2 månader därefter. När arbetsgivaren säger upp: 1 månad vid högst 1 år och 3 månader därefter, eller längre tid om LAS ger det",
      pension:
        "Statlig tjänstepension regleras i PA 16. Vilken avdelning och vilka delar som gäller beror bland annat på födelseår",
      workHoursPerWeek:
        "För kontorsarbetstid är heltidsmåttet i genomsnitt 39 timmar 45 minuter under en helgfri vecka. Annan förläggning och oregelbunden arbetstid regleras lokalt",
    },
    faq: [
      {
        question: "Är Villkorsavtalet också löneavtalet?",
        answer:
          "Nej. Villkorsavtalet reglerar anställningsvillkor. Löneprocessen regleras i RALS 2025–2027.",
      },
      {
        question: "Får alla 3,4 eller 2,9 procent högre lön?",
        answer:
          "Nej. Procentsatserna används bara i avtalets ordning när lokala parter inte kan enas. De är inte automatiska löneökningar eller personliga garantier.",
      },
      {
        question: "Finns ett centralt OB-tillägg?",
        answer:
          "Inte som en allmän tabell i Villkorsavtalet. För oregelbunden arbetstid bestäms arbetstid och tillägg i lokala kollektivavtal.",
      },
      {
        question: "Är helgarbete alltid kvalificerad övertid?",
        answer:
          "Nej. Det är kvalificerad övertid bara när arbetet är övertid enligt avtalet. Ordinarie helgarbete och eventuella tillägg följer det lokala kollektivavtalet.",
      },
      {
        question: "Vilket pensionsavtal gäller?",
        answer:
          "Den statliga tjänstepensionen regleras i PA 16. Födelseår och anställningsförhållanden påverkar vilka delar du omfattas av.",
      },
    ],
    relatedAgreements: ["villkorsavtal-saco"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "Villkorsavtalet 3 kap. 1 §, 4 kap. 6, 13, 17–23 och 26 §§, 5 kap. 3 §, 8 kap. 1–3 §§ och 14 kap. 2–3 §§ samt RALS 2025–2027 och PA 16",
      label: "Öppna Villkorsavtalet OFR/S,P,O i original",
      url: "https://www.arbetsgivarverket.se/globalassets/arbetsgivarverket/avtal-och-skrifter/avtal/villkorsavtal-arbetsgivarverket---ofrspo/villkorsavtal-ofr-s-p-o-6.0-20260114.pdf",
    },
  },
  byggavtalet: {
    summary:
      "Byggavtalet är ett riksavtal mellan Byggföretagen och Svenska Byggnadsarbetareförbundet för arbete inom avtalets bygg- och anläggningsområde hos arbetsgivare som är bundna av avtalet. Avtalet innehåller både prestationslön och tidlön. Uppgifterna nedan är kontrollerade mot avtalet som gäller 1 maj 2025–30 april 2027.",
    keyFacts: {
      minimumWage:
        "Grundlön för yrkesarbetare, yrkeskunniga, maskinförare och bygglogistikarbetare: 203 kr/tim eller 35 322 kr/mån (1 maj 2026–30 april 2027). Andra kategorier och lärlingar har egna nivåer",
      overtimeRate:
        "Ordinarie lön för arbetade timmar plus 30, 50, 70 eller 100 % av utgående lön beroende på när övertiden utförs. OB betalas inte samtidigt",
      obWeekday:
        "Måndag–fredag kl. 05.00–06.00: 20 %. Kl. 18.00–22.00: 40 % av utgående lön",
      obNight:
        "Måndag–fredag kl. 22.00–05.00: 70 % av utgående lön",
      obWeekend:
        "Lördag, söndag och helgdag: 70 % av utgående lön hela dygnet",
      obHoliday:
        "Helgdag: 70 % av utgående lön hela dygnet. Byggavtalets OB-tabell anger ingen separat högre nivå för storhelg",
      vacationDays:
        "Timavlönade får 13,0 % av semesterlöneunderlaget. Månadsavlönade har en annan beräkningsmodell",
      parentalPay:
        "Föräldrapenningtillägg (FPT) ingår bland försäkringarna som arbetsgivaren ska teckna. Belopp, kvalifikationstid och ersättningsperiod följer separata försäkringsvillkor",
      noticePeriod:
        "Egen uppsägning: minst 1 månad. När arbetsgivaren säger upp: 1–6 månader beroende på sammanlagd anställningstid",
      pension:
        "Avtalspension SAF-LO ingår bland försäkringarna som arbetsgivaren ska teckna. Exakta premier och uttagsvillkor regleras separat",
      workHoursPerWeek:
        "Normalt 40 timmar per helgfri vecka, exklusive raster. Annan förläggning och särskilda skiftregler kan gälla",
    },
    wageTable: [
      {
        role: "Yrkesarbetare",
        minimum: "203,00 kr/tim · 35 322 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Yrkesarbetare – föregående avtalsår",
        minimum: "196,00 kr/tim · 34 104 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2025–30 april 2026",
      },
      {
        role: "Övriga arbetstagare 1",
        minimum: "178,64 kr/tim · 31 083 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Övriga arbetstagare 2",
        minimum: "142,10 kr/tim · 24 725 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Övriga arbetstagare 3",
        minimum: "101,50 kr/tim · 17 661 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Yrkeskunnig",
        minimum: "203,00 kr/tim · 35 322 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Speciell verksamhet S1",
        minimum: "178,64 kr/tim · 31 083 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Speciell verksamhet S2",
        minimum: "142,10 kr/tim · 24 725 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Speciell verksamhet S3",
        minimum: "131,95 kr/tim · 22 959 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Städpersonal 1",
        minimum: "159,75 kr/tim · 27 796 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Städpersonal 2",
        minimum: "109,01 kr/tim · 18 968 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Maskinförare",
        minimum: "203,00 kr/tim · 35 322 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Bilförare m.fl.",
        minimum: "192,85 kr/tim · 33 556 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Övriga förare",
        minimum: "178,64 kr/tim · 31 083 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Förrådsarbetare m.fl.",
        minimum: "192,85 kr/tim · 33 556 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Bygglogistikarbetare",
        minimum: "203,00 kr/tim · 35 322 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Övriga logistikarbetare L1",
        minimum: "182,70 kr/tim · 31 790 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Övriga logistikarbetare L2",
        minimum: "154,28 kr/tim · 26 845 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
    ],
    faq: [
      {
        question: "Är 203 kronor i timmen grundlön för alla?",
        answer:
          "Nej. Beloppet gäller bland annat yrkesarbetare och yrkeskunniga från 1 maj 2026. Andra kategorier och lärlingar har egna nivåer i avtalet.",
      },
      {
        question: "Är Byggavtalet bara ett timlöneavtal?",
        answer:
          "Nej. Avtalet innehåller både prestationslön, som ackord och resultatlön, och tidlön.",
      },
      {
        question: "Hur mycket arbetstidsförkortning tjänas in?",
        answer:
          "En heltidsanställd som arbetar hela intjänandeåret 1 april–31 mars tjänar in 40 timmar. Tiden räknas proportionellt om anställningen eller den kvalificerande tiden är kortare.",
      },
      {
        question: "Kan OB och övertid betalas samtidigt?",
        answer:
          "Nej. OB-tillägg betalas inte för tid då övertidsersättning betalas.",
      },
      {
        question: "Vilken pension och föräldraersättning ingår?",
        answer:
          "Arbetsgivaren ska teckna Avtalspension SAF-LO och Föräldrapenningtillägg (FPT). De exakta villkoren finns i de separata försäkrings- och pensionsvillkoren.",
      },
    ],
    relatedAgreements: [
      "entreprenadmaskinavtalet",
      "vag-banavtalet-seko",
      "plat-ventilationsavtalet",
      "vvs-montorsavtalet",
    ],
    sourceNote: {
      reviewedAt: "17 juli 2026",
      sections:
        "§§ 2–4, 9 och 12 samt bilagorna A1 och I",
      label: "Öppna Byggavtalet 2025–2027",
      url: "https://www.byggnads.se/49ec78/siteassets/kollektivavtal/byggavtalet-2025-digital-utgava-1.pdf",
    },
  },
  handelsavtalet: {
    summary:
      "Detaljhandelsavtalet gäller butiks- och kontorspersonal samt lager- och distributionspersonal när lagerenheten ligger i butiken eller bara betjänar en butik. Uppgifterna nedan är kontrollerade mot avtalet som gäller 1 april 2025–31 mars 2027.",
    keyFacts: {
      minimumWage:
        "Från 18 år: 26 626 kr/mån eller 160,40 kr/tim. Med 3 års branschvana: 29 156 kr/mån eller 175,64 kr/tim (1 april 2026–31 mars 2027)",
      overtimeRate:
        "Från 1 april 2026: personlig timlön plus 35 % de första två timmarna före eller efter ordinarie arbetstid, 70 % för övrig vardagsövertid och 100 % på angivna helg- och aftontider",
      obWeekday: "Måndag–fredag kl. 18.15–20.00: 50 %",
      obNight: "Måndag–fredag efter kl. 20.00: 70 %",
      obWeekend:
        "Lördag efter kl. 12.00 samt söndag och helgdag: 100 %",
      obHoliday:
        "Söndag och helgdag: 100 %. Jul-, nyårs- och midsommarafton jämställs med lördag, vilket ger 100 % efter kl. 12.00",
      vacationDays:
        "25 semesterdagar enligt semesterlagen. Semesterlönen är 13 % av semesterlöneunderlaget. För heltidsanställda med minst tre månaders sammanhängande anställning är garantin från 1 april 2026 minst 1 515 kr per betald dag från 18 år och 1 790 kr med 3 års branschvana",
      parentalPay:
        "Föräldrapenningtillägg (FPT) kan betalas enligt den separata försäkringen. Vem som har rätt och ersättningens storlek framgår av FPT-villkoren",
      noticePeriod:
        "Normalt 1 månad ömsesidigt. Vid uppsägning från arbetsgivaren: 1–6 månader beroende på anställningstid",
      pension:
        "Avtalspension SAF-LO samt en särskild förstärkt pensionsavsättning",
      workHoursPerWeek:
        "I genomsnitt 38 timmar och 15 minuter för heltidsanställda",
    },
    wageTable: [
      {
        role: "16 år",
        minimum: "17 324 kr/mån · 104,36 kr/tim",
        median: "",
        comment: "1 april 2026–31 mars 2027",
      },
      {
        role: "17 år",
        minimum: "17 734 kr/mån · 106,83 kr/tim",
        median: "",
        comment: "1 april 2026–31 mars 2027",
      },
      {
        role: "18 år",
        minimum: "26 626 kr/mån · 160,40 kr/tim",
        median: "",
        comment: "1 april 2026–31 mars 2027",
      },
      {
        role: "19 år",
        minimum: "26 946 kr/mån · 162,33 kr/tim",
        median: "",
        comment: "1 april 2026–31 mars 2027",
      },
      {
        role: "1 års branschvana efter 18 år",
        minimum: "27 530 kr/mån · 165,84 kr/tim",
        median: "",
        comment: "1 april 2026–31 mars 2027",
      },
      {
        role: "2 års branschvana efter 18 år",
        minimum: "27 866 kr/mån · 167,87 kr/tim",
        median: "",
        comment: "1 april 2026–31 mars 2027",
      },
      {
        role: "3 års branschvana efter 18 år",
        minimum: "29 156 kr/mån · 175,64 kr/tim",
        median: "",
        comment: "1 april 2026–31 mars 2027",
      },
    ],
    faq: [
      {
        question: "Hur mycket OB får jag på söndagar och helgdagar?",
        answer:
          "OB-tillägget är 100 % av timlönen. Det innebär ordinarie lön plus lika mycket i OB för den arbetade tiden.",
      },
      {
        question: "Kan OB och övertidsersättning betalas samtidigt?",
        answer:
          "Nej. Om samma tid ger rätt till både OB och övertids- eller mertidsersättning betalas bara den procentuellt högsta ersättningen.",
      },
      {
        question: "Hur beräknas semesterlönen?",
        answer:
          "Semesterlönen är 13 % av semesterlöneunderlaget. Avtalet har också garantibelopp per betald semesterdag när villkoren om anställningstid är uppfyllda.",
      },
      {
        question: "Finns föräldrapenningtillägg?",
        answer:
          "Ja, föräldralediga kan omfattas av försäkringen om föräldrapenningtillägg, FPT. Exakta villkor och belopp finns i försäkringsvillkoren.",
      },
      {
        question: "Hur lång är en heltidsvecka?",
        answer:
          "Den ordinarie arbetstiden för heltidsanställda är i genomsnitt 38 timmar och 15 minuter per vecka. Rast räknas inte som arbetstid.",
      },
    ],
    relatedAgreements: ["lager-ehandelsavtalet"],
    sourceNote: {
      reviewedAt: "17 juli 2026",
      sections: "§§ 1.1, 5.5, 6.1, 7.2, 8.1, 9.2, 14, 14.6, 16, 17.2, 17.14 och 18.1 samt semesterlagen 4 §",
      label: "Öppna Detaljhandelsavtalet 2025–2027",
      url: "https://www.in.se/globalassets/dokument/arbetsgivarguiden/publik/kollektivavtal/detaljhandelsavtalet-2025-2027-in.pdf",
    },
  },
  "hotell-restaurang": {
    summary:
      "Gröna riksavtalet är ett kollektivavtal mellan Visita och Hotell- och restaurangfacket (HRF). Det gäller arbete inom avtalsområdet hos arbetsgivare som är bundna av avtalet. Uppgifterna nedan är kontrollerade mot avtalet som gäller 1 april 2025–31 mars 2027.",
    keyFacts: {
      minimumWage:
        "Kvalificerat yrkesarbete: 28 425 kr/mån eller 164,30 kr/tim. Yrkesarbete: 26 580 kr/mån eller 153,64 kr/tim (1 april 2026–31 mars 2027). Högre nivåer gäller efter 6 års yrkesvana",
      overtimeRate:
        "Ordinarie lön plus 35 % de första två timmarna i anslutning till ordinarie arbetstid, därefter 70 %. Övertid som inte ligger i anslutning till ordinarie arbetstid ger 90 %",
      obWeekday:
        "Måndag–fredag kl. 20.00–06.00: 27,59 kr/tim",
      obNight:
        "Kl. 01.00–06.00: ytterligare 24,31 kr/tim, normalt totalt 51,90 kr/tim. Undantag finns för viss stadigvarande nattpersonal i hotellreception",
      obWeekend:
        "Lördag samt midsommar-, jul- och nyårsafton kl. 16.00–06.00: 27,59 kr/tim",
      obHoliday:
        "Söndag och helgdag kl. 06.00–06.00: 27,59 kr/tim. Särskild storhelgsersättning är 100 % av ordinarie timlön på jul- och nyårsafton som infaller på lördag eller söndag",
      vacationDays:
        "Semester enligt lag. Semesterlön och semesterersättning är 12,72 %. Lägsta dagbelopp kan gälla efter viss sammanhängande anställningstid",
      noticePeriod:
        "Egen uppsägning: minst 1 månad. När arbetsgivaren säger upp: 1–6 månader beroende på sammanlagd anställningstid",
      pension: "Avtalspension SAF-LO ingår bland avtalsförsäkringarna",
      parentalPay:
        "Föräldrapenningtillägg (FPT) ingår bland avtalsförsäkringarna",
      workHoursPerWeek:
        "Normalt 40 timmar i genomsnitt per vecka. Stadigvarande nattjänst i hotellreception, huvudsakligen kl. 00.00–07.00: 38 timmar",
    },
    wageTable: [
      {
        role: "Kvalificerat yrkesarbete",
        minimum: "28 425 kr/mån · 164,30 kr/tim",
        median: "",
        comment: "Minimilön 1 april 2026–31 mars 2027",
      },
      {
        role: "Kvalificerat yrkesarbete – 6 års yrkesvana",
        minimum: "30 428 kr/mån · 175,88 kr/tim",
        median: "",
        comment: "Minimilön 1 april 2026–31 mars 2027",
      },
      {
        role: "Yrkesarbete",
        minimum: "26 580 kr/mån · 153,64 kr/tim",
        median: "",
        comment: "Minimilön 1 april 2026–31 mars 2027",
      },
      {
        role: "Yrkesarbete – 6 års yrkesvana",
        minimum: "28 944 kr/mån · 167,31 kr/tim",
        median: "",
        comment: "Minimilön 1 april 2026–31 mars 2027",
      },
      {
        role: "Ungdomslön från 19 år",
        minimum: "21 610 kr/mån · 124,92 kr/tim",
        median: "",
        comment: "1 april 2026–31 mars 2027 · särskilda villkor gäller",
      },
      {
        role: "Ungdomslön från 18 år",
        minimum: "19 992 kr/mån · 115,56 kr/tim",
        median: "",
        comment: "1 april 2026–31 mars 2027 · särskilda villkor gäller",
      },
      {
        role: "Ungdomslön från 17 år",
        minimum: "19 181 kr/mån · 110,87 kr/tim",
        median: "",
        comment: "1 april 2026–31 mars 2027 · särskilda villkor gäller",
      },
      {
        role: "Ungdomslön under 17 år",
        minimum: "17 584 kr/mån · 101,64 kr/tim",
        median: "",
        comment: "1 april 2026–31 mars 2027 · särskilda villkor gäller",
      },
    ],
    faq: [
      {
        question: "Vilken minimilön gäller för mitt yrke?",
        answer:
          "Avtalet delar in arbetet efter utbildning, yrkesvana och svårighetsgrad. En jobbtitel som kock eller servitör räcker därför inte ensam för att avgöra rätt nivå.",
      },
      {
        question: "Hur mycket OB får jag på natten?",
        answer:
          "Mellan kl. 01.00 och 06.00 är det ordinarie OB-tillägget 27,59 kr per timme plus 24,31 kr i natt-OB, normalt totalt 51,90 kr per timme. Viss stadigvarande nattpersonal i hotellreception omfattas av en annan regel.",
      },
      {
        question: "Hur ersätts övertid från 1 april 2026?",
        answer:
          "De första två timmarna direkt efter eller före ordinarie arbetstid ger 35 % extra. Därefter är tillägget 70 %. Övertid som inte ligger i anslutning till ordinarie arbetstid ger 90 % extra.",
      },
      {
        question: "Kan arbete på röda dagar ge extra ledighet?",
        answer:
          "Ja, avtalet har regler om extra betalda ledighetsdagar vid vissa helgdagar och aftnar. Rätten beror bland annat på schemat och gäller först när anställningen har varat längre än två månader.",
      },
      {
        question: "Hur stor är semesterersättningen?",
        answer:
          "Semesterlön och semesterersättning är 12,72 % av beräkningsunderlaget. För semesteråret 1 april 2026–31 mars 2027 finns även lägsta dagbelopp: 1 675 kr för den som fyllt 20 år och 1 269 kr för yngre, när avtalets villkor om anställningstid är uppfyllda.",
      },
    ],
    relatedAgreements: [
      "handelsavtalet",
      "lager-ehandelsavtalet",
      "bemanningsavtalet",
    ],
    sourceNote: {
      reviewedAt: "18 juli 2026",
      sections:
        "allmänna villkor §§ 1–2, 9, 12–17, 28 och 30 samt löneavtalet § 5",
      label: "Öppna Gröna riksavtalet 2025–2027",
      url: "https://www.hrf.net/app/uploads/2025/05/Grona-riksen-2025-2027-1.pdf",
    },
  },
  "lager-ehandelsavtalet": {
    summary:
      "Lager- och E-handelsavtalet gäller arbetare inom lager och e-handel hos arbetsgivare som omfattas av avtalet. Uppgifterna nedan är kontrollerade mot aktuell information från Handels och Svensk Handel för perioden 1 april 2025–31 mars 2027.",
    keyFacts: {
      minimumWage:
        "Från 18 år: 163,73 kr/tim. Vid 20 år + 6 månader: 170,86 kr/tim (1 april 2026–31 mars 2027)",
      overtimeRate:
        "Från 1 april 2026 får deltidsanställda som arbetar utöver sitt kontrakt mertidsersättning på samma nivå som heltidsanställdas övertidsersättning. De öppna källorna anger inte de exakta procentsatserna",
      obWeekday:
        "Måndag–fredag kl. 06.00–07.00 och 18.00–23.00: 40 %",
      obNight:
        "Måndag kl. 00.00–06.00 samt måndag–fredag kl. 23.00–06.00: 70 %",
      obWeekend:
        "Lördag kl. 00.00–06.00: 70 %, kl. 06.00–23.00: 40 % och kl. 23.00–24.00: 70 %",
      obHoliday: "Söndag och helgdag: 100 %",
      vacationDays:
        "25 semesterdagar enligt semesterlagen. Handels anger att avtalet också reglerar semester och semesterlön, men den öppna informationen visar inte den exakta beräkningen",
      workHoursPerWeek:
        "40 timmar i genomsnitt per helgfri vecka, genomsnittsberäknat under en period på upp till 13 veckor",
    },
    wageTable: [
      {
        role: "Lager/e-handel – 16 år",
        minimum: "105,55 kr/tim",
        median: "",
        comment: "1 april 2026–31 mars 2027",
      },
      {
        role: "Lager/e-handel – 17 år",
        minimum: "111,55 kr/tim",
        median: "",
        comment: "1 april 2026–31 mars 2027",
      },
      {
        role: "Lager/e-handel – 18 år",
        minimum: "163,73 kr/tim",
        median: "",
        comment: "1 april 2026–31 mars 2027",
      },
      {
        role: "Lager/e-handel – 19 år",
        minimum: "166,85 kr/tim",
        median: "",
        comment: "1 april 2026–31 mars 2027",
      },
      {
        role: "Lager/e-handel – 20 år",
        minimum: "167,75 kr/tim",
        median: "",
        comment: "1 april 2026–31 mars 2027",
      },
      {
        role: "Lager/e-handel – 20 år + 6 månader",
        minimum: "170,86 kr/tim",
        median: "",
        comment: "1 april 2026–31 mars 2027",
      },
      {
        role: "Chaufför Ch 1 – 18 år",
        minimum: "164,98 kr/tim",
        median: "",
        comment: "C-, D- eller E-körkort · 1 april 2026–31 mars 2027",
      },
      {
        role: "Chaufför Ch 1 – 19 år",
        minimum: "168,10 kr/tim",
        median: "",
        comment: "C-, D- eller E-körkort · 1 april 2026–31 mars 2027",
      },
      {
        role: "Chaufför Ch 1 – 20 år",
        minimum: "169,00 kr/tim",
        median: "",
        comment: "C-, D- eller E-körkort · 1 april 2026–31 mars 2027",
      },
      {
        role: "Chaufför Ch 1 – 20 år + 6 månader",
        minimum: "172,11 kr/tim",
        median: "",
        comment: "C-, D- eller E-körkort · 1 april 2026–31 mars 2027",
      },
      {
        role: "Chaufför Ch 2 – 18 år",
        minimum: "164,48 kr/tim",
        median: "",
        comment: "Övriga körkort · 1 april 2026–31 mars 2027",
      },
      {
        role: "Chaufför Ch 2 – 19 år",
        minimum: "167,60 kr/tim",
        median: "",
        comment: "Övriga körkort · 1 april 2026–31 mars 2027",
      },
      {
        role: "Chaufför Ch 2 – 20 år",
        minimum: "168,50 kr/tim",
        median: "",
        comment: "Övriga körkort · 1 april 2026–31 mars 2027",
      },
      {
        role: "Chaufför Ch 2 – 20 år + 6 månader",
        minimum: "171,61 kr/tim",
        median: "",
        comment: "Övriga körkort · 1 april 2026–31 mars 2027",
      },
    ],
    faq: [
      {
        question: "Hur fungerar arbetstidsförkortningen?",
        answer:
          "Från 1 oktober 2025 tjänas 10 minuter per fullgjord arbetsvecka in till en tidbank. För en heltidsanställd motsvarar det ungefär 8 timmar per år.",
      },
      {
        question: "Vilken lägstalön gäller från 1 april 2026?",
        answer:
          "Från 18 år är lägstalönen 163,73 kr per timme. Tabellen anger 170,86 kr per timme för nivån 20 år + 6 månader. Chaufförer har egna nivåer.",
      },
      {
        question: "Hur mycket OB får jag på söndagar och helgdagar?",
        answer:
          "OB-tillägget är 100 % av timlönen. Det innebär ordinarie lön plus lika mycket i OB för den arbetade tiden.",
      },
      {
        question: "Vad ändrades för deltidsanställda den 1 april 2026?",
        answer:
          "Arbete utöver timmarna i kontraktet ger mertidsersättning på samma nivå som övertidsersättningen för heltidsanställda.",
      },
      {
        question: "Kan jag påverka mitt schema och mina lediga dagar?",
        answer:
          "Ja. Tillsvidareanställda kan lämna skriftliga önskemål om fem lediga kalenderdagar och om kvälls- och helgarbete. Avtalet anger också minst 26 sammanhängande lediga lördagar och söndagar per år, men lokala eller individuella undantag kan avtalas.",
      },
    ],
    relatedAgreements: ["handelsavtalet"],
    sourceNote: {
      reviewedAt: "17 juli 2026",
      sections:
        "Handels aktuella information om lägstalöner, OB, arbetstid, schema och avtalsresultatet samt semesterlagen 4 §",
      label: "Öppna Handels information om Lager- och E-handelsavtalet",
      url: "https://www.handels.se/vara-branscher/lager/",
    },
  },
  "teknikavtalet-ifmetall": {
    summary:
      "Teknikavtalet IF Metall är arbetarnas riksavtal mellan Teknikarbetsgivarna och IF Metall inom teknikindustrin. Det är ett annat avtal än Teknikavtalet för Unionen och Sveriges Ingenjörer. Uppgifterna nedan är kontrollerade mot IF Metalls originalavtal för perioden 1 april 2025–31 mars 2027.",
    keyFacts: {
      minimumWage:
        "Från 1 april 2026: 24 647 kr/mån för den som fyllt 18 år och 27 069 kr/mån vid särskilt kvalificerat arbete. Efter ett respektive två års sammanlagd anställningstid ska lönen ligga 784 respektive 1 409 kr över tillämplig lägstanivå",
      overtimeRate:
        "Betalning för arbetad tid plus övertidstillägg. Från 1 april 2026: 84,11 kr/tim på arbetsdag måndag–fredag, 108,16 kr/tim på arbetsfri vardag och 144,12 kr/tim på lördag, söndag, helgdag samt midsommar-, jul- och nyårsafton. OB och övertidsersättning betalas inte samtidigt",
      obWeekday:
        "Alla dagar kl. 16.30–22.30: 31,28 kr/tim från 1 april 2026",
      obNight:
        "Alla dagar kl. 22.30–06.30: 39,79 kr/tim från 1 april 2026",
      obWeekend:
        "Helg och veckoslut: ytterligare 87,54 kr/tim från 1 april 2026, utöver tillämpligt kvälls- eller nattillägg",
      obHoliday:
        "Storhelg: ytterligare 194,69 kr/tim från 1 april 2026, utöver tillämpligt kvälls- eller nattillägg. Helg- och storhelgstillägg betalas inte samtidigt",
      vacationDays:
        "25 semesterdagar per semesterår. Den som börjar efter 31 augusti har rätt till 5 dagar under det första semesteråret. Antalet betalda dagar beror på vad som har tjänats in",
      parentalPay:
        "Föräldrapenningtillägg (FPT) ingår i avtalsförsäkringarna. Belopp, kvalifikationstid och ersättningsperiod regleras i separata försäkringsvillkor och anges därför inte här",
      noticePeriod:
        "Avtalet innehåller ingen egen generell tabell utan hänvisar till lagstadgad uppsägningstid. Anställningsform och individuella villkor kan påverka; kontrollera därför ditt anställningsavtal och reglerna i LAS",
      pension:
        "Avtalspension SAF-LO. Dessutom betalar arbetsgivaren 2,9 % till deltidspension under perioden 1 april 2026–31 mars 2027. Ansökan om deltidspension kan göras från månaden då arbetstagaren fyller 60 år",
      workHoursPerWeek:
        "Dagtid och tvåskift måndag–fredag: 40 timmar. Intermittent treskift: 38 timmar, kontinuerligt treskift: 36 timmar, storhelgsdrift: 35 timmar och ständig natt: 34 timmar per helgfri vecka i genomsnitt",
    },
    wageTable: [
      {
        role: "Fyllt 18 år",
        minimum: "24 647 kr/mån",
        median: "",
        comment: "Lägsta månadslön från 1 april 2026",
      },
      {
        role: "Särskilt kvalificerat arbete",
        minimum: "27 069 kr/mån",
        median: "",
        comment: "Lägsta månadslön från 1 april 2026",
      },
      {
        role: "Efter 1 års anställningstid",
        minimum: "Tillämplig lägstanivå + 784 kr/mån",
        median: "",
        comment: "Sammanlagd anställningstid under de senaste 36 månaderna",
      },
      {
        role: "Efter 2 års anställningstid",
        minimum: "Tillämplig lägstanivå + 1 409 kr/mån",
        median: "",
        comment: "Sammanlagd anställningstid under de senaste 36 månaderna",
      },
      {
        role: "Feriearbete – 16–17 år",
        minimum: "93,12 kr/tim",
        median: "",
        comment: "Från 1 april 2026 · helg- och semesterlön ingår",
      },
      {
        role: "Feriearbete – 18 år",
        minimum: "97,89 kr/tim",
        median: "",
        comment: "Från 1 april 2026 · helg- och semesterlön ingår",
      },
    ],
    faq: [
      {
        question: "Gäller sidan även tjänstemän inom Unionen och Sveriges Ingenjörer?",
        answer:
          "Nej. Den här sidan gäller bara Teknikavtalet IF Metall för arbetare. Tjänstemän omfattas av ett separat Teknikavtal med andra regler.",
      },
      {
        question: "Hur mycket tid förs till tidbanken?",
        answer:
          "För en heltidsanställd förs 82 minuter per fullgjord arbetsvecka till tidbanken vid dagtid, 202 minuter vid tvåskift och 82 minuter vid annat skiftarbete. Deltid och ofullständig vecka räknas proportionellt.",
      },
      {
        question: "Hur fungerar OB under helg och storhelg?",
        answer:
          "Helg- eller storhelgstillägget läggs ovanpå kvälls- eller nattillägget när tiderna sammanfaller. Helgtillägg och storhelgstillägg betalas däremot inte samtidigt.",
      },
      {
        question: "Får alla automatiskt 2,9 procent högre lön 2026?",
        answer:
          "Nej. 2,9 procent är en lokal lönepott, inte en automatisk individuell höjning. Om de lokala parterna inte avtalat annat ska avstämningen den 1 juni 2026 visa en löneökning på minst 590 kronor för den aktuella perioden.",
      },
      {
        question: "Vilken uppsägningstid gäller?",
        answer:
          "Originalavtalet innehåller ingen fristående generell tabell över uppsägningstider. Kontrollera därför ditt anställningsavtal och reglerna i LAS eller kontakta IF Metall för besked i ditt fall.",
      },
    ],
    relatedAgreements: [
      "i-avtalet",
      "stal-och-metall",
      "gemensamma-metall",
      "svemek-avtalet",
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§§ 3–6, 9 och 13–14 samt löneavtalet",
      label: "Öppna Teknikavtalet IF Metall 2025–2027",
      url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/teknikavtalet-2025-2027.pdf",
    },
  },
  bemanningsavtalet: {
    summary:
      "Bemanningsavtalet gäller arbetare som hyrs ut av bemanningsföretag anslutna till Kompetensföretagen inom LO-förbundens avtalsområden. Under ett uppdrag styr kundföretagets tillämpliga riksavtal de flesta löne- och anställningsvillkor, medan lönen beräknas enligt Bemanningsavtalets regler om genomsnittligt förtjänstläge. Uppgifterna nedan är kontrollerade mot avtalet för perioden 1 maj 2025–30 april 2027.",
    keyFacts: {
      minimumWage:
        "Under utbokad tid gäller genomsnittligt förtjänstläge för jämförbara grupper hos kunden (T+P+DP), dock aldrig lägre än garantin. Under ej utbokad tid är garantin 137,29 kr/tim från 1 maj 2026",
      overtimeRate:
        "Under utbokad tid följs kundens tillämpliga riksavtal. Vid arbete eller beordrad utbildning utöver heltidsmåttet under ej utbokad tid är ersättningen normalt månadslönen/94 vardagar kl. 06.00–20.00 och månadslönen/72 annan tid, eller 1,5 respektive 2 timmars ledighet",
      obWeekday:
        "Under ej utbokad tid: måndag–fredag kl. 18.00–23.00, 27,56 kr/tim från 1 maj 2026. Under utbokad tid gäller kundens tillämpliga riksavtal",
      obNight:
        "Under ej utbokad tid: måndag–fredag kl. 23.00–07.00, 55,22 kr/tim från 1 maj 2026. Under utbokad tid gäller kundens tillämpliga riksavtal",
      obWeekend:
        "Under ej utbokad tid: lördag och söndag kl. 00.00–24.00, 110,40 kr/tim från 1 maj 2026. Under utbokad tid gäller kundens tillämpliga riksavtal",
      obHoliday:
        "Under ej utbokad tid: midsommar-, jul- och nyårsafton samt helgdagar kl. 00.00–24.00, 110,40 kr/tim från 1 maj 2026. Under utbokad tid gäller kundens tillämpliga riksavtal",
      vacationDays:
        "Semester enligt lag. För den som anställts efter 1 maj 2013 är semesterlön och semesterersättning 13 % av underlaget; för vissa äldre anställningar anger avtalet 13,3 %",
      parentalPay:
        "Avtalets tidigare föräldralön har ersatts av försäkringen Föräldrapenningtillägg (FPT). Exakta belopp och tider följer försäkringsvillkoren",
      noticePeriod:
        "Tillsvidareanställning följer normalt LAS om inget annat har avtalats. En visstidsanställning enligt avtalet kan avbrytas i förtid med 14 dagars ömsesidig uppsägningstid",
      pension:
        "Avtalspension SAF-LO. Delpensionspremien följer kundens centrala kollektivavtal under uppdrag; om en sådan överenskommelse saknas avsätts 0,4 %. Samma nivå gäller för övrig tid som inte omfattas av kundens förtjänstläge",
      workHoursPerWeek:
        "Under utbokad tid gäller arbetstidsreglerna för motsvarande grupp hos kunden. Under ej utbokad tid är heltidsmåttet 40 timmar per helgfri vecka i genomsnitt över fyra veckor, normalt förlagt kl. 07.00–17.00",
    },
    wageTable: [
      {
        role: "Ej utbokad tid – garanti",
        minimum: "137,29 kr/tim",
        median: "",
        comment: "Från 1 maj 2026 · högst 8 garantitimmar per dygn",
      },
    ],
    faq: [
      {
        question: "Har bemanningsanställda en fast minimilön under uppdrag?",
        answer:
          "Inte en enda gemensam nivå för alla uppdrag. Under utbokad tid ska lönen motsvara det genomsnittliga förtjänstläget för jämförbara grupper hos kunden, inklusive berörda löne- och pensionsdelar. Lönen får inte understiga avtalets garanti.",
      },
      {
        question: "Vad får jag när jag inte är utbokad?",
        answer:
          "Från 1 maj 2026 är garantin 137,29 kronor per timme. Beräkningen utgår från månadens faktiska arbetstid och garantin betalas för högst åtta timmar per dygn.",
      },
      {
        question: "Vilket OB gäller när jag arbetar hos en kund?",
        answer:
          "Då styr kundens tillämpliga riksavtal. Beloppen på den här sidan för 27,56, 55,22 och 110,40 kronor gäller arbete under ej utbokad tid.",
      },
      {
        question: "Gäller Bemanningsavtalet vid entreprenadarbete?",
        answer:
          "Nej. Avtalet gäller uthyrning av arbetstagare och säger uttryckligen att det inte gäller när arbetet utförs som entreprenad. Installationsavtalet är också undantaget.",
      },
    ],
    relatedAgreements: [
      "handelsavtalet",
      "lager-ehandelsavtalet",
      "teknikavtalet-ifmetall",
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "avsnitt 1 § 1, avsnitt 2 § 3, avsnitt 3 §§ 4–5, avsnitt 4 §§ 7–9, avsnitt 5 §§ 10–20, avsnitt 6 §§ 19–22, bilaga 6 och § 24",
      label: "Öppna Bemanningsavtalet 2025–2027",
      url: "https://www.lo.se/media/0ygnhcpp/bemanningsavtalet_2025-05-01-2027-04-30.pdf",
    },
  },
  fastighetsavtalet: {
    summary:
      "Den här sidan gäller tjänstemannaavtalet för fastighetsbranschen mellan Almega Fastighetsarbetsgivarna och Unionen, Ledarna, Sveriges Ingenjörer och Seko. Det ska inte blandas ihop med arbetaravtal för exempelvis fastighetsskötare eller städare. Uppgifterna nedan är kontrollerade mot avtalet för perioden 1 juni 2025–31 maj 2027.",
    keyFacts: {
      minimumWage:
        "Det allmänna villkorsavtalet innehåller ingen central lönetabell eller fast lägstalön. Lönen bestäms genom respektive förbunds löneavtal och den lokala eller individuella löneprocessen",
      overtimeRate:
        "Månadslönen/94 per timme kl. 06.00–20.00 helgfria måndagar–fredagar och månadslönen/72 annan tid. Efter överenskommelse kan ersättningen vara 1,5 respektive 2 timmars ledighet. Vissa tjänstemän kan skriftligen byta övertidsersättning mot fem extra semesterdagar och att övertiden beaktas i lönen",
      obWeekday:
        "Förskjuten ordinarie arbetstid måndag–fredag kl. 18.00–24.00 ersätts med månadslönen/600 per timme, om inte lokalt avtal eller en giltig enskild överenskommelse säger annat",
      obNight:
        "Förskjuten ordinarie arbetstid måndag–lördag kl. 00.00–07.00 ersätts med månadslönen/400 per timme, om inte lokalt avtal eller en giltig enskild överenskommelse säger annat",
      obWeekend:
        "Förskjuten ordinarie arbetstid från lördag kl. 07.00 till söndag kl. 24.00 ersätts med månadslönen/300 per timme",
      obHoliday:
        "På vissa helger är ersättningen månadslönen/300. Från skärtorsdag kväll och under angivna påsk-, pingst-, midsommar-, jul-, nyårs- och nationaldagstider är den månadslönen/150 per timme",
      vacationDays:
        "25 semesterdagar. En skriftlig överenskommelse om att avstå från ordinarie övertidsersättning kan ge fem extra dagar",
      parentalPay:
        "Föräldraledighetstillägg betalas i högst 120 kalenderdagar, eller 180 dagar efter minst tre års sammanhängande anställning, inom 24 månader efter födsel eller adoption. Tillägget är 10 % under avtalets tak och 90 % på lönedelar över taket",
      noticePeriod:
        "När tjänstemannen säger upp sig: 1 månad vid mindre än 2 års anställning, 2 månader från 2 år och 3 månader från 6 år. När arbetsgivaren säger upp: 1–6 månader beroende på anställningstid; särskild förlängning kan gälla vid arbetsbrist för den som fyllt 55 år",
      pension:
        "ITP tjänstepension. Därutöver gäller Flexpension i Tjänsteföretag med en total kompletterande premie på 1,7 % från 1 juni 2026 för den som omfattas av reglerna",
      workHoursPerWeek:
        "Högst 40 timmar i genomsnitt per helgfri vecka. Vid skift eller oregelbunden arbetstid är måttet i vissa fall 38 eller 36 timmar. Avtalet ger dessutom en betald ledig dag per kalenderår för heltidsanställda",
    },
    faq: [
      {
        question: "Gäller sidan fastighetsskötare och städpersonal?",
        answer:
          "Inte generellt. Den här sidan gäller tjänstemän hos företag som omfattas av Almega Fastighetsarbetsgivarnas tjänstemannaavtal. Arbetare kan omfattas av andra kollektivavtal.",
      },
      {
        question: "Finns en central minimilön i avtalet?",
        answer:
          "Nej, inte i det allmänna villkorsavtalet. Lön hanteras genom respektive förbunds löneavtal och genom lokal eller individuell lönesättning.",
      },
      {
        question: "Kan övertidsersättningen bytas mot extra semester?",
        answer:
          "Ja, i vissa befattningar och när särskilda villkor är uppfyllda kan arbetsgivaren och tjänstemannen skriftligen komma överens om fem extra semesterdagar och att övertiden beaktas när lönen sätts.",
      },
      {
        question: "Hur stor är flexpensionen 2026?",
        answer:
          "Den kompletterande premien är totalt 1,7 procent från 1 juni 2026 för den som omfattas av Flexpension i Tjänsteföretag. Den betalas utöver den ordinarie ITP-premien.",
      },
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§§ 1, 4–5, 7–8, 10, 12 och 15–17 samt bilagorna 2–4",
      label: "Öppna tjänstemannaavtalet Fastighetsarbetsgivarna 2025–2027",
      url: "https://www.akavia.se/siteassets/03-rad-och-stod/kollektivavtal-privat-sektor/almega/kollektivavtal---avtal-2025---fastighetsarbetsgivarna---20250601.pdf",
    },
  },
  skogsavtalet: {
    summary:
      "Den här sidan gäller VISST, villkorsavtalet mellan Skogsstyrelsen och GS-facket för skogligt arbete inom staten. Det är inte skogsindustrins vanliga arbetaravtal. Uppgifterna nedan är kontrollerade mot VISST för perioden 1 januari 2026–31 december 2027.",
    keyFacts: {
      minimumWage:
        "Individuell minimilön för heltidsanställd som fyllt 19 år: 27 600 kr/mån under 2026 och 28 500 kr/mån från 1 januari 2027. För 16-, 17- och 18-åringar är nivåerna 70, 80 respektive 90 % av vuxennivån",
      overtimeRate:
        "Enkel övertid: individuell månadslön/94 per timme. Kvalificerad övertid: månadslön/72 per timme. Efter överenskommelse kan ersättningen vara 1,5 respektive 2 timmars ledighet",
      obWeekday:
        "VISST innehåller ingen central tabell med särskilt OB-tillägg för ordinarie vardagsarbete. Arbetstidens förläggning bestäms normalt i lokalt kollektivavtal",
      obNight:
        "VISST innehåller ingen central OB-tabell för ordinarie nattarbete. Natt kl. 22.00–06.00 räknas däremot som kvalificerad övertid när arbetet är övertid",
      obWeekend:
        "VISST innehåller ingen central OB-tabell för ordinarie helgarbete. Övertid från fredag kl. 19.00 till måndag kl. 07.00 räknas som kvalificerad övertid",
      obHoliday:
        "VISST innehåller ingen central OB-tabell för ordinarie helgdagsarbete. Avtalet anger särskilda helgperioder som kvalificerad övertid när arbetet är övertid",
      vacationDays:
        "28 dagar till och med året arbetstagaren fyller 29, 31 dagar från året arbetstagaren fyller 30 och 35 dagar från året arbetstagaren fyller 40",
      parentalPay:
        "Föräldralön betalas för de första 360 uttagna kalenderdagarna per födsel eller adoption. Den är 10 % av aktuell kalenderdagslön under avtalets tak och 90 % på lönedelar över taket",
      noticePeriod:
        "När arbetstagaren säger upp sig: 1 månad vid högst 1 års statlig anställning och 2 månader därefter. När arbetsgivaren säger upp: 1 månad vid högst 1 år och 3 månader därefter, eller längre tid om LAS ger det",
      pension:
        "Statlig tjänstepension regleras i det separata pensionsavtalet PA 16. Vilken avdelning och vilka delar som gäller beror bland annat på födelseår",
      workHoursPerWeek:
        "39 timmar och 45 minuter i genomsnitt för heltidsarbete under helgfri måndag–fredag. Arbetstiden förläggs normalt genom ett lokalt kollektivavtal och vissa arbetsdagar förkortas centralt",
    },
    wageTable: [
      {
        role: "Fyllt 19 år",
        minimum: "27 600 kr/mån",
        median: "",
        comment: "Individuell minimilön under 2026 vid heltid",
      },
      {
        role: "Fyllt 19 år",
        minimum: "28 500 kr/mån",
        median: "",
        comment: "Individuell minimilön från 1 januari 2027 vid heltid",
      },
      {
        role: "Fyllt 18 år",
        minimum: "24 840 kr/mån",
        median: "",
        comment: "90 % av vuxennivån under 2026 vid heltid",
      },
      {
        role: "Fyllt 17 år",
        minimum: "22 080 kr/mån",
        median: "",
        comment: "80 % av vuxennivån under 2026 vid heltid",
      },
      {
        role: "Fyllt 16 år",
        minimum: "19 320 kr/mån",
        median: "",
        comment: "70 % av vuxennivån under 2026 vid heltid",
      },
    ],
    faq: [
      {
        question: "Är VISST samma sak som skogsindustrins vanliga arbetaravtal?",
        answer:
          "Nej. VISST gäller skogligt arbete inom det statliga avtalsområdet hos Skogsstyrelsen och är tecknat med GS-facket.",
      },
      {
        question: "Får alla 3,4 procent högre lön under 2026?",
        answer:
          "Nej. 3,4 procent, lägst 989 kronor per heltidsarbetande medlem, är underlaget för löneökningsutrymmet. För GS-medlemmar är den individuella garantin 50 procent av det utrymme medlemmen har genererat.",
      },
      {
        question: "Hur många semesterdagar ger VISST?",
        answer:
          "28 dagar till och med året du fyller 29, 31 dagar från året du fyller 30 och 35 dagar från året du fyller 40, om du omfattas hela kalenderåret.",
      },
      {
        question: "Finns ett centralt OB-tillägg?",
        answer:
          "VISST har ingen central OB-tabell för ordinarie arbete. Arbetstidens förläggning hanteras normalt lokalt. Om arbetet är övertid finns däremot tydliga regler för enkel och kvalificerad övertid.",
      },
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "kap. 1, kap. 2 §§ 1–9, kap. 3 §§ 1–18, kap. 6, kap. 10 och kap. 12 samt PA 16",
      label: "Öppna VISST 2026–2027",
      url: "https://www.skogsstyrelsen.se/globalassets/om-oss/kollektivavtal/visst-2026-2027.pdf",
    },
  },
  "vag-banavtalet-seko": {
    summary:
      "Väg- och banavtalet är kollektivavtalet mellan Byggföretagen och Seko för bland annat väg-, järnvägs-, mark- och närliggande infrastrukturarbeten hos arbetsgivare som omfattas av avtalet. Uppgifterna nedan är kontrollerade mot Sekos originalavtal för perioden 1 maj 2025–30 april 2027.",
    keyFacts: {
      minimumWage:
        "Från 1 maj 2026: 35 194 kr/mån för yrkesarbetare och maskinförare med yrkesbevis, 33 434 kr/mån för bilförare m.fl. och 30 971 kr/mån för övriga som fyllt 19 år. Yngre arbetstagare och lärlingar har egna nivåer",
      overtimeRate:
        "Ersättning per övertidstimme beräknas på individuell månadslön: månadslönen/106 på vardagstid och månadslönen/77 på helg och angivna fridagar. Övertid kan i vissa fall tas som 1,5 respektive 2 timmars ledighet",
      obWeekday:
        "Måndag–torsdag kl. 17.30–22.00, fredag kl. 17.30–19.00 samt måndag–fredag kl. 05.00–06.00: individuell månadslön/616 per timme",
      obNight:
        "Måndag–torsdag kl. 22.00–05.00: individuell månadslön/280 per timme",
      obWeekend:
        "Från fredag kl. 19.00 till måndag kl. 05.00: individuell månadslön/154 per timme",
      obHoliday:
        "Helgdag och avtalets angivna fridagar: individuell månadslön/154 per timme. Avtalet anger ingen separat högre storhelgsnivå i denna regel",
      vacationDays:
        "Semesterledigheten följer semesterlagen. Månadsavlönade får 0,8 % av aktuell månadslön i semestertillägg per betald dag. För tim- och ackordsavlönade är semesterlönen 13 % av semesterlöneunderlaget",
      parentalPay:
        "Avtalet ger den som uppfyller kvalifikationstiden 10 % havandeskapslön under högst två månader. Därutöver finns föräldraförsäkring enligt SN–LO, vars exakta villkor regleras separat",
      noticePeriod:
        "Avtalet hänvisar i huvudsak till uppsägningstiderna i 11 § LAS. Tidsbegränsade och säsongsanställda har särskilda regler, så anställningsformen behöver kontrolleras",
      pension:
        "Avtalspension SAF-LO. Utöver den ordinarie premien gäller en extra pensionsavsättning som totalt är 1,7 % från 1 maj 2026",
      workHoursPerWeek:
        "Normalt 40 timmar per helgfri vecka. Tvåskift är 38 timmar, intermittent treskift 36 timmar och kontinuerligt treskift 35 timmar i genomsnitt. Heltidsanställda tjänar in 34 timmars arbetstidsförkortning under ett helt intjänandeår",
    },
    wageTable: [
      {
        role: "Yrkesarbetare",
        minimum: "35 194 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Maskinförare med yrkesbevis",
        minimum: "35 194 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Bilförare m.fl.",
        minimum: "33 434 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Övriga – fyllt 19 år",
        minimum: "30 971 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Övriga – 18 men inte 19 år",
        minimum: "26 396 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Övriga – 17 men inte 18 år",
        minimum: "21 116 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
      {
        role: "Övriga – inte fyllda 17 år",
        minimum: "17 597 kr/mån",
        median: "",
        comment: "Grundlön 1 maj 2026–30 april 2027",
      },
    ],
    faq: [
      {
        question: "Är 35 194 kronor en genomsnittslön?",
        answer:
          "Nej. Det är avtalets grundlön för yrkesarbetare och maskinförare med yrkesbevis från 1 maj 2026. Grundlönen är ett golv, inte en genomsnitts- eller medianlön.",
      },
      {
        question: "Hur räknas övertid och OB?",
        answer:
          "Ersättningarna räknas på din individuella månadslön. Övertid delas med 106 eller 77 beroende på tid. OB delas med 616, 280 eller 154. Tilläggen för skift, förskjuten arbetstid och OB kan inte kombineras.",
      },
      {
        question: "Hur fungerar arbetstidsförkortningen?",
        answer:
          "En heltidsanställd som arbetar hela intjänandeåret 1 april–31 mars tjänar in 34 timmar. Vid deltid, kortare anställning eller viss frånvaro räknas tiden proportionellt.",
      },
      {
        question: "Gäller avtalet bara banarbetare?",
        answer:
          "Nej. Det omfattar flera typer av arbete med vägar, gator, järnvägar, spårvägar, tunnelbanor, mark, ledningar, beläggning och närliggande service när arbetsgivaren är bunden av avtalet.",
      },
      {
        question: "Vilken tjänstepension gäller?",
        answer:
          "Avtalspension SAF-LO gäller. Från 1 maj 2026 är den extra pensionsavsättningen totalt 1,7 procent utöver den ordinarie premien.",
      },
    ],
    relatedAgreements: ["byggavtalet"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "Kap. 2 §§ 2–18, kap. 3 §§ 1–14 och 34, kap. 6, kap. 11 §§ 1–7, kap. 15 samt kap. 25",
      label: "Öppna Väg- och banavtalet 2025–2027",
      url: "https://www.seko.se/4a5cef/siteassets/kollektivavtal/branschavtal/vag-och-ban/vag-och-banavtalet-2025-2027-utgava-1.pdf",
    },
  },
  "i-avtalet": {
    summary:
      "I-avtalet är kollektivavtalet mellan IKEM och IF Metall för arbetare vid anslutna företag inom bland annat plast, gummi, gas, bioteknik och läkemedel. Uppgifterna nedan är kontrollerade mot originalavtalet för perioden 1 april 2025–31 mars 2027.",
    keyFacts: {
      minimumWage:
        "Från 1 april 2026: 28 511 kr/mån eller 162,92 kr/tim för den som fyllt 18 år. För nyanställd under de första tre månaderna är nivån 24 234 kr/mån eller 138,48 kr/tim. Minderåriga har en egen nivå",
      overtimeRate:
        "Månadsavlönad får ordinarie timlön, månadslönen/175, plus övertidstillägg med månadslönen/420 och eventuellt OB. Timavlönad får ordinarie lön plus ett tillägg på 41 % och eventuellt OB",
      obWeekday:
        "Kvälls- och nattetid kl. 18.00–06.00: 51,46 kr/tim från 1 april 2026, om inte en högre helg- eller storhelgsnivå gäller",
      obNight:
        "Natt kl. 18.00–06.00: 51,46 kr/tim från 1 april 2026, om inte en högre helg- eller storhelgsnivå gäller",
      obWeekend:
        "Sön- och helgdagstid: 80,15 kr/tim från 1 april 2026 under de tider som anges i avtalet, normalt från lördag kl. 06.00 eller kl. 18.00 dagen före helgdag till kl. 06.00 dagen efter",
      obHoliday:
        "Storhelgstid: 160,10 kr/tim från 1 april 2026 under avtalets angivna perioder kring bland annat nyår, påsk, midsommar och jul",
      vacationDays:
        "Semester enligt semesterlagen, normalt 25 dagar. För månadsavlönade är semestertillägget 0,8 % av aktuell månadslön per betald dag och 0,52 % av rörliga lönedelar. Efter minst tre månaders sammanlagd anställningstid är semesterlönegarantin för vuxna 1 755 kr per betald dag från 1 april 2026",
      parentalPay:
        "Föräldrapenningtillägg (FPT) finns genom en separat försäkring mellan Svenskt Näringsliv och LO. Originalavtalet anger inte försäkringens exakta belopp, kvalifikationstid eller ersättningsperiod",
      noticePeriod:
        "Minst 1 månad. När arbetsgivaren säger upp är tiden 2–6 månader efter 2–10 års sammanlagd anställningstid enligt den LAS-tabell som återges i avtalet. Kontrollera alltid anställningsformen och aktuella lagregler",
      pension:
        "Avtalspension SAF-LO. Avtalet har också regler om deltidspension. Exakta pensionsval och premier behöver kontrolleras mot de separata pensionsvillkoren",
      workHoursPerWeek:
        "Dagarbete: 40 timmar i genomsnitt per helgfri vecka. Kontinuerligt tvåskift, intermittent tvåskift och intermittent treskift: 38 timmar. Kontinuerligt treskift och arbete under jord: 1 768 timmar i genomsnitt per år",
    },
    wageTable: [
      {
        role: "Fyllt 18 år",
        minimum: "28 511 kr/mån · 162,92 kr/tim",
        median: "",
        comment: "Lägsta lön från 1 april 2026",
      },
      {
        role: "Nyanställd – första 3 månaderna",
        minimum: "24 234 kr/mån · 138,48 kr/tim",
        median: "",
        comment: "Från 1 april 2026 · lokal förlängning kan avtalas",
      },
      {
        role: "Minderårig",
        minimum: "19 049 kr/mån · 108,85 kr/tim",
        median: "",
        comment: "Lägsta lön från 1 april 2026",
      },
      {
        role: "Efter 1 års anställning och ökad kompetens",
        minimum: "Lägstanivån + 600 kr/mån · +3,43 kr/tim",
        median: "",
        comment: "Efter genomförd lönerevision",
      },
      {
        role: "Efter 2 års anställning och ökad kompetens",
        minimum: "Lägstanivån + 1 000 kr/mån · +5,71 kr/tim",
        median: "",
        comment: "Efter genomförd lönerevision",
      },
    ],
    faq: [
      {
        question: "Vilka verksamheter omfattas av I-avtalet?",
        answer:
          "Avtalet gäller IF Metall-arbetare hos anslutna IKEM-företag inom flera industrigrenar, bland annat plast, gummi, gas, bioteknik och läkemedel. Det exakta avtalsområdet måste alltid kontrolleras för arbetsgivaren.",
      },
      {
        question: "Är 28 511 kronor en genomsnittslön?",
        answer:
          "Nej. Det är avtalets lägsta månadslön för den som fyllt 18 år från 1 april 2026. Den faktiska lönen kan vara högre genom lokal och individuell lönesättning.",
      },
      {
        question: "Kan OB betalas samtidigt med övertid?",
        answer:
          "Ja. Avtalets övertidsformel anger ordinarie lön, övertidstillägg och eventuellt OB när övertiden ligger på obekväm tid.",
      },
      {
        question: "Hur mycket föräldrapenningtillägg får jag?",
        answer:
          "Det går inte att fastställa från huvudavtalet. FPT regleras i en separat försäkring, så kvalifikationstid, belopp och längd behöver kontrolleras i de aktuella försäkringsvillkoren.",
      },
      {
        question: "Är arbetstiden alltid 40 timmar?",
        answer:
          "Nej. Dagarbete är 40 timmar per helgfri vecka, medan flera skiftformer har 38 timmar. Kontinuerligt treskift och arbete under jord anges som 1 768 timmar per år.",
      },
    ],
    relatedAgreements: [
      "teknikavtalet-ifmetall",
      "stal-och-metall",
      "gemensamma-metall",
      "kemiskt-avtal-ifmetall",
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§§ 1–5, 9 och 17, bilagorna 1–3 samt förteckningen över övriga avtal",
      label: "Öppna I-avtalet 2025–2027 i original",
      url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/i-avtalet-2025-2027.pdf",
    },
  },
  "stal-och-metall": {
    summary:
      "Avtalet för Stål- och metallindustrin, även kallat Röda avtalet, gäller arbetare vid företag anslutna till Föreningen Industriarbetsgivarna inom stål- och metallindustrin. Uppgifterna nedan är kontrollerade mot originalavtalet för perioden 1 april 2025–31 mars 2027.",
    keyFacts: {
      minimumWage:
        "Från 1 april 2026 är garantilönen 23 844–28 525 kr/mån beroende på lönegrupp. Grupp S har ingen centralt angiven garantilön",
      overtimeRate:
        "Lön för den arbetade tiden plus 59,74 kr/tim i övertidstillägg från 1 april 2026. OB betalas dessutom när övertiden utförs på obekväm tid",
      obWeekday:
        "Kl. 17.00–22.00: 34,86 kr/tim från 1 april 2026",
      obNight:
        "Kl. 22.00–06.00: 50,77 kr/tim från 1 april 2026",
      obWeekend:
        "Utöver kvälls- eller nattillägget betalas 97,73 kr/tim under delar av fredagskväll och lördag samt 137,11 kr/tim under avtalets övriga angivna veckosluts- och helgtider från 1 april 2026",
      obHoliday:
        "Under avtalets angivna storhelgsperioder betalas ytterligare 228,17 kr/tim från 1 april 2026, utöver tillämpligt kvälls- eller nattillägg",
      vacationDays:
        "Semester enligt semesterlagen, normalt 25 dagar. Semesterlönen består av aktuell månadslön samt 0,8 % av månadslönen per betald dag och 0,5 % av rörliga lönetillägg",
      parentalPay:
        "Föräldrapenningtillägg (FPT) ingår bland AFA-försäkringarna. Huvudavtalet anger inte försäkringens exakta belopp, kvalifikationstid eller ersättningsperiod",
      noticePeriod:
        "Originalavtalet innehåller ingen fristående fullständig tabell för alla tillsvidareanställningar. Uppsägningstiden följer i huvudsak LAS och påverkas av anställningsform och anställningstid. En tidsbegränsad anställning kan ha särskilda regler",
      pension:
        "Avtalspension SAF-LO. Därutöver finns en livsarbetstidspremie enligt avtalets bilaga. Exakta val och premier behöver kontrolleras mot pensionsvillkoren och den lokala tillämpningen",
      workHoursPerWeek:
        "Dagtid och tvåskift: 40 timmar. Intermittent treskift: 38 timmar. Kontinuerligt treskift med helguppehåll: 36 timmar och utan helguppehåll: 35 timmar per helgfri vecka i genomsnitt",
    },
    wageTable: [
      {
        role: "Grupp S",
        minimum: "Ingen centralt angiven garantilön",
        median: "",
        comment: "Individuell lönesättning efter lokal inplacering",
      },
      {
        role: "Grupp T – teknikergruppen",
        minimum: "28 525 kr/mån",
        median: "",
        comment: "Garantilön från 1 april 2026",
      },
      {
        role: "Grupp 1 – yrkesskicklig, minst 6 år i yrket",
        minimum: "27 006 kr/mån",
        median: "",
        comment: "Garantilön från 1 april 2026",
      },
      {
        role: "Grupp 2 – yrkeskunnig, minst 3 år i yrket",
        minimum: "25 295 kr/mån",
        median: "",
        comment: "Garantilön från 1 april 2026",
      },
      {
        role: "Grupp 3 – övrig vuxen, fyllt 18 år",
        minimum: "23 844 kr/mån",
        median: "",
        comment: "Garantilön från 1 april 2026",
      },
      {
        role: "Grupp 4 – fyllt 17 år",
        minimum: "21 556 kr/mån",
        median: "",
        comment: "Garantilön från 1 april 2026",
      },
      {
        role: "Grupp 5 – fyllt 16 år",
        minimum: "19 271 kr/mån",
        median: "",
        comment: "Garantilön från 1 april 2026",
      },
    ],
    faq: [
      {
        question: "Är Röda avtalet samma avtal som Stål- och metallindustrin?",
        answer:
          "Ja. Röda avtalet är ett vanligt namn på kollektivavtalet för Stål- och metallindustrin mellan Föreningen Industriarbetsgivarna och IF Metall.",
      },
      {
        question: "Är garantilönen samma sak som genomsnittslönen?",
        answer:
          "Nej. Garantilönen är det centrala lönegolvet för respektive grupp. Den faktiska lönen kan vara högre. Grupp S saknar centralt angiven garantilön.",
      },
      {
        question: "Läggs helgtillägget ovanpå kvälls- eller natt-OB?",
        answer:
          "Ja. Avtalet anger att veckosluts- och helgtilläggen betalas vid sidan av det tillämpliga kvälls- eller nattillägget.",
      },
      {
        question: "Vilken uppsägningstid gäller?",
        answer:
          "Det går inte att ge en enda tid för alla från huvudavtalet. Anställningsform, anställningstid och LAS behöver kontrolleras i det enskilda fallet.",
      },
      {
        question: "Hur mycket ger FPT vid föräldraledighet?",
        answer:
          "Huvudavtalet anger inte belopp eller längd. Föräldrapenningtillägget följer separata försäkringsvillkor som behöver kontrolleras för den aktuella ledigheten.",
      },
    ],
    relatedAgreements: [
      "teknikavtalet-ifmetall",
      "i-avtalet",
      "gemensamma-metall",
      "svemek-avtalet",
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§§ 1–2, 4, 6–7, 9 och 16 samt bilagorna 5–7",
      label: "Öppna Stål- och metallindustrin 2025–2027 i original",
      url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/stal--och-metallindustrin-roda-avtalet.pdf",
    },
  },
  "gemensamma-metall": {
    summary:
      "Gemensamma metallavtalet gäller arbetare vid IKEM-anslutna företag inom metallprocess- och övrig metallindustri. Uppgifterna nedan är kontrollerade mot originalavtalet mellan IKEM och IF Metall för perioden 1 april 2025–31 mars 2027.",
    keyFacts: {
      minimumWage:
        "Från 1 april 2026: 25 122 kr/mån för den som fyllt 18 år och 26 446 kr/mån för den som fyllt 18 år och utför arbete som kräver yrkesutbildning",
      overtimeRate:
        "Ordinarie lön plus 59,82–231,18 kr/tim i övertidstillägg från 1 april 2026, beroende på dag och klockslag. Övertidstillägg och OB betalas inte samtidigt",
      obWeekday:
        "Måndag–fredag kl. 17.00–24.00: 36,00 kr/tim från 1 april 2026",
      obNight:
        "Måndag–lördag kl. 00.00–06.00: 57,20 kr/tim från 1 april 2026. Söndag kl. 00.00–06.00 är nivån 106,30 kr/tim",
      obWeekend:
        "Lördag–söndag kl. 06.00–24.00: 76,30 kr/tim från 1 april 2026. Söndag kl. 00.00–06.00: 106,30 kr/tim",
      obHoliday:
        "Fridag enligt avtalet och övriga helgdagar kl. 00.00–24.00: 190,76 kr/tim från 1 april 2026",
      vacationDays:
        "Semester enligt semesterlagen, normalt 25 dagar. För timavlönade är semesterlön och semesterersättning 13,2 %. För månadsavlönade är semestertillägget 0,8 % av månadslönen per betald dag och 0,52 % av rörliga lönedelar. Om inget annat avtalats lokalt är semesterlönegarantin för vuxna 1 742 kr per dag från 1 april 2026; garantin gäller inte en tidsbegränsad anställning på högst tre månader",
      parentalPay:
        "Föräldraledighetstillägget kommer från en separat föräldraförsäkring mellan Svenskt Näringsliv och LO. Huvudavtalet anger inte försäkringens exakta belopp eller ersättningsperiod",
      noticePeriod:
        "Minst 1 månad för både arbetsgivare och arbetstagare. När arbetsgivaren säger upp är tiden 2–6 månader efter 2–10 års sammanlagd anställningstid",
      pension:
        "Avtalspension SAF-LO. Avtalet innehåller dessutom möjlighet att ansöka om deltidspension från 60 års ålder. Exakta pensionsvillkor regleras separat",
      workHoursPerWeek:
        "Dagarbete och tvåskift: 40 timmar. Intermittent treskift: 38 timmar. Kontinuerligt treskift: 36 timmar, storhelgsdrift: 35 timmar och ständigt nattskift efter lokal överenskommelse: 34 timmar per helgfri vecka i genomsnitt",
    },
    wageTable: [
      {
        role: "Fyllt 18 år",
        minimum: "25 122 kr/mån",
        median: "",
        comment: "Lägsta månadslön från 1 april 2026",
      },
      {
        role: "Fyllt 18 år – arbete som kräver yrkesutbildning",
        minimum: "26 446 kr/mån",
        median: "",
        comment: "Lägsta månadslön från 1 april 2026",
      },
    ],
    faq: [
      {
        question: "Är 25 122 kronor lön för alla vuxna?",
        answer:
          "Nej. Det är avtalets lägsta månadslön efter lönerevisionen 2026. Den faktiska lönen kan vara högre genom företagets lönesystem och lokal lönesättning.",
      },
      {
        question: "Kan jag få både OB och övertidstillägg?",
        answer:
          "Nej, inte enligt avtalets centrala huvudregel. Övertidstillägg och kvälls-, natt- eller helgtillägg betalas inte samtidigt.",
      },
      {
        question: "Hur stor är semesterlönegarantin 2026?",
        answer:
          "För vuxna arbetare är garantin 1 742 kronor per semesterdag från 1 april 2026, om inte de lokala parterna har kommit överens om annat och avtalets villkor är uppfyllda.",
      },
      {
        question: "Vilken uppsägningstid har jag när jag själv slutar?",
        answer:
          "Huvudregeln är minst en månad. Arbetsgivarens uppsägningstid kan vara längre beroende på din sammanlagda anställningstid.",
      },
      {
        question: "Är heltidsmåttet alltid 40 timmar?",
        answer:
          "Nej. Dagtid och tvåskift är 40 timmar, medan flera treskifts- och nattformer har 38, 36, 35 eller 34 timmar i genomsnitt.",
      },
    ],
    relatedAgreements: [
      "teknikavtalet-ifmetall",
      "i-avtalet",
      "stal-och-metall",
      "kemiskt-avtal-ifmetall",
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§§ 1–3, 8 och 10–13 samt bilaga 1 och förteckningen över övriga avtal",
      label: "Öppna Gemensamma metallavtalet 2025–2027 i original",
      url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/gemensamma-metall-2025-2027.pdf",
    },
  },
  "glasavtalet-industri": {
    summary:
      "Glasindustrins avtal gäller arbetare vid glasbruk och jämförbara IKEM-företag. Det är ett annat avtal än Glasmästeriavtalet. Uppgifterna nedan är kontrollerade mot originalavtalet mellan IKEM och IF Metall för perioden 1 juni 2025–31 maj 2027.",
    keyFacts: {
      minimumWage:
        "Avtalet har yrkes- och arbetsuppgiftsspecifika timlöner. Från 1 juni 2026 är timlönen för övrig vuxen arbetare 150,95 kr. Kvalificerade yrken och arbetsuppgifter har högre nivåer enligt lönetabellen",
      overtimeRate:
        "Timavlönad får ordinarie lön plus 41 % och eventuellt OB. Månadsavlönad får ordinarie timlön, månadslönen/175, plus övertidstillägg med månadslönen/420 och eventuellt OB",
      obWeekday:
        "Kvälls- och nattetid kl. 18.00–06.00: 48,14 kr/tim från 1 juni 2026, om inte en högre helg- eller storhelgsnivå gäller",
      obNight:
        "Natt kl. 18.00–06.00: 48,14 kr/tim från 1 juni 2026, om inte en högre helg- eller storhelgsnivå gäller",
      obWeekend:
        "Sön- och helgdagstid: 76,86 kr/tim från 1 juni 2026 under de tider som anges i avtalet",
      obHoliday:
        "Storhelgstid: 153,68 kr/tim från 1 juni 2026 under avtalets angivna perioder kring bland annat nyår, påsk, midsommar och jul",
      vacationDays:
        "Semester enligt semesterlagen, normalt 25 dagar. För tim- och ackordsavlönade är semesterlön och semesterersättning 13,2 %. För månadsavlönade är semestertillägget 0,8 % av månadslönen per betald dag och 0,52 % av rörliga lönedelar. Efter minst tre månaders sammanhängande anställningstid är semesterlönegarantin för vuxna 1 806 kr per betald dag från 1 april 2026",
      parentalPay:
        "Originalavtalet styrker ingen egen nivå eller ersättningsperiod för föräldralön. Kontrollera därför aktuell separat försäkring med IF Metall, arbetsgivaren eller försäkringsgivaren",
      noticePeriod:
        "Originalavtalet innehåller ingen fristående fullständig tabell över generella uppsägningstider. Kontrollera anställningsform, anställningsavtal och aktuella regler i LAS",
      pension:
        "Avtalspension SAF-LO. Dessutom avsätts totalt 2,0 % till deltidspension från 1 juni 2026 för den som omfattas av reglerna",
      workHoursPerWeek:
        "Dagarbete: 40 timmar per helgfri vecka. Kontinuerligt och intermittent tvåskift samt intermittent treskift: 38 timmar. Kontinuerligt treskift och arbete under jord: 1 768 timmar i genomsnitt per år",
    },
    wageTable: [
      {
        role: "Mästare i glasblåsarverkstad",
        minimum: "165,16 kr/tim",
        median: "",
        comment: "Tidlön från 1 juni 2026",
      },
      {
        role: "Uppblåsare",
        minimum: "161,33 kr/tim",
        median: "",
        comment: "Tidlön från 1 juni 2026",
      },
      {
        role: "Förste anfångare",
        minimum: "156,64 kr/tim",
        median: "",
        comment: "Tidlön från 1 juni 2026",
      },
      {
        role: "Fullgod glasslipare, gravör eller glasmålare",
        minimum: "161,12 kr/tim",
        median: "",
        comment: "Tidlön från 1 juni 2026",
      },
      {
        role: "Sprängare, kantare, värmare, kulare, planare, etsare eller sandblästrare",
        minimum: "155,76 kr/tim",
        median: "",
        comment: "Tidlön från 1 juni 2026",
      },
      {
        role: "Mängkarl, ugnsskötare eller försmältare",
        minimum: "155,80 kr/tim",
        median: "",
        comment: "Tidlön från 1 juni 2026",
      },
      {
        role: "Uppläggare, packare, grovarbetare eller chaufför",
        minimum: "155,18 kr/tim",
        median: "",
        comment: "Tidlön från 1 juni 2026",
      },
      {
        role: "Fullgod degelmakare, smältare, formmakare, smed, reparatör, rörarbetare, elektriker, snickare, murare eller målare",
        minimum: "161,12 kr/tim",
        median: "",
        comment: "Lägsta timlön från 1 juni 2026",
      },
      {
        role: "Övrig arbetare – fyllt 18 år",
        minimum: "150,95 kr/tim",
        median: "",
        comment: "Tidlön från 1 juni 2026",
      },
      {
        role: "Övrig arbetare – fyllt 17 år",
        minimum: "132,65 kr/tim",
        median: "",
        comment: "Tidlön från 1 juni 2026",
      },
      {
        role: "Övrig arbetare – fyllt 16 år",
        minimum: "129,05 kr/tim",
        median: "",
        comment: "Tidlön från 1 juni 2026",
      },
    ],
    faq: [
      {
        question: "Är Glasindustrins avtal samma som Glasmästeriavtalet?",
        answer:
          "Nej. Glasindustrins avtal gäller glasbruk och jämförbara industriföretag inom IKEM. Glasmästeriavtalet är ett separat avtal med andra parter och villkor.",
      },
      {
        question: "Finns en enda minimilön för hela glasindustrin?",
        answer:
          "Nej. Avtalet har flera yrkes- och arbetsuppgiftsspecifika nivåer. För övrig vuxen arbetare är timlönen 150,95 kronor från 1 juni 2026, medan kvalificerade arbeten har högre nivåer.",
      },
      {
        question: "Kan OB betalas samtidigt med övertid?",
        answer:
          "Ja. Avtalet anger ordinarie lön, övertidstillägg och eventuellt OB när övertiden ligger på obekväm tid.",
      },
      {
        question: "Hur mycket föräldralön ger avtalet?",
        answer:
          "Huvudavtalet styrker inte någon egen nivå eller period. Aktuellt besked behöver därför hämtas från IF Metall, arbetsgivaren eller den separata försäkring som gäller.",
      },
      {
        question: "Hur lång är den ordinarie arbetstiden?",
        answer:
          "Dagarbete är 40 timmar per helgfri vecka. Flera två- och treskiftsformer är 38 timmar, medan kontinuerligt treskift anges som 1 768 timmar per år.",
      },
    ],
    relatedAgreements: [
      "glasmasteriavtalet",
      "i-avtalet",
      "gemensamma-metall",
      "kemiskt-avtal-ifmetall",
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§§ 1–3, 7, 9, 14–15 och 20 samt bilaga 1",
      label: "Öppna Glasindustrins avtal 2025–2027 i original",
      url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/glasavtalet-2025-2027.pdf",
    },
  },
  samhallsavtalet: {
    summary:
      "Kollektivavtal Samhall gäller arbetare inom åtta LO-förbunds organisationsområden hos Samhall och berörda Fremia-företag. Uppgifterna nedan är kontrollerade mot originalavtalet för perioden 1 oktober 2025–30 september 2027.",
    keyFacts: {
      minimumWage:
        "Grundlönen är 25 833 kr/mån till och med 30 september 2026 och 26 737 kr/mån från 1 oktober 2026. Arbetsuppgifts-, mångkunnighets- och personliga tillägg kan tillkomma",
      overtimeRate:
        "Månadslönen/175 för arbetad tid plus 70,10, 98,00 eller 139,90 kr/tim beroende på när övertiden utförs. Från 1 oktober 2026 är tilläggen 72,20, 101,00 och 144,10 kr/tim. OB betalas inte samtidigt",
      obWeekday:
        "Vardag kl. 17.30–06.30: 41,20 kr/tim, och 42,40 kr/tim från 1 oktober 2026. Inom Handels område gäller i stället 50 % av timlönen kl. 18.15–20.00 och 70 % efter kl. 20.00",
      obNight:
        "Natt på vardag ingår i nivån 41,20 kr/tim, och 42,40 kr/tim från 1 oktober 2026. Inom Handels område gäller 70 % av timlönen efter kl. 20.00",
      obWeekend:
        "Lördag kl. 06.30 till måndag kl. 06.30: 52,10 kr/tim, och 53,70 kr/tim från 1 oktober 2026. Inom Handels område gäller 100 % av timlönen från lördag kl. 12.00 samt på söndag och helgdag",
      obHoliday:
        "Storhelgstid: 104,20 kr/tim, och 107,30 kr/tim från 1 oktober 2026, under de perioder som anges i avtalet. Handels organisationsområde har en egen procentregel",
      vacationDays:
        "Semester enligt semesterlagen, normalt 25 dagar. Semestertillägget är 0,85 % av aktuell månadslön per betald dag och 0,53 % av rörliga lönedelar. Semesterutfyllnaden är minst 1 555 kr per dag, och 1 602 kr från 1 oktober 2026, när avtalets villkor är uppfyllda",
      parentalPay:
        "Föräldrapenningtillägg (FPT) ingår i den separata avtalsförsäkringen Fremia-LO. Huvudavtalet anger inte försäkringens exakta belopp, kvalifikationstid eller ersättningsperiod",
      noticePeriod:
        "För arbetare som inte omfattas av LAS gäller 1 månads ömsesidig uppsägningstid. För andra arbetare behöver uppsägningstiden bedömas enligt LAS och den aktuella anställningen",
      pension:
        "Gemensam tjänstepension (GTP) genom Pensionsvalet. En särskild äldre grupp som var sjuk eller hade partiell sjukersättning enligt avtalets övergångsregel omfattas i stället av Avtalsförsäkring SAF-LO via Fora",
      workHoursPerWeek:
        "Normalt 40 timmar per helgfri vecka. Intermittent tvåskift: 38 timmar. När ordinarie arbetstid ligger både på vardagar och sön- eller helgdagar: 38 timmar per vecka i genomsnitt över fyra veckor",
    },
    wageTable: [
      {
        role: "Grundlön – heltid",
        minimum: "25 833 kr/mån",
        median: "",
        comment: "Gäller 1 oktober 2025–30 september 2026",
      },
      {
        role: "Grundlön – heltid",
        minimum: "26 737 kr/mån",
        median: "",
        comment: "Från 1 oktober 2026",
      },
    ],
    faq: [
      {
        question: "Vilka fackförbund omfattas av Samhallavtalet?",
        answer:
          "Avtalet berör IF Metall, Kommunal, Fastighets, Handels, GS, Seko, HRF och Transport inom respektive organisationsområde.",
      },
      {
        question: "Är grundlönen 25 833 eller 26 737 kronor under 2026?",
        answer:
          "25 833 kronor gäller till och med 30 september 2026. Från 1 oktober 2026 höjs grundlönen till 26 737 kronor. Olika lönetillägg kan tillkomma.",
      },
      {
        question: "Gäller samma OB för den som omfattas av Handels område?",
        answer:
          "Nej. Handelsområdet har en egen procentmodell: 50 procent vissa vardagskvällar, 70 procent senare på kvällen och 100 procent från lördag kl. 12.00 samt på söndag och helgdag.",
      },
      {
        question: "Vilken tjänstepension gäller?",
        answer:
          "Huvudregeln är Gemensam tjänstepension, GTP, via Pensionsvalet. En tydligt avgränsad äldre sjukfrånvarogrupp omfattas i stället av SAF-LO enligt övergångsregeln.",
      },
      {
        question: "Har alla en månads uppsägningstid?",
        answer:
          "Nej. En månad gäller enligt avtalets särskilda regel för arbetare som inte omfattas av LAS. För andra behöver LAS och den enskilda anställningen kontrolleras.",
      },
    ],
    relatedAgreements: [
      "handelsavtalet",
      "teknikavtalet-ifmetall",
      "bemanningsavtalet",
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§§ 1–6, 8, 11 och 17 samt förteckningen över avtalsförsäkringar Fremia-LO",
      label: "Öppna Kollektivavtal Samhall 2025–2027 i original",
      url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/samhall-lo-2025-2027.pdf",
    },
  },
  "svemek-avtalet": {
    summary:
      "SVEMEK-avtalet gäller arbetare vid företag anslutna till SVEMEK inom bland annat stål- och maskinbygge, mekaniska verkstäder, industriservice, lås och säkerhet samt maskinuthyrning. Avtalet är tecknat mellan Föreningen Industriarbetsgivarna och IF Metall och gäller 1 juni 2025–31 maj 2027.",
    keyFacts: {
      minimumWage:
        "Från 1 juni 2026 är garantilönen 24 449 kr/mån för en vuxen arbetstagare i grupp F. Högre yrkesgrupper har 24 893–29 991 kr/mån. Grupp I har ingen centralt angiven garantilön",
      overtimeRate:
        "Ersättning för den arbetade tiden plus 96,80 kr/tim på arbetsdag måndag–fredag, 117,94 kr/tim på arbetsfri vardag och 159,86 kr/tim på lördag, söndag, helgdag samt midsommar-, jul- och nyårsafton från 1 juni 2026. OB betalas inte samtidigt",
      obWeekday:
        "Kl. 16.30–22.30: 33,34 kr/tim från 1 juni 2026",
      obNight:
        "Kl. 22.30–06.30: 44,45 kr/tim från 1 juni 2026",
      obWeekend:
        "Under veckoslut och helger betalas ytterligare 92,60 kr/tim från 1 juni 2026, utöver tillämpligt kvälls- eller nattillägg",
      obHoliday:
        "Helgdag omfattas av det extra helgtillägget på 92,60 kr/tim från 1 juni 2026, utöver tillämpligt kvälls- eller nattillägg. Avtalet anger ingen separat högre storhelgsnivå i denna OB-regel",
      vacationDays:
        "Semester enligt semesterlagen, normalt 25 dagar. För månadsavlönade är semestertillägget 0,8 % av månadslönen per betald dag och 0,5 % av rörliga lönetillägg. Timavlönade har särskilda regler i bilaga 1",
      parentalPay:
        "Föräldrapenningtillägg (FPT) ingår bland avtalsförsäkringarna. Huvudavtalet anger inte försäkringens exakta belopp, kvalifikationstid eller ersättningsperiod",
      noticePeriod:
        "När arbetstagaren säger upp sig är tiden normalt 1 månad. När arbetsgivaren säger upp är tiden 1–6 månader beroende på sammanlagd anställningstid enligt LAS. Tidsbegränsad anställning har särskilda regler",
      pension:
        "Avtalspension SAF-LO. Därutöver avsätts 4,4 % av lönen till livsarbetstidspremie (LP) från 1 januari 2026. Lokal överenskommelse kan använda hela eller delar av utrymmet till arbetstidsförkortning",
      workHoursPerWeek:
        "Dagarbete och tvåskift: 40 timmar. Intermittent treskift: 38 timmar. Kontinuerligt treskift med helguppehåll: 36 timmar, utan helguppehåll: 35 timmar och ständigt nattarbete: 34 timmar per helgfri vecka i genomsnitt",
    },
    wageTable: [
      {
        role: "Grupp I",
        minimum: "Ingen centralt angiven garantilön",
        median: "",
        comment: "Individuell lönesättning efter lokal inplacering",
      },
      {
        role: "Grupp S – yrkesarbetare med specialkompetens",
        minimum: "29 991 kr/mån",
        median: "",
        comment: "Garantilön från 1 juni 2026",
      },
      {
        role: "Grupp A – yrkesarbetare, minst 6 år i yrket",
        minimum: "29 363 kr/mån",
        median: "",
        comment: "Garantilön från 1 juni 2026",
      },
      {
        role: "Grupp B – yrkesarbetare, 5 år i yrket",
        minimum: "28 371 kr/mån",
        median: "",
        comment: "Garantilön från 1 juni 2026",
      },
      {
        role: "Grupp C – yrkesarbetare, 3 år i yrket",
        minimum: "26 777 kr/mån",
        median: "",
        comment: "Garantilön från 1 juni 2026",
      },
      {
        role: "Grupp D – vuxen, 2 år i yrket",
        minimum: "25 534 kr/mån",
        median: "",
        comment: "Garantilön från 1 juni 2026",
      },
      {
        role: "Grupp E – vuxen, 1 år i yrket",
        minimum: "24 893 kr/mån",
        median: "",
        comment: "Garantilön från 1 juni 2026",
      },
      {
        role: "Grupp F – vuxen, fyllt 18 år",
        minimum: "24 449 kr/mån",
        median: "",
        comment: "Garantilön från 1 juni 2026",
      },
      {
        role: "Grupp G – fyllt 17 år",
        minimum: "21 399 kr/mån",
        median: "",
        comment: "Garantilön från 1 juni 2026",
      },
      {
        role: "Grupp H – fyllt 16 år",
        minimum: "20 369 kr/mån",
        median: "",
        comment: "Garantilön från 1 juni 2026",
      },
    ],
    faq: [
      {
        question: "Vilka verksamheter kan omfattas av SVEMEK-avtalet?",
        answer:
          "Bland annat stål- och maskinbygge, mekaniska verkstäder, industriservice, lås och säkerhet samt maskinuthyrning hos företag som är anslutna till SVEMEK.",
      },
      {
        question: "Är 24 449 kronor en genomsnittslön?",
        answer:
          "Nej. Det är garantilönen för en vuxen arbetstagare i grupp F från 1 juni 2026. Yrkeserfarenhet och arbetsuppgifter kan ge en högre grupp och lön.",
      },
      {
        question: "Kan OB och övertidstillägg betalas samtidigt?",
        answer:
          "Nej. Avtalet säger att OB-ersättning och övertidsersättning inte kan betalas samtidigt.",
      },
      {
        question: "Vad är livsarbetstidspremien?",
        answer:
          "Det är en komplettering till SAF-LO. Från 1 januari 2026 avsätts 4,4 procent av lönen. Efter lokal överenskommelse kan hela eller delar i stället användas till arbetstidsförkortning.",
      },
      {
        question: "Vilken uppsägningstid gäller?",
        answer:
          "När du själv säger upp dig är tiden normalt en månad. När arbetsgivaren säger upp kan tiden vara en till sex månader beroende på anställningstid. Visstids- och provanställningar har särskilda regler.",
      },
    ],
    relatedAgreements: [
      "teknikavtalet-ifmetall",
      "stal-och-metall",
      "gemensamma-metall",
      "i-avtalet",
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§§ 1–2, 5–6, 8–10, 15 och 17–19 samt bilagorna 1–2 och 11",
      label: "Öppna SVEMEK-avtalet 2025–2027 i original",
      url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/svemek-2025-2027.pdf",
    },
  },
  "kemiskt-avtal-ifmetall": {
    summary:
      "Avtalet Kemiska fabriker gäller arbetare vid IKEM-anslutna företag inom kemisk basindustri, exempelvis produktion av petrokemiska produkter, specialkemikalier, syror och andra industriråvaror. Uppgifterna nedan är kontrollerade mot originalavtalet mellan IKEM och IF Metall för perioden 1 april 2025–31 mars 2027.",
    keyFacts: {
      minimumWage:
        "Från 1 april 2026: 29 100 kr/mån för den som fyllt 18 år, 26 252 kr/mån för nyanställd under de första 12 månaderna och 18 896 kr/mån för minderårig. Efter ett år och ökad kompetens ska lönen ligga minst 600 kr över tillämplig lägstanivå",
      overtimeRate:
        "Övertidsersättningen per timme är månadslönen/94 kl. 06.00–20.00 helgfria måndagar–fredagar, månadslönen/72 annan tid och månadslönen/59 under avtalets storhelgsperioder. Semesterlön ingår och OB betalas inte samtidigt",
      obWeekday:
        "Kvälls- och nattetid kl. 18.00–06.00: månadslönen/480 per timme, om inte en högre helg- eller storhelgsnivå gäller",
      obNight:
        "Natt kl. 18.00–06.00: månadslönen/480 per timme, om inte en högre helg- eller storhelgsnivå gäller",
      obWeekend:
        "Sön- och helgdagstid under de tider som anges i avtalet: månadslönen/300 per timme",
      obHoliday:
        "Storhelgstid under avtalets angivna perioder: månadslönen/150 per timme",
      vacationDays:
        "Semester enligt semesterlagen, normalt 25 dagar. För månadsavlönade är semestertillägget 0,8 % av månadslönen per betald dag och 0,52 % av rörliga lönedelar. Efter minst tre månaders sammanhängande anställningstid är semesterlönegarantin för vuxna 1 767 kr per betald dag från 1 april 2026",
      parentalPay:
        "Avtalet hänvisar till ett separat avtal om kompletterande föräldrapenning mellan Svenskt Näringsliv och LO. Huvudavtalet anger inte ersättningens exakta belopp, kvalifikationstid eller period",
      noticePeriod:
        "När arbetstagaren säger upp sig är tiden 2 månader efter 2 års anställning, om inget annat har avtalats. I andra fall gäller minst LAS nivåer. När arbetsgivaren säger upp bestäms tiden enligt LAS och anställningstiden",
      pension:
        "Avtalspension SAF-LO. Exakta premier, val och utbetalningsvillkor finns i det separata pensionsavtalet och anges inte i huvudavtalet",
      workHoursPerWeek:
        "Dagarbete: 40 timmar per helgfri vecka. Intermittent treskift samt intermittent och kontinuerligt tvåskift: 38 timmar. Kontinuerligt treskift: 1 768 timmar i genomsnitt per år",
    },
    wageTable: [
      {
        role: "Fyllt 18 år",
        minimum: "29 100 kr/mån",
        median: "",
        comment: "Lägsta månadslön från 1 april 2026",
      },
      {
        role: "Nyanställd – första 12 månaderna",
        minimum: "26 252 kr/mån",
        median: "",
        comment: "Lägsta månadslön från 1 april 2026",
      },
      {
        role: "Minderårig",
        minimum: "18 896 kr/mån",
        median: "",
        comment: "Lägsta månadslön från 1 april 2026",
      },
      {
        role: "Efter 1 års anställning och ökad kompetens",
        minimum: "Tillämplig lägstanivå + 600 kr/mån",
        median: "",
        comment: "Efter genomförd lönerevision",
      },
    ],
    faq: [
      {
        question: "Är Kemiska fabriker samma avtal som I-avtalet?",
        answer:
          "Nej. Båda är avtal mellan IKEM och IF Metall, men Kemiska fabriker gäller ett eget avtalsområde inom kemisk basindustri. I-avtalet omfattar andra verksamheter och har andra villkor.",
      },
      {
        question: "Är 29 100 kronor en genomsnittslön?",
        answer:
          "Nej. Det är avtalets lägsta månadslön för en arbetstagare som fyllt 18 år från 1 april 2026. Den individuella lönen kan vara högre.",
      },
      {
        question: "Kan OB betalas samtidigt med övertidsersättning?",
        answer:
          "Nej. Vid övertid betalas inte tillägget för skiftarbete och förskjuten arbetstid enligt avtalets OB-regel samtidigt.",
      },
      {
        question: "Hur mycket kompletterande föräldrapenning får jag?",
        answer:
          "Det går inte att fastställa från huvudavtalet. Belopp, kvalifikationstid och längd regleras i ett separat avtal mellan Svenskt Näringsliv och LO.",
      },
      {
        question: "Vilken uppsägningstid har jag när jag själv slutar?",
        answer:
          "Efter två års anställning är tiden två månader, om du och arbetsgivaren inte har avtalat något annat. Vid kortare anställning behöver LAS och ditt anställningsavtal kontrolleras.",
      },
    ],
    relatedAgreements: [
      "i-avtalet",
      "gemensamma-metall",
      "teknikavtalet-ifmetall",
      "stal-och-metall",
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§§ 1–5, 10 och 13–14, bilaga 6 samt förteckningen över övriga avtal",
      label: "Öppna Kemiska fabriker 2025–2027 i original",
      url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/kemiska-fabriker-2025-2027.pdf",
    },
  },
  glasmasteriavtalet: {
    summary:
      "Glasmästeriavtalet gäller arbete inom glasmästeribranschen hos arbetsgivare som är bundna av avtalet mellan Glasbranschföreningen och Byggnads. Avtalet innehåller tidlön och premieackord. Uppgifterna nedan är kontrollerade mot originalavtalet som gäller 1 maj 2025–30 april 2027.",
    keyFacts: {
      minimumWage:
        "Från 1 maj 2026: 199,70 kr/tim för fullt yrkeskunnig glasmästeriarbetare. Månadslön räknas som timlönen × 174, vilket motsvarar 34 747,80 kr/mån. Lärlingar har egna utbildningssteg",
      overtimeRate:
        "Ordinarie lön plus 50 % vid övertid på vardag. Plus 100 % från lördag kl. 07.00 till ordinarie arbetstids början på måndag samt under avtalets helg- och fridagsperioder. Kompensationsledighet är 1,5 respektive 2 timmar per övertidstimme",
      obWeekday:
        "Måndag–fredag kl. 05.00–06.00: 20 % av avtalad timlön. Måndag–fredag kl. 18.00–22.00: 40 %. OB betalas inte samtidigt med övertidsersättning",
      obNight:
        "Natt kl. 22.00–05.00: 70 % av avtalad timlön. OB betalas inte samtidigt med övertidsersättning",
      obWeekend:
        "Lördag och söndag: 70 % av avtalad timlön",
      obHoliday:
        "Helgdag: 70 % av avtalad timlön. Avtalet anger ingen separat högre storhelgsnivå i OB-tabellen",
      vacationDays:
        "Semester enligt semesterlagen, normalt 25 dagar. Semesterlön och semesterersättning för timavlönade är 13,2 %. För månadsavlönade är semestertillägget 1,1 % per betald dag",
      parentalPay:
        "Föräldrapenningtillägg, FPT, genom den kollektivavtalade försäkringen. Den tidigare direkta föräldralönen i avtalet upphörde 2014",
      noticePeriod:
        "När arbetstagaren säger upp sig: minst 1 månad. När arbetsgivaren säger upp: 1–6 månader beroende på sammanlagd anställningstid. Särskilda äldre regler kan gälla för avtal ingångna före 1 juli 1997",
      pension:
        "Avtalspension SAF-LO genom den kollektivavtalade försäkringen hos Fora",
      workHoursPerWeek:
        "160 timmar per helgfri fyraveckorsperiod, normalt i genomsnitt 40 timmar per vecka. Veckoarbetstiden får normalt ligga mellan 32 och 43 timmar. Arbetstidsförkortningen är 40 timmar per år",
    },
    wageTable: [
      {
        role: "Fullt yrkeskunnig glasmästeriarbetare",
        minimum: "199,70 kr/tim · 34 747,80 kr/mån",
        median: "",
        comment: "Grundlön från 1 maj 2026; månadslön enligt faktor 174",
      },
      {
        role: "Lärling – steg 1",
        minimum: "127,80 kr/tim",
        median: "",
        comment: "Lönenivå 2026; placering styrs av utbildningsavtalet",
      },
      {
        role: "Lärling – steg 2",
        minimum: "139,80 kr/tim",
        median: "",
        comment: "Lönenivå 2026; placering styrs av utbildningsavtalet",
      },
      {
        role: "Lärling – steg 3",
        minimum: "151,80 kr/tim",
        median: "",
        comment: "Lönenivå 2026; placering styrs av utbildningsavtalet",
      },
      {
        role: "Lärling – steg 4",
        minimum: "163,80 kr/tim",
        median: "",
        comment: "Lönenivå 2026; placering styrs av utbildningsavtalet",
      },
      {
        role: "Lärling – steg 5",
        minimum: "175,70 kr/tim",
        median: "",
        comment: "Lönenivå 2026; placering styrs av utbildningsavtalet",
      },
      {
        role: "Lärling – steg 6",
        minimum: "185,70 kr/tim",
        median: "",
        comment: "Lönenivå 2026; placering styrs av utbildningsavtalet",
      },
    ],
    faq: [
      {
        question: "Vilken är grundlönen för en färdig glasmästare 2026?",
        answer:
          "Från 1 maj 2026 är grundlönen 199,70 kronor per timme för en fullt yrkeskunnig glasmästeriarbetare. Med avtalets månadslönefaktor 174 motsvarar det 34 747,80 kronor per månad.",
      },
      {
        question: "Har lärlingar samma lön som yrkesarbetare?",
        answer:
          "Nej. Lärlingar följer en sexstegstrappa. Under 2026 ligger nivåerna mellan 127,80 och 185,70 kronor per timme. Vilket steg som gäller styrs av fullgjorda utbildningstimmar och utbildningsform.",
      },
      {
        question: "Kan OB och övertidsersättning betalas samtidigt?",
        answer:
          "Nej. Avtalet säger att OB-ersättning inte betalas för tid som räknas som övertidsarbete.",
      },
      {
        question: "Betalar arbetsgivaren föräldralön direkt?",
        answer:
          "Den tidigare direkta föräldralönen upphörde 2014. I stället finns kollektivavtalat föräldrapenningtillägg, FPT, genom försäkringen.",
      },
    ],
    relatedAgreements: [
      "byggavtalet",
      "plat-ventilationsavtalet",
      "maleriavtalet",
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§§ 1–4, 9–10 och 13, bilaga 4 samt Yrkesutbildningsavtalet §§ 4–5",
      label: "Öppna Glasmästeriavtalet 2025–2027 i original",
      url: "https://www.byggnads.se/4a728f/siteassets/kollektivavtal/glasmasteriavtalet-2025-2027.pdf",
    },
  },
  entreprenadmaskinavtalet: {
    summary:
      "Entreprenadmaskinavtalet är avtalet mellan Maskinentreprenörerna och Byggnads för ett brett anläggnings- och entreprenadområde. Det omfattar bland annat väg, järnväg, bro, mark och ledningar samt pålning, borrning, dykeri och muddring. Uppgifterna nedan är kontrollerade mot avtalet som gäller 1 juni 2025–31 maj 2027.",
    keyFacts: {
      minimumWage:
        "Från 1 juni 2026: 201,00 kr/tim eller 34 974 kr/mån för yrkesarbetare med yrkesbevis och maskinförare med yrkesbevis. Andra kategorier har egna grundlöner",
      overtimeRate:
        "Ordinarie lön plus 30 % måndag–fredag kl. 06.00–17.00, 50 % kl. 05.00–06.00 och 17.00–19.00, 70 % kl. 19.00–22.00 samt 100 % kl. 22.00–05.00 och på lördag, söndag och helgdag. OB betalas inte samtidigt",
      obWeekday:
        "Måndag–fredag kl. 05.00–06.00: 20 % av utgående lön. Kl. 18.00–22.00: 40 %. OB betalas inte samtidigt med övertidsersättning",
      obNight:
        "Måndag–fredag kl. 22.00–05.00: 70 % av utgående lön",
      obWeekend:
        "Lördag och söndag: 70 % av utgående lön hela dygnet",
      obHoliday:
        "Helgdag: 70 % av utgående lön hela dygnet. Avtalet anger ingen separat högre storhelgsnivå i OB-tabellen",
      vacationDays:
        "Semester enligt semesterlagen, normalt 25 dagar. Semesterlön och semesterersättning för timavlönade är 13,1 %. För månadsavlönade är semestertillägget 1,1 % per betald dag",
      parentalPay:
        "Föräldrapenningtillägg, FPT, enligt den kollektivavtalade försäkringen. AFA Försäkring administrerar tillägget och arbetstagaren ansöker själv",
      noticePeriod:
        "När arbetstagaren säger upp sig: minst 1 månad. När arbetsgivaren säger upp: 1–6 månader beroende på sammanlagd anställningstid",
      pension:
        "Avtalspension SAF-LO genom den kollektivavtalade försäkringen",
      workHoursPerWeek:
        "Normalt 40 timmar per helgdagsfri vecka. Ordinarie tid kan genomsnittsberäknas till 160 timmar på fyra veckor. Kontinuerligt treskift är 35 timmar och intermittent treskift 36 timmar per vecka. Vid bergarbete i bergrum gäller 36 timmar och vid intermittent treskift där 34 timmar",
    },
    wageTable: [
      {
        role: "Yrkesarbetare",
        minimum: "201,00 kr/tim · 34 974 kr/mån",
        median: "",
        comment: "Grundlön från 1 juni 2026; yrkesbevis krävs",
      },
      {
        role: "Övriga arbetstagare 1",
        minimum: "176,88 kr/tim · 30 777 kr/mån",
        median: "",
        comment: "Fyllt 19 år och minst 12 månaders styrkt branscherfarenhet",
      },
      {
        role: "Övriga arbetstagare 2",
        minimum: "140,70 kr/tim · 24 482 kr/mån",
        median: "",
        comment: "Fyllt 19 år och kortare än 12 månaders branscherfarenhet",
      },
      {
        role: "Övriga arbetstagare 3",
        minimum: "100,50 kr/tim · 17 487 kr/mån",
        median: "",
        comment: "Under 19 år och kortare än 12 månaders branscherfarenhet",
      },
      {
        role: "Städpersonal 1",
        minimum: "150,75 kr/tim · 26 231 kr/mån",
        median: "",
        comment: "Fyllt 19 år; grundlön från 1 juni 2026",
      },
      {
        role: "Städpersonal 2",
        minimum: "100,50 kr/tim · 17 487 kr/mån",
        median: "",
        comment: "Under 19 år; grundlön från 1 juni 2026",
      },
      {
        role: "Maskinförare med yrkesbevis",
        minimum: "201,00 kr/tim · 34 974 kr/mån",
        median: "",
        comment: "Grundlön från 1 juni 2026",
      },
      {
        role: "Bilförare m.fl.",
        minimum: "190,95 kr/tim · 33 226 kr/mån",
        median: "",
        comment: "Bil, traktor, truck och dumper; från 1 juni 2026",
      },
      {
        role: "Övriga förare",
        minimum: "176,88 kr/tim · 30 777 kr/mån",
        median: "",
        comment: "Förare utan yrkesbevis enligt avtalets definition",
      },
      {
        role: "Reparations- och förrådsarbetare m.fl.",
        minimum: "190,95 kr/tim · 33 226 kr/mån",
        median: "",
        comment: "Grundlön från 1 juni 2026",
      },
    ],
    faq: [
      {
        question: "Är 201 kronor i timmen grundlön för alla?",
        answer:
          "Nej. Nivån gäller från 1 juni 2026 för yrkesarbetare och maskinförare med yrkesbevis. Övriga arbetstagare, förare, städpersonal och lärlingar har andra nivåer.",
      },
      {
        question: "Gäller avtalet bara förare av grävmaskin?",
        answer:
          "Nej. Avtalsområdet är bredare och omfattar många slags anläggningsarbeten, bland annat väg, järnväg, bro, mark och ledningar samt pålning, borrning, dykeri och muddring.",
      },
      {
        question: "Har torn- och mobilkranförare alltid en fast högre lön?",
        answer:
          "Nej. Avtalet har särskilda regler för vissa uppdrag. Från den 350:e arbetade timmen hos samma beställare är den lägsta lönen 1,25 gånger grundlönen i lönestatistikområdena Uppland och Stockholm/Södertälje och 1,2 gånger grundlönen i övriga områden. En alternativ lokal löneregel kan också avtalas.",
      },
      {
        question: "Kan OB och övertidsersättning betalas samtidigt?",
        answer:
          "Nej. När övertidsersättning betalas ska OB-ersättning inte betalas för samma tid.",
      },
    ],
    relatedAgreements: ["byggavtalet", "vag-banavtalet-seko"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "Avtalets omfattning, § 2 punkterna 1, 3 och 5–7, § 3 punkterna 6–7, § 4 punkterna 2–3, §§ 9 och 12 samt bilaga A1 § 13 och bilaga I",
      label: "Öppna Entreprenadmaskinavtalet 2025–2027 i original",
      url: "https://www.byggnads.se/4a4eef/siteassets/kollektivavtal/entreprenadmaskinavtalet-2025-2027.pdf",
    },
  },
  "plat-ventilationsavtalet": {
    summary:
      "Plåt- och Ventilationsavtalet gäller arbetstagare hos medlemsföretag i Plåt & Ventföretagen inom byggnadsplåt och tak, ventilation, kanal- och skorstensrensning, service samt bearbetning av tunnplåt. Uppgifterna nedan är kontrollerade mot avtalet som gäller 1 maj 2025–30 april 2027.",
    keyFacts: {
      minimumWage:
        "Från 1 maj 2026: 201,60 kr/tim eller 35 078 kr/mån för yrkesarbetare med yrkesbevis eller motsvarande. Arbetstagare utan yrkesutbildning, övriga arbetare och lärlingar har egna nivåer",
      overtimeRate:
        "Total ersättning är 150 % av utgående timlön på helgfri vardag kl. 06.30–20.00 och 200 % på annan tid. Kompensationsledighet är 1,5 respektive 2 timmar per övertidstimme",
      obWeekday:
        "Helgfri vardag kl. 17.00–22.00: 30 % av utgående lön. OB betalas inte samtidigt med övertidsersättning",
      obNight:
        "Helgfri vardag kl. 22.00–06.30: 50 % av utgående lön",
      obWeekend:
        "Lördag och söndag: 100 % av utgående lön",
      obHoliday:
        "Helgdag: 100 % av utgående lön. Avtalet anger ingen separat högre storhelgsnivå i OB-tabellen",
      vacationDays:
        "Semester enligt semesterlagen, normalt 25 dagar. Semesterlön och semesterersättning för timavlönade är 13,2 %. För månadsavlönade är semestertillägget 1,1 % per betald dag",
      parentalPay:
        "Föräldrapenningtillägg genom den kollektivavtalade försäkringen hos AFA. Tillägget kan betalas längst tills barnet fyller 18 månader eller 18 månader efter adoption",
      noticePeriod:
        "För tillsvidareanställning följer uppsägningstiden LAS: minst 1 månad när arbetstagaren säger upp sig och 1–6 månader när arbetsgivaren säger upp, beroende på anställningstid. Särskilda regler finns för bland annat lärlingar och vissa tidsbegränsade anställningar",
      pension:
        "Avtalspension SAF-LO. Därutöver görs en extra pensionsavsättning på totalt 2,0 % på avtalsområdet från 1 maj 2025",
      workHoursPerWeek:
        "Normalt 40 timmar per helgfri vecka. Tvåskift och intermittent treskift är 38 timmar; kontinuerligt treskift är 36 timmar per helgfri vecka",
    },
    wageTable: [
      {
        role: "Yrkesarbetare med yrkesbevis",
        minimum: "201,60 kr/tim · 35 078 kr/mån",
        median: "",
        comment: "Lägsta lön från 1 maj 2026",
      },
      {
        role: "Yrkesarbetare utan yrkesutbildning – mer än 2 år",
        minimum: "191,50 kr/tim · 33 321 kr/mån",
        median: "",
        comment: "Lägsta lön från 1 maj 2026",
      },
      {
        role: "Yrkesarbetare utan yrkesutbildning – 1–2 år",
        minimum: "181,40 kr/tim · 31 564 kr/mån",
        median: "",
        comment: "Lägsta lön från 1 maj 2026",
      },
      {
        role: "Yrkesarbetare utan yrkesutbildning – 0–1 år",
        minimum: "181,40 kr/tim · 31 564 kr/mån",
        median: "",
        comment: "Lägsta lön från 1 maj 2026",
      },
      {
        role: "Övriga arbetare – mer än 2 år",
        minimum: "191,50 kr/tim · 33 321 kr/mån",
        median: "",
        comment: "Lägsta lön från 1 maj 2026",
      },
      {
        role: "Övriga arbetare – 1–2 år",
        minimum: "181,40 kr/tim · 31 564 kr/mån",
        median: "",
        comment: "Lägsta lön från 1 maj 2026",
      },
      {
        role: "Övriga arbetare – 0–1 år",
        minimum: "171,40 kr/tim · 29 824 kr/mån",
        median: "",
        comment: "Lägsta lön från 1 maj 2026",
      },
    ],
    faq: [
      {
        question: "Gäller 201,60 kronor i timmen för alla?",
        answer:
          "Nej. Beloppet gäller yrkesarbetare med yrkesbevis eller motsvarande från 1 maj 2026. Arbetstagare utan yrkesutbildning, övriga arbetare och lärlingar har egna nivåer.",
      },
      {
        question: "Finns ett särskilt tillägg för certifierad ventilationsmontör?",
        answer:
          "Ja. Vid tidlönearbete är tillägget 4 kronor per timme eller 696 kronor per månad för certifierad ventilationsmontör.",
      },
      {
        question: "Kan OB och övertidsersättning betalas samtidigt?",
        answer:
          "Nej. Arbete som ger rätt till övertidsersättning ger inte OB-ersättning för samma tid.",
      },
      {
        question: "Hur stor är den extra pensionsavsättningen?",
        answer:
          "Avtalet anger en extra pensionsavsättning på totalt 2,0 procent på avtalsområdet från 1 maj 2025, utöver den ordinarie Avtalspension SAF-LO.",
      },
    ],
    relatedAgreements: [
      "byggavtalet",
      "vvs-montorsavtalet",
      "installationsavtalet",
      "glasmasteriavtalet",
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§ 1 punkterna 1–2, § 2 punkterna 2 och 10–14, § 5 punkt 3, § 9 punkterna 1–3, § 10 punkt 2, § 13, bilaga 1 samt 11 § lagen om anställningsskydd",
      label: "Öppna Plåt- och Ventilationsavtalet 2025–2027 i original",
      url: "https://www.byggnads.se/4a76c4/siteassets/kollektivavtal/plat--och-ventilationsavtalet-2025---2027.pdf",
    },
  },
  maleriavtalet: {
    summary:
      "Kollektivavtalet för måleriyrket är riksavtalet mellan Måleriföretagen i Sverige och Byggnads för måleribranschen. Ackord enligt riksprislistan är grundformen om ingen annan löneform avtalas skriftligt. Uppgifterna nedan är kontrollerade mot avtalet som gäller 1 maj 2025–30 april 2027.",
    keyFacts: {
      minimumWage:
        "Från 1 maj 2026: garantilön 205,00 kr/tim för kvalificerad målare och lägsta individuella tidlön 211,45 kr/tim. Garantin i Stockholms ortsgrupp är 5 % högre, 215,25 kr/tim",
      overtimeRate:
        "Utöver lön för arbetad tid betalas ett övertidstillägg på 75 % av garantilönen vid ackord eller 75 % av tidlönen vid tidarbete. Kompensationsledighet är 1,75 timmar per övertidstimme, eller 2 timmar när ledigheten tas ut november–april",
      obWeekday:
        "Avtalet har ingen allmän OB-tabell. Vid överenskommen förskjutning av den ordinarie arbetstiden med högst tre timmar betalas ett tillägg på 30 % av tidlönen för tid utanför den ordinarie arbetstiden",
      obNight:
        "Ingen särskild nattnivå anges i huvudavtalet. Den uttryckliga regeln är 30 % tillägg vid överenskommen förskjutning av ordinarie arbetstid med högst tre timmar",
      obWeekend:
        "Ingen allmän nivå för helg-OB anges i huvudavtalet. Ett säkert belopp kan därför inte anges utan en särskild lokal överenskommelse eller annan tillämplig regel",
      obHoliday:
        "Ingen allmän nivå för helgdag eller storhelg anges i huvudavtalets regler om arbetstid. Gissa inte ett belopp; kontrollera lokal överenskommelse och om arbetet i stället är övertid",
      vacationDays:
        "Semester enligt semesterlagen, normalt 25 dagar. Semesterlönen är 13,2 % från och med intjänandeåret 2025/2026",
      parentalPay:
        "Föräldrapenningtillägg, FPT, genom den kollektivavtalade försäkringen som arbetsgivaren tecknar hos Fora/AFA. Huvudavtalet anger inte ett eget direkt belopp",
      noticePeriod:
        "När arbetstagaren säger upp sig: minst 1 månad. När arbetsgivaren säger upp: 1–4 månader beroende på sammanlagd anställningstid enligt avtalets anställningsskyddsregler",
      pension:
        "Avtalspension SAF-LO genom den kollektivavtalade försäkringen hos Fora",
      workHoursPerWeek:
        "40 timmar per vecka, normalt måndag–fredag och inom kl. 06.30–16.30. Arbetstidsförkortningen är 40 timmar per kalenderår och räknas i förhållande till faktisk anställningstid",
    },
    wageTable: [
      {
        role: "Kvalificerad målare – garantilön",
        minimum: "205,00 kr/tim",
        median: "",
        comment: "Från 1 maj 2026; används bland annat som preliminär lön vid ackord",
      },
      {
        role: "Kvalificerad målare – garantilön i Stockholms ortsgrupp",
        minimum: "215,25 kr/tim",
        median: "",
        comment: "Garantilönen 205 kr plus ortsprocent 5 % från 1 maj 2026",
      },
      {
        role: "Kvalificerad målare – lägsta individuella tidlön",
        minimum: "211,45 kr/tim",
        median: "",
        comment: "Lägsta tidlön från 1 maj 2026",
      },
    ],
    faq: [
      {
        question: "Är garantilön och lägsta tidlön samma sak?",
        answer:
          "Nej. Från 1 maj 2026 är garantilönen 205 kronor per timme och används bland annat som preliminär lön vid ackord. Den lägsta individuella tidlönen är 211,45 kronor per timme.",
      },
      {
        question: "Hur fungerar Stockholmstillägget?",
        answer:
          "Garantilönen är 5 procent högre i Stockholms ortsgrupp. Från 1 maj 2026 blir den därför 215,25 kronor per timme. Ortsgruppen omfattar Stockholms kommun och Stockholms län utom Norrtälje kommun.",
      },
      {
        question: "Finns en vanlig OB-tabell för kväll, natt och helg?",
        answer:
          "Nej, inte i huvudavtalet. Där finns i stället ett tillägg på 30 procent av tidlönen när ordinarie arbetstid efter överenskommelse förskjuts med högst tre timmar. Lokala regler kan behöva kontrolleras.",
      },
      {
        question: "Hur ersätts övertid?",
        answer:
          "Tillägget är 75 procent av garantilönen vid ackord eller 75 procent av tidlönen vid tidarbete. Om övertiden tas ut som ledighet ges normalt 1,75 timmar per övertidstimme, eller 2 timmar om ledigheten tas november–april.",
      },
      {
        question: "Hur mycket arbetstidsförkortning finns?",
        answer:
          "En heltidsanställd under hela kalenderåret har rätt till 40 timmar. Tiden minskas proportionellt vid kortare faktisk anställningstid.",
      },
    ],
    relatedAgreements: [
      "byggavtalet",
      "glasmasteriavtalet",
      "plat-ventilationsavtalet",
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§§ 1–4, 7, 11, 13 och 17 samt Avtal om anställningsskydd § 5",
      label: "Öppna Kollektivavtalet för måleriyrket 2025–2027 i original",
      url: "https://www.byggnads.se/4a4f6e/siteassets/kollektivavtal/kollektivavtal-for-maleriyrket-2025-2027.pdf",
    },
  },
  "vvs-montorsavtalet": {
    summary:
      "Teknikinstallationsavtalet VVS & Kyl är avtalet mellan Installatörsföretagen och Byggnads för arbetstagare vid medlemsföretag inom kyl-, VVS- och värmepumpbranschen i Sverige. Uppgifterna nedan är kontrollerade mot avtalet som gäller 1 maj 2025–30 april 2027.",
    keyFacts: {
      minimumWage:
        "Från 1 maj 2026: 212,50 kr/tim för yrkesarbetare inom VVS och 36 975 kr/mån för yrkesarbetare inom VVS och kyla. Lärlingar, övriga kyltekniker/montörer och övriga VVS-arbetare har egna nivåer",
      overtimeRate:
        "Total kontant ersättning är 157 % av timlönen vardag efter ordinarie arbetstid till kl. 24.00, 167 % efter kl. 24.00 samt på lördag, söndag och vanlig helgdag, och 200 % på avtalets namngivna helg- och fridagar. Ledighetsalternativen är 90, 100 eller 120 minuter",
      obWeekday:
        "För kvalificerande ordinarie arbete efter kl. 18.00: månadslönen/452 per timme eller 38 % av utgående timlön. OB betalas inte samtidigt med övertidsersättning",
      obNight:
        "Avtalet anger ingen separat högre nattnivå. För kvalificerande ordinarie arbete efter kl. 18.00 används samma nivå: månadslönen/452 eller 38 % av timlönen",
      obWeekend:
        "Ingen separat generell helgnivå anges i OB-tabellen. Individuell arbetstidsförläggning kan dessutom avtalas utan OB. Kontrollera därför arbetstidsschemat och om tiden i stället är övertid",
      obHoliday:
        "Ingen separat generell helgdag eller storhelgsnivå anges i OB-tabellen. Avtalets särskilda helgdagar har däremot en egen nivå vid övertidsarbete",
      vacationDays:
        "Semester enligt semesterlagen, normalt 25 dagar. Semesterlön och semesterersättning för timavlönade är 13,1 %. För månadsavlönade är semestertillägget 1,1 % per betald dag",
      parentalPay:
        "Föräldrapenningtillägg, FPT, genom den kollektivavtalade försäkringen hos Fora/AFA. Avtalet hänvisar till den kompletterande föräldrapenningförsäkringen",
      noticePeriod:
        "När arbetstagaren säger upp sig: minst 1 månad. När arbetsgivaren säger upp: 1–6 månader beroende på sammanlagd anställningstid",
      pension:
        "Avtalspension SAF-LO. Därutöver görs en extra pensionsavsättning på totalt 1,6 % på avtalsområdet under avtalsperioden, även för arbetstagare under 25 år. Den som är under 25 år kan inte välja familjeskydd",
      workHoursPerWeek:
        "160 timmar per helgfri fyraveckorsperiod, i genomsnitt 40 timmar per vecka. Veckoarbetstiden får normalt ligga mellan 35 och 45 timmar. Via arbetstidskontot kan arbetstagaren välja 40 timmars betald ledighet per kalenderår, pensionspremie eller kontant ersättning",
    },
    wageTable: [
      {
        role: "Yrkesarbetare – VVS timlön; VVS och kyla månadslön",
        minimum: "212,50 kr/tim · 36 975 kr/mån",
        median: "",
        comment: "Lägsta lön från 1 maj 2026",
      },
      {
        role: "Lärling – utbildningsperiod 1",
        minimum: "74,38 kr/tim · 12 941 kr/mån",
        median: "",
        comment: "850 arbetade timmar per utbildningsperiod",
      },
      {
        role: "Lärling – utbildningsperiod 2",
        minimum: "85,00 kr/tim · 14 790 kr/mån",
        median: "",
        comment: "850 arbetade timmar per utbildningsperiod",
      },
      {
        role: "Lärling – utbildningsperiod 3",
        minimum: "95,63 kr/tim · 16 639 kr/mån",
        median: "",
        comment: "850 arbetade timmar per utbildningsperiod",
      },
      {
        role: "Lärling – utbildningsperiod 4",
        minimum: "106,25 kr/tim · 18 488 kr/mån",
        median: "",
        comment: "850 arbetade timmar per utbildningsperiod",
      },
      {
        role: "Lärling – utbildningsperiod 5",
        minimum: "116,88 kr/tim · 20 336 kr/mån",
        median: "",
        comment: "850 arbetade timmar per utbildningsperiod",
      },
      {
        role: "Lärling – utbildningsperiod 6",
        minimum: "116,88 kr/tim · 20 336 kr/mån",
        median: "",
        comment: "850 arbetade timmar per utbildningsperiod",
      },
      {
        role: "Lärling – utbildningsperiod 7",
        minimum: "127,50 kr/tim · 22 185 kr/mån",
        median: "",
        comment: "850 arbetade timmar per utbildningsperiod",
      },
      {
        role: "Lärling – utbildningsperiod 8",
        minimum: "148,75 kr/tim · 25 883 kr/mån",
        median: "",
        comment: "850 arbetade timmar per utbildningsperiod",
      },
      {
        role: "Lärling – utbildningsperiod 9",
        minimum: "159,38 kr/tim · 27 731 kr/mån",
        median: "",
        comment: "850 arbetade timmar per utbildningsperiod",
      },
      {
        role: "Lärling – utbildningsperiod 10",
        minimum: "191,25 kr/tim · 33 278 kr/mån",
        median: "",
        comment: "850 arbetade timmar per utbildningsperiod",
      },
      {
        role: "Övrig kyltekniker/montör – 0–1 år",
        minimum: "24 404 kr/mån",
        median: "",
        comment: "Lägsta månadslön från 1 maj 2026",
      },
      {
        role: "Övrig kyltekniker/montör – 1–2 år",
        minimum: "25 883 kr/mån",
        median: "",
        comment: "Lägsta månadslön från 1 maj 2026",
      },
      {
        role: "Övrig kyltekniker/montör – 2–3 år",
        minimum: "26 992 kr/mån",
        median: "",
        comment: "Lägsta månadslön från 1 maj 2026",
      },
      {
        role: "Övrig kyltekniker/montör – 3–4 år",
        minimum: "29 580 kr/mån",
        median: "",
        comment: "Lägsta månadslön från 1 maj 2026",
      },
      {
        role: "Övrig kyltekniker/montör – 4–5 år",
        minimum: "31 799 kr/mån",
        median: "",
        comment: "Lägsta månadslön från 1 maj 2026",
      },
      {
        role: "Övrig VVS-arbetare – 0–1 år",
        minimum: "138,13 kr/tim · 24 034 kr/mån",
        median: "",
        comment: "Lägsta lön från 1 maj 2026",
      },
      {
        role: "Övrig VVS-arbetare – 1–2 år",
        minimum: "159,38 kr/tim · 27 731 kr/mån",
        median: "",
        comment: "Lägsta lön från 1 maj 2026",
      },
      {
        role: "Övrig VVS-arbetare – mer än 2 år",
        minimum: "191,25 kr/tim · 33 278 kr/mån",
        median: "",
        comment: "Lägsta lön från 1 maj 2026",
      },
    ],
    faq: [
      {
        question: "Gäller 212,50 kronor i timmen för alla i avtalet?",
        answer:
          "Nej. Det är lägsta timlönen för yrkesarbetare inom VVS från 1 maj 2026. Lärlingar, övriga VVS-arbetare och övriga kyltekniker eller montörer har egna lönetabeller.",
      },
      {
        question: "Finns särskilda OB-belopp för natt och helg?",
        answer:
          "Avtalets OB-tabell anger en nivå för kvalificerande ordinarie arbete efter klockan 18: månadslönen delad med 452 eller 38 procent av timlönen. Den anger inte separata generella belopp för natt, helg eller storhelg.",
      },
      {
        question: "Kan OB och övertidsersättning betalas samtidigt?",
        answer:
          "Nej. OB-tillägg betalas inte för tid då övertidsersättning betalas.",
      },
      {
        question: "Hur mycket arbetstidsförkortning finns?",
        answer:
          "Arbetstidskontot ger en heltidsanställd möjlighet att välja 40 timmars betald ledighet per kalenderår. Arbetstagaren kan i stället välja pensionspremie eller kontant ersättning. Alternativen kan normalt inte kombineras samma år.",
      },
      {
        question: "Hur stor är den extra pensionsavsättningen?",
        answer:
          "Avtalet anger en extra pensionsavsättning på totalt 1,6 procent under avtalsperioden, utöver Avtalspension SAF-LO. Den gäller även arbetstagare under 25 år.",
      },
    ],
    relatedAgreements: [
      "installationsavtalet",
      "plat-ventilationsavtalet",
      "byggavtalet",
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§ 1 momenten 1–2, § 3 momenten 2–3, § 4 momenten 4 och 8, § 8 moment 1, § 12, lönebilagan tabeller A–D samt ÖLAS § 13",
      label: "Öppna Teknikinstallationsavtalet VVS & Kyl 2025–2027 i original",
      url: "https://www.byggnads.se/4a7b02/siteassets/kollektivavtal/teknikinstallationsavtal-vvs-kyl-2025-2027.pdf",
    },
  },
  installationsavtalet: {
    summary:
      "Installationsavtalet är avtalet mellan Installatörsföretagen och Svenska Elektrikerförbundet för bland annat starkströms-, svagströms- och hissmontörer, hissmörjare samt vissa radio- och verkstadsarbetare hos medlemsföretag. Avtalet har också uttryckliga undantag. Uppgifterna nedan är kontrollerade mot avtalet som gäller 1 maj 2025–30 april 2027.",
    keyFacts: {
      minimumWage:
        "Från 1 maj 2026: 22 412 kr/mån första året i yrket, 27 519 kr andra året, 30 987 kr tredje året och därefter, 32 880 kr för servicemontör och 33 589 kr för tekniker",
      overtimeRate:
        "Vid kontant ersättning inklusive semesterlön: månadslönen/111 de första två timmarna direkt efter ordinarie tid, /98 därefter till kl. 24, /87 efter kl. 24 samt helg och vanlig helgdag, /72 på angiven storhelg och /87 på arbetsfri vardag. Vid tidsbank ges även en ledighetstimme per övertidstimme och ett separat kontant tillägg",
      obWeekday:
        "Kvälls- och nattetid utanför ordinarie arbetstid: 46 kr/tim från 1 maj 2026, om inte en högre helg- eller storhelgsnivå gäller",
      obNight:
        "Kvälls- och nattetid utanför ordinarie arbetstid: 46 kr/tim från 1 maj 2026, om inte en högre helg- eller storhelgsnivå gäller",
      obWeekend:
        "Från lördag kl. 06.00 till ordinarie arbetstids början på måndag: 127 kr/tim från 1 maj 2026. Samma nivå gäller under avtalets angivna tider kring vanliga helgdagar",
      obHoliday:
        "Söndag och vanlig helgdag: 127 kr/tim. Under avtalets angivna storhelgsperioder: 217 kr/tim från 1 maj 2026",
      vacationDays:
        "25 semesterdagar enligt lag. Semestertillägget är 0,8 % av aktuell månadslön per betald dag samt 0,5 % av summan av rörliga lönedelar under intjänandeåret",
      parentalPay:
        "Rätt till kompletterande föräldrapenning enligt den kollektivavtalade försäkringsöverenskommelsen mellan Svenskt Näringsliv och LO. Installationsavtalet anger inte den exakta ersättningsnivån eller perioden",
      noticePeriod:
        "När arbetstagaren säger upp sig: minst 1 månad. När arbetsgivaren säger upp: 1–6 månader beroende på sammanlagd anställningstid. För visstidsanställning anger avtalet 1 månad från arbetstagarens sida",
      pension:
        "Avtalspension SAF-LO samt extra pension IN–SEF. Den extra pensionsavsättningen anges för närvarande till 1,9 %",
      workHoursPerWeek:
        "Normalt 40 timmar per vecka, måndag–fredag. Vid angivet underjordsarbete under en eller flera hela dagar är måttet 36 timmar. Full arbetstidsförkortning är 32 timmar efter ett helt intjänandeår 1 april–31 mars",
    },
    wageTable: [
      {
        role: "Montör – första året i yrket",
        minimum: "22 412 kr/mån",
        median: "",
        comment: "Lägsta månadslön från 1 maj 2026",
      },
      {
        role: "Montör – andra året i yrket",
        minimum: "27 519 kr/mån",
        median: "",
        comment: "Lägsta månadslön från 1 maj 2026",
      },
      {
        role: "Montör – tredje året och därefter",
        minimum: "30 987 kr/mån",
        median: "",
        comment: "Lägsta månadslön från 1 maj 2026",
      },
      {
        role: "Servicemontör",
        minimum: "32 880 kr/mån",
        median: "",
        comment: "Lägsta månadslön från 1 maj 2026",
      },
      {
        role: "Tekniker",
        minimum: "33 589 kr/mån",
        median: "",
        comment: "Lägsta månadslön från 1 maj 2026",
      },
    ],
    faq: [
      {
        question: "Gäller Installationsavtalet alla elektriker?",
        answer:
          "Nej. Avtalet gäller angivna yrkesgrupper hos medlemmar i Installatörsföretagen och har uttryckliga undantag, bland annat för handels- och lagerarbetare samt personer som enbart anställs för vissa linje- eller jordkabelarbeten.",
      },
      {
        question: "Är de angivna månadslönerna genomsnittslöner?",
        answer:
          "Nej. De är avtalets lägsta månadslöner från 1 maj 2026. Den individuella lönen kan vara högre och fastställs utifrån bland annat yrkeskunnighet, kvalifikation, prestation och ansvar.",
      },
      {
        question: "Kan OB och övertidsersättning betalas samtidigt?",
        answer:
          "Nej. OB-tillägg betalas inte för tid då övertidsersättning betalas.",
      },
      {
        question: "Vad händer om övertiden läggs i tidbanken?",
        answer:
          "En övertidstimme ger en ledighetstimme i den individuella tidbanken. Avtalet anger dessutom ett separat kontant övertidstillägg; tiden ersätts alltså inte enbart med en ledighetstimme.",
      },
      {
        question: "Vilken pension gäller?",
        answer:
          "Avtalspension SAF-LO gäller. Därutöver anger avtalet att den extra pensionsavsättningen IN–SEF för närvarande är 1,9 procent.",
      },
    ],
    relatedAgreements: [
      "vvs-montorsavtalet",
      "plat-ventilationsavtalet",
      "byggavtalet",
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "1 kap. §§ 1–2, 3 kap. § 1, 4 kap. §§ 1–2, 10 och 12, 7 kap. §§ 2, 8–9 och 14, 7A kap. §§ 1–2, 13 kap. § 1 punkt 16, 14 kap. §§ 2 och 6 samt bilaga 3 § 11",
      label: "Öppna Installationsavtalet 2025–2027 i original",
      url: "https://www.in.se/globalassets/dokument/arbetsgivarguiden/publik/kollektivavtal/installationsavtalet-2025-2027.pdf",
    },
  },
};

export const AGREEMENTS_WITH_SOURCE_MATCHED_WAGE_TABLES = new Set(
  Object.entries(PUBLIC_SOURCE_MATCHED_FACTS)
    .filter(([, facts]) => Boolean(facts?.wageTable?.length))
    .map(([slug]) => slug)
);

export function isPublicKeyFactAvailable(
  agreementSlug: string,
  key: keyof Agreement["keyFacts"]
): boolean {
  return PUBLIC_SOURCE_MATCHED_FACTS[agreementSlug]?.keyFacts[key] !== undefined;
}

export function getPublicKeyFact(
  agreement: Agreement,
  key: keyof Agreement["keyFacts"]
): string {
  return (
    PUBLIC_SOURCE_MATCHED_FACTS[agreement.slug]?.keyFacts[key] ??
    PUBLIC_FACT_REVIEW_MESSAGE
  );
}

export function getPublicFactSourceNote(
  agreementSlug: string
): PublicFactSourceNote | null {
  return PUBLIC_SOURCE_MATCHED_FACTS[agreementSlug]?.sourceNote ?? null;
}

const PUBLIC_FACT_CONTEXT_LABELS: Record<
  keyof Agreement["keyFacts"],
  string
> = {
  minimumWage: "Lägsta lön",
  overtimeRate: "Övertid",
  obWeekday: "OB vardag",
  obNight: "OB kväll och natt",
  obWeekend: "OB helg",
  obHoliday: "OB helgdag och storhelg",
  vacationDays: "Semester",
  parentalPay: "Föräldraersättning",
  noticePeriod: "Uppsägningstid",
  pension: "Pension",
  workHoursPerWeek: "Arbetstid",
};

export function getPublicAgreementFactContext(
  agreementSlug: string
): string | null {
  const facts = PUBLIC_SOURCE_MATCHED_FACTS[agreementSlug];
  if (!facts) return null;

  const factKeys = Object.keys(PUBLIC_FACT_CONTEXT_LABELS) as Array<
    keyof Agreement["keyFacts"]
  >;
  const factLines = factKeys.map((key) => {
    const value = facts.keyFacts[key];
    return value
      ? `${PUBLIC_FACT_CONTEXT_LABELS[key]}: ${value}`
      : `${PUBLIC_FACT_CONTEXT_LABELS[key]}: UNDERLAG SAKNAS. Den här uppgiften har inte källgranskats och får inte fyllas i med en uppskattning.`;
  });

  const wageTableLines = facts.wageTable?.length
    ? [
        "Källgranskad lönetabell:",
        ...facts.wageTable.map((row) => {
          const parts = [
            row.role,
            row.minimum ? `lägsta nivå ${row.minimum}` : "lägsta nivå saknas",
            row.median ? `median ${row.median}` : "median har inte publicerats",
            row.comment,
          ].filter(Boolean);
          return parts.join("; ");
        }),
      ]
    : [
        "Källgranskad lönetabell: UNDERLAG SAKNAS. Ange inga lönenivåer utöver de uppgifter som uttryckligen finns ovan.",
      ];

  const faqLines = facts.faq?.length
    ? [
        "Källgranskade frågor och svar:",
        ...facts.faq.flatMap((item) => [
          `Fråga: ${item.question}`,
          `Svar: ${item.answer}`,
        ]),
      ]
    : [
        "Källgranskade frågor och svar: UNDERLAG SAKNAS. Dra inga ytterligare slutsatser från äldre sammanfattningar.",
      ];

  return [
    `Sammanfattning: ${facts.summary}`,
    ...factLines,
    ...wageTableLines,
    ...faqLines,
    `Kontrollerat ${facts.sourceNote.reviewedAt} mot: ${facts.sourceNote.sections}.`,
  ].join("\n");
}

export function createPublicAgreementView(agreement: Agreement): Agreement {
  const identity = getPublicAgreementIdentity(agreement.slug);
  const facts = PUBLIC_SOURCE_MATCHED_FACTS[agreement.slug];
  const keyFacts = Object.fromEntries(
    (Object.keys(agreement.keyFacts) as Array<keyof Agreement["keyFacts"]>).map(
      (key) => [key, getPublicKeyFact(agreement, key)]
    )
  ) as Agreement["keyFacts"];

  return {
    ...agreement,
    ...identity,
    employeeCount: 0,
    summary:
      facts?.summary ??
      `${identity?.name ?? agreement.name} har kontrollerats mot ett aktuellt officiellt källunderlag. Avtalsparter, period och källor visas här. Detaljerade villkor publiceras först när varje uppgift har matchats direkt mot originalavtalet.`,
    keyFacts,
    wageTable: facts?.wageTable ?? [],
    faq: facts?.faq ?? [],
    relatedAgreements: facts?.relatedAgreements ?? [],
    aiSystemPrompt:
      "Använd endast den aktuella avtalstexten. Gissa aldrig och ange tydligt när underlaget inte räcker.",
  };
}
