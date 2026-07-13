"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/useLocale";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const chatTexts: Record<string, { label: string; title: string; subtitle: string; placeholder: string; disclaimer: string; questions: string[] }> = {
  sv: { label: "Fråga om ditt avtal", title: "AI-guide till kollektivavtal", subtitle: "Allmän vägledning — välj ett källverifierat avtal för exakta svar", placeholder: "Ställ en fråga om ditt avtal...", disclaimer: "AI-svar är vägledande och kan innehålla fel", questions: ["Hur hittar jag mitt avtal?", "Vad är OB-tillägg?", "Vad innebär föräldralön?", "Hur fungerar uppsägningstid?"] },
  en: { label: "Ask about your agreement", title: "AI guide to collective agreements", subtitle: "General guidance — choose a source-backed agreement for specific answers", placeholder: "Ask a question about your agreement...", disclaimer: "AI answers are for guidance and may contain errors", questions: ["How do I find my agreement?", "What are unsocial hours supplements?", "What is parental pay?", "How does a notice period work?"] },
  ar: { label: "اسأل عن اتفاقيتك", title: "دليل الاتفاقيات الجماعية", subtitle: "إرشادات عامة — اختر اتفاقية موثقة للحصول على إجابات محددة", placeholder: "...اطرح سؤالاً عن اتفاقيتك", disclaimer: "إجابات الذكاء الاصطناعي إرشادية وقد تحتوي على أخطاء", questions: ["كيف أجد اتفاقيتي؟", "ما هو بدل الأوقات غير الاجتماعية؟", "ما هو أجر الوالدين؟"] },
  so: { label: "Ka weydii heshiiskaaga", title: "Hagaha heshiisyada shaqaalaha", subtitle: "Hagid guud — dooro heshiis la xaqiijiyay si aad u hesho jawaabo gaar ah", placeholder: "Su'aal ka weydii heshiiskaaga...", disclaimer: "Jawaabaha AI waa hagid", questions: ["Sideen ku helaa heshiiskayga?", "Maxay yihiin lacagaha OB?"] },
  fa: { label: "درباره قراردادتان بپرسید", title: "راهنمای قراردادهای جمعی", subtitle: "راهنمای عمومی — برای پاسخ دقیق یک قرارداد دارای منبع را انتخاب کنید", placeholder: "سوالی درباره قراردادتان بپرسید...", disclaimer: "پاسخ‌های هوش مصنوعی راهنما هستند", questions: ["چگونه قرارداد خود را پیدا کنم؟", "فوق‌العاده ساعات غیراجتماعی چیست؟"] },
  es: { label: "Pregunta sobre tu convenio", title: "Guía de convenios colectivos", subtitle: "Orientación general: elige un convenio verificado para respuestas específicas", placeholder: "Haz una pregunta sobre tu convenio...", disclaimer: "Las respuestas de IA son orientativas", questions: ["¿Cómo encuentro mi convenio?", "¿Qué es el complemento por horas no sociales?"] },
  pl: { label: "Zapytaj o swój układ", title: "Przewodnik po układach zbiorowych", subtitle: "Informacje ogólne — wybierz układ ze źródłami, aby uzyskać szczegółowe odpowiedzi", placeholder: "Zadaj pytanie o swój układ...", disclaimer: "Odpowiedzi AI mają charakter orientacyjny", questions: ["Jak znaleźć swój układ?", "Co to jest dodatek za godziny niespołeczne?"] },
};

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
  const { locale } = useLocale();
  const t = chatTexts[locale] || chatTexts.sv;

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
          mode: "global",
          history: messages.slice(-4),
          locale,
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
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 sm:bottom-6 sm:right-6">
          {!labelDismissed && (
            <div className="hidden sm:flex items-center gap-2 bg-[#FBFAF7] border border-[#D8D1C5] rounded-sm px-4 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
              <span className="text-[14px] font-semibold text-[#285E52]">{t.label}</span>
              <button
                onClick={() => setLabelDismissed(true)}
                aria-label="Dölj chattips"
                className="text-[#285E52]/50 hover:text-[#164B3F]"
              >
                <X size={14} />
              </button>
            </div>
          )}
          <button
            onClick={() => setOpen(true)}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-sm flex items-center justify-center bg-[#285E52] shadow-[0_4px_16px_rgba(22,75,63,0.24)] hover:bg-[#164B3F] transition-colors duration-150"
            aria-label="Öppna AI-chatt"
          >
            <MessageCircle size={24} className="text-white sm:w-7 sm:h-7" />
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
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[51] w-full sm:w-[400px] h-[75dvh] sm:h-[500px] sm:rounded-sm bg-[#FBFAF7] shadow-[0_-4px_32px_rgba(0,0,0,0.15)] sm:shadow-[0_4px_32px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 flex items-center justify-between shrink-0 bg-[#164B3F]">
              <div>
                <p className="text-[16px] font-semibold text-white">{t.title}</p>
                <p className="text-[13px] text-white/80">{t.subtitle}</p>
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
                    {t.questions.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="rounded-sm bg-[#E8EEE9] px-4 py-2 text-[14px] font-medium text-[#285E52] border border-[#C9D5CF] hover:bg-[#285E52] hover:text-white transition-colors text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-sm px-4 py-2.5 text-[15px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#F0EEED] text-text-primary"
                      : "bg-[#E8EEE9] text-text-primary border border-[#C9D5CF]"
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#E8EEE9] border border-[#C9D5CF] rounded-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#285E52]/40 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-[#285E52]/40 rounded-full animate-bounce [animation-delay:0.1s]" />
                      <span className="w-2 h-2 bg-[#285E52]/40 rounded-full animate-bounce [animation-delay:0.2s]" />
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
              className="flex items-center gap-2 p-3 border-t border-[#D8D1C5] shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                className="flex-1 h-11 rounded-sm border border-[#D8D1C5] bg-white px-4 text-[15px] outline-none placeholder:text-text-secondary focus:ring-2 focus:ring-[#285E52]/20 focus:border-[#285E52]"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="h-11 w-11 rounded-sm bg-[#285E52] hover:bg-[#164B3F] flex items-center justify-center text-white disabled:opacity-50 transition-colors shrink-0"
                aria-label="Skicka"
              >
                <Send size={18} />
              </button>
            </form>
            <p className="px-4 pb-2 text-[11px] text-[#6B7280]">{t.disclaimer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
