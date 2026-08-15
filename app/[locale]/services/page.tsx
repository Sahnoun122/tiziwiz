import type { Metadata } from "next"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { FadeUp } from "@/components/motion"
import { Breadcrumb } from "@/components/seo/Breadcrumb"
import { iconMap } from "@/lib/icon-map"
import { services } from "@/lib/site-config"
import { buildAlternates } from "@/lib/seo"
import type { Locale } from "@/i18n/routing"

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "servicesPage" })

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/services"),
  }
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("servicesPage")
  const tServices = await getTranslations("services")
  const tCommon = await getTranslations("common")

  return (
    <>
      <section className="border-b border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ name: t("title"), path: "/services" }]} />
          <FadeUp className="mt-8 max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t("subtitle")}</p>
          </FadeUp>
        </div>
      </section>

      <section className="bg-surface-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon]
              return (
                <FadeUp key={service.slug} delay={index * 0.06}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-muted">
                      <Image
                        src={service.image}
                        alt={tServices(`${service.slug}.description`)}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface-muted text-ink">
                        {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                      </span>
                      <h2 className="mt-4 text-lg font-semibold text-ink">
                        {tServices(`${service.slug}.title`)}
                      </h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                        {tServices(`${service.slug}.description`)}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors group-hover:text-[var(--color-accent)]">
                        {tCommon("discoverService")}
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
