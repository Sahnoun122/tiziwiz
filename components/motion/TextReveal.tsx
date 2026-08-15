"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"

type TextRevealProps = {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  as?: "h1" | "h2" | "h3" | "p" | "span"
}

const container: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.045, delayChildren: delay },
  }),
}

const word: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  as = "span",
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const words = text.split(" ")
  const Component = motion[as]

  if (shouldReduceMotion) {
    const Static = as
    return <Static className={className}>{text}</Static>
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={container}
      custom={delay}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom" aria-hidden="true">
          <motion.span variants={word} className={`inline-block ${wordClassName ?? ""}`}>
            {w}
            {i !== words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Component>
  )
}
