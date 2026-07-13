import { BarChart3, Download, LineChart } from "lucide-react";

const bars = [44, 68, 52, 84, 71, 58, 92, 63, 77, 49, 69, 88];
const metrics = [
  { label: "Incident volume", value: "48 open", Icon: BarChart3 },
  { label: "Occupancy", value: "124 current", Icon: LineChart },
  { label: "Camera availability", value: "96% online", Icon: BarChart3 },
  { label: "Response status", value: "12 in review", Icon: LineChart }
];

export function AnalyticsPanel() {
  return (
    <div className="premium-surface p-5 sm:p-6">
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-accent">Analytics</p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white">Operational event trends</h3>
        </div>
        <div className="flex gap-2 text-xs text-white/45">
          <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2">
            <Download aria-hidden className="h-3.5 w-3.5" />
            PDF
          </span>
          <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2">
            <Download aria-hidden className="h-3.5 w-3.5" />
            CSV
          </span>
        </div>
      </div>
      <div className="relative z-10 mt-6 grid gap-5 lg:grid-cols-[1fr_0.75fr]">
        <div className="flex h-64 items-end gap-2 rounded-xl border border-white/10 bg-black/40 p-4">
          {bars.map((height, index) => (
            <div key={`${height}-${index}`} className="flex flex-1 items-end">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-[#214cff]/40 via-[#5b4dff]/70 to-[#93a8ff]"
                style={{ height: `${height}%` }}
              />
            </div>
          ))}
        </div>
        <div className="grid gap-2.5">
          {metrics.map(({ label, value, Icon }) => (
            <div key={label} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.025] p-4">
              <div>
                <p className="flex items-center gap-2 text-xs text-white/40">
                  <Icon aria-hidden className="h-3.5 w-3.5 text-accent" />
                  {label}
                </p>
                <p className="mt-2 font-display text-lg font-semibold text-white">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
