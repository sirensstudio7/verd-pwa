'use client'

import gsap from 'gsap'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef } from 'react'

interface PageTransitionProps {
  children: React.ReactNode
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const contentRef = useRef<HTMLDivElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)
  const isFirstMount = useRef(true)
  const skipReveal = useRef(false)

  useLayoutEffect(() => {
    const content = contentRef.current
    const curtain = curtainRef.current
    if (!content || !curtain) return

    const reduced = prefersReducedMotion()
    gsap.killTweensOf([content, curtain])

    if (isFirstMount.current) {
      isFirstMount.current = false
      skipReveal.current = true
      gsap.set(curtain, { autoAlpha: 0 })

      if (reduced) {
        gsap.set(content, { autoAlpha: 1, scale: 1 })
        return
      }

      gsap.set(content, { autoAlpha: 0, scale: 0.988 })
      gsap.to(content, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.55,
        ease: 'power3.out',
        clearProps: 'transform',
      })
      return
    }

    if (reduced) {
      gsap.set(curtain, { autoAlpha: 0 })
      gsap.set(content, { autoAlpha: 1, clearProps: 'all' })
      return
    }

    gsap.set(curtain, { autoAlpha: 1 })
    gsap.set(content, { autoAlpha: 0, scale: 0.992 })
  }, [pathname])

  useEffect(() => {
    if (skipReveal.current) {
      skipReveal.current = false
      return
    }

    const content = contentRef.current
    const curtain = curtainRef.current
    if (!content || !curtain) return

    if (prefersReducedMotion()) return

    const timeline = gsap.timeline()
    timeline
      .to(content, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.48,
        ease: 'power3.out',
        clearProps: 'transform',
      })
      .to(
        curtain,
        {
          autoAlpha: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        },
        0.06,
      )

    return () => {
      timeline.kill()
    }
  }, [pathname])

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <div ref={contentRef} className="flex min-h-0 flex-1 flex-col">
        {children}
      </div>
      <div
        ref={curtainRef}
        className="pointer-events-none absolute inset-0 z-10 bg-background"
        aria-hidden
      />
    </div>
  )
}
