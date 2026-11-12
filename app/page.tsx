import Link from "next/link";
import { treks } from "@/data/treks"; 
import { TrekCard } from "@/components/trek-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TestimonialsSection } from "@/components/testimonials-section";
import { StatsSection } from "@/components/stats-section";
import { MapHero } from "@/components/map-hero";

export default function HomePage() {
  const featured = treks.filter((t) => t.featured);

  return (
    <div className="bg-paper min-h-screen">
      
      {/* 1. INTERACTIVE MAP HERO (Keeps its dark internal background) */}
      <MapHero />

      {/* 2. STATS */}
      <StatsSection />

      {/* 3. FEATURED TREKS */}
      <section className="relative mx-auto max-w-5xl px-4 pb-16 pt-16 sm:px-6">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-display text-4xl sm:text-5xl text-charcoal">Featured treks</h2>
            <Link
              href="/treks"
              className="text-sm text-charcoal/60 underline-offset-4 hover:underline mb-2"
            >
              View all →
            </Link>
          </div>
        </ScrollReveal>
        
        <div className="flex flex-col">
          {featured.map((trek, index) => (
            <TrekCard key={trek.slug} trek={trek} index={index} />
          ))}
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <ScrollReveal>
        <TestimonialsSection />
      </ScrollReveal>

      {/* 5. CLOSING CTA (Massive Editorial Style) */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-charcoal py-32">
        
        {/* Giant subtle background text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <h2 className="font-display text-[25vw] leading-none text-white whitespace-nowrap">
            Explore
          </h2>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <ScrollReveal>
            <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white leading-[1.05] mb-8 drop-shadow-2xl">
              Every trek is <br className="hidden sm:block"/> private.
            </h2>
            <p className="mx-auto max-w-xl text-paper/60 text-lg sm:text-xl mb-12">
              No fixed departures, no strangers in your group. Tell me your dates
              and fitness level, and I'll build an itinerary around them.
            </p>
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-saffron px-12 py-5 text-sm font-bold uppercase tracking-widest text-charcoal transition-transform hover:scale-105 shadow-[0_0_40px_rgba(224,123,57,0.3)] hover:shadow-[0_0_60px_rgba(224,123,57,0.5)]"
            >
              <span className="relative z-10">Start Planning</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>
      
    </div>
  );
}