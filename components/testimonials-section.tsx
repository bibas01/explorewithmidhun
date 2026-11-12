"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Midhun completely took the stress out of our Everest Base Camp trek. He knew every teahouse owner, monitored our oxygen levels daily, and kept us laughing the whole way. I wouldn't trek with anyone else.",
    name: "Sarah Jenkins",
    location: "London, UK",
    trek: "Everest Base Camp",
  },
  {
    quote: "We did the Annapurna Circuit with Midhun. His English is flawless, his knowledge of the mountains is endless, and he adapted our itinerary when my knee started acting up. He's a true professional.",
    name: "Marcus & Elena",
    location: "Berlin, Germany",
    trek: "Annapurna Circuit",
  },
  {
    quote: "As a solo female traveler, safety was my top priority. Midhun was professional, respectful, and incredibly attentive. The Langtang Valley trek was the most beautiful experience of my life.",
    name: "Aisha Patel",
    location: "Toronto, Canada",
    trek: "Langtang Valley",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-paper py-32 sm:py-40 overflow-hidden relative">
      
      {/* Subtle background text to give it that Jiro depth */}
      <div className="absolute top-10 left-0 right-0 text-center opacity-[0.03] pointer-events-none select-none">
        <h2 className="font-display text-[20vw] leading-none text-white whitespace-nowrap">
          Reviews
        </h2>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-20 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-saffron mb-4">Testimonials</p>
          <h2 className="font-display text-5xl sm:text-6xl text-charcoal">Stories from the trail.</h2>
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col justify-between rounded-[2rem] bg-white p-8 sm:p-10 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Giant background quote mark */}
              <span className="absolute -top-6 -left-2 text-8xl font-display text-saffron/10 group-hover:text-saffron/20 transition-colors duration-500 select-none">
                "
              </span>

              <div className="relative z-10">
                {/* 5 Stars */}
                <div className="flex gap-1 text-saffron mb-8">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
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
                <p className="text-charcoal/80 text-lg leading-relaxed font-light">
                  "{t.quote}"
                </p>
              </div>

              {/* Client Info */}
              <div className="mt-10 pt-6 border-t border-charcoal/10">
                <p className="font-display text-xl text-charcoal">{t.name}</p>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-sm font-medium text-charcoal/40">{t.location}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-saffron bg-saffron/10 px-3 py-1 rounded-full">
                    {t.trek}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}