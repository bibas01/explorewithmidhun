"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // ⬅️ Added this back

const nav = [
  { href: "/treks", label: "Treks" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        
        {/* Logo with Image */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png" // ⬅️ CHECK THIS PATH (is it /logo.png or /images/logo.png?)
            alt="ExploreWithMidhun Logo"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <span className="hidden font-display text-xl tracking-tight sm:block">
            ExploreWithMidhun<span className="text-saffron">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm sm:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-charcoal/70 transition hover:text-charcoal"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side (CTA + Mobile Toggle) */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden rounded-full bg-charcoal px-4 py-2 text-sm text-paper transition hover:bg-saffron hover:text-charcoal sm:block"
          >
            Plan a trek
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 text-charcoal/70 hover:bg-charcoal/5 sm:hidden"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
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
        <div className="absolute top-16 left-0 right-0 border-b border-charcoal/10 bg-paper p-4 shadow-lg sm:hidden">
          <nav className="flex flex-col space-y-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)} // Close menu when clicked
                className="text-lg font-medium text-charcoal/80 transition hover:text-saffron"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 block rounded-full bg-charcoal px-4 py-3 text-center text-sm font-medium text-paper transition hover:bg-saffron hover:text-charcoal"
            >
              Plan a trek
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}