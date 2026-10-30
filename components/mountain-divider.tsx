export function MountainDivider({ className = "", flip = false }: { className?: string, flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${className}`}>
      <svg
        className="relative block w-full h-[120px] sm:h-[200px]"
        viewBox="0 0 1200 220"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {!flip ? (
          <>
            {/* TOP VERSION: Dark mountains blending into light background */}
            <path
              d="M0 180 L90 130 L145 150 L230 75 L275 112 L345 35 L405 105 L455 80 L520 135 L590 55 L650 110 L720 25 L785 100 L835 65 L900 125 L970 45 L1035 105 L1090 80 L1150 130 L1200 100 L1200 220 L0 220 Z"
              fill="#486581"
            />
            {/* Snow caps */}
            <path
              d="M315 68 L345 35 L374 70 L355 63 L345 72 L334 62 Z M568 80 L590 55 L614 83 L600 77 L591 84 L583 76 Z M694 59 L720 25 L749 61 L733 52 L720 60 L710 51 Z M948 69 L970 45 L993 71 L979 64 L969 72 L960 64 Z"
              fill="#f0f4f8"
            />
            <path
              d="M0 195 L100 160 L175 180 L260 125 L330 165 L415 115 L490 170 L575 125 L660 175 L745 115 L820 160 L910 110 L990 165 L1080 125 L1150 160 L1200 145 L1200 220 L0 220 Z"
              fill="#243b53"
            />
            <path
              d="M0 210 L120 185 L210 200 L310 165 L400 200 L500 175 L600 205 L710 165 L805 200 L920 170 L1010 200 L1110 175 L1200 195 L1200 220 L0 220 Z"
              fill="#102a43"
            />
          </>
        ) : (
          <>
            {/* BOTTOM VERSION: Light mountains blending into dark footer */}
            <path
              d="M0 180 L90 130 L145 150 L230 75 L275 112 L345 35 L405 105 L455 80 L520 135 L590 55 L650 110 L720 25 L785 100 L835 65 L900 125 L970 45 L1035 105 L1090 80 L1150 130 L1200 100 L1200 220 L0 220 Z"
              fill="#d9e2ec"
            />
            <path
              d="M0 195 L100 160 L175 180 L260 125 L330 165 L415 115 L490 170 L575 125 L660 175 L745 115 L820 160 L910 110 L990 165 L1080 125 L1150 160 L1200 145 L1200 220 L0 220 Z"
              fill="#486581"
            />
            <path
              d="M0 210 L120 185 L210 200 L310 165 L400 200 L500 175 L600 205 L710 165 L805 200 L920 170 L1010 200 L1110 175 L1200 195 L1200 220 L0 220 Z"
              fill="#102a43"
            />
          </>
        )}
      </svg>
    </div>
  );
}