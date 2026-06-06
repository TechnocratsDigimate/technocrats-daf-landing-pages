import Image from "next/image";
import Link from "next/link";

export function BrandHeader() {
  return (
    <header className="absolute left-0 right-0 top-0 z-20 border-b border-white/10 bg-ink/82 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-[1320px] items-center px-5 py-3 md:min-h-[82px] md:px-8 lg:px-10">
        <Link href="/">
          <Image
            alt="Technocrats Digimate"
            className="h-auto w-auto max-h-9 max-w-[180px] shrink-0 object-contain sm:max-h-10 sm:max-w-[220px] md:max-h-11 md:max-w-[280px]"
            height={315}
            src="/assets/brand/wide-logo.svg"
            unoptimized
            width={2732}
          />
        </Link>
      </div>
    </header>
  );
}
