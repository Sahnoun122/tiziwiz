import { useTranslations } from "next-intl"
import type { Article } from "@/lib/blog"
import { ArticleCard } from "@/components/blog/ArticleCard"
import { FadeUp } from "@/components/motion"

export function RelatedArticles({ articles }: { articles: Article[] }) {
  const t = useTranslations("common")
  if (articles.length === 0) return null

  return (
    <section className="border-t border-border bg-surface-muted py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {t("relatedArticles")}
          </h2>
        </FadeUp>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
