import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CameraScene } from "@/components/visuals/CameraScene";
import { DetailPage } from "@/lib/data";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";

export function ListingPage({
  eyebrow,
  title,
  description,
  pages,
  basePath
}: {
  eyebrow: string;
  title: string;
  description: string;
  pages: DetailPage[];
  basePath: string;
}) {
  return (
    <>
      <Breadcrumbs items={[{ label: eyebrow, href: basePath }]} />
      <main className="page-shell">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 hero-field opacity-60" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-32">
            <Reveal>
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="mt-5 font-display text-balance text-5xl font-semibold leading-[0.95] tracking-tightest text-white sm:text-6xl lg:text-7xl">
                {title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/55">{description}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <CameraScene compact label={eyebrow} />
            </Reveal>
          </div>
        </section>
        <section className="soft-divider border-t section-alt py-24 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-6 lg:grid-cols-3 lg:px-8">
            {pages.map((page, index) => (
              <Reveal key={page.slug} delay={index * 0.03}>
                <Link
                  href={`${basePath}/${page.slug}`}
                  className="group surface-card block min-h-72 p-7 transition duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-[#214cff]/15 to-[#7c3cff]/10">
                      <page.icon aria-hidden className="h-5 w-5 text-accent" />
                    </div>
                    <ArrowRight
                      aria-hidden
                      className="h-5 w-5 text-white/20 transition group-hover:translate-x-1 group-hover:text-white"
                    />
                  </div>
                  <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight text-white">{page.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-white/50">{page.description}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export function DetailTemplate({ page, basePath, parentLabel }: { page: DetailPage; basePath: string; parentLabel: string }) {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: parentLabel, href: basePath },
          { label: page.title, href: `${basePath}/${page.slug}` }
        ]}
      />
      <main className="page-shell">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 hero-field opacity-60" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-32">
            <Reveal>
              <p className="eyebrow">{page.eyebrow}</p>
              <h1 className="mt-5 font-display text-balance text-5xl font-semibold leading-[0.95] tracking-tightest text-white sm:text-6xl lg:text-7xl">
                {page.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/55">{page.description}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/request-demo">Request a Demo</ButtonLink>
                <ButtonLink href={basePath} variant="secondary">
                  Explore {parentLabel}
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <CameraScene compact label={page.title} />
            </Reveal>
          </div>
        </section>
        <section className="soft-divider border-y section-alt py-24 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:px-8">
            <SectionHeader
              eyebrow="Operational fit"
              title={`${page.title} for the way your site actually runs.`}
              copy="Visrax is set up around the cameras, areas, and alert types that matter to your team — not generic templates."
            />
            <Reveal>
              <div className="grid gap-2.5">
                {page.points.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/60"
                  >
                    <CheckCircle2 aria-hidden className="h-4 w-4 shrink-0 text-accent" />
                    {point}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Examples" title="Set up for the situations your team needs to catch." />
            <div className="mt-12 grid gap-3 md:grid-cols-3">
              {page.useCases.map((item, index) => (
                <Reveal key={item} delay={index * 0.04}>
                  <div className="surface-card min-h-48 p-6">
                    <span className="font-mono text-[0.65rem] font-medium tracking-[0.2em] text-accent">0{index + 1}</span>
                    <h2 className="mt-12 font-display text-xl font-semibold tracking-tight text-white">{item}</h2>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export function ArticleListPage({
  title,
  description,
  articles,
  basePath
}: {
  title: string;
  description: string;
  articles: { slug: string; title: string; description: string; category: string; date: string; readTime: string }[];
  basePath: string;
}) {
  return (
    <>
      <Breadcrumbs items={[{ label: title, href: basePath }]} />
      <main className="page-shell">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 hero-field opacity-50" />
          <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-6 lg:px-8">
            <Reveal className="max-w-3xl">
              <h1 className="font-display text-balance text-5xl font-semibold leading-[0.95] tracking-tightest text-white sm:text-6xl lg:text-7xl">
                {title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-white/55">{description}</p>
            </Reveal>
            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {articles.map((article, index) => (
                <Reveal key={article.slug} delay={index * 0.04}>
                  <Link
                    href={`${basePath}/${article.slug}`}
                    className="group surface-card block min-h-80 p-7 transition duration-200 hover:-translate-y-0.5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{article.category}</p>
                    <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight text-white">{article.title}</h2>
                    <p className="mt-4 text-sm leading-6 text-white/50">{article.description}</p>
                    <p className="mt-8 text-xs text-white/35">
                      {article.date} · {article.readTime}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export function ArticleDetailPage({
  article,
  basePath,
  parentLabel
}: {
  article: { slug: string; title: string; description: string; category: string; date: string; readTime: string; body: string[] };
  basePath: string;
  parentLabel: string;
}) {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: parentLabel, href: basePath },
          { label: article.title, href: `${basePath}/${article.slug}` }
        ]}
      />
      <main className="page-shell">
        <article className="relative mx-auto max-w-3xl px-5 pb-28 pt-16 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 hero-field opacity-40" />
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{article.category}</p>
            <h1 className="mt-5 font-display text-balance text-5xl font-semibold leading-[0.95] tracking-tightest text-white sm:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/55">{article.description}</p>
            <p className="mt-6 text-sm text-white/35">
              Published {article.date} · {article.readTime}
            </p>
          </Reveal>
          <div className="mt-14 grid gap-7 border-t border-white/[0.08] pt-12 text-lg leading-8 text-white/65">
            {article.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
