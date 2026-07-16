"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue
} from "framer-motion";
import { BarChart3, BellRing, Map, MapPinned, Route, ScanLine, type LucideIcon } from "lucide-react";
import { useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const SCENE_IMAGE = "/brand/hero-slider/hero-slide-02-warehouse.png";

const FEATURES: { title: string; copy: string; icon: LucideIcon }[] = [
  { title: "Real-Time Detection", copy: "Spots people, vehicles, and equipment the moment they appear on camera.", icon: ScanLine },
  { title: "Instant Alerts", copy: "Notifies the right team the second something important happens.", icon: BellRing },
  { title: "Zone Monitoring", copy: "Watches restricted areas, entrances, and safety zones around the clock.", icon: Map },
  { title: "Movement Tracking", copy: "Follows people and vehicles as they move across every monitored space.", icon: Route },
  { title: "Multi-Site Visibility", copy: "Every location — offices, factories, warehouses — in one live view.", icon: MapPinned },
  { title: "Evidence & Reports", copy: "Turns activity into reviewable incidents, analytics, and clear reports.", icon: BarChart3 }
];

const SPECS = [
  {
    n: "01",
    title: "Detection Accuracy",
    copy: "Object detection models identify people, vehicles, and equipment across varied lighting and camera angles — flagging what matters without drowning teams in noise."
  },
  {
    n: "02",
    title: "Alert Precision",
    copy: "Custom rules by zone, object class, and severity convert raw activity into prioritised incidents, so the right people respond to the right events fast."
  },
  {
    n: "03",
    title: "Operational Scale",
    copy: "From one camera to hundreds across many sites, Visrax keeps a single, coherent view of health, events, and evidence for the whole organisation."
  }
];

// A single pinned scroll experience. The stage stays sticky while the tall
// scroll track advances `progress` from 0 → 1 across five scenes.
export function ScrollNarrative() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.5, restDelta: 0.0005 });

  return (
    <section ref={ref} className="relative h-[600vh] bg-[#030303]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Brand ambient — blue/violet field so the stage isn't flat black */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 70% 20%, rgba(33,76,255,0.07), transparent 60%), radial-gradient(ellipse 45% 40% at 15% 80%, rgba(124,60,255,0.05), transparent 55%)"
          }}
          aria-hidden
        />
        {/* Faint grid columns for structure */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div className="mx-auto grid h-full max-w-[104rem] grid-cols-2 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border-r border-white/[0.05] first:border-l" />
            ))}
          </div>
        </div>

        {!reduced ? (
          <>
            <Wordmark p={p} />
            <SceneIntro p={p} />
            <SceneGrid p={p} />
            <SceneImage p={p} />
            <SceneTitle p={p} />
            <SceneSpecs p={p} />
          </>
        ) : (
          <ReducedFallback />
        )}
      </div>
    </section>
  );
}

/* The ONE wordmark — starts over the right panel, glides to centre as the rail
   exits, dims behind the arriving cards, and fades out before the image scene. */
function Wordmark({ p }: { p: MotionValue<number> }) {
  const x = useTransform(p, [0, 0.14], ["21vw", "0vw"]);
  const opacity = useTransform(p, [0, 0.16, 0.28, 0.34, 0.38], [1, 1, 0.14, 0.14, 0]);

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden">
      <motion.h2
        style={{ x, opacity }}
        className="whitespace-nowrap bg-gradient-to-b from-white via-white to-white/40 bg-clip-text font-display font-semibold leading-none tracking-[-0.03em] text-transparent [filter:drop-shadow(0_0_50px_rgba(33,76,255,0.35))] [font-size:clamp(2.5rem,5.5vw,6.5rem)]"
      >
        Engineered To See
      </motion.h2>
    </div>
  );
}

/* Scene 1 — the info rail pushes out to the left, revealing the full dark stage
   with the wordmark gliding to centre behind it (p: 0 → 0.14). */
