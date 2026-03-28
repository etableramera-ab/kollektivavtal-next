"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/avtal", label: "Kollektivavtal" },
  { href: "/hitta-avtal", label: "Hitta ditt avtal" },
  { href: "/lonekalkylator", label: "Lönekalkylator" },
  { href: "/statistik", label: "Statistik" },
  { href: "/om-oss", label: "Om oss" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`sticky top-0 z-50 bg-white/95 transition-all duration-200 ${
        scrolled ? "backdrop-blur-md border-b border-border shadow-sm" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary">
            kollektivavtal.ai
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-3 -mr-3 text-text-secondary hover:text-primary min-w-[44px] min-h-[44px] flex items-center justify-center"
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
            className="fixed inset-0 z-50 bg-white md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-4">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="text-xl font-bold text-primary"
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-4 text-lg font-medium text-text-primary hover:text-accent border-b border-border last:border-0"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
