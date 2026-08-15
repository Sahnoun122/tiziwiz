import { ImageResponse } from "next/og"
import { getArticle, getArticleSlugs } from "@/lib/blog"
import { routing, type Locale } from "@/i18n/routing"
import { getEmblemDataUri } from "@/lib/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getArticleSlugs(locale).map((slug) => ({ locale, slug })),
  )
}

export default async function ArticleOgImage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const article = getArticle(locale, slug)

  // Satori (the OG-image renderer) doesn't support the complex contextual
  // substitution rules some Arabic/Tifinagh fonts require ("lookupType: 5 -
  // substFormat: 3 is not yet supported") and crashes the build on those
  // scripts. Fall back to a script-safe generic card for those locales
  // instead of embedding the (Arabic/Tifinagh) article title.
  const canRenderTitle = locale !== "ar" && locale !== "zgh"
  const titleText = canRenderTitle ? article.frontmatter.title : "Tiziwiz SARL — Blog"

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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={getEmblemDataUri()} width={56} height={56} alt="" />
          <div style={{ display: "flex", fontSize: 26, color: "#ffffff", fontWeight: 600 }}>
            Tiziwiz <span style={{ color: "#a1a1aa", fontWeight: 400 }}>&nbsp;SARL — Blog</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 52,
            fontWeight: 600,
            color: "#ffffff",
            lineHeight: 1.2,
            maxWidth: 1000,
          }}
        >
          {titleText}
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#a1a1aa" }}>
          tiziwizdelivery.com
        </div>
      </div>
    ),
    { ...size },
  )
}
