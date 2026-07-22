"use client"

import { type ReactNode, useEffect, useState } from "react"
import { I18nProvider } from "@/lib/i18n"

export function I18nBootstrap({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return <I18nProvider>{children}</I18nProvider>
}