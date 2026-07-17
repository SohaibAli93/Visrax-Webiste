"use client";

import { useState } from "react";
import { BarChart3, Camera, CheckCircle2, CircleDot, MapPinned, ShieldAlert, Wifi } from "lucide-react";

const tabs = [
  {
    label: "Live Monitoring",
    location: "Production Floor",
    event: "Restricted Entry",
    severity: "High",
    metric: "12 active cameras"
  },
  {
    label: "Detection",
    location: "Office Atrium",
    event: "Unusual Occupancy",
    severity: "Medium",
    metric: "124 occupants"
  },
  {
    label: "Tracking",
    location: "Warehouse 02",
    event: "Forklift Activity",
    severity: "Watch",
    metric: "4 paths tracked"
  },
  {
    label: "Incidents",
    location: "Retail Entrance",
    event: "Queue Buildup",
    severity: "Medium",
    metric: "8 in review"
  },
  {
    label: "Analytics",
    location: "Parking Entrance",
    event: "Vehicle Movement",
    severity: "Normal",
    metric: "312 events today"
  },
  {
    label: "Camera Health",
    location: "Commercial Building",
    event: "After-Hours Activity",
    severity: "High",
    metric: "96% online"
  }
];

const statusRows = [
  { Icon: ShieldAlert, label: "Active event", getValue: (current: (typeof tabs)[number]) => current.event },
  { Icon: MapPinned, label: "Location filter", getValue: (current: (typeof tabs)[number]) => current.location },
  { Icon: BarChart3, label: "Metric", getValue: (current: (typeof tabs)[number]) => current.metric },
  { Icon: Wifi, label: "Site health", getValue: () => "All critical cameras online" },
  { Icon: CheckCircle2, label: "Incident status", getValue: () => "Assigned for review" }
];

export function PlatformShowcase() {
  const [active, setActive] = useState(0);
  const current = tabs[active];

  return (
    <div className="premium-surface overflow-hidden p-2.5 sm:p-3">
      <div
        className="flex gap-1 overflow-x-auto rounded-xl border border-white/10 bg-black/60 p-1.5"
        role="tablist"
        aria-label="Platform views"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={active === index}
            className={`min-h-10 shrink-0 rounded-lg px-3.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${
              active === index
                ? "bg-gradient-to-r from-[#214cff] to-[#6b3dff] text-white shadow-soft"
                : "text-white/45 hover:bg-white/[0.04] hover:text-white"
            }`}
            onClick={() => setActive(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-2.5 grid overflow-hidden rounded-xl border border-white/10 bg-black lg:grid-cols-[1fr_340px]">
        <div className="relative min-h-[420px] overflow-hidden bg-[#070708] sm:min-h-[520px]">
          <div className="absolute inset-0 technical-grid opacity-20" />
          <div className="absolute inset-4 grid grid-cols-2 gap-2.5 sm:inset-6 sm:gap-4">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="relative overflow-hidden rounded-xl border border-white/10 bg-[#111113]">
                <div className="absolute inset-0 feed-gradient opacity-80" />
                <div className="absolute left-3 top-3 flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 text-[11px] text-white/50 backdrop-blur-md">
                  <Camera aria-hidden className="h-3.5 w-3.5 text-accent" />
                  Camera C-0{active + item + 11}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-[11px] text-white/50 backdrop-blur-md">
                  <span>{item === 0 ? current.location : ["Warehouse 02", "Parking Entrance", "Head Office"][item - 1]}</span>
                  <span className="text-white/35">Online</span>
                </div>
                <div
                  className={`absolute rounded-lg border ${
                    item === 0
                      ? "left-[22%] top-[26%] h-[34%] w-[38%] border-white/28 bg-white/[0.02]"
                      : "right-[18%] top-[30%] h-[28%] w-[30%] border-[#93a8ff]/40 bg-[#214cff]/10"
                  }`}
                />
              </div>
            ))}
          </div>
          <div className="absolute left-8 top-8 rounded-lg border border-white/10 bg-black/50 px-3.5 py-2 text-sm font-medium text-white/70 backdrop-blur-md">
            {current.event}
          </div>
        </div>

        <aside className="border-t border-white/10 bg-[#050506] p-5 lg:border-l lg:border-t-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-accent">{current.label}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">{current.location}</h3>
            </div>
            <span className="rounded-lg border border-white/10 px-2.5 py-1.5 text-[11px] font-medium text-white/45">{current.severity}</span>
          </div>
          <div className="mt-6 grid gap-2.5">
            {statusRows.map(({ Icon, label, getValue }) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/[0.025] p-3.5">
                <p className="flex items-center gap-2 text-[11px] text-white/35">
                  <Icon aria-hidden className="h-3.5 w-3.5 text-accent" />
                  {label}
                </p>
                <p className="mt-2 text-sm text-white/70">{getValue(current)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.025] p-3.5">
            <p className="text-[11px] text-white/35">Tracking history</p>
            <div className="mt-4 flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((item) => (
                <span key={item} className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-white/10 to-white/20" />
              ))}
              <CircleDot aria-hidden className="h-4 w-4 text-accent" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
