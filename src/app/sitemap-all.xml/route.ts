import { agreements } from "@/data/agreements";
import { courtCases } from "@/data/court-cases";
import { vsComparisons } from "@/data/comparisons";

const BASE = "https://kollektivavtal.ai";

export function GET() {
  const now = new Date().toISOString();

  const topAgreementSlugs = new Set(
    [...agreements]
      .sort((a, b) => b.employeeCount - a.employeeCount)
      .slice(0, 20)
      .map((a) => a.slug)
  );

  const remainingAgreements = agreements.filter(
    (a) => !topAgreementSlugs.has(a.slug)
  );

  const jamforTopics = [
    "ob-tillagg",
    "minimiioner",
    "semester",
    "foraldralon",
    "uppsagningstid",
    "pension",
    "overtid",
    "arbetstid",
  ];

  const urls: { loc: string; lastmod?: string }[] = [
    { loc: `${BASE}/avtal` },
    ...remainingAgreements.map((a) => ({ loc: `${BASE}/avtal/${a.slug}` })),
    { loc: `${BASE}/yrke` },
    { loc: `${BASE}/blogg` },
    { loc: `${BASE}/jamfor` },
    ...jamforTopics.map((t) => ({ loc: `${BASE}/jamfor/${t}` })),
    ...vsComparisons.map((c) => {
      const sorted = [c.slug1, c.slug2].sort();
      return { loc: `${BASE}/jamfor/${sorted[0]}-vs-${sorted[1]}` };
    }),
    { loc: `${BASE}/rattsfall` },
    ...courtCases.map((c) => ({
      loc: `${BASE}/rattsfall/${c.id}`,
      lastmod: c.date ? new Date(c.date).toISOString() : now,
    })),
    { loc: `${BASE}/integritetspolicy` },
    { loc: `${BASE}/cookiepolicy` },
  ];

  const body = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod ?? now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
