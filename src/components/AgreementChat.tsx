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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    <div className="rounded-[12px] border border-border bg-white shadow-sm overflow-hidden">
      <div className="bg-primary p-4 sm:p-5">
        <div className="flex items-center gap-2 text-white">
          <MessageSquare size={20} />
          <h3 className="font-semibold">AI-expert på {agreementName}</h3>
        </div>
        <p className="text-sm text-white/70 mt-1">
          Ställ frågor om löner, OB, semester, uppsägning och mer
        </p>
      </div>

      <div className="h-[320px] sm:h-[380px] overflow-y-auto p-4 space-y-3 bg-background/50">
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
                  className="rounded-[8px] bg-white border border-border px-3 py-2 text-sm text-text-primary hover:border-accent hover:text-accent transition-colors text-left"
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
                  ? "bg-primary text-white"
                  : "bg-white border border-border text-text-primary"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-border rounded-[10px] px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-text-secondary/40 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-text-secondary/40 rounded-full animate-bounce [animation-delay:0.1s]" />
                <span className="w-2 h-2 bg-text-secondary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 text-sm text-accent bg-red-50 p-3 rounded-[8px]">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex items-center gap-2 p-3 border-t border-border"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ställ en fråga om avtalet..."
          className="flex-1 rounded-[8px] border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-[8px] bg-accent text-white p-3 hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Skicka"
        >
          <Send size={18} />
        </button>
      </form>

      <p className="px-4 pb-3 text-xs text-text-secondary">
        Powered by AI — svaren är vägledande och kan innehålla fel
      </p>
    </div>
  );
}
