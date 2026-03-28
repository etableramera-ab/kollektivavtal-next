import type { MetadataRoute } from "next";
import { agreements } from "@/data/agreements";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kollektivavtal.ai";

  const agreementPages = agreements.map((a) => ({
    url: `${baseUrl}/avtal/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
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
      url: `${baseUrl}/hitta-ditt-avtal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/lonekalkylator`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/statistik`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rattsfall`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/om-oss`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
