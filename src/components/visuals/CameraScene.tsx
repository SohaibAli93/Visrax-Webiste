import { Camera, CheckCircle2, CircleDot, MapPin, Users } from "lucide-react";

type CameraSceneProps = {
  compact?: boolean;
  label?: string;
};

export function CameraScene({ compact = false, label = "Production Floor" }: CameraSceneProps) {
  return (
    <div
      className={`camera-scene relative overflow-hidden rounded-2xl border border-white/10 bg-[#08080a] shadow-panel ${
        compact ? "min-h-[320px]" : "min-h-[520px]"
      }`}
    >
      <div className="absolute inset-0 feed-gradient" />
      <div className="absolute inset-0 technical-grid opacity-15" />
      <div className="absolute left-[8%] top-[12%] h-[34%] w-[26%] rounded-lg border border-white/25 bg-white/[0.04]">
        <span className="absolute -top-7 left-0 text-xs text-white/40">Person ID P-014</span>
      </div>
      <div className="absolute right-[13%] top-[22%] h-[24%] w-[30%] rounded-lg border border-[#93a8ff]/45 bg-[#214cff]/10">
        <span className="absolute -top-7 left-0 text-xs text-white/40">Vehicle V-208</span>
      </div>
      <div className="absolute bottom-[19%] left-[18%] h-[24%] w-[56%] -skew-x-12 rounded-xl border border-dashed border-white/20 bg-white/[0.02]">
        <span className="absolute -bottom-7 left-4 text-xs text-white/38">Restricted zone</span>
      </div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 700 460" role="img" aria-label="Animated tracking path overlay">
        <path className="tracking-path" d="M92 310 C 180 250, 260 355, 344 276 S 500 188, 605 238" fill="none" />
        <circle className="tracking-dot" cx="605" cy="238" r="5" />
      </svg>
      <div className="absolute left-4 top-4 flex items-center gap-2.5 rounded-lg border border-white/10 bg-black/45 px-3 py-2 text-xs text-white/55 backdrop-blur-md">
        <Camera aria-hidden className="h-3.5 w-3.5 text-accent" />
        Camera C-014
      </div>
      <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/45 px-3 py-2 text-xs text-white/55 backdrop-blur-md">
        <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#214cff]" />
        14:32:08 · Live
      </div>
      <div className="absolute bottom-4 left-4 grid gap-2">
        <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/55 px-3.5 py-2.5 text-sm text-white/70 backdrop-blur-md">
          Active Incident · Restricted Entry
        </div>
        <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/45 px-3.5 py-2 text-xs text-white/50 backdrop-blur-md">
          <MapPin aria-hidden className="h-3.5 w-3.5 text-accent" />
          {label}
        </div>
      </div>
      <div className="absolute bottom-4 right-4 grid min-w-40 gap-2 rounded-xl border border-white/10 bg-black/50 p-3.5 backdrop-blur-md">
        <span className="text-[11px] text-white/35">Occupancy</span>
        <span className="flex items-center gap-2 font-display text-2xl font-semibold text-white">
          <Users aria-hidden className="h-5 w-5 text-accent" />
          124
        </span>
        <span className="flex items-center gap-2 text-[11px] text-white/40">
          <CheckCircle2 aria-hidden className="h-3.5 w-3.5 text-accent" />
          Camera Online
        </span>
      </div>
      <div className="scan-line absolute inset-x-0 top-0 h-px bg-white/20" />
      <CircleDot aria-hidden className="absolute left-[49%] top-[50%] h-5 w-5 text-accent" />
    </div>
  );
}
