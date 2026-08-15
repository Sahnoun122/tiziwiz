import { MessageCircle, MoveLeft } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { siteConfig } from "@/lib/site-config"

export default async function NotFound() {
  const t = await getTranslations("notFound")

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <span className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
        {t("eyebrow")}
      </span>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-ink sm:text-7xl">
        {t("title")}
      </h1>
      <p className="mt-6 max-w-xl text-balance text-lg text-ink-muted">{t("subtitle")}</p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-[var(--background)] transition-colors hover:bg-ink/90"
        >
          <MoveLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          {t("backHome")}
        </Link>
        <a
          href={siteConfig.links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-muted"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {t("contactUs")}
        </a>
      </div>
    </div>
  )
}
