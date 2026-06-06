"use client";

import Link from "next/link";

type CtaVariant = "primary" | "secondary";

interface CtaButtonProps {
  label: string;
  href: string;
  variant?: CtaVariant;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

const variantClasses: Record<CtaVariant, string> = {
  primary:
    "inline-block rounded-md bg-gold px-5 py-3 text-center font-semibold text-ink transition-all duration-200 hover:bg-gold-soft hover:shadow-[0_0_20px_rgba(214,168,79,0.35)]",
  secondary:
    "inline-block rounded-md border border-gold/40 px-5 py-3 text-center font-semibold text-gold transition-all duration-200 hover:border-gold hover:bg-gold/10"
};

export function CtaButton({
  label,
  href,
  variant = "primary",
  external = false,
  onClick,
  className = "",
  fullWidth = false
}: CtaButtonProps) {
  const classes = `${variantClasses[variant]}${fullWidth ? " w-full" : ""} ${className}`.trim();

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        rel="noreferrer"
        target="_blank"
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {label}
    </Link>
  );
}
