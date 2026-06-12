interface VerdanaLogoProps {
  className?: string
  size?: number
}

export function VerdanaLogo({ className, size = 40 }: VerdanaLogoProps) {
  return (
    <div
      className={className}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="12" fill="url(#logo-gradient)" />
        <path
          d="M20 10C14 10 11 16 11 20.5C11 26 14.5 30 20 30C25.5 30 29 26 29 20.5C29 16 26 10 20 10Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 14V26M16 18C16 18 17.5 16 20 16C22.5 16 24 18 24 18M16 23C16 23 17.5 25 20 25C22.5 25 24 23 24 23"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="logo-gradient" x1="8" y1="4" x2="32" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1B4332" />
            <stop offset="1" stopColor="#40916C" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
