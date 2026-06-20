'use client'

import type { BatchStatusFilter } from '@/lib/batches/filter-batches'
import { useTranslation } from '@/lib/i18n/LocaleProvider'
import { cn } from '@/lib/utils'
import { Check, ListFilter } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'

const statusFilters: BatchStatusFilter[] = [
  'all',
  'in_progress',
  'ready_to_mint',
  'minted',
]

const statusDotClass: Record<BatchStatusFilter, string> = {
  all: 'bg-muted-foreground/40',
  in_progress: 'bg-amber-500',
  ready_to_mint: 'bg-emerald-500',
  minted: 'bg-primary',
  draft: 'bg-muted-foreground/40',
}

interface StatusFilterDropdownProps {
  value: BatchStatusFilter
  onChange: (value: BatchStatusFilter) => void
}

export function StatusFilterDropdown({ value, onChange }: StatusFilterDropdownProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()

  const statusLabel = (filter: BatchStatusFilter) => {
    switch (filter) {
      case 'all':
        return t('batch.filter.all')
      case 'in_progress':
        return t('batch.inProgress')
      case 'ready_to_mint':
        return t('batch.readyToMint')
      case 'minted':
        return t('batch.minted')
      default:
        return t('batch.draft')
    }
  }

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return
      setOpen(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const select = (filter: BatchStatusFilter) => {
    onChange(filter)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-label={t('batch.filter.status')}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          'relative flex size-10 cursor-pointer items-center justify-center rounded-xl border bg-white shadow-black/[0.02] transition',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
          value !== 'all'
            ? 'border-primary/30 text-primary ring-1 ring-primary/15'
            : 'border-border/70 text-muted-foreground hover:text-foreground',
        )}
      >
        <ListFilter className="h-4 w-4" strokeWidth={2} />
        {value !== 'all' && (
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary" aria-hidden />
        )}
      </button>

      {open && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={t('batch.filter.status')}
          className="absolute right-0 top-[calc(100%+0.375rem)] z-50 min-w-[11.5rem] overflow-hidden rounded-2xl border border-border/60 bg-white p-1.5 shadow-[var(--shadow-float)]"
        >
          {statusFilters.map((filter) => {
            const active = value === filter
            return (
              <button
                key={filter}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => select(filter)}
                className={cn(
                  'flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition',
                  active
                    ? 'bg-primary/8 font-medium text-foreground'
                    : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                )}
              >
                <span
                  className={cn('size-2 shrink-0 rounded-full', statusDotClass[filter])}
                  aria-hidden
                />
                <span className="min-w-0 flex-1">{statusLabel(filter)}</span>
                {active && <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
