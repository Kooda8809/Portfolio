"use client"

import { motion } from "motion/react"
import { Mail, MapPin, ArrowUpRight } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Vimeo", href: "https://vimeo.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
]

export function ContactSection() {
  const { t } = useI18n()

  return (
    <section id="contact" className="relative z-10 border-t border-border bg-background px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col gap-6"
          >
            <span className="text-xs font-medium uppercase tracking-[0.4em] text-accent">{t("contact.label")}</span>
            <h2 className="font-display text-6xl uppercase leading-[0.9] tracking-wide text-foreground md:text-8xl">
              {t("contact.title")}
            </h2>
            <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              {t("contact.desc")}
            </p>

            <div className="mt-4 flex flex-col gap-4">
              <a
                href="mailto:contato@vitoroliveira.com"
                className="group flex items-center gap-3 text-foreground transition-colors hover:text-accent"
              >
                <Mail className="h-5 w-5" />
                <span className="text-lg">contato@vitoroliveira.com</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">{t("contact.location")}</span>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 md:p-8"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {t("contact.form.name")}
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder={t("contact.form.name.placeholder")}
                className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {t("contact.form.email")}
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder={t("contact.form.email.placeholder")}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {t("contact.form.message")}
              </label>
              <textarea
                id="message"
                required
                rows={4}
                placeholder={t("contact.form.message.placeholder")}
                className="resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
              />
            </div>
            <button
              type="submit"
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("contact.form.submit")}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </motion.form>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 md:flex-row md:items-center">
          <span className="font-serif text-lg text-foreground">Vitor Oliveira</span>
          <div className="flex flex-wrap gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-accent"
              >
                {social.label}
              </a>
            ))}
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {"© "}
            {new Date().getFullYear()} — {t("footer.role")}
          </span>
        </div>
      </div>
    </section>
  )
}