import Link from "next/link";
import { Trek } from "@/lib/types";

export function StickyBookingBar({ trek }: { trek: Trek }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone/30 bg-charcoal-soft/95 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md sm:hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-paper-dim">{trek.days} days · {trek.difficulty}</p>
          <p className="font-display text-xl text-paper">${trek.priceUSD}</p>
        </div>
        <Link
          href={`/contact?trek=${trek.slug}`}
          className="rounded-full bg-saffron px-6 py-3 text-sm font-bold text-charcoal transition hover:bg-paper"
        >
          Book this trek
        </Link>
      </div>
    </div>
  );
}