"use client"

import { useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X } from "lucide-react"

interface VideoModalProps {
  videoId: string | null
  open: boolean
  onClose: () => void
}

export function VideoModal({ videoId, open, onClose }: VideoModalProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose()
      }
    },
    [open, onClose],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const src = videoId
    ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&modestbranding=1&autohide=1`
    : ""

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-4 backdrop-blur-lg"
          role="dialog"
          aria-modal="true"
          aria-label="Player de vídeo"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar vídeo"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-foreground/80 backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="aspect-video w-full">
              {videoId && (
                <iframe
                  ref={iframeRef}
                  src={src}
                  title="Player de vídeo"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}