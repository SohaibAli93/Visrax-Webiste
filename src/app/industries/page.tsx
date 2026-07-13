import { ListingPage } from "@/components/sections/PageTemplates";
import { industryPages } from "@/lib/data";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Industries",
  description: siteConfig.description,
  path: "/industries"
});

export default function IndustriesPage() {
  return (
    <ListingPage
      eyebrow="Industries"
      title="Monitoring systems for the places you run."
      description="Factories, offices, warehouses, shops, roads, and more — Visrax fits the way each site works and the alerts each team needs."
      pages={industryPages}
      basePath="/industries"
    />
  );
}
