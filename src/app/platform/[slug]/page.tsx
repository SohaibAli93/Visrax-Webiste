import { notFound } from "next/navigation";
import { DetailTemplate } from "@/components/sections/PageTemplates";
import { platformPages } from "@/lib/data";
import { createMetadata } from "@/lib/metadata";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return platformPages.map((page) => ({ slug: page.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = platformPages.find((item) => item.slug === slug);
  if (!page) return {};
  return createMetadata({
    title: page.title,
    description: page.metaDescription,
    path: `/platform/${page.slug}`,
    titlePattern: "{title} | Visrax Platform"
  });
}

export default async function PlatformDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = platformPages.find((item) => item.slug === slug);
  if (!page) notFound();
  return <DetailTemplate page={page} basePath="/platform" parentLabel="Platform" />;
}
