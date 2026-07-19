"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/useLocale";
import {
  ChatRequestError,
  OPEN_AI_CHAT_EVENT,
  sendChatRequest,
  type ChatMessage,
} from "@/lib/chat-client";

const chatTexts: Record<string, { label: string; title: string; subtitle: string; placeholder: string; disclaimer: string; questions: string[] }> = {
  sv: { label: "Fråga om ditt avtal", title: "AI-guide till kollektivavtal", subtitle: "Allmän vägledning — välj ett källverifierat avtal för avtalsspecifika svar", placeholder: "Ställ en fråga om ditt avtal...", disclaimer: "AI-svar är vägledande och kan innehålla fel", questions: ["Hur hittar jag mitt avtal?", "Vad är OB-tillägg?", "Vad innebär föräldralön?", "Hur fungerar uppsägningstid?"] },
  en: { label: "Ask about your agreement", title: "AI guide to collective agreements", subtitle: "General guidance — choose a source-backed agreement for specific answers", placeholder: "Ask a question about your agreement...", disclaimer: "AI answers are for guidance and may contain errors", questions: ["How do I find my agreement?", "What are unsocial hours supplements?", "What is parental pay?", "How does a notice period work?"] },
  ar: { label: "اسأل عن اتفاقيتك", title: "دليل الاتفاقيات الجماعية", subtitle: "إرشادات عامة — اختر اتفاقية موثقة للحصول على إجابات محددة", placeholder: "...اطرح سؤالاً عن اتفاقيتك", disclaimer: "إجابات الذكاء الاصطناعي إرشادية وقد تحتوي على أخطاء", questions: ["كيف أجد اتفاقيتي؟", "ما هو بدل الأوقات غير الاجتماعية؟", "ما هو أجر الوالدين؟"] },
  so: { label: "Ka weydii heshiiskaaga", title: "Hagaha heshiisyada shaqaalaha", subtitle: "Hagid guud — dooro heshiis la xaqiijiyay si aad u hesho jawaabo gaar ah", placeholder: "Su'aal ka weydii heshiiskaaga...", disclaimer: "Jawaabaha AI waa hagid", questions: ["Sideen ku helaa heshiiskayga?", "Maxay yihiin lacagaha OB?"] },
  fa: { label: "درباره قراردادتان بپرسید", title: "راهنمای قراردادهای جمعی", subtitle: "راهنمای عمومی — برای پاسخ دقیق یک قرارداد دارای منبع را انتخاب کنید", placeholder: "سوالی درباره قراردادتان بپرسید...", disclaimer: "پاسخ‌های هوش مصنوعی راهنما هستند", questions: ["چگونه قرارداد خود را پیدا کنم؟", "فوق‌العاده ساعات غیراجتماعی چیست؟"] },
  es: { label: "Pregunta sobre tu convenio", title: "Guía de convenios colectivos", subtitle: "Orientación general: elige un convenio verificado para respuestas específicas", placeholder: "Haz una pregunta sobre tu convenio...", disclaimer: "Las respuestas de IA son orientativas", questions: ["¿Cómo encuentro mi convenio?", "¿Qué es el complemento por horas no sociales?"] },
  pl: { label: "Zapytaj o swój układ", title: "Przewodnik po układach zbiorowych", subtitle: "Informacje ogólne — wybierz układ ze źródłami, aby uzyskać szczegółowe odpowiedzi", placeholder: "Zadaj pytanie o swój układ...", disclaimer: "Odpowiedzi AI mają charakter orientacyjny", questions: ["Jak znaleźć swój układ?", "Co to jest dodatek za godziny niespołeczne?"] },
};

