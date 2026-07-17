"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";

const FRAME_W = 1024;
const FRAME_H = 1536;

type BoxDef = {
  label: string;
  color: "blue" | "amber" | "violet";
  x: number;
  y: number;
  w: number;
  h: number;
  dashed?: boolean;
};

type Tab = {
  id: string;
  label: string;
  description: string;
  image: string;
  camera: string;
  hud: { label: string; value: string }[];
  boxes: BoxDef[];
  path?: string;
};

const tabs: Tab[] = [
  {
    id: "detection",
    label: "Object detection",
    description:
      "Visrax spots people, vehicles, and equipment the moment they appear on camera — so your team is notified instead of watching screens all day.",
    image: "/brand/showcase-detection.png",
    camera: "Camera C-014 · Warehouse 02",
    hud: [
      { label: "Model", value: "VISRAX Detect" },
      { label: "Objects", value: "2 people · 1 forklift" },
      { label: "Latency", value: "Real-time" },
      { label: "Status", value: "Monitoring active" }
    ],
    boxes: [
      { label: "Person", color: "blue", x: 511, y: 733, w: 153, h: 345 },
      { label: "Person", color: "blue", x: 402, y: 461, w: 106, h: 341 },
      { label: "Forklift", color: "amber", x: 480, y: 80, w: 239, h: 339 }
    ]
  },
  {
    id: "zones",
    label: "Zone monitoring",
    description:
      "Mark restricted areas, loading bays, entrances, and safety zones. Visrax alerts you when someone or something enters a space they should not.",
    image: "/brand/showcase-zones.png",
    camera: "Camera C-021 · Production Floor",
    hud: [
      { label: "Model", value: "VISRAX Zones" },
      { label: "Zones", value: "Restricted · Walkway · Machinery" },
      { label: "Triggers", value: "Entry · Dwell · Exit" },
      { label: "Status", value: "3 zones armed" }
    ],
    boxes: [
      { label: "Walkway", color: "amber", x: 738, y: 120, w: 285, h: 1402, dashed: true },
      { label: "Worker", color: "blue", x: 102, y: 707, w: 307, h: 441 },
      { label: "Restricted", color: "violet", x: 492, y: 691, w: 246, h: 415, dashed: true }
    ]
  },
  {
    id: "tracking",
    label: "Live tracking",
    description:
      "Follow people and vehicles as they move across your site — from gate to floor to parking — without switching between dozens of camera views.",
    image: "/brand/showcase-tracking.png",
    camera: "Camera C-033 · Parking Entrance",
    hud: [
      { label: "Model", value: "VISRAX Track" },
      { label: "Targets", value: "Person · Vehicle" },
      { label: "Cameras", value: "C-033 linked" },
      { label: "Status", value: "Tracking in progress" }
    ],
    boxes: [
      { label: "Person", color: "blue", x: 409, y: 614, w: 122, h: 245 },
      { label: "Vehicle", color: "amber", x: 614, y: 506, w: 327, h: 383 }
    ],
    path: "M470 859 C 550 820, 680 750, 777 697"
  }
];

const colors = {
  blue: { stroke: "#6b9fff", text: "#a8c4ff", glow: "rgba(107,159,255,0.35)" },
  amber: { stroke: "#e8b84a", text: "#f5d078", glow: "rgba(232,184,74,0.35)" },
  violet: { stroke: "#a78bfa", text: "#c4b5fd", glow: "rgba(167,139,250,0.35)" }
};

function cornerPath(x: number, y: number, w: number, h: number, len: number) {
  return [
    `M ${x} ${y + len} L ${x} ${y} L ${x + len} ${y}`,
    `M ${x + w - len} ${y} L ${x + w} ${y} L ${x + w} ${y + len}`,
    `M ${x + w} ${y + h - len} L ${x + w} ${y + h} L ${x + w - len} ${y + h}`,
    `M ${x + len} ${y + h} L ${x} ${y + h} L ${x} ${y + h - len}`
  ].join(" ");
}

