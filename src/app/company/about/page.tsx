import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CameraScene } from "@/components/visuals/CameraScene";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "About",
  description: siteConfig.description,
  path: "/company/about"
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Company", href: "/company" }, { label: "About", href: "/company/about" }]} />
      <main className="page-shell">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 hero-field opacity-50" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <SectionHeader
              eyebrow="About Visrax"
              title="Monitoring systems for the places where work happens."
              copy={siteConfig.description}
            />
            <CameraScene compact label="Visrax platform" />
          </div>
        </section>
        <section className="soft-divider border-y section-alt py-24">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-6 lg:grid-cols-3 lg:px-8">
            {[
              "Use the cameras you already have.",
              "Set up monitoring around what matters to your team.",
              "Start small and expand across every location."
            ].map((item) => (
              <div key={item} className="surface-card min-h-44 p-7">
                <p className="font-display text-xl font-semibold leading-snug tracking-tight text-white">{item}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
          <ButtonLink href="/request-demo">Request a Demo</ButtonLink>
        </section>
      </main>
    </>
  );
}
