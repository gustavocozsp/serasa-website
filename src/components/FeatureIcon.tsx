import type { ReactNode } from 'react'

type IconName = 'zap' | 'shield' | 'crosshair' | 'game' | 'mouse' | 'monitor'

const paths: Record<IconName, ReactNode> = {
  zap: (
    <path
      d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
  ),
  shield: (
    <path
      d="M12 3 4.5 6.5v5.2c0 4.4 3.1 8.4 7.5 9.3 4.4-.9 7.5-4.9 7.5-9.3V6.5L12 3z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
  ),
  crosshair: (
    <>
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 5v2.5M12 16.5V19M5 12h2.5M16.5 12H19" stroke="currentColor" strokeWidth="1.75" />
    </>
  ),
  game: (
    <path
      d="M6.5 9.5h11a3.5 3.5 0 0 1 3.4 4.3l-1.1 4.2A3 3 0 0 1 16.9 20H7.1a3 3 0 0 1-2.9-2.2l-1.1-4.2A3.5 3.5 0 0 1 6.5 9.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    />
  ),
  mouse: (
    <>
      <rect x="8" y="3" width="8" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 3v5" stroke="currentColor" strokeWidth="1.75" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.75" />
    </>
  ),
}

export function FeatureIcon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      {paths[name]}
    </svg>
  )
}
