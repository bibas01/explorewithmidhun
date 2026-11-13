"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-stone/20 bg-charcoal/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png" 
            alt="ExploreWithMidhun Logo"
            width={40}
            height={40}
            className="rounded-full object-cover shadow-sm"
          />
          <span className="hidden font-display text-2xl tracking-tight text-paper sm:block">
            ExploreWithMidhun<span className="text-saffron">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium sm:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-paper-dim transition hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden rounded-full bg-saffron px-6 py-2.5 text-sm font-medium text-charcoal transition hover:bg-paper sm:block"
          >
            Plan a trek
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 text-paper-dim hover:bg-stone/20 sm:hidden"
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

      {isOpen && (
        <div className="absolute top-20 left-0 right-0 border-b border-stone/20 bg-charcoal p-6 shadow-xl sm:hidden">
          <nav className="flex flex-col space-y-5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-paper-dim transition hover:text-saffron"
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