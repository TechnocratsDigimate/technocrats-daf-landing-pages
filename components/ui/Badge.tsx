type BadgeVariant = "gold" | "blue" | "green" | "red" | "ghost";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantMap: Record<BadgeVariant, string> = {
  gold: "bg-gold/15 border-gold/30 text-gold",
  blue: "bg-blue-500/15 border-blue-500/30 text-blue-400",
  green: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  red: "bg-red-500/15 border-red-500/30 text-red-400",
  ghost: "bg-white/[0.04] border-white/15 text-slate-400"
};

const sizeMap: Record<BadgeSize, string> = {
  sm: "text-xs px-2 py-0.5",
  md: "text-xs px-3 py-1"
};

export function Badge({ label, variant = "gold", size = "md" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${variantMap[variant]} ${sizeMap[size]}`}
    >
      {label}
    </span>
  );
}
