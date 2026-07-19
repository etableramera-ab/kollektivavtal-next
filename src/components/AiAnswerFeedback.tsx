"use client";

import { useRef, useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";

type FeedbackMode = "global" | "agreement";
type FeedbackStatus = "idle" | "sending" | "sent" | "error";

type FeedbackLabels = {
  question: string;
  yes: string;
  no: string;
  thanks: string;
  error: string;
};

const labelsByLocale: Record<string, FeedbackLabels> = {
  sv: {
    question: "Hjälpte svaret?",
    yes: "Ja",
    no: "Nej",
    thanks: "Tack för din feedback!",
    error: "Kunde inte spara. Försök igen.",
  },
  en: {
    question: "Was this answer helpful?",
    yes: "Yes",
    no: "No",
    thanks: "Thanks for your feedback!",
    error: "Could not save. Please try again.",
  },
  ar: {
    question: "هل كانت الإجابة مفيدة؟",
    yes: "نعم",
    no: "لا",
    thanks: "شكرًا لملاحظاتك!",
    error: "تعذر الحفظ. حاول مرة أخرى.",
  },
  so: {
    question: "Jawaabtu ma ku caawisay?",
    yes: "Haa",
    no: "Maya",
    thanks: "Waad ku mahadsan tahay ra'yigaaga!",
    error: "Lama kaydin karin. Mar kale isku day.",
  },
  fa: {
    question: "آیا پاسخ مفید بود؟",
    yes: "بله",
    no: "خیر",
    thanks: "از بازخورد شما سپاسگزاریم!",
    error: "ذخیره نشد. دوباره تلاش کنید.",
  },
  es: {
    question: "¿Te ayudó la respuesta?",
    yes: "Sí",
    no: "No",
    thanks: "¡Gracias por tu opinión!",
    error: "No se pudo guardar. Inténtalo de nuevo.",
  },
  pl: {
    question: "Czy odpowiedź była pomocna?",
    yes: "Tak",
    no: "Nie",
    thanks: "Dziękujemy za opinię!",
    error: "Nie udało się zapisać. Spróbuj ponownie.",
  },
};

interface AiAnswerFeedbackProps {
  mode: FeedbackMode;
  locale: string;
  agreementSlug?: string;
  submitted?: boolean;
  onSubmitted: (helpful: boolean) => void;
}

export default function AiAnswerFeedback({
  mode,
  locale,
  agreementSlug,
  submitted = false,
  onSubmitted,
}: AiAnswerFeedbackProps) {
  const [status, setStatus] = useState<FeedbackStatus>("idle");
  const [selected, setSelected] = useState<boolean | null>(null);
  const submittingRef = useRef(false);
  const labels = labelsByLocale[locale] || labelsByLocale.sv;

  async function submitFeedback(helpful: boolean) {
    if (submittingRef.current || submitted || status === "sent") return;

    submittingRef.current = true;
    setSelected(helpful);
    setStatus("sending");

    try {
      const response = await fetch("/api/chat-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ helpful, mode, locale, agreementSlug }),
        keepalive: true,
      });

      if (!response.ok) throw new Error("Feedback request failed");
      onSubmitted(helpful);
      setStatus("sent");
    } catch {
      submittingRef.current = false;
      setSelected(null);
      setStatus("error");
    }
  }

  return (
    <div className="mt-3 min-h-[76px] border-t border-[#C9D5CF] pt-2.5 text-xs">
      {submitted || status === "sent" ? (
        <p
          className="flex min-h-[55px] items-center font-medium text-[#285E52]"
          aria-live="polite"
        >
          {labels.thanks}
        </p>
      ) : (
        <>
          <p className="mb-1.5 text-text-secondary">{labels.question}</p>
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label={labels.question}
            aria-busy={status === "sending"}
          >
            <button
              type="button"
              onClick={() => submitFeedback(true)}
              disabled={status === "sending"}
              aria-pressed={selected === true}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-sm border border-[#C9D5CF] bg-white px-3 font-medium text-[#285E52] transition-colors hover:border-[#285E52] hover:bg-[#F4F7F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#285E52] focus-visible:ring-offset-1 disabled:cursor-wait disabled:opacity-60"
            >
              <ThumbsUp size={14} aria-hidden="true" />
              {labels.yes}
            </button>
            <button
              type="button"
              onClick={() => submitFeedback(false)}
              disabled={status === "sending"}
              aria-pressed={selected === false}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-sm border border-[#C9D5CF] bg-white px-3 font-medium text-[#285E52] transition-colors hover:border-[#285E52] hover:bg-[#F4F7F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#285E52] focus-visible:ring-offset-1 disabled:cursor-wait disabled:opacity-60"
            >
              <ThumbsDown size={14} aria-hidden="true" />
              {labels.no}
            </button>
          </div>
          {status === "error" && (
            <p className="mt-1.5 text-red-700" role="alert">
              {labels.error}
            </p>
          )}
        </>
      )}
    </div>
  );
}
