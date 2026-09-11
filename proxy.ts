import type { NextRequest } from "next/server"
import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"
import { MAINTENANCE_MODE, maintenanceResponse } from "./lib/maintenance"

const intlProxy = createMiddleware(routing)

export default function proxy(request: NextRequest) {
  if (MAINTENANCE_MODE) return maintenanceResponse()
  return intlProxy(request)
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*|sitemap.xml|robots.txt|manifest.webmanifest|icon|apple-icon).*)",
  ],
}
