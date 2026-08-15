import type { MetadataRoute } from "next"
import { getArticleSlugs } from "@/lib/blog"
import { buildAlternates, localeUrl } from "@/lib/seo"
import { services } from "@/lib/site-config"
import { routing, type Locale } from "@/i18n/routing"

const STATIC_PATHS: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/a-propos", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/confidentialite", changeFrequency: "yearly", priority: 0.2 },
  { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.2 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const locale of routing.locales) {
    for (const { path, changeFrequency, priority } of STATIC_PATHS) {
      const { languages } = buildAlternates(locale, path)
      entries.push({
        url: localeUrl(locale, path),
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages },
      })
    }

    for (const service of services) {
      const path = `/services/${service.slug}`
      const { languages } = buildAlternates(locale, path)
      entries.push({
        url: localeUrl(locale, path),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages },
      })
    }

    for (const slug of getArticleSlugs(locale as Locale)) {
      const path = `/blog/${slug}`
      const { languages } = buildAlternates(locale, path)
      entries.push({
        url: localeUrl(locale, path),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages },
      })
    }
  }

  return entries
}
