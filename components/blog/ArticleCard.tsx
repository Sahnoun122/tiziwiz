import Image from "next/image"
import { ArrowUpRight, Clock } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import type { Article } from "@/lib/blog"
import { formatArticleDate } from "@/lib/blog"
import type { Locale } from "@/i18n/routing"

export function ArticleCard({ article }: { article: Article }) {
  const { frontmatter, readingTimeMinutes } = article
  const locale = useLocale() as Locale
  const t = useTranslations("common")

  return (
    <Link
      href={`/blog/${frontmatter.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-muted">
        <Image
          src={frontmatter.coverImage}
          alt={frontmatter.coverImageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs font-medium text-ink-subtle">
          <span>{formatArticleDate(frontmatter.date, locale)}</span>
          <span aria-hidden="true">&middot;</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {t("readingTime", { minutes: readingTimeMinutes })}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold text-ink">{frontmatter.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">
          {frontmatter.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors group-hover:text-[var(--color-accent)]">
          {t("readArticle")}
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  )
}
