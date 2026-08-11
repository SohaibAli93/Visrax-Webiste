import { notFound } from "next/navigation";
import { DetailTemplate } from "@/components/sections/PageTemplates";
import { solutionPages } from "@/lib/data";
import { createMetadata } from "@/lib/metadata";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return solutionPages.map((page) => ({ slug: page.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = solutionPages.find((item) => item.slug === slug);
  if (!page) return {};
  return createMetadata({
    title: page.title,
    description: page.metaDescription,
    path: `/solutions/${page.slug}`,
    titlePattern: "{title} Solutions — Automated Monitoring | Visrax"
  });
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = solutionPages.find((item) => item.slug === slug);
  if (!page) notFound();
  return <DetailTemplate page={page} basePath="/solutions" parentLabel="Solutions" />;
}
