"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function ScrollReveal({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children: ReactNode; 
  className?: string; 
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} // Reduced travel distance
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "0px 0px -50px 0px" }} // Triggers 50px BEFORE it enters screen
      transition={{ 
        duration: 0.7, // Faster animation so it feels snappy
        delay: delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}