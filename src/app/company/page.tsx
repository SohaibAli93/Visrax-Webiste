import { ListingPage } from "@/components/sections/PageTemplates";
import { Building2, Mail, Users } from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

const companyPages = [
  {
    slug: "about",
    title: "About Visrax",
    eyebrow: "Company",
    description: "Learn how Visrax helps teams monitor workplaces using the cameras they already have.",
    metaDescription: siteConfig.description,
    icon: Building2,
    points: ["Object detection and monitoring", "Built for operations teams", "Works across many environments"],
    useCases: ["Safer workplaces", "Clearer alerts", "Multi-site visibility"]
  },
  {
    slug: "contact",
    title: "Contact",
    eyebrow: "Company",
    description: "Talk with Visrax about detection, tracking, alerts, and monitoring for your locations.",
    metaDescription: siteConfig.description,
    icon: Mail,
    points: ["See a demo", "Ask about your site", "Plan a rollout"],
    useCases: ["Request information", "Discuss what to monitor", "Book a walkthrough"]
  },
  {
    slug: "careers",
    title: "Careers",
    eyebrow: "Company",
    description: "Help build monitoring systems that safety, security, and operations teams rely on every day.",
    metaDescription: "Explore careers at Visrax building object detection and monitoring systems for real workplaces.",
    icon: Users,
    points: ["Product and engineering", "Customer deployment", "Operations-focused design"],
    useCases: ["Engineering", "Product", "Customer success"]
  }
];

export const metadata = createMetadata({
  title: "Company",
  description: siteConfig.description,
  path: "/company"
});

export default function CompanyPage() {
  return (
    <ListingPage
      eyebrow="Company"
      title="Monitoring systems for real operations."
      description={siteConfig.description}
      pages={companyPages}
      basePath="/company"
    />
  );
}
