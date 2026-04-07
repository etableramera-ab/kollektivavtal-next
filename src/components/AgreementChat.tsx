"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll inside the chat container only — not the page
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          agreementSlug,
          history: messages.slice(-4),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Något gick fel. Försök igen.");
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch {
      setError("Kunde inte nå servern. Kontrollera din anslutning.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="px-5 py-4 sm:px-6" style={{ background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)" }}>
        <div className="flex items-center gap-2.5">
          <MessageSquare size={22} className="text-[#7C3AED] shrink-0" />
          <div>
            <h3 className="text-base font-bold text-white">
              AI-expert på {agreementName}
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
                  className="rounded-full bg-[#7C3AED] px-4 py-2 text-sm font-medium text-white hover:bg-[#6D28D9] transition-colors text-left"
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-[10px] px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#F1F5F9] text-text-primary"
                  : "bg-white border-l-[3px] border-l-[#7C3AED] text-text-primary shadow-sm"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border-l-[3px] border-l-[#7C3AED] rounded-[10px] px-4 py-3 shadow-sm">
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

        <div ref={messagesEndRef} />
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
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ställ en fråga om avtalet..."
          className="flex-1 rounded-[8px] border border-border bg-white px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-secondary focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED]"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-[8px] bg-[#7C3AED] text-white p-3 hover:bg-[#6D28D9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] flex items-center justify-center"
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
