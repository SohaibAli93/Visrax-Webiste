import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Privacy",
  description:
    "Visrax privacy overview for controlled data handling, retention, access, and enterprise video analytics workflows.",
  path: "/privacy"
});

export const robots = { index: false, follow: true };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      path="/privacy"
      intro="This page summarizes privacy principles for Visrax website and product conversations. Deployment-specific privacy terms should be finalized in customer agreements."
      items={[
        "Controlled evidence access and role-based permissions are important product principles.",
        "Retention and deployment options can be configured according to organizational requirements.",
        "Do not submit confidential camera details or credentials through public forms."
      ]}
    />
  );
}

function LegalPage({ title, path, intro, items }: { title: string; path: string; intro: string; items: string[] }) {
  return (
    <>
      <Breadcrumbs items={[{ label: title, href: path }]} />
      <main className="page-shell">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 hero-field opacity-30" />
          <div className="relative mx-auto max-w-3xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
            <h1 className="font-display text-5xl font-semibold tracking-tightest text-white sm:text-6xl">{title}</h1>
            <p className="mt-6 text-lg leading-8 text-white/55">{intro}</p>
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
