import Image from "next/image";
import Link from "next/link";

export function BrandHeader() {
  const logoPath = "/assets/brand/logo-white.svg";

  return (
    <header className="absolute left-0 right-0 top-0 z-20 border-b border-white/10 bg-ink/82 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-[1320px] items-center px-5 py-3 md:min-h-[82px] md:px-8 lg:px-10">
        <Link className="flex min-w-0 items-center gap-3.5 sm:gap-4" href="/">
          {logoPath ? (
            <Image alt="Technocrats Digimate" className="h-11 w-auto max-w-[74px] shrink-0 object-contain sm:h-12 sm:max-w-20 md:h-[58px] md:max-w-[98px]" height={58} src={logoPath} unoptimized width={98} />
          ) : (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-gold/55 bg-gold/12 text-base font-bold text-gold shadow-gold sm:h-12 sm:w-12 md:h-[58px] md:w-[58px] md:text-lg">
              TD
            </span>
          )}
          <span className="min-w-0 whitespace-nowrap text-sm font-extrabold uppercase leading-none tracking-[0.12em] text-white sm:text-base md:text-[1.18rem]">
            Technocrats Digimate
          </span>
        </Link>
      </div>
    </header>
  );
}
