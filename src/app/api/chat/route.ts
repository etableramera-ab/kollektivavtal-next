import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { getAgreementBySlug } from "@/data/agreements";
import { getTruncatedAgreementText } from "@/lib/agreement-text-loader";

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI-chatten kräver en API-nyckel. Kontakta administratören." },
      { status: 503 }
    );
  }

  const { message, agreementSlug, history } = await req.json();

  const agreement = getAgreementBySlug(agreementSlug);
  if (!agreement) {
    return NextResponse.json({ error: "Avtal hittades inte" }, { status: 404 });
  }

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Meddelande saknas" }, { status: 400 });
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

  // Build system prompt — use full agreement text if available
  const fullText = getTruncatedAgreementText(agreementSlug, 80000);

  let systemPrompt: string;

  if (fullText) {
    const unions = agreement.parties.unions.join(" eller ");
    systemPrompt = `Du är en AI-expert på ${agreement.name}. Du har tillgång till hela avtalstexten nedan.

STRIKTA REGLER:
- Svara ENBART baserat på avtalstexten och informationen nedan.
- CITERA ALDRIG avtalstexten ordagrant — sammanfatta ALLTID i egna ord.
- Om frågan inte kan besvaras utifrån texten, säg: "Jag hittar inte den informationen i avtalet. Kontakta ${unions} för exakt besked."
- Svara på svenska, kort och tydligt. Håll under 200 ord.
- Ange relevant paragraf eller kapitel om du kan identifiera det (t.ex. "Enligt § 4 i avtalet...").
- Avsluta ALLTID med: "Kontakta ${unions} för bindande besked."
- Gissa ALDRIG — om du är osäker, säg det.
- Svaren är vägledande, inte juridiskt bindande.

AVTALSINFORMATION:
Avtal: ${agreement.name}
Parter: ${agreement.parties.unions.join(", ")} och ${agreement.parties.employers.join(", ")}
Giltighetsperiod: ${agreement.validPeriod}
Antal anställda: ${agreement.employeeCount.toLocaleString("sv-SE")}

SAMMANFATTNING AV NYCKELVILLKOR:
${Object.entries(agreement.keyFacts).map(([k, v]) => `- ${k}: ${v}`).join("\n")}

LÖNETABELL:
${agreement.wageTable.map((w) => `- ${w.role}: ${w.minimum} (lägst), ${w.median} (median) — ${w.comment}`).join("\n")}

FULLSTÄNDIG AVTALSTEXT:
${fullText}`;
  } else {
    // Fallback: use the summary-based system prompt
    systemPrompt = agreement.aiSystemPrompt;
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
