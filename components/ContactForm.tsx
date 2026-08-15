"use client"

import { useMemo } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { MessageCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { services, siteConfig } from "@/lib/site-config"

export function ContactForm() {
  const t = useTranslations("contactForm")
  const tServices = useTranslations("services")

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("nameError")),
        phone: z.string().min(6, t("phoneError")),
        service: z.string().min(1, t("serviceError")),
        message: z.string().min(10, t("messageError")),
      }),
    [t],
  )

  type FormValues = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  // No email/CRM backend is connected yet — submitting opens a prefilled
  // WhatsApp conversation instead, the real channel this business already uses.
  function onSubmit(values: FormValues) {
    const text = [
      t("whatsappPrefix"),
      `${t("nameLabel")} : ${values.name}`,
      `${t("phoneLabel")} : ${values.phone}`,
      `${t("serviceLabel")} : ${values.service}`,
      `${t("messageLabel")} : ${values.message}`,
    ].join("\n")

    window.open(siteConfig.links.order(text), "_blank", "noopener,noreferrer")
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <Label htmlFor="name" className="text-ink">
          {t("nameLabel")}
        </Label>
        <Input id="name" className="mt-2 h-12 rounded-xl" {...register("name")} aria-invalid={!!errors.name} />
        {errors.name && <p className="mt-1.5 text-sm font-medium text-ink">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="phone" className="text-ink">
          {t("phoneLabel")}
        </Label>
        <Input
          id="phone"
          type="tel"
          className="mt-2 h-12 rounded-xl"
          {...register("phone")}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <p className="mt-1.5 text-sm font-medium text-ink">{errors.phone.message}</p>}
      </div>

      <div>
        <Label htmlFor="service" className="text-ink">
          {t("serviceLabel")}
        </Label>
        <select
          id="service"
          className="mt-2 h-12 w-full rounded-xl border border-border bg-transparent px-3 text-sm text-ink outline-none focus-visible:border-[var(--color-accent)] focus-visible:ring-3 focus-visible:ring-[var(--color-accent)]/20"
          defaultValue=""
          {...register("service")}
          aria-invalid={!!errors.service}
        >
          <option value="" disabled>
            {t("servicePlaceholder")}
          </option>
          {services.map((service) => {
            const title = tServices(`${service.slug}.title`)
            return (
              <option key={service.slug} value={title}>
                {title}
              </option>
            )
          })}
          <option value={t("serviceOther")}>{t("serviceOther")}</option>
        </select>
        {errors.service && <p className="mt-1.5 text-sm font-medium text-ink">{errors.service.message}</p>}
      </div>

      <div>
        <Label htmlFor="message" className="text-ink">
          {t("messageLabel")}
        </Label>
        <Textarea
          id="message"
          rows={4}
          className="mt-2 rounded-xl"
          {...register("message")}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="mt-1.5 text-sm font-medium text-ink">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3.5 text-sm font-semibold text-[var(--color-accent-foreground)] transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        {t("submit")}
      </button>

      {isSubmitSuccessful && (
        <p className="text-center text-sm text-ink-muted">{t("successNotice")}</p>
      )}
    </form>
  )
}
