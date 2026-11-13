"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ItineraryDay } from "@/lib/types";

export function ElevationChart({ itinerary }: { itinerary: ItineraryDay[] }) {
  const data = itinerary.map((day) => ({
    name: `Day ${day.day}`,
    altitude: day.altitude,
  }));

  return (
    // ⬇️ These Tailwind selectors ([&_svg], [&_path], [&_g]) strip outlines from ALL chart elements
    <div 
      className="h-[300px] w-full rounded-2xl border border-stone/30 bg-charcoal-soft p-4 shadow-xl outline-none [&_svg]:outline-none [&_path]:outline-none [&_g]:outline-none [&_circle]:outline-none"
      onMouseDown={(e) => e.preventDefault()} // ⬅️ This prevents the click from triggering focus at all
    >
      <ResponsiveContainer width="100%" height="100%" style={{ outline: 'none' }}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAltitude" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e07b39" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#e07b39" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: "#a3b19f" }} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(val) => val.replace("Day ", "D")}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: "#a3b19f" }} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(val) => `${val}m`}
            domain={['dataMin - 500', 'dataMax + 500']}
          />
          <Tooltip 
            cursor={false} 
            contentStyle={{ 
              backgroundColor: "#1c241c", 
              borderRadius: "12px", 
              border: "1px solid #7a8f73", 
              color: "#f0f4f8",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
            }}
            itemStyle={{ color: "#e07b39", fontWeight: "bold" }}
            formatter={(value: any) => [`${value}m`, "Altitude"]}
          />
          <Area 
            type="monotone" 
            dataKey="altitude" 
            stroke="#e07b39" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorAltitude)" 
            activeDot={{ r: 6, fill: "#e07b39", stroke: "#1c241c", strokeWidth: 3 }} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}