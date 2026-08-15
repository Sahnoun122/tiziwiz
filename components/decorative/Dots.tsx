export function Dots({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <circle cx="4" cy="24" r="3" />
      <circle cx="16" cy="14" r="2.2" opacity={0.7} />
      <circle cx="24" cy="5" r="1.5" opacity={0.45} />
    </svg>
  )
}
