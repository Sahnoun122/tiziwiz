import { MessageCircle, PhoneCall } from "lucide-react"
import { useTranslations } from "next-intl"
import { FadeUp, MagneticButton } from "@/components/motion"
import { Arc } from "@/components/decorative/Arc"
import { Dots } from "@/components/decorative/Dots"
import { iconMap } from "@/lib/icon-map"
import { services, siteConfig } from "@/lib/site-config"

const ORBIT_POSITIONS = [
  "top-[6%] start-[8%] -rotate-6",
  "top-[12%] end-[10%] rotate-6",
  "top-1/2 start-[2%] -translate-y-1/2 rotate-3",
  "top-1/2 end-[3%] -translate-y-1/2 -rotate-3",
  "bottom-[10%] start-[14%] rotate-6",
  "bottom-[8%] end-[14%] -rotate-6",
]

export function ServiceConstellation() {
  const t = useTranslations("home.finalCta")
  const tServices = useTranslations("services")
  const tCommon = useTranslations("common")
  const tRoot = useTranslations()

  return (
    <section className="relative overflow-hidden bg-surface-dark py-24 sm:py-28">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[26rem] sm:min-h-[30rem]">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon]
            return (
              <div
                key={service.slug}
                className={`absolute hidden h-16 w-16 items-center justify-center sm:flex ${ORBIT_POSITIONS[index]}`}
              >
                <Arc
                  size={64}
                  dashed
                  rotation={index * 40}
                  className="absolute inset-0 text-white/15"
                />
                {index % 2 === 0 && (
                  <Dots size={16} className="absolute -end-1.5 -top-1.5 text-white/20" />
                )}
                <span
                  className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-sm"
                  title={tServices(`${service.slug}.shortTitle`)}
                >
                  {Icon && <Icon className="h-4.5 w-4.5" aria-hidden="true" />}
                </span>
              </div>
            )
          })}

          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <FadeUp>
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                {t("title")}
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-lg text-ink-inverse-muted">{t("subtitle")}</p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <MagneticButton>
                  <a
                    href={siteConfig.links.order(tRoot("whatsappMessage"))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-[#0b0b0b] transition-colors hover:bg-white/90"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    {tCommon("orderWhatsapp")}
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <PhoneCall className="h-5 w-5" aria-hidden="true" />
                    {siteConfig.contact.phone}
                  </a>
                </MagneticButton>
              </div>
            </FadeUp>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:hidden">
              {services.map((service) => {
                const Icon = iconMap[service.icon]
                return (
                  <span
                    key={service.slug}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white"
                    title={tServices(`${service.slug}.shortTitle`)}
                  >
                    {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
