import { type ReactNode } from "react";

type AccentVariant = "gold" | "blue" | "none";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  accent?: AccentVariant;
}

const accentMap: Record<AccentVariant, string> = {
  gold: "border-l-4 border-l-gold",
  blue: "border-l-4 border-l-blue-500",
  none: ""
};

export function GlassCard({
  children,
  className = "",
  hover = false,
  accent = "none"
}: GlassCardProps) {
  const hoverClasses = hover
    ? "hover:-translate-y-1 hover:border-gold/30 hover:shadow-gold"
    : "";

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-300 ${accentMap[accent]} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
}
