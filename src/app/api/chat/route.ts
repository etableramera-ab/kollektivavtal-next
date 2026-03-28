import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { getAgreementBySlug } from "@/data/agreements";

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

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: agreement.aiSystemPrompt,
    messages,
  });

  const text = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");

  return NextResponse.json({ response: text });
}
