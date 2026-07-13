import type { MetadataRoute } from "next";
import { allDetailPages, caseStudies, insights } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/platform", "/capabilities", "/industries", "/solutions", "/insights", "/case-studies", "/company", "/company/about", "/company/contact", "/company/careers", "/request-demo", "/privacy", "/terms", "/cookies"];
  const detailRoutes = allDetailPages().map((page) => `${page.base}/${page.slug}`);
  const articleRoutes = [...insights.map((item) => `/insights/${item.slug}`), ...caseStudies.map((item) => `/case-studies/${item.slug}`)];

  return [...staticRoutes, ...detailRoutes, ...articleRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-07-13"),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7
  }));
}
