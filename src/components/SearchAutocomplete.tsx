"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { agreements } from "@/data/agreements";
import { occupations } from "@/data/occupations";

interface SearchResult {
  type: "avtal" | "yrke";
  name: string;
  slug: string;
  extra?: string;
}

function search(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];

  const results: SearchResult[] = [];

  // Search agreements
  const matchedAgreements = agreements.filter(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      a.shortName.toLowerCase().includes(q) ||
      a.sectorLabel.toLowerCase().includes(q) ||
      a.parties.unions.some((u) => u.toLowerCase().includes(q)) ||
      a.parties.employers.some((e) => e.toLowerCase().includes(q))
  );
  for (const a of matchedAgreements.slice(0, 5)) {
    results.push({
      type: "avtal",
      name: a.shortName,
      slug: a.slug,
      extra: a.sectorLabel,
    });
  }

  // Search occupations
  const matchedOccupations = occupations.filter(
    (o) =>
      o.title.toLowerCase().includes(q) ||
      o.category.toLowerCase().includes(q)
  );
  for (const o of matchedOccupations.slice(0, 5)) {
    results.push({
      type: "yrke",
      name: o.title,
      slug: o.slug,
      extra: `${o.salary.median.toLocaleString("sv-SE")} kr medianlön`,
    });
  }

  return results.slice(0, 10);
}

function highlightMatch(text: string, query: string) {
  if (!query || query.length < 2) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="font-semibold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

interface Props {
  variant?: "hero" | "default";
  placeholder?: string;
}

export default function SearchAutocomplete({
  variant = "default",
  placeholder = "Sök på yrke, bransch eller företag...",
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    const timer = setTimeout(() => {
      const r = search(query);
      setResults(r);
      setOpen(r.length > 0 || query.length >= 2);
      setActiveIndex(-1);
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  // Click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navigate = useCallback(
    (result: SearchResult) => {
      setOpen(false);
      setQuery("");
      router.push(
        result.type === "avtal"
          ? `/avtal/${result.slug}`
          : `/yrke/${result.slug}`
      );
    },
    [router]
  );

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      navigate(results[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  // Group results
  const avtalResults = results.filter((r) => r.type === "avtal");
  const yrkeResults = results.filter((r) => r.type === "yrke");
  let globalIndex = 0;

  const isHero = variant === "hero";

  return (
    <div className="relative" ref={containerRef}>
      <Search
        size={18}
        className={`absolute top-1/2 -translate-y-1/2 ${
          isHero ? "left-3 text-text-secondary" : "left-3 text-text-secondary"
        }`}
      />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`w-full outline-none placeholder:text-text-secondary ${
          isHero
            ? "h-12 rounded-lg border border-border pl-10 pr-4 text-sm text-text-primary focus:ring-2 focus:ring-primary/30 focus:border-primary"
            : "h-12 rounded-lg border border-border pl-10 pr-4 text-sm text-text-primary focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
        }`}
      />

      {open && (
        <div className="absolute left-0 right-0 top-full mt-0 bg-white border border-border border-t-0 rounded-b-lg shadow-[0_8px_24px_rgba(0,0,0,0.12)] max-h-[400px] overflow-y-auto z-50">
          {results.length === 0 && query.length >= 2 ? (
            <p className="px-4 py-4 text-sm text-text-secondary">
              Inga resultat för &quot;{query}&quot;
            </p>
          ) : (
            <>
              {avtalResults.length > 0 && (
                <>
                  <div className="px-4 py-2 bg-background text-[11px] font-semibold uppercase tracking-[0.06em] text-text-secondary">
                    Avtal
                  </div>
                  {avtalResults.map((r) => {
                    const idx = globalIndex++;
                    return (
                      <button
                        key={`avtal-${r.slug}`}
                        onClick={() => navigate(r)}
                        className={`w-full text-left px-4 py-3 text-[15px] text-text-primary border-b border-surface-dark flex items-center justify-between transition-colors ${
                          idx === activeIndex ? "bg-[#F0FDFA]" : "hover:bg-[#F0FDFA]"
                        }`}
                      >
                        <span>{highlightMatch(r.name, query)}</span>
                        {r.extra && (
                          <span className="text-xs text-text-secondary ml-2 shrink-0">
                            {r.extra}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </>
              )}
              {yrkeResults.length > 0 && (
                <>
                  <div className="px-4 py-2 bg-background text-[11px] font-semibold uppercase tracking-[0.06em] text-text-secondary">
                    Yrken
                  </div>
                  {yrkeResults.map((r) => {
                    const idx = globalIndex++;
                    return (
                      <button
                        key={`yrke-${r.slug}`}
                        onClick={() => navigate(r)}
                        className={`w-full text-left px-4 py-3 text-[15px] text-text-primary border-b border-surface-dark flex items-center justify-between transition-colors ${
                          idx === activeIndex ? "bg-[#F0FDFA]" : "hover:bg-[#F0FDFA]"
                        }`}
                      >
                        <span>{highlightMatch(r.name, query)}</span>
                        {r.extra && (
                          <span className="text-sm font-medium text-accent ml-2 shrink-0">
                            {r.extra}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
