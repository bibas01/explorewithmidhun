export function Marquee() {
  const text = "EVEREST • ANNAPURNA • LANGTANG • MANASLU • MUSTANG • DOLPO • ";

  return (
    <div className="relative flex overflow-hidden bg-charcoal py-6 sm:py-8 border-y border-white/10">
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="mx-4 text-2xl sm:text-4xl font-display text-paper/40 tracking-widest uppercase">
          {text}
        </span>
        <span className="mx-4 text-2xl sm:text-4xl font-display text-paper/40 tracking-widest uppercase">
          {text}
        </span>
        <span className="mx-4 text-2xl sm:text-4xl font-display text-paper/40 tracking-widest uppercase">
          {text}
        </span>
        <span className="mx-4 text-2xl sm:text-4xl font-display text-paper/40 tracking-widest uppercase">
          {text}
        </span>
      </div>
    </div>
  );
}