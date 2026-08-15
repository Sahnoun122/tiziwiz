import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { CalendarDays, Clock, User } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { FadeUp } from "@/components/motion"
import { Breadcrumb } from "@/components/seo/Breadcrumb"
import { JsonLd } from "@/components/seo/JsonLd"
import { FaqAccordion } from "@/components/FaqAccordion"
import { TableOfContents } from "@/components/blog/TableOfContents"
import { RelatedArticles } from "@/components/blog/RelatedArticles"
import { MdxLink } from "@/components/blog/MdxLink"
import {
  formatArticleDate,
  getArticle,
  getArticleSlugs,
  getRelatedArticles,
} from "@/lib/blog"
import { articleSchema, faqPageSchema } from "@/lib/schema"
import { buildAlternates } from "@/lib/seo"
import { routing, type Locale } from "@/i18n/routing"

type PageProps = {
  params: Promise<{ locale: Locale; slug: string }>
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getArticleSlugs(locale).map((slug) => ({ locale, slug })),
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  let article
  try {
    article = getArticle(locale, slug)
  } catch {
    return {}
  }
  const { frontmatter } = article

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
    alternates: buildAlternates(locale, `/blog/${frontmatter.slug}`),
    openGraph: {
      type: "article",
      title: frontmatter.title,
      description: frontmatter.description,
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  let article
  try {
    article = getArticle(locale, slug)
  } catch {
    notFound()
  }

  const { frontmatter, content, readingTimeMinutes } = article
  const related = getRelatedArticles(locale, article, 3)
  const t = await getTranslations("common")
  const tBlog = await getTranslations("blogPage")

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: frontmatter.title,
            description: frontmatter.description,
            slug: frontmatter.slug,
            date: frontmatter.date,
            author: frontmatter.author,
            image: frontmatter.coverImage,
            locale,
          }),
          faqPageSchema(frontmatter.faq),
        ]}
      />

      <article>
        <section className="border-b border-border bg-surface py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Breadcrumb
              items={[
                { name: tBlog("title"), path: "/blog" },
                { name: frontmatter.title, path: `/blog/${frontmatter.slug}` },
              ]}
            />
            <FadeUp>
              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl">
                {frontmatter.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                {frontmatter.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-subtle">
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-4 w-4" aria-hidden="true" />
                  {frontmatter.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  <time dateTime={frontmatter.date}>
                    {formatArticleDate(frontmatter.date, locale)}
                  </time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {t("readingTime", { minutes: readingTimeMinutes })}
                </span>
              </div>
            </FadeUp>
          </div>
        </section>

        <FadeUp>
          <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-card)] bg-surface-muted shadow-xl shadow-ink/10">
              <Image
                src={frontmatter.coverImage}
                alt={frontmatter.coverImageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 70vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </FadeUp>

        <section className="py-14 sm:py-16">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_240px] lg:gap-16 lg:px-8">
            <div id="article-content" className="article-content min-w-0">
              <MDXRemote
                source={content}
                components={{ a: MdxLink }}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />

              {frontmatter.faq.length > 0 && (
                <div className="not-prose mt-16 border-t border-border pt-10">
                  <h2 className="text-2xl font-semibold text-ink">{t("faqSectionTitle")}</h2>
                  <div className="mt-6">
                    <FaqAccordion items={frontmatter.faq} />
                  </div>
                </div>
              )}
            </div>

            <aside className="hidden lg:block">
              <TableOfContents contentSelector="#article-content" />
            </aside>
          </div>
        </section>
      </article>

      <RelatedArticles articles={related} />
    </>
  )
}
