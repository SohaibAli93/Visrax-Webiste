import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RequestDemoForm } from "@/components/forms/RequestDemoForm";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Request a Demo",
  description: siteConfig.description,
  path: "/request-demo"
});

export default function RequestDemoPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Request a Demo", href: "/request-demo" }]} />
      <main className="page-shell">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 hero-field opacity-50" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-28 pt-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <SectionHeader
              eyebrow="Request a Demo"
              title="See how Visrax works with your cameras."
              copy="Tell us about your locations, what you want to monitor, and who should receive alerts. We will walk you through a setup that fits your operation."
            />
            <RequestDemoForm />
          </div>
        </section>
      </main>
    </>
  );
}
