import type { Metadata } from "next"
import { MessageCircle } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { FadeUp, MagneticButton } from "@/components/motion"
import { FaqAccordion } from "@/components/FaqAccordion"
import { Breadcrumb } from "@/components/seo/Breadcrumb"
import { JsonLd } from "@/components/seo/JsonLd"
import type { FaqItem, FaqCategory } from "@/lib/faq"
import { faqPageSchema } from "@/lib/schema"
import { buildAlternates } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"
import type { Locale } from "@/i18n/routing"

type Props = { params: Promise<{ locale: Locale }> }

const CATEGORY_ORDER: FaqCategory[] = [
  "Commandes",
  "Livraison",
  "Paiement",
  "Zones desservies",
  "Entreprises",
]

function groupByCategory(items: FaqItem[], categoryLabels: Record<FaqCategory, string>) {
  return CATEGORY_ORDER.map((category) => ({
    category,
    label: categoryLabels[category],
    items: items.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "faqPage" })

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/faq"),
  }
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("faqPage")
  const tRoot = await getTranslations()
  const faqItems = tRoot.raw("faq.items") as FaqItem[]
  const categoryLabels = tRoot.raw("faqCategories") as Record<FaqCategory, string>
  const groups = groupByCategory(faqItems, categoryLabels)

  return (
    <>
      <JsonLd data={faqPageSchema(faqItems)} />

      <section className="border-b border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ name: t("title"), path: "/faq" }]} />
          <FadeUp className="mt-8">
            <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t("subtitle")}</p>
          </FadeUp>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-14">
            {groups.map((group) => (
              <FadeUp key={group.category}>
                <h2 className="text-xl font-semibold text-ink">{group.label}</h2>
                <div className="mt-2">
                  <FaqAccordion items={group.items} />
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp className="mt-16 rounded-[var(--radius-card)] border border-border bg-surface-muted p-8 text-center">
            <h2 className="text-xl font-semibold text-ink">{t("ctaTitle")}</h2>
            <p className="mt-2 text-sm text-ink-muted">{t("ctaSubtitle")}</p>
            <div className="mt-6">
              <MagneticButton>
                <a
                  href={siteConfig.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-accent-foreground)] transition-colors hover:bg-[var(--color-accent-hover)]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {t("ctaButton")}
                </a>
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
