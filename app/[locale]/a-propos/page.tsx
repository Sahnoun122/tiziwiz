import type { Metadata } from "next"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { FadeUp, BlurReveal, AnimatedNumber } from "@/components/motion"
import { Breadcrumb } from "@/components/seo/Breadcrumb"
import { iconMap } from "@/lib/icon-map"
import { buildAlternates } from "@/lib/seo"
import type { Locale } from "@/i18n/routing"

type Props = { params: Promise<{ locale: Locale }> }
type WhyUsItem = { icon: string; title: string; description: string }
type StatItem = { value: number; suffix: string; label: string }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "about" })

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/a-propos"),
  }
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("about")
  const tRoot = await getTranslations()
  const whyUs = tRoot.raw("whyUsItems") as WhyUsItem[]
  const stats = tRoot.raw("statsItems") as StatItem[]
  const neighborhoods = t.raw("neighborhoods") as string[]

  return (
    <>
      <section className="border-b border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ name: t("title"), path: "/a-propos" }]} />
          <FadeUp className="mt-8 max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t("intro")}</p>
          </FadeUp>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <BlurReveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] bg-surface-muted shadow-xl shadow-ink/10">
              <Image
                src="/images/coursier-livreur-agadir-maroc-v2.jpg"
                alt={t("missionImageAlt")}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </BlurReveal>
          <FadeUp delay={0.1}>
            <span className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
              {t("missionEyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {t("missionTitle")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">
              {t("missionParagraph1")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              {t("missionParagraph2")}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="bg-surface-dark py-24 text-ink-inverse sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-ink-inverse-muted">
              {t("valuesEyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("valuesTitle")}
            </h2>
          </FadeUp>

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] bg-border-dark sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((item, index) => {
              const Icon = iconMap[item.icon]
              return (
                <FadeUp key={item.title} delay={index * 0.06} className="bg-surface-dark p-8">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                    {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-inverse-muted">
                    {item.description}
                  </p>
                </FadeUp>
              )
            })}
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-border-dark pt-10 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </dd>
                <p className="mt-1 text-sm text-ink-inverse-muted">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <FadeUp>
            <span className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
              {t("areaEyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {t("areaTitle")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">{t("areaText")}</p>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {neighborhoods.map((neighborhood) => (
                <li key={neighborhood} className="flex items-center gap-2 text-sm text-ink-muted">
                  <MapPin className="h-4 w-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                  {neighborhood}
                </li>
              ))}
            </ul>
          </FadeUp>
          <BlurReveal delay={0.1}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] bg-surface-muted shadow-xl shadow-ink/10">
              <Image
                src="/images/front-de-mer-plage-agadir.jpg"
                alt={t("areaImageAlt")}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </BlurReveal>
        </div>
      </section>
    </>
  )
}
