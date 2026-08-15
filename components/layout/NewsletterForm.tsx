"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight, Check } from "lucide-react"
import { useTranslations } from "next-intl"

export function NewsletterForm() {
  const t = useTranslations("footer")
  const [status, setStatus] = useState<"idle" | "submitted">("idle")

  // No email provider is connected yet (e.g. Resend/Brevo) — this captures
  // intent client-side only. Wire up a real provider before relying on it.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("submitted")
  }

  if (status === "submitted") {
    return (
      <p className="flex items-center gap-2 text-sm text-ink-inverse-muted">
        <Check className="h-4 w-4 text-[var(--color-accent)]" aria-hidden="true" />
        {t("newsletterSuccess")}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <label htmlFor="newsletter-email" className="sr-only">
        {t("newsletterEmailLabel")}
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder={t("newsletterPlaceholder")}
        className="w-full rounded-full border border-border-dark bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-ink-inverse-muted focus-visible:border-[var(--color-accent)] sm:w-56"
      />
      <button
        type="submit"
        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
      >
        {t("newsletterSubmit")}
        <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
      </button>
    </form>
  )
}
