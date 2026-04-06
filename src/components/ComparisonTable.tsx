"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpDown } from "lucide-react";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  align?: "left" | "right";
}

interface Row {
  slug: string;
  name: string;
  [key: string]: string | number;
}

interface Props {
  columns: Column[];
  rows: Row[];
  sectorFilter?: boolean;
}

export default function ComparisonTable({ columns, rows, sectorFilter = true }: Props) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [sector, setSector] = useState("Alla");

  const sectors = useMemo(() => {
    const s = new Set(rows.map((r) => String(r.sector || "")));
    return ["Alla", ...Array.from(s).filter(Boolean)];
  }, [rows]);

  const sorted = useMemo(() => {
    let result = [...rows];
    if (sector !== "Alla") result = result.filter((r) => r.sector === sector);
    if (sortKey) {
      result.sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (typeof av === "number" && typeof bv === "number") return sortAsc ? av - bv : bv - av;
        return sortAsc ? String(av).localeCompare(String(bv), "sv") : String(bv).localeCompare(String(av), "sv");
      });
    }
    return result;
  }, [rows, sortKey, sortAsc, sector]);

  function toggleSort(key: string) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  }

  return (
    <div>
      {sectorFilter && sectors.length > 2 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => setSector(s)}
              className={`rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors min-h-[36px] ${
                sector === s ? "bg-primary text-white" : "bg-white border border-border text-text-secondary hover:border-primary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Desktop table */}
      <div className="hidden md:block rounded-xl border border-border bg-white overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="bg-primary text-white">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`p-4 font-semibold text-sm ${col.align === "right" ? "text-right" : "text-left"} ${col.sortable ? "cursor-pointer hover:text-white/80 select-none" : ""}`}
                  onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sortable && <ArrowUpDown size={12} className="text-white/60" />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr key={row.slug} className={`border-b border-surface-dark last:border-0 hover:bg-[#F0FDFA] transition-colors ${i % 2 === 1 ? "bg-background" : ""}`}>
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3.5 ${col.align === "right" ? "text-right" : ""} ${col.key === "name" ? "font-semibold text-text-primary" : "text-text-primary"}`}>
                    {col.key === "name" ? (
                      <Link href={`/avtal/${row.slug}`} className="text-primary hover:underline">{String(row[col.key])}</Link>
                    ) : (
                      String(row[col.key])
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-2">
        {sorted.map((row) => (
          <Link key={row.slug} href={`/avtal/${row.slug}`} className="block rounded-[12px] border border-border bg-white p-3 shadow-sm">
            <p className="font-semibold text-accent text-sm">{String(row.name)}</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
              {columns.filter((c) => c.key !== "name" && c.key !== "sector").map((col) => (
                <div key={col.key}>
                  <p className="text-[10px] text-text-secondary">{col.label}</p>
                  <p className="text-xs font-medium text-text-primary">{String(row[col.key])}</p>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <p className="text-xs text-text-secondary mt-3">Källa: Respektive kollektivavtal, SCB. Uppgifterna är ungefärliga.</p>
    </div>
  );
}
