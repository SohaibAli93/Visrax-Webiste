"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue
} from "framer-motion";
import { useRef, useState } from "react";

const SCENE_IMAGE = "/images/monitoring-warehouse-premium-section-2x.webp";

const FEATURES: { title: string; copy: string }[] = [
  { title: "Real-Time Detection", copy: "Spots people, vehicles, and equipment the moment they appear on camera." },
  { title: "Instant Alerts", copy: "Notifies the right team the second something important happens." },
  { title: "Zone Monitoring", copy: "Watches restricted areas, entrances, and safety zones around the clock." },
  { title: "Movement Tracking", copy: "Follows people and vehicles as they move across every monitored space." },
  { title: "Multi-Site Visibility", copy: "Every location — offices, factories, warehouses — in one live view." },
  { title: "Evidence & Reports", copy: "Turns activity into reviewable incidents, analytics, and clear reports." }
];

/* Staggered layout — top row shifted right, bottom row shifted left, with the
   centre spacer column left open for the expanding image strip. */
const PLACEMENTS = [
  "lg:col-start-2 lg:row-start-1",
  "lg:col-start-4 lg:row-start-1",
  "lg:col-start-5 lg:row-start-1",
  "lg:col-start-1 lg:row-start-2",
  "lg:col-start-2 lg:row-start-2",
  "lg:col-start-4 lg:row-start-2"
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

// The pinned scroll experience (rail → cards → image strip → full-bleed).
// The image finishes full-bleed while still pinned; the light section is
// pulled up over the track's final 100vh so it slides scroll-by-scroll OVER
// the stuck image, curtain-style.
export function ScrollNarrative() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.5, restDelta: 0.0005 });

  return (
    <>
      <section ref={ref} className="relative h-[500vh] bg-[#030303]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Brand ambient — very soft so the stage stays near-black */}
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 40% at 72% 18%, rgba(33,76,255,0.03), transparent 62%), radial-gradient(ellipse 40% 35% at 12% 82%, rgba(124,60,255,0.02), transparent 55%)"
            }}
            aria-hidden
          />

          {!reduced ? (
            <>
              <Wordmark p={p} />
              <SceneGrid p={p} />
              <SceneImage p={p} />
              <SceneIntro p={p} />
            </>
          ) : (
            <ReducedFallback />
          )}
        </div>
      </section>
      <FieldPerformance />
    </>
  );
}

/* The ONE wordmark — starts over the right panel, glides to centre as the rail
   exits, then stays faint behind the cards until the image goes full-bleed. */
function Wordmark({ p }: { p: MotionValue<number> }) {
  const x = useTransform(p, [0, 0.16], ["21vw", "0vw"]);
  const opacity = useTransform(p, [0, 0.18, 0.3, 0.5, 0.6], [1, 1, 0.1, 0.1, 0]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
      <motion.h2
        style={{ x, opacity }}
        className="whitespace-nowrap bg-gradient-to-b from-white via-white to-white/40 bg-clip-text font-display font-semibold leading-none tracking-[-0.03em] text-transparent [filter:drop-shadow(0_0_28px_rgba(33,76,255,0.06))] [font-size:clamp(2.5rem,5.5vw,6.5rem)]"
      >
        Engineered To See
      </motion.h2>
    </div>
  );
}

/* Scene 1 — the info rail pushes out to the left, revealing the full dark stage
   with the wordmark gliding to centre behind it (p: 0 → 0.16). */
