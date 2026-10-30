"use client"; // ⬅️ Add this line at the very top

import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import type { Trek } from "@/lib/types";

export function TrekCard({ trek }: { trek: Trek }) {
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      glareEnable={true}
      glareMaxOpacity={0.15}
      glareColor="#ffffff"
      glarePosition="bottom"
      scale={1.02}
      transitionSpeed={400}
    >
      <Link href={`/treks/${trek.slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-charcoal/5 shadow-md">
          <Image
            src={trek.heroImage}
            alt={trek.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-paper">
            <p className="text-xs uppercase tracking-widest text-paper/70">
              {trek.region} · {trek.days} days
            </p>
            <h3 className="mt-1 font-display text-2xl leading-tight">{trek.title}</h3>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-charcoal/60">
          <span>{trek.difficulty}</span>
          <span>from ${trek.priceUSD.toLocaleString()}</span>
        </div>
      </Link>
    </Tilt>
  );
}