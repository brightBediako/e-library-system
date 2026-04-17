/**
 * Subtle editorial backdrop for app shell areas — purely decorative (no layout impact).
 */
export function DecorativeBackdrop() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full min-h-[320px] w-full overflow-visible text-primary/[0.06]"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="app-shell-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
        <linearGradient id="app-shell-fade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
          <stop offset="55%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#app-shell-fade)" />
      <rect x="-10%" y="0" width="120%" height="70%" fill="url(#app-shell-grid)" />
    </svg>
  );
}
