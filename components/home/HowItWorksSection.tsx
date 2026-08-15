"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTranslations } from "next-intl"
import { FadeUp } from "@/components/motion"
import { iconMap } from "@/lib/icon-map"

type Step = { step: string; icon: string; title: string; description: string }

export function HowItWorksSection() {
  const t = useTranslations("home.howItWorks")
  const tRoot = useTranslations()
  const howItWorks = tRoot.raw("howItWorksSteps") as Step[]
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const lineVerticalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const targets = [lineRef.current, lineVerticalRef.current].filter(Boolean)
      if (targets.length === 0) return

      gsap.set(targets, { scaleX: 0, scaleY: 0 })
      gsap.to(targets, {
        scaleX: 1,
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "bottom 70%",
          scrub: 0.4,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-surface py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-ink-muted">{t("subtitle")}</p>
        </FadeUp>

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute top-6 start-6 hidden h-[calc(100%-3rem)] w-px bg-border lg:hidden sm:block"
          >
            <div
              ref={lineVerticalRef}
              className="h-full w-full origin-top bg-[var(--color-accent)]"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute top-6 start-[12.5%] hidden h-px w-[75%] bg-border lg:block"
          >
            <div
              ref={lineRef}
              className="h-full w-full origin-left rtl:origin-right bg-[var(--color-accent)]"
            />
          </div>

          <ol className="relative grid grid-cols-1 gap-10 sm:ps-16 lg:grid-cols-4 lg:gap-8 lg:ps-0">
            {howItWorks.map((step, index) => {
              const Icon = iconMap[step.icon]
              return (
                <FadeUp key={step.step} delay={index * 0.1}>
                  <li className="relative">
                    <span className="absolute top-0 start-[-4rem] flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-ink shadow-sm lg:static lg:start-0 lg:mb-5">
                      {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                    </span>
                    <div className="lg:mt-0">
                      <span className="text-xs font-semibold text-ink-subtle">{step.step}</span>
                      <h3 className="mt-1 text-lg font-semibold text-ink">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                        {step.description}
                      </p>
                    </div>
                  </li>
                </FadeUp>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
