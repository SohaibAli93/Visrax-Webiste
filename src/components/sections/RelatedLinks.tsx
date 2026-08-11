import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getRelatedLinks } from "@/lib/data";

export function RelatedLinks({ slug, eyebrow = "Related" }: { slug: string; eyebrow?: string }) {
  const links = getRelatedLinks(slug);
  if (links.length === 0) return null;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <p className="eyebrow">{eyebrow}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group surface-card flex min-h-32 flex-col justify-between p-6 transition duration-200 hover:-translate-y-0.5"
            >
              <span className="font-display text-lg font-semibold tracking-tight text-white">{link.label}</span>
              <ArrowRight aria-hidden className="h-4 w-4 text-accent transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
