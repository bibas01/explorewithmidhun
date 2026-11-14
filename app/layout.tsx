import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google"; // ⬅️ Swapped import
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

// ⬇️ Configure Cormorant Garamond
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "ExploreWithMidhun — Freelance Trekking Guide",
    template: "%s · ExploreWithMidhun",
  },
  description: "Licensed freelance trekking guide based in Kathmandu.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ⬇️ Add the new variable to the HTML tag
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}>
      <head>
        {/* 🚨 Preload the map for faster LCP */}
        <link 
          rel="preload" 
          href="/nepal-map.svg" 
          as="image" 
          type="image/svg+xml" 
          fetchPriority="high"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-charcoal text-paper overflow-x-hidden">
        <SmoothScroll>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}