"use client";

import { useActionState } from "react";
import { submitBooking } from "@/app/actions/book";

export function BookingForm({ defaultTrek }: { defaultTrek?: string }) {
  const [state, formAction, isPending] = useActionState(submitBooking, null);

  if (state?.success) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="font-display text-2xl text-green-800">Request Received!</h3>
        <p className="mt-2 text-green-700">
          Thank you. Midhun will review your request and get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {state.error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Full Name *</label>
          <input
            name="name"
            required
            type="text"
            className="w-full rounded-lg border border-charcoal/20 bg-transparent px-4 py-3 focus:border-saffron focus:outline-none"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Email *</label>
          <input
            name="email"
            required
            type="email"
            className="w-full rounded-lg border border-charcoal/20 bg-transparent px-4 py-3 focus:border-saffron focus:outline-none"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">WhatsApp / Phone</label>
          <input
            name="phone"
            type="tel"
            className="w-full rounded-lg border border-charcoal/20 bg-transparent px-4 py-3 focus:border-saffron focus:outline-none"
            placeholder="+1 234 567 890"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Trek *</label>
          <select
            name="trekSlug"
            required
            defaultValue={defaultTrek || ""}
            className="w-full rounded-lg border border-charcoal/20 bg-transparent px-4 py-3 focus:border-saffron focus:outline-none"
          >
            <option value="" disabled>Select a trek</option>
            <option value="everest-base-camp">Everest Base Camp</option>
            <option value="annapurna-circuit">Annapurna Circuit</option>
            <option value="langtang-valley">Langtang Valley</option>
            <option value="custom">Custom / Other</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Approx. Start Date *</label>
          <input
            name="startDate"
            required
            type="date"
            className="w-full rounded-lg border border-charcoal/20 bg-transparent px-4 py-3 focus:border-saffron focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Group Size *</label>
          <input
            name="groupSize"
            required
            type="number"
            min="1"
            max="20"
            defaultValue="1"
            className="w-full rounded-lg border border-charcoal/20 bg-transparent px-4 py-3 focus:border-saffron focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Anything else?</label>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-lg border border-charcoal/20 bg-transparent px-4 py-3 focus:border-saffron focus:outline-none"
          placeholder="Tell me about your fitness level, past trekking experience, or any special requests."
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-charcoal py-4 text-sm font-medium text-paper transition hover:bg-saffron hover:text-charcoal disabled:opacity-50"
      >
        {isPending ? "Sending Request..." : "Send Trek Request"}
      </button>
    </form>
  );
}