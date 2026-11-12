export function MountainDivider({ className = "", flip = false }: { className?: string, flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${className}`}>
      <svg
        className={`relative block w-full h-[80px] sm:h-[150px] ${flip ? "rotate-180" : ""}`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Single, elegant silhouette matching the paper color */}
        <path
          d="M0,120 L0,80 L180,40 L320,90 L500,20 L680,100 Q800,120 900,80 L1100,30 L1250,90 Q1350,110 1440,70 L1440,120 Z"
          fill="#f0f4f8" // Matches the paper background
        />
      </svg>
    </div>
  );
}