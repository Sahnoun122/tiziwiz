import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { FadeUp } from "@/components/motion"
import { Breadcrumb } from "@/components/seo/Breadcrumb"
import { buildAlternates } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"
import type { Locale } from "@/i18n/routing"

type Props = { params: Promise<{ locale: Locale }> }
type Section = { heading: string; body: string }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "legal.privacy" })

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/confidentialite"),
    robots: { index: false, follow: true },
  }
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("legal.privacy")
  const sections = t.raw("sections") as Section[]

  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: t("title"), path: "/confidentialite" }]} />
        <FadeUp>
          <h1 className="mt-8 text-4xl font-semibold tracking-tight text-ink">{t("title")}</h1>
          <p className="mt-4 text-sm text-ink-subtle">{t("lastUpdated")}</p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-ink-muted">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-lg font-semibold text-ink">{section.heading}</h2>
                <p className="mt-3">
                  {section.body.includes("{email}") ? (
                    <>
                      {section.body.split("{email}")[0]}
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="underline underline-offset-2"
                      >
                        {siteConfig.contact.email}
                      </a>
                      {section.body.split("{email}")[1]}
                    </>
                  ) : (
                    section.body
                  )}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
