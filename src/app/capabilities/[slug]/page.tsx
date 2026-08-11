import { notFound } from "next/navigation";
import { DetailTemplate } from "@/components/sections/PageTemplates";
import { capabilityPages } from "@/lib/data";
import { createMetadata } from "@/lib/metadata";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return capabilityPages.map((page) => ({ slug: page.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = capabilityPages.find((item) => item.slug === slug);
  if (!page) return {};
  return createMetadata({
    title: page.title,
    description: page.metaDescription,
    path: `/capabilities/${page.slug}`,
    titlePattern: "{title} Software — AI-Powered Monitoring | Visrax"
  });
}

export default async function CapabilityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = capabilityPages.find((item) => item.slug === slug);
  if (!page) notFound();
  return <DetailTemplate page={page} basePath="/capabilities" parentLabel="Capabilities" />;
}
