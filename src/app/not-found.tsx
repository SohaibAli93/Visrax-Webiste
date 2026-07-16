import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
      <div className="absolute inset-0 hero-field opacity-70" />
      <section className="relative max-w-2xl text-center">
        <p className="eyebrow justify-center before:hidden">404</p>
        <h1 className="mt-5 font-display text-5xl font-semibold tracking-tightest text-white sm:text-7xl">
          This view is not available.
        </h1>
        <p className="mt-6 text-lg leading-8 text-white/55">
          The page may have moved, or the route does not exist in the Visrax website.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/platform" variant="secondary">
            Platform
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