function SceneIntro({ p }: { p: MotionValue<number> }) {
  const railX = useTransform(p, [0, 0.14], ["0%", "-105%"]);

  return (
    <div className="pointer-events-none absolute inset-0 z-50 hidden lg:block">
      <motion.div
        style={{ x: railX }}
        className="pointer-events-auto relative flex h-full w-[42%] flex-col justify-center gap-16 overflow-hidden border-r border-white/10 bg-[#050506] px-10"
      >
        {/* Rail ambient — very faint, keeps the panel near-black */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 50% at 30% 30%, rgba(33,76,255,0.04), transparent 65%)" }}
          aria-hidden
        />
        <div className="relative">
          <p className="eyebrow mb-6">Visrax Vision Engine</p>
          <p className="font-mono text-sm uppercase leading-relaxed tracking-[0.24em] text-white/60">
            The science of surveillance,
            <br />
            the art of response.
          </p>
        </div>
        <div className="relative max-w-sm">
          <h3 className="font-display text-3xl font-semibold tracking-tight text-white">
            Operational <span className="text-gradient">Intelligence</span>
          </h3>
          <p className="mt-4 text-base leading-7 text-white/50">
            Advanced detection models built to turn the cameras you already have into a real-time monitoring system — the moment something matters.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* Scene 2 — cards fly in from the right, one at a time, settling into the grid
   over the dimmed wordmark (p: 0.1 → 0.4). */
function SceneGrid({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.1, 0.14, 0.36, 0.4], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center overflow-hidden">
      <div className="mx-auto grid w-full max-w-[104rem] grid-cols-2 gap-4 px-6 sm:px-10 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} feature={f} index={i} p={p} />
        ))}
      </div>
    </motion.div>
  );
}

function FeatureCard({
  feature,
  index,
  p
}: {
  feature: { title: string; copy: string; icon: LucideIcon };
  index: number;
  p: MotionValue<number>;
}) {
  // Each card flies in from the right edge, staggered, and settles into its slot.
  const start = 0.13 + index * 0.028;
  const end = start + 0.05;
  const x = useTransform(p, [start, end], ["130%", "0%"]);
  const rotate = useTransform(p, [start, end], [4, 0]);
  const cardOpacity = useTransform(p, [start, start + 0.02], [0, 1]);
  const Icon = feature.icon;

  return (
    <motion.div
      style={{ x, rotate, opacity: cardOpacity }}
      className="group relative flex min-h-[clamp(9rem,26vh,15rem)] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#0a0a10] to-[#050507] p-5 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.9)] sm:p-6"
    >
      {/* Top edge highlight */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden />
      {/* Corner glow — kept faint */}
      <span
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, rgba(33,76,255,0.08), transparent 70%)" }}
        aria-hidden
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-[#214cff]/15 to-[#7c3cff]/[0.07] shadow-[0_8px_24px_-8px_rgba(33,76,255,0.2)]">
          <Icon aria-hidden className="h-5 w-5 text-accent" />
        </div>
        <span className="font-mono text-[0.65rem] font-medium tracking-[0.2em] text-white/30">0{index + 1}</span>
      </div>

      <div className="relative">
        <p className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">{feature.title}</p>
        <p className="mt-2.5 text-sm leading-6 text-white/50">{feature.copy}</p>
      </div>
    </motion.div>
  );
}

/* Scene 3 — center image column expands to full-bleed (p: 0.38 → 0.58) */
function SceneImage({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.38, 0.42, 0.56, 0.62], [0, 1, 1, 0]);
  const width = useTransform(p, [0.42, 0.56], ["30%", "100%"]);
  const height = useTransform(p, [0.42, 0.56], ["78%", "100%"]);
  const radius = useTransform(p, [0.42, 0.56], ["1rem", "0rem"]);
  const imgScale = useTransform(p, [0.42, 0.62], [1.15, 1]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 z-20 flex items-center justify-center">
      <motion.div
        style={{ width, height, borderRadius: radius }}
        className="relative overflow-hidden shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.08)]"
      >
        <motion.div style={{ scale: imgScale }} className="absolute inset-0">
          <Image src={SCENE_IMAGE} alt="Visrax monitoring an active warehouse" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/70 via-transparent to-[#030303]/30" />
          {/* Brand tint */}
          <div
            className="absolute inset-0 mix-blend-screen"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(33,76,255,0.12), transparent 60%)" }}
            aria-hidden
          />
        </motion.div>
        {/* Feed chip */}
        <div className="absolute left-5 top-5 flex items-center gap-2.5 rounded-full border border-white/10 bg-black/50 px-3.5 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/65 backdrop-blur-md">
          <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          Live deployment · Warehouse 02
        </div>
      </motion.div>
    </motion.div>
  );
}

