"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

type BlurRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
}

export function BlurReveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  once = true,
}: BlurRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  const variants: Variants = {
    hidden: {
      opacity: 0,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(12px)",
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.01 : duration, delay, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
