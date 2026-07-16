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
        className={`mx-auto max-w-[88rem] rounded-full border transition-all duration-300 ${
          scrolled || open || activeMenu
            ? "border-white/[0.09] bg-[#0a0a0c]/90 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
            : "border-white/[0.06] bg-[#0a0a0c]/70 shadow-[0_16px_50px_-24px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        }`}
      >
        <div className="relative flex h-16 items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:pl-7 lg:pr-3">
          <Link href="/" className="relative z-10 flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan">
            <Image
              src={brandAssets.mark}
              alt=""
              width={40}
              height={40}
              className="h-9 w-9 object-contain sm:h-10 sm:w-10"
              priority
            />
            <Image
              src={brandAssets.wordmark}
              alt="Visrax"
              width={140}
              height={28}
              className="h-5 w-auto object-contain sm:h-6"
              priority
            />
          </Link>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex"
            aria-label="Primary navigation"
          >
            {navGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => openMenu(group.label)}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href={group.href}
                  className={`flex min-h-10 items-center gap-1.5 rounded-lg px-3.5 text-[0.8125rem] font-medium tracking-wide transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${
                    activeMenu === group.label ? "bg-white/[0.06] text-white" : "text-white/55 hover:bg-white/[0.04] hover:text-white"
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
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c]/96 p-2 shadow-panel backdrop-blur-xl">
                      <Link
                        href={group.href}
                        className="mb-1 flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium text-accent transition hover:bg-white/[0.04]"
                      >
                        {group.label} overview
                        <span aria-hidden className="text-white/30">→</span>
                      </Link>
                      <div className="grid max-h-[min(24rem,60vh)] gap-0.5 overflow-y-auto">
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="rounded-xl px-3.5 py-2.5 text-sm text-white/60 transition hover:bg-white/[0.04] hover:text-white"
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
              className="group inline-flex min-h-11 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#214cff] to-[#4d6bff] px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_10px_30px_-8px_rgba(33,76,255,0.5)] transition duration-200 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
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
        <div className="mx-auto mt-2 max-h-[calc(100dvh-6rem)] max-w-6xl overflow-y-auto rounded-3xl border border-white/10 bg-[#050506]/95 px-4 pb-8 pt-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-2xl lg:hidden">
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
