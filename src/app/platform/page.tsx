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
    />
  );
}
