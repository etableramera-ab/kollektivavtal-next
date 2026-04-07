"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickQuestions = [
  "Vad tjänar en undersköterska?",
  "Vad är OB-tillägg?",
  "Har jag rätt till föräldralön?",
  "Vilken uppsägningstid gäller?",
];

// Pages where inline chat already exists — hide floating button
const inlineChatPaths = ["/yrke/"];

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [labelDismissed, setLabelDismissed] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const hideButton = inlineChatPaths.some((p) => pathname.startsWith(p) && pathname !== p);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          agreementSlug: "handelsavtalet",
          history: messages.slice(-4),
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Något gick fel."); return; }
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch {
      setError("Kunde inte nå servern.");
    } finally {
      setLoading(false);
    }
  }

  if (hideButton) return null;

  return (
    <>
      {/* Floating button */}
      {!open && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 sm:bottom-6 sm:right-6">
          {!labelDismissed && (
            <div className="hidden sm:flex items-center gap-2 bg-white border border-[#DDD6FE] rounded-full px-4 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
              <span className="text-[13px] font-semibold text-[#7C3AED]">Fråga om ditt avtal</span>
              <button onClick={() => setLabelDismissed(true)} className="text-[#7C3AED]/50 hover:text-[#7C3AED]">
                <X size={14} />
              </button>
            </div>
          )}
          <button
            onClick={() => setOpen(true)}
            className="w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(124,58,237,0.35)] hover:scale-[1.08] hover:shadow-[0_6px_28px_rgba(124,58,237,0.45)] transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)" }}
            aria-label="Öppna AI-chatt"
          >
            <MessageCircle size={28} className="text-white" />
          </button>
        </div>
      )}

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[51] w-full sm:w-[400px] h-[80vh] sm:h-[500px] sm:rounded-2xl rounded-t-2xl bg-white shadow-[0_-4px_40px_rgba(0,0,0,0.15)] sm:shadow-[0_4px_40px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 flex items-center justify-between shrink-0" style={{ background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)" }}>
              <div>
                <p className="text-[16px] font-semibold text-white">AI-expert på kollektivavtal</p>
                <p className="text-[13px] text-white/80">Svarar på frågor om alla 617 avtal</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white p-1" aria-label="Stäng chatt">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-sm text-text-secondary mb-3">Välj en fråga eller skriv din egen</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {quickQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="rounded-full bg-[#F5F3FF] px-4 py-2 text-[13px] font-medium text-[#7C3AED] border border-[#DDD6FE] hover:bg-[#7C3AED] hover:text-white transition-colors text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#F0EEED] text-text-primary"
                      : "bg-[#F5F3FF] text-text-primary border border-[#DDD6FE]"
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#7C3AED]/40 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-[#7C3AED]/40 rounded-full animate-bounce [animation-delay:0.1s]" />
                      <span className="w-2 h-2 bg-[#7C3AED]/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 p-3 rounded-lg">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="flex items-center gap-2 p-3 border-t border-[#DDD6FE] shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ställ en fråga om ditt avtal..."
                className="flex-1 h-11 rounded-lg border border-[#DDD6FE] px-4 text-sm outline-none placeholder:text-text-secondary focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED]"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="h-11 w-11 rounded-lg flex items-center justify-center text-white disabled:opacity-50 transition-colors shrink-0"
                style={{ background: "#7C3AED" }}
                aria-label="Skicka"
              >
                <Send size={18} />
              </button>
            </form>
            <p className="px-4 pb-2 text-[11px] text-[#6B7280]">AI-svar är vägledande och kan innehålla fel</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
