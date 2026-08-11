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
      body={[
        "Each industry has its own set of situations to watch for — safety risks on a production floor, vehicles in a warehouse, after-hours activity in retail, or restricted zones around critical infrastructure.",
        "Visrax is configured around the alerts and evidence that matter for the places you run, so your team sees what needs attention instead of watching every camera."
      ]}
    />
  );
}
