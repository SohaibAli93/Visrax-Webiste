import { notFound } from "next/navigation";
import { ArticleDetailPage } from "@/components/sections/PageTemplates";
import { insights } from "@/lib/data";
import { createMetadata } from "@/lib/metadata";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map((article) => ({ slug: article.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  if (!article) return {};
  return createMetadata({ title: article.title, description: article.description, path: `/insights/${article.slug}`, type: "article", publishedTime: article.date, modifiedTime: article.date });
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  if (!article) notFound();
  return <ArticleDetailPage article={article} basePath="/insights" parentLabel="Insights" />;
}
