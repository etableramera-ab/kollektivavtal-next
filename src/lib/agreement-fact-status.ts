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
      url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/stal-och-metall-roda-avtalet.pdf",
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
  "vardforetagarna-bransch-e": {
    summary:
      "Avtalet gäller privat vård, behandlingsverksamhet och omsorg inom Vårdföretagarnas bransch E. Den öppna källan är Kommunals aktuella partsöversikt; den fullständiga avtalstexten finns bakom inloggning. Därför visas bara de villkor som uttryckligen framgår av partsöversikten för perioden 1 juni 2025–31 maj 2027.",
    keyFacts: {
      minimumWage:
        "Från 1 juni 2026: 24 176 kr/mån. För yrkesutbildade är lägstanivån 26 981 kr/mån",
      overtimeRate:
        "Från 1 juni 2026 ersätts en deltidsanställds arbete utöver schemat med övertidsersättning när arbetet sker på arbetsgivarens initiativ. Partsöversikten anger också uttryckliga undantag",
      noticePeriod:
        "För provanställning gäller 14 dagar efter skriftligt besked, både när arbetstagaren och arbetsgivaren avslutar den. Den öppna källan anger inte den allmänna uppsägningstiden för andra anställningar",
    },
    wageTable: [
      {
        role: "Generell lägstanivå",
        minimum: "24 176 kr/mån",
        median: "",
        comment: "Från 1 juni 2026",
      },
      {
        role: "Yrkesutbildad",
        minimum: "26 981 kr/mån",
        median: "",
        comment: "Från 1 juni 2026",
      },
    ],
    faq: [
      {
        question: "Får alla 928 kronor mer den 1 juni 2026?",
        answer:
          "Nej, inte automatiskt. 928 kronor används för att beräkna lönepotten per heltidsanställd om de lokala parterna inte kommer överens om annat. Avtalet har också en alternativ modell där löneutrymmet kan läggas ut som samma krontal för alla vid heltid.",
      },
      {
        question: "Får deltidsanställda övertidsersättning för extrapass?",
        answer:
          "Från 1 juni 2026 är huvudregeln övertidsersättning när arbetet utöver schemat sker på arbetsgivarens initiativ. Partsöversikten anger undantag, bland annat vissa passbyten på arbetstagarens initiativ.",
      },
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "Kommunals partsöversikt publicerad 16 juni 2025: löner och ersättningar, löneavtal, mertid och övriga förändringar",
      label: "Öppna Kommunals avtalsöversikt",
      url: "https://www.kommunal.se/nyhet/avtal-klart-2025-vardforetagarna-privat-vard-och-omsorg-bransch-e",
    },
  },
  "vardforetagarna-bransch-f": {
    summary:
      "Avtalet gäller privatanställda inom äldreomsorg i Vårdföretagarnas bransch F. Den öppna källan är Kommunals aktuella partsöversikt; den fullständiga avtalstexten finns bakom inloggning. Därför visas bara de villkor som uttryckligen framgår av partsöversikten för perioden 1 juni 2025–31 maj 2027.",
    keyFacts: {
      minimumWage:
        "Från 1 juni 2026: 23 713 kr/mån. För yrkesutbildade är lägstanivån 26 899 kr/mån",
      overtimeRate:
        "Från 1 juni 2026 ersätts en deltidsanställds arbete utöver schemat med övertidsersättning när arbetet sker på arbetsgivarens initiativ. Partsöversikten anger också uttryckliga undantag",
      noticePeriod:
        "För provanställning gäller 14 dagar efter skriftligt besked, både när arbetstagaren och arbetsgivaren avslutar den. Den öppna källan anger inte den allmänna uppsägningstiden för andra anställningar",
    },
    wageTable: [
      {
        role: "Generell lägstanivå",
        minimum: "23 713 kr/mån",
        median: "",
        comment: "Från 1 juni 2026",
      },
      {
        role: "Yrkesutbildad",
        minimum: "26 899 kr/mån",
        median: "",
        comment: "Från 1 juni 2026",
      },
    ],
    faq: [
      {
        question: "Får alla 808 kronor mer den 1 juni 2026?",
        answer:
          "Nej, inte automatiskt. 808 kronor används för att beräkna lönepotten per heltidsanställd om de lokala parterna inte kommer överens om annat. En alternativ modell kan i stället ge samma krontal till alla vid heltid.",
      },
      {
        question: "Får deltidsanställda övertidsersättning för extrapass?",
        answer:
          "Från 1 juni 2026 är huvudregeln övertidsersättning när arbetet utöver schemat sker på arbetsgivarens initiativ. Partsöversikten anger undantag, bland annat vissa passbyten på arbetstagarens initiativ.",
      },
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "Kommunals partsöversikt publicerad 16 juni 2025: löner och ersättningar, löneavtal, mertid och övriga förändringar",
      label: "Öppna Kommunals avtalsöversikt",
      url: "https://www.kommunal.se/nyhet/avtal-klart-2025-vardforetagarna-privat-aldreomsorg-bransch-f",
    },
  },
  "vardforetagarna-bransch-g": {
    summary:
      "Avtalet gäller personliga assistenter och ledsagare inom Vårdföretagarnas bransch G. Den fullständiga avtalstexten finns bakom inloggning, så sidan visar endast uppgifter som framgår av Kommunals aktuella partsöversikt för perioden 1 oktober 2025–30 september 2027.",
    keyFacts: {
      minimumWage:
        "23 326 kr/mån från 1 oktober 2025. Nivån höjs till 24 364 kr/mån den 1 oktober 2026",
      overtimeRate:
        "Från 1 oktober 2026 likställs mertidsersättningen med övertidsersättningen. Partsöversikten anger också särskilda regler för passbyten, extra pass och anhöriganställda",
      obHoliday:
        "Pingst tas bort som storhelg i avtalets OB-regler. De övriga exakta OB-beloppen framgår inte av den öppna partsöversikten",
    },
    wageTable: [
      {
        role: "Lägstalön",
        minimum: "23 326 kr/mån",
        median: "",
        comment: "Från 1 oktober 2025",
      },
      {
        role: "Lägstalön",
        minimum: "24 364 kr/mån",
        median: "",
        comment: "Från 1 oktober 2026",
      },
    ],
    faq: [
      {
        question: "När får deltidsanställda samma övertidsersättning?",
        answer:
          "Från 1 oktober 2026 likställs mertidsersättningen med övertidsersättningen. Reglerna har undantag för bland annat vissa i förväg överenskomna extra pass och passbyten.",
      },
      {
        question: "Kan rörliga ersättningar bakas in i en fast lön?",
        answer:
          "Från 1 oktober 2026 tas den möjligheten bort för assistenter som inte är anhöriga. För anhöriganställda som bor i samma hushåll kan särskilda överenskommelser fortfarande användas.",
      },
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "Kommunals partsöversikt publicerad 31 oktober 2025: avtalstid, löner, lägstalöner, ersättningar, OB, jour och mertid",
      label: "Öppna Kommunals avtalsöversikt",
      url: "https://www.kommunal.se/nyhet/avtal-klart-2025-vardforetagarna-personlig-assistans-bransch-g",
    },
  },
  "fremia-personlig-assistans": {
    summary:
      "Avtalet gäller personlig assistans mellan Fremia och Kommunal. Den öppna partsöversikten bekräftar avtalsperioden och de viktigaste förändringarna, men inte hela avtalstexten. Därför visas endast direkt bekräftade uppgifter för perioden 1 november 2025–31 oktober 2027.",
    keyFacts: {
      minimumWage:
        "24 057 kr/mån eller 139,87 kr/tim från 1 januari 2026. Nivån höjs till 25 095 kr/mån eller 145,90 kr/tim den 1 januari 2027",
      overtimeRate:
        "Från 1 november 2026 likställs mertidsersättningen med övertidsersättningen. Den öppna partsöversikten anger inte den exakta övertidsnivån",
    },
    wageTable: [
      {
        role: "Lägstalön",
        minimum: "24 057 kr/mån · 139,87 kr/tim",
        median: "",
        comment: "Från 1 januari 2026",
      },
      {
        role: "Lägstalön",
        minimum: "25 095 kr/mån · 145,90 kr/tim",
        median: "",
        comment: "Från 1 januari 2027",
      },
    ],
    faq: [
      {
        question: "Är löneutrymmet samma sak som en garanterad löneökning?",
        answer:
          "Inte alltid. Avtalet inför en alternativ lönemodell med full individgaranti, men vilken modell som används behöver kontrolleras på arbetsplatsen.",
      },
      {
        question: "När får deltidsanställda samma övertidsersättning?",
        answer:
          "Från 1 november 2026 likställs mertidsersättningen med övertidsersättningen. Den öppna källan anger inte det exakta beloppet.",
      },
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "Kommunals partsöversikt publicerad 19 november 2025: avtalstid, löneökningar, lägstalöner, lönemodell, ersättningar och mertid",
      label: "Öppna Kommunals avtalsöversikt",
      url: "https://www.kommunal.se/nyhet/avtal-klart-2025-fremia-personlig-assistans",
    },
  },
  transportavtalet: {
    summary:
      "Transportavtalet gäller bland annat åkeri, bärgning, terminal och lager mellan Biltrafikens Arbetsgivareförbund och Transport. Avtalsidentitet och period är kontrollerade mot båda parterna. Den aktuella fulltexten kräver inloggning, så äldre löne- och OB-belopp visas inte för perioden 1 april 2025–31 mars 2027.",
    keyFacts: {
      obWeekend:
        "Lastbilsförare fick rätt till kvalificerat OB-tillägg på fredagkvällar i 2025 års avtal. Den öppna källan anger inte tider eller belopp",
      pension:
        "Ett system för deltidspension införs med en avsättning på 0,1 % av lönesumman från 1 april 2026. Den öppna källan beskriver inte hela pensionslösningen",
    },
    faq: [
      {
        question: "Varför visas inga aktuella löner eller OB-belopp?",
        answer:
          "Den aktuella avtalstexten finns bakom partsinloggning. De lokala belopp som fanns sedan tidigare gällde avtalet 2023–2025 och används därför inte.",
      },
      {
        question: "Gäller Transportavtalet bussförare?",
        answer:
          "Nej, inte som huvudregel. Bussförare omfattas normalt av det separata Bussbranschavtalet mellan Sveriges Bussföretag och Kommunal.",
      },
    ],
    relatedAgreements: ["bussbranschavtalet"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "Transports aktuella avtalsförteckning och Transportföretagens avtalsbesked publicerat 3 april 2025",
      label: "Öppna Transportföretagens avtalsbesked",
      url: "https://www.transportforetagen.se/nyhetslista/2025/april/transportavtalet-klart--kostnadsokningar-inom-market2/",
    },
  },
  "serviceentreprenad-fastighets-seko": {
    summary:
      "Det här är Serviceentreprenadavtalet mellan Almega Tjänsteförbunden och Fastighets/Seko. Det är ett annat partsavtal än Serviceentreprenad med Kommunal. Uppgifterna nedan är kontrollerade mot den offentliga originaltexten för perioden 1 juni 2025–31 maj 2027.",
    keyFacts: {
      minimumWage:
        "För heltidsanställda som fyllt 22 år: 28 805 kr/mån från 1 juni 2026. För 18–21 år gäller 90 % och för 16–17 år 80 % av minimilönen",
      overtimeRate:
        "Från 1 juni 2026: heltidsmånadslönen/168 plus 73,63 kr per timme på vardag eller plus 91,39 kr per timme på sön- och helgdagstid. OB kan betalas samtidigt när villkoren är uppfyllda",
      obWeekday:
        "25,69 kr/tim kl. 18.00–24.00 från 1 juni 2026",
      obNight:
        "35,16 kr/tim kl. 00.00–06.00 från 1 juni 2026. Högre nivå kan gälla under helg eller storhelg",
      obWeekend:
        "54,08 kr/tim under avtalets sön- och helgdagstid från 1 juni 2026",
      obHoliday:
        "115,57 kr/tim under avtalets storhelgsperioder från 1 juni 2026",
      vacationDays:
        "Semester följer semesterlagen. Avtalet anger ett semestertillägg på 0,8 % av aktuell månadslön per betald dag och 0,52 % på rörliga lönedelar",
      parentalPay:
        "Föräldrapenningtillägg lämnas genom FPT-försäkringen mellan Svenskt Näringsliv och LO. Belopp, kvalifikation och period regleras separat",
      noticePeriod:
        "När arbetstagaren säger upp sig är tiden 1 månad. När arbetsgivaren säger upp är den 1–6 månader beroende på anställningstid. Särskilda regler kan gälla för tidsbegränsade anställningar",
      pension:
        "Avtalspension SAF-LO ingår bland försäkringarna som arbetsgivaren ska teckna. Premier och uttagsvillkor regleras separat",
      workHoursPerWeek:
        "I genomsnitt 40 timmar per helgfri vecka och år. Nattarbete kl. 22.00–06.00 räknas med faktor 1,08 i arbetstidsmåttet",
    },
    wageTable: [
      {
        role: "Fyllt 22 år, heltid",
        minimum: "28 805 kr/mån",
        median: "",
        comment: "Från 1 juni 2026",
      },
    ],
    faq: [
      {
        question: "Gäller dessa villkor även Serviceentreprenad med Kommunal?",
        answer:
          "Nej. Kommunal har ett separat Serviceentreprenadavtal med en annan avtalsperiod. Fakta från Fastighets/Seko-avtalet får inte användas för Kommunals variant.",
      },
      {
        question: "Kan jag få både OB och övertidsersättning?",
        answer:
          "Ja, avtalet med Fastighets och Seko medger att OB betalas samtidigt med övertidsersättning när villkoren för båda ersättningarna är uppfyllda.",
      },
    ],
    relatedAgreements: ["serviceentreprenad-kommunal"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§ 3 mom. 7, § 4 mom. 2, § 8 mom. 1, § 9 mom. 2, § 10 mom. 1, § 13 mom. 4, § 15 och bilaga 4",
      label: "Öppna Serviceentreprenadavtalet i original",
      url: "https://www.fastighets.se/4a3e04/contentassets/ca8262aa379b44f38673df7101b0dd45/kollektivavtal-serviceentreprenad-fastighets-seko-2025-2027-artnr-6044-2506.pdf",
    },
  },
  "serviceentreprenad-kommunal": {
    summary:
      "Det här är Serviceentreprenadavtalet mellan Almega Tjänsteförbunden och Kommunal. Det gäller 1 september 2025–31 augusti 2027 och är skilt från avtalet med Fastighets/Seko. Någon offentlig fulltext har inte hittats, så detaljerade villkor visas först när de kan kontrolleras mot originalet.",
    keyFacts: {},
    faq: [
      {
        question: "Gäller villkoren från avtalet med Fastighets och Seko här?",
        answer:
          "Nej. Det är ett separat partsavtal och villkoren får inte kopieras över utan kontroll mot Kommunals avtalstext.",
      },
    ],
    relatedAgreements: ["serviceentreprenad-fastighets-seko"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "Serviceföretagens officiella avtalsbesked publicerat 4 september 2025",
      label: "Öppna Serviceföretagens avtalsbesked",
      url: "https://www.serviceforetagen.se/2025/09/04/nytt-kollektivavtal-for-serviceentreprenad-2/",
    },
  },
  bussbranschavtalet: {
    summary:
      "Bussbranschavtalet gäller mellan Sveriges Bussföretag och Kommunal. Den offentliga partsöversikten bekräftar lönegrupper, lägstalöner och viktiga förändringar, men inte hela avtalstexten. Därför visas bara direkt bekräftade uppgifter för perioden 1 oktober 2025–30 september 2027.",
    keyFacts: {
      minimumWage:
        "För medarbetare som fyller 18 år under kalenderåret: minst 24 293 kr/mån efter revisionen 1 oktober 2025 och 25 332 kr/mån efter revisionen 1 oktober 2026. Bussförare har en separat löneplan",
      overtimeRate:
        "Från 1 oktober 2026 likställs mertidsersättningen med övertidsersättningen. Den öppna källan anger inte den fullständiga beräkningsregeln",
      pension:
        "En extra pensionspremie på 0,2 % införs från 1 oktober 2026. Den öppna partsöversikten beskriver inte hela pensionslösningen",
    },
    wageTable: [
      {
        role: "Bussförare lönegrupp 1",
        minimum: "29 912 kr/mån",
        median: "",
        comment: "Från 1 oktober 2025",
      },
      {
        role: "Bussförare lönegrupp 2",
        minimum: "30 553 kr/mån",
        median: "",
        comment: "Från 1 oktober 2025",
      },
      {
        role: "Bussförare lönegrupp 3",
        minimum: "31 114 kr/mån",
        median: "",
        comment: "Från 1 oktober 2025",
      },
      {
        role: "Bussförare lönegrupp 4",
        minimum: "31 871 kr/mån",
        median: "",
        comment: "Från 1 oktober 2025",
      },
      {
        role: "Bussförare lönegrupp 5",
        minimum: "33 005 kr/mån",
        median: "",
        comment: "Från 1 oktober 2025",
      },
    ],
    faq: [
      {
        question: "Är 24 293 kronor bussförarlönen?",
        answer:
          "Nej. Det är avtalets generella lägstanivå för en medarbetare som fyller 18 år under kalenderåret. Bussförare följer lönegrupperna 1–5, som ligger högre.",
      },
      {
        question: "Blir den längsta ramtiden alltid 12 timmar?",
        answer:
          "Nej. Från senast 1 januari 2027 gäller 12 timmar för sammanhängande tjänster i upphandlad linjetrafik som inte innehåller skoltrafik, om inget annat avtalas lokalt.",
      },
    ],
    relatedAgreements: ["transportavtalet"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "Kommunals partsöversikt publicerad 15 oktober 2025: löneökningar, lägstalöner, pension, mertid och arbetstid",
      label: "Öppna Kommunals avtalsöversikt",
      url: "https://www.kommunal.se/nyhet/avtal-klart-2025-sveriges-bussforetag",
    },
  },
  livsmedelsavtalet: {
    summary:
      "Livsmedelsavtalet gäller arbetare hos företag som huvudsakligen verkar inom livsmedelsbranschen och är medlemmar i Livsmedelsföretagen. Avtalet innehåller flera branschtillägg som kan ersätta huvudavtalets regler. Därför måste rätt tilläggsavtal alltid identifieras innan exempelvis lön, OB eller övertid anges. Uppgifterna nedan är kontrollerade mot originalet för perioden 1 april 2025–31 mars 2027.",
    keyFacts: {
      minimumWage:
        "Det finns ingen enda lägstalön för hela avtalsområdet. Lönetabellerna skiljer sig mellan bland annat bageri, bryggeri, mejeri, slakt/chark och övriga tilläggsavtal",
      overtimeRate:
        "Mertid ersätts med övertidsersättning enligt det tilläggsavtal som gäller på arbetsplatsen. Procentsatser och belopp varierar mellan tilläggsavtalen",
      vacationDays:
        "Semester följer semesterlagen med avtalstillägg. Semesterlönen är normalt 13,2 % av underlaget. För en vuxen med minst 6 månaders anställning är garantin 1 711 kr per betald dag från 1 april 2026; bagerier har en särskild regel",
      parentalPay:
        "Föräldrapenningtillägg, FPT, finns genom ett separat kollektivavtal. Villkor och ersättningsperiod framgår inte av Livsmedelsavtalets tryckta huvudtext",
      pension:
        "Avtalspension SAF-LO gäller genom en separat överenskommelse. Premien och övriga pensionsvillkor finns inte utskrivna i Livsmedelsavtalets huvudtext",
      workHoursPerWeek:
        "Huvudregeln är i genomsnitt 40 timmar vid dagarbete, 38 timmar vid tvåskift, diskontinuerligt treskift eller ständigt nattarbete och 36 timmar vid kontinuerligt treskift. Tilläggsavtal och lokala överenskommelser kan ändra förläggningen",
    },
    faq: [
      {
        question: "Varför visas ingen enda minimilön?",
        answer:
          "Livsmedelsavtalet har många branschtillägg med egna lönetabeller. Ett belopp från exempelvis mejeri får inte användas för bageri eller slakt/chark. Rätt tilläggsavtal måste först identifieras.",
      },
      {
        question: "Gäller huvudavtalet alltid före tilläggsavtalet?",
        answer:
          "Nej. När samma fråga regleras i både huvudavtalet och ett tilläggsavtal gäller tilläggsavtalets regel.",
      },
      {
        question: "Är arbetstiden alltid 40 timmar?",
        answer:
          "Nej. Huvudregeln är 40 timmar vid dagarbete, men skift och nattarbete har kortare mått. Tilläggsavtal och lokala överenskommelser kan också påverka arbetstiden.",
      },
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§§ 1, 3–4 och 5.7 samt innehållsförteckningen och inledningen till tilläggsavtalen",
      label: "Öppna Livsmedelsavtalet i original",
      url: "https://www.livs.se/globalassets/livs.se/arbetsplats--och-avtalsfragor/kollektivavtal/livsmedelsavtalet-2025.pdf",
    },
  },
  "teknikavtalet-tjansteman": {
    summary:
      "Det här är tjänstemannaavtalet mellan Teknikarbetsgivarna och Unionen, Sveriges Ingenjörer samt Ledarna. Det är skilt från Teknikavtalet IF Metall för arbetare. De gemensamma anställningsvillkoren och Unionens lönegolv nedan är kontrollerade mot originalet för 1 april 2025–31 mars 2027. Sveriges Ingenjörer och Ledarna har andra löneavtal utan samma centrala belopp.",
    keyFacts: {
      minimumWage:
        "Endast Unionens löneavtal: 22 474 kr/mån från 1 april 2026 för heltidsanställd som fyllt 18 år. Efter ett års sammanhängande anställning är nivån 23 893 kr/mån. En lokal överenskommelse kan medge lägre lön i högst 12 månader. Sveriges Ingenjörer och Ledarna saknar motsvarande gemensamma belopp i underlaget",
      overtimeRate:
        "Övertid helgfri måndag–fredag kl. 06–20 ersätts med månadslönen/94 per timme eller 1,5 timmes ledighet. Övrig tid gäller månadslönen/72 eller 2 timmars ledighet. En skriftlig överenskommelse kan ersätta övertidskompensationen med högre lön och/eller extra semesterdagar",
      obWeekday:
        "Förskjuten arbetstid kl. 18–24 ersätts normalt med månadslönen/600 per timme. Reglerna gäller inte befattningsskikt högre än 2",
      obNight:
        "Förskjuten arbetstid kl. 00–07 ersätts normalt med månadslönen/400 per timme. Reglerna gäller inte befattningsskikt högre än 2",
      obWeekend:
        "Förskjuten arbetstid på arbetsfri dag från kl. 07 till nästa arbetsdag kl. 00 ersätts normalt med månadslönen/300 per timme. Reglerna gäller inte befattningsskikt högre än 2",
      obHoliday:
        "Förskjuten arbetstid under angivna storhelger ersätts normalt med månadslönen/150 per timme. Reglerna gäller inte befattningsskikt högre än 2. Lokala regler kan ersätta nivåerna och ersättningen ges inte samtidigt med övertidsersättning",
      vacationDays:
        "25 semesterdagar. En särskild överenskommelse kan ge 3 eller 5 extra dagar i stället för övertidskompensation",
      parentalPay:
        "Efter minst ett års anställning kan föräldralön betalas i högst två månader och efter minst två år i högst sex månader. Ledigheten ska vara sammanhängande och tas inom 18 månader från födelsen eller, vid adoption, från adoptionen eller mottagandet",
      noticePeriod:
        "När tjänstemannen säger upp sig gäller normalt 1, 2 eller 3 månader beroende på anställningstid. Arbetsgivarens tid är 1–6 månader. Vid arbetsbrist förlängs tiden med 6 månader för den som fyllt 55 år och varit anställd sammanhängande i minst 10 år",
      pension:
        "ITP gäller. Därutöver är premien till förstärkt deltidspension 2,1 %. Från 1 januari 2026 kan deltidspension sökas från 62 års ålder, men den är ingen automatisk rätt",
      workHoursPerWeek:
        "Normalt 40 timmar vid dagarbete och tvåskift, 38 vid intermittent treskift, 36 vid kontinuerligt treskift eller underjordsarbete, 35 vid kontinuerligt treskift med storhelgsdrift och 34 vid ständig natt. Tidbanken tillförs normalt 92 minuter per fullgjord vecka och 212 minuter vid tvåskift",
    },
    faq: [
      {
        question: "Gäller lägstalönen alla tjänstemän?",
        answer:
          "Nej. Beloppen som visas kommer från Unionens löneavtal. Sveriges Ingenjörer och Ledarna har inte samma centrala lönegolv i det granskade underlaget.",
      },
      {
        question: "Är detta samma avtal som Teknikavtalet IF Metall?",
        answer:
          "Nej. Det här avtalet gäller tjänstemän. Teknikavtalet IF Metall är ett separat avtal för arbetare och har andra villkor.",
      },
    ],
    relatedAgreements: ["teknikavtalet-ifmetall"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "löneavtalet sida 111, §§ 5–7 och 12, arbetstidsavtalet samt avtalsändringarna för 2025",
      label: "Öppna Teknikavtalet i original",
      url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/teknikarbetsgivarna-tag-teknikforetagen/?block=22155&mode=Index&resourcename=1.+Teknikavtalet+Unionen+Sveriges+Ingenj%C3%B6rer+Ledarna+2025-2027.pdf",
    },
  },
  "handelns-tjanstemannaavtal": {
    summary:
      "Handelns tjänstemannaavtal gäller mellan Svensk Handel och Unionen/Akademikerförbunden. Det är skilt från Detaljhandelsavtalet för butiksanställda. De gemensamma anställningsvillkoren och Unionens centrala lönegolv nedan är kontrollerade mot originalet för 1 maj 2025–30 april 2027. Akademikerförbundens och Unionens lokala löneavtal saknar ett gemensamt centralt lönegolv.",
    keyFacts: {
      minimumWage:
        "Endast Unionens centrala lönemodeller för heltidsanställda som fyllt 18 år: 22 355 kr/mån under första anställningsåret och 24 573 kr/mån efter minst ett år, från 1 maj 2026. En godkänd introduktionsanställning för 18–23-åringar kan ha 75 % av nivån. Akademikerförbundens löneavtal och Unionens lokala modell har inget motsvarande centralt belopp",
      overtimeRate:
        "Övertid helgfri måndag–fredag kl. 06–20 ersätts med månadslönen/94 per timme eller 1,5 timmes ledighet. Övrig tid gäller månadslönen/72 eller 2 timmars ledighet. En särskild överenskommelse kan ersätta övertidskompensationen med högre lön och/eller extra semesterdagar",
      obWeekday:
        "Förskjuten arbetstid måndag–fredag kl. 18–24 ersätts normalt med månadslönen/600 per timme. En lokal eller i vissa fall individuell överenskommelse kan ersätta reglerna",
      obNight:
        "Förskjuten arbetstid måndag–lördag kl. 00–07 ersätts normalt med månadslönen/400 per timme. En lokal eller i vissa fall individuell överenskommelse kan ersätta reglerna",
      obWeekend:
        "Förskjuten arbetstid lördag kl. 07 till söndag kl. 24 ersätts normalt med månadslönen/300 per timme. En lokal eller i vissa fall individuell överenskommelse kan ersätta reglerna",
      obHoliday:
        "Förskjuten arbetstid under angivna helger ersätts normalt med månadslönen/300 och under storhelger med månadslönen/150 per timme. En lokal eller i vissa fall individuell överenskommelse kan ersätta reglerna. Ersättningen ges inte samtidigt med övertidsersättning",
      vacationDays:
        "25 semesterdagar. En särskild överenskommelse kan ge 3 eller 5 extra dagar i stället för övertidskompensation",
      parentalPay:
        "Efter 1, 2, 3, 4 eller 5 års anställning kan föräldralön betalas i 2, 3, 4, 5 respektive 6 månader. Ledigheten ska vara sammanhängande i minst en månad och tas inom 18 månader från födelse eller adoption. Ersättning beräknas inte för lönedelar över 15 prisbasbelopp per år",
      noticePeriod:
        "När tjänstemannen säger upp sig gäller normalt 1 månad vid kortare än 2 års anställning och därefter 2 månader. Arbetsgivarens tid är 1–6 månader. Vid arbetsbrist förlängs tiden med 6 månader för den som fyllt 55 år och varit anställd sammanhängande i minst 10 år",
      pension:
        "ITP gäller. Därutöver är premien till deltidspension 1,7 %. Deltidspension kan sökas från 62 års ålder, men den är ingen automatisk rätt",
      workHoursPerWeek:
        "Högst 40 timmar i genomsnitt per helgfri vecka, normalt beräknat över högst 3 månader. Måttet är 38 timmar vid intermittent treskift och 36 vid kontinuerligt treskift eller underjordsarbete. Från 2026 finns också en betald arbetstidsförkortningsdag per år",
    },
    faq: [
      {
        question: "Gäller lägstalönen alla som omfattas av avtalet?",
        answer:
          "Nej. Beloppen som visas gäller endast Unionens centrala lönemodeller. Akademikerförbundens löneavtal och Unionens lokala modell har inte samma centrala lönegolv.",
      },
      {
        question: "Är detta avtalet för butiksanställda?",
        answer:
          "Nej. Det här är tjänstemannaavtalet. Butiksanställda omfattas normalt av det separata Detaljhandelsavtalet.",
      },
    ],
    relatedAgreements: ["handelsavtalet", "lager-ehandelsavtalet"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§§ 4–5, 9, 11 och 13 samt bilagorna om arbetstid, lön och deltidspension",
      label: "Öppna Handelns tjänstemannaavtal i original",
      url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/svensk_handel/?block=22181&mode=Index&resourcename=3.+Kollektivavtal+-+Avtal+2025+-+Svensk+Handel+-+20250501-20270430.pdf",
    },
  },
  "it-avtalet": {
    summary:
      "IT/Tech-avtalet gäller mellan TechSverige och Unionen, Sveriges Ingenjörer samt Akavia. Det är ett eget avtalsområde och ska inte blandas ihop med Telekomavtalet eller påhittade yrkesrollsavtal. De gemensamma anställningsvillkoren och Unionens lönegolv nedan är kontrollerade mot originalen för 1 april 2025–31 mars 2027. Sveriges Ingenjörer och Akavia har individuell lokal lönesättning utan samma centrala belopp.",
    keyFacts: {
      minimumWage:
        "Endast Unionens löneavtal: 22 653 kr/mån från 1 april 2026 för heltidsanställd som fyllt 18 år. Efter ett års sammanhängande anställning är nivån 24 375 kr/mån. Sveriges Ingenjörer och Akavia har inget motsvarande centralt lönegolv",
      overtimeRate:
        "Övertid helgfri måndag–fredag kl. 06–20 ersätts med månadslönen/94 per timme eller 1,5 timmes ledighet. Övrig tid gäller månadslönen/72 eller 2 timmars ledighet. En skriftlig överenskommelse kan ersätta övertidskompensationen med högre lön och/eller extra semesterdagar",
      obWeekday:
        "Obekväm arbetstid måndag–fredag kl. 18–24 ersätts normalt med månadslönen/600 per timme. En lokal överenskommelse kan ändra reglerna och chefer kan ha annan ersättning. Ersättningen ges inte samtidigt med övertidsersättning",
      obNight:
        "Obekväm arbetstid måndag–lördag kl. 00–07 ersätts normalt med månadslönen/400 per timme. En lokal överenskommelse kan ändra reglerna och chefer kan ha annan ersättning. Ersättningen ges inte samtidigt med övertidsersättning",
      obWeekend:
        "Obekväm arbetstid lördag kl. 07 till söndag kl. 24 ersätts normalt med månadslönen/300 per timme. En lokal överenskommelse kan ändra reglerna och chefer kan ha annan ersättning. Ersättningen ges inte samtidigt med övertidsersättning",
      obHoliday:
        "Obekväm arbetstid under angivna helger ersätts normalt med månadslönen/300 och under storhelger med månadslönen/150 per timme. En lokal överenskommelse kan ändra reglerna och chefer kan ha annan ersättning. Ersättningen ges inte samtidigt med övertidsersättning",
      vacationDays:
        "25 semesterdagar. En särskild överenskommelse kan ge 3 eller 5 extra dagar i stället för övertidskompensation",
      parentalPay:
        "Föräldralön kräver oavbruten anställning. Varje ersättningsperiod består av 30 sammanhängande dagar: högst två perioder efter minst ett års anställning och högst sex efter tre år. Perioderna ska ligga inom 24 månader från födelse eller adoption. Ersättning beräknas inte för lönedelar över 15 prisbasbelopp per år",
      noticePeriod:
        "När tjänstemannen säger upp sig gäller normalt 1, 2 eller 3 månader beroende på anställningstid. Arbetsgivarens tid är 1–6 månader. Vid arbetsbrist gäller 12 månader för den som fyllt 55 år och varit anställd sammanhängande i minst 10 år",
      pension:
        "ITP gäller. Flexpensionspremien är totalt 1,7 % vid avtalsperiodens slut, men nyanslutna företag kan ha en långsammare infasning och premien kan i vissa fall väljas bort. Deltid kan sökas från 62 år inom ITP 2 och från 63 år inom ITP 1, men är ingen automatisk rätt",
      workHoursPerWeek:
        "Normalt 40 timmar i genomsnitt över 4 veckor eller en kalendermånad, 38 vid intermittent treskift och 36 vid kontinuerligt treskift eller underjordsarbete. Från januari 2026 finns också en betald arbetstidsförkortningsdag per år",
    },
    faq: [
      {
        question: "Finns det en lägstalön i IT/Tech-avtalet?",
        answer:
          "Ja, i Unionens löneavtal. Sveriges Ingenjörer och Akavia har däremot individuell lokal lönesättning utan samma centrala lönegolv.",
      },
      {
        question: "Är IT/Tech-avtalet samma som Telekomavtalet?",
        answer:
          "Nej. Det är två separata avtalsområden. Villkor från Telekomavtalet får inte användas som svar för IT/Tech-avtalet.",
      },
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "anställningsvillkoren §§ 3–7, arbetstidsförkortningen samt Unionens och akademikernas separata löneavtal",
      label: "Öppna Unionens information om IT/Tech-avtalet",
      url: "https://www.unionen.se/kollektivavtal/it-avtalet-inom-techsverige",
    },
  },
  "tjanstemannaavtalet-transportforetagen": {
    summary:
      "Avtalet gäller tjänstemän hos företag inom vägtransport, sjöfart, flyg, buss och hamn. Det är skilt från Transportavtalet för arbetare. Transportföretagen anger cirka 55 000 anställda och 9 100 företag för detta avtal och det separata tjänstemannaavtalet för motorbranschen tillsammans, men publicerar ingen säker fördelning mellan dem.",
    keyFacts: {
      minimumWage:
        "Endast Unionens lönebilaga: från 1 maj 2026 är lägsta heltidslönen 21 565 kr/mån för 20–23 år och 25 322 kr/mån från 24 år. Sveriges Ingenjörer och övriga löneavtal har inte samma centrala lönegolv",
      overtimeRate:
        "Övertid helgfri måndag–fredag kl. 06–20 ersätts normalt med månadslönen/94 per timme eller 1,5 timmes ledighet. Övrig tid gäller månadslönen/72 eller 2 timmars ledighet. Arbetet ska vara beordrat eller godkänt",
      obWeekday:
        "Förskjuten arbetstid måndag–fredag kl. 18–24 ersätts normalt med månadslönen/600 per timme. Lokala överenskommelser kan ändra reglerna och ersättningen ges inte samtidigt med övertidsersättning",
      obNight:
        "Förskjuten arbetstid måndag–lördag kl. 00–07 ersätts normalt med månadslönen/400 per timme. Lokala överenskommelser kan ändra reglerna",
      obWeekend:
        "Förskjuten arbetstid lördag kl. 07 till söndag kl. 24 ersätts normalt med månadslönen/300 per timme. Ersättningen ges inte samtidigt med övertidsersättning",
      obHoliday:
        "Förskjuten arbetstid under angivna helger ersätts normalt med månadslönen/300 och under storhelger med månadslönen/150 per timme. Exakta tidsgränser finns i avtalet",
      vacationDays:
        "Normalt 25 semesterdagar. En skriftlig överenskommelse om att avstå övertidsersättning kan i vissa fall ge 5 extra dagar",
      parentalPay:
        "Efter minst 1 års sammanhängande anställning kan föräldralön betalas i 1–6 månader beroende på anställningstid. Ledigheten ska ligga inom 18 månader från födsel eller adoption och ersättningen kan normalt delas på högst 2 perioder",
      noticePeriod:
        "När tjänstemannen säger upp sig gäller normalt 1–3 månader beroende på anställningstid. Arbetsgivarens tid är 1–6 månader. Vid arbetsbrist kan 6 extra månader gälla från 55 års ålder efter minst 10 års anställning, längst till 65 års ålder",
      pension:
        "ITP gäller. Den kompletterande deltidspensionspremien är 2,0 %. Deltidspension kan sökas från 62 års ålder, men arbetsgivaren kan avslå ansökan om den medför en beaktansvärd störning i verksamheten",
      workHoursPerWeek:
        "Högst 40 timmar i genomsnitt per helgfri vecka under normalt högst 4 månader. Intermittent treskift har 38 timmar och kontinuerligt treskift eller underjordsarbete 36 timmar",
    },
    wageTable: [
      {
        role: "Unionen, 20–23 år",
        minimum: "21 565 kr/mån",
        median: "",
        comment: "Lägsta heltidslön från 1 maj 2026",
      },
      {
        role: "Unionen, från 24 år",
        minimum: "25 322 kr/mån",
        median: "",
        comment: "Lägsta heltidslön från 1 maj 2026",
      },
    ],
    faq: [
      {
        question: "Är detta samma avtal som Transportavtalet?",
        answer:
          "Nej. Det här avtalet gäller tjänstemän. Transportavtalet är ett separat avtal för arbetare inom bland annat åkeri, bärgning, terminal och lager.",
      },
      {
        question: "Gäller lägstalönerna alla i avtalet?",
        answer:
          "Nej. Beloppen på sidan kommer från Unionens lönebilaga. Sveriges Ingenjörer och övriga löneavtal har inte samma centrala lönegolv.",
      },
      {
        question: "Hur lång är arbetsveckan?",
        answer:
          "Normalt högst 40 timmar i genomsnitt per helgfri vecka. Vissa skiftformer har kortare arbetstidsmått.",
      },
    ],
    relatedAgreements: [
      "transportavtalet",
      "tjanstemannaavtalet-motorbranschen",
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§§ 2, 4–5, 9, 11 och 13 samt bilagorna om arbetstid, Unionens löner och deltidspension",
      label: "Öppna avtalet i original",
      url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/transportforetagen/?block=22176&mode=Index&resourcename=6.+Kollektivavtal+-+Avtal+2025+-+Transportf%C3%B6retagen+-+20250501.pdf",
    },
  },
  "tjanstemannaavtalet-motorbranschen": {
    summary:
      "Avtalet gäller tjänstemän inom motorbranschen och är skilt från Motorbranschavtalet för arbetare. Transportföretagen anger cirka 55 000 anställda och 9 100 företag för detta avtal och Tjänstemannaavtalet för transportföretagen tillsammans. Källan delar inte upp antalet mellan avtalen.",
    keyFacts: {
      minimumWage:
        "Unionens lönebilaga innehåller en lägstalönetabell, men rubriken och revisionsåren i originalet motsäger varandra. Därför visas inget belopp innan avtalsparterna har bekräftat dateringen. Sveriges Ingenjörer och Ledarna har andra löneprocesser",
      overtimeRate:
        "Övertid helgfri måndag–fredag kl. 06–20 ersätts normalt med månadslönen/94 per timme eller 1,5 timmes ledighet. Övrig tid gäller månadslönen/72 eller 2 timmars ledighet",
      obWeekday:
        "För tjänstemän som inte är säljare är grundnivån vid förskjuten arbetstid månadslönen/600 per timme. För berörda säljare gäller från 1 maj 2026 i stället 70 kr/tim måndag–fredag från kl. 18. Lokala lösningar kan finnas",
      obNight:
        "För tjänstemän som inte är säljare är grundnivån månadslönen/600 per timme för förskjuten arbetstid utanför vardagar kl. 07–18. Säljare har en separat tabell och lokala lösningar kan finnas",
      obWeekend:
        "För tjänstemän som inte är säljare gäller normalt månadslönen/300 per timme på lördagar, helgdagsaftnar efter kl. 18 samt söndagar och helgdagar. För berörda säljare gäller 143 kr/tim från 1 maj 2026 på lördag från kl. 12 samt söndag och helgdag",
      obHoliday:
        "För tjänstemän som inte är säljare gäller normalt månadslönen/150 per timme under storhelger. För berörda säljare gäller 288 kr/tim från 1 maj 2026 under angivna storhelgstider",
      vacationDays:
        "Grundnivån är 25 semesterdagar. En skriftlig överenskommelse om att avstå övertidsersättning kan ge totalt 28 eller 30 dagar",
      parentalPay:
        "Efter minst 1 års sammanhängande anställning kan föräldralön betalas i 2 månader. Efter minst 2 år kan den betalas i 6 månader. Ledigheten ska ligga inom 18 månader från födsel eller adoption och vara en sammanhängande period",
      noticePeriod:
        "När tjänstemannen säger upp sig gäller normalt 1–3 månader, men indelningen påverkas av om anställningen började före eller efter 1 maj 2016. Arbetsgivarens tid är 1–6 månader. Vid arbetsbrist kan 6 extra månader gälla från 55 års ålder efter minst 10 års anställning",
      pension:
        "ITP gäller. Deltidspension kan sökas från 62 års ålder, men är inte en automatisk rätt och kan avslås om den medför en beaktansvärd störning i verksamheten",
      workHoursPerWeek:
        "Högst 40 timmar i genomsnitt per helgfri vecka under normalt högst 4 månader. Intermittent treskift har 38 timmar och kontinuerligt treskift eller underjordsarbete 36 timmar",
    },
    faq: [
      {
        question: "Är detta samma avtal som Motorbranschavtalet?",
        answer:
          "Nej. Det här avtalet gäller tjänstemän. Motorbranschavtalet med IF Metall gäller arbetare hos bland annat fordonsverkstäder och fordonsåterförsäljare.",
      },
      {
        question: "Vilken lägstalön gäller?",
        answer:
          "Originalets lägstalönetabell har motsägelsefulla årtal. Därför visar sidan inget belopp förrän avtalsparterna har bekräftat dateringen.",
      },
      {
        question: "Är OB samma för säljare och övriga?",
        answer:
          "Nej. Säljare och övriga tjänstemän har separata regler och lokala lösningar kan också finnas.",
      },
    ],
    relatedAgreements: [
      "motorbranschavtalet",
      "tjanstemannaavtalet-transportforetagen",
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§§ 2, 4–6 och 12 samt bilagorna om arbetstid, löner och förskjuten arbetstid",
      label: "Öppna avtalet i original",
      url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/transportforetagen/?block=22176&mode=Index&resourcename=5.+Kollektivavtal+-+Avtal+2025+-+Motorbranschen+-+20250501.pdf",
    },
  },
  motorbranschavtalet: {
    summary:
      "Motorbranschavtalet gäller arbetare hos fordonsåterförsäljare och fordonsverkstäder, inklusive tillhörande lager och förråd. Det omfattar enligt arbetsgivarparten cirka 23 600 anställda hos cirka 1 200 företag. Tjänstemän inom samma arbetsgivarområde har ett separat avtal.",
    keyFacts: {
      minimumWage:
        "Lägsta heltidslön från 1 maj 2026 beror på yrkesgrupp och erfarenhet. Exempel: 27 674 kr/mån för fordonstekniker, 26 844 kr för fullt kompetent yrkesarbetare med minst 6 år i yrket och 22 416 kr från 18 års ålder",
      overtimeRate:
        "Övertid ger betalning för arbetad tid plus ett tillägg. Från 1 maj 2026 är tillägget 87,00 kr/tim på arbetsdag måndag–fredag, 111,40 kr på arbetsfri vardag och 148,70 kr på lördag, söndag och helgdag. Efter de första 2 timmarna måndag–fredag tillkommer 16,00 kr/tim",
      obWeekday:
        "Från 1 maj 2026: 30,10 kr/tim kl. 17.00–22.30. Lokala överenskommelser kan ändra nivån. OB och övertidstillägg betalas inte samtidigt",
      obNight:
        "Från 1 maj 2026: 38,55 kr/tim kl. 22.30–06.30. Lokala överenskommelser kan ändra nivån",
      obWeekend:
        "Från 1 maj 2026: 30,10 kr/tim lördag kl. 06.30–12.30 och 85,35 kr/tim från lördag kl. 12.30 till söndag kl. 22.30. Exakta övergångar vid helgdagar finns i avtalet",
      obHoliday:
        "Från 1 maj 2026: 85,35 kr/tim under avtalets angivna helgdagstider. OB och övertidstillägg betalas inte samtidigt",
      vacationDays:
        "Semester följer semesterlagen, normalt 25 dagar. Vid en tidsbegränsad anställning på högst 3 månader kan 13 % semesterersättning betalas i stället för ledighet",
      parentalPay:
        "Avtalet ansluter till försäkringen om föräldrapenningtillägg, FPT. Vem som får ersättning och hur länge styrs av de separata försäkringsvillkoren; avtalets § 13 reglerar främst själva ledigheten",
      noticePeriod:
        "För tillsvidareanställning följer uppsägningstiden normalt lagen och beror bland annat på anställningstid. Avtalet har ingen enkel egen tabell som bör användas utan kontroll mot aktuell lag och anställningsform",
      pension:
        "Avtalspension SAF-LO gäller. Deltidspensionspremien är 2,7 % från 1 maj 2025. Deltidspension kan sökas från 60 års ålder men är inte en automatisk rätt",
      workHoursPerWeek:
        "Ordinarie arbetstid är 40 timmar i genomsnitt per helgfri vecka. Heltidsanställda tjänar normalt in 82 minuters arbetstidsförkortning per vecka; vid tvåskift anges 190 minuter",
    },
    wageTable: [
      {
        role: "Fordonstekniker",
        minimum: "27 674 kr/mån",
        median: "",
        comment: "Lägsta tidlön från 1 maj 2026",
      },
      {
        role: "Yrkesarbetare, minst 6 år och fullt kompetent",
        minimum: "26 844 kr/mån",
        median: "",
        comment: "Lägsta tidlön från 1 maj 2026",
      },
      {
        role: "Yrkesarbetare, minst 5 år",
        minimum: "25 737 kr/mån",
        median: "",
        comment: "Lägsta tidlön från 1 maj 2026",
      },
      {
        role: "Yrkesarbetare, minst 4 år",
        minimum: "23 524 kr/mån",
        median: "",
        comment: "Lägsta tidlön från 1 maj 2026",
      },
      {
        role: "Yrkesarbetare, minst 3 år",
        minimum: "23 247 kr/mån",
        median: "",
        comment: "Lägsta tidlön från 1 maj 2026",
      },
      {
        role: "Yrkesarbetare, minst 2 år",
        minimum: "22 970 kr/mån",
        median: "",
        comment: "Lägsta tidlön från 1 maj 2026",
      },
      {
        role: "Fyllt 18 år",
        minimum: "22 416 kr/mån",
        median: "",
        comment: "Lägsta tidlön från 1 maj 2026",
      },
      {
        role: "Fyllt 17 år",
        minimum: "16 088 kr/mån",
        median: "",
        comment: "Lägsta tidlön från 1 maj 2026",
      },
      {
        role: "Fyllt 16 år",
        minimum: "15 700 kr/mån",
        median: "",
        comment: "Lägsta tidlön från 1 maj 2026",
      },
    ],
    faq: [
      {
        question: "Vilka arbetsplatser omfattas?",
        answer:
          "Avtalet gäller bland annat fordonsåterförsäljare samt service-, reparations-, skade-, bilglas-, däck-, demonterings- och lackverkstäder som tillhör arbetsgivarområdet.",
      },
      {
        question: "Vilken lägstalön gäller?",
        answer:
          "Det beror på ålder, utbildning, erfarenhet och yrkesgrupp. Tabellen visar de centrala lägsta tidlönerna från 1 maj 2026.",
      },
      {
        question: "Kan jag få både OB och övertidstillägg?",
        answer: "Nej. De två tilläggen betalas inte samtidigt.",
      },
    ],
    relatedAgreements: ["tjanstemannaavtalet-motorbranschen"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§§ 2–3, 7–9, 13, 19 och 23 samt bilagan om 2025–2026 års löner",
      label: "Öppna Motorbranschavtalet i original",
      url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/motorbranschavtalet-20252027.pdf",
    },
  },
  "bankavtalet-finansforbundet": {
    summary:
      "Det här är Finansarbetsgivarnas tillsvidareavtal med Finansförbundet om löner och allmänna villkor. Det gäller Finansförbundets avtalsområde hos anslutna arbetsgivare och ska inte blandas ihop med det parallella avtalet för Saco-förbund. Uppgifterna nedan är kontrollerade mot avtalets lydelse från 1 januari 2026.",
    keyFacts: {
      minimumWage:
        "Från 1 januari 2026 är minimilönen 25 900 kr/mån för den som fyllt 18 år och 28 800 kr/mån för den som fyllt 21 år. Vid deltid proportioneras beloppen. Avsteg kräver lokal eller central överenskommelse",
      overtimeRate:
        "Övertid ersätts med ordinarie timlön plus 50 % eller 100 %, alternativt 1,5 eller 2 timmars ledighet. För heltidslön på minst 83 700 kr/mån under 2026 utgår normalt ingen övertidsersättning; då ges i stället 3 extra semesterdagar",
      obWeekday:
        "Ordinarie arbete vardagar kl. 17.30–20.00 ersätts med timlönen plus 35 %. Två dagar i veckan börjar intervallet kl. 18.30, men inte på fredagar. Ersättningen har ett beräkningstak på 83 700 kr/mån under 2026",
      obNight:
        "Ordinarie arbete vardagar kl. 20.00–07.00 ersätts med timlönen plus 60 %. Ersättningen har ett beräkningstak på 83 700 kr/mån under 2026",
      obWeekend:
        "Ordinarie arbete på en bankfri dag ersätts med timlönen plus 100 %. Midsommar-, jul- och nyårsafton samt lördagar, söndagar och helgdagar är bankfria dagar",
      obHoliday:
        "Ordinarie arbete under avtalets angivna storhelgstider ersätts med timlönen plus 200 %. Det gäller bland annat från kl. 07.00 på midsommar- och julafton till första vardagen efter helgen",
      vacationDays:
        "27 betalda semesterdagar, räknade som bankdagar. Den som enligt avtalet saknar rätt till övertidsersättning har 3 extra dagar, alltså totalt 30",
      parentalPay:
        "Avtalsersättning kan betalas i högst 360 kalenderdagar, eller 450 dagar vid flerbarnsfödsel, inom 18 månader från födsel eller adoption. Ersättningen beräknas med 10 % under avtalets prisbasbeloppsgräns och 80 % på lönedelen över gränsen",
      noticePeriod:
        "När medarbetaren säger upp sig gäller 2 månader vid kortare anställning än 5 år och därefter 3 månader. Arbetsgivarens uppsägningstid är 3–6 månader beroende på anställningstid. Särskilda regler finns bland annat efter 69 års ålder",
      pension:
        "Tjänstepensionen regleras i ett separat BTP-avtal. I BTP1 är den totala premien 6,5 % upp till 7,5 inkomstbasbelopp och 32 % på lönedelar däröver upp till 30 inkomstbasbelopp. BTP2 har andra regler, så rätt BTP-del måste kontrolleras",
      workHoursPerWeek:
        "Högst 38 timmar 30 minuter per helgfri vecka, normalt i genomsnitt över 4 månader. Vid ständigt nattarbete är måttet högst 35 timmar i genomsnitt över 4 veckor",
    },
    wageTable: [
      {
        role: "Fyllt 18 år",
        minimum: "25 900 kr/mån",
        median: "",
        comment: "Minimilön från 1 januari 2026",
      },
      {
        role: "Fyllt 21 år",
        minimum: "28 800 kr/mån",
        median: "",
        comment: "Minimilön från 1 januari 2026",
      },
    ],
    faq: [
      {
        question: "Är detta ett nytt avtal för 2025–2027?",
        answer:
          "Nej. Avtalet gäller tills vidare från 1 januari 2015 och uppdateras när parterna kommer överens om ändringar. Den granskade lydelsen är uppdaterad 1 januari 2026.",
      },
      {
        question: "Vilka minimilöner gäller 2026?",
        answer:
          "25 900 kronor i månaden från 18 år och 28 800 kronor från 21 år. Vid deltid proportioneras beloppen.",
      },
      {
        question: "Har alla 27 semesterdagar?",
        answer:
          "Grundregeln är 27 betalda bankdagar. Den som enligt avtalet saknar rätt till övertidsersättning har 3 extra dagar.",
      },
    ],
    relatedAgreements: ["bankavtalet-saco"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§§ 3–4, 7, 9, 11, 13 och 16 samt det separata BTP-avtalet",
      label: "Öppna Finansarbetsgivarnas avtal med Finansförbundet",
      url: "https://www.finansforbundet.se/globalassets/material---bestall-hem/produkter/allmanna-villkor-finansforbundet-2026-01-01-002.pdf",
    },
  },
  "bankavtalet-saco": {
    summary:
      "Det här är Finansarbetsgivarnas tillsvidareavtal med Akavia och Sveriges Ingenjörer. Det gäller även medlemmar i andra Saco-förbund som är anslutna till PTK inom avtalsområdet. Uppgifterna nedan är kontrollerade mot avtalets lydelse från 1 januari 2026.",
    keyFacts: {
      minimumWage:
        "Avtalet har ingen centralt fastställd minimilön, individgaranti eller bestämd lönepott. Lönen sätts individuellt och lönerevision sker normalt den 1 januari, om de lokala parterna inte enas om annat",
      overtimeRate:
        "Enkel övertid ersätts med timlönen plus 50 % eller 1,5 timmes ledighet. Kvalificerad övertid ger timlönen plus 100 % eller 2 timmars ledighet. Vid minst 45 000 kr/mån utgår normalt ingen övertidsersättning, om inget annat avtalats lokalt; då ges 3 extra semesterdagar",
      obWeekday:
        "Avtalet har inga gemensamma centrala OB-belopp. Arbetstid och eventuell ersättning på obekväma tider kan regleras i lokala avtal",
      obNight:
        "Avtalet har inga gemensamma centrala OB-belopp. Lokala arbetstidsavtal kan reglera ersättning vid nattarbete",
      obWeekend:
        "Avtalet har inga gemensamma centrala OB-belopp. Lokala arbetstidsavtal kan reglera ersättning vid helgarbete",
      obHoliday:
        "Avtalet har inga gemensamma centrala OB-belopp. Lokala arbetstidsavtal kan reglera ersättning vid helgdagar och storhelger",
      vacationDays:
        "27 betalda semesterdagar, räknade som bankdagar. Den som saknar rätt till övertidsersättning har 3 extra dagar, alltså totalt 30",
      parentalPay:
        "Avtalsersättning kan betalas i högst 360 kalenderdagar, eller 450 dagar vid flerbarnsfödsel, inom 18 månader från födsel eller adoption. Ersättningen beräknas med 10 % under avtalets prisbasbeloppsgräns och 80 % på lönedelen över gränsen",
      noticePeriod:
        "För avtal ingångna från 1 juni 2009 gäller 2 månader när arbetstagaren säger upp sig före 5 års anställning och därefter 3 månader. Arbetsgivarens uppsägningstid är 3–6 månader beroende på anställningstid",
      pension:
        "Tjänstepensionen regleras i ett separat BTP-avtal. I BTP1 är den totala premien 6,5 % upp till 7,5 inkomstbasbelopp och 32 % på lönedelar däröver upp till 30 inkomstbasbelopp. BTP2 har andra regler, så rätt BTP-del måste kontrolleras",
      workHoursPerWeek:
        "Lokala arbetstidsavtal gäller i första hand. Den centrala grundnivån är 38,5 timmar per helgfri vecka; utan lokalt avtal beräknas tiden normalt över högst 10 veckor",
    },
    faq: [
      {
        question: "Gäller avtalet bara Akavia och Sveriges Ingenjörer?",
        answer:
          "Avtalet är tecknat med Akavia och Sveriges Ingenjörer men gäller enligt den officiella avtalsinformationen även medlemmar i andra Saco-förbund anslutna till PTK inom området.",
      },
      {
        question: "Finns minimilön eller garanterad löneökning?",
        answer:
          "Nej. Saco-avtalet har ingen central minimilön, individgaranti eller bestämd lönepott. Lönen sätts individuellt.",
      },
      {
        question: "Saknar avtalet OB-ersättning?",
        answer:
          "Det finns inga gemensamma centrala OB-belopp. Ersättning kan däremot regleras i ett lokalt arbetstidsavtal.",
      },
    ],
    relatedAgreements: ["bankavtalet-finansforbundet"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§§ 3, 5–8 och 10 samt det separata BTP-avtalet",
      label: "Öppna Finansarbetsgivarnas avtal med Saco",
      url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/finansarbetsgivarna/?block=22144&mode=Index&resourcename=1.+Kollektivavtal+-+Avtal+2026+-+Finansarbetsgivarna+-+20260101.pdf",
    },
  },
  "sobona-bok-besoksnaring-kulturarv": {
    summary:
      "BÖK 25 Besöksnäring och kulturarv gäller hos berörda Sobona-företag inom bland annat museer, turism, fritid, rekreation, konferens och kulturverksamhet. Det är ett eget branschavtal och ska inte blandas ihop med kommunernas och regionernas HÖK. Sobona anger bara ett gemensamt antal för sina fem BÖK-områden, inte ett säkert antal för denna bransch.",
    keyFacts: {
      minimumWage:
        "Endast Kommunals löneavtal har centrala lägstanivåer: från 1 april 2026 är de 24 573 kr/mån från 19 år och 26 137 kr/mån med yrkesförberedande gymnasieutbildning. AkademikerAlliansen och AKV har andra löneprocesser",
      overtimeRate:
        "Enkel övertid ger 1,5 timmes ledighet eller 180 % av månadslönen/165 per timme. Kvalificerad övertid ger 2 timmars ledighet eller 240 % av månadslönen/165. Arbetet ska normalt vara beordrat eller godkänt",
      obWeekday:
        "Från 1 april 2026: 26,70 kr/tim vardagar kl. 19–22. Vid läns- och regionmuseer är nivån 29,50 kr/tim. Lokala avtal kan ändra reglerna",
      obNight:
        "Från 1 april 2026: 53,80 kr/tim under avtalets vardagsnätter. Vid läns- och regionmuseer är nivån 55,60 kr/tim",
      obWeekend:
        "Från 1 april 2026: 66,50 kr/tim under avtalets helgtider. Vid läns- och regionmuseer är nivån 69,40 kr/tim",
      obHoliday:
        "Från 1 april 2026: 126,50 kr/tim under avtalets storhelgstider. Vid läns- och regionmuseer är nivån 139,40 kr/tim",
      vacationDays:
        "25 dagar till och med året du fyller 39, 31 dagar från året du fyller 40 och 32 dagar från året du fyller 50. En begränsad grupp från äldre KFS-avtal kan ha särskilda regler",
      parentalPay:
        "Efter minst 180 dagars sammanhängande anställning: 10 % av lönebortfallet i högst 180 kalenderdagar och längst tills barnet är 24 månader. För lön över avtalets gräns kan kompletterande föräldralön betalas i högst 270 dagar",
      noticePeriod:
        "För tillsvidareanställning följer uppsägningstiden normalt lagen och beror på anställningstid. En tidsbegränsad anställning kan enligt avtalet normalt sägas upp med 1 månads ömsesidig uppsägningstid. Övergångsregler kan finnas",
      pension:
        "Kommunal tjänstepension gäller enligt den pensionsplan som är tillämplig, vanligtvis AKAP-KR eller KAP-KL. I vissa företag kan en tidigare godkänd central pensionsplan ligga kvar, så rätt plan måste kontrolleras hos arbetsgivaren",
      workHoursPerWeek:
        "Normalt 40 timmar per helgfri vecka. Vid arbete både vardag och helg normalt 38 timmar 15 minuter, vid kontinuerligt treskift 34 timmar 20 minuter och vid intermittent treskift 36 timmar 20 minuter",
    },
    wageTable: [
      {
        role: "Kommunal, fyllt 19 år",
        minimum: "24 573 kr/mån",
        median: "",
        comment: "Lägstanivå från 1 april 2026",
      },
      {
        role: "Kommunal, yrkesförberedande gymnasieutbildning",
        minimum: "26 137 kr/mån",
        median: "",
        comment: "Lägstanivå från 1 april 2026",
      },
    ],
    faq: [
      {
        question: "Gäller lägstalönerna alla i avtalet?",
        answer:
          "Nej. Beloppen gäller Kommunals löneavtal. AkademikerAlliansen och AKV har andra löneprocesser.",
      },
      {
        question: "Har museer samma OB som övriga verksamheter?",
        answer:
          "Inte alltid. Läns- och regionmuseer har en egen, högre OB-tabell i avtalet.",
      },
      {
        question: "Hur många semesterdagar har jag?",
        answer:
          "Huvudregeln är 25, 31 eller 32 dagar beroende på ålder. En begränsad grupp som redan omfattades av äldre KFS-avtal kan ha särskilda regler.",
      },
    ],
    relatedAgreements: ["sobona-bok-energi", "sobona-bok-fastigheter"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "löneavtalen §§ 1–2 samt branschbestämmelserna §§ 12, 18–19, 25, 27 och 29",
      label: "Öppna BÖK Besöksnäring och kulturarv i original",
      url: "https://sobona.se/download/18.1eca47cd19c1c71f06dce0be/1772530261589/Avtal%20Bes%C3%B6ksn%C3%A4ring%20och%20kulturarv%202025.pdf",
    },
  },
  "sobona-bok-energi": {
    summary:
      "BÖK 25 Energi gäller hos berörda Sobona-företag inom bland annat elnät, elproduktion, fiber, fjärrvärme och annan energiverksamhet. Det är ett eget branschavtal och ska inte blandas ihop med andra energiavtal. Sobona anger bara ett gemensamt antal för sina fem BÖK-områden, inte ett säkert antal för energiavtalet.",
    keyFacts: {
      minimumWage:
        "För Kommunal och Seko är den allmänna lägstalönen 23 788 kr/mån från 1 april 2026. För yrkesarbetare är nivåerna 26 826 kr på grundnivå, 30 018 kr efter 2 års erfarenhet och 33 428 kr efter 5 år. AkademikerAlliansen och AKV har lokal lönebildning utan samma centrala belopp",
      overtimeRate:
        "Enkel övertid ger 1,5 timmes ledighet eller 180 % av månadslönen/165 per timme. Kvalificerad övertid ger 2 timmars ledighet eller 240 % av månadslönen/165. Arbetet ska normalt vara beordrat eller godkänt",
      obWeekday:
        "Obekväm arbetstid måndag kl. 18 till fredag kl. 07 ersätts med månadslönen/540 per timme. Lokala avtal kan ändra reglerna och OB betalas inte samtidigt med övertids- eller färdtidsersättning",
      obNight:
        "Vardagskväll och vardagsnatt ligger i samma centrala OB-intervall: månadslönen/540 per timme från måndag kl. 18 till fredag kl. 07",
      obWeekend:
        "Helg och vissa helgaftonsperioder ersätts med månadslönen/314 per timme enligt avtalets tidsgränser",
      obHoliday:
        "Storhelg och tiden från kl. 07 den 6 juni till kl. 07 den 7 juni ersätts med månadslönen/150 per timme enligt avtalets tidsgränser",
      vacationDays:
        "Huvudregeln är 25 semesterdagar. Semesterdagstillägget är 0,8 % och högst 25 dagar kan sparas. En begränsad grupp från äldre KFS-avtal kan ha 31 eller 32 dagar",
      parentalPay:
        "Efter minst 180 dagars sammanhängande anställning: 10 % av lönebortfallet i högst 180 kalenderdagar och längst tills barnet är 24 månader. För lön över avtalets gräns kan kompletterande föräldralön betalas i högst 270 dagar",
      noticePeriod:
        "För tillsvidareanställning följer uppsägningstiden normalt lagen och beror på anställningstid. En tidsbegränsad anställning kan enligt avtalet normalt sägas upp med 1 månads ömsesidig uppsägningstid. Övergångsregler kan finnas",
      pension:
        "Kommunal tjänstepension gäller enligt tillämplig plan. Avtalet anger dessutom en extra pensionsavsättning på 0,5 % av pensionsgrundande lön, men undantag finns bland annat för vissa äldre pensionsplaner",
      workHoursPerWeek:
        "Normalt 40 timmar per helgfri vecka; vissa helg- och skiftformer har kortare mått. Från 2026 finns ett arbetstidskonto på 72 timmar per heltidsanställd och år: arbetstagaren disponerar 63 timmar och arbetsgivaren 9 timmar enligt avtalets valregler",
    },
    wageTable: [
      {
        role: "Kommunal och Seko, allmän nivå",
        minimum: "23 788 kr/mån",
        median: "",
        comment: "Lägstalön från 1 april 2026",
      },
      {
        role: "Kommunal och Seko, yrkesarbetare grundnivå",
        minimum: "26 826 kr/mån",
        median: "",
        comment: "Lägstalön från 1 april 2026",
      },
      {
        role: "Kommunal och Seko, yrkesarbetare efter 2 år",
        minimum: "30 018 kr/mån",
        median: "",
        comment: "Lägstalön från 1 april 2026",
      },
      {
        role: "Kommunal och Seko, yrkesarbetare efter 5 år",
        minimum: "33 428 kr/mån",
        median: "",
        comment: "Lägstalön från 1 april 2026",
      },
    ],
    faq: [
      {
        question: "Har alla ett arbetstidskonto på 72 timmar?",
        answer:
          "Avtalet inför ett konto på 72 timmar per år för heltidsanställda från 2026. Hur timmarna tas ut styrs av avtalet och lokala förhållanden.",
      },
      {
        question: "Gäller lägstalönerna alla fack?",
        answer:
          "Nej. Beloppen gäller Kommunal och Seko. AkademikerAlliansen och AKV har lokal lönebildning utan samma centrala lönegolv.",
      },
      {
        question: "Hur räknas OB?",
        answer:
          "OB räknas som en del av månadslönen: /540 på vardagskväll och natt, /314 under helg och /150 under storhelg enligt avtalets tidsgränser.",
      },
    ],
    relatedAgreements: [
      "sobona-bok-fastigheter",
      "sobona-bok-vatten-miljo",
    ],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "löneavtalen §§ 1–2, branschbestämmelserna §§ 12, 18–19, 25, 27 och 29 samt anteckningen om extra pension",
      label: "Öppna BÖK Energi i original",
      url: "https://sobona.se/download/18.1eca47cd19c1c71f06dd16a5/1770224541432/Avtal%20Energi%202025.pdf",
    },
  },
  "sobona-bok-fastigheter": {
    summary:
      "BÖK 25 Fastigheter gäller hos berörda Sobona-företag inom bland annat allmännyttiga bostäder, kommersiella fastigheter och parkering. Det är inte samma avtal som Fastighetsavtalet för tjänstemän hos Almega-företag. Sobona anger bara ett gemensamt antal för sina fem BÖK-områden, inte ett säkert antal för fastighetsområdet.",
    keyFacts: {
      minimumWage:
        "Från 2026 gäller olika nivåer per fack: Fastighets 27 350 kr/mån för yrkesförberedande utbildning och 1 års erfarenhet från 1 mars; Kommunal 24 327 kr/mån från 19 år och 26 898 kr med yrkesförberedande utbildning och 1 års erfarenhet från 1 april. Akademikerförbunden har andra löneprocesser",
      overtimeRate:
        "Enkel övertid ger 1,5 timmes ledighet eller 180 % av månadslönen/165 per timme. Kvalificerad övertid ger 2 timmars ledighet eller 240 % av månadslönen/165. Arbetet ska normalt vara beordrat eller godkänt",
      obWeekday:
        "Från 1 april 2026: 29,40 kr/tim vardagar kl. 19–22. Lokala avtal kan ändra reglerna och OB betalas normalt inte samtidigt med övertidsersättning",
      obNight:
        "Från 1 april 2026: 57,30 kr/tim under avtalets vardagsnätter",
      obWeekend:
        "Från 1 april 2026: 66,80 kr/tim under avtalets helgtider",
      obHoliday:
        "Från 1 april 2026: 139,40 kr/tim under avtalets angivna storhelgstider",
      vacationDays:
        "Huvudregeln är 25 dagar till och med året du fyller 39, 31 från året du fyller 40 och 32 från året du fyller 50. Vissa företag som tidigare använde KFS Fastigheter/Parkering har i stället 25 dagar och ett arbetstidskonto på 27 timmar från 2026",
      parentalPay:
        "Efter minst 180 dagars sammanhängande anställning: 10 % av lönebortfallet i högst 180 kalenderdagar och längst tills barnet är 24 månader. För lön över avtalets gräns kan kompletterande föräldralön betalas i högst 270 dagar",
      noticePeriod:
        "För tillsvidareanställning följer uppsägningstiden normalt lagen och beror på anställningstid. En tidsbegränsad anställning kan enligt avtalet normalt sägas upp med 1 månads ömsesidig uppsägningstid. Fastighets och övriga fack har delvis olika övergångsregler",
      pension:
        "Kommunal tjänstepension gäller enligt den pensionsplan som är tillämplig, vanligtvis AKAP-KR eller KAP-KL. I vissa företag kan en tidigare godkänd central pensionsplan ligga kvar, så rätt plan måste kontrolleras",
      workHoursPerWeek:
        "Normalt 40 timmar per helgfri vecka; vissa helg- och skiftformer har kortare mått. För Fastighets medlemmar förläggs ordinarie arbete normalt måndag–fredag, högst 9 timmar per dag inom kl. 06–17, om inte annat hanteras lokalt",
    },
    wageTable: [
      {
        role: "Fastighets, utbildning och minst 1 års erfarenhet",
        minimum: "27 350 kr/mån",
        median: "",
        comment: "Lägstalön från 1 mars 2026",
      },
      {
        role: "Kommunal, fyllt 19 år",
        minimum: "24 327 kr/mån",
        median: "",
        comment: "Lägstalön från 1 april 2026",
      },
      {
        role: "Kommunal, utbildning och minst 1 års erfarenhet",
        minimum: "26 898 kr/mån",
        median: "",
        comment: "Lägstalön från 1 april 2026",
      },
    ],
    faq: [
      {
        question: "Gäller samma lägstalön för Fastighets och Kommunal?",
        answer:
          "Nej. Facken har olika löneavtal, villkor och datum. Tabellen skiljer därför tydligt på dem.",
      },
      {
        question: "Har alla ett arbetstidskonto på 27 timmar?",
        answer:
          "Nej. Det gäller bara en begränsad grupp hos vissa företag som använde äldre KFS-avtal. Arbetsgivarens avtalsbakgrund måste kontrolleras.",
      },
      {
        question: "Hur många semesterdagar har jag?",
        answer:
          "Huvudregeln är 25, 31 eller 32 dagar beroende på ålder. En begränsad övergångsgrupp har i stället 25 dagar och särskilda regler.",
      },
    ],
    relatedAgreements: ["fastighetsavtalet", "sobona-bok-energi"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "löneavtalen §§ 1–2, branschbestämmelserna §§ 12, 18–19, 25, 27 och 29 samt övergångsreglerna om arbetstid och semester",
      label: "Öppna BÖK Fastigheter i original",
      url: "https://sobona.se/download/18.1eca47cd19c1c71f06dd1afa/1770225129562/Avtal%20Fastigheter%202025.pdf",
    },
  },
  "sobona-bok-flygplatser": {
    summary:
      "BÖK 25 Flygplatser gäller hos berörda kommunal- och regionalägda flygplatsföretag. Området omfattar bland annat drift, ramp- och passagerartjänst, räddning, säkerhetskontroll och luftfartsskydd. Sobona anger bara ett gemensamt antal för sina fem BÖK-områden, inte ett säkert avtalsantal för flygplatser.",
    keyFacts: {
      minimumWage:
        "Från 1 april 2026 är lägstalönen 27 441 kr/mån för Seko och 27 579 kr/mån för Transport, i båda fallen från 20 år och efter 1 års yrkeserfarenhet. AkademikerAlliansen och AKV har andra löneprocesser utan samma centrala belopp",
      overtimeRate:
        "Enkel övertid ger 1,5 timmes ledighet eller 180 % av månadslönen/165 per timme. Kvalificerad övertid ger 2 timmars ledighet eller 240 % av månadslönen/165. Arbetet ska normalt vara beordrat eller godkänt",
      obWeekday:
        "Från 1 april 2026: 34,70 kr/tim vardagar kl. 19–22. Lokala avtal kan ändra reglerna och OB betalas normalt inte samtidigt med övertidsersättning",
      obNight:
        "Från 1 april 2026: 58,70 kr/tim under avtalets vardagsnätter",
      obWeekend:
        "Från 1 april 2026: 71,10 kr/tim under avtalets helgtider",
      obHoliday:
        "Från 1 april 2026: 139,40 kr/tim under avtalets angivna storhelgstider",
      vacationDays:
        "25 dagar till och med året du fyller 39, 31 dagar från året du fyller 40 och 32 dagar från året du fyller 50. Extra ersättning kan i vissa fall ges om huvudsemestern läggs utanför juni–augusti; ett undantag gäller Seko för kontantbeloppet",
      parentalPay:
        "Efter minst 180 dagars sammanhängande anställning: 10 % av lönebortfallet i högst 180 kalenderdagar och längst tills barnet är 24 månader. För lön över avtalets gräns kan kompletterande föräldralön betalas i högst 270 dagar",
      noticePeriod:
        "För tillsvidareanställning följer uppsägningstiden normalt lagen och beror på anställningstid. En tidsbegränsad anställning kan enligt avtalet normalt sägas upp med 1 månads ömsesidig uppsägningstid. Övergångsregler kan finnas",
      pension:
        "Kommunal tjänstepension gäller enligt den pensionsplan som är tillämplig, vanligtvis AKAP-KR eller KAP-KL. I vissa företag kan en tidigare godkänd central pensionsplan ligga kvar, så rätt plan måste kontrolleras",
      workHoursPerWeek:
        "Normalt 40 timmar per helgfri vecka. Vid arbete både vardag och helg normalt 38 timmar 15 minuter, vid kontinuerligt treskift 34 timmar 20 minuter och vid intermittent treskift 36 timmar 20 minuter",
    },
    wageTable: [
      {
        role: "Seko, fyllt 20 år och 1 års yrkeserfarenhet",
        minimum: "27 441 kr/mån",
        median: "",
        comment: "Lägstalön från 1 april 2026",
      },
      {
        role: "Transport, fyllt 20 år och 1 års yrkeserfarenhet",
        minimum: "27 579 kr/mån",
        median: "",
        comment: "Lägstalön från 1 april 2026",
      },
    ],
    faq: [
      {
        question: "Gäller samma lägstalön för Seko och Transport?",
        answer:
          "Nej. Facken har varsin nivå. Båda kräver att personen fyllt 20 år och har 1 års yrkeserfarenhet.",
      },
      {
        question: "Kan jag få både OB och övertidsersättning?",
        answer:
          "Normalt inte. Avtalet har ett särskilt undantag för den som har ordinarie arbete förlagt både till vardag och helg, men exakt situation behöver kontrolleras.",
      },
      {
        question: "Finns ett generellt arbetstidskonto?",
        answer:
          "Nej. BÖK Flygplatser innehåller inte ett färdigt generellt arbetstidskonto för alla anställda.",
      },
    ],
    relatedAgreements: ["sobona-bok-vatten-miljo"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "löneavtalen §§ 1–2 samt branschbestämmelserna §§ 12, 18–19, 25, 27 och 29",
      label: "Öppna BÖK Flygplatser i original",
      url: "https://sobona.se/download/18.1eca47cd19c1c71f06dd1cfd/1770225395675/Avtal%20Flygplatser%202025.pdf",
    },
  },
  "sobona-bok-vatten-miljo": {
    summary:
      "BÖK 25 Vatten och miljö gäller hos berörda Sobona-företag inom vatten och avlopp, renhållning och återvinning. Det är ett eget branschavtal och ska inte blandas ihop med kommunernas och regionernas HÖK. Sobona anger bara ett gemensamt antal för sina fem BÖK-områden, inte ett säkert antal för denna bransch.",
    keyFacts: {
      minimumWage:
        "Från 1 april 2026 är lägstalönen 28 472 kr/mån för Kommunal och 27 658 kr/mån för Transport, i båda fallen från 20 år och efter 1 års yrkeserfarenhet. AkademikerAlliansen och AKV har andra löneprocesser utan samma centrala belopp",
      overtimeRate:
        "Enkel övertid ger 1,5 timmes ledighet eller 180 % av månadslönen/165 per timme. Kvalificerad övertid ger 2 timmars ledighet eller 240 % av månadslönen/165. Arbetet ska normalt vara beordrat eller godkänt",
      obWeekday:
        "Från 1 april 2026: 28,30 kr/tim vardagar kl. 19–22. Lokala avtal kan ändra reglerna och OB betalas normalt inte samtidigt med övertidsersättning",
      obNight:
        "Från 1 april 2026: 56,40 kr/tim under avtalets vardagsnätter",
      obWeekend:
        "Från 1 april 2026: 68,20 kr/tim under avtalets helgtider",
      obHoliday:
        "Från 1 april 2026: 135,20 kr/tim under avtalets angivna storhelgstider",
      vacationDays:
        "Huvudregeln är 25 dagar till och med året du fyller 39, 31 från året du fyller 40 och 32 från året du fyller 50. Vissa företag med äldre KFS VA/Renhållning har i stället 25 dagar och kan ha ett arbetstidskonto på 27 timmar från 2026",
      parentalPay:
        "Efter minst 180 dagars sammanhängande anställning: 10 % av lönebortfallet i högst 180 kalenderdagar och längst tills barnet är 24 månader. För lön över avtalets gräns kan kompletterande föräldralön betalas i högst 270 dagar",
      noticePeriod:
        "För tillsvidareanställning följer uppsägningstiden normalt lagen och beror på anställningstid. En tidsbegränsad anställning kan enligt avtalet normalt sägas upp med 1 månads ömsesidig uppsägningstid. Övergångsregler kan finnas",
      pension:
        "Kommunal tjänstepension gäller enligt den pensionsplan som är tillämplig, vanligtvis AKAP-KR eller KAP-KL. I vissa företag kan en tidigare godkänd central pensionsplan ligga kvar, så rätt plan måste kontrolleras",
      workHoursPerWeek:
        "Normalt 40 timmar per helgfri vecka; vissa helg- och skiftformer har kortare mått. För Kommunal och Transport inom återvinning får beräkningsperioden vara högst 6 veckor. Ett arbetstidskonto på 27 timmar gäller bara en begränsad övergångsgrupp",
    },
    wageTable: [
      {
        role: "Kommunal, fyllt 20 år och 1 års yrkeserfarenhet",
        minimum: "28 472 kr/mån",
        median: "",
        comment: "Lägstalön från 1 april 2026",
      },
      {
        role: "Transport, fyllt 20 år och 1 års yrkeserfarenhet",
        minimum: "27 658 kr/mån",
        median: "",
        comment: "Lägstalön från 1 april 2026",
      },
    ],
    faq: [
      {
        question: "Gäller samma lägstalön för Kommunal och Transport?",
        answer:
          "Nej. Facken har varsin nivå. Båda kräver att personen fyllt 20 år och har 1 års yrkeserfarenhet.",
      },
      {
        question: "Har alla ett arbetstidskonto på 27 timmar?",
        answer:
          "Nej. Det gäller bara en begränsad grupp hos vissa företag som tidigare använde KFS VA/Renhållning. Arbetsgivarens avtalsbakgrund måste kontrolleras.",
      },
      {
        question: "Kan 27 timmar bli 3 extra semesterdagar?",
        answer:
          "Bara för den berörda övergångsgruppen och efter ett lokalt avtal. Det är ingen generell rätt för alla på BÖK Vatten och miljö.",
      },
    ],
    relatedAgreements: ["sobona-bok-energi", "sobona-bok-flygplatser"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "löneavtalen §§ 1–2, branschbestämmelserna §§ 12, 18–19, 25, 27 och 29 samt övergångsreglerna om arbetstid och semester",
      label: "Öppna BÖK Vatten och miljö i original",
      url: "https://sobona.se/download/18.1eca47cd19c1c71f06dd35e9/1770226688715/Avtal%20Vatten%20och%20milj%C3%B6%202025.pdf",
    },
  },
  "friskoleavtalet-larare": {
    summary:
      "Almega Friskoleavtalet gäller lärare och studie- och yrkesvägledare inom bland annat fristående förskolor, skolor, fritidshem och uppdragsutbildning. Almega anger cirka 30 000 årsanställda medarbetare hos drygt 800 företag. Andra personalgrupper i friskolor har separata avtal och ingår inte automatiskt på den här sidan.",
    keyFacts: {
      minimumWage:
        "Avtalet har ingen central minimilön, individgaranti eller fast löneökning. Lön och löneutrymme hanteras i den lokala löneprocessen. Lönerevision sker normalt den 1 september om de lokala parterna inte väljer ett annat datum",
      overtimeRate:
        "Övertid närmast före eller efter ordinarie arbetstid ersätts med månadslönen/94 per timme eller 1,5 timmes ledighet. Övrig övertid ger månadslönen/72 eller 2 timmars ledighet. OB och övertid betalas inte samtidigt",
      obWeekday:
        "Från 1 november 2025: 26,90 kr/tim måndag–torsdag kl. 19–22. OB gäller inte för lärarens förtroendearbetstid. Nya nivåer börjar gälla 1 november 2026",
      obNight:
        "Från 1 november 2025: 54,00 kr/tim måndag–torsdag kl. 22–24 samt tisdag–fredag kl. 00–06. OB gäller inte för lärarens förtroendearbetstid",
      obWeekend:
        "Från 1 november 2025: 66,60 kr/tim under avtalets helgtider, bland annat från fredag kl. 19 till måndag kl. 07. Exakta tidsgränser finns i avtalet",
      obHoliday:
        "Från 1 november 2025: 133,30 kr/tim under avtalets angivna storhelgstider. Nya nivåer börjar gälla 1 november 2026",
      vacationDays:
        "Grundnivån är 25 semesterdagar. Extra dagar kan tillkomma när rätten till övertidsersättning avtalats bort. För ferietjänst gäller särskilda regler om ferie och ferielön",
      parentalPay:
        "Efter minst 1 års sammanhängande anställning: 120 dagar vid 1–2 års anställning, 150 dagar vid 2–3 år och 180 dagar efter minst 3 år. Ledigheten ska börja inom 18 månader från födsel eller adoption och ersättningen kan delas på högst 2 sammanhängande perioder",
      noticePeriod:
        "När arbetstagaren säger upp sig gäller 1 månad före 2 års anställning, 2 månader vid 2–6 år och 3 månader efter mer än 6 år. Arbetsgivarens tid är 1–6 månader. Vid arbetsbrist kan 1 år gälla för den som fyllt 59 år och varit anställd minst 10 år, längst till 69 års ålder",
      pension:
        "ITP gäller. Den kompletterande flexpensionspremien är 1,0 % till och med augusti 2026 och höjs till 1,3 % från 1 september 2026. Infasning hos nya avtalsföretag och möjlighet att avstå kan påverka den enskilde",
      workHoursPerWeek:
        "Semestertjänst: i genomsnitt 40 timmar per helgfri vecka. Ferietjänst: 1 807 timmar per år, varav arbetsgivaren förlägger 1 360 timmar över 194 arbetsdagar. Lokala arbetstidsavtal kan ändra grundmodellen",
    },
    faq: [
      {
        question: "Gäller avtalet all personal på en friskola?",
        answer:
          "Nej. Den här sidan gäller Sveriges Lärares avtalsområde. Kommunal, Vision och vissa akademikergrupper har separata avtal inom friskoleområdet.",
      },
      {
        question: "Finns en bestämd löneökning?",
        answer:
          "Nej. Avtalet har ingen central procentsats, individgaranti eller minimilön. Lön och löneutrymme hanteras lokalt.",
      },
      {
        question: "Har alla lärare en vanlig 40-timmarsvecka?",
        answer:
          "Nej. Semestertjänst har i genomsnitt 40 timmar per helgfri vecka. Ferietjänst har i stället ett årsarbetstidsmått på 1 807 timmar med särskilda regler för reglerad tid och förtroendearbetstid.",
      },
    ],
    relatedAgreements: ["laraavtalet"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "§§ 4–5, 8, 11 och 13 samt bilagorna om flexpension och löneavtal",
      label: "Öppna Sveriges Lärares avtalsöversikt",
      url: "https://www.sverigeslarare.se/rad-och-stod/kollektivavtal/almega/almega-friskoleavtalet/",
    },
  },
  "svenska-kyrkan-tjansteman": {
    summary:
      "Svenska kyrkans Avtal 25 för tjänstemän gäller hos medlemmar i Svenska kyrkans arbetsgivarorganisation. Det är skilt från Kommunals avtalsområde. Arbetsgivarorganisationens statistik visar 26 038 anställda totalt i Svenska kyrkan i september 2025, men publicerar ingen säker uppdelning mellan de två stora avtalsområdena.",
    keyFacts: {
      minimumWage:
        "Löneavtalet har ingen allmän central lägstalönetabell för tjänstemän. Lönen sätts individuellt och differentierat. Det totala löneutrymmet 3,0 % för 2026 gäller per arbetstagarorganisation och är inte en individuell garanti",
      overtimeRate:
        "Enkel övertid ger 1,5 timmes ledighet eller 180 % av månadslönen/165 per timme. Kvalificerad övertid ger 2 timmars ledighet eller 240 % av månadslönen/165. Arbetet ska vara beordrat eller godkänt",
      obWeekday:
        "Från 1 maj 2026: 28,49 kr/tim vardagar kl. 19–22. Lokala avtal kan ändra reglerna och OB betalas normalt inte samtidigt med övertidsersättning",
      obNight:
        "Från 1 maj 2026: 56,74 kr/tim under avtalets vardagsnätter",
      obWeekend:
        "Från 1 maj 2026: 70,30 kr/tim under avtalets helgtider",
      obHoliday:
        "Från 1 maj 2026: 140,48 kr/tim under avtalets angivna storhelgstider",
      vacationDays:
        "27 dagar till och med året du fyller 39, 31 dagar från året du fyller 40 och 32 dagar från året du fyller 50. Lokala regler om semesterväxling kan finnas",
      parentalPay:
        "Föräldrapenningtillägg kan betalas med 10 % av lönebortfallet i högst 180 kalenderdagar per födsel och längst tills barnet är 36 månader. För lön över avtalets gräns kan kompletterande föräldralön betalas i högst 270 dagar",
      noticePeriod:
        "För anställningar från 1 maj 2026 är arbetstagarens uppsägningstid 1, 2 eller 3 månader och arbetsgivarens 1, 3, 5 eller 6 månader beroende på anställningstid. Äldre anställningar har övergångsregler. Vid arbetsbrist kan 6 extra månader gälla från 55 års ålder efter minst 10 års anställning",
      pension:
        "Tjänstepensionen regleras i TPA 18. Från 1 maj 2026 tillkommer en förstärkt pensionspremie på 0,7 % av pensionsgrundande lön. Partiell nedtrappning inför pension kan sökas från 66 års ålder men prövas mot verksamhetens behov",
      workHoursPerWeek:
        "Normalt 40 timmar i genomsnitt per helgfri vecka. När arbetet ligger både på vardag och söndag eller helg är måttet också 40 timmar, men arbete på en helgdag kompenseras med ledighet en annan arbetsdag",
    },
    faq: [
      {
        question: "Vilka fack ingår på tjänstemannaområdet?",
        answer:
          "Avtalet är tecknat med Vision, Akademikerförbundet SSR och Akavia med förtecknade förbund, Kyrkans Akademikerförbund och Sveriges Lärare.",
      },
      {
        question: "Finns en central lägstalön?",
        answer:
          "Nej. Löneavtalet har ingen allmän lägstalönetabell för tjänstemän. Lönen sätts individuellt och lokalt.",
      },
      {
        question: "Hur lång är arbetsveckan vid helgarbete?",
        answer:
          "Grundmåttet är 40 timmar även när arbetet ligger både på vardag och helg, men arbete på en helgdag kompenseras med ledighet en annan arbetsdag.",
      },
      {
        question: "Hur lång är uppsägningstiden?",
        answer:
          "Det beror både på anställningstid och om anställningen började före eller från 1 maj 2026. Därför måste rätt tabell i avtalet användas.",
      },
    ],
    relatedAgreements: ["svenska-kyrkan-kommunal"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "löneavtalet §§ 2 och 6, aktuella AB §§ 13, 20–21, 27, 29, 33 och 40 samt bilagan om förstärkt pensionspremie",
      label: "Öppna Svenska kyrkans aktuella AB för tjänstemän",
      url: "https://www.skao.se/media/iddkx44a/svenska-kyrkans-ab-25_tjaenstemaen_giltig_from_1maj2026.pdf",
    },
  },
  "svenska-kyrkan-kommunal": {
    summary:
      "Svenska kyrkans Avtal 25 för Kommunals avtalsområde gäller bland annat kyrkogårdsarbetare, kyrkvaktmästare, lokalvårdare, barnskötare, måltidspersonal och fastighetsskötare. Arbetsgivarorganisationens statistik visar 26 038 anställda totalt i Svenska kyrkan i september 2025, men publicerar ingen säker uppdelning mellan avtalsområdena.",
    keyFacts: {
      minimumWage:
        "Från 1 maj 2026 är lägsta heltidslönen 26 822 kr/mån från 19 års ålder. Motsvarande timlön är 162,56 kr. 2026 års löneutrymme 922 kr per heltidsanställd medlem är ett gemensamt utrymme, inte en garanti till varje person",
      overtimeRate:
        "Enkel övertid ger 1,5 timmes ledighet eller 180 % av månadslönen/165 per timme. Kvalificerad övertid ger 2 timmars ledighet eller 240 % av månadslönen/165. Arbetet ska vara beordrat eller godkänt",
      obWeekday:
        "Från 1 maj 2026: 28,49 kr/tim vardagar kl. 19–22. Lokala avtal kan ändra reglerna och OB betalas normalt inte samtidigt med övertidsersättning",
      obNight:
        "Från 1 maj 2026: 56,74 kr/tim under avtalets vardagsnätter",
      obWeekend:
        "Från 1 maj 2026: 70,30 kr/tim under avtalets helgtider",
      obHoliday:
        "Från 1 maj 2026: 140,48 kr/tim under avtalets angivna storhelgstider",
      vacationDays:
        "27 dagar till och med året du fyller 39, 31 dagar från året du fyller 40 och 32 dagar från året du fyller 50. Semesterväxling gäller bara där en särskild lokal 40-timmarsmodell har registrerats",
      parentalPay:
        "Föräldrapenningtillägg kan betalas med 10 % av lönebortfallet i högst 180 kalenderdagar per födsel och längst tills barnet är 36 månader. För lön över avtalets gräns kan kompletterande föräldralön betalas i högst 270 dagar",
      noticePeriod:
        "För anställningar från 1 maj 2026 är arbetstagarens uppsägningstid 1, 2 eller 3 månader och arbetsgivarens 1, 3, 5 eller 6 månader beroende på anställningstid. Äldre anställningar har övergångsregler. Vid arbetsbrist kan 6 extra månader gälla från 55 års ålder efter minst 10 års anställning",
      pension:
        "Tjänstepensionen regleras i TPA 18. Från 1 maj 2026 tillkommer en förstärkt pensionspremie på 0,7 % av pensionsgrundande lön. Partiell nedtrappning inför pension kan sökas från 66 års ålder men prövas mot verksamhetens behov",
      workHoursPerWeek:
        "Grundmåttet är 40 timmar per helgfri vecka. När arbetet ligger både på vardag och söndag eller helg är huvudregeln 38 timmar 15 minuter. Ett särskilt lokalt avtal kan i stället ge 40 timmar med kompensationsledighet för helgarbete",
    },
    wageTable: [
      {
        role: "Fyllt 19 år",
        minimum: "26 822 kr/mån",
        median: "",
        comment: "Lägsta heltidslön från 1 maj 2026",
      },
      {
        role: "Fyllt 19 år, timavlönad",
        minimum: "162,56 kr/tim",
        median: "",
        comment: "Lägsta timlön från 1 maj 2026",
      },
    ],
    faq: [
      {
        question: "Är detta samma avtal som tjänstemännens kyrkoavtal?",
        answer:
          "Nej. Sedan 2022 finns ett separat avtalsområde för Kommunal och ett annat för tjänstemän inom Svenska kyrkan.",
      },
      {
        question: "Vilken är lägstalönen från 19 år?",
        answer:
          "Från 1 maj 2026 är den 26 822 kronor i månaden vid heltid eller 162,56 kronor i timmen.",
      },
      {
        question: "Är arbetsveckan alltid 40 timmar?",
        answer:
          "Nej. Den som regelbundet arbetar både vardag och söndag eller helg har normalt 38 timmar 15 minuter. Ett särskilt lokalt avtal kan i stället ge 40 timmar med kompensationsledighet.",
      },
      {
        question: "Hur lång är uppsägningstiden?",
        answer:
          "Det beror både på anställningstid och om anställningen började före eller från 1 maj 2026. Därför måste rätt tabell i avtalet användas.",
      },
    ],
    relatedAgreements: ["svenska-kyrkan-tjansteman"],
    sourceNote: {
      reviewedAt: "19 juli 2026",
      sections:
        "löneavtalet §§ 2 och 5, aktuella AB §§ 13, 20–21, 27, 29, 33 och 40 samt bilagan om förstärkt pensionspremie",
      label: "Öppna Svenska kyrkans aktuella AB för Kommunals område",
      url: "https://www.skao.se/media/3mojjuhu/svenska-kyrkans-ab-25_kommunalsavtalsomraade_giltig_from_1maj2026.pdf",
    },
  },
  telekomavtalet: {
    summary:
      "Telekom-avtalet inom TechSverige gäller hos företag som är bundna till TechSveriges avtalsområde Telekom. Det är ett medarbetaravtal som omfattar både arbetare och tjänstemän, med vissa undantag. Avtalet reglerar bland annat anställning, arbetstid, ledighet och ersättningar. Lön och flera andra detaljer kan skilja sig beroende på facklig part och lokala avtal, så arbetsplatsens egna uppgifter behöver alltid kontrolleras.",
    keyFacts: {},
    faq: [
      {
        question: "Vilka omfattas av Telekom-avtalet?",
        answer:
          "Medarbetare hos företag som är bundna till TechSveriges avtalsområde Telekom. Avtalet har vissa undantag, och den egna arbetsplatsens avtalsuppgifter behöver kontrolleras.",
      },
      {
        question: "Är Telekom-avtalet samma som IT/Tech-avtalet?",
        answer:
          "Nej. Det är två separata avtalsområden inom TechSverige. Vilket som gäller avgörs av arbetsplatsens avtalsanslutning.",
      },
      {
        question: "Gäller samma löneregler för alla?",
        answer:
          "Nej. Det finns olika löneavtal för olika fackliga parter, och lokala överenskommelser kan påverka löneprocessen.",
      },
      {
        question: "Hur vet jag om avtalet gäller mig?",
        answer:
          "Kontrollera anställningsavtalet eller intranätet, eller fråga arbetsgivaren eller den fackliga organisationen. Att arbeta med telekom räcker inte i sig.",
      },
    ],
    relatedAgreements: ["it-avtalet"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "de gemensamma anställningsvillkoren samt avtalsparternas aktuella översikter över omfattning och separata löneavtal",
      label: "Öppna Telekom-avtalets anställningsvillkor",
      url: "https://www.akavia.se/siteassets/03-rad-och-stod/kollektivavtal-privat-sektor/tech-och-it/kollektivavtal-allmanna-anstallningsvillkor---avtal-2025---techsverige-telekom.pdf",
    },
  },
  systembolagsavtalet: {
    summary:
      "Systembolagsavtalet gäller anställda i Systembolaget AB. Det centrala avtalet är tecknat av Svensk Handel med Unionen och Akademikerförbunden och gäller 1 maj 2025–30 april 2027. Avtalet reglerar bland annat anställningsvillkor och löneprocesser. Lokala avtal och särskilda regler för olika delar av verksamheten kan påverka detaljerna.",
    keyFacts: {},
    faq: [
      {
        question: "Gäller avtalet alla på Systembolaget?",
        answer:
          "Det centrala avtalet omfattar anställda i Systembolaget AB. Lönevillkoren kan skilja mellan Unionens och Akademikerförbundens löneavtal.",
      },
      {
        question: "Är löneavtalet samma för alla?",
        answer:
          "Nej. Unionen och Akademikerförbunden har separata löneavtal. Därför måste rätt fackligt avtalsområde kontrolleras innan en löneuppgift används.",
      },
      {
        question: "Är arbetstid och OB samma i hela verksamheten?",
        answer:
          "Inte alltid. Kontor, Skarpö och depå har särskilda bestämmelser, och lokala avtal kan komplettera det centrala avtalet.",
      },
    ],
    relatedAgreements: ["handelsavtalet", "handelns-tjanstemannaavtal"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "Unionens och Sveriges Ingenjörers aktuella avtalsöversikter för omfattning, parter och avtalsperiod",
      label: "Öppna Unionens aktuella avtalsöversikt",
      url: "https://www.unionen.se/kollektivavtal/svensk-handel-systembolagsanstallda",
    },
  },
  "friskoleavtalet-kommunal": {
    summary:
      "Almega Utbildning – Friskoleavtalet gäller inom privat förskola och friskola när arbetsgivaren är bunden till avtalsområdet och arbetstagaren tillhör Kommunals område. Det gäller 1 november 2025–31 oktober 2027. Samma yrke kan omfattas av andra avtal hos andra arbetsgivare, så yrkestiteln ensam räcker inte för att avgöra vilket avtal som gäller.",
    keyFacts: {
      minimumWage:
        "Från 1 maj 2026 är den fasta kontanta heltidslönen minst 23 756 kr/mån för den som fyllt 19 år och vars anställningstid överstiger 3 månader. När arbetsgivaren kräver relevant yrkesförberedande gymnasieutbildning och arbetstagaren efter utbildningen har minst 1 års sammanhängande anställning i yrket är nivån 26 164 kr/mån. För deltid proportioneras nivåerna. Från 1 maj 2027 är motsvarande heltidsnivåer 24 794 och 26 949 kr/mån",
    },
    faq: [
      {
        question: "Hur vet jag om Friskoleavtalet gäller på min arbetsplats?",
        answer:
          "Kontrollera att arbetsgivaren är bunden till Almega Utbildnings avtalsområde för friskolor och att du tillhör Kommunals avtalsområde. Yrke eller arbetsplatsens namn räcker inte ensamt.",
      },
      {
        question: "Är detta samma avtal som lärarnas Friskoleavtal?",
        answer:
          "Nej. Lärare och studie- och yrkesvägledare har ett separat avtal med Sveriges Lärare. Den här sidan gäller Kommunals avtalsområde.",
      },
      {
        question: "Är löneutrymmet en garanterad höjning för varje person?",
        answer:
          "Nej. Det anges som ett lägsta utrymme per heltidsanställd och fördelas individuellt. Det är inte samma sak som en personlig garanti.",
      },
    ],
    relatedAgreements: ["friskoleavtalet-larare", "hok-kommunal"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "Kommunals öppna avtalsbesked om omfattning, period, löneutrymme, lägstalöner och ändrade villkor samt Almegas aktuella avtalsområde",
      label: "Öppna Kommunals aktuella avtalsbesked",
      url: "https://www.kommunal.se/nyhet/avtal-klart-2025-almega-utbildning-friskoleavtalet",
    },
  },
  "apoteksavtalet-svensk-handel": {
    summary:
      "Svensk Handels avtal för apoteksanställda gäller hos företag som bland annat bedriver apoteksverksamhet med försäljning av receptbelagda läkemedel i apotek, är anslutna till Svensk Handel och finns i avtalets särskilda förteckning. Sveriges Farmaceuter och Unionen är fackliga parter. Avtalet gäller 1 maj 2025–30 april 2027 och har separata löneavtal för de två fackliga områdena. Arbetsgivarens avtalsanslutning måste därför kontrolleras innan detaljvillkor används.",
    keyFacts: {},
    faq: [
      {
        question: "Gäller avtalet alla privata apotek?",
        answer:
          "Nej. Företaget måste vara anslutet till Svensk Handel och omfattas av avtalets särskilda företagsförteckning. Kedjans namn eller yrkestiteln räcker inte som bevis.",
      },
      {
        question: "Är detta samma avtal som Almega Apoteksföretagen?",
        answer:
          "Nej. Almega Tjänsteförbunden, bransch Apotek, har ett separat kollektivavtal för anslutna företag.",
      },
      {
        question: "Har Unionen och Sveriges Farmaceuter samma löneavtal?",
        answer:
          "Nej. De allmänna villkoren är samlade i samma avtalstryck, men Unionen och Sveriges Farmaceuter har separata lönebilagor.",
      },
      {
        question: "Gäller avtalet för farmaceuter på sjukhus eller i en region?",
        answer:
          "Inte på grund av yrkestiteln. Sjukhus- och regionanställda tillhör normalt andra arbetsgivar- och avtalsområden som måste kontrolleras separat.",
      },
    ],
    relatedAgreements: ["apoteksforetagen-almega"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "§ 1.1 om avtalets omfattning, § 15 om giltighetstid samt bilagorna 5 och 6 om separata löneavtal för Unionen och Sveriges Farmaceuter",
      label: "Öppna avtalet för apoteksanställda i original",
      url: "https://www.sverigesfarmaceuter.se/globalassets/2-dokument/2-rad-och-stod/anstallning/kollektivavtal/apotek/svensk-handel/apoteksavtalet-2025-2027.pdf",
    },
  },
  "apoteksforetagen-almega": {
    summary:
      "Almega Apoteksföretagens avtal gäller tjänstemän hos företag som är anslutna till Almega Tjänsteförbunden, bransch Apotek. Sveriges Farmaceuter, Sveriges Ingenjörer och Unionen är fackliga parter. Avtalet gäller 1 maj 2025–30 april 2027. Akademikerförbunden och Unionen har separata lönebilagor, och lokala avvikelser kan finnas. Därför måste både arbetsgivarens anslutning och ditt fackliga avtalsområde kontrolleras innan detaljvillkor används.",
    keyFacts: {},
    faq: [
      {
        question: "Gäller avtalet alla apoteksföretag?",
        answer:
          "Nej. Arbetsgivaren måste vara ansluten till Almega Tjänsteförbunden, bransch Apotek, och din anställning måste ligga inom avtalets tjänstemannaområde.",
      },
      {
        question: "Är detta samma avtal som Svensk Handels apoteksavtal?",
        answer:
          "Nej. Svensk Handel – Apoteksanställda är ett separat kollektivavtal för företag inom det avtalsområdet.",
      },
      {
        question: "Har alla fackliga områden samma löneavtal?",
        answer:
          "Nej. Sveriges Farmaceuter och Sveriges Ingenjörer har en gemensam akademikerbilaga, medan Unionen har en separat lönebilaga.",
      },
      {
        question: "Hur vet jag om avtalet gäller mig?",
        answer:
          "Kontrollera med arbetsgivaren eller ditt fackförbund att företaget är anslutet till rätt Almegaområde och vilket fackligt avtalsområde din anställning tillhör.",
      },
    ],
    relatedAgreements: ["apoteksavtalet-svensk-handel"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "§ 1.1 om tillämpningsområdet, § 14 om giltighetstid samt bilagorna 2a och 2b om skilda löneavtal för akademikerförbunden och Unionen",
      label: "Öppna Almega Apoteksföretagens avtal i original",
      url: "https://www.sverigesfarmaceuter.se/globalassets/2-dokument/2-rad-och-stod/anstallning/kollektivavtal/apotek/almega/kollektivavtal-apotek-tjansteman-2025-2027-sveriges-ingenjorer-sveriges-farmaceuter-unionen-artnr-6072-2505.pdf",
    },
  },
  "journalistavtalet-dagspress": {
    summary:
      "Journalistavtalet för dagspress gäller huvudsakligen journalistiska arbetsuppgifter vid dag- och kvällstidningsföretag som omfattas av Medieföretagens avtalsområde. Svenska Journalistförbundet och Medieföretagen är parter. Avtalet gäller 1 april 2025–31 mars 2027. Arbetsgivarens avtalsanslutning och arbetsuppgifternas innehåll måste kontrolleras; yrkestiteln ensam avgör inte avtalet.",
    keyFacts: {},
    faq: [
      {
        question: "Vilka arbetsplatser kan omfattas?",
        answer:
          "Dag- och kvällstidningar inom Medieföretagens avtalsområde kan omfattas när anställningen huvudsakligen består av journalistiskt arbete.",
      },
      {
        question: "Gäller avtalet alla som arbetar på en tidning?",
        answer:
          "Nej. Andra yrkesgrupper på samma företag kan tillhöra andra kollektivavtal. Kontrollera vilket avtalsområde som står för just din anställning.",
      },
      {
        question: "Kan fotografer och redaktörer omfattas?",
        answer:
          "Ja, om arbetet huvudsakligen är journalistiskt och anställningen ligger inom dagspressavtalet. Titeln i sig är inte tillräcklig.",
      },
      {
        question: "Gäller avtalet för frilansuppdrag?",
        answer:
          "Nej, inte automatiskt. Journalistförbundet beskriver frilansuppdrag som ett separat område och har särskild vägledning för frilansare.",
      },
    ],
    relatedAgreements: [
      "journalistavtalet-public-service",
      "journalistavtalet-tidskrift",
      "journalistavtalet-etermedier",
      "journalistavtalet-bemanning",
    ],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "§ 1.1 om avtalets omfattning och § 16 om giltighetstid samt Journalistförbundets aktuella beskrivning av dagspressområdet",
      label: "Öppna Journalistavtalet för dagspress i original",
      url: "https://www.sjf.se/system/files/2025-06/Dagspress%20kollektivavtal%202025-2027.pdf",
    },
  },
  "journalistavtalet-public-service": {
    summary:
      "Journalistavtalet för Public Service är Journalistförbundets avtalsområde vid Sveriges Television, Sveriges Radio och Utbildningsradion. Originalavtalet avser medlemmar i Journalistförbundet som hör till detta fackliga avtalsområde vid företag inom Medieföretagen. Avtalet gäller 1 april 2025–31 mars 2027. Public service har även andra fackliga avtal, så arbetsplatsen ensam avgör inte vilket avtal som gäller för en person.",
    keyFacts: {},
    faq: [
      {
        question: "Vilka public service-företag avses?",
        answer:
          "Journalistförbundets aktuella avtalssida anger Sveriges Television, Sveriges Radio och Utbildningsradion.",
      },
      {
        question: "Gäller avtalet alla anställda där?",
        answer:
          "Nej. Detta är Journalistförbundets avtalsområde. Medieföretagen har också avtal med andra fackliga parter inom public service.",
      },
      {
        question: "Är detta samma avtal som Etermedieavtalet?",
        answer:
          "Nej. Etermedieavtalet gäller journalistiskt arbete inom radio och tv utanför public service, när det avtalet har kopplats in på arbetsplatsen.",
      },
      {
        question: "Hur kontrollerar jag om avtalet gäller mig?",
        answer:
          "Kontrollera ditt fackliga avtalsområde med arbetsgivaren eller Journalistförbundet. Företagets namn och yrkestiteln räcker inte alltid.",
      },
    ],
    relatedAgreements: [
      "journalistavtalet-dagspress",
      "journalistavtalet-tidskrift",
      "journalistavtalet-etermedier",
      "journalistavtalet-bemanning",
    ],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "§ 1.1 om avtalets omfattning och § 17 om giltighetstid samt Journalistförbundets aktuella beskrivning av public service-området",
      label: "Öppna Journalistavtalet för Public Service i original",
      url: "https://www.sjf.se/system/files/2025-05/Public%20service%20kollektivavtal%202025-2027.pdf",
    },
  },
  "journalistavtalet-tidskrift": {
    summary:
      "Journalistavtalet för tidskrifter gäller medarbetare med huvudsakligen journalistiska arbetsuppgifter vid tidskrifter och magasin inom Medieföretagens avtalsområde. För vissa nya medlemsföretag krävs en särskild överenskommelse innan avtalet börjar gälla. Svenska Journalistförbundet och Medieföretagen är parter och avtalsperioden är 1 april 2025–31 mars 2027.",
    keyFacts: {},
    faq: [
      {
        question: "Vilka verksamheter kan omfattas?",
        answer:
          "Tidskrifter och magasin inom Medieföretagens avtalsområde kan omfattas när anställningen huvudsakligen består av journalistiska arbetsuppgifter.",
      },
      {
        question: "Räcker det att arbetsgivaren är medlem i Medieföretagen?",
        answer:
          "Inte alltid. Journalistförbundet anger att det för vissa företag som blir nya medlemmar krävs en särskild överenskommelse innan tidskriftsavtalet kopplas in.",
      },
      {
        question: "Gäller avtalet för en förlagsredaktör?",
        answer:
          "Inte automatiskt. Förlagsarbete kan ligga under andra avtalsområden. Kontrollera både verksamheten och det exakta avtalsnamnet för anställningen.",
      },
      {
        question: "Är frilansare anställda enligt detta avtal?",
        answer:
          "Nej, inte på grund av ett frilansuppdrag. Journalistförbundet behandlar frilansavtal och arvoden separat från kollektivavtalen för anställda.",
      },
    ],
    relatedAgreements: [
      "journalistavtalet-dagspress",
      "journalistavtalet-public-service",
      "journalistavtalet-etermedier",
      "journalistavtalet-bemanning",
    ],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "§ 1.1 om avtalets omfattning och § 16 om giltighetstid samt Journalistförbundets aktuella beskrivning av tidskriftsområdet",
      label: "Öppna Journalistavtalet för tidskrifter i original",
      url: "https://www.sjf.se/system/files/2025-07/Tidskrifter%20kollektivavtal%202025-2027.pdf",
    },
  },
  "journalistavtalet-etermedier": {
    summary:
      "Journalistavtalet för etermedier gäller huvudsakligen journalistiska arbetsuppgifter inom radio och tv utanför public service vid företag inom Medieföretagen. Avtalet måste vara särskilt inkopplat för det aktuella företaget. Svenska Journalistförbundet och Medieföretagen är parter. Avtalet gäller 1 april 2025–31 mars 2027.",
    keyFacts: {},
    faq: [
      {
        question: "Vilka verksamheter kan omfattas?",
        answer:
          "Radio- och tv-företag utanför public service kan omfattas när arbetet huvudsakligen är journalistiskt och etermedieavtalet har kopplats in.",
      },
      {
        question: "Är detta avtalet för SVT, SR och UR?",
        answer:
          "Nej. Journalistförbundet har ett separat Public Service-avtal för sitt avtalsområde på de företagen.",
      },
      {
        question: "Räcker medlemskap i Medieföretagen?",
        answer:
          "Nej. Avtalet anger att en särskild överenskommelse om inkoppling krävs för medlemsföretaget.",
      },
      {
        question: "Gäller avtalet all personal på ett radio- eller tv-bolag?",
        answer:
          "Nej. Avtalet avser huvudsakligen journalistiska arbetsuppgifter. Teknisk, administrativ eller annan personal kan tillhöra andra avtal.",
      },
    ],
    relatedAgreements: [
      "journalistavtalet-dagspress",
      "journalistavtalet-public-service",
      "journalistavtalet-tidskrift",
      "journalistavtalet-bemanning",
    ],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "§ 1.1 om avtalets omfattning och inkoppling samt § 16 om giltighetstid",
      label: "Öppna Journalistavtalet för etermedier i original",
      url: "https://www.sjf.se/system/files/2025-07/Etermedier%20kollektivavtal%202025-2027.pdf",
    },
  },
  "journalistavtalet-bemanning": {
    summary:
      "Bemanningsavtalet för journalister gäller anställda journalister hos medlemsföretag i Medieföretagen som hyr ut personal och uteslutande bedriver bemanningsverksamhet. Det är ett eget journalistavtal och ska inte blandas ihop med de bredare bemanningsavtal som gäller andra yrkesgrupper. Svenska Journalistförbundet och Medieföretagen är parter. Avtalet gäller 1 april 2025–31 mars 2027.",
    keyFacts: {},
    faq: [
      {
        question: "Vilka anställningar kan omfattas?",
        answer:
          "Anställda journalister hos företag inom Medieföretagen som bedriver personaluthyrning och uteslutande är bemanningsföretag kan omfattas.",
      },
      {
        question: "Är detta samma som det vanliga Bemanningsavtalet?",
        answer:
          "Nej. Detta är Medieföretagens och Journalistförbundets särskilda avtal för bemanningsanställda journalister.",
      },
      {
        question: "Avgör kundföretaget vilket avtal jag har?",
        answer:
          "Din arbetsgivare är bemanningsföretaget, men vissa villkor påverkas av kundföretagets regler. Kontrollera därför både anställningsavtalet och placeringen med Journalistförbundet.",
      },
      {
        question: "Gäller avtalet för frilansjournalister?",
        answer:
          "Nej, inte enbart på grund av ett uppdrag. Avtalet gäller anställda journalister hos bemanningsföretag inom det angivna avtalsområdet.",
      },
      {
        question: "Gäller samma avtal hos Randstad/Mediakompetens?",
        answer:
          "Journalistförbundet anger att Mediakompetens, numera Randstad, har ett särskilt bemanningsavtal. Kontrollera därför den exakta avtalstexten med arbetsgivaren eller förbundet.",
      },
    ],
    relatedAgreements: [
      "journalistavtalet-dagspress",
      "journalistavtalet-public-service",
      "journalistavtalet-tidskrift",
      "journalistavtalet-etermedier",
    ],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "punkt 1.1 om avtalets omfattning och punkt 15 om giltighetstid",
      label: "Öppna Bemanningsavtalet för journalister i original",
      url: "https://www.sjf.se/system/files/2025-09/Bemanning%20kollektivavtal%202025-2027.pdf",
    },
  },
  "massa-pappersindustrin-pappers": {
    summary:
      "Massa- och pappersindustriavtalet är arbetaravtalet mellan Pappers och Föreningen Industriarbetsgivarna. Det gäller anställda vid företag inom massa- och pappersindustrin samt likartade eller sammanhängande delar av basindustrin. Avtalet gäller 1 april 2025–31 mars 2027 och omfattar enligt Industriarbetsgivarna drygt 11 400 arbetare. Varje arbetsplats ska ha ett lokalavtal som reglerar bland annat lön och arbetstid.",
    keyFacts: {
      minimumWage:
        "Ingen gemensam nationell lön kan anges utan arbetsplatsens lokalavtal. Löneform och lön bestäms lokalt enligt riksavtalets principer",
      workHoursPerWeek:
        "I genomsnitt högst 36 timmar vid kontinuerligt treskift, 38 timmar vid övriga angivna två- och treskiftsformer och 40 timmar vid övrigt arbete, räknat per helgfri vecka över kalenderåret",
    },
    faq: [
      {
        question: "Vilka anställda kan omfattas av avtalet?",
        answer:
          "Arbetare hos företag inom massa- och pappersindustrin och likartade eller sammanhängande delar av basindustrin kan omfattas. Arbetsgivarens avtalsanslutning och ditt avtalsområde måste alltid kontrolleras.",
      },
      {
        question: "Gäller avtalet även tjänstemän och entreprenörer?",
        answer:
          "Inte automatiskt. Bruken har separata tjänstemannaavtal, och entreprenörer eller bemanningsanställda kan omfattas av andra avtal. Fråga arbetsgivaren eller Pappers vilket avtal som gäller.",
      },
      {
        question: "Finns en nationell minimilön i avtalet?",
        answer:
          "Riksavtalet anger inte en enda lön som gäller alla. Löneform och löner bestäms lokalt och fastställs i arbetsplatsens lokalavtal.",
      },
      {
        question: "Är arbetstiden alltid 36 timmar i veckan?",
        answer:
          "Nej. Arbetstidsmåttet är 36, 38 eller 40 timmar i genomsnitt per helgfri vecka beroende på driftsform. Den exakta förläggningen och driftsformen ska framgå av lokalavtalet.",
      },
    ],
    relatedAgreements: [
      "massa-pappersindustrin-tjansteman",
      "sagverksavtalet-industriarbetsgivarna",
      "skogsavtalet-privat",
      "traindustriavtalet-tmf",
    ],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "§ 1 mom 1, § 4 A mom 1, § 5 mom 1–2, § 19 mom 1 och A mom 2–3 samt § 21; antalet arbetare mot Industriarbetsgivarnas avtalsbesked den 1 april 2025",
      label: "Öppna Massa- och pappersindustriavtalet i original",
      url: "https://www.pappers.se/sites/default/files/2026-01/kollektivavtal-25-27.pdf",
    },
  },
  "massa-pappersindustrin-tjansteman": {
    summary:
      "Massa- och pappersindustriavtalet för tjänstemän gäller vid företag inom massa- och pappersindustrin som är anslutna till Föreningen Industriarbetsgivarna. De gemensamma allmänna villkoren är tecknade med Unionen, Sveriges Ingenjörer och Ledarna och gäller 1 april 2025–31 mars 2027. Förbunden har separata löneavtal och lokala kollektivavtal kan komplettera villkoren. Avtalet är skilt från Pappers arbetaravtal.",
    keyFacts: {
      minimumWage:
        "Det finns ingen enda gemensam lägstalön som gäller för Unionen, Sveriges Ingenjörer och Ledarna. Förbunden har separata löneavtal och lönen bestäms individuellt och lokalt; kontrollera vilket fackligt avtalsområde du tillhör",
      vacationDays:
        "Huvudregeln är 25 lagstadgade semesterdagar. Per betald semesterdag är semestertillägget normalt 0,8 % av aktuell månadslön plus 0,54 % av rörliga lönedelar under intjänandeåret. En skriftlig överenskommelse kan ge fler dagar i stället för övertidsersättning",
      parentalPay:
        "Vid föräldraledighet med rätt till föräldrapenning kan föräldraersättning betalas under sammanlagt högst 6 månader, fördelade inom 24 månader från födsel eller adoption. Ersättningen beräknas med 10 % på lönedelar upp till 10 prisbasbelopp och 90 % på lönedelar däröver",
      noticePeriod:
        "När tjänstemannen säger upp sig gäller normalt 1 månad vid kortare än 3 års anställning, 2 månader vid 3–6 år och 3 månader vid mer än 6 år. Arbetsgivarens tid är normalt 1–6 månader. Lokala eller enskilda överenskommelser kan påverka",
      workHoursPerWeek:
        "I genomsnitt högst 36 timmar vid kontinuerligt treskift, 38 timmar vid intermittent treskift eller tvåskift och 40 timmar vid övrigt arbete, räknat per helgfri vecka över kalenderåret",
    },
    faq: [
      {
        question: "Vilka tjänstemän kan omfattas av avtalet?",
        answer:
          "Tjänstemän vid företag inom massa- och pappersindustrin som är anslutna till Föreningen Industriarbetsgivarna kan omfattas. Företagsledande eller jämförlig ställning är normalt undantagen om inget annat har avtalats.",
      },
      {
        question: "Är detta samma avtal som Pappers arbetaravtal?",
        answer:
          "Nej. Detta är tjänstemannaområdet för Unionen, Sveriges Ingenjörer och Ledarna. Pappers har ett separat arbetaravtal för samma industri.",
      },
      {
        question: "Har alla tre förbunden samma löneavtal?",
        answer:
          "Nej. Unionen, Sveriges Ingenjörer och Ledarna har separata löneavtal. Kontrollera därför ditt fackliga avtalsområde och arbetsplatsens lokala överenskommelser innan du använder en löneuppgift.",
      },
      {
        question: "Får alla tjänstemän samma löneökning?",
        answer:
          "Nej. Lönesättningen är individuell och lokal. Ett centralt löneutrymme eller avtalsvärde är inte en garanti för samma höjning till varje person.",
      },
      {
        question: "Är arbetstiden alltid 40 timmar i veckan?",
        answer:
          "Nej. Arbetstidsmåttet är 36, 38 eller 40 timmar i genomsnitt per helgfri vecka beroende på arbetstidsform. Lokala avtal kan påverka förläggningen.",
      },
    ],
    relatedAgreements: [
      "massa-pappersindustrin-pappers",
      "teknikavtalet-tjansteman",
    ],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "allmänna villkor §§ 1, 4 A mom 1, 8 mom 2–3, 12, 15 mom 1–3 och 17 samt avtalssamlingens separata löneavtal för Unionen, Sveriges Ingenjörer och Ledarna",
      label: "Öppna tjänstemannaavtalets allmänna villkor i original",
      url: "https://www.unionen.se/sites/default/files/files/Allm%C3%A4nna%20villkor%2C%20Partsgemensamma%20kommentarer%20MoP%202025-2027.pdf",
    },
  },
  "skogsavtalet-privat": {
    summary:
      "Skogsavtalet för arbetare gäller inom privat skogsbruk hos arbetsgivare som är bundna till Gröna arbetsgivares avtalsområde. GS-facket och Gröna arbetsgivare är parter och avtalet gäller 1 april 2025–31 mars 2027. GS anger bland annat skogsmaskinförare, skotare, skördarförare, planterare och röjare som yrken inom området. Avtalet ska inte blandas ihop med statliga VISST hos Skogsstyrelsen eller de separata avtalen för tjänstemän och virkesmätning.",
    keyFacts: {},
    faq: [
      {
        question: "Omfattas skogsmaskinförare av Skogsavtalet?",
        answer:
          "Ja, GS anger skogsmaskinförare samt skotare och skördarförare som yrken inom Skogsavtalet. Arbetsgivaren måste samtidigt vara bunden till det privata avtalsområdet.",
      },
      {
        question: "Är detta samma avtal som VISST hos Skogsstyrelsen?",
        answer:
          "Nej. VISST är ett separat statligt avtal mellan Skogsstyrelsen och GS. Den här sidan gäller privata Skogsavtalet med Gröna arbetsgivare.",
      },
      {
        question: "Gäller samma avtal för tjänstemän och virkesmätare?",
        answer:
          "Inte automatiskt. Gröna arbetsgivare redovisar separata avtalsområden för skogsbrukets tjänstemän och virkesmätning.",
      },
      {
        question: "Varför visas inga löne- eller OB-belopp?",
        answer:
          "Den aktuella fullständiga avtalsboken kräver partsinloggning. Därför visas bara uppgifter som kan styrkas öppet. Kontrollera detaljvillkor med arbetsgivaren eller GS.",
      },
    ],
    relatedAgreements: [
      "sagverksavtalet-industriarbetsgivarna",
      "traindustriavtalet-tmf",
      "skogsavtalet",
    ],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "Gröna arbetsgivares aktuella tabell över avtalsnamn, part och period samt GS:s aktuella beskrivning av yrken inom Skogsavtalet",
      label: "Öppna den officiella avtalsinformationen för skogsbruk",
      url: "https://www.grona.org/fokusfragor/avtal-2025/avtalsinformation---skogsbruk/",
    },
  },
  "sagverksavtalet-industriarbetsgivarna": {
    summary:
      "Sågverksavtalet är arbetaravtalet mellan GS-facket och Föreningen Industriarbetsgivarna inom sågverksindustrin. Den aktuella avtalsperioden är 1 april 2025–31 mars 2027. Avtalet kan vara relevant för arbete i sågverk, exempelvis i såglinje, sortering, torkning, paketering och utlastning, när arbetsgivaren är bunden till avtalet. Sågverksavtalet är separat från både privata Skogsavtalet och Träindustriavtalet.",
    keyFacts: {},
    faq: [
      {
        question: "Gäller avtalet alla som arbetar på ett sågverk?",
        answer:
          "Inte enbart på grund av arbetsplatsen eller yrkestiteln. Kontrollera att arbetsgivaren tillämpar Sågverksavtalet och att anställningen ligger inom arbetarområdet.",
      },
      {
        question: "Är detta samma avtal som Skogsavtalet?",
        answer:
          "Nej. Skogsavtalet gäller privat skogsbruk med Gröna arbetsgivare som arbetsgivarpart. Sågverksavtalet har Föreningen Industriarbetsgivarna som arbetsgivarpart.",
      },
      {
        question: "Är detta samma avtal som Träindustriavtalet?",
        answer:
          "Nej. Träindustriavtalet är ett separat avtal med Trä- och Möbelföretagen för berörd träförädlande industri.",
      },
      {
        question: "Varför visas inga detaljvillkor?",
        answer:
          "Den aktuella fullständiga arbetaravtalstexten är inte öppet tillgänglig utan partsinloggning. Därför publiceras inga löner, OB-belopp eller andra siffror här ännu.",
      },
    ],
    relatedAgreements: [
      "sagverksindustrin-tjansteman",
      "skogsavtalet-privat",
      "traindustriavtalet-tmf",
    ],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "GS:s avtalsbesked för industrin 2025 samt Industriarbetsgivarnas uppgifter om sågverksindustrin och GS som facklig motpart på arbetarområdet",
      label: "Öppna GS:s officiella avtalsbesked för industrin",
      url: "https://www.gsfacket.se/om-oss/press/nyheter/industriforhandlingarna-klara--64-procent-pa-tva-ar/",
    },
  },
  "sagverksindustrin-tjansteman": {
    summary:
      "Tjänstemannaavtalet för basindustrin och den särskilda sågverksbilagan gäller tillsammans för tjänstemän vid sågverksföretag som är anslutna till Föreningen Industriarbetsgivarna. De centrala parterna är Unionen, Sveriges Ingenjörer och Ledarna. Avtalsperioden är 1 april 2025–31 mars 2027. Förbunden har separata löneavtal, lokala avtal kan komplettera villkoren och GS har ett separat arbetaravtal.",
    keyFacts: {
      minimumWage:
        "Det finns ingen enda gemensam lägstalön för Unionen, Sveriges Ingenjörer och Ledarna. Förbunden har separata löneavtal och lönen sätts individuellt och lokalt; kontrollera vilket fackligt avtalsområde du tillhör",
      overtimeRate:
        "När särskild övertidsersättning gäller är kontantersättningen normalt månadslönen/94 per timme på helgfria vardagar kl. 06–20 och månadslönen/72 på annan tid. Efter överenskommelse kan ersättning ges som ledighet, och vissa roller kan ha avtalat bort ersättningen mot högre lön eller extra semester",
      obWeekday:
        "Ordinarie arbete kl. 17–06 på vardagar ersätts normalt med månadslönen/540 per timme, om inget annat har avtalats lokalt",
      obNight:
        "På vardagsnätter gäller normalt månadslönen/540 per timme. För kortare ordinarie veckoarbetstid än 40 timmar räknas tillägget upp enligt avtalet",
      obWeekend:
        "Från kl. 06 på lördag till kl. 06 följande vardag gäller normalt månadslönen/300 per timme, om inget annat har avtalats lokalt",
      obHoliday:
        "Under de särskilda storhelgstider som räknas upp i avtalet gäller normalt månadslönen/150 per timme. För vissa andra helgaftnar gäller månadslönen/300. Exakt tid och eventuellt lokalt avtal måste kontrolleras",
      vacationDays:
        "Huvudregeln är 25 semesterdagar. Per betald dag är semestertillägget normalt 0,8 % av aktuell månadslön plus 0,5 % av rörliga lönedelar under intjänandeåret. En överenskommelse om bortavtalad övertidsersättning kan ge tre eller fem extra dagar",
      parentalPay:
        "Efter minst ett års sammanhängande anställning kan föräldralön betalas under högst 6 månader inom 18 månader efter födsel eller adoption. Avtalet har villkor om bland annat ledighetsperiodernas längd och antal",
      noticePeriod:
        "När tjänstemannen säger upp sig gäller normalt 1 månad vid kortare än 3 års anställning, 2 månader vid 3–6 år och 3 månader vid längre anställning. Arbetsgivarens tid är normalt 1–6 månader. Särskilda regler kan påverka",
      workHoursPerWeek:
        "I sågverksindustrin högst 40 timmar i genomsnitt per helgfri vecka och kalenderår, 38 timmar vid intermittent treskift och 36 timmar vid kontinuerligt treskift eller underjordsarbete. Lokala överenskommelser kan påverka",
    },
    faq: [
      {
        question: "Vilka tjänstemän kan omfattas av avtalet?",
        answer:
          "Tjänstemän vars huvudsakliga arbetsuppgifter är tjänstemannaarbete vid sågverksföretag som är anslutna till Föreningen Industriarbetsgivarna kan omfattas. Arbetsuppgifterna, inte fackmedlemskapet i sig, avgör avtalsområdet. Företagsledande eller jämförlig ställning är normalt undantagen.",
      },
      {
        question: "Är detta samma avtal som GS Sågverksavtal?",
        answer:
          "Nej. Detta är tjänstemannaområdet för Unionen, Sveriges Ingenjörer och Ledarna. GS har ett separat arbetaravtal inom sågverksindustrin.",
      },
      {
        question: "Har alla tre förbunden samma löneavtal?",
        answer:
          "Nej. Unionen, Sveriges Ingenjörer och Ledarna har separata löneavtal. Ett centralt avtalsvärde eller löneutrymme är därför inte en garanti för samma personliga höjning till alla.",
      },
      {
        question: "Vilka lägstalöner anger Unionens löneavtal?",
        answer:
          "För en heltidsanställd som fyllt 18 år och har minst ett års sammanhängande anställning anger Unionens avtal 23 114 kronor efter 2025 års revision och 23 807 kronor efter 2026 års revision. Vid kortare anställningstid anges 21 846 respektive 22 502 kronor. Nivåerna gäller endast Unionens löneavtal och dess villkor.",
      },
      {
        question: "Är arbetstiden alltid 40 timmar i veckan?",
        answer:
          "Nej. Huvudregeln är högst 40 timmar i genomsnitt, men intermittent treskift har högst 38 timmar och kontinuerligt treskift eller underjordsarbete högst 36 timmar. Lokala avtal kan påverka förläggningen.",
      },
    ],
    relatedAgreements: [
      "sagverksavtalet-industriarbetsgivarna",
      "massa-pappersindustrin-tjansteman",
      "traindustriavtalet-tmf",
    ],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "Tjänstemän basindustrin §§ 1, 4, 6–7 och 12 samt arbetstidsavtalet § 2 mom 2.3; sågverksbilagan bilaga 1 och de separata löneavtalen för Unionen, Sveriges Ingenjörer och Ledarna",
      label: "Öppna de officiella avtalsdokumenten för sågverksindustrin",
      url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/sagverksindustrin/",
    },
  },
  "traindustriavtalet-tmf": {
    summary:
      "Träindustriavtalet är arbetaravtalet mellan GS-facket och Trä- och Möbelföretagen (TMF) för berörd träindustri hos arbetsgivare som är bundna till avtalet. Det gäller 1 april 2025–31 mars 2027. GS anger industriella trähusarbetare som ett tydligt exempel på en yrkesgrupp inom avtalet. Sågverk och stoppmöbelindustri har separata avtal och ska inte automatiskt räknas hit.",
    keyFacts: {},
    faq: [
      {
        question: "Vilka arbeten kan omfattas?",
        answer:
          "Arbete i berörd träförädlande industri kan omfattas när arbetsgivaren är bunden till Träindustriavtalet. GS anger trähusarbetare som ett tydligt exempel.",
      },
      {
        question: "Gäller avtalet för sågverksarbetare?",
        answer:
          "Inte automatiskt. Sågverksindustrin har ett separat Sågverksavtal. Kontrollera vilket avtalsnamn arbetsgivaren tillämpar.",
      },
      {
        question: "Gäller avtalet för stoppmöbeltillverkning?",
        answer:
          "Inte automatiskt. TMF och GS har ett separat Stoppmöbelindustriavtal som måste kontrolleras för den verksamheten.",
      },
      {
        question: "Varför visas inga löne- eller OB-belopp?",
        answer:
          "Den aktuella fullständiga avtalsboken finns bakom partsinloggning. Därför visas inga detaljsiffror förrän de kan kontrolleras direkt mot originalet.",
      },
    ],
    relatedAgreements: [
      "skogsavtalet-privat",
      "sagverksavtalet-industriarbetsgivarna",
    ],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "TMF:s aktuella avtalsförteckning och period samt GS:s beskrivning av trähusarbetare inom Träindustriavtalet",
      label: "Öppna TMF:s officiella sida för kollektivavtal",
      url: "https://www.tmf.se/arbetsgivarstod/alla-amnen-a-o/kollektivavtal/",
    },
  },
  "traindustrin-tjansteman-tmf": {
    summary:
      "Träindustrins tjänstemannaavtal gäller tjänstemän hos företag som är anslutna till Trä- och Möbelföretagen (TMF) inom träindustrin. De centrala parterna är Unionen, Sveriges Ingenjörer och Ledarna. Huvudavtalet gäller 1 april 2025–31 mars 2027. Förbunden har separata löneavtal, och Ledarnas löneavtal löper tills vidare. Avtalet ska inte blandas ihop med GS arbetaravtal eller det separata avtalet för stoppmöbelindustrin.",
    keyFacts: {
      overtimeRate:
        "När särskild övertidsersättning gäller är kontantersättningen normalt månadslönen/94 per timme på helgfria vardagar kl. 06–20 och månadslönen/72 på annan tid. Skriftlig överenskommelse om annan kompensation kan finnas",
      vacationDays:
        "Huvudregeln är 25 semesterdagar. Semestertillägget är normalt 0,8 % av aktuell månadslön per betald dag samt 0,5 % av rörliga lönedelar. Längre semester kan avtalas",
      parentalPay:
        "Efter minst ett års sammanhängande anställning kan föräldralön betalas i 4 månader vid 1–2 års anställning och i 6 månader efter minst 2 års anställning, enligt avtalets övriga villkor och inom 18 månader från födsel eller adoption",
      noticePeriod:
        "När tjänstemannen säger upp sig gäller normalt 1, 2 eller 3 månader beroende på anställningstid. Arbetsgivarens uppsägningstid är normalt 1–6 månader. Särskilda regler och lokala överenskommelser kan påverka",
      workHoursPerWeek:
        "Normalt högst 40 timmar i genomsnitt per helgfri vecka. Intermittent två- eller treskift har högst 38 timmar och kontinuerligt treskift eller underjordsarbete högst 36 timmar",
    },
    faq: [
      {
        question: "Vilka tjänstemän kan omfattas?",
        answer:
          "Tjänstemän hos TMF-anslutna företag inom träindustrin kan omfattas. Arbetsledare räknas som tjänstemän enligt avtalet, medan vissa företagsledande befattningar undantas.",
      },
      {
        question: "Är detta samma avtal som GS Träindustriavtal?",
        answer:
          "Nej. Detta är tjänstemannaområdet för Unionen, Sveriges Ingenjörer och Ledarna. GS har ett separat arbetaravtal inom träindustrin.",
      },
      {
        question: "Har alla tre förbunden samma löneavtal?",
        answer:
          "Nej. Lönevillkoren är partspecifika. Unionens belopp och lönepotter får därför inte användas som om de automatiskt gällde Sveriges Ingenjörer eller Ledarna.",
      },
      {
        question: "Gäller avtalet även stoppmöbelindustrin?",
        answer:
          "Inte automatiskt. Stoppmöbelindustrin har ett separat kollektivavtal. Kontrollera arbetsgivarens exakta avtalsområde.",
      },
      {
        question: "Hur fungerar arbetstidsförkortningen?",
        answer:
          "Avtalet har en ny central modell från 1 april 2025 med 8 betalda timmar per intjänandeår. Det finns också äldre regler på området, så ett enkelt totalantal ska inte användas utan kontroll av arbetsplatsens villkor.",
      },
    ],
    relatedAgreements: [
      "traindustriavtalet-tmf",
      "sagverksindustrin-tjansteman",
    ],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "§§ 1, 4, 5 mom 6, 6 mom 3, 11 och arbetstidsavtalet § 2 samt bilagan om arbetstidsförkortning; lönebilagorna har kontrollerats som partspecifika",
      label: "Öppna Träindustrins tjänstemannaavtal i original",
      url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/tmf_tra_och_mobelforetagen/?block=22169&mode=Index&resourcename=1.+Tj%C3%A4nstemannaavtal+Tr%C3%A4industri+2025+-+2027.pdf",
    },
  },
  "gruvindustrin-if-metall": {
    summary:
      "Gruvindustrins arbetaravtal gäller arbetare hos företag som är anslutna till Industriarbetsgivarnas avtalsområde för gruvindustrin. En särskild entreprenadbilaga finns för stadigvarande eller återkommande entreprenader, men en gruvarbetsplats innebär inte automatiskt att avtalet gäller. Löner, OB och övertid kan regleras lokalt. Arbetstiden skiljer sig tydligt mellan arbete under och ovan jord och mellan olika skiftformer.",
    keyFacts: {
      minimumWage:
        "För en heltidsarbetare som fyllt 18 år är den centrala lägsta månadslönen 25 786 kronor från 1 april 2026. Lokala parter bestämmer löneformer och fördelar lönepotten, så faktisk lön kan vara högre",
      overtimeRate:
        "Om lokalt avtal saknas betalas ordinarie lön och eventuellt OB plus 43,72 kronor per övertidstimme från 1 april 2026. Efter överenskommelse kan tiden i stället ersättas med lika många timmars kompensationsledighet",
      obWeekday:
        "Om lokalt avtal saknas är ersättningen månadslönen/600 per timme måndag–fredag kl. 18–24",
      obNight:
        "Om lokalt avtal saknas är ersättningen månadslönen/400 per timme måndag–lördag kl. 00–06, om inte en högre helg- eller storhelgsnivå gäller",
      obWeekend:
        "Om lokalt avtal saknas är ersättningen månadslönen/300 per timme under avtalets angivna helgtider",
      obHoliday:
        "Om lokalt avtal saknas är ersättningen månadslönen/150 per timme under avtalets angivna storhelgstider",
      vacationDays:
        "25 dagar enligt semesterlagen. Avtalet har särskilda regler för semestertillägg på fast och rörlig lön",
      parentalPay:
        "Arbetsgivaren ska ha försäkringen Föräldrapenningtillägg, FPT. Exakt rätt och ersättning följer de aktuella försäkringsvillkoren",
      noticePeriod:
        "För tillsvidareanställda från 1 november 2020 är uppsägningstiden normalt 2 månader när arbetaren säger upp sig. Från arbetsgivaren är tiden 2 månader eller längre enligt lag. Äldre anställningar följer särskilda regler",
      pension:
        "Avtalspension SAF-LO ingår. De särskilda planerna GP och Gruv-LP gäller bara arbetare och företag som uppfyller planernas villkor och omfattar inte automatiskt alla",
      workHoursPerWeek:
        "Under jord normalt 34–36 timmar per helgfri vecka beroende på skiftform. Ovan jord 35–40 timmar beroende på skiftform. Exakt schema och lokala regler måste kontrolleras",
    },
    wageTable: [
      {
        role: "Heltidsarbetare, fyllda 18 år",
        minimum: "25 786 kr/mån",
        median: "",
        comment:
          "Central lägsta månadslön från 1 april 2026; lokal lönesättning kan ge högre lön",
      },
    ],
    faq: [
      {
        question: "Vem kan omfattas?",
        answer:
          "Arbetare hos företag anslutna till Industriarbetsgivarnas avtalsområde Gruvindustrin kan omfattas. Entreprenadbilagan kan gälla vid stadigvarande eller återkommande entreprenader, men arbetsplatsen eller yrket räcker inte ensamt.",
      },
      {
        question: "Vilken är lägstalönen?",
        answer:
          "Den centrala lägsta månadslönen är 25 786 kronor från 1 april 2026 för en heltidsarbetare som fyllt 18 år. Den faktiska lönen bestäms i lokala lönesystem och kan vara högre.",
      },
      {
        question: "Hur mycket OB får jag?",
        answer:
          "Lokala regler kan gälla. Utan lokalt avtal används centrala divisorer: månadslönen/600 på vardagskväll, /400 på natt, /300 på helg och /150 på storhelg.",
      },
      {
        question: "Vad är trevalet?",
        answer:
          "Arbetare väljer normalt mellan fyra dagars arbetstidsförkortning, 2,4 procent extra pensionspremie eller 2 procent kontant ersättning. Äldre lokala beslut och Gruv-LP kan ändra eller ta bort valet.",
      },
      {
        question: "Har alla rätt till särskild gruvpension?",
        answer:
          "Nej. Avtalspension SAF-LO gäller generellt, men GP och Gruv-LP har särskilda krav på arbete, företag och intjänande.",
      },
      {
        question: "Är detta samma avtal som tjänstemannaavtalet?",
        answer:
          "Nej. Unionen, Sveriges Ingenjörer och Ledarna har ett separat tjänstemannaavtal för gruvindustrin.",
      },
    ],
    relatedAgreements: [
      "gruvindustrin-tjansteman",
      "stal-och-metall",
      "stal-metallindustrin-tjansteman",
    ],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "§§ 1, 3–9, 12, 16 och 19, bilaga 1 inklusive underbilaga 1:2, bilagorna 6–7 samt entreprenadbilagan",
      label: "Öppna Gruvindustrins arbetaravtal i original",
      url: "https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/gruvindustrin-2025-2027.pdf",
    },
  },
  "gruvindustrin-tjansteman": {
    summary:
      "Gruvindustrins tjänstemannaavtal gäller tjänstemän hos medlemsföretag inom Industriarbetsgivarnas gruvindustri. De gemensamma villkoren för basindustrin kompletteras av en särskild gruvbilaga. Unionen, Sveriges Ingenjörer och Ledarna har separata löneavtal, och vissa regler om förskjuten arbetstid skiljer sig mellan förbunden. Arbetsuppgifterna och arbetsgivarens avtalsområde – inte medlemskapet i sig – avgör vilket avtal som gäller.",
    keyFacts: {
      overtimeRate:
        "När särskild övertidsersättning gäller är kontantersättningen normalt månadslönen/94 per timme på helgfria vardagar kl. 06–20 och månadslönen/72 på annan tid. Skriftlig överenskommelse om annan kompensation kan finnas",
      vacationDays:
        "Huvudregeln är 25 semesterdagar. Tre eller fem extra dagar kan avtalas när särskild övertidsersättning ersätts med annan kompensation",
      parentalPay:
        "Efter minst ett års sammanhängande anställning kan föräldralön betalas under högst 6 månader, enligt avtalets övriga villkor och inom 18 månader från födsel eller adoption",
      noticePeriod:
        "När tjänstemannen säger upp sig gäller normalt 1, 2 eller 3 månader beroende på anställningstid. Arbetsgivarens tid är normalt 1–6 månader. Särskilda regler kan påverka",
      workHoursPerWeek:
        "Normalt högst 40 timmar i genomsnitt. Intermittent treskift har högst 38 timmar och underjordsarbete eller kontinuerligt treskift högst 36 timmar",
    },
    faq: [
      {
        question: "Vilka tjänstemän kan omfattas?",
        answer:
          "Tjänstemän hos medlemsföretag inom Industriarbetsgivarnas gruvområde kan omfattas. Arbetsuppgifterna och arbetsgivarens avtalsanslutning avgör.",
      },
      {
        question: "Är detta samma avtal som gruvarbetarnas avtal?",
        answer:
          "Nej. IF Metalls arbetaravtal för gruvindustrin är separat. Den här sidan gäller tjänstemän inom Unionens, Sveriges Ingenjörers och Ledarnas områden.",
      },
      {
        question: "Har alla tre förbunden samma löne- och OB-regler?",
        answer:
          "Nej. Löneavtalen är separata och Ledarnas arbetsledarbilaga har andra tider och beräkningssätt för förskjuten arbetstid än reglerna för Unionen och Sveriges Ingenjörer.",
      },
      {
        question: "Vad är trevalet?",
        answer:
          "Det är ett årligt val mellan ledighet, pensionspremie och kontant ersättning. Fulla nivåer är fem dagar, 3,0 procent till pension eller 2,5 procent kontant, men övergångsregler och äldre lokala val kan minska utfallet.",
      },
      {
        question: "Hur lång är arbetstiden under jord?",
        answer:
          "För underjordsarbete är måttet högst 36 timmar i genomsnitt per helgfri vecka enligt basindustrins arbetstidsavtal. Lokal förläggning måste kontrolleras.",
      },
    ],
    relatedAgreements: [
      "gruvindustrin-if-metall",
      "stal-metallindustrin-tjansteman",
      "sagverksindustrin-tjansteman",
    ],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "Tjänstemän basindustrin §§ 1, 4, 6–7 och 12 samt arbetstidsavtalet § 2; gruvbilagorna om partspecifik förskjuten arbetstid, trevalet och de separata löneavtalen",
      label: "Öppna gruvindustrins aktuella tjänstemannabilaga",
      url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/gruvornas_arbetsgivareforbund/?block=22148&mode=Index&resourcename=2.+S%C3%A4rtryck+-+avtal+och+bilagor+till+allm%C3%A4nna+anst%C3%A4llningsvillkor+Gruvindustrin+2025-04-01+-+2027-03-31.pdf",
    },
  },
  "branschavtal-energi-efa": {
    summary:
      "Branschavtal Energi är ett gemensamt medarbetaravtal mellan Energiföretagens Arbetsgivareförening (EFA) och Unionen, Sveriges Ingenjörer, Ledarna samt Seko. Det gäller 1 april 2025–31 mars 2027 för berörda anställda hos EFA-anslutna arbetsgivare och är inte uppdelat i ett arbetar- och ett tjänstemannaavtal. Förbunden har däremot olika löneavtal. Seko uppgav 2025 att deras del berör cirka 3 000 medlemmar; det är inte ett totalantal för hela avtalet.",
    keyFacts: {
      minimumWage:
        "Det finns ingen enda gemensam lägstalön för alla fyra fackliga områden. I Sekos separata lönebilaga är lägsta heltidslön för en vuxen 22 662 kronor från 1 april 2026 och 24 005 kronor efter ett års sammanhängande anställning. Andra förbund har andra löneavtal",
      vacationDays:
        "Semester följer semesterlagen. Vid en skriftlig överenskommelse där särskild övertidsersättning byts bort kan tre eller fem extra semesterdagar ingå",
      parentalPay:
        "Vid hel föräldraledighet betalas föräldraledighetstillägg under minst 6 månader när avtalets villkor är uppfyllda. Beräkningen är 10 procent upp till och 90 procent över avtalets basbeloppstak",
      workHoursPerWeek:
        "Normalt högst 40 timmar per vecka. Vissa skiftformer har 38 timmar och underjordsarbete eller kontinuerligt treskift 36 timmar. Dygnsvilan är normalt minst 11 timmar och veckovilan minst 36 timmar",
    },
    faq: [
      {
        question: "Vilka anställda kan omfattas?",
        answer:
          "Anställda hos arbetsgivare som är anslutna till EFA kan omfattas, med undantag bland annat för företagsledande ställning. Yrket räcker inte för att välja avtalet.",
      },
      {
        question: "Är detta både ett arbetar- och tjänstemannaavtal?",
        answer:
          "Det är ett gemensamt medarbetaravtal utan den uppdelningen. Unionen, Sveriges Ingenjörer, Ledarna och Seko är parter, men deras löneavtal skiljer sig åt.",
      },
      {
        question: "Vilka lägstalöner gäller för Seko-medlemmar?",
        answer:
          "Från 1 april 2026 anger Sekos bilaga 22 662 kronor per månad för en heltidsanställd vuxen och 24 005 kronor efter ett års sammanhängande anställning. Namngivna yrkesarbetare har särskilda nivåer. Beloppen gäller inte automatiskt andra fackliga områden.",
      },
      {
        question: "Hur mycket arbetstidsförkortning finns?",
        answer:
          "Den gemensamma nivån är 72 timmar per kalenderår för heltid från 2026, proportionellt för deltid. Under 2025 var nivån 70 timmar. Lokala kollektivavtal kan påverka delar av regleringen.",
      },
      {
        question: "Är detta samma avtal som Sobonas energiavtal?",
        answer:
          "Nej. Sobona BÖK Energi är ett separat avtalsområde för berörda kommunala företag. EFA-avtalet gäller arbetsgivare som är anslutna till EFA.",
      },
      {
        question: "Omfattas entreprenörer och installationsföretag?",
        answer:
          "Inte automatiskt. Installations- och entreprenadföretag kan omfattas av exempelvis Installationsavtalet eller ett annat avtalsområde. Kontrollera arbetsgivarens anslutning.",
      },
    ],
    relatedAgreements: ["sobona-bok-energi", "installationsavtalet"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "1 kap. 1–3 §§, 3 kap. 2 §, 4 kap. 8–9 §§, 8 kap. 1 §, arbetstidsbilagan 2–4 kap. och den separata Seko-lönebilagan; Sekos medlemstal mot det officiella avtalsbeskedet 2025",
      label: "Öppna Branschavtal Energi i original",
      url: "https://www.seko.se/490235/siteassets/kollektivavtal/branschavtal/energi/kollektivavtal_efa_2025-2027.pdf",
    },
  },
  "branschavtal-kommunikation": {
    summary:
      "Branschavtal Kommunikation är ett medarbetaravtal mellan Almega Tjänsteförbundens bransch Kommunikation och Seko, Fackförbundet ST, Akavia, SRAT, Sveriges Ingenjörer samt Ledarna. Det gäller 1 augusti 2025–31 juli 2027 för berörda företag inom avtalsområdet, främst bland annat PostNord och CityMail. PostNord har lokala tillägg som måste läsas tillsammans med det centrala avtalet. Området ska inte dubbelräknas som både ett generellt postavtal och ett separat PostNord-avtal.",
    keyFacts: {
      vacationDays:
        "Huvudregeln är 25 semesterdagar enligt semesterlagen. En överenskommelse om att särskild övertidskompensation inte ska betalas kan ge tre eller fem extra semesterdagar tillsammans med högre lön",
      noticePeriod:
        "När medarbetaren säger upp sig gäller normalt 1, 2 eller 3 månader beroende på anställningstid. Lokala eller enskilda överenskommelser kan påverka",
      workHoursPerWeek:
        "Ordinarie arbetstid är normalt högst 40 timmar per helgfri vecka. Vissa skift- och nattupplägg har mått på 38 eller 36 timmar. Minst 11 timmars dygnsvila och 36 timmars veckovila är huvudregler",
    },
    faq: [
      {
        question: "Vilka företag kan omfattas?",
        answer:
          "Företag inom Almega Tjänsteförbundens bransch Kommunikation kan omfattas. Seko anger att området främst finns hos PostNord och CityMail, men arbetsgivarens aktuella avtalsanslutning måste kontrolleras.",
      },
      {
        question: "Gäller samma villkor hos PostNord och CityMail?",
        answer:
          "Inte nödvändigtvis. Det centrala avtalet gäller som grund, men PostNord har en sammanslagen avtalstext med lokala tillägg. PostNord-frågor måste därför kontrolleras mot det dokumentet.",
      },
      {
        question: "Är detta ett arbetar- eller tjänstemannaavtal?",
        answer:
          "Det är ett medarbetaravtal utan den vanliga centrala uppdelningen mellan arbetare och tjänstemän. Flera fackliga parter står bakom avtalet.",
      },
      {
        question: "Hur ersätts extra arbete för deltidsanställda?",
        answer:
          "Från 1 januari 2026 tas den tidigare mertidsregeln bort och beordrat eller efterhands-godkänt arbete utöver sysselsättningsgraden hanteras enligt övertidsreglerna. Lokala regler kan påverka.",
      },
      {
        question: "Varför finns inte ett separat Postavtal och PostNord-avtal här?",
        answer:
          "De skulle i stor utsträckning beskriva samma centrala avtalsområde och riskera dubbelräkning. PostNords lokala tillägg visas i stället som en särskild originalkälla till Branschavtal Kommunikation.",
      },
    ],
    relatedAgreements: ["spartrafikavtalet", "transportavtalet"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "§§ 1, 5–8, 11 och 15–16 samt partsunderskriften; PostNords sammanslagna avtal har kontrollerats separat för de lokala tilläggen",
      label: "Öppna Branschavtal Kommunikation i original",
      url: "https://www.seko.se/4ada49/siteassets/kollektivavtal/branschavtal/kommunikation/kollektivavtal-bransch-kommunikation-2025-2027.pdf",
    },
  },
  spartrafikavtalet: {
    summary:
      "Spårtrafikavtalet är ett medarbetaravtal mellan Tågföretagen och Seko, Fackförbundet ST, Sveriges Ingenjörer samt SRAT. Det gäller 1 maj 2025–30 april 2027 för berörda företag som bedriver person- eller godstrafik på spår eller understödjer kärnverksamheten. Lokala avtal kan komplettera eller ändra delar av villkoren. Avtalet ska inte blandas ihop med Järnvägsinfrastrukturavtalet eller Sobonas trafikavtal.",
    keyFacts: {
      overtimeRate:
        "Allmän övertid får normalt tas ut med högst 200 timmar per kalenderår. Hur den ersätts och eventuella lokala regler måste kontrolleras i avtalet för arbetsplatsen",
      vacationDays:
        "Huvudregeln är 25 semesterdagar. Vid en överenskommelse om att särskild övertidskompensation inte ska betalas kan 30 dagar gälla",
      noticePeriod:
        "När medarbetaren säger upp sig gäller normalt 1, 2 eller 3 månader beroende på anställningstid. Arbetsgivarens tid är normalt 1–6 månader. Lokala eller enskilda överenskommelser kan påverka",
      workHoursPerWeek:
        "Högst 40 timmar per helgfri vecka i genomsnitt. Vid återkommande helg- eller nattarbete är måttet normalt 38 timmar, och viss oregelbunden nattjänstgöring har ett kortare mått",
    },
    faq: [
      {
        question: "Vilka verksamheter kan omfattas?",
        answer:
          "Företag inom Tågföretagens bransch Spårtrafik som kör person- eller godstrafik på spår eller understödjer kärnverksamheten kan omfattas. Arbetsgivarens anslutning måste kontrolleras.",
      },
      {
        question: "Gäller avtalet både arbetare och tjänstemän?",
        answer:
          "Avtalet är ett medarbetaravtal utan den vanliga uppdelningen mellan arbetare och tjänstemän. Flera fackliga parter står bakom avtalet.",
      },
      {
        question: "Gäller avtalet för järnvägsunderhåll?",
        answer:
          "Inte automatiskt. Järnvägsinfrastrukturavtalet är ett separat avtal för delar av underhålls- och infrastrukturarbetet. Kontrollera arbetsgivaren och avtalsnamnet.",
      },
      {
        question: "Är heltidsmåttet alltid 40 timmar?",
        answer:
          "Nej. Återkommande helg- eller nattarbete har normalt 38 timmar, och vissa upplägg med oregelbunden natt kan ha ett ännu kortare mått. Lokala arbetstidsavtal kan också påverka.",
      },
    ],
    relatedAgreements: ["vag-banavtalet-seko"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "§§ 1–2, 6–7, 11 och 15 samt avtalets partsunderskrift och giltighetsbestämmelse; PDF i lydelse från 1 januari 2026",
      label: "Öppna Spårtrafikavtalet i original",
      url: "https://www.seko.se/48db46/siteassets/kollektivavtal/branschavtal/spartrafik/spartrafikavtalet_2025-2027-2.pdf",
    },
  },
  "villkorsavtal-seko": {
    summary:
      "Villkorsavtalet mellan Arbetsgivarverket och Seko gäller berörda arbetstagare inom det statliga avtalsområdet. Det följer den nuvarande perioden för löneavtalet RALS, 1 oktober 2025–30 september 2027, och den publicerade avtalstexten är i lydelse från 1 januari 2026. Villkorsavtalet är inte själva löneavtalet. Affärsverk och de parallella avtalsområdena OFR/S,P,O och Saco-S måste kontrolleras separat.",
    keyFacts: {
      overtimeRate:
        "Enkel övertid ersätts normalt med månadslönen/94 per timme eller 1,5 timmes ledighet. Kvalificerad övertid ersätts normalt med månadslönen/72 eller 2 timmars ledighet. Allmän övertid är normalt högst 150 timmar per år",
      vacationDays:
        "28 dagar till och med året du fyller 29, 31 dagar från året du fyller 30 och 35 dagar från året du fyller 40",
      parentalPay:
        "Föräldrapenningtillägg kan betalas under högst 360 dagar när avtalets villkor är uppfyllda. Beräkningen är 10 procent under och 90 procent över avtalets basbeloppstak",
      noticePeriod:
        "När arbetstagaren säger upp sig gäller normalt 1 månad till och med ett års statlig anställning och därefter 2 månader. Arbetsgivarens tid är normalt 1 respektive 3 månader, men längre tid enligt lag kan gälla",
      workHoursPerWeek:
        "Det ordinarie heltidsmåttet är i genomsnitt 39 timmar och 45 minuter per vecka. Lokala kollektivavtal ska bland annat användas för arbetstidens förläggning",
    },
    faq: [
      {
        question: "Vilka statligt anställda kan omfattas?",
        answer:
          "Arbetstagare inom det statliga avtalsområdet som tillhör Seko-området kan omfattas, om de inte har ett annat centralt eller lokalt villkorsavtal.",
      },
      {
        question: "Är detta samma sak som löneavtalet RALS?",
        answer:
          "Nej. Villkorsavtalet reglerar anställningsvillkor. RALS är det separata ramavtalet om löner, och lokala löneprocesser måste kontrolleras där.",
      },
      {
        question: "Gäller avtalet på statliga affärsverk?",
        answer:
          "Inte automatiskt. Affärsverken har det separata Affärsverksavtalet, AVA. Kontrollera därför arbetsgivaren och det exakta avtalsnamnet.",
      },
      {
        question: "Är villkoren samma som för OFR eller Saco-S?",
        answer:
          "Nej. OFR/S,P,O och Saco-S har parallella villkorsavtal med delvis andra regler. Välj det avtalsområde som faktiskt gäller för anställningen.",
      },
    ],
    relatedAgreements: ["villkorsavtal-ofr", "villkorsavtal-saco"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "1 kap. 1 §, 2 kap. 2–2 a §§, 4 kap. 6, 18 och 20–22 §§, 5 kap. 3 §, 8 kap. 1–2 §§ samt 14 och 16 kap.; RALS-perioden mot Arbetsgivarverkets officiella ramavtal",
      label: "Öppna Villkorsavtal Arbetsgivarverket–Seko i original",
      url: "https://www.arbetsgivarverket.se/globalassets/arbetsgivarverket/avtal-och-skrifter/avtal/villkorsavtal-arbetsgivarverket---seko/villkorsavtal-seko-6.0-20260114.pdf",
    },
  },
  "stal-metallindustrin-tjansteman": {
    summary:
      "Stål- och metallindustrins tjänstemannaavtal gäller tjänstemän hos medlemsföretag inom Industriarbetsgivarnas stål- och metallindustri. De gemensamma villkoren för basindustrin kompletteras av en särskild branschbilaga. De centrala parterna är Unionen, Sveriges Ingenjörer och Ledarna, som har separata löneavtal. Arbetsuppgifterna och arbetsgivarens avtalsområde – inte medlemskapet i sig – avgör vilket avtal som gäller.",
    keyFacts: {
      overtimeRate:
        "När särskild övertidsersättning gäller är kontantersättningen normalt månadslönen/94 per timme på helgfria vardagar kl. 06–20 och månadslönen/72 på annan tid. Skriftlig överenskommelse om annan kompensation kan finnas",
      obWeekday:
        "Förskjuten ordinarie arbetstid på vardagar kl. 18–07 ersätts normalt med månadslönen/540 per timme, om inget annat har avtalats lokalt",
      obNight:
        "På vardagsnätter gäller normalt månadslönen/540 per timme. Lokala lösningar kan påverka",
      obWeekend:
        "Från lördag kl. 07 och under avtalets angivna helgtider gäller normalt månadslönen/300 per timme",
      obHoliday:
        "Under avtalets angivna storhelgstider gäller normalt månadslönen/150 per timme. Förskjuten-tid-ersättning och övertidsersättning betalas inte samtidigt",
      vacationDays:
        "Huvudregeln är 25 semesterdagar. Tre eller fem extra dagar kan avtalas när särskild övertidsersättning ersätts med annan kompensation",
      parentalPay:
        "Efter minst ett års sammanhängande anställning kan föräldralön betalas under högst 6 månader, enligt avtalets övriga villkor och inom 18 månader från födsel eller adoption",
      noticePeriod:
        "När tjänstemannen säger upp sig gäller normalt 1, 2 eller 3 månader beroende på anställningstid. Arbetsgivarens tid är normalt 1–6 månader. Särskilda regler kan påverka",
      workHoursPerWeek:
        "Normalt högst 40 timmar i genomsnitt. Intermittent treskift har högst 38 timmar och underjordsarbete eller kontinuerligt treskift högst 36 timmar. Tvåskift har särskild kompensationsledighet",
    },
    faq: [
      {
        question: "Vilka tjänstemän kan omfattas?",
        answer:
          "Tjänstemän hos medlemsföretag inom Industriarbetsgivarnas stål- och metallområde kan omfattas. Arbetsuppgifterna och arbetsgivarens avtalsanslutning avgör.",
      },
      {
        question: "Är detta samma avtal som IF Metalls arbetaravtal?",
        answer:
          "Nej. Stål- och metallindustrins arbetaravtal med IF Metall är separat. Den här sidan gäller tjänstemän inom Unionens, Sveriges Ingenjörers och Ledarnas områden.",
      },
      {
        question: "Har alla tre förbunden samma löneavtal?",
        answer:
          "Nej. Förbunden har separata löneavtal. Unionens lägstanivåer får därför inte användas som om de gällde Sveriges Ingenjörer eller Ledarna.",
      },
      {
        question: "Vad är trevalet?",
        answer:
          "Det är ett årligt val mellan ledighet, pensionspremie och kontant ersättning. Fulla nivåer är fem dagar, 3,0 procent till pension eller 2,5 procent kontant, men övergångsregler och äldre lokala val kan minska utfallet.",
      },
    ],
    relatedAgreements: [
      "stal-och-metall",
      "gruvindustrin-tjansteman",
      "sagverksindustrin-tjansteman",
    ],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "Tjänstemän basindustrin §§ 1, 4, 6–7 och 12 samt arbetstidsavtalet § 2; stål- och metallbilagorna om förskjuten arbetstid, trevalet och de separata löneavtalen",
      label: "Öppna stål- och metallindustrins aktuella branschbilaga",
      url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/stal-och-metallforbundet/?block=22152&mode=Index&resourcename=2.+S%C3%A4rtryck+-+avtal+och+bilagor+till+allm%C3%A4nna+anst%C3%A4llningsvillkor+-+St%C3%A5l+och+Metall+2025-04-01+-+2027-03-31.pdf",
    },
  },
  "besoksnaringens-tjanstemannaavtal": {
    summary:
      "Besöksnäringens tjänstemannaavtal är avtalet mellan Visita och Unionen för berörda tjänstemän hos Visita-anslutna företag. Det gäller 1 juni 2025–31 maj 2027. Vissa högsta chefsbefattningar är undantagna. Avtalet ska inte blandas ihop med Gröna riksavtalet för arbetare, och uppgifter om hur många det arbetaravtalet omfattar får inte användas för tjänstemannaavtalet.",
    keyFacts: {
      minimumWage:
        "För en heltidsanställd som fyllt 20 år är lägsta månadslönen 23 657 kronor 1 juni 2025–31 maj 2026 och 24 296 kronor 1 juni 2026–31 maj 2027, när avtalets villkor är uppfyllda",
      obWeekday:
        "Ordinarie OB är 26,68 kronor per timme från 1 juni 2025 och 27,48 kronor från 1 juni 2026. Exakta tider och undantag måste kontrolleras i avtalet",
      obNight:
        "Natt-OB betalas utöver ordinarie OB med 23,50 kronor per timme från 1 juni 2025 och 24,21 kronor från 1 juni 2026. Stadigvarande nattpersonal i hotellreception har ett särskilt undantag",
      parentalPay:
        "Efter minst ett års sammanhängande anställning kan föräldralön betalas i 2–6 månader beroende på anställningstid, enligt avtalets övriga villkor och inom 18 månader från födsel eller adoption",
      noticePeriod:
        "När tjänstemannen säger upp sig är tiden normalt 1, 2 eller 3 månader beroende på anställningstid. Från minst 6 års anställning är huvudregeln 3 månader. Individuell överenskommelse kan ange längre tid",
    },
    faq: [
      {
        question: "Vilka tjänstemän kan omfattas?",
        answer:
          "Berörda tjänstemän hos företag som är anslutna till Visita kan omfattas. Företagsledande befattningar och chefen för en verksamhetsgren, exempelvis viss hotelldirektör, kan vara undantagna.",
      },
      {
        question: "Får alla 3,0 eller 2,7 procent högre lön?",
        answer:
          "Nej. Procentsatserna beskriver lönepotten som fördelas individuellt. Avtalet anger i stället särskilda lägsta höjningsbelopp när villkoren är uppfyllda.",
      },
      {
        question: "Hur mycket arbetstidsförkortning finns?",
        answer:
          "Utgångsnivån är 4 timmar per kalenderår, 8 timmar från 2026 och 12 timmar från 2027. Deltid proportioneras och lokala avsteg kan finnas.",
      },
      {
        question: "Är detta samma som Gröna riksavtalet?",
        answer:
          "Nej. Gröna riksavtalet med HRF är arbetaravtalet. Den här sidan gäller tjänstemannaavtalet mellan Visita och Unionen.",
      },
    ],
    relatedAgreements: ["hotell-restaurang"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "§§ 1, 7, 10–11, 18, 21–22 samt löneavtalet och Visitas Avtalsextra 2025; belopp och datum har hämtats från originaldokumenten när webbsidan avviker",
      label: "Öppna Besöksnäringens tjänstemannaavtal i original",
      url: "https://visita.se/app/uploads/2025/07/Visita-Unionen-2025-2027.pdf",
    },
  },
  "ikem-tjanstemannaavtal": {
    summary:
      "IKEM:s tjänstemannaavtal gäller tjänstemän hos företag som är anslutna till IKEM:s avtalsområde. De centrala parterna är Unionen, Sveriges Ingenjörer, Naturvetarna och Ledarna. De gemensamma villkoren gäller 1 april 2025–31 mars 2027, men förbunden har separata löneavtal. En procentsats eller löneuppgift för ett förbund får därför inte användas som om den gällde alla tjänstemän.",
    keyFacts: {
      overtimeRate:
        "Övertid ska normalt vara beordrad i förväg eller godkänd i efterhand. Ersättning kan ges som pengar eller ledighet. En skriftlig överenskommelse kan i vissa fall ersätta särskild övertidsersättning med högre lön eller längre semester",
      parentalPay:
        "Efter minst 1, 2 eller 3 års sammanhängande anställning kan föräldraledighetstillägg betalas under högst 42, 84 respektive 126 arbetsdagar, enligt avtalets övriga villkor och inom 18 månader från barnets födelse eller från erhållen vårdnad vid adoption",
      noticePeriod:
        "När tjänstemannen säger upp sig gäller normalt 1 månad vid kortare än 2 års anställning, 2 månader vid 2–6 år och 3 månader efter minst 6 år. Andra regler eller överenskommelser kan påverka",
    },
    faq: [
      {
        question: "Vilka tjänstemän kan omfattas?",
        answer:
          "Tjänstemän hos IKEM-anslutna företag kan omfattas när rätt avtalsområde gäller. Vissa företagsledande befattningar och bisysslor är undantagna.",
      },
      {
        question: "Har alla förbunden samma löneavtal?",
        answer:
          "Nej. Unionen, Sveriges Ingenjörer och Naturvetarna samt Ledarna har partspecifika löneavtal. Ett centralt utrymme är inte heller automatiskt en garanterad individuell höjning.",
      },
      {
        question: "Hur fungerar arbetstidskontot?",
        answer:
          "Avsättningen motsvarade 2,0 procent eller 4 dagar vid utgången av mars 2025 och höjdes till 2,5 procent eller 5 dagar från utgången av mars 2026. Valet kan normalt vara ledighet, pensionspremie eller pengar, men lokala lösningar kan finnas.",
      },
      {
        question: "Är detta samma avtal som IF Metalls kemiavtal?",
        answer:
          "Nej. Detta är tjänstemannaavtalet. Arbetare inom närliggande verksamheter kan omfattas av exempelvis I-avtalet, Gemensamma metall eller avtalet för kemiska fabriker.",
      },
    ],
    relatedAgreements: [
      "i-avtalet",
      "gemensamma-metall",
      "kemiskt-avtal-ifmetall",
      "glasavtalet-industri",
    ],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "§§ 1–2, 5, 10–11 och bilagan om arbetstidsförkortning samt de separata löneavtalen för förbunden",
      label: "Öppna IKEM:s tjänstemannaavtal i original",
      url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/innovations-kemiindustrierna/?block=22150&mode=Index&resourcename=1.+IKEM-avtalet+1+april+2025+-+31+mars+2027.pdf",
    },
  },
  "livsmedelsindustrin-tjanstemannaavtal": {
    summary:
      "Livsmedelsindustrins tjänstemannaavtal gäller tjänstemän hos företag som är anslutna till Livsmedelsföretagen. De centrala parterna är Unionen, Sveriges Ingenjörer och Ledarna och avtalsperioden är 1 april 2025–31 mars 2027. Förbunden har separata löneavtal. Det finns äldre lönebilagor bland de länkade dokumenten hos en part; sådana äldre belopp och procentsatser används inte här.",
    keyFacts: {
      parentalPay:
        "Efter minst ett års sammanhängande anställning kan föräldralön betalas under högst 6 månader, enligt avtalets övriga villkor och inom 18 månader från födsel eller adoption",
      noticePeriod:
        "När tjänstemannen säger upp sig gäller normalt 1 månad vid kortare än 2 års anställning, 2 månader vid 2–6 år och 3 månader efter minst 6 år. Andra regler eller överenskommelser kan påverka",
    },
    faq: [
      {
        question: "Vilka tjänstemän kan omfattas?",
        answer:
          "Tjänstemän hos medlemsföretag inom Livsmedelsföretagens avtalsområde kan omfattas. Vissa företagsledande befattningar och bisysslor är undantagna.",
      },
      {
        question: "Är detta samma avtal som Livsmedelsavtalet för arbetare?",
        answer:
          "Nej. Livsmedelsavtalet med Livs är arbetaravtalet. Den här sidan gäller tjänstemannaområdet för Unionen, Sveriges Ingenjörer och Ledarna.",
      },
      {
        question: "Hur fungerar arbetstidskontot?",
        answer:
          "För intjänandeåret från april 2025 avsätts 2,5 procent, vilket motsvarar 5 lediga dagar följande uttagsår. Valet kan vara ledighet, pension eller pengar och lokala avvikelser kan finnas.",
      },
      {
        question: "Får alla samma löneökning?",
        answer:
          "Nej. Löneavtalen är olika för förbunden och lönen sätts enligt respektive process. Äldre lönebilagor ska inte användas för den nuvarande perioden.",
      },
    ],
    relatedAgreements: ["livsmedelsavtalet"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "§§ 1, 9 och 12 samt den partsgemensamma kommentaren om arbetstidskonto 2025–2027; aktuella löneuppgifter har avgränsats från äldre bilagor",
      label: "Öppna Livsmedelsindustrins tjänstemannaavtal i original",
      url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/livsmedelsforetagen/?block=22168&mode=Index&resourcename=1.+Tj%C3%A4nstemaannaavtalet-i-livsmedelsindustrin-2025-2027.pdf",
    },
  },
  "byggforetagen-tjanstemannaavtal": {
    summary:
      "Byggföretagens tjänstemannaavtal gäller tjänstemän hos företag som är anslutna till Byggföretagen. Arbetsledare räknas uttryckligen som tjänstemän. De centrala parterna är Unionen, Sveriges Ingenjörer och Ledarna och avtalet gäller 1 april 2025–31 mars 2027. Byggföretagen uppgav i maj 2025 att avtalet berör cirka 42 000 tjänstemän. Det ska inte blandas ihop med Byggavtalet för arbetare, och förbundens löneavtal kan skilja sig åt.",
    keyFacts: {
      parentalPay:
        "Efter minst ett års sammanhängande anställning kan föräldralön betalas under högst 6 månader och högst två sammanhängande ledighetsperioder, enligt avtalets övriga villkor och inom 18 månader från födsel eller adoption",
      noticePeriod:
        "När tjänstemannen säger upp sig gäller normalt 1 månad vid kortare än 3 års anställning, 2 månader vid 3–6 år och 3 månader efter minst 6 år. Arbetsgivarens tid är normalt 1–6 månader. Särskilda regler kan påverka",
    },
    faq: [
      {
        question: "Vilka tjänstemän kan omfattas?",
        answer:
          "Tjänstemän hos företag som är anslutna till Byggföretagens avtalsområde kan omfattas. Arbetsledare räknas som tjänstemän, medan vissa företagsledande befattningar är undantagna.",
      },
      {
        question: "Är detta samma avtal som Byggavtalet?",
        answer:
          "Nej. Byggavtalet är ett arbetaravtal med Byggnads. Den här sidan gäller tjänstemannaområdet för Unionen, Sveriges Ingenjörer och Ledarna.",
      },
      {
        question: "Hur många dagar arbetstidsförkortning finns?",
        answer:
          "Om lokala parter inte har valt en annan lösning är nivån 5 dagar för perioden från april 2025 och 6 dagar från uttagsåret som börjar i april 2026. Förläggningen styrs av avtalets regler.",
      },
      {
        question: "Har alla tjänstemän en garanterad löneprocent?",
        answer:
          "Nej. Löneavtalen är partspecifika. Sveriges Ingenjörer och Ledarna har processavtal utan centralt bestämd individuell procentsats, medan Unionen har ett pottlöneavtal.",
      },
    ],
    relatedAgreements: ["byggavtalet"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "§§ 1–2, 6 och 12 samt bilaga 4 om arbetstidsförkortning, 2025 års officiella förändringsblad och Byggföretagens avtalsbesked den 16 maj 2025",
      label: "Öppna Byggföretagens tjänstemannaavtal i original",
      url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/byggforetagen/?block=22154&mode=Index&resourcename=1.+Tj%C3%A4nstemannaavtalet+-+Byggf%C3%B6retagen+2025+-+2027.pdf",
    },
  },
  innovationsavtalet: {
    summary:
      "Innovationsavtalet gäller tjänstemän hos arbetsgivare som är bundna till Innovationsföretagens avtalsområde. Området har separata överenskommelser med Unionen, Sveriges Ingenjörer och Sveriges Arkitekter för perioden 1 april 2025–31 mars 2027. Lokala överenskommelser kan komplettera de centrala avtalen, så arbetsplatsens avtalsanslutning och ditt fackliga avtalsområde måste kontrolleras innan detaljvillkor används.",
    keyFacts: {},
    faq: [
      {
        question: "Vilka arbetsplatser kan omfattas?",
        answer:
          "Arbetsgivare som är bundna till Innovationsföretagens kollektivavtal kan omfattas. Kontrollera arbetsgivarens avtalsanslutning, eftersom yrkestiteln ensam inte avgör vilket avtal som gäller.",
      },
      {
        question: "Är detta samma avtal som IT-avtalet?",
        answer:
          "Nej. Innovationsavtalet och IT-avtalet är olika kollektivavtal med olika arbetsgivarområden. Ett konsult- eller teknikyrke räcker därför inte för att välja mellan dem.",
      },
      {
        question: "Kan lokala avtal påverka villkoren?",
        answer:
          "Ja. Lokala överenskommelser kan komplettera det centrala avtalet. Kontrollera därför både central avtalstext och eventuella lokala villkor.",
      },
      {
        question: "Hur vet jag om avtalet gäller mig?",
        answer:
          "Fråga arbetsgivaren eller den lokala fackliga organisationen vilket kollektivavtal och vilket fackligt avtalsområde som gäller för din anställning.",
      },
    ],
    relatedAgreements: ["it-avtalet", "grona-avtalet"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "de officiella källornas uppgifter om parter, giltighetstid, tillämpningsområde och lokala överenskommelser",
      label: "Öppna Innovationsavtalet i original",
      url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/innovationsforetagen/?block=22162&mode=Index&resourcename=3.+Kollektivavtal+Allm%C3%A4nna+anst%C3%A4llningsvillkor++-+Avtal+2025+-+Innovationsf%C3%B6retagen+-+20250401.pdf",
    },
  },
  "grona-avtalet": {
    summary:
      "Gröna avtalet är tjänstemannaavtalet för berörda företag inom Almega Tjänsteföretagen och Medieföretagen. Det gäller 1 maj 2025–30 april 2027 och är tecknat med Unionen och Akademikerförbunden. Avtalet gäller inte automatiskt bara för att arbetsgivaren är medlem i en arbetsgivarorganisation; företaget måste omfattas av rätt avtalsområde och avtalet måste ha satts i kraft för arbetsplatsen.",
    keyFacts: {},
    faq: [
      {
        question: "Varför kallas det Gröna avtalet?",
        answer:
          "Det är det etablerade kortnamnet på tjänstemannaavtalet för berörda företag inom Tjänsteföretagen och Medieföretagen.",
      },
      {
        question: "Gäller avtalet automatiskt för alla medlemsföretag?",
        answer:
          "Nej. Arbetsgivaren måste höra till rätt avtalsområde och avtalet måste ha satts i kraft för arbetsplatsen enligt avtalets regler.",
      },
      {
        question: "Är detta samma som Journalistavtalet?",
        answer:
          "Nej. Journalistavtalen är separata avtal. Arbetsplats, arbetsuppgifter och fackligt avtalsområde avgör vilket avtal som ska kontrolleras.",
      },
      {
        question: "Gäller Gröna avtalet alla konsulter?",
        answer:
          "Nej. Konsulter kan omfattas av flera olika kollektivavtal. Kontrollera vilket avtal arbetsgivaren faktiskt är bunden till.",
      },
    ],
    relatedAgreements: ["innovationsavtalet", "it-avtalet"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "avtalets uppgifter om parter, giltighetstid och vilka företag som omfattas samt kravet på att avtalet sätts i kraft för arbetsplatsen",
      label: "Öppna Gröna avtalet i original",
      url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/tjansteforetagen_och_medieforetagen/?block=22171&mode=Index&resourcename=1.+Kollektivavtal+-+Avtal+2025+-+Medief%C3%B6retagen+Tj%C3%A4nstef%C3%B6retagen+gr%C3%B6na+avtalet+-+20250501.pdf",
    },
  },
  "forsakringsavtalet-forena": {
    summary:
      "Försäkringsavtalet mellan FAO och Forena gäller tjänstemän hos försäkringsföretag som är anslutna till avtalsområdet, med de undantag som anges i avtalet. Avtalsperioden är 1 april 2025–31 mars 2027. Arbetsgivarens avtalsanslutning och vilket fackligt avtalsområde du tillhör måste kontrolleras innan detaljvillkor används.",
    keyFacts: {},
    faq: [
      {
        question: "Är detta samma avtal som FAO:s avtal med Saco-förbunden?",
        answer:
          "Nej. FAO–Forena och FAO–Saco är separata kollektivavtal. Kontrollera vilket fackligt avtalsområde din anställning tillhör.",
      },
      {
        question: "Vilka arbetsplatser kan omfattas?",
        answer:
          "Försäkringsföretag som är anslutna till FAO:s aktuella avtalsområde kan omfattas. Det finns också undantag i avtalet, så arbetsplatsen måste bekräfta vilket avtal som gäller.",
      },
      {
        question: "Gäller samma villkor på alla arbetsplatser?",
        answer:
          "Inte alltid. Lokala överenskommelser och din situation kan påverka villkoren. Använd originalavtalet tillsammans med arbetsplatsens besked.",
      },
      {
        question: "Hur vet jag om avtalet gäller mig?",
        answer:
          "Kontrollera med arbetsgivaren eller Forenas lokala företrädare att företaget omfattas av FAO–Forena och att din anställning ligger inom avtalets område.",
      },
    ],
    relatedAgreements: ["forsakringsavtalet-saco"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "avtalets uppgifter om parter, giltighetstid, tillämpningsområde och angivna undantag",
      label: "Öppna Försäkringsavtalet FAO–Forena i original",
      url: "https://www.forena.se/media/sfjdzp4p/kollektivavtalfaoforena2025-2027.pdf",
    },
  },
  "forsakringsavtalet-saco": {
    summary:
      "Försäkringsavtalet mellan FAO, Akavia och Sveriges Ingenjörer gäller berörda tjänstemän hos FAO-anslutna försäkringsföretag inom dessa förbunds avtalsområden. Avtalet gäller 1 april 2025–31 mars 2027. Arbetsplatsens avtalsanslutning och ditt fackliga avtalsområde måste bekräftas innan detaljvillkor används.",
    keyFacts: {},
    faq: [
      {
        question: "Är detta samma avtal som FAO:s avtal med Forena?",
        answer:
          "Nej. Det här avtalet är tecknat med Akavia och Sveriges Ingenjörer. FAO–Forena är ett separat kollektivavtal.",
      },
      {
        question: "Vilka fackliga parter har tecknat avtalet?",
        answer:
          "Akavia och Sveriges Ingenjörer har tecknat avtalet med FAO på arbetstagarsidan.",
      },
      {
        question: "Kan lokala överenskommelser påverka villkoren?",
        answer:
          "Ja. Kontrollera både det centrala avtalet och eventuella lokala överenskommelser på arbetsplatsen.",
      },
      {
        question: "Hur vet jag om avtalet gäller mig?",
        answer:
          "Kontrollera med arbetsgivaren eller ditt Saco-förbund vilket avtal och avtalsområde som gäller för din anställning.",
      },
    ],
    relatedAgreements: ["forsakringsavtalet-forena"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "de officiella källornas uppgifter om parter, giltighetstid och avtalets tillämpningsområde",
      label: "Öppna Försäkringsavtalet för Akavia och Sveriges Ingenjörer i original",
      url: "https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/forsakringsbranschen/?block=22191&mode=Index&resourcename=3.+Kollektivavtal+-+Avtal+2025+-+F%C3%B6rs%C3%A4kringsbranschens+arbetsgivareorganisation+FAO+-+20250401+-+20270331.pdf",
    },
  },
  "bevaknings-sakerhetsavtalet": {
    summary:
      "Bevaknings- och säkerhetsavtalet är tecknat mellan Svenska Transportarbetareförbundet och Almega Säkerhetsföretagen för perioden 1 juni 2025–31 maj 2027. Det kan omfatta bland annat väktare, skyddsvakter, ordningsvakter, operatörer och parkeringsvakter hos arbetsgivare som är bundna till avtalet. Yrket eller titeln ensam visar inte att avtalet gäller.",
    keyFacts: {},
    faq: [
      {
        question: "Vilka yrken kan omfattas?",
        answer:
          "Bland annat väktare, skyddsvakter, ordningsvakter, operatörer och parkeringsvakter kan omfattas när arbetsgivaren är bunden till avtalet.",
      },
      {
        question: "Räcker det att jag arbetar som väktare?",
        answer:
          "Nej. Du behöver också kontrollera att arbetsgivaren är bunden till Bevaknings- och säkerhetsavtalet.",
      },
      {
        question: "Gäller avtalet all säkerhetspersonal?",
        answer:
          "Nej. Säkerhetsarbete hos exempelvis staten, en kommun eller ett företag med ett annat avtalsområde kan omfattas av ett annat kollektivavtal.",
      },
      {
        question: "Var hittar jag lön och andra detaljvillkor?",
        answer:
          "Detaljvillkor visas först när de har kontrollerats mot en tillgänglig aktuell avtalstext. Kontakta tills vidare Transport eller arbetsgivaren för ett säkert besked.",
      },
    ],
    relatedAgreements: ["transportavtalet"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "parternas officiella avtalsbesked om parter, period och berörda yrkesgrupper; fullständig aktuell avtalstext är inte öppet publicerad",
      label: "Öppna Transports aktuella avtalsbesked",
      url: "https://www.transport.se/publicerat/avtal-klart-bevaknings-och-sakerhetsavtalet-2025",
    },
  },
  "fastigheter-arbetare-almega": {
    summary:
      "Fastighetsavtalet för arbetare är tecknat mellan Almega Tjänsteförbunden, bransch Fastighetsarbetsgivarna, och Fastighetsanställdas Förbund. Det gäller fastighetsarbete hos arbetsgivare som är bundna till avtalet under perioden 1 april 2025–31 mars 2027. Det är ett annat avtal än tjänstemannaavtalet inom samma arbetsgivarområde.",
    keyFacts: {},
    faq: [
      {
        question: "Är detta samma som Fastighetsavtalet för tjänstemän?",
        answer:
          "Nej. Det här avtalet gäller arbetarområdet. Tjänstemän hos Almega Fastighetsarbetsgivarna har ett separat kollektivavtal.",
      },
      {
        question: "Vilka arbetsuppgifter kan omfattas?",
        answer:
          "Fastighetsarbete hos en arbetsgivare som är bunden till avtalet kan omfattas. Arbetsuppgift, anställningskategori och arbetsgivarens avtalsanslutning måste kontrolleras tillsammans.",
      },
      {
        question: "Är detta samma som Fastigos F-avtal?",
        answer:
          "Nej. F-avtalet är ett separat kollektivavtal med Fastigo på arbetsgivarsidan.",
      },
      {
        question: "Hur vet jag om avtalet gäller mig?",
        answer:
          "Fråga arbetsgivaren eller Fastighets lokala företrädare vilket fastighetsavtal och vilken anställningskategori som gäller på arbetsplatsen.",
      },
    ],
    relatedAgreements: ["fastighetsavtalet", "f-avtalet-fastigo"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "avtalets uppgifter om parter, giltighetstid och tillämpningsområde samt skillnaden mot tjänstemannaområdet",
      label: "Öppna Fastighetsavtalet för arbetare i original",
      url: "https://www.fastighets.se/49a08c/contentassets/3e30983e855d4780adef9611b4d62256/kollektivavtal-almega-fastigheter-2025-2027-fastighetsanstalldas-forbund-artnr-6554-2504.pdf",
    },
  },
  "f-avtalet-fastigo": {
    summary:
      "F-avtalet är tecknat mellan Fastigo och Fastighetsanställdas Förbund för fastighetsarbete hos anslutna privata, kommunala och kooperativa fastighetsföretag samt berörda entreprenadföretag. Avtalet gäller 1 april 2025–31 mars 2027. Ägarformen eller yrkestiteln ensam avgör inte om F-avtalet gäller på arbetsplatsen.",
    keyFacts: {},
    faq: [
      {
        question: "Är F-avtalet samma som Almegas fastighetsavtal?",
        answer:
          "Nej. F-avtalet har Fastigo som arbetsgivarpart. Almega Fastighetsarbetsgivarna har ett separat arbetaravtal med Fastighets.",
      },
      {
        question: "Avgör det om arbetsgivaren är privat eller kommunal?",
        answer:
          "Nej. F-avtalet kan finnas hos både privata, kommunala och kooperativa fastighetsföretag. Den faktiska avtalsanslutningen måste kontrolleras.",
      },
      {
        question: "Vilka arbetsuppgifter kan omfattas?",
        answer:
          "Fastighetsarbete och berört entreprenadarbete kan omfattas när arbetsgivaren är ansluten till F-avtalet. Kontrollera din anställningskategori och arbetsplatsens avtal.",
      },
      {
        question: "Hur vet jag om F-avtalet gäller mig?",
        answer:
          "Fråga arbetsgivaren eller Fastighets lokala företrädare om arbetsplatsen är bunden till F-avtalet och om din anställning ligger inom dess område.",
      },
    ],
    relatedAgreements: ["fastigheter-arbetare-almega", "sobona-bok-fastigheter"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "avtalets uppgifter om parter, giltighetstid, berörda verksamheter och tillämpningsområde",
      label: "Öppna F-avtalet i original",
      url: "https://www.fastighets.se/49b36f/contentassets/63ff67138286461ebbe8e9921b86aaf5/f-avtal-2025.pdf",
    },
  },
  "kompetensforetagen-tjansteman": {
    summary:
      "Kompetensföretagens avtal för tjänstemän gäller hos arbetsgivare som är bundna till avtalet. Det skiljer mellan uppdragskonsulter med varierande kunduppdrag, projekt- eller entreprenadtjänstemän med fast kundarbetsplats och interna tjänstemän. Unionen och Akademikerförbunden har olika löneavtal. Därför måste både anställningstyp, fackligt avtalsområde och arbetsgivarens avtalsanslutning kontrolleras innan detaljer används.",
    keyFacts: {},
    faq: [
      {
        question: "Är detta samma som LO:s Bemanningsavtal?",
        answer:
          "Nej. Det här är tjänstemannaavtalet med Unionen och Akademikerförbunden. Bemanningsavtalet är ett separat avtal för arbetare med LO-förbunden.",
      },
      {
        question: "Vilka typer av tjänstemän skiljer avtalet mellan?",
        answer:
          "Avtalet skiljer mellan uppdragskonsulter, projekt- eller entreprenadtjänstemän och interna tjänstemän. Villkoren kan därför inte avgöras enbart från ordet tjänsteman.",
      },
      {
        question: "Gäller samma löneregler för Unionen och Akademikerförbunden?",
        answer:
          "Nej. Förbunden har separata löneavtal. Kontrollera vilket fackligt avtalsområde du tillhör innan du använder en löneuppgift.",
      },
      {
        question: "Hur vet jag om avtalet gäller mig?",
        answer:
          "Kontrollera att bemanningsföretaget är bundet till Kompetensföretagens tjänstemannaavtal och vilken tjänstemannakategori och facklig part du tillhör.",
      },
    ],
    relatedAgreements: ["bemanningsavtalet"],
    sourceNote: {
      reviewedAt: "20 juli 2026",
      sections:
        "de allmänna villkorens § 1 om omfattning och kategorier samt avtalsparternas separata löneavtal",
      label: "Öppna tjänstemannaavtalet i original",
      url: "https://www.kompetensforetagen.se/app/uploads/sites/5/2025/11/Kollektivavtal-Kompetensforetagen-tjansteman-2025-2027-artnr-6512-2506.pdf",
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
