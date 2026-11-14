"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 30,
    mass: 0.8,
  });

  // 🚨 THE FIX: These thresholds now exactly match the opacity timings below.
  // When Annapurna is visible, activeIndex is 0. When Everest is visible, it's 3.
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest < 0.45) setActiveIndex(0);
    else if (latest < 0.65) setActiveIndex(1);
    else if (latest < 0.85) setActiveIndex(2);
    else setActiveIndex(3);
  });

  // --- MAP CAMERA TIMELINE ---
  const scaleDesktop = [1, 1.1, 2.5, 2.5, 2.5, 2.5, 2.5];
  const scaleMobile = [1, 1.25, 1.85, 2.0, 2.4, 2.7, 2.9];

  const mapScale = useTransform(
    smoothProgress, 
    [0, 0.15, 0.25, 0.45, 0.65, 0.85, 1], 
    isMobile ? scaleMobile : scaleDesktop
  );

  const mapX = useTransform(
    smoothProgress, 
    [0, 0.15, 0.25, 0.45, 0.65, 0.85, 1], 
    ["0%", "0%", activeRegions[0].x, activeRegions[1].x, activeRegions[2].x, activeRegions[3].x, activeRegions[3].x]
  );

  const mapY = useTransform(
    smoothProgress, 
    [0, 0.15, 0.25, 0.45, 0.65, 0.85, 1], 
    ["0%", "0%", activeRegions[0].y, activeRegions[1].y, activeRegions[2].y, activeRegions[3].y, activeRegions[3].y]
  );

  // --- CARD OPACITY TIMELINES ---
  const introOpacity = useTransform(smoothProgress, [0, 0.10], [1, 0]);
  const introY = useTransform(smoothProgress, [0, 0.10], [0, -50]);
  
  const opacity1 = useTransform(smoothProgress, [0.20, 0.25, 0.40, 0.45], [0, 1, 1, 0]); 
  const opacity2 = useTransform(smoothProgress, [0.40, 0.45, 0.60, 0.65], [0, 1, 1, 0]); 
  const opacity3 = useTransform(smoothProgress, [0.60, 0.65, 0.80, 0.85], [0, 1, 1, 0]); 
  // Fixed the duplicate '1' input range that causes NaN errors
  const opacity4 = useTransform(smoothProgress, [0.80, 0.85, 1], [0, 1, 1]);       

  const cardOpacities = [opacity1, opacity2, opacity3, opacity4];

  const scrollToDestination = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const scrollableDistance = container.offsetHeight - window.innerHeight;
    // Updated targets to land perfectly in the middle of each card's visibility window
    const targetProgresses = [0.35, 0.55, 0.75, 0.95]; 
    const targetScroll = containerTop + (scrollableDistance * targetProgresses[index]);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-charcoal">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* 🏔️ SNOWY BACKGROUND IMAGE 🏔️ */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/snow-bg.webp" 
            alt="Snowy Himalayas"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white/20" />
        </div>

        <motion.div 
          style={{ scale: mapScale, x: mapX, y: mapY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden w-full"
        >
          <div className="relative w-[2000px] h-[1138px] max-w-none drop-shadow-2xl">
            <img 
              src="/nepal-map.svg" 
              alt="Map of Nepal" 
              className="relative w-full h-full object-contain" 
              fetchPriority="high"  
              loading="eager"       
            />
          </div>
        </motion.div>

        {/* UI Overlays */}
        <div className="relative z-20 w-full max-w-[1400px] px-4 sm:px-8 h-full flex flex-col md:flex-row items-center justify-between pointer-events-none">
          
          {/* Left Side (Intro & Region Cards) */}
          <div className="relative w-full md:w-3/5 h-full flex flex-col justify-center">
            
            {/* Intro Card */}
            <motion.div style={{ opacity: introOpacity, y: introY }} className="absolute w-full md:max-w-lg lg:max-w-2xl bg-white/40 p-8 sm:p-12 lg:p-16 rounded-[2rem] backdrop-blur-xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] pointer-events-none">
              <div className="flex items-center gap-4 mb-4">
                <p className="text-[#143023] uppercase tracking-[0.3em] text-xs sm:text-sm font-bold">The Himalayas</p>
                <div className="h-[1px] w-12 bg-[#143023]/30" />
              </div>
              <h1 className="font-display text-5xl sm:text-7xl lg:text-[6rem] text-[#143023] leading-[1.05]">
                Find your<br/>mountain.
              </h1>
              <p className="mt-6 text-[#476858] text-lg sm:text-xl font-medium">
                Scroll to explore the regions.
              </p>
              <div className="mt-8 flex items-center justify-center w-12 h-12 rounded-full border border-[#143023]/30">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#143023]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </div>
            </motion.div>

            {/* Region Cards */}
            {activeRegions.map((region, i) => (
              <motion.div 
                key={region.id} 
                style={{ opacity: cardOpacities[i] }} 
                className={`absolute w-full md:max-w-lg lg:max-w-xl ${
                  // 🚨 THE FIX: Only the active card can be clicked.
                  activeIndex === i ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <div className="mb-4 flex items-end gap-3">
                  <h2 className="font-display text-4xl sm:text-6xl text-[#143023]">{region.name}</h2>
                  <span className="text-xs sm:text-sm text-white font-bold mb-1 sm:mb-2 bg-[#38BDF8] px-3 py-1 rounded-full shadow-lg">
                    {region.treks.length} Treks
                  </span>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {region.treks.map((trek) => (
                    <Link 
                      key={trek.slug} 
                      href={`/treks/${trek.slug}`} 
                      className="group relative flex items-center gap-4 rounded-2xl bg-white/50 p-3 border border-white/60 backdrop-blur-md transition-all hover:bg-white/70 hover:border-[#38BDF8] shadow-lg hover:-translate-y-1"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                        <Image 
                          src={trek.heroImage} 
                          alt={trek.title} 
                          fill 
                          sizes="64px"      
                          quality={70}
                          className="object-cover" 
                        />
                      </div>
                      
                      <div>
                        <h3 className="font-display text-lg sm:text-xl text-[#143023] leading-tight group-hover:text-[#38BDF8] transition-colors line-clamp-1">
                          {trek.title}
                        </h3>
                        <p className="text-xs text-[#476858] mt-1 font-medium">{trek.days} Days · {trek.difficulty}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side (Navigator) */}
          <div className="relative w-[200px] lg:w-[250px] pointer-events-auto hidden md:flex flex-col justify-center h-full">
            <div className="flex items-center gap-4 mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-[#143023] font-bold">Regions</p>
              <div className="h-[1px] w-8 bg-[#143023]/30" />
            </div>
            <div className="flex flex-col gap-6 relative">
              <div className="absolute left-[7px] top-4 bottom-4 w-[1px] bg-[#143023]/30" />
              {activeRegions.map((region, i) => (
                <button
                  key={region.id}
                  onClick={() => scrollToDestination(i)}
                  className="group flex items-center gap-4 text-left relative z-10"
                >
                  <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    activeIndex === i 
                      ? "bg-[#38BDF8] border-[#38BDF8] scale-125 shadow-[0_0_15px_rgba(56,189,248,0.8)]" 
                      : "bg-white border-[#143023]/30 group-hover:border-[#143023]"
                  }`} />
                  <span className={`text-base font-bold transition-all duration-300 ${
                    activeIndex === i 
                      ? "text-[#143023] translate-x-2" 
                      : "text-[#476858] group-hover:text-[#143023]"
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