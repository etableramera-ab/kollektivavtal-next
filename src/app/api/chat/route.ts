import Anthropic, {
  APIConnectionError,
  APIConnectionTimeoutError,
  APIError,
} from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import {
  getPublicAgreementFactContext,
  getPublicFactSourceNote,
} from "@/lib/agreement-fact-status";
import { publicAgreements } from "@/lib/public-agreements";
import { isVerifiedAgreement } from "@/lib/verified-agreements";

export const maxDuration = 60;

const MAX_MESSAGE_CHARS = 1500;
const MAX_HISTORY_MESSAGES = 4;
const MAX_HISTORY_CHARS = 1500;
const ANTHROPIC_TIMEOUT_MS = 25_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;

type RateLimitEntry = { count: number; resetAt: number };
const globalChatState = globalThis as typeof globalThis & {
  kollektivavtalChatRateLimits?: Map<string, RateLimitEntry>;
};
const chatRateLimits =
  globalChatState.kollektivavtalChatRateLimits ?? new Map<string, RateLimitEntry>();
globalChatState.kollektivavtalChatRateLimits = chatRateLimits;

const SUPPORTED_LOCALES = ["sv", "en", "ar", "so", "fa", "es", "pl"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const LOCALE_TEXT: Record<
  SupportedLocale,
  {
    languageInstruction: string;
    globalClosing: string;
    agreementClosing: string;
  }
> = {
  sv: {
    languageInstruction: "Svara alltid på svenska.",
    globalClosing: "Kontakta ditt fackförbund för bindande besked.",
    agreementClosing: "Kontakta avtalsparterna för bindande besked.",
  },
  en: {
    languageInstruction: "Always respond in English.",
    globalClosing: "Contact your trade union for binding information.",
    agreementClosing: "Contact the parties to the agreement for binding information.",
  },
  ar: {
    languageInstruction: "أجب دائماً باللغة العربية.",
    globalClosing: "تواصل مع نقابتك للحصول على معلومات ملزمة.",
    agreementClosing: "تواصل مع أطراف الاتفاقية للحصول على معلومات ملزمة.",
  },
  so: {
    languageInstruction: "Had iyo jeer ku jawaab af-Soomaali.",
    globalClosing: "La xiriir ururkaaga shaqaalaha si aad u hesho xog rasmi ah.",
    agreementClosing: "La xiriir dhinacyada heshiiska si aad u hesho xog rasmi ah.",
  },
  fa: {
    languageInstruction: "همیشه به فارسی پاسخ دهید.",
    globalClosing: "برای دریافت اطلاعات قطعی با اتحادیه خود تماس بگیرید.",
    agreementClosing: "برای دریافت اطلاعات قطعی با طرف‌های قرارداد تماس بگیرید.",
  },
  es: {
    languageInstruction: "Responde siempre en español.",
    globalClosing: "Contacta con tu sindicato para obtener información vinculante.",
    agreementClosing: "Contacta con las partes del convenio para obtener información vinculante.",
  },
  pl: {
    languageInstruction: "Zawsze odpowiadaj po polsku.",
    globalClosing: "Skontaktuj się ze swoim związkiem zawodowym, aby uzyskać wiążące informacje.",
    agreementClosing: "Skontaktuj się ze stronami układu, aby uzyskać wiążące informacje.",
  },
};

interface ValidatedChatRequest {
  message: string;
  agreementSlug: string | null;
  mode: "agreement" | "global";
  history: Anthropic.MessageParam[];
  locale: SupportedLocale;
}

type ValidationResult =
  | { ok: true; value: ValidatedChatRequest }
  | { ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isSupportedLocale(value: unknown): value is SupportedLocale {
  return (
    typeof value === "string" &&
    (SUPPORTED_LOCALES as readonly string[]).includes(value)
  );
}

function validateRequestBody(body: unknown): ValidationResult {
  if (!isRecord(body)) {
    return { ok: false, error: "Förfrågan har fel format." };
  }

  if (typeof body.message !== "string") {
    return { ok: false, error: "Meddelande saknas." };
  }

  const message = body.message.trim();
  if (message.length < 1 || message.length > MAX_MESSAGE_CHARS) {
    return {
      ok: false,
      error: `Meddelandet måste vara mellan 1 och ${MAX_MESSAGE_CHARS} tecken.`,
    };
  }

  if (
    body.mode !== undefined &&
    body.mode !== "agreement" &&
    body.mode !== "global"
  ) {
    return { ok: false, error: "Ogiltigt chattläge." };
  }
  const mode = body.mode === "global" ? "global" : "agreement";

  let locale: SupportedLocale = "sv";
  if (body.locale !== undefined && body.locale !== null && body.locale !== "") {
    if (!isSupportedLocale(body.locale)) {
      return { ok: false, error: "Språket stöds inte." };
    }
    locale = body.locale;
  }

  let agreementSlug: string | null = null;
  if (mode === "agreement") {
    if (
      typeof body.agreementSlug !== "string" ||
      !/^[a-z0-9-]{1,100}$/.test(body.agreementSlug)
    ) {
      return { ok: false, error: "Ett giltigt avtal måste väljas." };
    }
    agreementSlug = body.agreementSlug;
  }

  const rawHistory = body.history ?? [];
  if (!Array.isArray(rawHistory) || rawHistory.length > MAX_HISTORY_MESSAGES) {
    return {
      ok: false,
      error: `Chatthistoriken får innehålla högst ${MAX_HISTORY_MESSAGES} meddelanden.`,
    };
  }

  const history: Anthropic.MessageParam[] = [];
  for (const item of rawHistory) {
    if (
      !isRecord(item) ||
      (item.role !== "user" && item.role !== "assistant") ||
      typeof item.content !== "string"
    ) {
      return { ok: false, error: "Chatthistoriken har fel format." };
    }

    const content = item.content.trim();
    if (content.length < 1 || content.length > MAX_HISTORY_CHARS) {
      return {
        ok: false,
        error: `Varje historikmeddelande måste vara mellan 1 och ${MAX_HISTORY_CHARS} tecken.`,
      };
    }
    history.push({ role: item.role, content });
  }

  return {
    ok: true,
    value: { message, agreementSlug, mode, history, locale },
  };
}

function plainTextOnly(value: string): string {
  return value
    .replace(/```(?:[a-z0-9_-]+)?\s*([\s\S]*?)```/gi, "$1")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*(?:[-+*]|\d+[.)])\s+/gm, "")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/[*_`~]/g, "")
    .replace(/\r\n?/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function ensureClosing(value: string, closing: string): string {
  const text = plainTextOnly(value);
  if (!text || text.endsWith(closing)) return text;
  return `${text}\n\n${closing}`;
}

function normalizedNumbers(value: string): Set<string> {
  const tokens = new Set<string>();
  const normalizedSeparators = value.replace(/(?<=\d):(?=\d)/g, ".");
  const matches = normalizedSeparators.match(
    /\d+(?:[\s\u00a0]\d{3})*(?:[,.]\d+)?/g
  );

  for (const match of matches ?? []) {
    let token = match.replace(/[\s\u00a0]/g, "");
    const separatorMatch = token.match(/^\d{1,3}([,.])(\d{3})$/);
    if (separatorMatch) {
      token = token.replace(separatorMatch[1], "");
    } else {
      token = token.replace(",", ".");
    }

    const numericValue = Number(token);
    if (Number.isFinite(numericValue)) tokens.add(String(numericValue));
  }

  return tokens;
}

function hasUnsupportedNumbers(answer: string, evidence: string): boolean {
  const allowedNumbers = normalizedNumbers(evidence);
  return Array.from(normalizedNumbers(answer)).some(
    (number) => !allowedNumbers.has(number)
  );
}

function jsonError(message: string, status: number, retryAfter?: string) {
  const response = NextResponse.json({ error: message }, { status });
  if (retryAfter) response.headers.set("Retry-After", retryAfter);
  return response;
}

function getClientAddress(req: NextRequest): string {
  const forwarded =
    req.headers.get("x-vercel-forwarded-for") ??
    req.headers.get("x-forwarded-for") ??
    req.headers.get("x-real-ip");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function rateLimitResponse(req: NextRequest): NextResponse | null {
  const now = Date.now();
  const address = getClientAddress(req);
  const existing = chatRateLimits.get(address);

  if (!existing || existing.resetAt <= now) {
    chatRateLimits.set(address, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return null;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((existing.resetAt - now) / 1000)
    );
    return jsonError(
      "Du har ställt många frågor på kort tid. Vänta en stund och försök igen.",
      429,
      String(retryAfterSeconds)
    );
  }

  existing.count += 1;
  return null;
}

function providerErrorResponse(
  error: unknown,
  context: Pick<ValidatedChatRequest, "mode" | "agreementSlug">
) {
  const apiError = error instanceof APIError ? error : null;
  const status = apiError?.status;
  const type = apiError?.type;
  const requestId = apiError?.requestID ?? undefined;

  console.error("AI chat provider error", {
    status,
    type,
    requestId,
    mode: context.mode,
    agreementSlug: context.agreementSlug,
    errorName: error instanceof Error ? error.name : "UnknownError",
  });

  if (
    error instanceof APIConnectionTimeoutError ||
    status === 504 ||
    type === "timeout_error"
  ) {
    return jsonError(
      "AI-guiden tog för lång tid på sig. Försök igen om en liten stund.",
      504
    );
  }

  if (status === 429 || type === "rate_limit_error") {
    const retryAfter = apiError?.headers?.get("retry-after") ?? "10";
    return jsonError(
      "AI-guiden har många frågor just nu. Vänta en liten stund och försök igen.",
      429,
      retryAfter
    );
  }

  if (
    status === 529 ||
    type === "overloaded_error" ||
    status === 409 ||
    (typeof status === "number" && status >= 500)
  ) {
    return jsonError(
      "AI-tjänsten är tillfälligt upptagen. Försök igen om en liten stund.",
      503,
      "10"
    );
  }

  if (
    status === 400 ||
    status === 401 ||
    status === 402 ||
    status === 403 ||
    status === 404 ||
    status === 422
  ) {
    return jsonError(
      "AI-guiden är tillfälligt otillgänglig. Kontakta administratören om felet kvarstår.",
      503
    );
  }

  if (error instanceof APIConnectionError) {
    return jsonError(
      "AI-tjänsten kunde inte nås. Försök igen om en liten stund.",
      503
    );
  }

  return jsonError(
    "Något gick fel i AI-guiden. Försök igen om en liten stund.",
    500
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("Förfrågan kunde inte läsas.", 400);
  }

  const validation = validateRequestBody(body);
  if (!validation.ok) {
    return jsonError(validation.error, 400);
  }
  const input = validation.value;

  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    return jsonError(
      "AI-guiden är tillfälligt otillgänglig. Kontakta administratören.",
      503
    );
  }

  const limited = rateLimitResponse(req);
  if (limited) return limited;

  try {
    const localeText = LOCALE_TEXT[input.locale];
    const messages: Anthropic.MessageParam[] = [
      ...input.history,
      { role: "user", content: input.message },
    ];

    let systemPrompt: string;
    let source: ReturnType<typeof getPublicFactSourceNote> = null;
    let numericEvidence = input.message;

    if (input.mode === "global") {
      systemPrompt = `Du är en försiktig guide till svenska kollektivavtal. I det här globala läget saknar du avtalsspecifikt källunderlag. Hjälp användaren att förstå allmänna begrepp och att hitta vilket avtalsområde som kan vara relevant.

Regler:
Påstå aldrig att du har läst alla svenska kollektivavtal.
Ge inga exakta löner, OB-belopp, uppsägningstider eller andra avtalsvillkor.
Be användaren välja ett källgranskat avtal när frågan gäller ett specifikt villkor.
Gissa aldrig.
Håll svaret under 200 ord.
Skriv endast vanlig text utan rubriker, punktlistor, länkar eller annan Markdown.
${localeText.languageInstruction}
Avsluta exakt med: ${localeText.globalClosing}`;
    } else {
      const agreementSlug = input.agreementSlug!;
      const agreement = publicAgreements.find(
        (item) => item.slug === agreementSlug
      );
      const verified = isVerifiedAgreement(agreementSlug);
      const factContext = getPublicAgreementFactContext(agreementSlug);
      source = getPublicFactSourceNote(agreementSlug);

      if (!agreement || !verified) {
        return jsonError("Det valda avtalet är inte tillgängligt i AI-guiden.", 404);
      }

      if (verified && factContext) {
        numericEvidence = `${input.message}\n${factContext}`;
        systemPrompt = `Du är en försiktig guide till ${agreement.name}.

Regler:
Svara endast med stöd i de källgranskade fakta nedan.
När en faktarad säger UNDERLAG SAKNAS får du inte fylla luckan med en uppskattning, äldre kunskap eller ett belopp från någon annan källa.
Om underlaget inte räcker ska du säga det tydligt och kort.
Besvara bara det användaren frågar om. Lägg inte till närliggande villkor, undantag, beräkningsregler eller tidsperioder som inte uttryckligen behövs för svaret.
Gör inga egna beräkningar om användaren inte uttryckligen ber om en beräkning.
Skriv all numerisk information med siffror, inte med utskrivna räkneord.
Sammanfatta alltid med egna ord.
Gissa aldrig ett paragrafnummer eller avsnitt. Nämn bara en hänvisning om den uttryckligen står i det källgranskade underlaget och tydligt gäller svaret.
Håll svaret under 200 ord.
Skriv endast vanlig text utan rubriker, punktlistor, länkar eller annan Markdown.
${localeText.languageInstruction}
Avsluta exakt med: ${localeText.agreementClosing}

Källgranskade fakta:
${factContext}`;
      } else {
        systemPrompt = `Du är en försiktig guide till ${agreement.name}. Det finns inte ett tillräckligt källgranskat underlag i den här chatten.

Ge inga exakta avtalsvillkor eller belopp.
Gissa aldrig.
Förklara kort att underlaget inte räcker.
Skriv endast vanlig text utan Markdown.
${localeText.languageInstruction}
Avsluta exakt med: ${localeText.agreementClosing}`;
      }
    }

    const client = new Anthropic({
      apiKey,
      timeout: ANTHROPIC_TIMEOUT_MS,
      maxRetries: 1,
    });
    const response = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL?.trim() || "claude-sonnet-4-6",
      max_tokens: 1000,
      system: systemPrompt,
      messages,
    });

    if (response.stop_reason === "max_tokens") {
      return jsonError(
        "AI-svaret blev ofullständigt. Försök gärna med en kortare fråga.",
        502
      );
    }

    const rawText = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();
    const closing =
      input.mode === "global"
        ? LOCALE_TEXT[input.locale].globalClosing
        : LOCALE_TEXT[input.locale].agreementClosing;
    const text = ensureClosing(rawText, closing);

    if (!text) {
      return jsonError(
        "AI-guiden kunde inte skapa ett svar. Försök formulera frågan på ett annat sätt.",
        502
      );
    }

    if (
      input.mode === "agreement" &&
      hasUnsupportedNumbers(text, numericEvidence)
    ) {
      return jsonError(
        "AI-svaret kunde inte verifieras mot underlaget. Försök gärna formulera frågan mer specifikt.",
        502
      );
    }

    return NextResponse.json({
      response: text,
      ...(source ? { source } : {}),
    });
  } catch (error) {
    return providerErrorResponse(error, input);
  }
}
