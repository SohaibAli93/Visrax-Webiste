"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/* Floating collage slots around the centred headline, reference-style.
   Images live in /public/images/collage/. */
type Slot = {
  file: string;
  label: string;
  style: React.CSSProperties;
  size: string; // tailwind w/h classes
  mobile?: boolean; // keep visible on small screens
};

const SLOTS: Slot[] = [
  { file: "collage-01-warehouse.png", label: "warehouse", style: { left: "4%", top: "12%" }, size: "w-36 h-52 lg:w-40 lg:h-60", mobile: true },
  { file: "collage-02-lobby.png", label: "lobby", style: { left: "7%", bottom: "10%" }, size: "w-44 h-44 lg:w-52 lg:h-52", mobile: true },
  { file: "collage-03-factory.png", label: "factory", style: { left: "19%", top: "3%" }, size: "w-32 h-44" },
  { file: "collage-04-retail.png", label: "retail", style: { left: "29%", bottom: "4%" }, size: "w-44 h-32" },
  { file: "collage-05-traffic.png", label: "traffic", style: { right: "18%", top: "2%" }, size: "w-44 h-32" },
  { file: "collage-06-loading.png", label: "loading dock", style: { right: "4%", top: "14%" }, size: "w-36 h-48 lg:w-38 lg:h-52", mobile: true },
  { file: "collage-07-parking.png", label: "parking", style: { right: "5%", bottom: "12%" }, size: "w-40 h-52 lg:w-48 lg:h-60", mobile: true },
  { file: "collage-08-control-room.png", label: "control room", style: { right: "27%", bottom: "2%" }, size: "w-48 h-36" }
];

export function DetectionCollage() {
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto min-h-[46rem] max-w-[110rem] overflow-hidden px-4 py-16 lg:min-h-[52rem]">
      {/* Aperture backdrop — soft glow, concentric rings, rotating tick ring */}
      <ApertureBackdrop reduced={!!reduced} />

      {/* Centred headline */}
      <div className="relative z-10 mx-auto flex min-h-[38rem] max-w-3xl flex-col items-center justify-center text-center lg:min-h-[44rem]">
        <p className="eyebrow mb-6 justify-center">What Visrax can detect</p>
        <h2 className="font-display font-bold uppercase leading-[1.02] tracking-tight text-white [font-size:clamp(2.25rem,4.6vw,4.25rem)]">
          Object detection and monitoring built around your <span className="text-gradient">workplace.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/50">
          Choose the checks that match how your site runs — from people and vehicles to safety zones and busy areas.
        </p>

        {/* Mobile: the collage becomes a tidy grid below the headline */}
        <div className="mt-10 grid w-full grid-cols-2 gap-3 md:hidden">
          {SLOTS.filter((s) => s.mobile).map((slot) => (
            <div key={slot.file} className="relative h-44 overflow-hidden rounded-lg border border-white/10">
              <Image
                src={`/images/collage/${slot.file}`}
                alt={`Visrax monitoring — ${slot.label}`}
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Floating image slots — gentle drift, lift + shake on hover */}
      {SLOTS.map((slot, i) => (
        <motion.div
          key={slot.file}
          style={slot.style}
          animate={reduced ? undefined : { y: [0, -10, 0] }}
          whileHover={reduced ? undefined : { scale: 1.07, rotate: [0, -2.2, 2.2, -1.4, 1.4, 0] }}
          transition={{
            y: { duration: 5.5 + (i % 4) * 1.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.45 },
            rotate: { duration: 0.45, ease: "easeInOut" },
            scale: { duration: 0.25, ease: "easeOut" }
          }}
          className={`group absolute z-20 hidden hover:z-30 md:block ${slot.size}`}
        >
          <div className="relative h-full w-full overflow-hidden rounded-lg border border-white/10 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] transition-[border-color,box-shadow] duration-300 group-hover:border-[#5d6bff]/60 group-hover:shadow-[0_30px_70px_-24px_rgba(33,76,255,0.35)]">
            <Image
              src={`/images/collage/${slot.file}`}
              alt={`Visrax monitoring — ${slot.label}`}
              fill
              sizes="(min-width: 1024px) 14vw, 40vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Label chip revealed on hover */}
            <span className="absolute bottom-2 left-2 rounded-sm border border-[#5d6bff]/40 bg-black/60 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-[#93a8ff] opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              {slot.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* Camera-aperture backdrop: a soft brand glow, fine concentric rings, and a
   slowly rotating tick ring — a lens iris rather than a bounding box. */
function ApertureBackdrop({ reduced }: { reduced: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2">
      {/* Soft radial glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(33,76,255,0.10), rgba(124,60,255,0.04) 45%, transparent 68%)" }}
      />

      {/* Concentric rings */}
      <svg viewBox="0 0 900 900" className="h-[56rem] w-[56rem] max-w-none">
        <g fill="none">
          <circle cx="450" cy="450" r="200" stroke="rgba(147,168,255,0.16)" strokeWidth="1" />
          <circle cx="450" cy="450" r="280" stroke="rgba(147,168,255,0.10)" strokeWidth="1" />
          <circle cx="450" cy="450" r="360" stroke="rgba(147,168,255,0.06)" strokeWidth="1" />
          <circle cx="450" cy="450" r="430" stroke="rgba(147,168,255,0.04)" strokeWidth="1" />
        </g>
      </svg>

      {/* Rotating tick ring (lens graduations) */}
      <motion.svg
        viewBox="0 0 900 900"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 h-[56rem] w-[56rem] max-w-none -translate-x-1/2 -translate-y-1/2"
      >
        <circle
          cx="450"
          cy="450"
          r="322"
          fill="none"
          stroke="rgba(147,168,255,0.22)"
          strokeWidth="7"
          strokeDasharray="1.5 40"
        />
      </motion.svg>

      {/* Quiet crosshair marks */}
      {[
        { left: "12%", top: "24%" },
        { right: "12%", top: "24%" },
        { left: "16%", bottom: "20%" },
        { right: "16%", bottom: "20%" }
      ].map((pos, i) => (
        <span key={i} style={pos} className="absolute font-mono text-sm text-[#93a8ff]/25">
          +
        </span>
      ))}
    </div>
  );
}