const chatControls: Record<string, { dismissHint: string; openChat: string; closeChat: string; chooseQuestion: string; send: string; genericError: string; networkError: string; timeoutError: string }> = {
  sv: { dismissHint: "Dölj chattips", openChat: "Öppna AI-chatten", closeChat: "Stäng chatten", chooseQuestion: "Välj en fråga eller skriv din egen", send: "Skicka", genericError: "Något gick fel", networkError: "Kunde inte ansluta till tjänsten", timeoutError: "AI-guiden hann inte svara. Försök igen." },
  en: { dismissHint: "Hide chat hint", openChat: "Open AI chat", closeChat: "Close chat", chooseQuestion: "Choose a question or write your own", send: "Send", genericError: "Something went wrong", networkError: "Could not connect to the service", timeoutError: "The AI guide did not respond in time. Please try again." },
  ar: { dismissHint: "إخفاء تلميح المحادثة", openChat: "فتح محادثة الذكاء الاصطناعي", closeChat: "إغلاق المحادثة", chooseQuestion: "اختر سؤالًا أو اكتب سؤالك", send: "إرسال", genericError: "حدث خطأ ما", networkError: "تعذر الاتصال بالخدمة", timeoutError: "لم يصل رد في الوقت المحدد. حاول مرة أخرى." },
  so: { dismissHint: "Qari tilmaanta wada sheekaysiga", openChat: "Fur wada sheekaysiga AI", closeChat: "Xir wada sheekaysiga", chooseQuestion: "Dooro su'aal ama qor su'aashaada", send: "Dir", genericError: "Waxbaa khaldamay", networkError: "Lama xiriiri karin adeegga", timeoutError: "Haguhu waqtigii loogu talagalay kuma jawaabin. Mar kale isku day." },
  fa: { dismissHint: "پنهان کردن راهنمای گفت‌وگو", openChat: "باز کردن گفت‌وگو با هوش مصنوعی", closeChat: "بستن گفت‌وگو", chooseQuestion: "یک پرسش را انتخاب کنید یا پرسش خود را بنویسید", send: "ارسال", genericError: "مشکلی پیش آمد", networkError: "اتصال به سرویس برقرار نشد", timeoutError: "پاسخ راهنما به‌موقع نرسید. دوباره تلاش کنید." },
  es: { dismissHint: "Ocultar sugerencia del chat", openChat: "Abrir chat con la IA", closeChat: "Cerrar chat", chooseQuestion: "Elige una pregunta o escribe la tuya", send: "Enviar", genericError: "Algo salió mal", networkError: "No se pudo conectar con el servicio", timeoutError: "La guía no respondió a tiempo. Inténtalo de nuevo." },
  pl: { dismissHint: "Ukryj podpowiedź czatu", openChat: "Otwórz czat AI", closeChat: "Zamknij czat", chooseQuestion: "Wybierz pytanie lub napisz własne", send: "Wyślij", genericError: "Coś poszło nie tak", networkError: "Nie udało się połączyć z usługą", timeoutError: "Przewodnik AI nie odpowiedział na czas. Spróbuj ponownie." },
};

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [labelDismissed, setLabelDismissed] = useState(false);
  const [hasInlineChat, setHasInlineChat] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const latestAssistantRef = useRef<HTMLDivElement>(null);
  const positionedAssistantRef = useRef<ChatMessage | null>(null);
  const wasOpenRef = useRef(open);
  const requestInFlightRef = useRef(false);
  const pathname = usePathname();
  const { locale } = useLocale();
  const t = chatTexts[locale] || chatTexts.sv;
  const controls = chatControls[locale] || chatControls.sv;
  const isRTL = locale === "ar" || locale === "fa";

  const pathSegments = pathname.split("/").filter(Boolean);
  const agreementSegment = pathSegments.indexOf("avtal");
  const isAgreementDetail =
    agreementSegment >= 0 && pathSegments.length === agreementSegment + 2;
  const hideButton = isAgreementDetail || hasInlineChat;

  useEffect(() => {
    setHasInlineChat(
      Boolean(document.querySelector("[data-inline-agreement-chat='true']"))
    );
  }, [pathname]);

  useEffect(() => {
    const openChat = () => {
      if (document.querySelector("[data-inline-agreement-chat='true']")) return;
      setOpen(true);
    };

    window.addEventListener(OPEN_AI_CHAT_EVENT, openChat);
    return () => window.removeEventListener(OPEN_AI_CHAT_EVENT, openChat);
  }, []);

  useEffect(() => {
    if (hideButton) setOpen(false);
  }, [hideButton]);

  useEffect(() => {
    const hasReopened = open && !wasOpenRef.current;
    wasOpenRef.current = open;

    const container = chatRef.current;
    if (!container) return;

    const latestMessage = messages[messages.length - 1];
    const hasNewAnswer =
      !loading &&
      latestMessage?.role === "assistant" &&
      positionedAssistantRef.current !== latestMessage;
    const shouldShowAnswerStart =
      !loading &&
      !error &&
      latestMessage?.role === "assistant" &&
      (hasNewAnswer || hasReopened);

    const frame = window.requestAnimationFrame(() => {
      const answer = latestAssistantRef.current;
      const useMobileAnswerPosition = window.matchMedia(
        "(max-width: 639px)"
      ).matches;

      if (shouldShowAnswerStart && useMobileAnswerPosition && answer) {
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
        container.scrollTop = container.scrollHeight;
      }

      if (hasNewAnswer) positionedAssistantRef.current = latestMessage;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [messages, loading, open, error]);

  async function sendMessage(text: string) {
    const question = text.trim();
    if (!question || requestInFlightRef.current) return;

    requestInFlightRef.current = true;
    const userMsg: ChatMessage = { role: "user", content: question };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const result = await sendChatRequest({
        message: question,
        mode: "global",
        history: messages.slice(-4),
        locale,
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.response },
      ]);
    } catch (requestError) {
      setMessages((prev) => prev.filter((message) => message !== userMsg));
      setInput(question);

      if (requestError instanceof ChatRequestError) {
        if (requestError.kind === "timeout") {
          setError(controls.timeoutError);
        } else if (requestError.kind === "network") {
          setError(controls.networkError);
        } else {
          setError(locale === "sv" ? requestError.message : controls.genericError);
        }
      } else {
        setError(controls.genericError);
      }
    } finally {
      requestInFlightRef.current = false;
      setLoading(false);
    }
  }

  if (hideButton) return null;

  return (
    <>
      {/* Floating button */}
      {!open && (
        <div className={`fixed bottom-4 z-50 flex items-center gap-3 sm:bottom-6 ${isRTL ? "left-4 sm:left-6 flex-row-reverse" : "right-4 sm:right-6"}`}>
          {!labelDismissed && (
            <div className="hidden sm:flex items-center gap-2 bg-[#FBFAF7] border border-[#D8D1C5] rounded-sm px-4 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
              <span className="text-[14px] font-semibold text-[#285E52]">{t.label}</span>
              <button
                onClick={() => setLabelDismissed(true)}
                aria-label={controls.dismissHint}
                className="text-[#285E52]/50 hover:text-[#164B3F]"
              >
                <X size={14} />
              </button>
            </div>
          )}
          <button
            onClick={() => setOpen(true)}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-sm flex items-center justify-center bg-[#285E52] shadow-[0_4px_16px_rgba(22,75,63,0.24)] hover:bg-[#164B3F] transition-colors duration-150"
            aria-label={controls.openChat}
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
            className={`fixed bottom-0 sm:bottom-6 z-[51] w-full sm:w-[400px] h-[75dvh] sm:h-[500px] sm:rounded-sm bg-[#FBFAF7] shadow-[0_-4px_32px_rgba(0,0,0,0.15)] sm:shadow-[0_4px_32px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden ${isRTL ? "left-0 sm:left-6" : "right-0 sm:right-6"}`}
          >
            {/* Header */}
            <div className="px-5 py-4 flex items-center justify-between shrink-0 bg-[#164B3F]">
              <div>
                <p className="text-[16px] font-semibold text-white">{t.title}</p>
                <p className="text-[13px] text-white/80">{t.subtitle}</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white p-1" aria-label={controls.closeChat}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-sm text-text-secondary mb-3">{controls.chooseQuestion}</p>
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
                <div
                  key={i}
                  ref={
                    msg.role === "assistant" && i === messages.length - 1
                      ? latestAssistantRef
                      : undefined
                  }
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
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
                maxLength={1500}
                placeholder={t.placeholder}
                className="flex-1 h-11 rounded-sm border border-[#D8D1C5] bg-white px-4 text-[15px] outline-none placeholder:text-text-secondary focus:ring-2 focus:ring-[#285E52]/20 focus:border-[#285E52]"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="h-11 w-11 rounded-sm bg-[#285E52] hover:bg-[#164B3F] flex items-center justify-center text-white disabled:opacity-50 transition-colors shrink-0"
                aria-label={controls.send}
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
