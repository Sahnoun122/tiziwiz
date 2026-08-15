import { ImageResponse } from "next/og"
import { getTranslations } from "next-intl/server"
import { routing, type Locale } from "@/i18n/routing"
import { getEmblemDataUri } from "@/lib/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function OgImage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "home.hero" })

  // Satori (the OG-image renderer) doesn't support the complex contextual
  // substitution rules some Arabic/Tifinagh fonts require ("lookupType: 5 -
  // substFormat: 3 is not yet supported") and crashes the build on those
  // scripts. Fall back to script-safe French copy for those locales'
  // generated card rather than embedding untranslatable Arabic/Tifinagh text.
  const canRenderText = locale !== "ar" && locale !== "zgh"
  const titleText = canRenderText ? t("title") : "Votre service de livraison rapide à Agadir"
  const badgeText = canRenderText ? t("badge") : "Disponible 24h/24 & 7j/7 à Agadir"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0B0B0B",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(255,255,255,0.14), transparent 45%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img src={getEmblemDataUri()} width={64} height={64} alt="" />
          <div style={{ display: "flex", fontSize: 30, color: "#ffffff", fontWeight: 600 }}>
            Tiziwiz <span style={{ color: "#a1a1aa", fontWeight: 400 }}>&nbsp;SARL</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.15,
              maxWidth: 1000,
            }}
          >
            {titleText}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#a1a1aa", maxWidth: 950 }}>
            {badgeText}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
