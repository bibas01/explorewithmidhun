import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout, updateStatus } from "./actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

// Force this page to always fetch fresh data
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
    return <div className="p-8 text-red-500">Error loading bookings: {error.message}</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl">Booking Requests</h1>
          <p className="mt-1 text-charcoal/60">Manage your incoming treks.</p>
        </div>
        <form action={logout}>
          <button className="rounded-full border border-charcoal/20 px-6 py-2 text-sm hover:bg-charcoal hover:text-paper transition">
            Log Out
          </button>
        </form>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-charcoal/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper text-charcoal/60">
            <tr>
              <th className="px-6 py-4 font-medium">Date Requested</th>
              <th className="px-6 py-4 font-medium">Client</th>
              <th className="px-6 py-4 font-medium">Trek</th>
              <th className="px-6 py-4 font-medium">Start Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/5">
            {bookings?.map((booking) => (
              <tr key={booking.id} className="hover:bg-paper/50">
                <td className="px-6 py-4 text-charcoal/60">
                  {new Date(booking.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium">{booking.name}</p>
                  <p className="text-xs text-charcoal/50">{booking.email}</p>
                  <p className="text-xs text-charcoal/50">{booking.phone || "No phone"}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium">{booking.trek_slug}</p>
                  <p className="text-xs text-charcoal/50">Group of {booking.group_size}</p>
                  {booking.message && (
                    <p className="mt-2 text-xs italic text-charcoal/60 max-w-xs">"{booking.message}"</p>
                  )}
                </td>
                <td className="px-6 py-4">
                  {new Date(booking.start_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
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
                    <button className="text-saffron hover:underline text-sm font-medium">
                      Mark as {booking.status === "pending" ? "Confirmed" : 
                               booking.status === "confirmed" ? "Completed" : "Pending"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {bookings?.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-charcoal/50">
                  No booking requests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}