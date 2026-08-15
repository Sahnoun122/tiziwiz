import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { FadeUp } from "@/components/motion"
import { Arc } from "@/components/decorative/Arc"
import { services } from "@/lib/site-config"

export function ServicesSection() {
  const t = useTranslations("home.services")
  const tServices = useTranslations("services")
  const tCommon = useTranslations("common")

  return (
    <section id="services" className="bg-surface py-24 sm:py-28">
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

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
          {services.map((service, index) => (
            <FadeUp key={service.slug} delay={index * 0.06}>
              <Link href={`/services/${service.slug}`} className="group flex flex-col items-center text-center">
                <div className="relative h-24 w-24 sm:h-28 sm:w-28">
                  <Arc
                    size={112}
                    dashed
                    rotation={index * 55}
                    className="absolute -inset-2 text-border transition-colors group-hover:text-ink-subtle"
                  />
                  <div className="relative h-full w-full overflow-hidden rounded-full border border-border bg-surface-muted shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                    <Image
                      src={service.image}
                      alt={tServices(`${service.slug}.description`)}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="mt-5 text-sm font-semibold text-ink sm:text-base">
                  {tServices(`${service.slug}.shortTitle`)}
                </h3>
                <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-ink-subtle transition-colors group-hover:text-ink">
                  {tCommon("learnMore")}
                  <ArrowUpRight className="h-3 w-3 rtl:-scale-x-100" aria-hidden="true" />
                </span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
