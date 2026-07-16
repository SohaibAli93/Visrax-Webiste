import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Cookies",
  description: "Visrax cookies overview for essential website functionality and privacy-aware measurement configuration.",
  path: "/cookies"
});

export default function CookiesPage() {
  const items = [
    "The public website can operate with essential functionality cookies.",
    "Analytics or marketing cookies should be enabled only when configured with appropriate consent controls.",
    "Deployment teams can update this page when a production consent platform is connected."
  ];

  return (
    <>
      <Breadcrumbs items={[{ label: "Cookies", href: "/cookies" }]} />
      <main className="page-shell">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 hero-field opacity-30" />
          <div className="relative mx-auto max-w-3xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
            <h1 className="font-display text-5xl font-semibold tracking-tightest text-white sm:text-6xl">Cookies</h1>
            <p className="mt-6 text-lg leading-8 text-white/55">This page describes the intended cookie posture for the Visrax website.</p>
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
