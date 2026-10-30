import Link from "next/link";
import { treks } from "@/data/treks"; 
import { TrekCard } from "@/components/trek-card";
import { MountainDivider } from "@/components/mountain-divider";
import { HeroSection } from "@/components/hero-section";

const stats = [
  ["12", "years guiding"],
  ["340+", "treks completed"],
  ["5,545 m", "highest point"],
  ["100%", "safety record"],
];

export default function HomePage() {
  const featured = treks.filter((t) => t.featured);

  return (
    <div className="bg-paper min-h-screen">
      
      {/* THE NEW COMPONENT */}
      <HeroSection />

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

      {/* Bottom Divider */}
      <div className="bg-paper w-full">
        <MountainDivider flip={true} />
      </div>

      {/* Closing CTA */}
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