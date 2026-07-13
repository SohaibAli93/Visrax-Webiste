const sites = ["Head Office", "Manufacturing Plant", "Distribution Warehouse", "Textile Facility", "Retail Locations", "Parking and Transport Areas"];

export function MultiSiteNetwork() {
  return (
    <div className="premium-surface relative overflow-hidden p-5 sm:p-6">
      <div className="absolute inset-0 technical-grid opacity-10" />
      <div className="relative z-10 grid gap-5 lg:grid-cols-[0.85fr_1fr]">
        <div className="rounded-xl border border-white/10 bg-black/35 p-5">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-accent">Organization</p>
          <div className="mt-5 grid gap-2.5">
            {sites.map((site, index) => (
              <div
                key={site}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.025] px-3.5 py-3 text-sm text-white/65"
              >
                <span>{site}</span>
                <span className={`text-xs ${index % 3 === 0 ? "text-accent" : "text-white/35"}`}>
                  {index % 3 === 0 ? "Active event" : "Healthy"}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[360px] overflow-hidden rounded-xl border border-white/10 bg-black">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 620 380" aria-hidden>
            <defs>
              <linearGradient id="networkLine" x1="0" x2="1">
                <stop stopColor="#8ca7ff" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0.25" />
              </linearGradient>
            </defs>
            <path
              className="network-line"
              d="M310 188 L118 74 M310 188 L500 86 M310 188 L520 285 M310 188 L114 282 M310 188 L302 55 M310 188 L316 330"
            />
          </svg>
          {[
            ["left-[47%] top-[45%]", "Command"],
            ["left-[14%] top-[15%]", "Office"],
            ["right-[13%] top-[18%]", "Plant"],
            ["right-[10%] bottom-[19%]", "Traffic"],
            ["left-[12%] bottom-[20%]", "Warehouse"],
            ["left-[44%] top-[8%]", "Retail"],
            ["left-[45%] bottom-[9%]", "Textile"]
          ].map(([position, label]) => (
            <div
              key={label}
              className={`absolute ${position} -translate-x-1/2 rounded-lg border border-white/10 bg-black/55 px-3 py-2 text-xs text-white/60 backdrop-blur-md`}
            >
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              {label}
            </div>
          ))}
          <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {["18 active events", "96% cameras online", "7 sites", "42 incidents"].map((stat) => (
              <div key={stat} className="rounded-lg border border-white/10 bg-black/50 p-3 text-xs text-white/50 backdrop-blur-md">
                {stat}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
