"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, AlertCircle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import AiAnswerFeedback from "@/components/AiAnswerFeedback";
import {
  ChatRequestError,
  OPEN_AI_CHAT_EVENT,
  sendChatRequest,
  type ChatMessage,
} from "@/lib/chat-client";

interface AgreementChatProps {
  agreementSlug: string;
  agreementName: string;
  suggestedQuestions: string[];
}

export default function AgreementChat({
  agreementSlug,
  agreementName,
  suggestedQuestions,
}: AgreementChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedbackByMessage, setFeedbackByMessage] = useState<
    Record<number, boolean>
  >({});
  const chatRootRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const latestAssistantRef = useRef<HTMLDivElement>(null);
  const positionedAssistantRef = useRef<ChatMessage | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const requestInFlightRef = useRef(false);
  const focusTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const focusChat = () => {
      chatRootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      if (focusTimerRef.current !== null) {
        window.clearTimeout(focusTimerRef.current);
      }
      focusTimerRef.current = window.setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 350);
    };

    window.addEventListener(OPEN_AI_CHAT_EVENT, focusChat);
    return () => {
      window.removeEventListener(OPEN_AI_CHAT_EVENT, focusChat);
      if (focusTimerRef.current !== null) {
        window.clearTimeout(focusTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const latestMessage = messages[messages.length - 1];
    const hasNewAnswer =
      !loading &&
      latestMessage?.role === "assistant" &&
      positionedAssistantRef.current !== latestMessage;

    const frame = window.requestAnimationFrame(() => {
      const answer = latestAssistantRef.current;
      const useMobileAnswerPosition = window.matchMedia(
        "(max-width: 639px)"
      ).matches;

      if (hasNewAnswer && useMobileAnswerPosition && answer) {
        const containerTop = container.getBoundingClientRect().top;
        const answerTop = answer.getBoundingClientRect().top;
        container.scrollTo({
          top: Math.max(
            0,
            container.scrollTop + answerTop - containerTop - 12
          ),
          behavior: "smooth",
        });
      } else {
        // Keep the current, natural follow-to-bottom behaviour while waiting
        // and on larger screens. Only the chat viewport moves, never the page.
        container.scrollTop = container.scrollHeight;
      }

      if (hasNewAnswer) positionedAssistantRef.current = latestMessage;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [messages, loading]);

  async function sendMessage(text: string) {
    const question = text.trim();
    if (!question || requestInFlightRef.current) return;

    requestInFlightRef.current = true;
    const userMessage: ChatMessage = { role: "user", content: question };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const result = await sendChatRequest({
        message: question,
        mode: "agreement",
        agreementSlug,
        history: messages.slice(-4),
        locale: "sv",
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: result.response,
          source: result.source,
        },
      ]);
    } catch (requestError) {
      setMessages((prev) => prev.filter((message) => message !== userMessage));
      setInput(question);
      setError(
        requestError instanceof ChatRequestError
          ? requestError.message
          : "Något gick fel. Försök igen."
      );
    } finally {
      requestInFlightRef.current = false;
      setLoading(false);
    }
  }

  return (
    <div
      ref={chatRootRef}
      data-inline-agreement-chat="true"
      className="rounded-xl border border-border bg-white shadow-sm overflow-hidden"
    >
      {/* Header bar */}
      <div className="px-5 py-4 sm:px-6 bg-[#164B3F]">
        <div className="flex items-center gap-2.5">
          <MessageSquare size={22} className="shrink-0 text-white/80" />
          <div className="min-w-0">
            <h3 className="text-base font-bold text-white">
              AI-guide till {agreementName}
            </h3>
            <p className="text-sm text-white/70 mt-0.5">
              Ställ frågor om löner, OB, semester, uppsägning och mer
            </p>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div ref={chatContainerRef} className="h-[320px] sm:h-[380px] overflow-y-auto p-4 sm:p-5 space-y-3 bg-white">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-text-secondary mb-4">
              Välj en fråga eller skriv din egen
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="w-full rounded-sm bg-[#285E52] px-4 py-2 text-left text-sm font-medium text-white transition-colors hover:bg-[#164B3F] sm:w-auto"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <motion.div
            key={i}
            ref={
              msg.role === "assistant" && i === messages.length - 1
                ? latestAssistantRef
                : undefined
            }
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-full rounded-[10px] px-4 py-2.5 text-sm leading-relaxed sm:max-w-[85%] ${
                msg.role === "user"
                  ? "bg-[#F1F5F9] text-text-primary"
                  : "bg-white border-l-[3px] border-l-[#285E52] text-text-primary shadow-sm"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
              {msg.role === "assistant" && msg.source && (
                <a
                  href={msg.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#285E52] underline decoration-[#285E52]/30 underline-offset-2 hover:text-[#164B3F]"
                >
                  Källa: {msg.source.label}
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              )}
              {msg.role === "assistant" && (
                <AiAnswerFeedback
                  mode="agreement"
                  locale="sv"
                  agreementSlug={agreementSlug}
                  submitted={feedbackByMessage[i] !== undefined}
                  onSubmitted={(helpful) =>
                    setFeedbackByMessage((current) => ({
                      ...current,
                      [i]: helpful,
                    }))
                  }
                />
              )}
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border-l-[3px] border-l-[#285E52] rounded-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-text-secondary/40 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-text-secondary/40 rounded-full animate-bounce [animation-delay:0.1s]" />
                <span className="w-2 h-2 bg-text-secondary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 p-3 rounded-[8px]">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex items-center gap-2 p-3 sm:p-4 border-t border-border"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={1500}
          placeholder="Ställ en fråga om avtalet..."
          className="min-w-0 flex-1 rounded-sm border border-border bg-white px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-secondary focus:ring-2 focus:ring-[#285E52]/20 focus:border-[#285E52]"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-sm bg-[#285E52] text-white p-3 hover:bg-[#164B3F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Skicka"
        >
          <Send size={18} />
        </button>
      </form>

      <p className="px-4 pb-3 text-xs text-[#94A3B8]">
        Powered by AI — svaren är vägledande och kan innehålla fel
      </p>
    </div>
  );
}
