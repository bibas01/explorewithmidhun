import { treks } from "@/data/treks";
import { TrekFilters } from "@/components/trek-filters";
import type { Metadata } from "next";
import { MountainDivider } from "@/components/mountain-divider";

export const metadata: Metadata = {
  title: "All Treks",
  description: "Explore private, guided treks in the Everest, Annapurna, and Langtang regions of Nepal.",
};

export default function TreksPage() {
  return (
    <div className="bg-paper min-h-screen flex flex-col">
      {/* Main Content Container */}
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 flex-grow">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-saffron">The Routes</p>
          <h1 className="mt-2 font-display text-5xl">Find your mountain.</h1>
          <p className="mt-4 text-charcoal/60">
            Every trek is private and tailored to your pace. Browse the routes below,
            or get in touch to design a custom itinerary.
          </p>
        </div>

        <TrekFilters treks={treks} />
      </div>

      {/* Divider: Full width, outside the max-w-6xl container */}
      <div className="bg-paper w-full mt-24">
        <MountainDivider flip={true} />
      </div>
    </div>
  );
}