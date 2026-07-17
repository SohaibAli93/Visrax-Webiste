"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
export type CarouselItem = {
  slug: string;
  title: string;
  eyebrow: string;
  image: string;
};

const CYCLE_MS = 4200;
const ease = [0.22, 1, 0.36, 1] as const;

// Position of each card relative to the active one.
// `spread` is the horizontal gap (px) between neighbouring cards — derived from
// the container width so the fan covers the whole grid on wide screens.
function transformFor(offset: number, spread: number, reduced: boolean) {
  const abs = Math.abs(offset);
  const dir = Math.sign(offset);
  // Cards stay fully opaque so stacked images never bleed through each other;
  // only cards outside the visible range are hidden. Depth is conveyed by a
  // dark scrim (`dim`) over inactive cards instead of card transparency.
  const opacity = abs > 2 ? 0 : 1;
  const dim = offset === 0 ? 0 : Math.min(0.72, 0.34 + (abs - 1) * 0.22);
  if (reduced) {
    return { x: offset * spread, rotate: 0, scale: offset === 0 ? 1 : 0.92, opacity, dim, zIndex: 50 - abs };
  }
  return {
    x: dir * (spread * abs),
    rotate: dir * (abs === 1 ? 4 : 7),
    scale: offset === 0 ? 1 : 1 - abs * 0.08,
    opacity,
    dim,
    zIndex: 50 - abs
  };
}

export function IndustriesCarousel({ items }: { items: CarouselItem[] }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [spread, setSpread] = useState(320);
  const stageRef = useRef<HTMLDivElement>(null);
  const total = items.length;

  const go = useCallback(
    (next: number) => setIndex((next + total) % total),
    [total]
  );

  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), CYCLE_MS);
    return () => clearInterval(id);
  }, [paused, reduced, total, index]);

  // Measure the stage and spread cards to fill the full grid width.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      // Fan the two side cards on each side across the available width.
      // Divide by ~4 so ±2 offsets reach near the edges.
      setSpread(Math.max(200, Math.min(w / 3.4, 440)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const active = items[index];

  return (
    <div
      // overflow-x-clip: the fanned side cards extend far past the viewport;
      // without clipping they expand the mobile layout viewport and the whole
      // page renders zoomed-out.
      className="relative overflow-x-clip"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stage */}
      <div
        ref={stageRef}
        className="relative flex h-[300px] items-center justify-center sm:h-[560px] lg:h-[680px]"
      >
        {items.map((item, i) => {
          // shortest signed distance around the ring
          let offset = i - index;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;
          const t = transformFor(offset, spread, !!reduced);
          const isActive = offset === 0;

          return (
            <motion.div
              key={item.slug}
              className="absolute [backface-visibility:hidden] [transform:translateZ(0)] will-change-transform"
              style={{ zIndex: t.zIndex }}
              initial={false}
              animate={{ x: t.x, rotate: t.rotate, scale: t.scale, opacity: t.opacity }}
              transition={{ duration: reduced ? 0.3 : 0.9, ease }}
            >
              <Link
                href={`/industries/${item.slug}`}
                tabIndex={isActive ? 0 : -1}
                aria-hidden={!isActive}
                onClick={(e) => {
                  if (!isActive) {
                    e.preventDefault();
                    go(i);
                  }
                }}
                className="group relative block aspect-[16/10] w-[84vw] max-w-[1000px] overflow-hidden rounded-[1.5rem] bg-black shadow-[0_40px_90px_-20px_rgba(0,0,0,0.85),inset_0_0_0_1px_rgba(255,255,255,0.07)] [backface-visibility:hidden] [transform:translateZ(0)] sm:w-[64vw] lg:w-[60vw]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 1000px, 84vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  priority={i === 0}
                />
                {/* Legibility gradient — only on the front card, so side cards aren't glossy */}
                {isActive ? (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                ) : null}

                {/* Depth scrim — darkens inactive cards without making them transparent */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-black"
                  initial={false}
                  animate={{ opacity: t.dim }}
                  transition={{ duration: reduced ? 0.3 : 0.9, ease }}
                />

                {/* Active-only label + open affordance */}
                <AnimatePresence>
                  {isActive ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 sm:inset-x-7 sm:bottom-7"
                    >
                      <div>
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-accent">
                          {item.eyebrow}
                        </p>
                        <p className="mt-2 font-display text-lg font-semibold text-white sm:text-3xl lg:text-4xl">
                          {item.title}
                        </p>
                      </div>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#214cff] text-white shadow-lg shadow-[#214cff]/30 transition group-hover:scale-105 sm:h-14 sm:w-14">
                        <ArrowUpRight aria-hidden className="h-5 w-5 sm:h-6 sm:w-6" />
                      </span>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Progress dots */}
      <div className="mt-8 flex items-center justify-center gap-2.5" role="tablist" aria-label="Industries">
        {items.map((item, i) => (
          <button
            key={item.slug}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${item.title}`}
            onClick={() => go(i)}
            className="group relative h-1.5 overflow-hidden rounded-full bg-white/15 transition-all duration-500"
            style={{ width: i === index ? 40 : 16 }}
          >
            {i === index ? (
              <motion.span
                key={`${index}-${paused}`}
                className="absolute inset-y-0 left-0 rounded-full bg-white"
                initial={{ width: reduced || paused ? "100%" : "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: reduced || paused ? 0 : CYCLE_MS / 1000, ease: "linear" }}
              />
            ) : (
              <span className="absolute inset-0 rounded-full bg-white/30 opacity-0 transition-opacity group-hover:opacity-100" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
