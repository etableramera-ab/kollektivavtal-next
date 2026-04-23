import { agreements } from "@/data/agreements";
import { occupations } from "@/data/occupations";
import { blogPosts } from "@/data/blog-posts";
import { fallbackWageData } from "@/lib/scb-wages";

const BASE = "https://kollektivavtal.ai";

export function GET() {
  const now = new Date().toISOString();

  const topAgreements = [...agreements]
    .sort((a, b) => b.employeeCount - a.employeeCount)
    .slice(0, 20);

  const urls: string[] = [
    BASE,
    ...topAgreements.map((a) => `${BASE}/avtal/${a.slug}`),
    ...blogPosts.map((p) => `${BASE}/blogg/${p.slug}`),
    ...occupations.map((o) => `${BASE}/yrke/${o.slug}`),
    `${BASE}/statistik`,
    `${BASE}/statistik/loner`,
    ...fallbackWageData.map((d) => `${BASE}/statistik/loner/${d.slug}`),
    `${BASE}/statistik/avtalsrorelsen`,
    `${BASE}/hitta-avtal`,
    `${BASE}/lonekalkylator`,
    `${BASE}/om-oss`,
  ];

  const body = urls
    .map(
      (loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
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
