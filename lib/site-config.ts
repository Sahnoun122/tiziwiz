export const siteConfig = {
  name: "Tiziwiz Delivery",
  shortName: "Tiziwiz",
  // Registered legal entity name (as on the RC/ICE documents), distinct from the
  // trade name above — required verbatim on-site for Meta Business Verification.
  legalName: "TIZIWIZ SARL",
  tagline: "Votre service de livraison rapide à Agadir",
  description:
    "Tiziwiz Delivery est le service de livraison rapide à Agadir : repas, courses, médicaments, colis et livraison pour entreprises, disponible 24h/24 et 7j/7.",
  url: "https://tiziwizdelivery.com",
  ogImage: "/opengraph-image",
  locale: "fr_MA",
  language: "fr",

  contact: {
    phone: "+212 667 25 33 76",
    phoneHref: "tel:+212667253376",
    whatsapp: "+212 667 25 33 76",
    whatsappNumber: "212667253376",
    email: "contact@tiziwizdelivery.com",
    addressLine: "Résidence Khaliji Annakhil, Bureau N°842, Étage 4, Immeuble 8",
    city: "Agadir",
    region: "Souss-Massa",
    country: "Maroc",
    countryCode: "MA",
    postalCode: "80000",
    hours: "Ouvert 24h/24 et 7j/7",
  },

  // Approximate city-level coordinates for Agadir (used as a fallback geo hint in
  // structured data — the exact office is not geocoded, this is a reasonable proxy).
  geo: {
    latitude: 30.4278,
    longitude: -9.5981,
  },

  social: {
    // No verified handles were provided yet — intentionally left empty so the
    // footer doesn't link to guessed/incorrect profiles. Fill in once confirmed.
  },

  links: {
    order: (message = "Bonjour, je souhaite passer une commande sur Tiziwiz Delivery.") =>
      `https://wa.me/212667253376?text=${encodeURIComponent(message)}`,
    whatsapp: "https://wa.me/212667253376",
  },
} as const

export type SiteConfig = typeof siteConfig

// Non-translatable facts only (URL slug, icon, image). Title/description/
// longDescription/keyword/benefits live in messages/{locale}.json under
// `services.<slug>.*` — see i18n/routing.ts and messages/fr.json.
export const services = [
  { slug: "livraison-de-repas", icon: "UtensilsCrossed", image: "/images/livraison-repas-restaurant-agadir.jpg" },
  { slug: "livraison-de-courses", icon: "ShoppingBasket", image: "/images/livraison-courses-supermarche-agadir.jpg" },
  { slug: "livraison-de-medicaments", icon: "Pill", image: "/images/livraison-medicaments-pharmacie-agadir.jpg" },
  { slug: "livraison-express", icon: "Zap", image: "/images/livraison-express-urgente-agadir.jpg" },
  { slug: "livraison-de-colis", icon: "Package", image: "/images/livraison-colis-paquet-agadir.jpg" },
  { slug: "livraison-entreprises", icon: "Building2", image: "/images/livraison-entreprises-professionnels-agadir.jpg" },
] as const

export type Service = (typeof services)[number]
export type ServiceSlug = Service["slug"]
