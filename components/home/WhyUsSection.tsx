import { useTranslations } from "next-intl"
import { FadeUp } from "@/components/motion"
import { Arc } from "@/components/decorative/Arc"
import { Dots } from "@/components/decorative/Dots"
import { iconMap } from "@/lib/icon-map"

type WhyUsItem = { icon: string; title: string; description: string }

export function WhyUsSection() {
  const t = useTranslations("home.whyUs")
  const tRoot = useTranslations()
  const whyUs = tRoot.raw("whyUsItems") as WhyUsItem[]

  return (
    <section className="bg-surface-dark py-24 text-ink-inverse sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-ink-inverse-muted">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-ink-inverse-muted">{t("subtitle")}</p>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 text-center sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, index) => {
            const Icon = iconMap[item.icon]
            return (
              <FadeUp key={item.title} delay={index * 0.06} className="flex flex-col items-center">
                <div className="relative flex h-20 w-20 items-center justify-center">
                  <Arc
                    size={80}
                    dashed
                    rotation={index * 60}
                    className="absolute inset-0 text-white/20"
                  />
                  {index % 2 === 0 && (
                    <Dots size={20} className="absolute -end-2 -top-2 text-white/25" />
                  )}
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
                    {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-inverse-muted">
                  {item.description}
                </p>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
