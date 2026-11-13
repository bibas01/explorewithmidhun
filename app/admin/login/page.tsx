import { login } from "../actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_session")?.value === "authenticated") {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-[80vh] flex-col justify-center bg-charcoal px-4">
      <div className="mx-auto w-full max-w-sm rounded-3xl border border-stone/30 bg-charcoal-soft p-8 shadow-2xl">
        <h1 className="text-center font-display text-3xl text-paper">Admin Login</h1>
        <p className="mt-2 text-center text-sm text-paper-dim">
          Enter your password to view bookings.
        </p>
        
        <form action={async (formData) => {
          "use server";
          const res = await login(formData);
          if (res?.error) {
            throw new Error(res.error); 
          }
        }} className="mt-6 space-y-4">
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full rounded-xl border border-stone/50 bg-charcoal px-4 py-3 text-paper placeholder:text-paper-dim/50 focus:border-saffron focus:outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-saffron py-3 text-sm font-bold text-charcoal transition hover:bg-paper hover:text-charcoal shadow-lg"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}