'use client'

import { useEffect, useRef, useState } from 'react'
import { PLANT_MODEL_SRC } from '@/lib/preload-plant-model'
import { cn } from '@/lib/utils'

const MODEL_VIEWER_SRC = '/vendor/model-viewer.min.js'

interface PlantModelViewerProps {
  className?: string
}

function loadModelViewerScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (customElements.get('model-viewer')) return Promise.resolve()

  const existing = document.querySelector(`script[src="${MODEL_VIEWER_SRC}"]`)
  if (existing) {
    return customElements.whenDefined('model-viewer').then(() => undefined)
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'module'
    script.src = MODEL_VIEWER_SRC
    script.onload = () => {
      customElements.whenDefined('model-viewer').then(() => resolve()).catch(reject)
    }
    script.onerror = () => reject(new Error('Failed to load model-viewer'))
    document.head.appendChild(script)
  })
}

export function PlantModelViewer({ className }: PlantModelViewerProps) {
  const viewerRef = useRef<HTMLElement>(null)
  const [ready, setReady] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false

    loadModelViewerScript()
      .then(() => {
        if (!cancelled) setReady(true)
      })
      .catch(() => {
        if (!cancelled) setLoaded(true)
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const el = viewerRef.current
    if (!el || !ready) return

    el.setAttribute('src', PLANT_MODEL_SRC)

    const handleLoad = () => setLoaded(true)
    const handleError = () => setLoaded(true)

    el.addEventListener('load', handleLoad)
    el.addEventListener('error', handleError)

    const viewer = el as HTMLElement & { loaded?: boolean; modelIsVisible?: boolean }
    if (viewer.loaded || viewer.modelIsVisible) {
      handleLoad()
    }

    return () => {
      el.removeEventListener('load', handleLoad)
      el.removeEventListener('error', handleError)
    }
  }, [ready])

  return (
    <div className={cn('relative isolate h-full w-full min-h-[288px] overflow-hidden', className)}>
      {!loaded && (
        <div
          className="pointer-events-none absolute inset-0 animate-pulse rounded-xl bg-muted/60"
          aria-hidden
        />
      )}
      {ready && (
        <model-viewer
          ref={viewerRef}
          alt="Verdana processing plant"
          loading="eager"
          auto-rotate
          rotation-per-second="20deg"
          interaction-prompt="none"
          shadow-intensity="0.4"
          exposure="1"
          camera-orbit="auto auto 120%"
          min-camera-orbit="auto auto 80%"
          max-camera-orbit="auto auto 200%"
          field-of-view="30deg"
          className={cn(
            'block h-full w-full min-h-[288px] transition-opacity duration-500',
            loaded ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        />
      )}
    </div>
  )
}
