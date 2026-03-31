import type { MetadataRoute } from "next";
import { agreements } from "@/data/agreements";
import { courtCases } from "@/data/court-cases";
import { occupations } from "@/data/occupations";
import { blogPosts } from "@/data/blog-posts";
import { vsComparisons } from "@/data/comparisons";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kollektivavtal.ai";

  const agreementPages = agreements.map((a) => ({
    url: `${baseUrl}/avtal/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const courtCasePages = courtCases.map((c) => ({
    url: `${baseUrl}/rattsfall/${c.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/avtal`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...agreementPages,
    {
      url: `${baseUrl}/hitta-avtal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lonekalkylator`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/statistik`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/statistik/loner`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/statistik/avtalsrorelsen`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rattsfall`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...courtCasePages,
    {
      url: `${baseUrl}/blogg`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jamfor`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...["ob-tillagg", "minimiioner", "semester", "foraldralon", "uppsagningstid", "pension", "overtid", "arbetstid"].map((topic) => ({
      url: `${baseUrl}/jamfor/${topic}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...vsComparisons.map((c) => {
      const sorted = [c.slug1, c.slug2].sort();
      return {
        url: `${baseUrl}/jamfor/${sorted[0]}-vs-${sorted[1]}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    }),
    ...blogPosts.map((p) => ({
      url: `${baseUrl}/blogg/${p.slug}`,
      lastModified: new Date(p.updatedDate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/yrke`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...occupations.map((o) => ({
      url: `${baseUrl}/yrke/${o.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/om-oss`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/integritetspolicy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookiepolicy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
