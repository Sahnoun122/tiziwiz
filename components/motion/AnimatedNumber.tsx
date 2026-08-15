"use client"

import { animate, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

type AnimatedNumberProps = {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return

    if (shouldReduceMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing to the reduced-motion media query, not derivable during render
      setDisplay(value)
      return
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })

    return () => controls.stop()
  }, [isInView, value, duration, shouldReduceMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("fr-MA")}
      {suffix}
    </span>
  )
}
