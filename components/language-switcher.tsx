"use client"

import { useState, useRef, useEffect } from "react"
import { useI18n, type Locale } from "@/lib/i18n"

const FLAGS: Record<Locale, string> = {
  pt: "BR",
  en: "US",
  es: "ES",
}

const FLAG_SVGS: Record<Locale, string> = {
  pt: `<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="14" rx="1" fill="#009B3A"/><path d="M10 2L17.6603 7L10 12L2.33975 7L10 2Z" fill="#FEDF00"/><circle cx="10" cy="7" r="2.5" fill="#1A237E"/></svg>`,
  en: `<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="14" rx="2" fill="#FFFFFF"/><rect y="0.777771" width="20" height="1.55556" fill="#B22234"/><rect y="3.11108" width="20" height="1.55556" fill="#B22234"/><rect y="5.44446" width="20" height="1.55556" fill="#B22234"/><rect y="7.77783" width="20" height="1.55556" fill="#B22234"/><rect y="10.1111" width="20" height="1.55556" fill="#B22234"/><rect y="12.4445" width="20" height="1.55556" fill="#B22234"/><rect width="8" height="7.77778" rx="1" fill="#002868"/><path d="M1.6 0.77777L2.486 1.02222L2.5 1.86667L3.38667 1.46667H4.16L5.04 1.07778L5.06 0.08888L5.92 0.46666L6 1.11111L6.88 0.73333V1.57778L7.76 1.2L6.88 1.85556L6.94 2.68889L6 2.33333L5.92 3.16667L5.04 2.78889L4.16 3.2L4.22 2.37778L3.33333 2.02222L4.18667 1.68889L4.2 0.64444L3.36 1.2L2.5 0.8H1.6Z" fill="#FFFFFF"/></svg>`,
  es: `<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="4.66667" rx="1" fill="#C60B1E"/><rect y="4.66663" width="20" height="4.66667" fill="#FFC400"/><rect y="9.33337" width="20" height="4.66663" rx="1" fill="#C60B1E"/><rect x="3" y="2" width="4" height="10" rx="0.5" fill="#C60B1E"/><circle cx="4.5" cy="4.5" r="0.6" fill="#FFC400"/><circle cx="6" cy="5" r="0.6" fill="#FFC400"/><circle cx="4.5" cy="3.5" r="0.6" fill="#FFC400"/><circle cx="3.5" cy="4.5" r="0.6" fill="#FFC400"/><circle cx="5" cy="3.2" r="0.6" fill="#FFC400"/></svg>`,
}

const LOCALE_LABELS: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (loc: Locale) => {
    setLocale(loc)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Selecione o idioma"
        className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium tracking-[0.2em] text-foreground/80 transition-colors hover:border-accent hover:text-accent"
      >
        <span dangerouslySetInnerHTML={{ __html: FLAG_SVGS[locale] }} />
        <span>{FLAGS[locale]}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-border bg-card p-1.5 shadow-lg backdrop-blur-md">
          {(Object.keys(FLAGS) as Locale[]).map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => handleSelect(loc)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${locale === loc ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"}`}
            >
              <span dangerouslySetInnerHTML={{ __html: FLAG_SVGS[loc] }} />
              <span className="text-xs tracking-wide">{LOCALE_LABELS[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}