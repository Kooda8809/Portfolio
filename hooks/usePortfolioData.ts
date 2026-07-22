"use client"

import { useState, useEffect } from 'react'
import { fetchPortfolioData, Projeto } from '@/lib/sheets'

interface UsePortfolioDataReturn {
  projetos: Projeto[]
  loading: boolean
  error: string | null
  retry: () => void
}

export function usePortfolioData(): UsePortfolioDataReturn {
  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  function retry() {
    setLoading(true)
    setError(null)
    setRetryCount((c) => c + 1)
  }

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const dados = await fetchPortfolioData()
        if (!cancelled) {
          setProjetos(dados)
          setLoading(false)
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const message =
            err instanceof Error
              ? err.message.includes('Failed to fetch') || err.message.includes('NetworkError')
                ? 'Verifique sua conexão e tente novamente.'
                : 'Erro ao acessar a planilha. Confirme se ela está publicada na web.'
              : 'Erro desconhecido.'
          setError(message)
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [retryCount])

  return { projetos, loading, error, retry }
}