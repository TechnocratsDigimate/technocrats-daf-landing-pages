interface SectionHeaderProps {
  eyebrow?: string;
  headline: string;
  highlight?: string;
  subheadline?: string;
  align?: "left" | "center";
}

function renderHeadline(headline: string, highlight?: string) {
  if (!highlight || !headline.includes(highlight)) return <>{headline}</>;
  const idx = headline.indexOf(highlight);
  return (
    <>
      {headline.slice(0, idx)}
      <span className="bg-gradient-to-r from-gold to-gold-soft bg-clip-text text-transparent">
        {highlight}
      </span>
      {headline.slice(idx + highlight.length)}
    </>
  );
}

export function SectionHeader({
  eyebrow,
  headline,
  highlight,
  subheadline,
  align = "left"
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "text-center" : "text-left"}>
      {eyebrow && (
        <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl ${isCenter ? "mx-auto max-w-3xl" : "max-w-3xl"}`}
      >
        {renderHeadline(headline, highlight)}
      </h2>
      {subheadline && (
        <p
          className={`mt-4 text-lg leading-8 text-slate-300 ${isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          {subheadline}
        </p>
      )}
    </div>
  );
}
