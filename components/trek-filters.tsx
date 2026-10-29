"use client";

import { useState } from "react";
import { Trek } from "@/lib/types";
import { TrekCard } from "./trek-card";

export function TrekFilters({ treks }: { treks: Trek[] }) {
  const [region, setRegion] = useState<string>("All");
  const [difficulty, setDifficulty] = useState<string>("All");

  const regions = ["All", ...Array.from(new Set(treks.map((t) => t.region)))];
  const difficulties = ["All", ...Array.from(new Set(treks.map((t) => t.difficulty)))];

  const filteredTreks = treks.filter((t) => {
    const matchRegion = region === "All" || t.region === region;
    const matchDifficulty = difficulty === "All" || t.difficulty === difficulty;
    return matchRegion && matchDifficulty;
  });

  return (
    <div>
      {/* Filters */}
      <div className="mb-10 flex flex-col gap-4 border-b border-charcoal/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <span className="mr-2 py-2 text-sm text-charcoal/50">Region:</span>
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                region === r
                  ? "bg-charcoal text-paper"
                  : "bg-charcoal/5 text-charcoal hover:bg-charcoal/10"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="mr-2 py-2 text-sm text-charcoal/50">Difficulty:</span>
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                difficulty === d
                  ? "bg-charcoal text-paper"
                  : "bg-charcoal/5 text-charcoal hover:bg-charcoal/10"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredTreks.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTreks.map((trek) => (
            <TrekCard key={trek.slug} trek={trek} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-charcoal/60">
          No treks match those filters. Try adjusting your selection.
        </div>
      )}
    </div>
  );
}