/* Scene 4 — section title reveal (p: 0.58 → 0.72) */
function SceneTitle({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.58, 0.64, 0.7, 0.76], [0, 1, 1, 0]);
  const y = useTransform(p, [0.58, 0.7], [60, -20]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 z-20 flex items-center">
      <motion.div style={{ y }} className="mx-auto grid w-full max-w-[104rem] items-end gap-6 px-6 sm:px-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="eyebrow mb-6">Field performance</p>
          <h2 className="font-display font-bold leading-[0.95] tracking-[-0.03em] text-white [font-size:clamp(3rem,9vw,7.5rem)]">
            Proven in <span className="text-gradient">the field.</span>
          </h2>
        </div>
        <p className="font-mono text-sm uppercase leading-relaxed tracking-[0.2em] text-white/45 lg:pb-4 lg:text-right">
          See how Visrax responds to every operational condition
        </p>
      </motion.div>
    </motion.div>
  );
}

/* Scene 5 — numbered spec accordion + technical diagram (p: 0.74 → 1) */
function SceneSpecs({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.74, 0.8, 1], [0, 1, 1]);
  const [active, setActive] = useState(0);

  // Auto-advance the active spec as you scroll through the final stretch.
  const idx = useTransform(p, [0.8, 0.86, 0.92, 1], [0, 1, 2, 2]);
  useMotionValueEvent(idx, "change", (v) => {
    const rounded = Math.round(v);
    setActive((prev) => (prev === rounded ? prev : rounded));
  });

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 z-10 flex items-center">
      <div className="mx-auto grid w-full max-w-[104rem] gap-8 px-6 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* Accordion */}
        <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-b from-white/[0.03] to-transparent shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
          {SPECS.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.n}
                type="button"
                onClick={() => setActive(i)}
                className={`relative block w-full px-6 py-6 text-left transition-colors duration-300 ${isActive ? "bg-[#214cff]/[0.08]" : "hover:bg-white/[0.02]"}`}
              >
                {/* Active accent bar */}
                <span
                  className={`absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-[#214cff] to-[#7c3cff] transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}
                  aria-hidden
                />
                <div className="flex items-baseline justify-between gap-4">
                  <span className={`font-display text-xl font-semibold tracking-tight transition-colors duration-300 ${isActive ? "text-white" : "text-white/55"}`}>
                    {s.title}
                  </span>
                  <span className={`font-mono text-sm transition-colors duration-300 ${isActive ? "text-accent" : "text-white/30"}`}>{s.n}.</span>
                </div>
                <motion.div initial={false} animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }} className="overflow-hidden">
                  <p className="pt-4 text-sm leading-6 text-white/55">{s.copy}</p>
                </motion.div>
              </button>
            );
          })}
        </div>

        {/* Technical diagram */}
        <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-b from-[#0a0a10] to-[#050507] p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
          <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden />
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(33,76,255,0.07), transparent 70%)" }}
            aria-hidden
          />
          <LayerDiagram active={active} />
        </div>
      </div>
    </motion.div>
  );
}

/* Layer diagram highlighting the active spec's layer. */
function LayerDiagram({ active }: { active: number }) {
  const layers = [
    { label: "AR-4000 · Detection Layer" },
    { label: "AR-3000 · Alerting Layer" },
    { label: "AR-2000 · Multi-Site Layer" }
  ];
  return (
    <div className="grid gap-3">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/40">System architecture</p>
      <div className="grid gap-2">
        {layers.map((l, i) => {
          const on = i === active;
          return (
            <motion.div
              key={l.label}
              animate={{
                borderColor: on ? "rgba(147,168,255,0.6)" : "rgba(255,255,255,0.1)",
                backgroundColor: on ? "rgba(33,76,255,0.12)" : "rgba(255,255,255,0.02)"
              }}
              className="flex items-center justify-between rounded-xl border px-5 py-6"
            >
              <span className={`font-mono text-xs tracking-wide ${on ? "text-white" : "text-white/45"}`}>{l.label}</span>
              <span className={`h-2.5 w-2.5 rounded-full ${on ? "bg-accent" : "bg-white/20"}`} />
            </motion.div>
          );
        })}
        <div className="mt-1 flex items-center justify-between rounded-xl border border-dashed border-white/10 px-5 py-4">
          <span className="font-mono text-xs text-white/35">Prepared camera infrastructure</span>
        </div>
      </div>
    </div>
  );
}

/* Static, non-animated version for reduced-motion users. */
function ReducedFallback() {
  return (
    <div className="mx-auto flex h-full max-w-[104rem] flex-col justify-center gap-10 px-6 py-24 sm:px-10">
      <h2 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">Engineered to see. Proven in the field.</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-2xl border border-white/12 bg-white/[0.02] p-6">
            <p className="font-display text-lg font-semibold text-white">{f.title}</p>
            <p className="mt-3 text-sm leading-6 text-white/55">{f.copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
