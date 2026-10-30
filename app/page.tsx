import Image from "next/image";
import Link from "next/link";
import { treks } from "@/data/treks"; 
import { TrekCard } from "@/components/trek-card";
import { MountainDivider } from "@/components/mountain-divider";

const stats = [
  ["10", "years guiding"],
  ["140+", "treks completed"],
  ["5,545 m", "highest point"],
  ["100%", "safety record"],
];

export default function HomePage() {
  const featured = treks.filter((t) => t.featured);

  return (
    <div className="bg-paper min-h-screen">
      {/* Hero section */}
      <section className="relative flex min-h-[88vh] items-end overflow-hidden pb-12 bg-charcoal">
        <Image
          src="/images/hero.jpg"
          alt="Himalayan trail at dawn"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/10" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
          <p className="inline-block rounded-full bg-charcoal/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-md">
            Freelance trekking guide · Nepal
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] text-paper sm:text-7xl">
            Walk the Himalaya with someone who grew up in them.
          </h1>
          <p className="mt-6 max-w-xl text-paper/70">
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
              className="rounded-full border border-paper/30 px-6 py-3 text-sm text-paper transition hover:border-paper"
            >
              Plan a custom trek
            </Link>
          </div>
        </div>
      </section>

      {/* 1. THE TOP DIVIDER: Hero to Stats */}
      <div className="bg-charcoal w-full relative z-20">
        <MountainDivider />
      </div>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <dl className="grid grid-cols-2 gap-8 border-y border-charcoal/10 py-10 sm:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label}>
              <dt className="font-display text-3xl">{value}</dt>
              <dd className="mt-1 text-sm text-charcoal/60">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Featured treks */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-4xl">Featured treks</h2>
          <Link
            href="/treks"
            className="text-sm text-charcoal/60 underline-offset-4 hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((trek) => (
            <TrekCard key={trek.slug} trek={trek} />
          ))}
        </div>
      </section>

      {/* 2. THE BOTTOM DIVIDER: Treks to Dark CTA */}
      <div className="bg-paper w-full">
        <MountainDivider flip={true} />
      </div>

      {/* Closing CTA (Note: pt-0 so it sits flush against the mountains) */}
      <section className="bg-charcoal pt-0 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-3xl bg-charcoal-soft px-6 py-14 text-center text-paper sm:px-16">
            <h2 className="font-display text-4xl">Every trek is private.</h2>
            <p className="mx-auto mt-4 max-w-xl text-paper/60">
              No fixed departures, no strangers in your group. Tell me your dates
              and fitness level, and I&apos;ll build an itinerary around them.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-saffron px-6 py-3 text-sm font-medium text-paper transition hover:bg-paper hover:text-charcoal"
            >
              Start planning
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}