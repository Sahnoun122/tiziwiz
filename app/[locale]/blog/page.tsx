import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { FadeUp } from "@/components/motion"
import { ArticleCard } from "@/components/blog/ArticleCard"
import { Breadcrumb } from "@/components/seo/Breadcrumb"
import { getAllArticles } from "@/lib/blog"
import { buildAlternates } from "@/lib/seo"
import type { Locale } from "@/i18n/routing"

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "blogPage" })

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/blog"),
  }
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("blogPage")
  const articles = getAllArticles(locale)

  return (
    <>
      <section className="border-b border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ name: t("title"), path: "/blog" }]} />
          <FadeUp className="mt-8 max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t("subtitle")}</p>
          </FadeUp>
        </div>
      </section>

      <section className="bg-surface-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <FadeUp key={article.frontmatter.slug} delay={(index % 3) * 0.08}>
                <ArticleCard article={article} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
