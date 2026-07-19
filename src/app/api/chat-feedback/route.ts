import { track } from "@vercel/analytics/server";

const ALLOWED_FIELDS = new Set([
  "helpful",
  "mode",
  "locale",
  "agreementSlug",
]);
const ALLOWED_LOCALES = new Set(["sv", "en", "ar", "so", "fa", "es", "pl"]);
const AGREEMENT_SLUG_PATTERN = /^[a-z0-9-]{1,100}$/;

type FeedbackPayload = {
  helpful: boolean;
  mode: "global" | "agreement";
  locale: string;
  agreementSlug?: string;
};

function parseFeedbackPayload(value: unknown): FeedbackPayload | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const fields = value as Record<string, unknown>;
  if (Object.keys(fields).some((key) => !ALLOWED_FIELDS.has(key))) return null;
  if (typeof fields.helpful !== "boolean") return null;
  if (fields.mode !== "global" && fields.mode !== "agreement") return null;
  if (typeof fields.locale !== "string" || !ALLOWED_LOCALES.has(fields.locale)) {
    return null;
  }

  const agreementSlug = fields.agreementSlug;
  if (
    agreementSlug !== undefined &&
    (typeof agreementSlug !== "string" ||
      !AGREEMENT_SLUG_PATTERN.test(agreementSlug))
  ) {
    return null;
  }
  if (fields.mode === "agreement" && typeof agreementSlug !== "string") {
    return null;
  }
  if (fields.mode === "global" && agreementSlug !== undefined) return null;

  return {
    helpful: fields.helpful,
    mode: fields.mode,
    locale: fields.locale,
    ...(agreementSlug ? { agreementSlug } : {}),
  };
}

function isSameOriginRequest(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return false;

  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!origin || !host) return true;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return Response.json({ error: "Otillåten förfrågan." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 500) {
    return Response.json({ error: "Ogiltig feedback." }, { status: 413 });
  }

  let payload: FeedbackPayload | null = null;
  try {
    const body = await request.text();
    if (body.length > 500) {
      return Response.json({ error: "Ogiltig feedback." }, { status: 413 });
    }
    payload = parseFeedbackPayload(JSON.parse(body));
  } catch {
    payload = null;
  }

  if (!payload) {
    return Response.json({ error: "Ogiltig feedback." }, { status: 400 });
  }

  // Only the vote and non-content context are recorded. Synthetic headers keep
  // the visitor's IP address, cookies and browser details out of this event.
  await track(
    payload.helpful ? "ai_feedback_yes" : "ai_feedback_no",
    {
      context: payload.agreementSlug || payload.mode,
      locale: payload.locale,
    },
    {
      headers: {
        "user-agent": "kollektivavtal-feedback",
        "x-forwarded-for": "0.0.0.0",
        cookie: "",
      },
    }
  );

  return new Response(null, {
    status: 204,
    headers: { "Cache-Control": "no-store" },
  });
}
