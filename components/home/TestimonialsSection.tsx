"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useTranslations } from "next-intl"
import { FadeUp } from "@/components/motion"

type Testimonial = {
  initials: string
  name: string
  role: string
  rating: number
  quote: string
}

export function TestimonialsSection() {
  const t = useTranslations("home.testimonials")
  const tRoot = useTranslations()
  const testimonials = tRoot.raw("testimonialsItems") as Testimonial[]
  const scrollerRef = useRef<HTMLUListElement>(null)

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector("li")
    const amount = card ? card.getBoundingClientRect().width + 24 : 360
    el.scrollBy({ left: amount * direction, behavior: "smooth" })
  }

  return (
    <section className="bg-surface-muted py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <FadeUp className="max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
              {t("eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {t("title")}
            </h2>
          </FadeUp>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink transition-colors hover:bg-surface"
              aria-label={t("prevLabel")}
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink transition-colors hover:bg-surface"
              aria-label={t("nextLabel")}
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul
          ref={scrollerRef}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((testimonial, index) => (
            <FadeUp
              key={testimonial.name}
              delay={index * 0.06}
              className="w-[85%] shrink-0 snap-start sm:w-[45%] lg:w-[31%]"
            >
              <li className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-surface p-7 shadow-sm">
                <div className="flex items-center gap-1" aria-label={`${testimonial.rating} / 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < testimonial.rating
                          ? "h-4 w-4 fill-[var(--color-accent)] text-[var(--color-accent)]"
                          : "h-4 w-4 text-border"
                      }
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-muted">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-[var(--background)]">
                    {testimonial.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
                    <p className="text-xs text-ink-subtle">{testimonial.role}</p>
                  </div>
                </div>
              </li>
            </FadeUp>
          ))}
        </ul>
      </div>
    </section>
  )
}
