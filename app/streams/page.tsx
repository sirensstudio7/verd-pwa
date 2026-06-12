'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AppHeader } from '@/components/layout/AppHeader'
import { useFacility } from '@/lib/api/batches'
import type { StreamCategory } from '@/lib/api/types'
import { getStreamsByCategory } from '@/lib/streams/definitions'
import { useOfflineDemo } from '@/hooks/useOfflineDemo'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'

export default function StreamsPage() {
  const router = useRouter()
  const { data: facility } = useFacility()
  const { simulateOffline } = useOfflineDemo()
  const online = useOnlineStatus(simulateOffline)
  const [category, setCategory] = useState<StreamCategory>('plastic')
  const streams = getStreamsByCategory(category)

  return (
    <AppHeader
      title="Start New"
      subtitle={facility?.label ?? 'Select a processing stream'}
      online={online}
      categoryTab={{
        value: category,
        onChange: setCategory,
        streams,
        onStreamClick: (streamId) => router.push(`/streams/${streamId}?step=0`),
      }}
    />
  )
}
