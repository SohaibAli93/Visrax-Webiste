"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { brandAssets } from "@/lib/site";
import { navGroups } from "@/lib/data";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  function openMenu(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
  }

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 140);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <div
        className={`mx-auto max-w-[88rem] rounded-full border transition-all duration-300 lg:w-fit ${
          scrolled || open || activeMenu
            ? "border-white/[0.08] bg-[#0b0b0e] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
            : "border-white/[0.06] bg-[#0b0b0e]/95 shadow-[0_16px_50px_-24px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        }`}
      >
        <div className="relative flex h-16 items-center justify-between gap-4 px-3 sm:h-[4.5rem] lg:justify-start lg:gap-6 lg:pr-2.5">
          {/* Logo badge — white circle with the mark, small wordmark beside */}
          <Link href="/" className="relative z-10 flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white sm:h-12 sm:w-12">
              <Image
                src={brandAssets.mark}
                alt=""
                width={44}
                height={44}
                className="h-7 w-7 object-contain sm:h-8 sm:w-8"
                priority
              />
            </span>
            <Image
              src={brandAssets.wordmark}
              alt="Visrax"
              width={140}
              height={16}
              className="h-3.5 w-auto object-contain sm:h-4 lg:hidden xl:block"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 px-2 lg:flex" aria-label="Primary navigation">
            {navGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => openMenu(group.label)}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href={group.href}
                  className={`flex min-h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium tracking-wide transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${
                    activeMenu === group.label ? "bg-white/[0.08] text-white" : "text-white/75 hover:text-white"
                  }`}
                  onFocus={() => openMenu(group.label)}
                  aria-expanded={activeMenu === group.label}
                  aria-haspopup="true"
                >
                  {group.label}
                  <ChevronDown
                    aria-hidden
                    className={`h-3.5 w-3.5 transition ${activeMenu === group.label ? "rotate-180 text-accent" : "opacity-50"}`}
                  />
                </Link>

                {activeMenu === group.label ? (
                  <div
                    className="absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3"
                    onMouseEnter={() => openMenu(group.label)}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-gradient-to-b from-[#131318] to-[#0b0b0f] p-2 shadow-[0_40px_90px_-24px_rgba(0,0,0,0.95)]">
                      {/* Soft top sheen instead of a hard ring */}
                      <span aria-hidden className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                      <div className="mb-1 border-b border-white/[0.06] pb-1">
                        <Link
                          href={group.href}
                          className="flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium text-accent transition hover:bg-white/[0.05]"
                        >
                          {group.label} overview
                          <span aria-hidden className="text-white/30">→</span>
                        </Link>
                      </div>
                      <div className="grid max-h-[min(24rem,60vh)] gap-0.5 overflow-y-auto">
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="rounded-xl px-3.5 py-2.5 text-sm text-white/75 transition hover:bg-white/[0.07] hover:text-white"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="hidden items-center lg:flex">
            <Link
              href="/request-demo"
              className="group inline-flex min-h-12 items-center gap-1.5 rounded-full bg-white px-7 py-3 text-sm font-semibold tracking-wide text-[#0b0b12] transition duration-200 hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              Request a Demo
              <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <button
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white lg:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-auto mt-2 max-h-[calc(100dvh-6rem)] max-w-6xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0b0b0e] px-4 pb-8 pt-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] lg:hidden">
          <nav aria-label="Mobile navigation" className="mx-auto max-w-lg">
            {navGroups.map((group) => (
              <details key={group.label} className="border-b border-white/[0.08] py-1" open={group.label === "Platform"}>
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-base font-semibold text-white">
                  {group.label}
                  <ChevronDown aria-hidden className="h-4 w-4 text-white/40" />
                </summary>
                <div className="grid gap-0.5 pb-4">
                  <Link href={group.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-accent">
                    {group.label} overview
                  </Link>
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-sm text-white/65"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
            <div className="mt-8 grid gap-3">
              <ButtonLink href="/request-demo" className="w-full" onClick={() => setOpen(false)}>
                Request a Demo
              </ButtonLink>
              <ButtonLink href="/company/contact" variant="secondary" className="w-full" onClick={() => setOpen(false)}>
                Contact
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
