const testimonials = [
  {
    quote: "Midhun was incredible. He completely took the stress out of our Everest Base Camp trek. He knew every teahouse owner, monitored our oxygen levels daily, and kept us laughing the whole way. I wouldn't trek with anyone else.",
    name: "Sarah Jenkins",
    location: "London, UK",
    trek: "Everest Base Camp",
  },
  {
    quote: "We did the Annapurna Circuit with Midhun. His English is flawless, his knowledge of the mountains is endless, and he adapted our itinerary when my knee started acting up. He's not just a guide, he's a true friend now.",
    name: "Marcus & Elena",
    location: "Berlin, Germany",
    trek: "Annapurna Circuit",
  },
  {
    quote: "As a solo female traveler, safety was my top priority. Midhun was professional, respectful, and incredibly attentive. The Langtang Valley trek was the most beautiful experience of my life, and I felt safe the entire time.",
    name: "Aisha Patel",
    location: "Toronto, Canada",
    trek: "Langtang Valley",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-paper py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-saffron">Testimonials</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl">Stories from the trail.</h2>
          <p className="mx-auto mt-4 max-w-xl text-charcoal/60">
            Don't just take my word for it. Here is what trekkers have to say about their journeys in the Himalayas.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="relative flex flex-col justify-between rounded-3xl border border-charcoal/10 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex gap-1 text-saffron">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>

                {/* Quote Text */}
                <p className="mt-6 text-charcoal/80 leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              {/* Client Info */}
              <div className="mt-8 border-t border-charcoal/10 pt-4">
                <p className="font-display text-lg text-charcoal">{t.name}</p>
                <p className="text-sm text-charcoal/50">{t.location}</p>
                <p className="mt-2 inline-block rounded-full bg-paper-dim/50 px-3 py-1 text-xs font-medium text-charcoal/70">
                  {t.trek}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}