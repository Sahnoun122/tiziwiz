import fs from "node:fs"
import path from "node:path"

// OG images (Satori) can't reliably fetch our own domain during SSG, so the
// brand mark is inlined as a data URI read straight from disk at build time.
let cachedEmblemDataUri: string | null = null

export function getEmblemDataUri(): string {
  if (cachedEmblemDataUri) return cachedEmblemDataUri
  const filePath = path.join(process.cwd(), "public", "brand", "emblem-white.png")
  const buffer = fs.readFileSync(filePath)
  cachedEmblemDataUri = `data:image/png;base64,${buffer.toString("base64")}`
  return cachedEmblemDataUri
}
