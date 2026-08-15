import Image from "next/image"
import { useTranslations } from "next-intl"
import { FadeUp } from "@/components/motion"

type GuaranteeItem = { title: string; description: string }

const IMAGES = [
  "/images/coursier-livreur-agadir-maroc.jpg",
  "/images/front-de-mer-plage-agadir.jpg",
  "/images/livraison-rapide-scooter-agadir.jpg",
]

export function GuaranteesGrid() {
  const t = useTranslations("home.guarantees")
  const tRoot = useTranslations()
  const items = tRoot.raw("home.guarantees.items") as GuaranteeItem[]

  return (
    <section className="bg-surface-muted py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {t("title")}
          </h2>
        </FadeUp>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {items[0] && (
            <FadeUp className="relative min-h-[22rem] overflow-hidden rounded-[var(--radius-card)] lg:row-span-2">
              <Image
                src={IMAGES[0]}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-8 sm:p-10">
                <h3 className="text-2xl font-semibold text-white sm:text-3xl">{items[0].title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
                  {items[0].description}
                </p>
              </div>
            </FadeUp>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {items.slice(1).map((item, index) => (
              <FadeUp
                key={item.title}
                delay={index * 0.08}
                className="relative min-h-[12.5rem] overflow-hidden rounded-[var(--radius-card)]"
              >
                <Image
                  src={IMAGES[index + 1]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-6">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/75">{item.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
