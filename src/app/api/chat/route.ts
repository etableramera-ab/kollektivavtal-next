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
const MAX_TOTAL_HISTORY_CHARS = 3000;
const MAX_REQUEST_BODY_BYTES = 32_000;
const ANTHROPIC_TIMEOUT_MS = 25_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const MAX_CONCURRENT_REQUESTS = 4;
const MAX_OUTPUT_TOKENS = 600;

type RateLimitEntry = { count: number; resetAt: number };
const globalChatState = globalThis as typeof globalThis & {
  kollektivavtalChatRateLimits?: Map<string, RateLimitEntry>;
  kollektivavtalChatActiveRequests?: number;
};
const chatRateLimits =
  globalChatState.kollektivavtalChatRateLimits ?? new Map<string, RateLimitEntry>();
globalChatState.kollektivavtalChatRateLimits = chatRateLimits;
globalChatState.kollektivavtalChatActiveRequests ??= 0;

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
  let totalHistoryChars = 0;
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
    totalHistoryChars += content.length;
    history.push({ role: item.role, content });
  }

  if (totalHistoryChars > MAX_TOTAL_HISTORY_CHARS) {
    return {
      ok: false,
      error: `Chatthistoriken får innehålla högst ${MAX_TOTAL_HISTORY_CHARS} tecken totalt.`,
    };
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

const NUMBER_TOKEN_PATTERN = /\d+(?:[\s\u00a0]\d{3})*(?:[,.]\d+)?/g;

interface ParsedNumberToken {
  key: string;
  value: number;
  raw: string;
  index: number;
  end: number;
}

function normalizeLocalizedNumberCharacters(value: string): string {
  return value
    .replace(/[\u0660-\u0669]/g, (digit) =>
      String(digit.charCodeAt(0) - 0x0660)
    )
    .replace(/[\u06f0-\u06f9]/g, (digit) =>
      String(digit.charCodeAt(0) - 0x06f0)
    )
    .replace(/\u066b/g, ".")
    .replace(/\u066c/g, "\u00a0")
    .replace(/\u066a/g, "%");
}

function parseNumberToken(raw: string, index = 0): ParsedNumberToken | null {
  let normalized = raw.replace(/[\s\u00a0]/g, "");
  const separatorMatch = normalized.match(/^\d{1,3}([,.])(\d{3})$/);
  if (separatorMatch) {
    normalized = normalized.replace(separatorMatch[1], "");
  } else {
    normalized = normalized.replace(",", ".");
  }

  const value = Number(normalized);
  if (!Number.isFinite(value)) return null;

  return {
    key: String(value),
    value,
    raw,
    index,
    end: index + raw.length,
  };
}

function parsedNumberTokens(value: string): ParsedNumberToken[] {
  const normalized = normalizeLocalizedNumberCharacters(value).replace(
    /(?<=\d):(?=\d)/g,
    "."
  );
  const matches = normalized.matchAll(
    new RegExp(NUMBER_TOKEN_PATTERN.source, "g")
  );
  const tokens: ParsedNumberToken[] = [];

  for (const match of matches) {
    const parsed = parseNumberToken(match[0], match.index ?? 0);
    if (parsed) tokens.push(parsed);
  }

  return tokens;
}

function normalizedNumbers(value: string): Set<string> {
  return new Set(parsedNumberTokens(value).map((token) => token.key));
}

const FACT_HOURLY_RATE_AFTER_NUMBER =
  /^\s*(?:kr|kron(?:a|or))\s*(?:(?:\/|per|i)\s*)?(?:tim(?:me|men|mar)?|h)\b/u;

const QUESTION_HOURLY_RATE_AFTER_NUMBER: Record<SupportedLocale, RegExp> = {
  sv: FACT_HOURLY_RATE_AFTER_NUMBER,
  en: /^\s*(?:sek|kr|kron(?:a|or)|crowns?)\s*(?:(?:\/|per|an)\s*)?(?:hours?|h)\b/u,
  ar: /^\s*(?:كرون(?:ة|ات)?|كر)\s*(?:(?:\/|في|لكل)\s*)?(?:الساعة|ساعة|ساعات)/u,
  so: /^\s*(?:kr|karoon)\s*(?:(?:\/|halkii)\s*)?(?:saacad|saacado)\b/u,
  fa: /^\s*(?:کرون)\s*(?:(?:\/|در|برای\s+هر)\s*)?(?:ساعت)/u,
  es: /^\s*(?:sek|kr|coronas?)\s*(?:(?:\/|por)\s*)?(?:horas?|h)\b/u,
  pl: /^\s*(?:sek|kr|koron(?:a|y)?)\s*(?:(?:\/|za|na)\s*)?(?:godzin(?:a|y)?|h)\b/u,
};

const QUESTION_HOUR_AMOUNT_AFTER_NUMBER: Record<SupportedLocale, RegExp> = {
  sv: /^\s*(?:tim(?:me|men|mar)?|h)\b/u,
  en: /^\s*(?:hours?|h)\b/u,
  ar: /^\s*(?:الساعة|ساعة|ساعات)/u,
  so: /^\s*(?:saacad|saacado)\b/u,
  fa: /^\s*(?:ساعت)/u,
  es: /^\s*(?:horas?|h)\b/u,
  pl: /^\s*(?:godzin(?:a|y)?|h)\b/u,
};

function numbersFollowedByUnit(value: string, unitPattern: RegExp): Set<string> {
  const normalized = normalizeLocalizedNumberCharacters(value).toLowerCase();
  const matches = new Set<string>();

  for (const token of parsedNumberTokens(normalized)) {
    if (unitPattern.test(normalized.slice(token.end, token.end + 50))) {
      matches.add(token.key);
    }
  }

  return matches;
}

function explicitlyRequestsHourlyMultiplication(
  message: string,
  locale: SupportedLocale
): boolean {
  const normalized = normalizeLocalizedNumberCharacters(message).toLowerCase();
  const calculationPatterns: Record<SupportedLocale, RegExp> = {
    sv: /\b(?:räkna(?:\s+ut)?|beräkna|uträkning|totalt|sammanlagt|multiplicera|gånger|vad\s+blir|hur\s+mycket\s+blir|vad\s+tjänar|hur\s+mycket\s+(?:får|tjänar))\b/u,
    en: /\b(?:calculate|work\s+out|total|altogether|multiply|times|what\s+(?:is|will|would)|how\s+much\s+(?:is|will|would|do|does))\b/u,
    ar: /(?:احسب|حساب|المجموع|اضرب|كم\s+يساوي|كم\s+يكون|كم\s+يبلغ)/u,
    so: /\b(?:xisaabi|xisaab|wadarta|ku\s+dhufo|waa\s+imisa|intee\s+ayuu\s+noqonayaa|immisa\s+ayaan\s+helayaa)\b/u,
    fa: /(?:محاسبه|حساب\s+کن|مجموع|ضرب|چقدر\s+می\s*شود|چه\s+قدر\s+می\s*شود)/u,
    es: /\b(?:calcula|calcular|total|multiplica|cuánto\s+(?:es|sería|gano|recibiría))\b/u,
    pl: /\b(?:oblicz|policz|wynik|łącznie|pomnóż|ile\s+(?:wynosi|będzie|zarobię|otrzymam))\b/u,
  };
  const containsMultiplication = /\d\s*(?:×|\*)\s*\d|\d\s+x\s+\d/u.test(
    normalized
  );

  return calculationPatterns[locale].test(normalized) || containsMultiplication;
}

function displayedDecimalPlaces(raw: string): number {
  const compact = raw.replace(/[\s\u00a0]/g, "");
  if (/^\d{1,3}[,.]\d{3}$/u.test(compact)) return 0;
  return compact.match(/[,.](\d+)$/u)?.[1].length ?? 0;
}

function matchesDisplayedResult(calculated: number, result: ParsedNumberToken) {
  if (
    !Number.isFinite(calculated) ||
    calculated < 0 ||
    calculated > 1_000_000_000
  ) {
    return false;
  }

  const decimals = Math.min(displayedDecimalPlaces(result.raw), 6);
  if (
    decimals === 0 &&
    Math.abs(calculated - Math.round(calculated)) >
      Number.EPSILON * Math.max(1, Math.abs(calculated)) * 4
  ) {
    return false;
  }
  const rounded = Number(calculated.toFixed(decimals));
  const tolerance = Math.max(Number.EPSILON * Math.abs(rounded) * 4, 1e-9);
  return Math.abs(result.value - rounded) <= tolerance;
}

interface DisplayedCalculationValidation {
  derived: Set<string>;
  hasInvalidEquation: boolean;
}

function validateDisplayedCalculations(
  answer: string,
  factContext: string,
  message: string,
  locale: SupportedLocale
): DisplayedCalculationValidation {
  const derived = new Set<string>();
  let hasInvalidEquation = false;
  const calculationRequested = explicitlyRequestsHourlyMultiplication(
    message,
    locale
  );
  const factHourlyRates = numbersFollowedByUnit(
    factContext,
    FACT_HOURLY_RATE_AFTER_NUMBER
  );
  const questionHourlyRates = numbersFollowedByUnit(
    message,
    QUESTION_HOURLY_RATE_AFTER_NUMBER[locale]
  );
  const questionHourAmounts = numbersFollowedByUnit(
    message,
    QUESTION_HOUR_AMOUNT_AFTER_NUMBER[locale]
  );
  const normalizedAnswer = normalizeLocalizedNumberCharacters(answer);

  for (const line of normalizedAnswer.split(/\r?\n/u)) {
    const equalsIndex = line.indexOf("=");
    if (equalsIndex < 0) continue;

    let left = line.slice(0, equalsIndex);
    const looksLikeArithmetic =
      /[+*×÷−%]|\d\s*[-/]\s*\d|\s[xX]\s/u.test(left);
    if (!looksLikeArithmetic) continue;

    if (line.indexOf("=", equalsIndex + 1) >= 0) {
      hasInvalidEquation = true;
      continue;
    }

    const lastLabelSeparator = Math.max(
      left.lastIndexOf(":"),
      left.lastIndexOf(";")
    );
    if (lastLabelSeparator >= 0) left = left.slice(lastLabelSeparator + 1);

    const right = line.slice(equalsIndex + 1);
    const operands = parsedNumberTokens(left);
    const results = parsedNumberTokens(right);
    if (operands.length !== 2 || results.length !== 1) {
      hasInvalidEquation = true;
      continue;
    }

    const [first, second] = operands;
    const [result] = results;
    const betweenOperands = left.slice(first.end, second.index);
    const hasMultiplication =
      betweenOperands.includes("×") || /\s[xX]\s/u.test(betweenOperands);
    const hasDisallowedOperator =
      /[+÷−%]|\d\s*[-/]\s*\d/u.test(left);
    if (!hasMultiplication || hasDisallowedOperator) {
      hasInvalidEquation = true;
      continue;
    }

    const orientations = [
      { rate: first, hours: second },
      { rate: second, hours: first },
    ];
    const grounded = orientations.find(
      ({ rate, hours }) =>
        factHourlyRates.has(rate.key) &&
        questionHourlyRates.has(rate.key) &&
        questionHourAmounts.has(hours.key)
    );
    if (
      !calculationRequested ||
      !grounded ||
      !matchesDisplayedResult(grounded.rate.value * grounded.hours.value, result)
    ) {
      hasInvalidEquation = true;
      continue;
    }

    derived.add(result.key);
  }

  return { derived, hasInvalidEquation };
}

function hasUnsupportedNumbers(
  answer: string,
  evidence: string,
  factContext: string,
  message: string,
  locale: SupportedLocale
): boolean {
  const allowedNumbers = normalizedNumbers(evidence);
  const calculations = validateDisplayedCalculations(
    answer,
    factContext,
    message,
    locale
  );
  if (calculations.hasInvalidEquation) return true;

  for (const derived of calculations.derived) {
    allowedNumbers.add(derived);
  }
  return Array.from(normalizedNumbers(answer)).some(
    (number) => !allowedNumbers.has(number)
  );
}

function jsonError(message: string, status: number, retryAfter?: string) {
  const response = NextResponse.json({ error: message }, { status });
  response.headers.set("Cache-Control", "no-store");
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

function requestSafetyResponse(req: NextRequest): NextResponse | null {
  if (process.env.AI_CHAT_ENABLED?.trim().toLowerCase() === "false") {
    return jsonError(
      "AI-guiden är tillfälligt pausad. Försök igen senare.",
      503
    );
  }

  const contentType = req.headers
    .get("content-type")
    ?.split(";", 1)[0]
    ?.trim()
    .toLowerCase();
  if (contentType !== "application/json") {
    return jsonError("Förfrågan måste skickas som JSON.", 415);
  }

  const contentLength = Number(req.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BODY_BYTES) {
    return jsonError("Förfrågan är för stor.", 413);
  }

  if (process.env.NODE_ENV === "production") {
    const origin = req.headers.get("origin");
    if (!origin || origin !== req.nextUrl.origin) {
      return jsonError("Förfrågan kommer från en otillåten webbplats.", 403);
    }

    const fetchSite = req.headers.get("sec-fetch-site");
    if (fetchSite && fetchSite !== "same-origin") {
      return jsonError("Förfrågan kommer från en otillåten webbplats.", 403);
    }
  }

  return null;
}

function rateLimitResponse(req: NextRequest): NextResponse | null {
  const now = Date.now();
  const address = getClientAddress(req);

  if (chatRateLimits.size > 5_000) {
    for (const [key, entry] of chatRateLimits) {
      if (entry.resetAt <= now) chatRateLimits.delete(key);
    }
  }

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

function startProviderRequest(): NextResponse | null {
  const activeRequests = globalChatState.kollektivavtalChatActiveRequests ?? 0;
  if (activeRequests >= MAX_CONCURRENT_REQUESTS) {
    return jsonError(
      "AI-guiden har många frågor just nu. Vänta en liten stund och försök igen.",
      429,
      "5"
    );
  }

  globalChatState.kollektivavtalChatActiveRequests = activeRequests + 1;
  return null;
}

function finishProviderRequest() {
  globalChatState.kollektivavtalChatActiveRequests = Math.max(
    0,
    (globalChatState.kollektivavtalChatActiveRequests ?? 1) - 1
  );
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
  const unsafe = requestSafetyResponse(req);
  if (unsafe) return unsafe;

  let body: unknown;
  try {
    const rawBody = await req.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BODY_BYTES) {
      return jsonError("Förfrågan är för stor.", 413);
    }
    body = JSON.parse(rawBody);
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

  const busy = startProviderRequest();
  if (busy) return busy;

  try {
    const localeText = LOCALE_TEXT[input.locale];
    const messages: Anthropic.MessageParam[] = [
      ...input.history,
      { role: "user", content: input.message },
    ];

    let systemPrompt: string;
    let source: ReturnType<typeof getPublicFactSourceNote> = null;
    let numericEvidence = input.message;
    let numericFactContext = "";

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
        numericFactContext = factContext;
        systemPrompt = `Du är en försiktig guide till ${agreement.name}.

Regler:
Svara endast med stöd i de källgranskade fakta nedan.
När en faktarad säger UNDERLAG SAKNAS får du inte fylla luckan med en uppskattning, äldre kunskap eller ett belopp från någon annan källa.
Om underlaget inte räcker ska du säga det tydligt och kort.
Besvara bara det användaren frågar om. Lägg inte till närliggande villkor, undantag, beräkningsregler eller tidsperioder som inte uttryckligen behövs för svaret.
Gör normalt inga egna beräkningar. Det enda tillåtna undantaget är när användaren själv anger både en timnivå i kronor per timme som exakt finns i de källgranskade fakta och ett tydligt antal timmar. Då får du endast multiplicera timnivån med antalet timmar. Visa uträkningen på en egen rad i formatet "timnivå × timmar = resultat" med tecknet ×. Om timnivån saknas i frågan, inte matchar fakta eller om användaren ber om addition, subtraktion, division eller procenträkning ska du avstå från uträkningen och säga att underlaget inte räcker.
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
      maxRetries: 0,
    });
    const response = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL?.trim() || "claude-sonnet-4-6",
      max_tokens: MAX_OUTPUT_TOKENS,
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
      hasUnsupportedNumbers(
        rawText,
        numericEvidence,
        numericFactContext,
        input.message,
        input.locale
      )
    ) {
      return jsonError(
        "AI-svaret kunde inte verifieras mot underlaget. Försök gärna formulera frågan mer specifikt.",
        502
      );
    }

    const result = NextResponse.json({
      response: text,
      ...(source ? { source } : {}),
    });
    result.headers.set("Cache-Control", "no-store");
    return result;
  } catch (error) {
    return providerErrorResponse(error, input);
  } finally {
    finishProviderRequest();
  }
}
