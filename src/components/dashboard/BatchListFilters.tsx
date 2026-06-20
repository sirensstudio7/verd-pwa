'use client'

import type { BatchStatusFilter } from '@/lib/batches/filter-batches'
import { StatusFilterDropdown } from '@/components/dashboard/StatusFilterDropdown'
import { useTranslation } from '@/lib/i18n/LocaleProvider'
import { Search, X } from 'lucide-react'

interface BatchListFiltersProps {
  query: string
  status: BatchStatusFilter
  onQueryChange: (query: string) => void
  onStatusChange: (status: BatchStatusFilter) => void
}

export function BatchListFilters({
  query,
  status,
  onQueryChange,
  onStatusChange,
}: BatchListFiltersProps) {
  const { t } = useTranslation()

  return (
    <div className="mb-4 flex gap-2">
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={t('batch.searchPlaceholder')}
          className="h-10 w-full rounded-xl border border-border/70 bg-white py-2 pl-9 pr-9 text-sm text-foreground shadow-black/[0.02] placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            aria-label={t('batch.clearSearch')}
            className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted/80 hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <StatusFilterDropdown value={status} onChange={onStatusChange} />
    </div>
  )
}
