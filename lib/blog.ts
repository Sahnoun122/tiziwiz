import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import readingTime from "reading-time"
import type { Locale } from "@/i18n/routing"

const BLOG_ROOT = path.join(process.cwd(), "content", "blog")

export type ArticleFaq = { question: string; answer: string }

export type ArticleFrontmatter = {
  title: string
  description: string
  slug: string
  date: string
  author: string
  coverImage: string
  coverImageAlt: string
  keywords: string[]
  category: string
  relatedSlugs: string[]
  faq: ArticleFaq[]
}

export type Article = {
  frontmatter: ArticleFrontmatter
  content: string
  readingTimeMinutes: number
}

function blogDir(locale: Locale) {
  return path.join(BLOG_ROOT, locale)
}

export function getArticleSlugs(locale: Locale): string[] {
  const dir = blogDir(locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

export function getArticle(locale: Locale, slug: string): Article {
  const filePath = path.join(blogDir(locale), `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  const stats = readingTime(content)

  return {
    frontmatter: data as ArticleFrontmatter,
    content,
    readingTimeMinutes: Math.max(1, Math.round(stats.minutes)),
  }
}

export function getAllArticles(locale: Locale): Article[] {
  return getArticleSlugs(locale)
    .map((slug) => getArticle(locale, slug))
    .sort(
      (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
    )
}

export function getRelatedArticles(locale: Locale, article: Article, limit = 3): Article[] {
  const all = getAllArticles(locale).filter(
    (a) => a.frontmatter.slug !== article.frontmatter.slug,
  )

  const explicit = article.frontmatter.relatedSlugs
    .map((slug) => all.find((a) => a.frontmatter.slug === slug))
    .filter((a): a is Article => Boolean(a))

  if (explicit.length >= limit) return explicit.slice(0, limit)

  const fallback = all.filter((a) => !explicit.includes(a)).slice(0, limit - explicit.length)

  return [...explicit, ...fallback]
}

const DATE_LOCALE_TAGS: Record<Locale, string> = {
  fr: "fr-MA",
  ar: "ar-MA",
  en: "en-US",
  es: "es-ES",
  zgh: "fr-MA",
}

export function formatArticleDate(date: string, locale: Locale = "fr"): string {
  const tag = DATE_LOCALE_TAGS[locale]
  try {
    return new Intl.DateTimeFormat(tag, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date))
  } catch {
    return new Intl.DateTimeFormat("fr-MA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date))
  }
}
