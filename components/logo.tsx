import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  size?: number;
  className?: string;
};

export default function Logo({ size = 56, className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Explore with Midhun — Home"
      className={`inline-flex items-center transition-opacity hover:opacity-90 ${className}`}
    >
      <Image
        src="/logo.png" 
        alt="Explore with Midhun"
        width={size}
        height={size}
        priority
        className="rounded-full object-contain"
      />
    </Link>
  );
}