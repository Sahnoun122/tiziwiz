"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type FaqAccordionItem = {
  question: string
  answer: string
}

export function FaqAccordion({ items }: { items: FaqAccordionItem[] }) {
  return (
    <Accordion type="single" collapsible className="w-full flex-col gap-3">
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          value={`item-${index}`}
          className="rounded-2xl border border-border bg-surface px-5 transition-colors hover:border-ink/20 has-[:focus-visible]:border-ink has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-ink sm:px-6"
        >
          <AccordionTrigger className="items-center py-5 text-base font-semibold text-ink hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-[15px] leading-relaxed text-ink-muted">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
