import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  className?: string;
  onClick?: () => void;
};

export function ButtonLink({ href, children, variant = "primary", className = "", onClick }: ButtonLinkProps) {
  const styles = {
    primary:
      "rounded-xl border border-transparent bg-gradient-to-r from-[#214cff] via-[#3d5cff] to-[#6b3dff] px-5 py-3 text-white shadow-[0_12px_40px_rgba(33,76,255,0.28)] hover:brightness-110 hover:shadow-[0_16px_48px_rgba(33,76,255,0.36)]",
    secondary:
      "rounded-xl border border-white/12 bg-white/[0.03] px-5 py-3 text-white backdrop-blur-sm hover:border-white/22 hover:bg-white/[0.06]",
    light:
      "rounded-full border border-white bg-white px-7 py-3.5 text-black shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:bg-white/92",
    ghost: "rounded-lg px-3 py-2 text-white/60 hover:text-white"
  };

  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center text-sm font-semibold tracking-wide transition duration-200 ${styles[variant]} ${className}`}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
