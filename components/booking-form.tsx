"use client";

import { useActionState } from "react";
import { submitBooking } from "@/app/actions/book";

export function BookingForm({ defaultTrek }: { defaultTrek?: string }) {
  const [state, formAction, isPending] = useActionState(submitBooking, null);

  if (state?.success) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-900/20 p-8 text-center shadow-xl">
        <h3 className="font-display text-3xl text-emerald-400">Request Received!</h3>
        <p className="mt-4 text-emerald-100/80">
          Thank you. Midhun will review your request and get back to you within 24 hours.
        </p>
      </div>
    );
  }

  // Reusable input styling for the dark theme
  const inputClass = "w-full rounded-xl border border-stone/50 bg-charcoal px-4 py-3 text-paper placeholder:text-paper-dim/50 focus:border-saffron focus:outline-none transition-colors";
  const labelClass = "mb-2 block text-sm font-bold text-paper";

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="rounded-xl bg-red-900/20 border border-red-500/30 p-4 text-sm text-red-400">
          {state.error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input
            name="name"
            required
            type="text"
            className={inputClass}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input
            name="email"
            required
            type="email"
            className={inputClass}
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass}>WhatsApp / Phone</label>
          <input
            name="phone"
            type="tel"
            className={inputClass}
            placeholder="+1 234 567 890"
          />
        </div>
        <div>
          <label className={labelClass}>Trek *</label>
          <select
            name="trekSlug"
            required
            defaultValue={defaultTrek || ""}
            className={`${inputClass} appearance-none`}
          >
            <option value="" disabled className="bg-charcoal text-paper-dim">Select a trek</option>
            <option value="everest-base-camp" className="bg-charcoal text-paper">Everest Base Camp</option>
            <option value="annapurna-circuit" className="bg-charcoal text-paper">Annapurna Circuit</option>
            <option value="langtang-valley" className="bg-charcoal text-paper">Langtang Valley</option>
            <option value="custom" className="bg-charcoal text-paper">Custom / Other</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Approx. Start Date *</label>
          <input
            name="startDate"
            required
            type="date"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Group Size *</label>
          <input
            name="groupSize"
            required
            type="number"
            min="1"
            max="20"
            defaultValue="1"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Anything else?</label>
        <textarea
          name="message"
          rows={4}
          className={inputClass}
          placeholder="Tell me about your fitness level, past trekking experience, or any special requests."
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-saffron py-4 text-sm font-bold uppercase tracking-wider text-charcoal transition hover:bg-paper hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 shadow-xl"
      >
        {isPending ? "Sending Request..." : "Send Trek Request"}
      </button>
    </form>
  );
}