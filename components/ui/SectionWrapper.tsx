import { type ReactNode } from "react";

type BgVariant = "ink" | "navy" | "panel" | "deep";
type GlowColor = "gold" | "blue";

interface SectionWrapperProps {
  children: ReactNode;
  bg?: BgVariant;
  grid?: boolean;
  glow?: boolean;
  glowColor?: GlowColor;
  className?: string;
  id?: string;
}

const bgMap: Record<BgVariant, string> = {
  ink: "bg-ink",
  navy: "bg-navy",
  panel: "bg-panel",
  deep: "bg-[#060c14]"
};

export function SectionWrapper({
  children,
  bg = "ink",
  grid = false,
  glow = false,
  glowColor = "gold",
  className = "",
  id
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-16 md:py-24 ${bgMap[bg]} ${className}`}
    >
      {grid && (
        <div className="agency-grid absolute inset-0 pointer-events-none opacity-25" />
      )}
      {glow && glowColor === "gold" && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(214,168,79,0.09)_0%,transparent_70%)]" />
      )}
      {glow && glowColor === "blue" && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(37,99,235,0.09)_0%,transparent_70%)]" />
      )}
      <div className="relative mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
        {children}
      </div>
    </section>
  );
}
