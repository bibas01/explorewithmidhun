import { BookingForm } from "@/components/booking-form";
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
  const { trek } = await searchParams;

  return (
    <div className="min-h-screen bg-charcoal flex flex-col">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 flex-grow">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          
          {/* Left Side - Contact Info */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-saffron font-bold mb-2">Get in touch</p>
            <h1 className="mt-2 font-display text-5xl sm:text-6xl text-paper">Let's plan your trek.</h1>
            <p className="mt-6 text-lg text-paper-dim max-w-md leading-relaxed">
              Fill out the form and I'll get back to you within 24 hours with 
              availability, a detailed itinerary, and pricing. 
            </p>
            
            <div className="mt-10 space-y-6">
              <div>
                <p className="text-sm font-bold text-paper">Email</p>
                <a href="mailto:thapaanjan5@gmail.com" className="text-paper-dim hover:text-saffron transition-colors">
                  thapaanjan5@gmail.com
                </a>
              </div>
              <div>
                <p className="text-sm font-bold text-paper">WhatsApp</p>
                <p className="text-paper-dim">+977 9818560300</p>
              </div>
              <div>
                <p className="text-sm font-bold text-paper">Based in</p>
                <p className="text-paper-dim">Kathmandu, Nepal</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form Card */}
          {/* Notice the background is now bg-charcoal-soft (dark green) */}
          <div className="rounded-3xl bg-charcoal-soft p-6 shadow-2xl border border-stone/30 sm:p-8">
            <BookingForm defaultTrek={trek} />
          </div>

        </div>
      </div>
    </div>
  );
}