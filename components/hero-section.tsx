"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
  },
};

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Mouse Tracking Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Smooth the mouse values (Spring)
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3. Map mouse position to layers
  const imageX = useTransform(smoothX, [-0.5, 0.5], ["-3%", "3%"]);
  const imageY = useTransform(smoothY, [-0.5, 0.5], ["-3%", "3%"]);
  const textX = useTransform(smoothX, [-0.5, 0.5], ["15px", "-15px"]);
  const textY = useTransform(smoothY, [-0.5, 0.5], ["15px", "-15px"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5; // -0.5 to 0.5
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Scroll animations (existing)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scrollYImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scrollYText = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const headline = "Walk the Himalaya with someone who grew up in them.";
  const words = headline.split(" ");

  return (
    <section 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal"
    >
      {/* Parallax Background Image */}
      <motion.div 
        style={isMobile ? {} : { y: scrollYImage, x: imageX }} 
        className="absolute inset-0 z-0 h-[120%] w-[110%] -left-[5%]" // Made wider to prevent edges from showing
      >
        <motion.div style={isMobile ? {} : { y: imageY }} className="w-full h-full relative">
          <Image
            src="/images/hero.webp"
            alt="Himalayan trail"
            fill
            priority
            unoptimized 
            sizes="100vw"
            className="object-cover object-[65%_center] md:object-center"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
      </motion.div>

      {/* Foreground Content */}
      <motion.div 
        style={isMobile ? {} : { y: scrollYText, opacity: opacityText, x: textX }} 
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 pt-24 pb-20 pointer-events-none"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          {/* Re-enable pointer events on the text/buttons so they can be clicked */}
          <div className="pointer-events-auto">
            <motion.p 
              variants={wordVariants}
              className="inline-block rounded-full bg-charcoal/60 px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-saffron backdrop-blur-md border border-white/10 mb-6"
            >
              Freelance trekking guide · Nepal
            </motion.p>

            <motion.h1 
              style={isMobile ? {} : { y: textY }} // Additional mouse Y movement for text
              className="font-display text-5xl leading-[1.05] text-white sm:text-7xl lg:text-8xl xl:text-[7.5rem] tracking-tight flex flex-wrap gap-x-3 gap-y-1 sm:gap-x-4 sm:gap-y-2 drop-shadow-2xl"
            >
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  className="inline-block origin-bottom"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p 
              variants={wordVariants}
              className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-xl text-white/90 font-medium leading-relaxed drop-shadow-md"
            >
              Private, small-group treks across Everest, Annapurna and Langtang — 
              planned around your pace, not a fixed departure date.
            </motion.p>

            <motion.div 
              variants={wordVariants}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                href="/treks"
                className="group relative flex justify-center overflow-hidden rounded-full bg-saffron px-8 py-4 text-sm font-bold uppercase tracking-wider text-charcoal transition-transform hover:scale-105 shadow-xl"
              >
                <span className="relative z-10">Explore Treks</span>
              </Link>
              <Link
                href="/contact"
                className="flex justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-md px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-charcoal shadow-lg"
              >
                Plan a Custom Trek
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}