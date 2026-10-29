import { login } from "../actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_session")?.value === "authenticated") {
    redirect("/admin");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4">
      <div className="rounded-3xl border border-charcoal/10 bg-white p-8 shadow-sm">
        <h1 className="font-display text-3xl text-center">Admin Login</h1>
        <p className="mt-2 text-center text-sm text-charcoal/60">
          Enter your password to view bookings.
        </p>
        
        <form action={async (formData) => {
          "use server";
          const res = await login(formData);
          if (res?.error) {
            // In a real app you'd use useActionState here, but this keeps it simple
            throw new Error(res.error); 
          }
        }} className="mt-6 space-y-4">
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full rounded-lg border border-charcoal/20 px-4 py-3 focus:border-saffron focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-charcoal py-3 text-sm font-medium text-paper transition hover:bg-saffron hover:text-charcoal"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}