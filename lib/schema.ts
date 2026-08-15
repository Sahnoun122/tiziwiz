import type { Locale } from "@/i18n/routing"
import { siteConfig } from "@/lib/site-config"
import { localeUrl } from "@/lib/seo"

export function organizationSchema(locale: Locale = "fr") {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    image: localeUrl(locale, siteConfig.ogImage),
    logo: `${siteConfig.url}/icon`,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.addressLine,
      addressLocality: siteConfig.contact.city,
      addressRegion: siteConfig.contact.region,
      postalCode: siteConfig.contact.postalCode,
      addressCountry: siteConfig.contact.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: {
      "@type": "City",
      name: "Agadir",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [],
  }
}

export function websiteSchema(locale: Locale = "fr") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: locale,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  }
}

export type BreadcrumbEntry = { name: string; path: string }

export function breadcrumbSchema(items: BreadcrumbEntry[], locale: Locale = "fr") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: localeUrl(locale, item.path),
    })),
  }
}

export type FaqEntry = { question: string; answer: string }

export function faqPageSchema(items: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function articleSchema({
  title,
  description,
  slug,
  date,
  modifiedDate,
  author,
  image,
  locale = "fr",
}: {
  title: string
  description: string
  slug: string
  date: string
  modifiedDate?: string
  author: string
  image: string
  locale?: Locale
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: `${siteConfig.url}${image}`,
    inLanguage: locale,
    datePublished: date,
    dateModified: modifiedDate ?? date,
    author: {
      "@type": "Organization",
      name: author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${slug}`,
    },
  }
}

export function serviceSchema({
  name,
  description,
  slug,
  locale = "fr",
}: {
  name: string
  description: string
  slug: string
  locale?: Locale
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name: `${name} — ${siteConfig.name}`,
    description,
    inLanguage: locale,
    url: localeUrl(locale, `/services/${slug}`),
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: {
      "@type": "City",
      name: "Agadir",
    },
  }
}
