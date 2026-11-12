"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "10", label: "Years Guiding" },
  { value: "140+", label: "Treks Completed" },
  { value: "5,545", label: "Highest Point (m)" },
  { value: "100%", label: "Safety Record" },
];

export function StatsSection() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        <div className="grid grid-cols-2 gap-y-16 gap-x-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex items-baseline">
                <span className="font-display text-6xl sm:text-7xl lg:text-8xl text-charcoal tracking-tighter">
                  {stat.value}
                </span>
                {/* Tiny suffix for the + and % */}
                {stat.value.includes('+') && <span className="text-3xl text-saffron ml-1">+</span>}
                {stat.value.includes('%') && <span className="text-3xl text-saffron ml-1">%</span>}
              </div>
              
              <div className="mt-4 h-px w-8 bg-saffron/50" /> {/* Jiro style tiny divider line */}
              
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}