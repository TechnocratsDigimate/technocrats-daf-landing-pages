import Link from "next/link";

export function BrandHeader() {
  return (
    <header className="absolute left-0 right-0 top-0 z-20 border-b border-white/10 bg-ink/82 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-[1320px] items-center px-5 py-3 md:min-h-[82px] md:px-8 lg:px-10">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Technocrats Digimate"
            className="h-9 w-auto shrink-0 sm:h-10 md:h-11"
            src="/assets/brand/wide-logo.svg"
          />
        </Link>
      </div>
    </header>
  );
}
