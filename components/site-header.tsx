import Link from "next/link";
import Logo from "@/components/Logo"; // 1. Import the Logo component

const nav = [
  { href: "/treks", label: "Treks" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        
        {/* 2. Replace the old text Link with the Logo component */}
        {/* Size 48 fits perfectly inside your h-16 (64px) header */}
        <Logo size={48} />

        <nav className="hidden items-center gap-8 text-sm sm:flex">
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

        <Link
          href="/contact"
          className="rounded-full bg-charcoal px-4 py-2 text-sm text-paper transition hover:bg-saffron hover:text-charcoal"
        >
          Plan a trek
        </Link>
      </div>
    </header>
  );
}