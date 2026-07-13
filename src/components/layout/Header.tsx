"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
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
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <div
        className={`border-b transition-colors duration-300 ${
          scrolled || open || activeMenu
            ? "border-white/[0.08] bg-[#030303]/88 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
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

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary navigation">
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

          <div className="hidden items-center gap-1 lg:flex">
            <ButtonLink href="/company/contact" variant="ghost">
              Contact
            </ButtonLink>
            <ButtonLink href="/request-demo" variant="light" className="ml-2 !min-h-10 !px-5 !py-2.5 text-[0.8125rem]">
              Request a Demo
            </ButtonLink>
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
        <div className="h-[calc(100dvh-4.25rem)] overflow-y-auto border-b border-white/10 bg-[#030303]/98 px-5 pb-10 pt-2 backdrop-blur-xl lg:hidden">
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
