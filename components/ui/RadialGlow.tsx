type GlowColor = "gold" | "blue";
type GlowSize = "sm" | "md" | "lg";

interface RadialGlowProps {
  color?: GlowColor;
  size?: GlowSize;
  className?: string;
}

const goldGlows: Record<GlowSize, string> = {
  sm: "bg-[radial-gradient(ellipse_40%_30%_at_50%_50%,rgba(214,168,79,0.09)_0%,transparent_70%)]",
  md: "bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(214,168,79,0.10)_0%,transparent_70%)]",
  lg: "bg-[radial-gradient(ellipse_80%_55%_at_50%_50%,rgba(214,168,79,0.12)_0%,transparent_70%)]"
};

const blueGlows: Record<GlowSize, string> = {
  sm: "bg-[radial-gradient(ellipse_40%_30%_at_50%_50%,rgba(37,99,235,0.09)_0%,transparent_70%)]",
  md: "bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(37,99,235,0.10)_0%,transparent_70%)]",
  lg: "bg-[radial-gradient(ellipse_80%_55%_at_50%_50%,rgba(37,99,235,0.12)_0%,transparent_70%)]"
};

export function RadialGlow({
  color = "gold",
  size = "md",
  className = ""
}: RadialGlowProps) {
  const glowClass = color === "gold" ? goldGlows[size] : blueGlows[size];

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${glowClass} ${className}`}
    />
  );
}
