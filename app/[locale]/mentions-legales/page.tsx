import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { FadeUp } from "@/components/motion"
import { Breadcrumb } from "@/components/seo/Breadcrumb"
import { buildAlternates } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"
import type { Locale } from "@/i18n/routing"

type Props = { params: Promise<{ locale: Locale }> }

const CREDIT_LICENSES = [
  "https://creativecommons.org/licenses/by/2.0/",
  "https://creativecommons.org/licenses/by/2.0/",
  "https://creativecommons.org/licenses/by/2.0/",
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "legal.terms" })

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/mentions-legales"),
    robots: { index: false, follow: true },
  }
}

export default async function MentionsLegalesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("legal.terms")
  const credits = t.raw("credits") as string[]

  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: t("title"), path: "/mentions-legales" }]} />
        <FadeUp>
          <h1 className="mt-8 text-4xl font-semibold tracking-tight text-ink">{t("title")}</h1>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-ink-muted">
            <div>
              <h2 className="text-lg font-semibold text-ink">{t("publisherHeading")}</h2>
              <p className="mt-3">{t("publisherIntro")}</p>
              <ul className="mt-3 space-y-1.5">
                <li>
                  {t("denomination")} : {siteConfig.name}
                </li>
                <li>
                  {t("address")} : {siteConfig.contact.addressLine}, {siteConfig.contact.city},{" "}
                  {siteConfig.contact.country}
                </li>
                <li>
                  {t("phone")} : {siteConfig.contact.phone}
                </li>
                <li>
                  {t("email")} : {siteConfig.contact.email}
                </li>
                <li>
                  {t("rc")} : {t("toComplete")}
                </li>
                <li>
                  {t("ice")} : {t("toComplete")}
                </li>
                <li>
                  {t("if")} : {t("toComplete")}
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-ink">{t("hostingHeading")}</h2>
              <p className="mt-3">{t("hostingBody")}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-ink">{t("ipHeading")}</h2>
              <p className="mt-3">{t("ipBody")}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-ink">{t("liabilityHeading")}</h2>
              <p className="mt-3">{t("liabilityBody")}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-ink">{t("contactHeading")}</h2>
              <p className="mt-3">
                {t("contactBody")}{" "}
                <Link href="/contact" className="underline underline-offset-2">
                  Contact
                </Link>
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-ink">{t("creditsHeading")}</h2>
              <p className="mt-3">{t("creditsIntro")}</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {credits.map((credit, index) => {
                  const license = CREDIT_LICENSES[index]
                  return (
                    <li key={credit}>
                      {credit}
                      {license && (
                        <>
                          {" — "}
                          <a href={license} className="underline underline-offset-2">
                            {license.includes("by-sa") ? "CC BY-SA 2.0" : "CC BY 2.0"}
                          </a>
                        </>
                      )}
                    </li>
                  )
                })}
              </ul>
              <p className="mt-3">{t("creditsOutro")}</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
