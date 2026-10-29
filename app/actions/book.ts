"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { z } from "zod";

console.log("URL in use:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Key length:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length);
console.log("Key starts with:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 15));

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  trekSlug: z.string().min(1, "Please select a trek"),
  startDate: z.string().min(1, "Please select a date"),
  groupSize: z.coerce.number().min(1).max(20),
  message: z.string().optional(),
});

export async function submitBooking(prevState: any, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validated = bookingSchema.safeParse(rawData);

  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const data = validated.data;

  // 1. Save to Supabase
  const { error: dbError } = await supabase.from("bookings").insert({
    name: data.name,
    email: data.email,
    phone: data.phone,
    trek_slug: data.trekSlug,
    start_date: data.startDate,
    group_size: data.groupSize,
    message: data.message,
  });

  if (dbError) {
    console.error("Database error:", dbError);
    return { error: "Failed to save booking. Please try again." };
  }

  // 2. Send email via Resend
  try {
    await resend.emails.send({
      from: "ExploreWithMidhun <onboarding@resend.dev>", // Change this once you verify a domain on Resend
      to: process.env.CONTACT_EMAIL!,
      subject: `New Trek Request: ${data.trekSlug}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
        <p><strong>Trek:</strong> ${data.trekSlug}</p>
        <p><strong>Start Date:</strong> ${data.startDate}</p>
        <p><strong>Group Size:</strong> ${data.groupSize}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message || "No message provided."}</p>
      `,
    });
  } catch (emailError) {
    console.error("Email error:", emailError);
    // We don't fail the request if email fails, because it's saved in DB
  }

  return { success: true };
}