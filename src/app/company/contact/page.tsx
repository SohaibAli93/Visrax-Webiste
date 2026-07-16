import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Contact Visrax about enterprise computer vision, intelligent video analytics, demos, partnerships, and deployment requirements.",
  path: "/company/contact"
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Company", href: "/company" }, { label: "Contact", href: "/company/contact" }]} />
      <main className="page-shell">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 hero-field opacity-50" />
          <div className="relative mx-auto grid max-w-[88rem] gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <SectionHeader
              eyebrow="Contact"
              title="Talk to Visrax about your environment."
              copy="Share the locations, camera coverage, and operational events your team needs to monitor."
            />
            <ContactForm />
          </div>
        </section>
      </main>
    </>
  );
}
