import { AlertTriangle } from "lucide-react"
import { getTranslations } from "next-intl/server"

export async function TranslationNotice() {
  const t = await getTranslations("translationNotice")

  return (
    <div className="border-b border-border bg-surface-muted px-4 py-2.5 text-center text-sm text-ink">
      <p className="mx-auto flex max-w-4xl items-center justify-center gap-2">
        <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{t("text")}</span>
      </p>
    </div>
  )
}
