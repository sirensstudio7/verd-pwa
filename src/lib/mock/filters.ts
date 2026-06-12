import type { Batch, BatchFilters } from '@/lib/api/types'
import { getStreamById } from '@/lib/streams/definitions'
import { SEED_BATCHES } from '@/lib/mock/seed'

export function filterBatches(batches: Batch[], filters: BatchFilters): Batch[] {
  return batches
    .filter((b) => b.facilityId === filters.facilityId)
    .filter((b) => {
      if (!filters.category) return true
      const stream = getStreamById(b.streamId)
      return stream?.category === filters.category
    })
    .filter((b) => {
      if (!filters.status?.length) return true
      return filters.status.includes(b.status)
    })
    .sort((a, b) => b.batchNumber - a.batchNumber)
}

export function getSeedBatches(filters: BatchFilters): Batch[] {
  return filterBatches(SEED_BATCHES, filters)
}

export function getSeedBatch(id: string): Batch | null {
  return SEED_BATCHES.find((b) => b.id === id) ?? null
}
