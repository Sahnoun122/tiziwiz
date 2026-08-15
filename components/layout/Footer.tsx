import Image from "next/image"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { services, siteConfig } from "@/lib/site-config"
import { NewsletterForm } from "@/components/layout/NewsletterForm"

export async function Footer() {
  const year = new Date().getFullYear()
  const t = await getTranslations("footer")
  const tNav = await getTranslations("nav")
  const tLegal = await getTranslations("legalNav")
  const tServices = await getTranslations("services")

  const navigationLinks = [
    { href: "/", label: tNav("home") },
    { href: "/a-propos", label: tNav("about") },
    { href: "/services", label: tNav("services") },
    { href: "/blog", label: tNav("blog") },
    { href: "/faq", label: tNav("faq") },
    { href: "/contact", label: tNav("contact") },
  ]

  const legalLinks = [
    { href: "/confidentialite", label: tLegal("privacy") },
    { href: "/mentions-legales", label: tLegal("terms") },
  ]

  return (
    <footer className="border-t border-border-dark bg-surface-dark text-ink-inverse">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
              <Image src="/brand/emblem-white.png" alt="" width={36} height={36} className="h-9 w-9" />
              <span>
                Tiziwiz<span className="font-normal text-ink-inverse-muted"> Delivery</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ink-inverse-muted">{t("description")}</p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">{t("navigationHeading")}</h2>
            <ul className="mt-4 space-y-3">
              {navigationLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-inverse-muted transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">{t("servicesHeading")}</h2>
            <ul className="mt-4 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-ink-inverse-muted transition-colors hover:text-white"
                  >
                    {tServices(`${service.slug}.shortTitle`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">{t("contactHeading")}</h2>
            <ul className="mt-4 space-y-3 text-sm text-ink-inverse-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {siteConfig.contact.addressLine}, {siteConfig.contact.city}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a href={siteConfig.contact.phoneHref} className="transition-colors hover:text-white">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a
                  href={siteConfig.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {t("whatsappLabel")}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:text-white">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{siteConfig.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border-dark pt-8 sm:flex-row">
          <p className="text-sm text-ink-inverse-muted">
            © {year} {siteConfig.name}. {t("copyright")}
          </p>
          <ul className="flex items-center gap-6">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-inverse-muted transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
