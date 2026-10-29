import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrek, treks } from "@/data/treks";
import { ElevationChart } from "@/components/elevation-chart";
import { StickyBookingBar } from "@/components/sticky-booking-bar";
import type { Metadata } from "next";

// Generate static pages for all treks at build time
export function generateStaticParams() {
  return treks.map((trek) => ({ slug: trek.slug }));
}

// Dynamic SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const trek = getTrek(slug);
  if (!trek) return { title: "Trek Not Found" };
  
  return {
    title: trek.title,
    description: trek.summary,
  };
}

export default async function TrekPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trek = getTrek(slug);

  if (!trek) {
    notFound();
  }

  // JSON-LD Schema for Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trek.title,
    description: trek.summary,
    touristType: "Adventure Travelers",
    itinerary: trek.itinerary.map((day: any) => ({
      "@type": "TouristAttraction",
      name: `Day ${day.day}: ${day.title}`,
      description: day.description,
    })),
    offers: {
      "@type": "Offer",
      price: trek.priceUSD,
      priceCurrency: "USD",
    },
  };

  return (
    <article className="pb-24 sm:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <Image
          src={trek.heroImage}
          alt={trek.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-12 sm:px-6">
          <Link href="/treks" className="text-sm text-paper/70 hover:text-paper">
            ← Back to all treks
          </Link>
          <h1 className="mt-4 font-display text-5xl text-paper sm:text-7xl">{trek.title}</h1>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-paper/80">
            <span><strong className="text-saffron">Region:</strong> {trek.region}</span>
            <span><strong className="text-saffron">Duration:</strong> {trek.days} days</span>
            <span><strong className="text-saffron">Max Alt:</strong> {trek.maxAltitude}m</span>
            <span><strong className="text-saffron">Season:</strong> {trek.season}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-3">
        
        {/* Left Column (Main Info) */}
        <div className="lg:col-span-2 space-y-16">
          
          {/* Overview */}
          <section>
            <h2 className="font-display text-3xl">Overview</h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal/70">
              {trek.summary}
            </p>
          </section>

          {/* Elevation Chart */}
          <section>
            <h2 className="mb-6 font-display text-3xl">Elevation Profile</h2>
            <ElevationChart itinerary={trek.itinerary} />
          </section>

          {/* Itinerary */}
          <section>
            <h2 className="mb-6 font-display text-3xl">Itinerary</h2>
            <div className="space-y-4">
              {trek.itinerary.map((day: any) => (
                <details key={day.day} className="group rounded-xl border border-charcoal/10 bg-paper p-4 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between font-medium">
                    <div className="flex items-center gap-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron/10 text-xs text-saffron-dark">
                        {day.day}
                      </span>
                      <span>{day.title}</span>
                    </div>
                    <span className="text-sm text-charcoal/50">{day.altitude}m</span>
                  </summary>
                  <div className="mt-4 pl-12 text-charcoal/70">
                    <p>{day.description}</p>
                    {day.hours && (
                      <p className="mt-2 text-sm text-charcoal/50">Walking time: {day.hours}</p>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Inclusions / Exclusions */}
          <section className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl text-charcoal">What's Included</h3>
              <ul className="mt-4 space-y-2 text-sm text-charcoal/70">
                {trek.inclusions.map((item: string, i: number) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-saffron">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-2xl text-charcoal">What's Not Included</h3>
              <ul className="mt-4 space-y-2 text-sm text-charcoal/70">
                {trek.exclusions.map((item: string, i: number) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-charcoal/30">✕</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          
          {/* Gear List */}
          <section>
            <h3 className="font-display text-2xl text-charcoal">Suggested Gear List</h3>
            <ul className="mt-4 grid gap-2 text-sm text-charcoal/70 sm:grid-cols-2">
              {trek.gearList.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-saffron">•</span> {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-charcoal/10 bg-white/50 p-6 backdrop-blur">
            <p className="text-sm text-charcoal/50">Guide fee from</p>
            <p className="mt-1 font-display text-4xl">${trek.priceUSD}</p>
            <p className="mt-2 text-xs text-charcoal/50 leading-relaxed">
              {trek.priceNote}
            </p>
            
            <hr className="my-6 border-charcoal/10" />
            
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium text-charcoal">Permits Required</p>
                <ul className="mt-1 space-y-1 text-charcoal/60">
                  {trek.permits.map((p: string, i: number) => <li key={i}>{p}</li>)}
                </ul>
              </div>
              <div>
                <p className="font-medium text-charcoal">Difficulty</p>
                <p className="text-charcoal/60">{trek.difficulty}</p>
              </div>
            </div>

            <Link
              href={`/contact?trek=${trek.slug}`}
              className="mt-8 block w-full rounded-full bg-charcoal py-3 text-center text-sm font-medium text-paper transition hover:bg-saffron hover:text-charcoal"
            >
              Request Dates
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bar */}
      <StickyBookingBar trek={trek} />
    </article>
  );
}