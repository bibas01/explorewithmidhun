"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion"; // ⬅️ Import motion

const nav = [
  { href: "/treks", label: "Treks" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }} // Starts 100px above the screen and invisible
      animate={{ y: 0, opacity: 1 }}    // Slides down to its natural position and fades in
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // The "Apple-like" smooth easing
      className="sticky top-0 z-50 border-b border-charcoal/10 bg-white/10 backdrop-blur-xl border-white/10 text-charcoal"
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png" 
            alt="ExploreWithMidhun Logo"
            width={44}
            height={44}
            className="rounded-full object-cover shadow-sm"
          />
          <span className="hidden font-display text-2xl tracking-tight sm:block">
            ExploreWithMidhun<span className="text-saffron">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-medium sm:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-charcoal/70 transition hover:text-saffron"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side (CTA + Mobile Toggle) */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden rounded-full bg-charcoal px-6 py-2.5 text-sm font-medium text-paper transition hover:bg-saffron hover:text-charcoal sm:block"
          >
            Plan a trek
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 text-charcoal/70 hover:bg-charcoal/5 sm:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-20 left-0 right-0 border-b border-charcoal/10 bg-paper p-6 shadow-xl sm:hidden">
          <nav className="flex flex-col space-y-5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-charcoal/80 transition hover:text-saffron"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </motion.header>
  );
}