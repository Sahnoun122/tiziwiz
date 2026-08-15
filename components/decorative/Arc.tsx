type ArcProps = {
  size?: number
  strokeWidth?: number
  dashed?: boolean
  /** Portion of the circle to draw, in degrees (e.g. 90 = quarter circle). */
  arcDegrees?: number
  /** Rotates the whole arc around the circle, in degrees. */
  rotation?: number
  className?: string
}

export function Arc({
  size = 48,
  strokeWidth = 2,
  dashed = false,
  arcDegrees = 90,
  rotation = 0,
  className,
}: ArcProps) {
  const arcLength = (arcDegrees / 360) * 100

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={dashed ? `${arcLength / 6} ${arcLength / 12}` : `${arcLength} ${100 - arcLength}`}
      />
    </svg>
  )
}
