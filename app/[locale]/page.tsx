import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Hero } from "@/components/home/Hero"
import { OrderBanner } from "@/components/home/OrderBanner"
import { ServicesSection } from "@/components/home/ServicesSection"
import { WhyUsSection } from "@/components/home/WhyUsSection"
import { HowItWorksSection } from "@/components/home/HowItWorksSection"
import { StatsSection } from "@/components/home/StatsSection"
import { GuaranteesGrid } from "@/components/home/GuaranteesGrid"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { BlogPreviewSection } from "@/components/home/BlogPreviewSection"
import { FaqPreviewSection } from "@/components/home/FaqPreviewSection"
import { ServiceConstellation } from "@/components/home/ServiceConstellation"
import { buildAlternates } from "@/lib/seo"
import type { Locale } from "@/i18n/routing"

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "home.hero" })

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates(locale, "/"),
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <OrderBanner />
      <ServicesSection />
      <HowItWorksSection />
      <StatsSection />
      <WhyUsSection />
      <GuaranteesGrid />
      <TestimonialsSection />
      <BlogPreviewSection />
      <FaqPreviewSection />
      <ServiceConstellation />
    </>
  )
}
