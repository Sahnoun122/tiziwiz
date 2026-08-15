import { ArrowRight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { FadeUp } from "@/components/motion"
import { ArticleCard } from "@/components/blog/ArticleCard"
import { getAllArticles } from "@/lib/blog"
import type { Locale } from "@/i18n/routing"

export function BlogPreviewSection() {
  const locale = useLocale() as Locale
  const t = useTranslations("home.blogPreview")
  const tCommon = useTranslations("common")
  const articles = getAllArticles(locale).slice(0, 3)

  return (
    <section className="bg-surface-muted py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <FadeUp className="max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
              {t("eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {t("title")}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-[var(--color-accent)]"
            >
              {tCommon("viewAllArticles")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </FadeUp>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <FadeUp key={article.frontmatter.slug} delay={index * 0.08}>
              <ArticleCard article={article} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
