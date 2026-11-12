"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { treks } from "@/data/treks";

// 1. DEFINE THE REGIONS & CAMERA VALUES
const regionsData = [
  { id: "annapurna", name: "Annapurna", x: "0%", y: "10%" },
  { id: "manaslu", name: "Manaslu", x: "-10%", y: "10%" },
  { id: "langtang", name: "Langtang", x: "-40%", y: "5%" },
  { id: "everest", name: "Everest", x: "-75%", y: "-5%" }
];

const activeRegions = regionsData.map((region) => {
  const regionTreks = treks.filter((t) => t.region === region.name);
  return { ...region, treks: regionTreks };
});

export function MapHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- TRACK ACTIVE REGION FOR THE NAVIGATOR ---
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.35) setActiveIndex(0);
    else if (latest < 0.55) setActiveIndex(1);
    else if (latest < 0.75) setActiveIndex(2);
    else setActiveIndex(3);
  });

  // --- MAP CAMERA TIMELINE ---
  const mapScale = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.25, 0.45, 0.65, 0.85, 1], 
    [1, 1.1, 3.5, 3.5, 3.5, 3.5, 3.5] 
  );

  const mapX = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.25, 0.45, 0.65, 0.85, 1], 
    ["0%", "0%", activeRegions[0].x, activeRegions[1].x, activeRegions[2].x, activeRegions[3].x, activeRegions[3].x]
  );

  const mapY = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.25, 0.45, 0.65, 0.85, 1], 
    ["0%", "0%", activeRegions[0].y, activeRegions[1].y, activeRegions[2].y, activeRegions[3].y, activeRegions[3].y]
  );

  // --- TEXT & CARD OPACITY TIMELINES ---
  const introOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
  
  const opacity1 = useTransform(scrollYProgress, [0.28, 0.33, 0.43, 0.45], [0, 1, 1, 0]); 
  const opacity2 = useTransform(scrollYProgress, [0.48, 0.53, 0.63, 0.65], [0, 1, 1, 0]); 
  const opacity3 = useTransform(scrollYProgress, [0.68, 0.73, 0.83, 0.85], [0, 1, 1, 0]); 
  const opacity4 = useTransform(scrollYProgress, [0.88, 0.93, 1, 1], [0, 1, 1, 1]);       

  const cardOpacities = [opacity1, opacity2, opacity3, opacity4];

  // --- CLICK-TO-SCROLL LOGIC ---
  const scrollToDestination = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerTop = container.offsetTop;
    const scrollableDistance = container.offsetHeight - window.innerHeight;
    const targetProgresses = [0.25, 0.45, 0.65, 0.85];
    const targetScroll = containerTop + (scrollableDistance * targetProgresses[index]);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#0f110f]">
      
      {/* Sticky Map Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* 🌲 NATURAL ATMOSPHERIC GLOWS 🌲 */}
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-amber-700/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0" />
        <div className="absolute bottom-1/4 left-0 w-[800px] h-[800px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0" />

        {/* The Map */}
        <motion.div 
          style={{ scale: mapScale, x: mapX, y: mapY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <div className="relative w-[1000px] h-[569px] max-w-[90vw]">
            <img 
              src="/nepal-map.svg" 
              alt="Map of Nepal" 
              className="relative w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" 
            />
          </div>
        </motion.div>

        {/* UI Overlays */}
        <div className="relative z-20 w-full max-w-7xl px-6 h-full flex flex-col md:flex-row items-center justify-between pointer-events-none">
          
          {/* Left Side (Intro & Region Cards) */}
          <div className="relative w-full md:w-3/5 h-full flex flex-col justify-center">
            
            {/* Intro Text (UPDATED COLOR HERE) */}
            <motion.div style={{ opacity: introOpacity, y: introY }} className="absolute bg-[#1c241c]/80 p-8 rounded-3xl backdrop-blur-md border border-[#7a8f73]/30 shadow-2xl">
              <p className="text-saffron uppercase tracking-[0.3em] text-sm mb-4 font-bold">The Himalayas</p>
              <h1 className="font-display text-6xl sm:text-8xl text-[#f0f4f8] drop-shadow-2xl">
                Find your<br/>mountain.
              </h1>
              <p className="mt-6 text-[#a3b19f] text-lg max-w-md drop-shadow-lg">Scroll to explore the regions.</p>
            </motion.div>

            {/* BEAUTIFUL MINI-POSTER TREK CARDS */}
            {activeRegions.map((region, i) => (
              <motion.div 
                key={region.id} 
                style={{ opacity: cardOpacities[i] }} 
                className="absolute w-full max-w-xl pointer-events-auto"
              >
                <div className="mb-6 flex items-end gap-3 drop-shadow-lg">
                  <h2 className="font-display text-4xl sm:text-6xl text-white">{region.name}</h2>
                  <span className="text-sm text-saffron font-bold mb-1 bg-charcoal/60 px-3 py-1 rounded backdrop-blur-md border border-white/10">
                    {region.treks.length} Treks
                  </span>
                </div>
                
                {/* 2-Column Grid of Image Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {region.treks.map((trek) => (
                    <Link 
                      key={trek.slug} 
                      href={`/treks/${trek.slug}`} 
                      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-white/20 shadow-2xl transition-all hover:-translate-y-1 hover:border-saffron/50"
                    >
                      <Image 
                        src={trek.heroImage} 
                        alt={trek.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-90" />
                      
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <h3 className="font-display text-xl text-white leading-tight drop-shadow-md group-hover:text-saffron transition-colors">
                          {trek.title}
                        </h3>
                        <p className="text-xs text-paper/80 mt-1">{trek.days} Days · {trek.difficulty}</p>
                      </div>

                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-saffron text-charcoal rounded-full p-1.5">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side (Minimal Scroll Spy Navigator) */}
          <div className="relative w-[200px] pointer-events-auto hidden md:flex flex-col justify-center h-full">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-bold mb-6 drop-shadow-md">Regions</p>
            <div className="flex flex-col gap-6 relative">
              <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-white/20" />
              {activeRegions.map((region, i) => (
                <button
                  key={region.id}
                  onClick={() => scrollToDestination(i)}
                  className="group flex items-center gap-4 text-left relative z-10"
                >
                  <div className={`w-[11px] h-[11px] rounded-full border-2 transition-all duration-300 ${
                    activeIndex === i 
                      ? "bg-saffron border-saffron scale-125 shadow-[0_0_15px_rgba(224,123,57,1)]" 
                      : "bg-[#0f110f] border-white/50 group-hover:border-white"
                  }`} />
                  <span className={`text-sm font-bold transition-all duration-300 drop-shadow-md ${
                    activeIndex === i 
                      ? "text-white translate-x-1" 
                      : "text-white/50 group-hover:text-white/90"
                  }`}>
                    {region.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}