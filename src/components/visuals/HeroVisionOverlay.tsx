import Image from "next/image";

/**
 * Cinematic hero background with baked-in computer-vision detections.
 * Soft vignette only — boxes/radar live in the artwork so they sit on real vehicles.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/brand/hero-cv-detection.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[68%_center] sm:object-[72%_center] lg:object-center"
      />

      {/* Soft readability wash — keep the street and detections visible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 28%, rgba(0,0,0,0.18) 52%, rgba(0,0,0,0.08) 100%), linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 28%, transparent 72%, rgba(0,0,0,0.55) 100%)"
        }}
      />

      {/* Subtle vertical data lines over the scene */}
      <div className="hero-data-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden />
    </div>
  );
}
