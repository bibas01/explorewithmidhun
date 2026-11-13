import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout, updateStatus } from "./actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_session")?.value !== "authenticated") {
    redirect("/admin/login");
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: bookings, error } = await supabaseAdmin
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-charcoal text-red-400">
        Error loading bookings: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone/20 pb-6">
          <div>
            <h1 className="font-display text-4xl text-paper">Booking Requests</h1>
            <p className="mt-1 text-paper-dim">Manage your incoming treks.</p>
          </div>
          <form action={logout}>
            <button className="rounded-full border border-stone/30 px-6 py-2 text-sm font-medium text-paper transition hover:bg-stone/20 hover:text-saffron">
              Log Out
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="mt-8 overflow-x-auto rounded-2xl border border-stone/20 bg-charcoal-soft shadow-xl">
          <table className="w-full text-left text-sm text-paper">
            <thead className="bg-charcoal/50 text-paper-dim border-b border-stone/20">
              <tr>
                <th className="px-6 py-4 font-medium">Date Requested</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Trek</th>
                <th className="px-6 py-4 font-medium">Start Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone/20">
              {bookings?.map((booking) => (
                <tr key={booking.id} className="hover:bg-charcoal/30 transition-colors">
                  <td className="px-6 py-4 text-paper-dim">
                    {new Date(booking.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-paper">{booking.name}</p>
                    <p className="text-xs text-paper-dim">{booking.email}</p>
                    <p className="text-xs text-paper-dim">{booking.phone || "No phone"}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-saffron">{booking.trek_slug}</p>
                    <p className="text-xs text-paper-dim">Group of {booking.group_size}</p>
                    {booking.message && (
                      <p className="mt-2 text-xs italic text-paper-dim/70 max-w-xs">"{booking.message}"</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-paper">
                    {new Date(booking.start_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                      booking.status === 'pending' ? 'bg-amber-900/30 text-amber-500 border border-amber-500/20' :
                      booking.status === 'confirmed' ? 'bg-emerald-900/30 text-emerald-500 border border-emerald-500/20' :
                      'bg-stone/20 text-stone border border-stone/30'
                    }`}>
                      {booking.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <form action={async () => {
                      "use server";
                      const newStatus = booking.status === "pending" ? "confirmed" : 
                                        booking.status === "confirmed" ? "completed" : "pending";
                      await updateStatus(booking.id, newStatus);
                    }}>
                      <button className="text-sm font-medium text-paper hover:text-saffron transition-colors underline-offset-2 hover:underline">
                        Mark as {booking.status === "pending" ? "Confirmed" : 
                                 booking.status === "confirmed" ? "Completed" : "Pending"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {bookings?.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-paper-dim">
                    No booking requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}