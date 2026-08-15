"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

export function ThemeToggle({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const { resolvedTheme, setTheme } = useTheme()
  const t = useTranslations("themeSwitcher")
  const [mounted, setMounted] = useState(false)

  // Avoid rendering theme-dependent UI until mounted, since the server
  // can't know the resolved (system) theme — prevents a hydration mismatch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard next-themes mounted-guard pattern
    setMounted(true)
  }, [])

  function toggle() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  if (variant === "mobile") {
    return (
      <div className="px-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-subtle">
          {t("toggle")}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
              mounted && resolvedTheme === "light"
                ? "border-ink bg-ink text-[var(--background)]"
                : "border-border text-ink-muted hover:bg-surface-muted",
            )}
          >
            <Sun className="h-3.5 w-3.5" aria-hidden="true" />
            {t("light")}
          </button>
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
              mounted && resolvedTheme === "dark"
                ? "border-ink bg-ink text-[var(--background)]"
                : "border-border text-ink-muted hover:bg-surface-muted",
            )}
          >
            <Moon className="h-3.5 w-3.5" aria-hidden="true" />
            {t("dark")}
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
      aria-label={t("toggle")}
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  )
}
