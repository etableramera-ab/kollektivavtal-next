"use client";

import { useState, useEffect, useRef, useCallback, useId } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { publicAgreements } from "@/lib/public-agreements";
import { publicOccupations } from "@/lib/public-occupations";
import {
  getSearchMatchScore,
  matchesSearchText,
} from "@/lib/search-normalization";

interface SearchResult {
  type: "avtal" | "yrke";
  name: string;
  slug: string;
  extra?: string;
}

function agreementSearchScore(agreement: (typeof publicAgreements)[number], query: string) {
  const nameScore = Math.max(
    getSearchMatchScore(agreement.name, query),
    getSearchMatchScore(agreement.shortName, query)
  );
  const metadataScore = Math.max(
    getSearchMatchScore(agreement.sectorLabel, query),
    ...agreement.parties.unions.map((value) => getSearchMatchScore(value, query)),
    ...agreement.parties.employers.map((value) => getSearchMatchScore(value, query))
  );
  return nameScore * 100 + metadataScore * 10;
}

function search(query: string, scope: "all" | "agreements"): SearchResult[] {
  const q = query.trim();
  if (q.length < 2) return [];

  const results: SearchResult[] = [];

  // Search agreements
  const matchedAgreements = publicAgreements
    .filter(
      (a) =>
        matchesSearchText(a.name, q) ||
        matchesSearchText(a.shortName, q) ||
        matchesSearchText(a.sectorLabel, q) ||
        a.parties.unions.some((u) => matchesSearchText(u, q)) ||
        a.parties.employers.some((e) => matchesSearchText(e, q))
    )
    .sort((a, b) => {
      const scoreDifference = agreementSearchScore(b, q) - agreementSearchScore(a, q);
      return scoreDifference || a.shortName.localeCompare(b.shortName, "sv");
    });
  for (const a of matchedAgreements.slice(0, 5)) {
    results.push({
      type: "avtal",
      name: a.shortName,
      slug: a.slug,
      extra: a.sectorLabel,
    });
  }

  if (scope === "all") {
    const matchedOccupations = publicOccupations.filter((o) =>
      matchesSearchText(o.title, q)
    );
    for (const o of matchedOccupations.slice(0, 5)) {
      results.push({
        type: "yrke",
        name: o.title,
        slug: o.slug,
        extra: `${o.salary.median.toLocaleString("sv-SE")} kr · SCB 2025`,
      });
    }
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
  agreementBasePath?: string;
  occupationBasePath?: string;
  isRTL?: boolean;
  scope?: "all" | "agreements";
  showDetails?: boolean;
  labels?: {
    agreements?: string;
    occupations?: string;
    noResults?: string;
  };
}

export default function SearchAutocomplete({
  variant = "default",
  placeholder = "Sök på yrke, bransch eller företag...",
  agreementBasePath = "/avtal",
  occupationBasePath = "/yrke",
  isRTL = false,
  scope = "all",
  showDetails = true,
  labels = {},
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const router = useRouter();

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    const timer = setTimeout(() => {
      const r = search(query, scope);
      setResults(r);
      setOpen(r.length > 0 || query.length >= 2);
      setActiveIndex(-1);
    }, 200);
    return () => clearTimeout(timer);
  }, [query, scope]);

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
          ? `${agreementBasePath}/${result.slug}`
          : `${occupationBasePath}/${result.slug}`
      );
    },
    [agreementBasePath, occupationBasePath, router]
  );

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results.length > 0) {
      e.preventDefault();
      navigate(results[activeIndex >= 0 ? activeIndex : 0]);
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
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-text-secondary ${isRTL ? "right-3" : "left-3"}`}
      />
      <input
        ref={inputRef}
        type="search"
        inputMode="search"
        enterKeyHint="search"
        autoComplete="off"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls={listboxId}
        className={`w-full outline-none placeholder:text-text-secondary ${isRTL ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"} ${
          isHero
            ? "h-12 rounded-lg border border-border text-base text-text-primary focus:ring-2 focus:ring-primary/30 focus:border-primary sm:text-sm"
            : "h-12 rounded-lg border border-border text-base text-text-primary focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white sm:text-sm"
        }`}
      />

      {open && (
        <div id={listboxId} role="listbox" className={`absolute left-0 right-0 top-full z-50 mt-0 max-h-[55dvh] overflow-y-auto rounded-b-lg border border-t-0 border-border bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:max-h-[400px] ${isRTL ? "text-right" : "text-left"}`}>
          {results.length === 0 && query.length >= 2 ? (
            <p className="px-4 py-4 text-sm text-text-secondary">
              {labels.noResults ?? "Inga resultat"}: &quot;{query}&quot;
            </p>
          ) : (
            <>
              {avtalResults.length > 0 && (
                <>
                  <div className="px-4 py-2 bg-background text-[11px] font-semibold uppercase tracking-[0.06em] text-text-secondary">
                    {labels.agreements ?? "Avtal"}
                  </div>
                  {avtalResults.map((r) => {
                    const idx = globalIndex++;
                    return (
                      <button
                        key={`avtal-${r.slug}`}
                        type="button"
                        role="option"
                        aria-selected={idx === activeIndex}
                        onClick={() => navigate(r)}
                        className={`flex w-full flex-col items-start gap-1 border-b border-surface-dark px-4 py-3 text-[15px] text-text-primary transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-3 ${isRTL ? "text-right" : "text-left"} ${
                          idx === activeIndex ? "bg-[#F0FDFA]" : "hover:bg-[#F0FDFA]"
                        }`}
                      >
                        <span className="min-w-0 break-words">{highlightMatch(r.name, query)}</span>
                        {showDetails && r.extra && (
                          <span className="break-words text-xs text-text-secondary sm:ml-2 sm:text-right">
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
                    {labels.occupations ?? "Yrken"}
                  </div>
                  {yrkeResults.map((r) => {
                    const idx = globalIndex++;
                    return (
                      <button
                        key={`yrke-${r.slug}`}
                        type="button"
                        role="option"
                        aria-selected={idx === activeIndex}
                        onClick={() => navigate(r)}
                        className={`flex w-full flex-col items-start gap-1 border-b border-surface-dark px-4 py-3 text-[15px] text-text-primary transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-3 ${isRTL ? "text-right" : "text-left"} ${
                          idx === activeIndex ? "bg-[#F0FDFA]" : "hover:bg-[#F0FDFA]"
                        }`}
                      >
                        <span className="min-w-0 break-words">{highlightMatch(r.name, query)}</span>
                        {showDetails && r.extra && (
                          <span className="break-words text-sm font-medium text-accent sm:ml-2 sm:text-right">
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
