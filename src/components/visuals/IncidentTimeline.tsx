const steps = ["Event Detected", "Incident Created", "Evidence Captured", "Team Alerted", "Assigned", "Investigated", "Resolved"];

export function IncidentTimeline() {
  return (
    <div className="premium-surface relative overflow-hidden p-5 sm:p-6">
      <div className="absolute inset-0 technical-grid opacity-10" />
      <ol className="relative z-10 grid gap-3 md:grid-cols-7">
        {steps.map((step, index) => (
          <li key={step} className="relative rounded-xl border border-white/10 bg-black/35 p-4">
            <span className="font-mono text-[0.65rem] font-medium tracking-[0.18em] text-accent">0{index + 1}</span>
            <h3 className="mt-8 min-h-12 font-display text-sm font-semibold leading-snug text-white">{step}</h3>
            {index < steps.length - 1 ? (
              <span className="absolute right-[-14px] top-1/2 z-10 hidden h-px w-7 bg-gradient-to-r from-white/25 to-transparent md:block" />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
