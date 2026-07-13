import Image from "next/image";
import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";
import { brandAssets, siteConfig } from "@/lib/site";
import { navGroups } from "@/lib/data";
import { ButtonLink } from "@/components/ui/ButtonLink";

const footerColumns = [
  { title: "Platform", links: navGroups[0].items },
  { title: "Capabilities", links: navGroups[1].items.slice(0, 6) },
  {
    title: "Industries",
    links: [
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Offices", href: "/industries/offices-commercial-buildings" },
      { label: "Warehousing", href: "/industries/warehousing-logistics" },
      { label: "Textile", href: "/industries/textile-manufacturing" },
      { label: "Retail", href: "/industries/retail" },
      { label: "Traffic", href: "/industries/traffic-transportation" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company/about" },
      { label: "Contact", href: "/company/contact" },
      { label: "Careers", href: "/company/careers" },
      { label: "Insights", href: "/insights" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" }
    ]
  }
];

export function Footer() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#020203]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#214cff]/50 to-transparent" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-[#214cff]/[0.07] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={brandAssets.mark}
                alt=""
                width={52}
                height={52}
                className="h-12 w-12 object-contain"
              />
              <div className="grid gap-1.5">
                <Image
                  src={brandAssets.wordmark}
                  alt="Visrax"
                  width={160}
                  height={32}
                  className="h-6 w-auto object-contain"
                />
                <Image
                  src={brandAssets.tagline}
                  alt=""
                  width={220}
                  height={20}
                  className="h-3 w-auto max-w-[12rem] object-contain opacity-70"
                />
              </div>
            </Link>
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-7 text-white/50">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/request-demo">Request a Demo</ButtonLink>
              <ButtonLink href="/platform" variant="secondary">
                Explore Platform
              </ButtonLink>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-white/45">
              {contactEmail ? (
                <a className="inline-flex items-center gap-2 transition hover:text-white" href={`mailto:${contactEmail}`}>
                  <Mail aria-hidden className="h-4 w-4 text-accent" />
                  {contactEmail}
                </a>
              ) : (
                <Link className="inline-flex items-center gap-2 transition hover:text-white" href="/company/contact">
                  <Mail aria-hidden className="h-4 w-4 text-accent" />
                  Contact Visrax
                </Link>
              )}
              <span className="inline-flex items-center gap-2 text-white/30" aria-label="LinkedIn profile not configured">
                <Linkedin aria-hidden className="h-4 w-4" />
                LinkedIn
              </span>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/35">{column.title}</h2>
                <ul className="mt-5 grid gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-white/50 transition hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/[0.07] pt-8 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Visrax. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
