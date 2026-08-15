import { ChevronRight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { JsonLd } from "@/components/seo/JsonLd"
import { breadcrumbSchema, type BreadcrumbEntry } from "@/lib/schema"
import type { Locale } from "@/i18n/routing"

export function Breadcrumb({ items }: { items: BreadcrumbEntry[] }) {
  const locale = useLocale() as Locale
  const t = useTranslations("common")
  const allItems: BreadcrumbEntry[] = [{ name: t("home"), path: "/" }, ...items]

  return (
    <nav aria-label={t("breadcrumbAriaLabel")} className="text-sm">
      <JsonLd data={breadcrumbSchema(allItems, locale)} />
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-subtle">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 rtl:rotate-180" aria-hidden="true" />
              )}
              {isLast ? (
                <span className="font-medium text-ink" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="transition-colors hover:text-ink">
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
