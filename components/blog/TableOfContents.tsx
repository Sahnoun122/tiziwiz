"use client"

import { useEffect, useRef, useState } from "react"
import { List } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

type Heading = { id: string; text: string; level: number }

export function TableOfContents({ contentSelector }: { contentSelector: string }) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const container = document.querySelector(contentSelector)
    if (!container) return

    const elements = Array.from(container.querySelectorAll("h2, h3")) as HTMLElement[]
    const items = elements
      .filter((el) => el.id)
      .map((el) => ({
        id: el.id,
        text: el.textContent ?? "",
        level: el.tagName === "H3" ? 3 : 2,
      }))
    // eslint-disable-next-line react-hooks/set-state-in-effect -- deriving TOC from server-rendered MDX headings, only knowable after mount
    setHeadings(items)

    observerRef.current?.disconnect()
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-100px 0px -70% 0px" },
    )
    elements.forEach((el) => observer.observe(el))
    observerRef.current = observer

    return () => observer.disconnect()
  }, [contentSelector])

  const t = useTranslations("common")

  if (headings.length < 2) return null

  return (
    <nav aria-label={t("tableOfContents")} className="sticky top-28">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-subtle">
        <List className="h-3.5 w-3.5" aria-hidden="true" />
        {t("tableOfContents")}
      </p>
      <ul className="mt-4 space-y-2.5 border-s border-border">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingInlineStart: heading.level === 3 ? "2rem" : "1rem" }}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                "-ms-px block border-s-2 ps-3 text-sm leading-snug transition-colors",
                activeId === heading.id
                  ? "border-[var(--color-accent)] font-medium text-ink"
                  : "border-transparent text-ink-subtle hover:text-ink",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
