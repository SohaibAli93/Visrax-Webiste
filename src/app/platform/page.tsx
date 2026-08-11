import { ListingPage } from "@/components/sections/PageTemplates";
import { platformPages } from "@/lib/data";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Monitoring Platform",
  description: siteConfig.description,
  path: "/platform"
});

export default function PlatformPage() {
  return (
    <ListingPage
      eyebrow="Platform"
      title="One monitoring system for your whole operation."
      description="Live cameras, detection, tracking, alerts, reports, and multi-site visibility — everything your team needs in one place."
      pages={platformPages}
      basePath="/platform"
      body={[
        "The Visrax platform connects to cameras across your sites and brings live views, detection, tracking, alerts, and reports into one workspace.",
        "Security, facilities, and operations teams get a single source of truth for what is happening — instead of checking separate systems for each location or camera."
      ]}
    />
  );
}
