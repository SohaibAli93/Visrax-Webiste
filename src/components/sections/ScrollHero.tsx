"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const HERO_PHOTO = "/images/cv-city-section-premium-4k.webp";
const FLOW_TEXTURE = "/brand/cv/cv-optical-flow-bright.webp";

export function ScrollHero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Smooth the raw scroll progress with a spring so every derived value glides
  // instead of snapping frame-to-frame — this is what makes the hero feel smooth.
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.5,
    restDelta: 0.0005
  });

  // Giant wordmark: drifts up and fades as you scroll into the photo.
  const wordY = useTransform(progress, [0, 0.6], ["0%", "-40%"]);
  const wordScale = useTransform(progress, [0, 0.6], [1, 0.94]);
  const wordOpacity = useTransform(progress, [0, 0.4], [1, 0]);

  // Photo band: starts as a strip at the bottom, then its top edge rises to 0
  // so it expands upward and fills the whole frame.
  const photoTop = useTransform(progress, [0, 0.72], ["54%", "0%"]);
  const photoScale = useTransform(progress, [0, 1], [1.12, 1]);

  // Optical-flow texture drifts up slowly behind everything.
  const fieldY = useTransform(progress, [0, 1], ["0%", "-6%"]);

  return (
    <section ref={ref} className="relative h-[220vh] bg-[#030303]">
      {/* Sticky viewport frame — everything is positioned relative to this */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Brand-tinted field (blue/violet glow) so the hero matches the rest of the site */}
        <div className="hero-field pointer-events-none absolute inset-0 z-0" aria-hidden />

        {/* Optical-flow texture field — brand-blue wisps behind the wordmark.
            Must come AFTER .hero-field: its base gradient is opaque and would cover this. */}
        <motion.div
          style={reduced ? undefined : { y: fieldY }}
          className="pointer-events-none absolute inset-0 z-0 scale-110"
          aria-hidden
        >
          <Image
            src={FLOW_TEXTURE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-55 mix-blend-screen"
          />
          {/* Keep the top readable and settle the texture into the stage at the bottom */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,3,0.35)_0%,transparent_30%,rgba(3,3,3,0.6)_100%)]" />
        </motion.div>

        {/* Faint vertical grid lines like the reference */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div className="mx-auto grid h-full max-w-[104rem] grid-cols-2 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border-r border-white/[0.05] first:border-l" />
            ))}
          </div>
        </div>

        {/* Availability rail — clearly below the floating nav pill */}
        <div className="absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-[104rem] items-start justify-end px-5 pt-32 sm:px-8">
          <div className="hidden text-right sm:block">
            <p className="flex items-center justify-end gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-white/45">
              <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              Available for Projects
            </p>
            <Link href="/request-demo" className="text-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent">
              Start Project
            </Link>
          </div>
        </div>

        {/* Giant wordmark — vertically centred in the upper area */}
        <motion.div
          style={reduced ? undefined : { y: wordY, scale: wordScale, opacity: wordOpacity }}
          className="absolute inset-x-0 top-0 z-10 mx-auto flex h-[62%] w-full max-w-[104rem] items-center px-5 pt-32 sm:px-8"
        >
          <div className="flex w-full items-end justify-between gap-8">
            {/* Brand wordmark — the official logotype with the gradient A */}
            <h1 className="min-w-0 flex-1">
              <span className="sr-only">VISRAX</span>
              <Image
                src="/brand/logo-wordmark-xl.png"
                alt=""
                width={3200}
                height={366}
                priority
                sizes="(min-width: 1024px) 75vw, 92vw"
                className="h-auto w-full max-w-[58rem] drop-shadow-[0_0_40px_rgba(33,76,255,0.18)]"
                aria-hidden
              />
            </h1>

            {/* Right stat — in-flow, baseline-aligned with the wordmark */}
            <div className="hidden shrink-0 pb-3 text-right lg:block">
              <p className="font-display text-5xl font-semibold tracking-tight text-white">120+</p>
              <p className="mt-1 text-sm text-white/45">sites monitored</p>
            </div>
          </div>
        </motion.div>

        {/* Expanding photo band — its top edge rises from 54% to 0% as you scroll */}
        <motion.div
          style={reduced ? { top: "54%" } : { top: photoTop }}
          className="absolute inset-x-0 bottom-0 z-[15] overflow-hidden"
        >
          <motion.div style={reduced ? undefined : { scale: photoScale }} className="absolute inset-0">
            <Image
              src={HERO_PHOTO}
              alt="Visrax detecting vehicles and a pedestrian on a city street at dusk"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[55%_center]"
            />
            {/* Blend the photo into the theme: fade top/left/bottom into #030303 + a subtle brand-blue tint */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#030303_0%,transparent_22%,transparent_72%,rgba(3,3,3,0.85)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,0.8)_0%,transparent_24%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(33,76,255,0.10),transparent_60%)] mix-blend-screen" />
          </motion.div>
        </motion.div>

        {/* Tagline — fills the dark left half of the photo band. Sits higher on
            mobile where the CTA pills stack into two rows. */}
        <div className="absolute bottom-44 left-5 right-5 z-30 max-w-md sm:bottom-28 sm:left-8 sm:right-auto">
          <p className="eyebrow mb-4">Object Detection · Monitoring</p>
          <p className="font-display text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
            Real-time awareness from the cameras you already have.
          </p>
        </div>

        {/* Floating CTA pills — pinned to the sticky viewport bottom */}
        <div className="absolute bottom-6 left-5 right-5 z-30 flex flex-wrap items-center gap-3 sm:left-8 sm:right-auto">
          <Link
            href="/request-demo"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-black/70 px-6 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/35 hover:bg-black/85"
          >
            Start Your Project
            <ArrowUpRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="/company/contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Book a Free Strategy Call
            <Phone aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
