"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export function SiteFooter() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", { 
          timeZone: "Asia/Kathmandu", 
          hour: '2-digit', 
          minute:'2-digit', 
          hour12: false 
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="bg-charcoal text-paper border-t border-stone/20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-32">
        
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          
          {/* Left Side */}
          <div>
             <h2 className="font-display text-5xl sm:text-7xl mb-6 text-paper">
               Let's go<br/>somewhere.
             </h2>
             <p className="text-paper-dim text-base mb-10 max-w-sm leading-relaxed">
               Private, guided treks across the Himalayas. Based in Kathmandu, available worldwide.
             </p>
             
             {/* Live Clock */}
             <div className="flex items-center gap-3 text-sm text-paper-dim font-mono uppercase tracking-widest">
               <span className="relative flex h-2.5 w-2.5">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-saffron"></span>
               </span>
               Kathmandu — {time}
             </div>
          </div>
          
          {/* Right Side (Links) */}
          <div className="grid grid-cols-2 gap-8 sm:gap-16 lg:justify-items-end">
             <div className="flex flex-col gap-5">
               <p className="text-xs uppercase tracking-[0.2em] text-paper-dim/50 mb-2 font-bold">Explore</p>
               <Link href="/treks" className="text-lg text-paper hover:text-saffron transition">Treks</Link>
               <Link href="/about" className="text-lg text-paper hover:text-saffron transition">About</Link>
               <Link href="/blog" className="text-lg text-paper hover:text-saffron transition">Journal</Link>
             </div>
             <div className="flex flex-col gap-5">
               <p className="text-xs uppercase tracking-[0.2em] text-paper-dim/50 mb-2 font-bold">Connect</p>
               <a href="#" className="text-lg text-paper hover:text-saffron transition">Instagram</a>
               <a href="#" className="text-lg text-paper hover:text-saffron transition">WhatsApp</a>
               <a href="#" className="text-lg text-paper hover:text-saffron transition">Email</a>
             </div>
          </div>
        </div>
        
        {/* Bottom Bar with Logo */}
        <div className="mt-24 pt-8 border-t border-stone/20 flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-paper-dim font-medium">
          
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
             {/* ⬇️ Added light background here, removed grayscale */}
             <div className="rounded-full bg-paper p-0.5 shadow-md">
               <Image 
                 src="/images/logo.png" 
                 width={36} 
                 height={36} 
                 alt="ExploreWithMidhun Logo" 
                 className="rounded-full object-cover" 
               />
             </div>
             <span>© {new Date().getFullYear()} ExploreWithMidhun. All rights reserved.</span>
          </div>

          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-paper transition">Terms</Link>
            <Link href="/privacy" className="hover:text-paper transition">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}