import { BookingForm } from "@/components/booking-form";
import { MountainDivider } from "@/components/mountain-divider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan Your Trek",
  description: "Get in touch to plan your private trek in Nepal.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ trek?: string }>;
}) {
  // Await the searchParams (Next.js 15 requirement)
  const { trek } = await searchParams;

  return (
    <div className="bg-paper min-h-screen flex flex-col">
      {/* Main Content Container */}
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 flex-grow">
        <div className="grid gap-12 lg:grid-cols-2">
          
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-saffron">Get in touch</p>
            <h1 className="mt-2 font-display text-5xl">Let's plan your trek.</h1>
            <p className="mt-6 text-lg text-charcoal/70">
              Fill out the form and I'll get back to you within 24 hours with 
              availability, a detailed itinerary, and pricing. 
            </p>
            
            <div className="mt-10 space-y-6">
              <div>
                <p className="text-sm font-medium text-charcoal">Email</p>
                <a href="mailto:thapaanjan5@gmail.com" className="text-charcoal/60 hover:text-saffron">
                  thapaanjan5@gmail.com
                </a>
              </div>
              <div>
                <p className="text-sm font-medium text-charcoal">WhatsApp</p>
                <p className="text-charcoal/60">+977 9818560300</p>
              </div>
              <div>
                <p className="text-sm font-medium text-charcoal">Based in</p>
                <p className="text-charcoal/60">Kathmandu, Nepal</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-charcoal/10 sm:p-8">
            <BookingForm defaultTrek={trek} />
          </div>

        </div>
      </div>

      {/* Divider: Full width, outside the max-w-6xl container */}
      <div className="bg-paper w-full mt-24">
        <MountainDivider flip={true} />
      </div>
    </div>
  );
}