function DetectionOverlay({ tab }: { tab: Tab }) {
  return (
    <svg
      className="absolute inset-0 z-10 h-full w-full"
      viewBox={`0 0 ${FRAME_W} ${FRAME_H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <AnimatePresence mode="wait">
        <motion.g
          key={`overlay-${tab.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          {tab.boxes.map((box, i) => {
            const c = colors[box.color];
            const bracket = Math.min(22, box.w * 0.22, box.h * 0.08);
            const labelY = box.dashed ? box.y + 36 : box.y - 14;
            const labelX = box.dashed ? box.x + 16 : box.x;

            return (
              <g key={`${tab.id}-${box.label}-${i}`} className="detection-box">
                <path
                  d={cornerPath(box.x, box.y, box.w, box.h, bracket)}
                  fill="none"
                  stroke={c.stroke}
                  strokeWidth={2.5}
                  strokeDasharray={box.dashed ? "10 8" : undefined}
                />
                <rect
                  x={labelX}
                  y={labelY - 22}
                  width={box.label.length * 11 + 24}
                  height={26}
                  rx={6}
                  fill="rgba(0,0,0,0.75)"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth={1}
                />
                <text
                  x={labelX + 12}
                  y={labelY - 4}
                  fill={c.text}
                  fontSize={16}
                  fontFamily="ui-monospace, monospace"
                  fontWeight={600}
                  letterSpacing="2"
                >
                  {box.label.toUpperCase()}
                </text>
              </g>
            );
          })}

          {tab.path ? (
            <g>
              <path
                d={tab.path}
                fill="none"
                stroke="#8ca7ff"
                strokeWidth={3}
                strokeDasharray="8 10"
                className="hero-track-path opacity-80"
              />
              <circle cx={470} cy={859} r={7} fill="#6b9fff" />
              <circle cx={777} cy={697} r={7} fill="#e8b84a" />
            </g>
          ) : null}
        </motion.g>
      </AnimatePresence>
    </svg>
  );
}

function DetectionPanel({ tab }: { tab: Tab }) {
  return (
    <div className="showcase-panel w-full">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-[#0a0a0c] shadow-[0_24px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.08]">
        <div className="relative aspect-[4/5] w-full sm:aspect-[5/6]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={tab.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover object-center"
                priority
              />
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25" />

          <DetectionOverlay tab={tab} />

          <div className="absolute left-4 top-4 z-20 rounded-lg border border-white/10 bg-black/50 px-3 py-2 font-mono text-[10px] leading-relaxed backdrop-blur-md">
            {tab.hud.slice(0, 2).map((row, i) => (
              <p key={row.label} className={i === 0 ? "text-[#93a8ff]" : "text-white/50"}>
                <span className="text-white/30">{row.label}:</span> {row.value}
              </p>
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-16">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">{tab.camera}</p>
              <p className="mt-1 font-display text-base font-medium text-white">{tab.label}</p>
            </div>
            <span className="mb-0.5 inline-flex items-center gap-1.5 rounded-full bg-[#214cff]/15 px-2.5 py-1 font-mono text-[10px] text-[#8ca7ff] ring-1 ring-[#214cff]/25">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#214cff]" />
              Live
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DetectionShowcase() {
  const [active, setActive] = useState(0);
  const current = tabs[active];

  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-[#040405] py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_50%,rgba(33,76,255,0.06),transparent_70%)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        <div className="min-w-0">
          <p className="eyebrow mb-5">Detection showcase</p>
          <h2 className="font-display text-4xl font-semibold leading-[1.06] tracking-tightest text-white sm:text-5xl">
            The eyes of your operation.
          </h2>
          <p className="mt-4 max-w-md text-lg leading-8 text-white/45">
            Detection that turns cameras into action.
          </p>

          <div className="mt-8">
            <ButtonLink href="/request-demo" variant="light">
              Request a Demo
            </ButtonLink>
          </div>

          <div className="mt-12 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {tabs.map((tab, index) => {
              const isActive = active === index;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActive(index)}
                  className="group relative w-full py-5 pl-5 text-left transition-colors"
                >
                  {isActive ? (
                    <span className="absolute bottom-5 left-0 top-5 w-[2px] rounded-full bg-[#214cff]" />
                  ) : null}
                  <p
                    className={`font-display text-lg font-semibold transition ${
                      isActive ? "text-white" : "text-white/35 group-hover:text-white/55"
                    }`}
                  >
                    {tab.label}
                  </p>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isActive ? "mt-2 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-md text-sm leading-7 text-white/45">{tab.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[400px] lg:mx-0 lg:max-w-none">
          <DetectionPanel tab={current} />
        </div>
      </div>
    </section>
  );
}
