import { MessageCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { FadeUp, MagneticButton, AnimatedNumber } from "@/components/motion"
import { Scribble } from "@/components/decorative/Scribble"
import { siteConfig } from "@/lib/site-config"

type StatItem = { value: number; suffix: string; label: string }

export function OrderBanner() {
  const t = useTranslations("home.orderBanner")
  const tCommon = useTranslations("common")
  const tRoot = useTranslations()
  const stats = (tRoot.raw("statsItems") as StatItem[]).slice(0, 2)

  return (
    <section className="bg-surface-muted py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-surface-dark px-8 py-12 sm:px-14 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -end-16 -top-16 h-64 w-64 rounded-full bg-white/5 blur-3xl"
            />
            <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wide text-white/60">
                  {t("eyebrow")}
                </span>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                  {t("title")}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
                  {t("subtitle")}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-8">
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

                  <dl className="flex items-center gap-6">
                    {stats.map((stat) => (
                      <div key={stat.label}>
                        <dt className="sr-only">{stat.label}</dt>
                        <dd className="text-xl font-semibold text-white sm:text-2xl">
                          <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                        </dd>
                        <p className="mt-0.5 text-xs text-white/60">{stat.label}</p>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-xs">
                <Scribble
                  size={44}
                  className="absolute -top-6 start-6 -rotate-6 text-white/30"
                />
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                      <MessageCircle className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-medium text-white/70">WhatsApp</span>
                  </div>
                  <div className="mt-4 flex flex-col gap-2.5">
                    <p className="max-w-[85%] self-start rounded-2xl rounded-es-sm bg-white/10 px-4 py-2.5 text-sm text-white">
                      {t("chatIncoming")}
                    </p>
                    <p className="max-w-[85%] self-end rounded-2xl rounded-ee-sm bg-white px-4 py-2.5 text-sm text-ink">
                      {t("chatReply")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
