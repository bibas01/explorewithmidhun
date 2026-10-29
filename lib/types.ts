export type Region = "Everest" | "Annapurna" | "Langtang" | "Manaslu" | "Dolpo";

export type Difficulty = "Moderate" | "Challenging" | "Strenuous";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  altitude: number; // metres
  hours?: string;
}

export interface Trek {
  slug: string;
  title: string;
  region: Region;
  difficulty: Difficulty;
  days: number;
  maxAltitude: number;
  season: string;
  summary: string;
  heroImage: string;
  gallery: string[];
  priceUSD: number;
  priceNote: string;
  permits: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  gearList: string[];
  featured: boolean;
}