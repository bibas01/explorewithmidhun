import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Midhun",
  description: "Meet Midhun, your licensed freelance trekking guide in Nepal.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-saffron">The Guide</p>
          <h1 className="mt-2 font-display text-5xl">Hi, I'm Midhun.</h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-charcoal/70">
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

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-charcoal/10 pt-8">
            <div>
              <p className="font-display text-xl">TAAN & NMA</p>
              <p className="text-sm text-charcoal/60">Licensed Guide</p>
            </div>
            <div>
              <p className="font-display text-xl">Wilderness First Aid</p>
              <p className="text-sm text-charcoal/60">Certified (WFR)</p>
            </div>
            <div>
              <p className="font-display text-xl">English, Hindi, Nepali</p>
              <p className="text-sm text-charcoal/60">Languages spoken</p>
            </div>
            <div>
              <p className="font-display text-xl">12 Years</p>
              <p className="text-sm text-charcoal/60">Guiding experience</p>
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-charcoal/5">
          {/* Make sure you have saved your photo as public/images/midhun.jpg */}
          <Image
            src="/images/midhun.jpg" 
            alt="Midhun, trekking guide"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </div>
  );
}