import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Cpu, Eye, Lock, Radar } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { DetectionCollage } from "@/components/sections/DetectionCollage";
import { HowItWorksStack } from "@/components/sections/HowItWorksStack";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { IndustriesCarousel } from "@/components/sections/IndustriesCarousel";
import { IncidentTimeline } from "@/components/visuals/IncidentTimeline";
import { MultiSiteNetwork } from "@/components/visuals/MultiSiteNetwork";
import { PlatformShowcase } from "@/components/sections/PlatformShowcase";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { brandAssets, siteConfig } from "@/lib/site";
import { capabilityPages, deploymentSteps, industryPages, securityItems } from "@/lib/data";

export function Hero() {
  return <HeroSlider />;
}

export function TrustBar() {
  const items = [
    { label: "Use the cameras you have", detail: "No need to replace your current setup" },
    { label: "Spot what matters instantly", detail: "People, vehicles, and important activity" },
    { label: "Get clear alerts", detail: "Your team is notified when action is needed" },
    { label: "See every location", detail: "One place to monitor all your sites" }
  ];

  return (
    <section className="relative border-y border-white/[0.07] bg-black/40 py-10">
      <div className="mx-auto grid max-w-[88rem] gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map((item, index) => (
          <Reveal key={item.label} delay={index * 0.05} className="border-white/[0.06] lg:border-r lg:pr-6 lg:last:border-r-0">
            <p className="font-display text-sm font-semibold text-white">{item.label}</p>
            <p className="mt-1.5 text-sm text-white/40">{item.detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function BrandStatement() {
  const flow = ["Your cameras", "Detection", "Tracking", "Alerts", "Action", "Reports"];
  return (
    <section className="soft-divider border-y section-alt py-16 lg:py-20">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          title={
            <>
              Your cameras already record.
              <br />
              <span className="text-gradient">Visrax</span> helps you respond.
            </>
          }
          copy={siteConfig.description}
        />
        <Reveal className="mt-16 grid gap-3 md:grid-cols-6">
          {flow.map((item, index) => (
            <div key={item} className="surface-card relative p-5 text-center">
              <span className="font-mono text-[0.65rem] font-medium tracking-[0.2em] text-accent">0{index + 1}</span>
              <p className="mt-4 font-display text-base font-semibold text-white sm:text-lg">{item}</p>
              {index < flow.length - 1 ? (
                <span className="absolute right-[-6px] top-1/2 z-10 hidden h-px w-3 bg-gradient-to-r from-white/30 to-transparent md:block" />
              ) : null}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="How it works"
          title="Simple to set up. Easy for any team to use."
          copy="You do not need a technical background. Visrax is built for operations, safety, and facility teams who need clear answers — not more screens to watch."
        />
      </div>
      <HowItWorksStack />
    </section>
  );
}

export function PlatformSection() {
  return (
    <section id="platform" className="py-16 lg:py-20">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Platform"
          title="One monitoring system for every location."
          copy="Live camera views, detection, alerts, reports, and camera health — all in one place your team can actually use."
        />
        <Reveal className="mt-14">
          <PlatformShowcase />
        </Reveal>
      </div>
    </section>
  );
}

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="soft-divider border-y section-alt py-16 lg:py-20">
      <DetectionCollage />
    </section>
  );
}

const INDUSTRY_IMAGES: Record<string, string> = {
  manufacturing: "/images/sections/industries/industry-manufacturing.png",
  "offices-commercial-buildings": "/images/sections/industries/industry-offices.png",
  "warehousing-logistics": "/images/sections/industries/industry-warehousing.png",
  "textile-manufacturing": "/images/sections/industries/industry-textile.png",
  retail: "/images/sections/industries/industry-retail.png",
  "traffic-transportation": "/images/sections/industries/industry-traffic.png"
};

export function IndustriesSection() {
  const featured = industryPages
    .filter((industry) => INDUSTRY_IMAGES[industry.slug])
    .map((industry) => ({
      slug: industry.slug,
      title: industry.title,
      eyebrow: industry.eyebrow,
      image: INDUSTRY_IMAGES[industry.slug]
    }));

  return (
    <section id="industries" className="py-16 lg:py-20">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Industries"
          title="Built for where work never stops."
          copy="Factories, warehouses, offices, retail floors, and roads — Visrax adapts to the way each site operates."
        />
        <Reveal className="mt-12">
          <IndustriesCarousel items={featured} />
        </Reveal>
      </div>
    </section>
  );
}

export function UseCasesSection() {
  return (
    <section className="soft-divider relative overflow-hidden border-y bg-[#030303] py-16 lg:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(33,76,255,0.09),transparent_32rem)]" />
      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionHeader
            eyebrow="Everyday monitoring needs"
            title="Catch the moments no one can watch all day."
            copy="Configure Visrax around the operational signals that matter most, then let teams review the events that deserve attention."
          />
        </div>
        <Reveal className="mt-10 lg:mt-12">
          <MonitoringNeedsVisual />
        </Reveal>
      </div>
    </section>
  );
}

function MonitoringNeedsVisual() {
  const content = [
    ["Real environments", "Monitor factories, warehouses, entrances, parking areas, and shared spaces from existing camera views."],
    ["Actionable events", "Convert activity into incidents, evidence, alerts, and analytics your team can actually review."],
    ["Focused response", "Prioritize the situations that matter: safety, security, occupancy, queues, vehicles, and restricted zones."]
  ];

  return (
    <div className="premium-surface overflow-hidden p-3">
      <div className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-black">
        <div className="relative aspect-[16/7] min-h-[460px]">
          <Image
            src="/images/monitoring-needs-premium.png"
            alt="Dark warehouse environment with subtle computer vision monitoring overlays"
            fill
            sizes="(min-width: 1280px) 1180px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-transparent" />
          <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/45 px-3 py-2 text-xs text-white/62 backdrop-blur-md">
            Demo monitoring view
          </div>
          <div className="absolute bottom-6 left-6 right-6 max-w-3xl">
            <p className="font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              See operational activity as it happens.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/62 sm:text-base sm:leading-7">
              A cleaner way to understand movement, safety, queues, vehicles, occupancy, and restricted-area events across active sites.
            </p>
          </div>
        </div>

        <div className="grid gap-px border-t border-white/10 bg-white/10 md:grid-cols-3">
          {content.map(([title, copy]) => (
            <div key={title} className="bg-[#070707] p-5">
              <p className="font-display text-base font-semibold text-white">{title}</p>
              <p className="mt-3 text-sm leading-6 text-white/52">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MultiLocationSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Multiple locations"
          title="See every site from one screen."
          copy="Offices, factories, warehouses, shops, and remote sites — monitor them together instead of jumping between separate systems."
        />
        <Reveal className="mt-14">
          <MultiSiteNetwork />
        </Reveal>
      </div>
    </section>
  );
}

export function IntegrationSection() {
  const icons = [Eye, Cpu, Radar];
  const items = ["Your existing cameras", "Visrax monitoring", "Alerts and reports"];
  return (
    <section className="soft-divider border-y section-alt py-20">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          eyebrow="Works with what you have"
          title="Add smarter monitoring without replacing your cameras."
          copy="If your cameras already cover the areas that matter, Visrax can turn that coverage into detection, tracking, alerts, and clear reports."
        />
        <Reveal className="mx-auto mt-14 grid max-w-5xl gap-3 md:grid-cols-3">
          {items.map((item, index) => {
            const Icon = icons[index];
            return (
              <div key={item} className="surface-card relative p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-[#214cff]/20 to-[#7c3cff]/10">
                  <Icon aria-hidden className="h-5 w-5 text-accent" />
                </div>
                <p className="mt-5 font-display text-lg font-semibold text-white">{item}</p>
                {index < 2 ? (
                  <span className="absolute right-[-6px] top-1/2 z-10 hidden h-px w-3 bg-gradient-to-r from-white/25 to-transparent md:block" />
                ) : null}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

export function IncidentSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="When something happens"
          title="From alert to resolved — with a clear record."
          copy="Every important event becomes a simple case your team can review, assign, comment on, and close — with the camera evidence attached."
        />
        <Reveal className="mt-14">
          <IncidentTimeline />
        </Reveal>
      </div>
    </section>
  );
}

export function DeploymentSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Getting started"
          title="Begin with one site. Grow when you are ready."
          copy="Most teams start with a focused pilot, prove the value, then expand to more cameras and locations."
        />
        <div className="mt-14 grid gap-3 lg:grid-cols-5">
          {deploymentSteps.map(([title, copy], index) => (
            <Reveal key={title} delay={index * 0.04}>
              <div className="surface-card min-h-52 p-6">
                <span className="font-mono text-[0.65rem] font-medium tracking-[0.2em] text-accent">0{index + 1}</span>
                <h3 className="mt-8 font-display text-lg font-semibold tracking-tight text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/50">{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 grid gap-3 text-sm text-white/55 md:grid-cols-3">
          {["Works with many existing cameras", "Can run on-site if needed", "Roll out location by location"].map((item) => (
            <p key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <CheckCircle2 aria-hidden className="h-4 w-4 shrink-0 text-accent" />
              {item}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function SecuritySection() {
  return (
    <section className="soft-divider border-y section-alt py-16 lg:py-20">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Privacy and access"
          title="Your footage stays under your control."
          copy="Decide who can see what, how long recordings are kept, and which sites each person can access."
        />
        <Reveal className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {securityItems.map((item) => (
            <div
              key={item}
              className="flex min-h-24 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-5 text-sm text-white/55"
            >
              <Lock aria-hidden className="h-4 w-4 shrink-0 text-accent" />
              {item}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      <div className="absolute inset-0 hero-field opacity-80" />
      <div className="absolute inset-0 technical-grid opacity-30" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-10 flex flex-col items-center gap-3">
            <Image
              src={brandAssets.mark}
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 object-contain opacity-90"
            />
            <Image
              src={brandAssets.wordmark}
              alt="Visrax"
              width={180}
              height={36}
              className="h-7 w-auto object-contain opacity-90"
            />
          </div>
          <h2 className="font-display text-balance text-4xl font-semibold leading-[1.02] tracking-tightest text-white sm:text-5xl lg:text-6xl">
            Turn your existing cameras into intelligent monitoring systems.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/50">
            See how Visrax delivers real-time detection, tracking, alerts, analytics, and multi-site operational visibility for your team.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/request-demo">Request a Demo</ButtonLink>
            <ButtonLink href="/solutions" variant="secondary">
              Explore Solutions
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
