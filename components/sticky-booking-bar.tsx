import Link from "next/link";
import { Trek } from "@/lib/types";

export function StickyBookingBar({ trek }: { trek: Trek }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-charcoal/10 bg-paper p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] sm:hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-charcoal/60">{trek.days} days · {trek.difficulty}</p>
          <p className="font-display text-xl">${trek.priceUSD}</p>
        </div>
        <Link
          href={`/contact?trek=${trek.slug}`}
          className="rounded-full bg-saffron px-6 py-3 text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-paper"
        >
          Book this trek
        </Link>
      </div>
    </div>
  );
}