'use client'

import { useRouter } from 'next/navigation'
import type { Batch } from '@/lib/api/types'
import { getStreamById } from '@/lib/streams/definitions'

export function useBatchNavigation() {
  const router = useRouter()

  return (batch: Batch) => {
    if (batch.status === 'minted') {
      router.push(`/batches/${batch.id}`)
      return
    }
    const streamDef = getStreamById(batch.streamId)
    const mintStepIndex = streamDef?.steps.length
    const step =
      batch.status === 'ready_to_mint'
        ? (mintStepIndex ?? 1) - 1
        : batch.currentStep

    const params = new URLSearchParams({ step: String(step), batchId: batch.id })
    router.push(`/streams/${batch.streamId}?${params.toString()}`)
  }
}
