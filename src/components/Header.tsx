"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocale } from "@/lib/useLocale";

const toolPaths = ["/hitta-avtal", "/lonekalkylator", "/jamfor"];

export default function Header() {
  const { dict } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const mainLinks = [
    { href: "/avtal", label: dict.nav.agreements, match: "/avtal" },
    { href: "/yrke", label: dict.nav.occupations, match: "/yrke" },
    { href: "/statistik", label: dict.nav.statistics, match: "/statistik" },
    { href: "/rattsfall", label: dict.nav.courtCases, match: "/rattsfall" },
    { href: "/blogg", label: dict.nav.blog, match: "/blogg" },
  ];

  const toolLinks = [
    { href: "/hitta-avtal", label: dict.nav.findAgreement },
    { href: "/lonekalkylator", label: dict.nav.calculator },
    { href: "/jamfor", label: dict.compare.compare },
    { href: "/statistik/avtalsrorelsen", label: dict.home.bargainingRound },
  ];

  const mobileLinks = [
    { href: "/avtal", label: dict.nav.agreements },
    { href: "/yrke", label: dict.nav.occupations },
    { href: "/hitta-avtal", label: dict.nav.findAgreement },
    { href: "/lonekalkylator", label: dict.nav.calculator },
    { href: "/jamfor", label: dict.compare.compare },
    { href: "/statistik", label: dict.nav.statistics },
    { href: "/rattsfall", label: dict.nav.courtCases },
    { href: "/blogg", label: dict.nav.blog },
  ];

  const isToolActive = toolPaths.some((p) => pathname.startsWith(p));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled ? "shadow-md" : ""
      }`}
      style={{ background: "linear-gradient(90deg, #0D5E58 0%, #0F766E 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" style={{ fontFamily: "'DM Serif Display', serif", fontSize: '22px', fontWeight: 400, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
            kollektivavtal.ai
          </Link>

          <nav className="hidden lg:flex items-center gap-5">
            {mainLinks.map((link) => {
              const active = pathname.startsWith(link.match);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors pb-1 ${
                    active
                      ? "text-white border-b-2 border-accent"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors pb-1 ${
                  isToolActive
                    ? "text-white border-b-2 border-accent"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {dict.home.tools}
                <ChevronDown size={14} className={`transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
              </button>
              {toolsOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-border py-2 z-50">
                  {toolLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setToolsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-text-primary hover:bg-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                const btn = document.querySelector("[aria-label='Öppna AI-chatt']") as HTMLButtonElement;
                btn?.click();
              }}
              className="px-3.5 py-1.5 text-sm font-semibold text-white rounded-md transition-all duration-200 hover:bg-[rgba(124,58,237,0.35)]"
              style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)" }}
            >
              💬 Fråga AI
            </button>
            <Link
              href="/hitta-avtal"
              className="ml-1 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:-translate-y-px active:translate-y-0 rounded-md transition-all duration-200 shadow-[0_2px_8px_rgba(217,119,6,0.25)] hover:shadow-[0_4px_16px_rgba(217,119,6,0.35)]"
              style={{ background: "linear-gradient(135deg, #D97706 0%, #B45309 100%)" }}
            >
              Hitta ditt avtal
            </Link>
            <LanguageSwitcher />
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-3 -mr-3 text-white/80 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Meny"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-4">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="text-xl text-primary"
                style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}
              >
                kollektivavtal.ai
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-3 -mr-3 text-text-secondary hover:text-primary min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Stäng meny"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="px-4 pt-4">
              {mobileLinks.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-4 text-lg font-medium border-b border-border last:border-0 ${
                      active ? "text-primary" : "text-text-primary hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/hitta-avtal"
                onClick={() => setMobileOpen(false)}
                className="block mt-6 text-center px-5 py-3 text-sm font-semibold uppercase tracking-widest text-white bg-accent rounded-lg"
              >
                Hitta ditt avtal
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
