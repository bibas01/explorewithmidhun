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
    <section className="bg-white py-24 sm:py-32 border-b border-stone/20">
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
                <span className="font-display text-6xl sm:text-7xl text-paper tracking-tighter">
                  {stat.value}
                </span>
                {stat.value.includes('+') && <span className="text-3xl text-saffron ml-1 font-bold">+</span>}
                {stat.value.includes('%') && <span className="text-3xl text-saffron ml-1 font-bold">%</span>}
              </div>
              
              <div className="mt-4 h-[2px] w-8 bg-saffron/50" />
              
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-paper-dim">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}