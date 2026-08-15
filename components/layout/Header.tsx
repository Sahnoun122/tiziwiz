"use client"

import Image from "next/image"
import { Link, usePathname } from "@/i18n/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X, MessageCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { rtlLocales, type Locale } from "@/i18n/routing"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()
  const locale = useLocale() as Locale
  const isRtl = rtlLocales.includes(locale)
  const t = useTranslations("nav")
  const tCommon = useTranslations("common")
  const tRoot = useTranslations()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const mainNav = [
    { href: "/", label: t("home") },
    { href: "/a-propos", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/blog", label: t("blog") },
    { href: "/faq", label: t("faq") },
    { href: "/contact", label: t("contact") },
  ]

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close the mobile menu on route change
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  const hasOpenedRef = useRef(false)
  useEffect(() => {
    if (open) {
      hasOpenedRef.current = true
      firstLinkRef.current?.focus()
    } else if (hasOpenedRef.current) {
      toggleButtonRef.current?.focus()
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-colors duration-300",
          scrolled || open
            ? "border-b border-border bg-surface/80 backdrop-blur-lg"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <a href="#main-content" className="skip-link">
          {t("skipToContent")}
        </a>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-ink"
          >
            <Image
              src="/brand/emblem-black.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 dark:hidden"
              priority
            />
            <Image
              src="/brand/emblem-white.png"
              alt=""
              width={36}
              height={36}
              className="hidden h-9 w-9 dark:block"
              priority
            />
            <span>
              Tiziwiz
              <span className="text-ink-subtle font-normal"> Delivery</span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label={t("ariaLabel")}
          >
            {mainNav.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-ink",
                    isActive ? "text-ink" : "text-ink-muted",
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 start-0 end-0 h-[2px] rounded-full bg-[var(--color-accent)]"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              href={siteConfig.contact.phoneHref}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {siteConfig.contact.phone}
            </a>
            <a
              href={siteConfig.links.order(tRoot("whatsappMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--color-accent-foreground)] transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t("order")}
            </a>
          </div>

          <button
            ref={toggleButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-full p-2 text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("closeMenu") : t("openMenu")}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t("mobileAriaLabel")}
            initial={{ x: isRtl ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? "-100%" : "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-16 end-0 bottom-0 z-50 flex w-full max-w-xs flex-col overflow-y-auto border-s border-border bg-surface shadow-2xl lg:hidden"
          >
            <nav
              className="flex flex-1 flex-col gap-1 px-4 py-4"
              aria-label={t("mobileAriaLabel")}
            >
              {mainNav.map((item, index) => (
                <Link
                  key={item.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                    pathname === item.href
                      ? "bg-surface-muted text-ink"
                      : "text-ink-muted",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-3 border-t border-border pt-4">
                <LanguageSwitcher variant="mobile" />
                <ThemeToggle variant="mobile" />
                <a
                  href={siteConfig.contact.phoneHref}
                  className="px-3 text-sm font-medium text-ink-muted"
                >
                  {siteConfig.contact.phone}
                </a>
                <a
                  href={siteConfig.links.order(tRoot("whatsappMessage"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-foreground)]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {tCommon("orderNow")}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
