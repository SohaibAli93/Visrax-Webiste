import { ListingPage } from "@/components/sections/PageTemplates";
import { capabilityPages } from "@/lib/data";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Detection and Monitoring",
  description: siteConfig.description,
  path: "/capabilities"
});

export default function CapabilitiesPage() {
  return (
    <ListingPage
      eyebrow="What Visrax detects"
      title="Object detection and monitoring for real workplaces."
      description="Choose what to watch for — people, vehicles, safety zones, queues, after-hours activity, and more — using the cameras you already have."
      pages={capabilityPages}
      basePath="/capabilities"
    />
  );
}
