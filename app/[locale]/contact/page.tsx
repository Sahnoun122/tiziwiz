import type { Metadata } from "next"
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { FadeUp } from "@/components/motion"
import { Breadcrumb } from "@/components/seo/Breadcrumb"
import { ContactForm } from "@/components/ContactForm"
import { buildAlternates } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"
import type { Locale } from "@/i18n/routing"

type Props = { params: Promise<{ locale: Locale }> }

const mapQuery = encodeURIComponent(
  `${siteConfig.contact.addressLine}, ${siteConfig.contact.city}, Maroc`,
)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "contactPage" })

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/contact"),
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("contactPage")

  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: t("title"), path: "/contact" }]} />

        <FadeUp className="mt-8 max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t("subtitle")}</p>
        </FadeUp>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <FadeUp delay={0.1}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <a
                href={siteConfig.contact.phoneHref}
                className="flex items-start gap-3 rounded-2xl border border-border p-5 transition-colors hover:bg-surface-muted"
              >
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-ink">{t("phoneLabel")}</p>
                  <p className="mt-1 text-sm text-ink-muted">{siteConfig.contact.phone}</p>
                </div>
              </a>

              <a
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-2xl border border-border p-5 transition-colors hover:bg-surface-muted"
              >
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-ink">{t("whatsappLabel")}</p>
                  <p className="mt-1 text-sm text-ink-muted">{siteConfig.contact.whatsapp}</p>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-start gap-3 rounded-2xl border border-border p-5 transition-colors hover:bg-surface-muted"
              >
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-ink">{t("emailLabel")}</p>
                  <p className="mt-1 text-sm text-ink-muted">{siteConfig.contact.email}</p>
                </div>
              </a>

              <div className="flex items-start gap-3 rounded-2xl border border-border p-5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-ink">{t("hoursLabel")}</p>
                  <p className="mt-1 text-sm text-ink-muted">{siteConfig.contact.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-border p-5 sm:col-span-2">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-ink">{t("addressLabel")}</p>
                  <p className="mt-1 text-sm text-ink-muted">
                    {siteConfig.contact.addressLine}, {siteConfig.contact.city}, {siteConfig.contact.country}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-[var(--radius-card)] border border-border">
              <iframe
                title={t("mapTitle")}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="rounded-[var(--radius-card)] border border-border bg-surface-muted p-8">
              <h2 className="text-xl font-semibold text-ink">{t("formTitle")}</h2>
              <p className="mt-2 text-sm text-ink-muted">{t("formSubtitle")}</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
