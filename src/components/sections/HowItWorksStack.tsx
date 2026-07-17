"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue
} from "framer-motion";
import { useRef } from "react";

/* Full-screen cards in the site theme: dark elevated surface with a per-card
   brand tint, inset rounded image left, big headline right, pill rows with
   gradient arrow buttons, label + counter at the bottom. */
const STEPS = [
  {
    n: "01",
    title: ["Start With", "Your Cameras"],
    copy: "We connect to the views your team already uses — entrances, floors, warehouses, parking areas, and restricted spaces.",
    labels: ["Head Office", "Warehouse 02", "Parking Entrance"],
    image: "/images/collage/collage-08-control-room.png",
    alt: "Operator reviewing a wall of live camera feeds",
    tint: "rgba(33,76,255,0.11)" // brand blue
  },
  {
    n: "02",
    title: ["Choose What", "To Watch For"],
    copy: "Pick the situations that matter to your business: someone in a restricted area, a vehicle at the gate, a queue building up, or missing safety gear.",
    labels: ["Restricted entry", "Safety gear check", "Queue buildup"],
    image: "/images/collage/collage-01-warehouse.png",
    alt: "Worker detected walking a warehouse aisle",
    tint: "rgba(124,60,255,0.10)" // violet
  },
  {
    n: "03",
    title: ["Get Alerts", "You Can Act On"],
    copy: "When something important happens, Visrax sends a clear alert with the details and evidence — so the right people can respond quickly.",
    labels: ["Alert sent", "Evidence saved", "Issue closed"],
    image: "/images/collage/collage-05-traffic.png",
    alt: "Vehicles and a pedestrian detected at a night intersection",
    tint: "rgba(61,107,255,0.10)" // cyan-blue
  }
];

/* Enter window for card i (card 0 is present from the start). */
const WINDOWS: [number, number][] = [
  [0, 0],
  [0.3, 0.52],
  [0.62, 0.84]
];

export function HowItWorksStack() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5, restDelta: 0.0005 });

  if (reduced) {
    return (
      <div className="mt-10 grid gap-6">
        {STEPS.map((step) => (
          <StepCard key={step.n} step={step} />
        ))}
      </div>
    );
  }

  // z-[55] lifts the pinned cards above the fixed nav (z-50) so the
  // full-screen takeover stays clean during transitions.
  return (
    <div ref={ref} className="relative z-[55] mt-12 h-[340vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#030303]">
        {STEPS.map((step, i) => (
          <AnimatedCard key={step.n} step={step} index={i} p={p} />
        ))}
      </div>
    </div>
  );
}

function AnimatedCard({
  step,
  index,
  p
}: {
  step: (typeof STEPS)[number];
  index: number;
  p: MotionValue<number>;
}) {
  /* Diagonal conveyor: the incoming card slides in from the top-right while
     the outgoing card slides away to the bottom-left — both tilted at the
     same angle mid-transition, straightening as the new card centres. */
  const [start, end] = WINDOWS[index];
  const first = index === 0;
  const enterX = useTransform(p, [start, end], first ? ["0%", "0%"] : ["110%", "0%"]);
  const enterY = useTransform(p, [start, end], first ? ["0%", "0%"] : ["-115%", "0%"]);
  const enterRotate = useTransform(p, [start, (start + end) / 2, end], first ? [0, 0, 0] : [-10, -10, 0]);

  const [nextStart, nextEnd] = WINDOWS[index + 1] ?? [1.1, 1.2];
  const exitX = useTransform(p, [nextStart, nextEnd], ["0%", "-110%"]);
  const exitY = useTransform(p, [nextStart, nextEnd], ["0%", "115%"]);
  const exitRotate = useTransform(p, [nextStart, (nextStart + nextEnd) / 2, nextEnd], [0, -10, -10]);

  return (
    <motion.div style={{ x: enterX, y: enterY, rotate: enterRotate, zIndex: 10 + index }} className="absolute inset-0">
      <motion.div style={{ x: exitX, y: exitY, rotate: exitRotate }} className="h-full w-full">
        <StepCard step={step} />
      </motion.div>
    </motion.div>
  );
}

function StepCard({ step }: { step: (typeof STEPS)[number] }) {
  return (
    <div className="relative grid h-full w-full overflow-hidden border border-white/10 bg-[#0a0a10] lg:min-h-[44rem] lg:grid-cols-[1.15fr_1fr]">
      {/* Per-card brand ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse 70% 60% at 78% 8%, ${step.tint}, transparent 60%)` }}
      />
      {/* Top edge highlight */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Inset rounded image */}
      <div className="relative p-4 pb-0 sm:p-6 sm:pb-0 lg:p-6">
        <div className="relative h-44 w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] sm:h-72 lg:h-full">
          <Image src={step.image} alt={step.alt} fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a10]/30 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col px-5 py-6 sm:px-10 sm:py-10 lg:py-16 lg:pl-8 lg:pr-16">
        <span className="font-mono text-[0.7rem] font-medium tracking-[0.22em] text-accent">STEP {step.n}</span>
        <h3 className="mt-3 font-display font-bold leading-[1.04] tracking-tight text-white [font-size:clamp(1.9rem,3vw+1rem,4.25rem)] sm:mt-5">
          {step.title[0]}
          <br />
          <span className="text-gradient">{step.title[1]}</span>
        </h3>
        <p className="mt-4 max-w-md text-[0.95rem] leading-6 text-white/50 sm:mt-7 sm:text-[1.05rem] sm:leading-7">{step.copy}</p>

        {/* Pill rows */}
        <div className="mt-6 grid gap-2.5 sm:mt-10 sm:gap-4">
          {step.labels.map((label) => (
            <div
              key={label}
              className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] py-1.5 pl-5 pr-1.5 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06] sm:py-2 sm:pl-6 sm:pr-2"
            >
              <span className="text-xs font-bold uppercase tracking-[0.06em] text-white/80 sm:text-sm">{label}</span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#214cff] to-[#5d3dff] shadow-[0_12px_32px_-12px_rgba(33,76,255,0.6)] transition-transform duration-300 group-hover:translate-x-0.5 sm:h-14 sm:w-14">
                <ArrowRight aria-hidden className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              </span>
            </div>
          ))}
        </div>

        {/* Footer row */}
        <div className="mt-auto flex items-center justify-between pt-6 sm:pt-12">
          <span className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.04em] text-white/70">
            <span className="live-dot h-2 w-2 rounded-full bg-accent" />
            How it works
          </span>
          <span className="font-display text-lg font-bold text-white">
            {step.n}
            <span className="font-semibold text-white/30">/03</span>
          </span>
        </div>
      </div>
    </div>
  );
}
