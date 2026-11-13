"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Trek } from "@/lib/types";

export function TrekCard({ trek, index }: { trek: Trek; index: number }) {
  const isEven = index % 2 === 0;
  const initialX = isEven ? -100 : 100; 

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.2 }} 
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full mb-8 sm:mb-12"
    >
      <Link href={`/treks/${trek.slug}`} className="group block w-full">
        <div className="relative flex h-[50vh] sm:h-[65vh] w-full flex-col justify-end overflow-hidden rounded-[2rem] bg-charcoal shadow-xl border-4 border-white">
          
          <Image
            src={trek.heroImage}
            alt={trek.title}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          
          {/* Dark gradient so white text pops */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#143023] via-[#143023]/40 to-transparent opacity-90" />

          <div className="relative z-10 p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="rounded-full bg-saffron px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-md">
                {trek.region}
              </span>
              <span className="text-sm font-bold text-white/90 drop-shadow-md">
                {trek.days} Days
              </span>
            </div>
            
            <h3 className="font-display text-4xl sm:text-6xl text-white drop-shadow-lg">
              {trek.title}
            </h3>
            
            <div className="mt-6 flex items-center justify-between">
              <p className="text-white/80 max-w-md hidden sm:block drop-shadow-md">
                {trek.summary}
              </p>
              <div className="flex items-center gap-2 text-white font-bold group-hover:text-saffron transition-colors drop-shadow-md">
                Explore Route 
                <span className="text-xl">→</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}