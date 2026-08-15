import Image from "next/image"
import { useTranslations } from "next-intl"
import { FadeUp, AnimatedNumber } from "@/components/motion"
import { iconMap } from "@/lib/icon-map"

type StatItem = { value: number; suffix: string; label: string }
type Callout = { icon: string; title: string; description: string }

export function StatsSection() {
  const t = useTranslations("home.stats")
  const tRoot = useTranslations()
  const stats = tRoot.raw("statsItems") as StatItem[]
  const callouts = tRoot.raw("home.statsCallouts") as Callout[]

  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-28">
      <Image
        src="/images/entrepot-logistique-livraison-agadir.jpg"
        alt={t("imageAlt")}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/80" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-ink-inverse-muted">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {t("title")}
          </h2>
        </FadeUp>

        <dl className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <FadeUp key={stat.label} delay={index * 0.08} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </dd>
              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
            </FadeUp>
          ))}
        </dl>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-6 border-t border-white/10 pt-10 sm:grid-cols-2">
          {callouts.map((callout, index) => {
            const Icon = iconMap[callout.icon]
            return (
              <FadeUp key={callout.title} delay={index * 0.08} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                  {Icon && <Icon className="h-4.5 w-4.5" aria-hidden="true" />}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{callout.title}</p>
                  <p className="mt-0.5 text-sm text-white/60">{callout.description}</p>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
