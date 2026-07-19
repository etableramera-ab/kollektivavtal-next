export const OPEN_AI_CHAT_EVENT = "kollektivavtal:open-ai-chat";

export type ChatSource = {
  reviewedAt: string;
  sections: string;
  label: string;
  url: string;
};

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  source?: ChatSource;
};

export type ChatResult = {
  response: string;
  source?: ChatSource;
};

type ChatPayload = {
  message: string;
  mode: "global" | "agreement";
  agreementSlug?: string;
  history: ChatMessage[];
  locale: string;
};

const MAX_HISTORY_CHARS = 3000;

export type ChatRequestErrorKind =
  | "timeout"
  | "network"
  | "server"
  | "invalid-response";

export class ChatRequestError extends Error {
  kind: ChatRequestErrorKind;
  status?: number;

  constructor(kind: ChatRequestErrorKind, message: string, status?: number) {
    super(message);
    this.name = "ChatRequestError";
    this.kind = kind;
    this.status = status;
  }
}

export function openAIChat() {
  window.dispatchEvent(new Event(OPEN_AI_CHAT_EVENT));
}

function readStringField(value: unknown, field: "error" | "response") {
  if (!value || typeof value !== "object") return null;
  const candidate = (value as Record<string, unknown>)[field];
  return typeof candidate === "string" && candidate.trim()
    ? candidate.trim()
    : null;
}

function readSource(value: unknown): ChatSource | undefined {
  if (!value || typeof value !== "object") return undefined;
  const source = (value as Record<string, unknown>).source;
  if (!source || typeof source !== "object") return undefined;

  const fields = source as Record<string, unknown>;
  if (
    typeof fields.reviewedAt !== "string" ||
    typeof fields.sections !== "string" ||
    typeof fields.label !== "string" ||
    typeof fields.url !== "string" ||
    !/^https:\/\//.test(fields.url)
  ) {
    return undefined;
  }

  return {
    reviewedAt: fields.reviewedAt,
    sections: fields.sections,
    label: fields.label,
    url: fields.url,
  };
}

function compactChatHistory(history: ChatMessage[]) {
  const recent = history.slice(-4).map(({ role, content }) => ({ role, content }));
  const compact: Array<Pick<ChatMessage, "role" | "content">> = [];
  let totalChars = 0;

  for (let index = recent.length - 1; index >= 0; index -= 1) {
    const message = recent[index];
    if (totalChars + message.content.length > MAX_HISTORY_CHARS) break;
    compact.unshift(message);
    totalChars += message.content.length;
  }

  while (compact[0]?.role === "assistant") compact.shift();
  return compact;
}

export async function sendChatRequest(payload: ChatPayload): Promise<ChatResult> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 55_000);

  try {
    const result = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        history: compactChatHistory(payload.history),
      }),
      signal: controller.signal,
    });

    const body = await result.text();
    let parsed: unknown = null;

    if (body) {
      try {
        parsed = JSON.parse(body);
      } catch {
        parsed = null;
      }
    }

    if (!result.ok) {
      const serverMessage = readStringField(parsed, "error");
      throw new ChatRequestError(
        "server",
        serverMessage || `AI-tjänsten svarade med felkod ${result.status}.`,
        result.status
      );
    }

    const response = readStringField(parsed, "response");
    if (!response) {
      throw new ChatRequestError(
        "invalid-response",
        "AI-tjänsten skickade inget läsbart svar."
      );
    }

    return { response, source: readSource(parsed) };
  } catch (error) {
    if (error instanceof ChatRequestError) throw error;

    if (controller.signal.aborted) {
      throw new ChatRequestError(
        "timeout",
        "AI-guiden hann inte svara inom 55 sekunder."
      );
    }

    throw new ChatRequestError(
      "network",
      "Kunde inte ansluta till AI-tjänsten."
    );
  } finally {
    window.clearTimeout(timeout);
  }
}
