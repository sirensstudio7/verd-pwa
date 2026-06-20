'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ActiveFloorList } from '@/components/dashboard/ActiveFloorList'
import { AppHeader } from '@/components/layout/AppHeader'
import { PageContent } from '@/components/layout/PageContent'
import { useBatches, useFacility } from '@/lib/api/batches'
import type { StreamCategory } from '@/lib/api/types'
import { useBatchNavigation } from '@/hooks/useBatchNavigation'
import { getStreamsByCategory } from '@/lib/streams/definitions'

export default function DashboardPage() {
  const router = useRouter()
  const { data: facility } = useFacility()
  const [category, setCategory] = useState<StreamCategory>('plastic')
  const { data: batches = [], isPending, isFetching } = useBatches(category)
  const showBatchLoading = isPending && isFetching && batches.length === 0
  const navigateBatch = useBatchNavigation()
  const streams = getStreamsByCategory(category)

  return (
    <>
      <AppHeader
        title={facility?.name}
        subtitle={facility?.label}
        categoryTab={{
          value: category,
          onChange: setCategory,
          streams,
          onStreamClick: (streamId) => router.push(`/streams/${streamId}?step=0`),
        }}
      />

      <PageContent>
        <ActiveFloorList
          batches={batches}
          isLoading={showBatchLoading}
          onBatchClick={navigateBatch}
        />
      </PageContent>
    </>
  )
}
