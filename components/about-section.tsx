"use client"

import Image from "next/image"
import { motion } from "motion/react"

const stats = [
  { value: "8+", label: "Anos de experiência" },
  { value: "240", label: "Projetos entregues" },
  { value: "50M", label: "Views acumuladas" },
]

const tools = ["Premiere Pro", "After Effects", "DaVinci Resolve", "Motion", "Cinema 4D"]

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 border-t border-border bg-background px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border"
        >
          <Image
            src="/work-reel-2.png"
            alt="Retrato de Vitor Oliveira"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover saturate-[0.6]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col gap-6"
        >
          <span className="text-xs font-medium uppercase tracking-[0.4em] text-accent">Sobre</span>
          <h2 className="font-display text-6xl uppercase leading-none tracking-wide text-foreground md:text-8xl">
            Quem sou
          </h2>
          <div className="flex flex-col gap-4 text-pretty text-sm leading-relaxed text-muted-foreground">
            <p>
              Sou o Vitor Oliveira, editor de vídeo e motion designer com base no Brasil. Nos últimos anos, transformei
              horas de material bruto em histórias que prendem a atenção e emocionam — de comerciais de alto padrão a
              conteúdo diário para criadores.
            </p>
            <p>
              Meu processo une ritmo, color grading intencional e uma obsessão por detalhes. Acredito que a edição é
              onde a história realmente ganha vida.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl text-foreground md:text-5xl">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-border px-4 py-1.5 text-xs font-medium tracking-wide text-foreground/80"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
