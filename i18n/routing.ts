import { defineRouting } from "next-intl/routing"

export const locales = ["fr", "ar", "en", "es", "zgh"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "fr"

export const rtlLocales: Locale[] = ["ar"]

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  ar: "العربية",
  en: "English",
  es: "Español",
  zgh: "ⵜⴰⵎⴰⵣⵉⵖⵜ",
}

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
})
