import type { Metadata } from "next"
import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { Geist, Geist_Mono, Noto_Sans_Arabic, Noto_Sans_Tifinagh } from "next/font/google"
import { JsonLd } from "@/components/seo/JsonLd"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { TranslationNotice } from "@/components/TranslationNotice"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ScrollProgressBar } from "@/components/motion"
import { organizationSchema, websiteSchema } from "@/lib/schema"
import { buildAlternates } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"
import { routing, rtlLocales, type Locale } from "@/i18n/routing"
import "../globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
})

const notoSansTifinagh = Noto_Sans_Tifinagh({
  variable: "--font-noto-tifinagh",
  subsets: ["tifinagh"],
  weight: "400",
})

const FONT_VARIABLES: Record<Locale, string> = {
  fr: "var(--font-geist-sans)",
  en: "var(--font-geist-sans)",
  es: "var(--font-geist-sans)",
  ar: "var(--font-noto-arabic)",
  zgh: "var(--font-noto-tifinagh)",
}

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}

  const t = await getTranslations({ locale, namespace: "meta" })
  const { canonical, languages } = buildAlternates(locale, "/")

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("defaultTitle"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      locale,
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: t("defaultTitle"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  }
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  setRequestLocale(locale)
  const messages = await getMessages()
  const dir = rtlLocales.includes(locale) ? "rtl" : "ltr"

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      style={{ "--font-sans": FONT_VARIABLES[locale] } as React.CSSProperties}
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansArabic.variable} ${notoSansTifinagh.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <JsonLd data={[organizationSchema(locale), websiteSchema(locale)]} />
            <ScrollProgressBar />
            {locale === "zgh" && <TranslationNotice />}
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
