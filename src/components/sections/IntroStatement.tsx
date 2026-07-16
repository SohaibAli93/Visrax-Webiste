"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Headline split into words. Words with `dim: true` render at lower opacity so
// the emphasis (the "what it does" part) reads as secondary.
const HEADLINE: { text: string; dim?: boolean }[] = [
  { text: "Visrax" },
  { text: "turns" },
  { text: "the" },
  { text: "cameras" },
  { text: "you" },
  { text: "already" },
  { text: "have" },
  { text: "into", dim: true },
  { text: "a", dim: true },
  { text: "real-time", dim: true },
  { text: "detection", dim: true },
  { text: "and", dim: true },
  { text: "monitoring", dim: true },
  { text: "system.", dim: true }
];

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } }
};

// Each word "pops" up and overshoots, then springs back and settles into place.
const word = {
  hidden: { y: "120%", scale: 0.7, opacity: 0 },
  show: {
    y: "0%",
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 320, damping: 15, mass: 0.7 }
  }
};

export function IntroStatement() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"]
  });

  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["8%", "-4%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#030303] py-24 lg:py-32">
      {/* Subtle brand glow from the left, matching the hero */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_50%_60%_at_10%_30%,rgba(33,76,255,0.10),transparent_60%)]" aria-hidden />

      {/* Faint vertical grid lines */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="mx-auto grid h-full max-w-[104rem] grid-cols-2 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border-r border-white/[0.05] first:border-l" />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[104rem] gap-16 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <motion.div style={reduced ? undefined : { y }}>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.6, ease }}
            className="font-mono text-sm font-medium uppercase tracking-[0.24em] text-white/40"
          >
            Introduction
          </motion.p>
          <motion.h2
            variants={reduced ? undefined : container}
            initial={reduced ? false : "hidden"}
            whileInView={reduced ? undefined : "show"}
            viewport={{ once: true, margin: "-20%" }}
            className="mt-6 flex flex-wrap font-display font-bold leading-[1.02] tracking-[-0.03em] text-white [font-size:clamp(2.25rem,6vw,5rem)]"
          >
            {HEADLINE.map((w, i) => (
              <span key={i} className="mr-[0.25em] inline-flex overflow-hidden pb-[0.12em] pt-[0.08em]">
                <motion.span
                  variants={reduced ? undefined : word}
                  className={`inline-block origin-bottom ${w.dim ? "text-white/45" : "text-white"}`}
                >
                  {w.text}
                </motion.span>
              </span>
            ))}
          </motion.h2>
        </motion.div>

        <motion.figure
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:pb-4"
        >
          <blockquote className="text-pretty font-display text-2xl font-medium leading-snug text-white sm:text-3xl">
            &ldquo;We believe monitoring shouldn&rsquo;t just watch.{" "}
            <span className="text-white/45">It should help teams act the moment something matters.&rdquo;</span>
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] font-display text-sm font-semibold text-white">
              V
            </span>
            <span>
              <span className="block text-sm font-semibold text-white">Visrax Team</span>
              <span className="block text-sm text-white/45">Product &amp; Operations</span>
            </span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
