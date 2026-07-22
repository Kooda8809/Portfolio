"use client"

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react"

export type Locale = "pt" | "en" | "es"

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

const dictionaries: Record<Locale, Record<string, string>> = {
  pt: {
    "hero.click": "Clique para explorar",
    "hero.intro": "Olá! Eu sou o Vitor, um editor de vídeo independente especializado em cortes dinâmicos, motion e narrativa visual. Ajudo marcas a contar suas histórias com um trabalho criativo cuidadoso e distinto.",
    "nav.projects": "PROJETOS",
    "nav.about": "SOBRE",
    "nav.contact": "CONTATO",
    "nav.theme.dark": "Ativar modo escuro",
    "nav.theme.light": "Ativar modo claro",
    "projects.label": "Portfólio",
    "projects.title": "Projetos",
    "projects.desc": "Uma seleção de trabalhos entre comerciais, conteúdo para YouTube e reels — cada um moldado no corte.",
    "projects.error.title": "Não foi possível carregar o portfólio",
    "projects.error.retry": "Tentar novamente",
    "projects.empty.title": "Nenhum projeto encontrado",
    "projects.empty.desc": "Nenhum projeto encontrado na planilha. Verifique os dados e tente novamente.",
    "about.label": "Sobre",
    "about.title": "Quem sou",
    "about.p1": "Sou o Vitor Oliveira, editor de vídeo e motion designer com base no Brasil. Nos últimos anos, transformei horas de material bruto em histórias que prendem a atenção e emocionam — de comerciais de alto padrão a conteúdo diário para criadores.",
    "about.p2": "Meu processo une ritmo, color grading intencional e uma obsessão por detalhes. Acredito que a edição é onde a história realmente ganha vida.",
    "about.stats1": "Anos de experiência",
    "about.stats2": "Projetos entregues",
    "about.stats3": "Views acumuladas",
    "contact.label": "Contato",
    "contact.title": "Vamos criar juntos",
    "contact.desc": "Tem um projeto em mente? Comerciais, YouTube, reels ou algo totalmente novo — envie uma mensagem e vamos conversar sobre como dar vida à sua história.",
    "contact.form.name": "Nome",
    "contact.form.name.placeholder": "Seu nome",
    "contact.form.email": "E-mail",
    "contact.form.email.placeholder": "voce@email.com",
    "contact.form.message": "Mensagem",
    "contact.form.message.placeholder": "Conte sobre o seu projeto...",
    "contact.form.submit": "Enviar mensagem",
    "contact.location": "São Paulo, Brasil",
    "footer.role": "Editor de Vídeo",
    "lang.label": "Idioma",
    "lang.pt": "PT",
    "lang.en": "EN",
    "lang.es": "ES",
  },
  en: {
    "hero.click": "Click to explore",
    "hero.intro": "Hi! I'm Vitor, an independent video editor specializing in dynamic cuts, motion, and visual storytelling. I help brands tell their stories through meticulous and distinctive creative work.",
    "nav.projects": "PROJECTS",
    "nav.about": "ABOUT",
    "nav.contact": "CONTACT",
    "nav.theme.dark": "Enable dark mode",
    "nav.theme.light": "Enable light mode",
    "projects.scrollTo": "Scroll to portfolio",
    "projects.label": "Portfolio",
    "projects.title": "Projects",
    "projects.desc": "A curated selection of work across commercials, YouTube content and reels — each one shaped in the edit.",
    "projects.error.title": "Could not load portfolio",
    "projects.error.retry": "Try again",
    "projects.empty.title": "No projects found",
    "projects.empty.desc": "No projects found in the sheet. Please check your data and try again.",
    "about.label": "About",
    "about.title": "Who I am",
    "about.p1": "I'm Vitor Oliveira, a Brazil-based video editor and motion designer. Over the years, I've turned hours of raw footage into stories that captivate and move people — from high-end commercials to daily creator content.",
    "about.p2": "My process blends rhythm, intentional color grading, and an obsession with details. I believe editing is where the story truly comes to life.",
    "about.stats1": "Years of experience",
    "about.stats2": "Projects delivered",
    "about.stats3": "Cumulative views",
    "contact.label": "Contact",
    "contact.title": "Let's create together",
    "contact.desc": "Have a project in mind? Commercials, YouTube, reels or something entirely new — send a message and let's talk about bringing your story to life.",
    "contact.form.name": "Name",
    "contact.form.name.placeholder": "Your name",
    "contact.form.email": "Email",
    "contact.form.email.placeholder": "you@email.com",
    "contact.form.message": "Message",
    "contact.form.message.placeholder": "Tell us about your project...",
    "contact.form.submit": "Send message",
    "contact.location": "São Paulo, Brazil",
    "footer.role": "Video Editor",
    "lang.label": "Language",
    "lang.pt": "PT",
    "lang.en": "EN",
    "lang.es": "ES",
  },
  es: {
    "hero.click": "Haz clic para explorar",
    "hero.intro": "Hola! Soy Vitor, un editor de video independiente especializado en cortes dinámicos, motion y narrativa visual. Ayudo a las marcas a contar sus historias con un trabajo creativo cuidadoso y distinto.",
    "nav.projects": "PROYECTOS",
    "nav.about": "SOBRE MÍ",
    "nav.contact": "CONTACTO",
    "nav.theme.dark": "Activar modo oscuro",
    "nav.theme.light": "Activar modo claro",
    "projects.label": "Portafolio",
    "projects.title": "Proyectos",
    "projects.desc": "Una selección de trabajos entre comerciales, contenido para YouTube y reels — cada uno moldeado en la edición.",
    "projects.error.title": "No se pudo cargar el portafolio",
    "projects.error.retry": "Intentar de nuevo",
    "projects.empty.title": "No se encontraron proyectos",
    "projects.empty.desc": "No se encontraron proyectos en la hoja de cálculo. Verifica tus datos e inténtalo de nuevo.",
    "about.label": "Sobre mí",
    "about.title": "Quién soy",
    "about.p1": "Soy Vitor Oliveira, editor de video y motion designer radicado en Brasil. Durante los últimos años, he transformado horas de material bruto en historias que cautivan y emocionan — desde comerciales de alto nivel hasta contenido diario para creadores.",
    "about.p2": "Mi proceso combina ritmo, color grading intencional y una obsesión por los detalles. Creo que la edición es donde la historia realmente cobra vida.",
    "about.stats1": "Años de experiencia",
    "about.stats2": "Proyectos entregados",
    "about.stats3": "Vistas acumuladas",
    "contact.label": "Contacto",
    "contact.title": "Creemos juntos",
    "contact.desc": "Tienes un proyecto en mente? Comerciales, YouTube, reels o algo totalmente nuevo — envíame un mensaje y hablemos sobre cómo dar vida a tu historia.",
    "contact.form.name": "Nombre",
    "contact.form.name.placeholder": "Tu nombre",
    "contact.form.email": "Correo electrónico",
    "contact.form.email.placeholder": "tu@email.com",
    "contact.form.message": "Mensaje",
    "contact.form.message.placeholder": "Cuéntame sobre tu proyecto...",
    "contact.form.submit": "Enviar mensaje",
    "contact.location": "São Paulo, Brasil",
    "footer.role": "Editor de Video",
    "lang.label": "Idioma",
    "lang.pt": "PT",
    "lang.en": "EN",
    "lang.es": "ES",
  },
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "pt"
  const stored = localStorage.getItem("locale")
  if (stored === "pt" || stored === "en" || stored === "es") return stored
  return "pt"
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    document.documentElement.lang = next === "pt" ? "pt-BR" : next === "es" ? "es" : "en"
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", next)
    }
  }, [])

  const t = useCallback(
    (key: string): string => {
      return dictionaries[locale]?.[key] ?? key
    },
    [locale],
  )

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider")
  return ctx
}