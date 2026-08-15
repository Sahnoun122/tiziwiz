// FAQ content lives in messages/{locale}.json under `faq.items` — this file
// only keeps the shared type (categories are also translated, under
// `faqCategories` in the same message file).
export type FaqCategory = "Commandes" | "Livraison" | "Paiement" | "Zones desservies" | "Entreprises"

export type FaqItem = {
  question: string
  answer: string
  category: FaqCategory
}
