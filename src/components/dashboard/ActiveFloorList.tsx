'use client'

import { SectionHeader } from '@/components/layout/SectionHeader'
import { FilteredBatchList } from '@/components/dashboard/FilteredBatchList'
import { Skeleton } from '@/components/ui/skeleton'
import type { Batch } from '@/lib/api/types'
import { useTranslation } from '@/lib/i18n/LocaleProvider'
import { Layers } from 'lucide-react'

export { BatchCard } from '@/components/dashboard/BatchCard'

interface ActiveFloorListProps {
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

export function ActiveFloorList({ batches, isLoading, onBatchClick }: ActiveFloorListProps) {
  const { t } = useTranslation()

  return (
    <section className="mb-10">
      <SectionHeader
        title={t('dashboard.activeOnFloor')}
        count={!isLoading && batches.length > 0 ? batches.length : undefined}
      />
      {isLoading ? (
        <div className="divide-y divide-border/50">
          <BatchRowSkeleton />
          <BatchRowSkeleton />
        </div>
      ) : batches.length === 0 ? (
        <div className="py-8 text-center">
          <div
            className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary text-primary"
            aria-hidden
          >
            <Layers className="h-10 w-10" strokeWidth={1.5} />
          </div>
          <p className="text-lg font-medium text-foreground">{t('dashboard.noActiveBatches')}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('dashboard.startNewStream')}
          </p>
        </div>
      ) : (
        <FilteredBatchList
          batches={batches}
          isLoading={false}
          onBatchClick={onBatchClick}
        />
      )}
    </section>
  )
}
