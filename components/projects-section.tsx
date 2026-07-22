"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { Play } from "lucide-react"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import type { Projeto } from "@/lib/sheets"

interface ProjectsSectionProps {
  onOpenVideo: (videoId: string) => void
}

function SkeletonCard() {
  return (
    <article className="rounded-xl border border-border bg-card" aria-hidden="true">
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 animate-pulse bg-muted" />
      </div>
      <div className="flex items-center justify-between p-5">
        <div className="flex flex-col gap-2">
          <div className="h-5 w-28 animate-pulse rounded bg-muted" />
          <div className="h-3 w-16 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-3 w-10 animate-pulse rounded bg-muted" />
      </div>
    </article>
  )
}

export function ProjectsSection({ onOpenVideo }: ProjectsSectionProps) {
  const { projetos, loading, error, retry } = usePortfolioData()

  return (
    <section id="projects" className="relative z-10 bg-background px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-4">
          <span className="text-xs font-medium uppercase tracking-[0.4em] text-accent">Portfólio</span>
          <h2 className="font-display text-6xl uppercase leading-none tracking-wide text-foreground md:text-8xl">
            Projetos
          </h2>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
            Uma seleção de trabalhos entre comerciais, conteúdo para YouTube e reels — cada um moldado no corte.
          </p>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-8 py-16 text-center">
            <span className="text-4xl" aria-hidden="true">
              {"\u26A0"}
            </span>
            <p className="font-serif text-xl text-foreground">Não foi possível carregar o portfólio</p>
            <p className="text-sm text-muted-foreground">{error}</p>
            <button
              type="button"
              onClick={retry}
              className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && projetos.length === 0 && (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-8 py-16 text-center">
            <span className="text-4xl" aria-hidden="true">
              {"\u26A0"}
            </span>
            <p className="font-serif text-xl text-foreground">Nenhum projeto encontrado</p>
            <p className="text-sm text-muted-foreground">
              Nenhum projeto encontrado na planilha. Verifique os dados e tente novamente.
            </p>
          </div>
        )}

        {/* Projects grid */}
        {!loading && !error && projetos.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projetos.map((projeto: Projeto, i: number) => (
              <article
                key={projeto.id}
                onClick={() => {
                  if (projeto.youtubeId) {
                    onOpenVideo(projeto.youtubeId)
                  }
                }}
                className={`group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card ${projeto.youtubeId ? "" : "cursor-default"}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={projeto.thumbnail || "/placeholder.svg"}
                    alt={`${projeto.titulo} — ${projeto.descricao}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover saturate-[0.7] transition-all duration-700 ease-cinematic group-hover:scale-105 group-hover:saturate-100"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                  {projeto.youtubeId && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground/40 bg-background/40 backdrop-blur-sm">
                        <Play className="h-5 w-5 fill-foreground text-foreground" />
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between p-5">
                  <div>
                    <h3 className="font-serif text-xl text-foreground">{projeto.titulo}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">{projeto.categoria}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}