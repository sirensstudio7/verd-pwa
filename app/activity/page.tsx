'use client'

import { useState } from 'react'
import { BatchCard } from '@/components/dashboard/ActiveFloorList'
import { AppHeader } from '@/components/layout/AppHeader'
import { PageContent } from '@/components/layout/PageContent'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { Skeleton } from '@/components/ui/skeleton'
import { useAllBatches, useFacility } from '@/lib/api/batches'
import type { StreamCategory } from '@/lib/api/types'
import { useBatchNavigation } from '@/hooks/useBatchNavigation'
import { useOfflineDemo } from '@/hooks/useOfflineDemo'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'

export default function ActivityPage() {
  const { data: facility } = useFacility()
  const { simulateOffline } = useOfflineDemo()
  const online = useOnlineStatus(simulateOffline)
  const [category, setCategory] = useState<StreamCategory>('plastic')
  const { data: batches = [], isPending, isFetching } = useAllBatches(category)
  const showLoading = isPending && isFetching && batches.length === 0
  const navigateBatch = useBatchNavigation()

  return (
    <>
      <AppHeader
        title="Batch History"
        subtitle={facility?.label}
        online={online}
        categoryTab={{ value: category, onChange: setCategory }}
      />

      <PageContent>
        <section>
          <SectionHeader
            title="All batches"
            count={!showLoading ? batches.length : undefined}
            countLabel="total"
          />
          {showLoading ? (
            <div className="divide-y divide-border/50">
              <div className="flex items-center gap-3.5 py-3.5">
                <Skeleton className="h-11 w-11 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
                <Skeleton className="h-5 w-12" />
              </div>
              <div className="flex items-center gap-3.5 py-3.5">
                <Skeleton className="h-11 w-11 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
                <Skeleton className="h-5 w-12" />
              </div>
            </div>
          ) : batches.length === 0 ? (
            <div className="overflow-hidden rounded-2xl border border-dashed border-border/70 bg-white/60 px-5 py-10 text-center">
              <p className="text-sm text-muted-foreground">No batches yet for this category.</p>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {batches.map((batch) => (
                <BatchCard key={batch.id} batch={batch} onClick={() => navigateBatch(batch)} />
              ))}
            </div>
          )}
        </section>
      </PageContent>
    </>
  )
}
