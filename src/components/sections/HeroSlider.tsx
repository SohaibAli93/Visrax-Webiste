"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";

const SLIDES = [
  { src: "/brand/hero-slider/hero-slide-01-street.png", scene: "City street", detect: "Vehicles · Pedestrians" },
  { src: "/brand/hero-slider/hero-slide-02-warehouse.png", scene: "Warehouse", detect: "Forklift · Worker safety" },
  { src: "/brand/hero-slider/hero-slide-03-entrance.png", scene: "Gated entrance", detect: "Vehicle · Access control" }
] as const;

const SLIDE_MS = 6000;
const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } }
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } }
};

const pad = (n: number) => String(n + 1).padStart(2, "0");

export function HeroSlider() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  const go = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [index]);

  const active = SLIDES[index];

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#030303]">
      {/* Slider layer */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.4 : 1.2, ease }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reduced ? 1 : 1.06 }}
              animate={{ scale: reduced ? 1 : 1.14 }}
              transition={{ duration: SLIDE_MS / 1000 + 1.4, ease: "linear" }}
            >
              <Image
                src={active.src}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-[70%_center] lg:object-center"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Readability wash — dark enough for text, light enough to keep the scene visible on the left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(3,3,3,0.72) 0%, rgba(3,3,3,0.5) 30%, rgba(3,3,3,0.16) 58%, rgba(3,3,3,0.04) 100%), linear-gradient(180deg, rgba(3,3,3,0.45) 0%, transparent 26%, transparent 60%, rgba(3,3,3,0.8) 100%)"
          }}
        />
        {/* Fine technical grain over the scene */}
        <div className="hero-data-lines pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      </div>

      {/* Camera-frame corner brackets */}
      <div className="pointer-events-none absolute inset-4 z-10 hidden sm:block lg:inset-6">
        {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-l border-b", "right-0 bottom-0 border-r border-b"].map(
          (pos) => (
            <span key={pos} className={`absolute h-7 w-7 border-white/25 ${pos}`} />
          )
        )}
      </div>

      {/* Content layer */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[92rem] flex-col px-4 pb-10 pt-24 sm:px-8 lg:px-12">
        {/* Top meta rail */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="flex items-center justify-between border-b border-white/10 pb-5 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-white/45"
        >
          <span className="flex items-center gap-2.5">
            <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-[#8ca7ff]" />
            System online
          </span>
          <span className="hidden sm:inline">Visrax Vision Engine</span>
          <span>{SLIDES.length} feeds</span>
        </motion.div>

        {/* Main split */}
        <div className="relative flex flex-1 items-center py-12">
          {/* Left: headline */}
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
            <motion.p
              variants={item}
              className="mb-6 font-mono text-[0.7rem] uppercase tracking-[0.32em] text-white/55"
            >
              Real-time visual intelligence
            </motion.p>

            <motion.h1
              variants={item}
              className="font-display text-balance text-[2.75rem] font-medium leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.5rem]"
            >
              Every camera,
              <br />
              <span className="text-white/45">made intelligent.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-7 max-w-xl text-base font-light leading-8 text-white/70 sm:text-lg"
            >
              Visrax turns the cameras you already have into a real-time detection, alerting, and
              multi-site monitoring system — so your team sees what matters, the moment it happens.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href="/request-demo" variant="light">
                Request a Demo
              </ButtonLink>
              <ButtonLink href="/platform" variant="ghost" className="text-white/70 hover:text-white">
                See how it works →
              </ButtonLink>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom control rail */}
        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <div className="flex items-center gap-3">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show ${slide.scene}`}
                aria-current={i === index}
                className="group relative h-1 overflow-hidden rounded-full bg-white/15 transition-all duration-500"
                style={{ width: i === index ? 44 : 18 }}
              >
                {i === index ? (
                  <motion.span
                    key={index}
                    className="absolute inset-y-0 left-0 rounded-full bg-white"
                    initial={{ width: reduced ? "100%" : "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: reduced ? 0 : SLIDE_MS / 1000, ease: "linear" }}
                  />
                ) : (
                  <span className="absolute inset-0 rounded-full bg-white/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-5 font-mono text-[0.68rem] tracking-[0.15em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.4, ease }}
                className="hidden text-white/60 sm:inline"
              >
                {active.scene}
              </motion.span>
            </AnimatePresence>
            <span className="text-white/30">
              <span className="text-white/80">{pad(index)}</span> — {pad(SLIDES.length - 1)}
            </span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#030303] to-transparent" />
    </section>
  );
}
