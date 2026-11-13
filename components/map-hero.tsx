"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { treks } from "@/data/treks";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.35) setActiveIndex(0);
    else if (latest < 0.55) setActiveIndex(1);
    else if (latest < 0.75) setActiveIndex(2);
    else setActiveIndex(3);
  });

  // --- MAP CAMERA TIMELINE ---
  // Mobile: Start at 0.4 (fits screen), Zoom to 2.0 (massive)
  // Desktop: Start at 1, Zoom to 2.5
  const scaleDesktop = [1, 1.1, 2.5, 2.5, 2.5, 2.5, 2.5];
  const scaleMobile = [0.4, 0.5, 2.0, 2.0, 2.0, 2.0, 2.0];

  const mapScale = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.25, 0.45, 0.65, 0.85, 1], 
    isMobile ? scaleMobile : scaleDesktop
  );

  const mapX = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.25, 0.45, 0.65, 0.85, 1], 
    ["0%", "0%", activeRegions[0].x, activeRegions[1].x, activeRegions[2].x, activeRegions[3].x, activeRegions[3].x]
  );

  // Keep the Y axis centered on mobile so the pins are visible
  const mapY = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.25, 0.45, 0.65, 0.85, 1], 
    ["0%", "0%", activeRegions[0].y, activeRegions[1].y, activeRegions[2].y, activeRegions[3].y, activeRegions[3].y]
  );

  const introOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
  
  const opacity1 = useTransform(scrollYProgress, [0.20, 0.25, 0.40, 0.45], [0, 1, 1, 0]); 
  const opacity2 = useTransform(scrollYProgress, [0.40, 0.45, 0.60, 0.65], [0, 1, 1, 0]); 
  const opacity3 = useTransform(scrollYProgress, [0.60, 0.65, 0.80, 0.85], [0, 1, 1, 0]); 
  const opacity4 = useTransform(scrollYProgress, [0.80, 0.85, 1, 1], [0, 1, 1, 1]);       

  const cardOpacities = [opacity1, opacity2, opacity3, opacity4];

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
    <div ref={containerRef} className="relative h-[400vh] bg-charcoal border-b border-stone/20">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* 🌲 NATURAL ATMOSPHERIC GLOWS 🌲 */}
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-amber-700/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0" />
        <div className="absolute bottom-1/4 left-0 w-[800px] h-[800px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0" />

        <motion.div 
          style={{ scale: mapScale, x: mapX, y: mapY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden w-full"
        >
          <div className="relative w-[2000px] h-[1138px] max-w-none">
            <img 
              src="/nepal-map.svg" 
              alt="Map of Nepal" 
              className="relative w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" 
            />
          </div>
        </motion.div>

        {/* 🚨 FIXED LAYOUT: Centered on all devices 🚨 */}
        <div className="relative z-20 w-full max-w-[1400px] px-4 sm:px-8 h-full flex flex-col md:flex-row items-center justify-between pointer-events-none">
          
          {/* Left Side (Intro & Region Cards) */}
          <div className="relative w-full md:w-3/5 h-full flex flex-col justify-center">
            
            {/* Intro Text */}
            <motion.div style={{ opacity: introOpacity, y: introY }} className="absolute w-full md:max-w-lg lg:max-w-2xl bg-charcoal-soft/90 p-6 sm:p-10 lg:p-16 rounded-3xl lg:rounded-[2rem] backdrop-blur-xl border border-stone/30 shadow-2xl">
              <p className="text-saffron uppercase tracking-[0.3em] text-[10px] sm:text-sm mb-3 sm:mb-6 font-bold">The Himalayas</p>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-[7rem] text-paper leading-[1.05] lg:leading-[0.95] drop-shadow-2xl">
                Find your<br/>mountain.
              </h1>
              <p className="mt-3 sm:mt-8 text-paper-dim text-sm sm:text-lg lg:text-2xl max-w-md drop-shadow-lg">
                Scroll to explore the regions.
              </p>
            </motion.div>

            {/* 🚨 COMPACT REGION CARDS 🚨 */}
            {activeRegions.map((region, i) => (
              <motion.div 
                key={region.id} 
                style={{ opacity: cardOpacities[i] }} 
                className="absolute w-full md:max-w-lg lg:max-w-2xl pointer-events-auto"
              >
                <div className="mb-3 sm:mb-8 flex items-end gap-2 sm:gap-4 drop-shadow-lg">
                  <h2 className="font-display text-3xl sm:text-5xl lg:text-7xl text-paper">{region.name}</h2>
                  <span className="text-[10px] sm:text-sm lg:text-base text-saffron font-bold mb-1 sm:mb-2 bg-charcoal-soft px-2 sm:px-4 py-1 sm:py-1.5 rounded backdrop-blur-md border border-stone/30">
                    {region.treks.length} Treks
                  </span>
                </div>
                
                <div className="grid grid-cols-1 gap-2 sm:gap-4 lg:gap-6">
                  {region.treks.map((trek) => (
                    <Link 
                      key={trek.slug} 
                      href={`/treks/${trek.slug}`} 
                      className="group relative flex items-center gap-3 sm:gap-5 rounded-xl sm:rounded-2xl bg-charcoal-soft/95 p-2 sm:p-4 lg:p-5 border border-stone/30 backdrop-blur-xl transition-all hover:bg-stone/20 hover:border-saffron shadow-xl hover:-translate-y-1"
                    >
                      {/* Small Thumbnail on Mobile */}
                      <div className="relative h-12 w-12 sm:h-20 sm:w-20 lg:h-24 lg:w-24 shrink-0 overflow-hidden rounded-md sm:rounded-xl">
                        <Image 
                          src={trek.heroImage} 
                          alt={trek.title} 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                      
                      <div>
                        <h3 className="font-display text-sm sm:text-xl lg:text-2xl text-paper leading-tight group-hover:text-saffron transition-colors drop-shadow-sm line-clamp-1 sm:line-clamp-2">
                          {trek.title}
                        </h3>
                        <p className="text-[10px] sm:text-sm lg:text-base text-paper-dim mt-0.5 sm:mt-2">{trek.days} Days · {trek.difficulty}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side (Navigator - Hidden on Mobile) */}
          <div className="relative w-[250px] lg:w-[300px] pointer-events-auto hidden md:flex flex-col justify-center h-full">
            <p className="text-xs lg:text-sm uppercase tracking-[0.2em] text-paper-dim font-bold mb-8 drop-shadow-md">Regions</p>
            <div className="flex flex-col gap-8 relative">
              <div className="absolute left-[7px] top-4 bottom-4 w-[1.5px] bg-stone/30" />
              {activeRegions.map((region, i) => (
                <button
                  key={region.id}
                  onClick={() => scrollToDestination(i)}
                  className="group flex items-center gap-5 text-left relative z-10"
                >
                  <div className={`w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 transition-all duration-300 ${
                    activeIndex === i 
                      ? "bg-saffron border-saffron scale-125 shadow-[0_0_15px_rgba(224,123,57,1)]" 
                      : "bg-charcoal border-stone group-hover:border-paper"
                  }`} />
                  <span className={`text-base lg:text-xl font-bold transition-all duration-300 drop-shadow-md ${
                    activeIndex === i 
                      ? "text-paper translate-x-2" 
                      : "text-paper-dim group-hover:text-paper"
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