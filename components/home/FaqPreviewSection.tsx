import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { FadeUp } from "@/components/motion"
import { FaqAccordion } from "@/components/FaqAccordion"
import type { FaqItem } from "@/lib/faq"

export function FaqPreviewSection() {
  const t = useTranslations("home.faqPreview")
  const tCommon = useTranslations("common")
  const tRoot = useTranslations()
  const faqItems = tRoot.raw("faq.items") as FaqItem[]
  const preview = faqItems.slice(0, 5)

  return (
    <section className="bg-surface py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {t("title")}
          </h2>
        </FadeUp>

        <FadeUp delay={0.15} className="mt-12">
          <FaqAccordion items={preview} />
        </FadeUp>

        <FadeUp delay={0.2} className="mt-10 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-[var(--color-accent)]"
          >
            {tCommon("viewAllFaq")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}
