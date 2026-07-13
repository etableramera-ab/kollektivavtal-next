"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Landmark,
  Shield,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Check,
} from "lucide-react";
import { finderData } from "@/data/agreement-finder";
import { getAgreementBySlug } from "@/data/agreements";
import { isVerifiedAgreement } from "@/lib/verified-agreements";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const sectorIcons = {
  privat: Building2,
  kommun_region: Landmark,
  stat: Shield,
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
  }),
};

// Render step 1 visible in SSR; only animate enters once the user has navigated.
function getInitial(step: number, hasInteracted: boolean) {
  return step === 1 && !hasInteracted ? false : "enter";
}

export default function HittaAvtal() {
  const [step, setStep] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [direction, setDirection] = useState(1);
  const [sectorIdx, setSectorIdx] = useState<number | null>(null);
  const [branchIdx, setBranchIdx] = useState<number | null>(null);
  const [occupationIdx, setOccupationIdx] = useState<number | null>(null);

  const sector = sectorIdx !== null ? finderData[sectorIdx] : null;
  const branch = sector && branchIdx !== null ? sector.branches[branchIdx] : null;
  const occupation =
    branch && occupationIdx !== null ? branch.occupations[occupationIdx] : null;
  const agreement =
    occupation?.agreementSlug && isVerifiedAgreement(occupation.agreementSlug)
      ? getAgreementBySlug(occupation.agreementSlug)
      : null;

  function goTo(s: number) {
    setHasInteracted(true);
    setDirection(s > step ? 1 : -1);
    setStep(s);
  }

  function goBack() {
    if (step === 2) {
      setSectorIdx(null);
      goTo(1);
    } else if (step === 3) {
      setBranchIdx(null);
      goTo(2);
    } else if (step === 4) {
      setOccupationIdx(null);
      goTo(3);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-dark text-white pt-10 pb-10 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl md:text-[56px]" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
              Hitta ditt kollektivavtal
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Svara på tre frågor så hittar vi rätt avtal för dig
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* AEO box */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-r-lg border-l-[3px] border-l-primary bg-[#F0FDFA] p-4 sm:p-5">
            <p className="text-sm text-text-primary leading-relaxed">
              Du hittar ditt kollektivavtal genom att välja bransch och yrke nedan. På den svenska
              arbetsmarknaden finns drygt 600 centrala kollektivavtal och 88% av alla anställda omfattas.
            </p>
          </div>
        </div>
      </section>

      {/* Progress bar */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex-1">
              <div
                className={`h-1.5 rounded-full transition-colors ${
                  s <= step ? "bg-accent" : "bg-border"
                }`}
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-text-secondary mt-2">
          Steg {step} av 4
        </p>
      </div>

      {/* Wizard */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {step > 1 && (
            <button
              onClick={goBack}
              className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary mb-6 min-h-[44px] transition-colors"
            >
              <ArrowLeft size={16} />
              Tillbaka
            </button>
          )}

          <AnimatePresence mode="wait" custom={direction}>
            {/* Step 1: Sector */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial={getInitial(1, hasInteracted)}
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-6">
                  Inom vilken sektor arbetar du?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {finderData.map((s, i) => {
                    const Icon = sectorIcons[s.value];
                    return (
                      <motion.button
                        key={s.value}
                        whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
                        transition={{ duration: 0.2 }}
                        onClick={() => {
                          setSectorIdx(i);
                          goTo(2);
                        }}
                        className="rounded-sm border border-border bg-card p-6 text-left hover:border-primary transition-colors"
                      >
                        <Icon size={28} className="text-accent mb-3" />
                        <p className="font-semibold text-text-primary">{s.label}</p>
                        <p className="text-sm text-text-secondary mt-1">{s.description}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Branch */}
            {step === 2 && sector && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-6">
                  Vilken bransch jobbar du inom?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sector.branches.map((b, i) => (
                    <motion.button
                      key={b.label}
                      whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
                      transition={{ duration: 0.2 }}
                      onClick={() => {
                        setBranchIdx(i);
                        goTo(3);
                      }}
                      className="rounded-sm border border-border bg-card p-4 sm:p-5 text-left hover:border-primary transition-colors"
                    >
                      <p className="font-semibold text-text-primary text-sm">{b.label}</p>
                      <p className="text-xs text-text-secondary mt-1">
                        {b.occupations.length} yrkesgrupper
                      </p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Occupation */}
            {step === 3 && branch && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-6">
                  Vilken yrkesgrupp tillhör du?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {branch.occupations.map((o, i) => (
                    <motion.button
                      key={o.label}
                      whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
                      transition={{ duration: 0.2 }}
                      onClick={() => {
                        setOccupationIdx(i);
                        goTo(4);
                      }}
                      className="rounded-sm border border-border bg-card p-4 sm:p-5 text-left hover:border-primary transition-colors"
                    >
                      <p className="font-semibold text-text-primary text-sm">{o.label}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Result */}
            {step === 4 && occupation && (
              <motion.div
                key="step4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {agreement ? (
                  <div className="space-y-6">
                    <div className="rounded-sm border-2 border-accent bg-card p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Check size={20} className="text-success" />
                        <p className="text-sm font-medium text-success">Avtal hittat</p>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
                        {agreement.name}
                      </h2>
                      <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                        {agreement.summary}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="rounded-sm border border-border bg-card p-4">
                        <p className="text-xs text-text-secondary">Lägsta lön</p>
                        <p className="text-sm font-semibold text-text-primary mt-0.5">
                          {agreement.keyFacts.minimumWage}
                        </p>
                      </div>
                      <div className="rounded-sm border border-border bg-card p-4">
                        <p className="text-xs text-text-secondary">OB natt</p>
                        <p className="text-sm font-semibold text-text-primary mt-0.5">
                          {agreement.keyFacts.obNight}
                        </p>
                      </div>
                      <div className="rounded-sm border border-border bg-card p-4">
                        <p className="text-xs text-text-secondary">Semester</p>
                        <p className="text-sm font-semibold text-text-primary mt-0.5">
                          {agreement.keyFacts.vacationDays}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href={`/avtal/${agreement.slug}`}
                        className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-accent text-white px-6 py-3 text-sm font-medium hover:bg-accent/90 transition-colors min-h-[44px]"
                      >
                        Läs hela sammanfattningen <ArrowRight size={16} />
                      </Link>
                      <button
                        onClick={() => { const btn = document.querySelector("[aria-label='Öppna AI-chatt']") as HTMLButtonElement; btn?.click(); }}
                        className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white min-h-[44px] transition-all hover:-translate-y-px"
                        style={{ background: "#285E52" }}
                      >
                        <MessageSquare size={16} />
                        Fråga AI-guiden
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="rounded-sm border border-border bg-card p-6">
                      <h2 className="text-xl font-bold text-text-primary mb-2">
                        Vi arbetar med att lägga till detta avtal
                      </h2>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        Avtalet för {occupation.label} inom {branch?.label} finns ännu inte i vår
                        databas. Vi arbetar med att verifiera och förbättra avtalsguiden och lägger
                        till fler avtal med tydligt källunderlag löpande.
                      </p>
                    </div>

                    <div className="rounded-sm border border-border bg-card p-5">
                      <p className="text-sm text-text-secondary">
                        Tipsa gärna om en officiell källa via{" "}
                        <a href="mailto:info@kollektivavtal.ai" className="text-accent hover:underline">
                          info@kollektivavtal.ai
                        </a>.
                      </p>
                    </div>

                    <Link
                      href="/avtal"
                      className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline min-h-[44px]"
                    >
                      Se alla tillgängliga avtal <ArrowRight size={14} />
                    </Link>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
