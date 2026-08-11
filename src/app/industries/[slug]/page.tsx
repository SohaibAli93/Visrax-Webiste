import { notFound } from "next/navigation";
import { DetailTemplate } from "@/components/sections/PageTemplates";
import { industryPages } from "@/lib/data";
import { createMetadata } from "@/lib/metadata";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return industryPages.map((page) => ({ slug: page.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = industryPages.find((item) => item.slug === slug);
  if (!page) return {};
  return createMetadata({
    title: page.title,
    description: page.metaDescription,
    path: `/industries/${page.slug}`,
    titlePattern: "AI Video Monitoring for {title} | Visrax"
  });
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = industryPages.find((item) => item.slug === slug);
  if (!page) notFound();
  return <DetailTemplate page={page} basePath="/industries" parentLabel="Industries" />;
}
