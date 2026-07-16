import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Careers",
  description:
    "Explore career interest areas at Visrax across computer vision, product engineering, design, deployment, and enterprise operations.",
  path: "/company/careers"
});

export default function CareersPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Company", href: "/company" }, { label: "Careers", href: "/company/careers" }]} />
      <main className="page-shell">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 hero-field opacity-40" />
          <div className="relative mx-auto max-w-[88rem] px-4 pb-20 pt-14 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Careers"
              title="Build visual intelligence for real-world operations."
              copy="Visrax works across computer vision, product engineering, design, deployment, and enterprise workflows. Open roles can be published here as hiring needs are finalized."
            />
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {["Computer Vision", "Product Engineering", "Deployment and Customer Operations"].map((item) => (
                <div key={item} className="surface-card min-h-56 p-7">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-white">{item}</h2>
                  <p className="mt-4 text-sm leading-6 text-white/50">
                    Help create precise, reliable systems for monitoring physical environments with clarity and control.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
