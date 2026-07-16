import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  size?: "md" | "lg";
};

export function SectionHeader({ eyebrow, title, copy, align = "left", size = "md" }: SectionHeaderProps) {
  const titleSize =
    size === "lg"
      ? "text-5xl sm:text-6xl lg:text-[4.5rem]"
      : "text-4xl sm:text-5xl lg:text-[3.75rem]";
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl"}>
      {eyebrow ? <p className={`eyebrow mb-5 ${align === "center" ? "justify-center before:hidden" : ""}`}>{eyebrow}</p> : null}
      <h2 className={`font-display text-balance font-semibold leading-[1.02] tracking-tightest text-white ${titleSize}`}>
        {title}
      </h2>
      {copy ? <p className="mt-6 text-pretty text-base leading-7 text-white/55 sm:text-lg sm:leading-8">{copy}</p> : null}
    </Reveal>
  );
}
