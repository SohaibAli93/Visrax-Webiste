import type { Metadata } from "next";
import {
  CapabilitiesSection,
  DeploymentSection,
  FinalCta,
  HowItWorksSection,
  IncidentSection,
  IndustriesSection,
  IntegrationSection,
  MultiLocationSection,
  PlatformSection,
  SecuritySection,
  TrustBar,
  UseCasesSection
} from "@/components/sections/HomeSections";
import { ScrollHero } from "@/components/sections/ScrollHero";
import { IntroStatement } from "@/components/sections/IntroStatement";
import { ScrollNarrative } from "@/components/sections/ScrollNarrative";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visrax | Object Detection and Monitoring Systems",
  description: siteConfig.description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: "Visrax | Object Detection and Monitoring Systems",
    description: siteConfig.description,
    url: absoluteUrl("/"),
    siteName: "Visrax",
    type: "website",
    images: [{ url: absoluteUrl("/brand/banner.png"), width: 2508, height: 627, alt: "Visrax object detection and monitoring systems" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Visrax | Object Detection and Monitoring Systems",
    description: siteConfig.description,
    images: [absoluteUrl("/brand/banner.png")]
  }
};

export default function HomePage() {
  return (
    <main>
      <ScrollHero />
      <IntroStatement />
      <TrustBar />
      <ScrollNarrative />
      <HowItWorksSection />
      <PlatformSection />
      <CapabilitiesSection />
      <IndustriesSection />
      <UseCasesSection />
      <MultiLocationSection />
      <IntegrationSection />
      <IncidentSection />
      <DeploymentSection />
      <SecuritySection />
      <FinalCta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Visrax",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Compatible with existing camera and video environments",
          description: siteConfig.description,
          url: absoluteUrl("/")
        }}
      />
    </main>
  );
}
