'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { StreamCategory } from '@/lib/api/types'
import { useTranslation } from '@/lib/i18n/LocaleProvider'
import { getCategoryIcon } from '@/lib/streams/icons'

interface ModeTabsProps {
  value: StreamCategory
  onChange: (value: StreamCategory) => void
  embedded?: boolean
}

interface IndicatorRect {
  x: number
  width: number
}

export function ModeTabs({ value, onChange, embedded }: ModeTabsProps) {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  const safeValue: StreamCategory =
    value === 'plastic' || value === 'organic' ? value : 'plastic'

  const tabs: { value: StreamCategory; label: string }[] = [
    { value: 'plastic', label: t('category.plastic') },
    { value: 'organic', label: t('category.organic') },
  ]

  const activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.value === safeValue),
  )

  const [indicator, setIndicator] = useState<IndicatorRect>({ x: 0, width: 0 })

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const measure = () => {
      const buttons = container.querySelectorAll<HTMLButtonElement>('[data-mode-tab]')
      const target = buttons[activeIndex]
      if (!target) return

      setIndicator({
        x: target.offsetLeft,
        width: target.offsetWidth,
      })
      setReady(true)
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(container)
    for (const button of container.querySelectorAll('[data-mode-tab]')) {
      observer.observe(button)
    }

    return () => observer.disconnect()
  }, [activeIndex, tabs[0].label, tabs[1].label])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative isolate flex rounded-2xl bg-muted/60 p-1',
        embedded ? 'ring-1 ring-border/40' : 'mb-7 ring-1 ring-border/50',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute top-1 bottom-1 left-0 z-0 rounded-xl bg-primary shadow-sm',
          ready &&
            'transition-[transform,width] duration-500 ease-[cubic-bezier(0.34,1.24,0.64,1)] motion-reduce:transition-none',
        )}
        style={{
          width: indicator.width || undefined,
          transform: `translateX(${indicator.x}px)`,
        }}
      />

      {tabs.map((tab) => {
        const active = safeValue === tab.value
        const Icon = getCategoryIcon(tab.value)
        return (
          <button
            key={tab.value}
            type="button"
            data-mode-tab
            onClick={() => onChange(tab.value)}
            className={cn(
              'relative z-10 flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium',
              'transition-colors duration-300 ease-out motion-reduce:transition-none',
              active
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon
              className={cn(
                'relative z-10 h-4 w-4 transition-colors duration-300 ease-out',
                active ? 'text-white' : 'text-current',
              )}
            />
            <span className="relative z-10">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