function SceneIntro({ p }: { p: MotionValue<number> }) {
  const railX = useTransform(p, [0, 0.16], ["0%", "-105%"]);

  return (
    <div className="pointer-events-none absolute inset-0 z-50 hidden lg:block">
      <motion.div
        style={{ x: railX }}
        className="pointer-events-auto relative flex h-full w-[42%] flex-col justify-center gap-16 overflow-hidden border-r border-white/10 bg-[#050506] px-10"
      >
        {/* Rail ambient — very faint, keeps the panel near-black */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 50% at 30% 30%, rgba(33,76,255,0.03), transparent 65%)" }}
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

/* Scene 2 — outlined cards fly in and settle into the staggered grid around
   the centre column, over the dimmed wordmark (p: 0.12 → 0.75). */
function SceneGrid({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.12, 0.17, 0.6, 0.7], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden">
      <div className="mx-auto grid w-full max-w-[104rem] grid-cols-2 gap-4 px-6 sm:px-10 lg:grid-cols-[1fr_1fr_minmax(2.75rem,3.5rem)_1fr_1fr] lg:gap-5">
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
  feature: { title: string; copy: string };
  index: number;
  p: MotionValue<number>;
}) {
  // Each card flies in from the right edge, staggered, and settles into its slot.
  const start = 0.15 + index * 0.03;
  const end = start + 0.055;
  const x = useTransform(p, [start, end], ["130%", "0%"]);
  const cardOpacity = useTransform(p, [start, start + 0.02], [0, 1]);

  return (
    <motion.div
      style={{ x, opacity: cardOpacity }}
      className={`relative flex min-h-[clamp(8rem,24vh,14rem)] flex-col justify-between border border-white/35 bg-[#05050a] p-5 sm:p-7 lg:min-h-[clamp(11rem,32vh,17.5rem)] ${PLACEMENTS[index]}`}
    >
      <p className="max-w-[17rem] text-[0.95rem] leading-7 text-white/85 sm:text-base">{feature.copy}</p>
      <p className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">{feature.title}</p>
    </motion.div>
  );
}

/* Scene 3 — a sliver of the image appears in the centre column, widens with
   scroll, and expands to full-bleed over the cards. It holds full-bleed at the
   end of the track so it scrolls away naturally into the next section. */
function SceneImage({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.3, 0.34], [0, 1]);
  const width = useTransform(p, [0.3, 0.38, 0.48, 0.7], ["0vw", "3.4vw", "3.4vw", "100vw"]);
  const height = useTransform(p, [0.48, 0.7], ["68vh", "100vh"]);
  const imgScale = useTransform(p, [0.48, 0.85], [1.1, 1]);

  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
      <motion.div style={{ width, height }} className="relative overflow-hidden">
        <motion.div style={{ scale: imgScale }} className="absolute inset-0">
          <Image src={SCENE_IMAGE} alt="Visrax monitoring an active warehouse" fill sizes="100vw" className="object-cover" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* Light section — big black title, mono note, then the bordered panel with the
   dark active accordion card and the blueprint layer diagram. */
function FieldPerformance() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative z-[60] -mt-[100vh] bg-[#030303] text-white">
      <div className="mx-auto max-w-[104rem] px-6 py-20 sm:px-10 lg:py-28">
        {/* Title row */}
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <h2 className="font-display font-bold leading-[0.95] tracking-[-0.03em] [font-size:clamp(2.75rem,7.5vw,6.5rem)]">
            Proven in <span className="text-gradient">the field.</span>
          </h2>
          <p className="max-w-xs font-mono text-sm font-semibold uppercase leading-relaxed tracking-[0.08em] text-white/55 lg:justify-self-end lg:pt-3">
            See how Visrax responds to every operational condition
          </p>
        </div>

        {/* Panel */}
        <div className="mt-14 grid border border-white/12 bg-white/[0.02] lg:grid-cols-[0.55fr_1.45fr]">
          {/* Accordion */}
          <div className="divide-y divide-white/10 lg:border-r lg:border-white/10">
            {SPECS.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.n}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`block w-full text-left transition-colors duration-300 ${isActive ? "bg-[#214cff] text-white" : "hover:bg-white/[0.04]"}`}
                >
                  {isActive ? (
                    <div className="p-7 sm:p-9">
                      <div className="flex items-center gap-4">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center border-2 border-white" aria-hidden>
                          <span className="h-2 w-2 bg-white" />
                        </span>
                        <span className="font-display text-lg font-bold uppercase tracking-tight sm:text-xl">{s.title}</span>
                      </div>
                      <p className="mt-1 text-right font-display text-4xl font-semibold">{s.n}.</p>
                      <p className="mt-6 max-w-sm text-[0.95rem] leading-7 text-white/90">{s.copy}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-10 px-7 py-9 sm:px-9">
                      <span className="font-mono text-sm text-white/40">{s.n}.</span>
                      <span className="font-display text-2xl font-semibold tracking-tight text-white/80 sm:text-3xl">{s.title}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Blueprint diagram */}
          <div
            className="relative min-h-[24rem] p-4 sm:p-8"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
              backgroundSize: "28px 28px"
            }}
          >
            <StackDiagram active={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Isometric exploded-stack diagram with mono callout labels, blueprint style.
   The layer matching the active spec is filled dark. */
function StackDiagram({ active }: { active: number }) {
  // Isometric slab geometry (2:1 top faces, exploded vertically).
  const CX = 450;
  const W = 200; // half-width of top face
  const H = 100; // half-height of top face
  const D = 24; // slab thickness
  const GAP = 40; // vertical explode gap
  const TOP_Y = 168;

  const layers = [
    { label: "AR-4000\nDETECTION LAYER", side: "left" as const },
    { label: "AR-3000\nALERTING LAYER", side: "right" as const },
    { label: "AR-2000\nMULTI-SITE LAYER", side: "left" as const }
  ];
  const baseY = TOP_Y + layers.length * (D + GAP) + 14;
  const BASE_D = 38;

  const slab = (y: number, depth: number) => ({
    top: `${CX},${y - H} ${CX + W},${y} ${CX},${y + H} ${CX - W},${y}`,
    left: `${CX - W},${y} ${CX},${y + H} ${CX},${y + H + depth} ${CX - W},${y + depth}`,
    right: `${CX + W},${y} ${CX},${y + H} ${CX},${y + H + depth} ${CX + W},${y + depth}`
  });

  const ink = "rgba(235,240,252,0.85)";

  return (
    <svg viewBox="0 0 900 620" className="h-auto w-full" role="img" aria-label="Visrax system architecture layer diagram">
      <defs>
        <pattern id="vx-hatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="7" stroke={ink} strokeWidth="1.4" opacity="0.45" />
        </pattern>
      </defs>

      {/* Incoming feed arrow + target rings on the top face */}
      <ellipse cx={CX} cy={TOP_Y} rx={118} ry={59} fill="none" stroke={ink} strokeWidth="0.8" opacity="0.35" />
      <ellipse cx={CX} cy={TOP_Y} rx={66} ry={33} fill="none" stroke={ink} strokeWidth="0.8" opacity="0.45" />
      <line x1={CX} y1={26} x2={CX} y2={TOP_Y - 34} stroke={ink} strokeWidth="1.4" />
      <polygon points={`${CX - 7},${TOP_Y - 36} ${CX + 7},${TOP_Y - 36} ${CX},${TOP_Y - 20}`} fill={ink} />
      <line x1={CX - 168} y1={48} x2={CX - 18} y2={48} stroke={ink} strokeWidth="1" strokeDasharray="2 4" />
      <text x={CX - 178} y={52} textAnchor="end" className="font-mono" fontSize="12" letterSpacing="1" fill={ink}>
        LIVE CAMERA FEED
      </text>

      {/* Layer slabs */}
      {layers.map((l, i) => {
        const y = TOP_Y + i * (D + GAP);
        const s = slab(y, D);
        const on = i === active;
        const fill = on ? "#214cff" : "#0b0d14";
        const sideFill = on ? "#1637c0" : "#07080d";
        const edgeX = l.side === "left" ? CX - W : CX + W;
        const labelX = l.side === "left" ? 158 : 742;
        const lineEnd = l.side === "left" ? 170 : 730;
        const [line1, line2] = l.label.split("\n");
        return (
          <g key={l.label}>
            <polygon points={s.left} fill={sideFill} stroke={ink} strokeWidth="1" style={{ transition: "fill .3s" }} />
            <polygon points={s.right} fill={sideFill} stroke={ink} strokeWidth="1" style={{ transition: "fill .3s" }} />
            <polygon points={s.top} fill={fill} stroke={ink} strokeWidth="1" style={{ transition: "fill .3s" }} />
            {/* Callout */}
            <line x1={edgeX} y1={y + D / 2} x2={lineEnd} y2={y + D / 2} stroke={ink} strokeWidth="1" strokeDasharray="2 4" />
            <polygon
              points={
                l.side === "left"
                  ? `${edgeX - 4},${y + D / 2} ${edgeX - 16},${y + D / 2 - 5} ${edgeX - 16},${y + D / 2 + 5}`
                  : `${edgeX + 4},${y + D / 2} ${edgeX + 16},${y + D / 2 - 5} ${edgeX + 16},${y + D / 2 + 5}`
              }
              fill={ink}
            />
            <text
              x={labelX}
              y={y + D / 2 - 3}
              textAnchor={l.side === "left" ? "end" : "start"}
              className="font-mono"
              fontSize="12"
              letterSpacing="1"
              fill={ink}
            >
              {line1}
            </text>
            <text
              x={labelX}
              y={y + D / 2 + 12}
              textAnchor={l.side === "left" ? "end" : "start"}
              className="font-mono"
              fontSize="12"
              letterSpacing="1"
              fill={ink}
            >
              {line2}
            </text>
          </g>
        );
      })}

      {/* Base — prepared camera infrastructure (hatched) */}
      {(() => {
        const s = slab(baseY, BASE_D);
        return (
          <g>
            <polygon points={s.left} fill="url(#vx-hatch)" stroke={ink} strokeWidth="1" />
            <polygon points={s.right} fill="url(#vx-hatch)" stroke={ink} strokeWidth="1" />
            <polygon points={s.top} fill="#0b0d14" stroke={ink} strokeWidth="1" />
            <line x1={CX + W} y1={baseY + BASE_D / 2} x2={730} y2={baseY + BASE_D / 2} stroke={ink} strokeWidth="1" strokeDasharray="2 4" />
            <polygon
              points={`${CX + W + 4},${baseY + BASE_D / 2} ${CX + W + 16},${baseY + BASE_D / 2 - 5} ${CX + W + 16},${baseY + BASE_D / 2 + 5}`}
              fill={ink}
            />
            <text x={742} y={baseY + BASE_D / 2 - 3} textAnchor="start" className="font-mono" fontSize="12" letterSpacing="1" fill={ink}>
              PREPARED CAMERA
            </text>
            <text x={742} y={baseY + BASE_D / 2 + 12} textAnchor="start" className="font-mono" fontSize="12" letterSpacing="1" fill={ink}>
              INFRASTRUCTURE
            </text>
          </g>
        );
      })()}

      {/* Vertical construction guides */}
      <line x1={CX - W} y1={TOP_Y - 26} x2={CX - W} y2={baseY + BASE_D + 8} stroke={ink} strokeWidth="0.8" strokeDasharray="1 5" opacity="0.5" />
      <line x1={CX + W} y1={TOP_Y - 26} x2={CX + W} y2={baseY + BASE_D + 8} stroke={ink} strokeWidth="0.8" strokeDasharray="1 5" opacity="0.5" />
    </svg>
  );
}

/* Static, non-animated version for reduced-motion users. */
function ReducedFallback() {
  return (
    <div className="mx-auto flex h-full max-w-[104rem] flex-col justify-center gap-10 px-6 py-24 sm:px-10">
      <h2 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">Engineered to see.</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="flex min-h-[11rem] flex-col justify-between border border-white/35 bg-[#05050a] p-6">
            <p className="text-sm leading-6 text-white/85">{f.copy}</p>
            <p className="mt-6 font-display text-xl font-semibold text-white">{f.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
