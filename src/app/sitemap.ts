import type { MetadataRoute } from "next";
import { allDetailPages, caseStudies, insights } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

const SITE_LAUNCH = new Date("2026-07-13");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: absoluteUrl("/platform"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/capabilities"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/industries"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/solutions"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/insights"), lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: absoluteUrl("/case-studies"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/request-demo"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/camera-compatibility"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/company/about"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/company/careers"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.4 },
    { url: absoluteUrl("/company/contact"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/privacy"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/terms"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/cookies"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 }
  ];

  const detailRoutes: MetadataRoute.Sitemap = allDetailPages().map((page) => ({
    url: absoluteUrl(`${page.base}/${page.slug}`),
    lastModified: page.updatedAt ? new Date(page.updatedAt) : page.publishedAt ? new Date(page.publishedAt) : SITE_LAUNCH,
    changeFrequency: "monthly",
    priority: 0.85
  }));

  const articleRoutes: MetadataRoute.Sitemap = [...insights.map((item) => ({ item, base: "/insights" as const, priority: 0.7 })), ...caseStudies.map((item) => ({ item, base: "/case-studies" as const, priority: 0.75 }))].map(({ item, base, priority }) => ({
    url: absoluteUrl(`${base}/${item.slug}`),
    lastModified: new Date(item.date),
    changeFrequency: "yearly",
    priority
  }));

  return [...staticRoutes, ...detailRoutes, ...articleRoutes];
}
