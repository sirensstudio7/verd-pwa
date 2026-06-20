'use client'

import { useMemo, useState } from 'react'
import { BatchCard } from '@/components/dashboard/BatchCard'
import { BatchListFilters } from '@/components/dashboard/BatchListFilters'
import { Skeleton } from '@/components/ui/skeleton'
import type { Batch } from '@/lib/api/types'
import { filterBatches, type BatchStatusFilter } from '@/lib/batches/filter-batches'
import { useTranslation } from '@/lib/i18n/LocaleProvider'

interface FilteredBatchListProps {
  batches: Batch[]
  isLoading: boolean
  onBatchClick: (batch: Batch) => void
}

function BatchRowSkeleton() {
  return (
    <div className="flex items-center gap-3.5 py-3.5">
      <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3 rounded-md" />
        <Skeleton className="h-3 w-1/3 rounded-md" />
      </div>
      <Skeleton className="h-5 w-12 rounded-md" />
    </div>
  )
}

export function FilteredBatchList({
  batches,
  isLoading,
  onBatchClick,
}: FilteredBatchListProps) {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<BatchStatusFilter>('all')

  const filteredBatches = useMemo(
    () => filterBatches(batches, query, status),
    [batches, query, status],
  )

  const hasActiveFilters = query.trim().length > 0 || status !== 'all'

  if (isLoading) {
    return (
      <div className="divide-y divide-border/50">
        <BatchRowSkeleton />
        <BatchRowSkeleton />
      </div>
    )
  }

  if (batches.length === 0) {
    return null
  }

  return (
    <>
      <BatchListFilters
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
      />

      {filteredBatches.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/70 bg-white/60 px-5 py-8 text-center">
          <p className="text-sm text-muted-foreground">{t('batch.noMatchingBatches')}</p>
        </div>
      ) : (
        <>
          {hasActiveFilters && (
            <p className="mb-3 text-xs tabular-nums text-muted-foreground">
              {filteredBatches.length}/{batches.length}
            </p>
          )}
          <div className="divide-y divide-border/50">
            {filteredBatches.map((batch) => (
              <BatchCard key={batch.id} batch={batch} onClick={() => onBatchClick(batch)} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
