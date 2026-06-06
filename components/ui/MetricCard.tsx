interface MetricCardProps {
  stat: string;
  label: string;
  sublabel?: string;
  showBars?: boolean;
}

const barConfig = [
  { height: "h-4", color: "bg-gold/20" },
  { height: "h-6", color: "bg-gold/30" },
  { height: "h-8", color: "bg-gold" },
  { height: "h-5", color: "bg-gold/40" },
  { height: "h-7", color: "bg-gold/60" }
];

export function MetricCard({
  stat,
  label,
  sublabel,
  showBars = true
}: MetricCardProps) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/25 hover:shadow-gold">
      {showBars && (
        <div className="mb-4 flex h-8 items-end gap-1">
          {barConfig.map((bar, i) => (
            <div
              key={i}
              className={`w-3 rounded-sm ${bar.height} ${bar.color}`}
            />
          ))}
        </div>
      )}
      <p className="text-4xl font-bold text-gold">{stat}</p>
      <p className="mt-2 text-sm font-medium text-white">{label}</p>
      {sublabel && (
        <p className="mt-1 text-xs text-slate-500">{sublabel}</p>
      )}
    </div>
  );
}
