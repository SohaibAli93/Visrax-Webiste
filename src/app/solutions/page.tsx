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
      body={[
        "Solutions group the right capabilities around a specific outcome, so you don't have to configure a full system from scratch.",
        "Start with the outcome that matters most — a safer workplace, tighter security, smoother facility operations, or better traffic flow — and add more as your needs grow."
      ]}
    />
  );
}
