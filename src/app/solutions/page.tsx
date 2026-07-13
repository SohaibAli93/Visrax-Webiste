import { ListingPage } from "@/components/sections/PageTemplates";
import { solutionPages } from "@/lib/data";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Solutions",
  description: siteConfig.description,
  path: "/solutions"
});

export default function SolutionsPage() {
  return (
    <ListingPage
      eyebrow="Solutions"
      title="Monitoring for safety, security, facilities, and traffic."
      description="Whether you need safer workplaces, better security, clearer facility oversight, or traffic and parking visibility — Visrax turns your cameras into action."
      pages={solutionPages}
      basePath="/solutions"
    />
  );
}
