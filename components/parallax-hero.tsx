"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. The Epic Zoom: As you scroll, we zoom deeply into the mountain
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
  
  // 2. The Sunburst: Moves and fades as you scroll
  const flareY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const flareOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // 3. The Text: Starts visible, then fades out and shrinks as you zoom in
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 0.4], ["0px", "-50px"]);

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-charcoal">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* The Massive Mountain Image */}
        <motion.div 
          style={{ scale: imageScale }}
          className="absolute inset-0 z-0 origin-center"
        >
          <Image
            src="/images/hero.jpg"
            alt="Himalayan mountains"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_20%]" // Focuses on the mountain peak
          />
          {/* Dark overlay to make text readable */}
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        {/* 🌟 THE LENS FLARE / SUNBURST (Pure CSS) */}
        <motion.div
          style={{ y: flareY, opacity: flareOpacity }}
          className="absolute inset-0 z-10 pointer-events-none mix-blend-screen"
        >
          {/* Sun Glow */}
          <div className="absolute top-[10%] left-[20%] h-[40vw] w-[40vw] rounded-full bg-yellow-200/40 blur-[100px]" />
          
          {/* The Rays */}
          <div 
            className="absolute inset-0 opacity-60"
            style={{
              background: `
                conic-gradient(from 180deg at 20% 10%, transparent 0deg, rgba(255,255,255,0.3) 10deg, transparent 20deg, transparent 40deg, rgba(255,255,255,0.2) 50deg, transparent 60deg),
                radial-gradient(circle at 20% 10%, rgba(255,255,220,0.8) 0%, transparent 30%)
              `
            }}
          />
          
          {/* Lens Flare artifacts */}
          <div className="absolute top-[15%] left-[25%] h-4 w-4 rounded-full bg-white/80 blur-sm" />
          <div className="absolute top-[25%] left-[40%] h-12 w-12 rounded-full bg-cyan-300/20 blur-md" />
          <div className="absolute top-[40%] left-[60%] h-8 w-8 rounded-full bg-pink-300/20 blur-md" />
        </motion.div>

        {/* Text Content */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale, y: textY }}
          className="absolute inset-0 z-20 flex items-center justify-center pb-24"
        >
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 text-center lg:text-left">
            <p className="inline-block rounded-full bg-charcoal/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-md">
              Freelance trekking guide · Nepal
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] text-white sm:text-7xl drop-shadow-2xl">
              Walk the Himalaya with someone who grew up in them.
            </h1>
            <p className="mt-6 max-w-xl text-white/90 drop-shadow-xl text-lg">
              Private, small-group treks across Everest, Annapurna and Langtang —
              planned around your pace, not a fixed departure date.
            </p>
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
              <Link
                href="/treks"
                className="rounded-full bg-saffron px-6 py-3 text-sm font-medium text-paper transition hover:bg-paper hover:text-charcoal shadow-lg"
              >
                Explore treks
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/40 px-6 py-3 text-sm text-white transition hover:bg-white/10 backdrop-blur-md"
              >
                Plan a custom trek
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}