import { caseStudies, insights } from "@/lib/data";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function GET() {
  const caseStudySlugs = new Set(caseStudies.map((item) => item.slug));
  const allItems = [...insights, ...caseStudies];
  const items = allItems
    .map((item) => {
      const base = caseStudySlugs.has(item.slug) ? "/case-studies" : "/insights";
      const url = absoluteUrl(`${base}/${item.slug}`);
      return `<item><title>${escapeXml(item.title)}</title><link>${url}</link><guid>${url}</guid><description>${escapeXml(item.description)}</description><pubDate>${new Date(item.date).toUTCString()}</pubDate></item>`;
    })
    .join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Visrax Insights</title><link>${absoluteUrl("/insights")}</link><description>${escapeXml(siteConfig.description)}</description>${items}</channel></rss>`, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" }
  });
}

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[char] || char);
}
