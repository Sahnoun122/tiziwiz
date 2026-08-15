import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowUpRight, Check, MessageCircle } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { FadeUp, MagneticButton } from "@/components/motion"
import { Breadcrumb } from "@/components/seo/Breadcrumb"
import { JsonLd } from "@/components/seo/JsonLd"
import { iconMap } from "@/lib/icon-map"
import { serviceSchema } from "@/lib/schema"
import { buildAlternates } from "@/lib/seo"
import { services, siteConfig, type ServiceSlug } from "@/lib/site-config"
import { routing, type Locale } from "@/i18n/routing"

type PageProps = {
  params: Promise<{ locale: Locale; slug: ServiceSlug }>
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((service) => ({ locale, slug: service.slug })),
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}

  const t = await getTranslations({ locale, namespace: "services" })
  const title = t(`${slug}.title`)
  const description = t(`${slug}.description`)

  return {
    title,
    description,
    alternates: buildAlternates(locale, `/services/${service.slug}`),
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [{ url: service.image, width: 1200, height: 750, alt: description }],
    },
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const t = await getTranslations("services")
  const tCommon = await getTranslations("common")
  const tDetail = await getTranslations("serviceDetail")
  const tNav = await getTranslations("nav")
  const tRoot = await getTranslations()

  const title = t(`${slug}.title`)
  const description = t(`${slug}.description`)
  const longDescription = t(`${slug}.longDescription`)
  const benefits = t.raw(`${slug}.benefits`) as string[]

  const Icon = iconMap[service.icon]
  const otherServices = services.filter((s) => s.slug !== service.slug)

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: title,
          description: longDescription,
          slug: service.slug,
          locale,
        })}
      />

      <section className="border-b border-border bg-surface py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { name: tNav("services"), path: "/services" },
              { name: title, path: `/services/${service.slug}` },
            ]}
          />

          <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeUp>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-ink">
                {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
              </span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
                {title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">{longDescription}</p>
              <div className="mt-8">
                <MagneticButton>
                  <a
                    href={siteConfig.links.order(
                      tRoot("whatsappMessageService", { service: title }),
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-base font-semibold text-[var(--color-accent-foreground)] transition-colors hover:bg-[var(--color-accent-hover)]"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    {tCommon("orderNow")}
                  </a>
                </MagneticButton>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] bg-surface-muted shadow-xl shadow-ink/10">
                <Image
                  src={service.image}
                  alt={description}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="bg-surface-muted py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {tDetail("includesTitle")}
            </h2>
          </FadeUp>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <FadeUp key={benefit} delay={index * 0.06}>
                <li className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-ink-muted">{benefit}</span>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {tCommon("otherServices")}
            </h2>
          </FadeUp>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((other, index) => {
              const OtherIcon = iconMap[other.icon]
              return (
                <FadeUp key={other.slug} delay={index * 0.05}>
                  <Link
                    href={`/services/${other.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-border p-5 transition-colors hover:bg-surface-muted"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-muted text-ink">
                        {OtherIcon && <OtherIcon className="h-4.5 w-4.5" aria-hidden="true" />}
                      </span>
                      <span className="text-sm font-semibold text-ink">
                        {t(`${other.slug}.title`)}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-ink-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
                      aria-hidden="true"
                    />
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
