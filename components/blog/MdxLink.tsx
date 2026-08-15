import type { AnchorHTMLAttributes } from "react"
import { Link } from "@/i18n/navigation"

/**
 * Blog articles (MDX) are written with plain relative links like
 * `/services/livraison-express` regardless of locale — this renders them
 * through next-intl's Link so they pick up the current locale's URL prefix.
 * External links (WhatsApp, mailto, http…) render as plain anchors.
 */
export function MdxLink({ href = "", children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternal = href.startsWith("/") && !href.startsWith("//")

  if (isInternal) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}
