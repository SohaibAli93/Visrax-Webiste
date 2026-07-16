import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";

type Crumb = { label: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];

  return (
    <>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[88rem] px-4 pt-24 text-sm text-white/40 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-2">
          {all.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 ? <ChevronRight aria-hidden className="h-3.5 w-3.5 text-white/25" /> : null}
              {index === all.length - 1 ? (
                <span aria-current="page" className="text-white/70">
                  {item.label}
                </span>
              ) : (
                <Link className="transition hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: absoluteUrl(item.href)
          }))
        }}
      />
    </>
  );
}
