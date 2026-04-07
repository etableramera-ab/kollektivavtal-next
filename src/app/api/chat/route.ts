import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { getAgreementBySlug } from "@/data/agreements";
import { getTruncatedAgreementText } from "@/lib/agreement-text-loader";
import { isVerifiedAgreement } from "@/lib/verified-agreements";

// Kommun/region agreements that should also include AB text
const KOMMUN_AGREEMENTS_NEEDING_AB = [
  "hok-kommunal", "hok-vision", "sjukskoterska-avtal", "laraavtalet",
  "lakare-kommun", "hok-akademiker", "raddningstjanst-avtal",
  "socialtjanst-avtal", "biblioteksavtalet", "kulturarbetaravtalet",
  "parkavtalet", "renhallningsavtalet", "vattenavtalet",
];

// Extra texts to append for specific agreements
const EXTRA_TEXTS: Record<string, string[]> = {
  "laraavtalet": ["bilaga-m-larare"],
  "raddningstjanst-avtal": ["bilaga-r-raddningstjanst"],
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI-chatten kräver en API-nyckel. Kontakta administratören." },
      { status: 503 }
    );
  }

  const { message, agreementSlug, mode, history, locale } = await req.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Meddelande saknas" }, { status: 400 });
  }

  const isGlobal = mode === "global";
  const agreement = isGlobal ? null : getAgreementBySlug(agreementSlug);
  if (!isGlobal && !agreement) {
    return NextResponse.json({ error: "Avtal hittades inte" }, { status: 404 });
  }

  const client = new Anthropic({ apiKey });

  const messages: Anthropic.MessageParam[] = [];

  if (Array.isArray(history)) {
    const recentHistory = history.slice(-4);
    for (const msg of recentHistory) {
      if (msg.role === "user" || msg.role === "assistant") {
        messages.push({ role: msg.role, content: msg.content });
      }
    }
  }

  messages.push({ role: "user", content: message });

  // Build system prompt
  let systemPrompt: string;

  if (isGlobal) {
    // Global chat — general expert on all 617 agreements
    systemPrompt = `Du är en AI-expert på alla 617 kollektivavtal i Sverige. Du kan svara på frågor om löner, OB-tillägg, semester, pension, uppsägningstid, föräldralön och andra villkor för ALLA avtal och yrken.

STRIKTA REGLER:
- Svara baserat på din kunskap om svenska kollektivavtal.
- Om du inte vet svaret på en specifik fråga, hänvisa till rätt fackförbund.
- Svara på det språk användaren frågar på.
- Håll svaren under 200 ord.
- Gissa ALDRIG exakta lönesiffror om du inte är säker — säg istället att användaren bör kontrollera med sitt fackförbund.
- Avsluta ALLTID med: "Kontakta ditt fackförbund för bindande besked."`;
  } else {
    // Agreement-specific chat
    const fullText = getTruncatedAgreementText(agreementSlug, 60000);

    let abText: string | null = null;
    if (KOMMUN_AGREEMENTS_NEEDING_AB.includes(agreementSlug)) {
      abText = getTruncatedAgreementText("ab-kommunalt", 30000);
    }

    const extras = EXTRA_TEXTS[agreementSlug] || [];
    const extraTexts = extras
      .map((slug) => getTruncatedAgreementText(slug, 15000))
      .filter(Boolean);

    if (fullText || abText) {
      const unions = agreement!.parties.unions.join(" eller ");
      const textSections: string[] = [];

      if (abText) {
        textSections.push(`AB (ALLMÄNNA BESTÄMMELSER) — reglerar arbetstid, semester, sjuklön, uppsägning:\n${abText}`);
      }
      if (fullText) {
        textSections.push(`${agreement!.name.toUpperCase()} — reglerar löner och specifika villkor:\n${fullText}`);
      }
      for (const extra of extraTexts) {
        textSections.push(`BILAGA/TILLÄGG:\n${extra}`);
      }

      systemPrompt = `Du är en AI-expert på ${agreement!.name}. Du har tillgång till avtalstexter nedan.
${abText ? "\nOBS: Kommun/region har en dubbel struktur — AB (Allmänna Bestämmelser) reglerar grundvillkor (arbetstid, semester, sjuklön, uppsägning) och HÖK/löneavtalet reglerar löner. Använd BÅDA för att svara." : ""}

STRIKTA REGLER:
- Svara ENBART baserat på avtalstexterna och informationen nedan.
- CITERA ALDRIG avtalstexten ordagrant — sammanfatta ALLTID i egna ord.
- Om frågan inte kan besvaras utifrån texten, säg: "Jag hittar inte den informationen i avtalet. Kontakta ${unions} för exakt besked."
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Ange relevant paragraf om du kan (t.ex. "Enligt § 4 i AB...").
- Avsluta ALLTID med: "Kontakta ${unions} för bindande besked."
- Gissa ALDRIG — om du är osäker, säg det.

AVTALSINFORMATION:
Avtal: ${agreement!.name}
Parter: ${agreement!.parties.unions.join(", ")} och ${agreement!.parties.employers.join(", ")}
Giltighetsperiod: ${agreement!.validPeriod}
Antal anställda: ${agreement!.employeeCount.toLocaleString("sv-SE")}

SAMMANFATTNING AV NYCKELVILLKOR:
${Object.entries(agreement!.keyFacts).map(([k, v]) => `- ${k}: ${v}`).join("\n")}

LÖNETABELL:
${agreement!.wageTable.map((w) => `- ${w.role}: ${w.minimum} (lägst), ${w.median} (median) — ${w.comment}`).join("\n")}

AVTALSTEXTER:
${textSections.join("\n\n---\n\n")}`;
    } else {
      systemPrompt = agreement!.aiSystemPrompt;
    }

    // Add data quality context for specific agreements
    const verified = isVerifiedAgreement(agreementSlug);
    if (!verified) {
      systemPrompt += `\n\nVIKTIGT: Löneuppgifterna för detta avtal är UPPSKATTNINGAR baserade på branschdata, inte verifierade från avtalstexten. Om användaren frågar om specifika löner, SÄGA ALLTID att siffrorna är uppskattningar och rekommendera att kontrollera med fackförbundet. Gissa ALDRIG exakta belopp.`;
    }
  }

  // Respond in user's language
  const langMap: Record<string, string> = {
    en: "Always respond in English.",
    ar: "أجب دائماً باللغة العربية.",
    so: "Had iyo jeer ku jawaab af-Soomaali.",
    fa: "همیشه به فارسی پاسخ دهید.",
    es: "Responde siempre en español.",
    pl: "Zawsze odpowiadaj po polsku.",
  };
  if (locale && langMap[locale]) {
    systemPrompt += `\n\n${langMap[locale]}`;
  }

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: systemPrompt,
    messages,
  });

  const text = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");

  return NextResponse.json({ response: text });
}
