import { insights } from "@/lib/data";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function GET() {
  const items = insights
    .map(
      (item) => `<item><title>${escapeXml(item.title)}</title><link>${absoluteUrl(`/insights/${item.slug}`)}</link><guid>${absoluteUrl(`/insights/${item.slug}`)}</guid><description>${escapeXml(item.description)}</description><pubDate>${new Date(item.date).toUTCString()}</pubDate></item>`
    )
    .join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Visrax Insights</title><link>${absoluteUrl("/insights")}</link><description>${escapeXml(siteConfig.description)}</description>${items}</channel></rss>`, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" }
  });
}

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[char] || char);
}
