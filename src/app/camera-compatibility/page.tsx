import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { CheckCircle2 } from "lucide-react";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Camera Compatibility — AI Monitoring Without Replacing Hardware",
  description:
    "Turn existing cameras into AI monitoring. Visrax works with the IP cameras you already have — no rip-and-replace, no new hardware. Check what you need for compatibility.",
  path: "/camera-compatibility"
});

export default function CameraCompatibilityPage() {
  const requirements = [
    "IP camera or encoder that exposes an RTSP stream",
    "Network reachability between camera and the Visrax deployment",
    "Standard protocols such as RTSP or ONVIF",
    "Stable power and network connection for continuous capture"
  ];

  const faqs = [
    {
      question: "Do I need new cameras to use Visrax?",
      answer:
        "No. Visrax is designed to run on the cameras you already have. If your cameras expose an RTSP stream over IP, they can typically be connected without replacing hardware."
    },
    {
      question: "What camera brands does Visrax work with?",
      answer:
        "Visrax connects over standard IP camera protocols rather than being tied to a single brand. Cameras from most major manufacturers can be used as long as they expose a standard stream and are reachable on the network."
    },
    {
      question: "Does Visrax work with analog or older CCTV systems?",
      answer:
        "Analog CCTV can be connected when the footage is accessible through an encoder or DVR/NVR that exposes an IP stream. If the system can produce an RTSP feed, Visrax can monitor it."
    },
    {
      question: "How do I confirm my cameras are compatible?",
      answer:
        "Request a demo. The Visrax team can evaluate your camera setup and confirm connectivity before you commit to a deployment."
    }
  ];

  return (
    <>
      <Breadcrumbs items={[{ label: "Camera Compatibility", href: "/camera-compatibility" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer }
          }))
        }}
      />
      <main className="page-shell">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 hero-field opacity-50" />
          <div className="relative mx-auto max-w-3xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
            <Reveal>
              <p className="eyebrow">Camera Compatibility</p>
              <h1 className="mt-5 font-display text-balance text-5xl font-semibold leading-[0.95] tracking-tightest text-white sm:text-6xl">
                Add AI monitoring without replacing your cameras.
              </h1>
              <p className="mt-6 text-lg leading-8 text-white/55">
                Visrax turns the cameras you already have into an intelligent monitoring system. No rip-and-replace, no
                new hardware — just a standard IP stream and the platform.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="soft-divider border-t py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white">What your cameras need</h2>
            <p className="mt-4 text-base leading-7 text-white/55">
              Compatibility is based on how your cameras connect, not which brand they are. In most deployments the
              cameras simply need to:
            </p>
            <ul className="mt-8 grid gap-3">
              {requirements.map((item) => (
                <li key={item} className="surface-card flex items-center gap-3 p-5 text-[0.9375rem] leading-7 text-white/65">
                  <CheckCircle2 aria-hidden className="h-5 w-5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="soft-divider border-t py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white">Frequently asked questions</h2>
            <div className="mt-8 grid gap-3">
              {faqs.map((faq) => (
                <div key={faq.question} className="surface-card p-5">
                  <h3 className="font-display text-lg font-semibold text-white">{faq.question}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-7 text-white/55">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
