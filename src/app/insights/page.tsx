import { ArticleListPage } from "@/components/sections/PageTemplates";
import { insights } from "@/lib/data";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Insights",
  description: siteConfig.description,
  path: "/insights"
});

export default function InsightsPage() {
  return (
    <ArticleListPage
      title="Insights"
      description="Practical guidance on using your existing cameras for detection, alerts, and multi-site monitoring."
      articles={insights}
      basePath="/insights"
    />
  );
}
