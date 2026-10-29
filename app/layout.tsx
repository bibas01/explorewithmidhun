import type { Metadata } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"), // ← replace with real domain
  title: {
    default: "ExploreWithMidhun — Freelance Trekking Guide in Nepal",
    template: "%s · ExploreWithMidhun",
  },
  description:
    "Licensed freelance trekking guide based in Kathmandu. Private, small-group treks in the Everest, Annapurna and Langtang regions.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ExploreWithMidhun",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrument.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}