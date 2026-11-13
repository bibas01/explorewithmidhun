import Image from "next/image";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata: Metadata = {
  title: "About Midhun",
  description: "Meet Midhun, your licensed freelance trekking guide in Nepal.",
};

export default function AboutPage() {
  return (
    <div className="bg-charcoal min-h-screen flex flex-col">
      {/* Main Content Container */}
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 flex-grow">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Left Side - Text */}
          <ScrollReveal>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-saffron font-bold">The Guide</p>
              <h1 className="mt-2 font-display text-5xl sm:text-6xl text-paper">Hi, I'm Midhun.</h1>
              
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-paper-dim">
                <p>
                  I grew up in the shadows of the Himalayas, and I've spent the last decade 
                  leading travellers through the Khumbu, Annapurna, and Langtang valleys. 
                </p>
                <p>
                  I started ExploreWithMidhun because I believe trekking shouldn't feel like 
                  a tour group. It should feel like walking with a friend who happens to know 
                  every teahouse, every shortcut, and exactly how to keep you safe at altitude.
                </p>
                <p>
                  When I'm not on the trail, I'm in Kathmandu planning logistics, 
                  checking gear, and drinking too much milk tea.
                </p>
              </div>

              {/* Certifications Grid */}
              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-stone/20 pt-8">
                <div>
                  <p className="font-display text-xl text-paper">TAAN & NMA</p>
                  <p className="text-sm text-paper-dim mt-1">Licensed Guide</p>
                </div>
                <div>
                  <p className="font-display text-xl text-paper">Wilderness First Aid</p>
                  <p className="text-sm text-paper-dim mt-1">Certified (WFR)</p>
                </div>
                <div>
                  <p className="font-display text-xl text-paper">English, Hindi, Nepali</p>
                  <p className="text-sm text-paper-dim mt-1">Languages spoken</p>
                </div>
                <div>
                  <p className="font-display text-xl text-paper">12 Years</p>
                  <p className="text-sm text-paper-dim mt-1">Guiding experience</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Side - Photo */}
          <ScrollReveal delay={0.2}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-stone/30 bg-charcoal-soft shadow-2xl">
              <Image
                src="/images/midhun.jpg" 
                alt="Midhun, trekking guide"
                fill
                className="object-cover"
              />
            </div>
          </ScrollReveal>

        </div>
      </div>
    </div>
  );
}