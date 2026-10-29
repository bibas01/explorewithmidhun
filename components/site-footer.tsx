import Link from "next/link";
import Logo from "@/components/Logo"; // 1. Import the Logo

const nav = [
  { href: "/treks", label: "Treks" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-charcoal/10 bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6">
        
        {/* 2. The Logo (Size 56 is slightly larger for the footer) */}
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <Logo size={56} />
          <p className="text-xs text-charcoal/60">
            © {new Date().getFullYear()} Explore With Midhun. All rights reserved.
          </p>
        </div>

        {/* 3. Keep your navigation links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-charcoal/70 transition hover:text-charcoal"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Optional: Keep a social link or back-to-top button here */}
        <Link
          href="/contact"
          className="text-sm font-medium text-saffron transition hover:text-charcoal"
        >
          Get in touch &rarr;
        </Link>

      </div>
    </footer>
  );
}