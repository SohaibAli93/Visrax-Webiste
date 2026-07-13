import { ArticleListPage } from "@/components/sections/PageTemplates";
import { caseStudies } from "@/lib/data";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Case Study Frameworks",
  description: "Explore sample Visrax rollout frameworks for intelligent video analytics across manufacturing and commercial building environments.",
  path: "/case-studies"
});

export default function CaseStudiesPage() {
  return <ArticleListPage title="Case Studies" description="Synthetic, non-customer rollout frameworks that show how Visrax can be evaluated in real operational environments." articles={caseStudies} basePath="/case-studies" />;
}
