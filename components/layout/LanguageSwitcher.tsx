"use client"

import { useLocale, useTranslations } from "next-intl"
import { Globe } from "lucide-react"
import { usePathname, useRouter } from "@/i18n/navigation"
import { locales, localeNames, type Locale } from "@/i18n/routing"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function LanguageSwitcher({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations("languageSwitcher")

  function handleSelect(next: Locale) {
    router.replace(pathname, { locale: next })
  }

  if (variant === "mobile") {
    return (
      <div className="px-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-subtle">
          {t("label")}
        </p>
        <div className="flex flex-wrap gap-2">
          {locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => handleSelect(l)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                l === locale
                  ? "border-ink bg-ink text-[var(--background)]"
                  : "border-border text-ink-muted hover:bg-surface-muted",
              )}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
          aria-label={t("label")}
        >
          <Globe className="h-4 w-4" aria-hidden="true" />
          {localeNames[locale]}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onSelect={() => handleSelect(l)}
            className={cn(l === locale && "font-semibold text-ink")}
          >
            {localeNames[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
