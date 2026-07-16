import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Terms",
  description: "Visrax website terms overview for product information, demo requests, and enterprise evaluation discussions.",
  path: "/terms"
});

export default function TermsPage() {
  const items = [
    "Website content is provided for product information and evaluation conversations.",
    "Product capabilities depend on configuration, camera compatibility, deployment model, and operating environment.",
    "Commercial, support, security, and data-processing terms should be defined in written agreements."
  ];

  return (
    <>
      <Breadcrumbs items={[{ label: "Terms", href: "/terms" }]} />
      <main className="page-shell">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 hero-field opacity-30" />
          <div className="relative mx-auto max-w-3xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
            <h1 className="font-display text-5xl font-semibold tracking-tightest text-white sm:text-6xl">Terms</h1>
            <p className="mt-6 text-lg leading-8 text-white/55">
              These website terms provide a concise public overview. Customer-specific terms should be reviewed in formal agreements.
            </p>
            <div className="mt-12 grid gap-3 text-white/60">
              {items.map((item) => (
                <p key={item} className="surface-card p-5 text-[0.9375rem] leading-7">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
