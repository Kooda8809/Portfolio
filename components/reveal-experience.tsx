"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { Moon, Sun } from "lucide-react"
import { ProjectsSection } from "@/components/projects-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { VideoModal } from "@/components/video-modal"

const tiles = [
  { src: "/work-reel-2.png", label: "Retrato / Moda", tall: true },
  { src: "/work-commercial-1.png", label: "Comercial", tall: false },
  { src: "/work-youtube-1.png", label: "YouTube", tall: false },
  { src: "/work-reel-1.png", label: "Reel / Cidade", tall: true },
  { src: "/work-reel-3.png", label: "Dança", tall: true },
  { src: "/work-commercial-2.png", label: "Automotivo", tall: false },
  { src: "/work-youtube-2.png", label: "Documentário", tall: false },
  { src: "/reel-hero.png", label: "Showreel 2026", tall: true },
]

const navLinks = ["PROJECTS", "ABOUT", "CONTACT"]

export function RevealExperience() {
  const [revealed, setRevealed] = useState(false)
  const [light, setLight] = useState(false)
  const [modalVideoId, setModalVideoId] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const reveal = useCallback(() => setRevealed(true), [])

  const openVideo = useCallback((videoId: string) => {
    setModalVideoId(videoId)
    setModalOpen(true)
  }, [])

  const closeVideo = useCallback(() => {
    setModalOpen(false)
    setModalVideoId(null)
  }, [])

  const toggleTheme = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setLight((prev) => {
      const next = !prev
      document.documentElement.classList.toggle("light", next)
      return next
    })
  }, [])

  return (
    <main className="relative w-full bg-background film-grain" aria-label="Portfólio de Vitor Oliveira">
      {/* HERO — tela cheia com reveal ao clicar */}
      <section
        id="top"
        onClick={revealed ? undefined : reveal}
        className={`relative h-screen w-full overflow-hidden select-none ${revealed ? "" : "cursor-pointer"}`}
      >
        {/* Grade de miniaturas ao fundo */}
      <motion.div
        aria-hidden={!revealed}
        className="absolute inset-0 z-0 grid grid-cols-2 auto-rows-[25vh] md:grid-cols-4 md:auto-rows-[50vh]"
        initial="hidden"
        animate={revealed ? "shown" : "hidden"}
        variants={{
          shown: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
          hidden: {},
        }}
      >
        {tiles.map((tile, i) => (
          <motion.figure
            key={tile.src}
            className="relative m-0 overflow-hidden"
            variants={{
              hidden: { opacity: 0, scale: 1.08, filter: "blur(12px)" },
              shown: {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                transition: { duration: 1, ease: [0.25, 1, 0.5, 1] },
              },
            }}
          >
            <Image
              src={tile.src || "/placeholder.svg"}
              alt={tile.label}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover saturate-[0.55] transition-all duration-700 ease-cinematic hover:saturate-100 hover:scale-105"
              priority={i < 4}
            />
            <span className="pointer-events-none absolute inset-0 bg-background/45" />
            <AnimatePresence>
              {revealed && (
                <motion.figcaption
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className="absolute bottom-3 left-3 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/70"
                >
                  {tile.label}
                </motion.figcaption>
              )}
            </AnimatePresence>
          </motion.figure>
        ))}
      </motion.div>

      {/* Véu de leitura */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-background/40 via-background/10 to-background/60" />

      {/* Nome central fixo */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
          className="font-display text-[19vw] font-normal uppercase leading-[0.82] tracking-[0.02em] text-foreground md:text-[15vw]"
          style={{ textShadow: '0 8px 40px rgba(0,0,0,0.55)' }}
        >
          Vitor Oliveira
        </motion.h1>

        <AnimatePresence>
          {!revealed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.35, 1, 0.35] }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { repeat: Number.POSITIVE_INFINITY, duration: 2.4, ease: "easeInOut" } }}
              className="mt-8 text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground"
            >
              Clique para explorar
            </motion.p>
          )}
        </AnimatePresence>
      </div>

        {/* Intro inferior esquerda */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 1, 0.5, 1] }}
              className="absolute bottom-8 left-6 z-30 max-w-sm md:left-10"
            >
              <p className="text-pretty text-sm leading-relaxed text-foreground/85">
                Olá! Eu sou o Vitor, um editor de vídeo independente especializado em cortes dinâmicos, motion e
                narrativa visual. Ajudo marcas a contar suas histórias com um trabalho criativo cuidadoso e distinto.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Navbar fixa (aparece após o reveal) */}
      <AnimatePresence>
        {revealed && (
          <motion.header
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-border/50 bg-background/70 px-6 py-5 backdrop-blur-md md:px-10"
          >
            <a href="#top" className="font-serif text-lg font-medium tracking-tight text-foreground">
              Vitor Oliveira
            </a>

            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-xs font-medium uppercase tracking-[0.3em] text-foreground/80 transition-colors hover:text-accent"
                >
                  {link}
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={light ? "Ativar modo escuro" : "Ativar modo claro"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:border-accent hover:text-accent"
            >
              {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Seções reveladas */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ProjectsSection onOpenVideo={openVideo} />
            <AboutSection />
            <ContactSection />
          </motion.div>
        )}
      </AnimatePresence>

      <VideoModal videoId={modalVideoId} open={modalOpen} onClose={closeVideo} />
    </main>
  )
}
