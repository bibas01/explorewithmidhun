import Image from "next/image";
import Link from "next/link";
import { MountainDivider } from "./mountain-divider";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[88vh] items-end overflow-hidden pb-12 bg-charcoal">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Himalayan trail at dawn"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/10 z-0" />

      {/* Text Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
        <p className="inline-block rounded-full bg-charcoal/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-md">
          Freelance trekking guide · Nepal
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] text-paper sm:text-7xl drop-shadow-lg">
          Walk the Himalaya with someone who grew up in them.
        </h1>
        <p className="mt-6 max-w-xl text-paper/90 drop-shadow-md text-lg">
          Private, small-group treks across Everest, Annapurna and Langtang —
          planned around your pace, not a fixed departure date.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/treks"
            className="rounded-full bg-saffron px-6 py-3 text-sm font-medium text-paper transition hover:bg-paper hover:text-charcoal"
          >
            Explore treks
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-paper/30 px-6 py-3 text-sm text-paper transition hover:border-paper backdrop-blur-sm"
          >
            Plan a custom trek
          </Link>
        </div>
      </div>

      {/* The Mountains - Anchored to the bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 w-full pointer-events-none">
        <MountainDivider />
      </div>
    </section>
  );
}