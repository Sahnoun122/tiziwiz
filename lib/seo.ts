import { locales, defaultLocale, type Locale } from "@/i18n/routing"
import { siteConfig } from "@/lib/site-config"

function localizedPath(locale: Locale, path: string) {
  const clean = path === "/" ? "" : path
  return locale === defaultLocale ? `${clean || "/"}` : `/${locale}${clean}`
}

/**
 * Builds `alternates.canonical` + `alternates.languages` (hreflang) for a
 * locale-independent path (e.g. "/services/livraison-express"), given the
 * locale of the page currently being rendered.
 */
export function buildAlternates(locale: Locale, path: string) {
  const languages: Record<string, string> = {}
  for (const l of locales) {
    languages[l] = `${siteConfig.url}${localizedPath(l, path)}`
  }
  languages["x-default"] = `${siteConfig.url}${localizedPath(defaultLocale, path)}`

  return {
    canonical: localizedPath(locale, path),
    languages,
  }
}

export function localeUrl(locale: Locale, path: string) {
  return `${siteConfig.url}${localizedPath(locale, path)}`
}
