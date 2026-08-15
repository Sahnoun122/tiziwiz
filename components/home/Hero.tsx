"use client"

import Image from "next/image"
import { MessageCircle, PhoneCall, Sparkle, Zap } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { TextReveal, FadeUp, MagneticButton, AnimatedNumber } from "@/components/motion"
import { Arc } from "@/components/decorative/Arc"
import { Dots } from "@/components/decorative/Dots"
import { iconMap } from "@/lib/icon-map"
import { siteConfig } from "@/lib/site-config"

type WhyUsItem = { icon: string; title: string; description: string }

// Hero highlights 3 of the 6 "why us" attributes (already written and
// translated) rather than inventing new copy for this compact list.
const HERO_HIGHLIGHT_INDEXES = [0, 2, 4]

export function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const t = useTranslations("home.hero")
  const tRoot = useTranslations()
  const whyUs = tRoot.raw("whyUsItems") as WhyUsItem[]
  const highlights = HERO_HIGHLIGHT_INDEXES.map((i) => whyUs[i]).filter(Boolean)

  return (
    <section className="relative overflow-hidden bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 end-0 h-[36rem] w-[36rem] rounded-full bg-[var(--color-accent)]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 start-[-10rem] h-[28rem] w-[28rem] rounded-full bg-ink/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 xl:grid-cols-[1.05fr_0.75fr_0.5fr]">
          <div>
            <FadeUp>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                <Zap className="h-3.5 w-3.5 text-[var(--color-accent)]" aria-hidden="true" />
                {t("badge")}
              </span>
            </FadeUp>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl">
              <TextReveal text={t("title")} as="span" delay={0.1} />
            </h1>

            <FadeUp delay={0.35}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{t("subtitle")}</p>
            </FadeUp>

            <FadeUp delay={0.45}>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink-subtle">
                <Sparkle className="h-4 w-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                {t("trustLine")}
              </p>
            </FadeUp>

            <FadeUp delay={0.5}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <MagneticButton>
                  <a
                    href={siteConfig.links.order(tRoot("whatsappMessage"))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-base font-semibold text-[var(--color-accent-foreground)] shadow-[0_8px_30px_-8px_rgba(0,0,0,0.35)] transition-colors hover:bg-[var(--color-accent-hover)]"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    {t("orderCta")}
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-surface-muted"
                  >
                    <PhoneCall className="h-5 w-5" aria-hidden="true" />
                    {t("contactCta")}
                  </Link>
                </MagneticButton>
              </div>
            </FadeUp>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            <Arc
              size={140}
              dashed
              rotation={-20}
              className="absolute -top-6 -start-6 text-ink-subtle/50"
            />
            <Arc size={90} rotation={140} className="absolute -bottom-4 end-4 text-border" />
            <Dots size={30} className="absolute top-1/4 -end-4 text-ink-subtle/60" />

            <div className="relative aspect-square w-full overflow-hidden rounded-full bg-surface-muted shadow-2xl shadow-ink/10">
              <Image
                src="/images/livraison-agadir-scooter-rapide-v2.jpg"
                alt={t("imageAlt")}
                fill
                priority
                sizes="(min-width: 1024px) 32vw, 80vw"
                className="object-cover"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-2 start-[-1.5rem] hidden rounded-2xl border border-border bg-surface/95 p-5 shadow-xl backdrop-blur sm:block"
            >
              <p className="text-2xl font-semibold text-ink">
                <AnimatedNumber value={30} suffix={t("floatingStatSuffix")} />
              </p>
              <p className="mt-0.5 text-sm text-ink-subtle">{t("floatingStatLabel")}</p>
            </motion.div>
          </motion.div>

          <FadeUp delay={0.65} className="hidden xl:block">
            <ul className="flex flex-col gap-10">
              {highlights.map((item) => {
                const Icon = iconMap[item.icon]
                return (
                  <li key={item.title}>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted text-ink">
                      {Icon && <Icon className="h-4.5 w-4.5" aria-hidden="true" />}
                    </span>
                    <p className="mt-3 text-sm font-semibold text-ink">{item.title}</p>
                    <p className="mt-0.5 text-sm text-ink-subtle">{item.description}</p>
                  </li>
                )
              })}
            </ul>
          </FadeUp>
        </div>

        <FadeUp delay={0.65} className="xl:hidden">
          <ul className="mt-16 grid grid-cols-1 gap-6 border-t border-border pt-10 sm:grid-cols-3">
            {highlights.map((item) => {
              const Icon = iconMap[item.icon]
              return (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-muted text-ink">
                    {Icon && <Icon className="h-4.5 w-4.5" aria-hidden="true" />}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <p className="mt-0.5 text-sm text-ink-subtle">{item.description}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </FadeUp>
      </div>
    </section>
  )
}
