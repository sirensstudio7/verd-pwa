import type { Batch, BatchStatus } from '@/lib/api/types'
import { getStreamById } from '@/lib/streams/definitions'

export type BatchStatusFilter = 'all' | BatchStatus

export function filterBatches(
  batches: Batch[],
  query: string,
  status: BatchStatusFilter,
): Batch[] {
  const normalizedQuery = query.trim().toLowerCase()

  return batches.filter((batch) => {
    if (status !== 'all' && batch.status !== status) return false
    if (!normalizedQuery) return true

    const stream = getStreamById(batch.streamId)
    const batchNumber = String(batch.batchNumber)
    const searchable = [
      batchNumber,
      `#${batchNumber}`,
      stream?.productLabel,
      stream?.name,
      stream?.pipelineLabel,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return searchable.includes(normalizedQuery)
  })
}
