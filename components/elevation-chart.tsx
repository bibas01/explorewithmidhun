"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ItineraryDay } from "@/lib/types";

export function ElevationChart({ itinerary }: { itinerary: ItineraryDay[] }) {
  // We map the data for the chart. 
  // We include day 0 (start altitude) and a fake end day to make it look like a proper profile
  const data = itinerary.map((day) => ({
    name: `Day ${day.day}`,
    altitude: day.altitude,
  }));

  return (
    <div className="h-[300px] w-full rounded-2xl border border-charcoal/10 bg-paper p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAltitude" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-saffron)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-saffron)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: "var(--color-stone)" }} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(val) => val.replace("Day ", "D")}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: "var(--color-stone)" }} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(val) => `${val}m`}
            domain={['dataMin - 500', 'dataMax + 500']}
          />
          <Tooltip 
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            formatter={(value: number) => [`${value}m`, "Altitude"]}
          />
          <Area 
            type="monotone" 
            dataKey="altitude" 
            stroke="var(--color-saffron)" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorAltitude)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}