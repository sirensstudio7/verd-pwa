import type {
  Batch,
  BatchFilters,
  CreateBatchInput,
  DataAdapter,
  FacilityStatus,
  UpdateBatchStepInput,
} from '@/lib/api/types'
import {
  getAllBatches,
  getBatchById,
  getNextBatchNumber,
  isDbSeeded,
  markDbSeeded,
  putBatch,
  putBatches,
  setMeta,
} from '@/lib/db'
import { SEED_BATCHES } from '@/lib/mock/seed'
import { filterBatches, getSeedBatch, getSeedBatches } from '@/lib/mock/filters'
import { DEFAULT_FACILITY } from '@/lib/streams/definitions'
import { getStreamById } from '@/lib/streams/definitions'

function isBrowser() {
  return typeof window !== 'undefined'
}

async function ensureSeeded() {
  if (!isBrowser()) return
  if (!(await isDbSeeded())) {
    await putBatches(SEED_BATCHES)
    await setMeta('nextBatchNumber', 12)
    await markDbSeeded()
  }
}

function extractWeight(batch: Batch): number {
  const values = Object.values(batch.stepData).flatMap((step) =>
    Object.entries(step)
      .filter(([key]) => key.toLowerCase().includes('weight') || key === 'outputVolume')
      .map(([, v]) => (typeof v === 'number' ? v : 0)),
  )
  return values.length > 0 ? Math.max(...values) : 0
}

function computeCredits(batch: Batch): number {
  const weight = batch.weightKg || extractWeight(batch)
  return Math.round(weight * 0.42 * 100) / 100
}

export class MockAdapter implements DataAdapter {
  async getFacility() {
    if (!isBrowser()) return DEFAULT_FACILITY
    await ensureSeeded()
    return DEFAULT_FACILITY
  }

  async getFacilityStatus(facilityId: string): Promise<FacilityStatus> {
    if (!isBrowser()) return { facilityId, online: true }
    await ensureSeeded()
    return { facilityId, online: navigator.onLine }
  }

  async getBatches(filters: BatchFilters): Promise<Batch[]> {
    if (!isBrowser()) return getSeedBatches(filters)
    await ensureSeeded()
    const all = await getAllBatches()
    return filterBatches(all, filters)
  }

  async getBatch(id: string): Promise<Batch | null> {
    if (!isBrowser()) return getSeedBatch(id)
    await ensureSeeded()
    const batch = await getBatchById(id)
    return batch ?? null
  }

  async createBatch(input: CreateBatchInput): Promise<Batch> {
    await ensureSeeded()
    const stream = getStreamById(input.streamId)
    if (!stream) throw new Error(`Unknown stream: ${input.streamId}`)

    const batchNumber = await getNextBatchNumber()
    const now = new Date().toISOString()
    const batch: Batch = {
      id: `batch-${crypto.randomUUID().slice(0, 8)}`,
      facilityId: input.facilityId,
      streamId: input.streamId,
      batchNumber,
      status: 'in_progress',
      currentStep: 0,
      stepData: {},
      weightKg: 0,
      createdAt: now,
      updatedAt: now,
    }
    await putBatch(batch)
    return batch
  }

  async updateBatchStep(input: UpdateBatchStepInput): Promise<Batch> {
    const batch = await getBatchById(input.batchId)
    if (!batch) throw new Error(`Batch not found: ${input.batchId}`)

    const stream = getStreamById(batch.streamId)
    if (!stream) throw new Error(`Unknown stream: ${batch.streamId}`)

    const step = stream.steps[input.stepIndex]
    if (!step) throw new Error(`Invalid step index: ${input.stepIndex}`)

    const updated: Batch = {
      ...batch,
      stepData: {
        ...batch.stepData,
        [step.id]: input.data,
      },
      updatedAt: new Date().toISOString(),
    }

    updated.weightKg = extractWeight(updated)

    if (input.advance) {
      const isLastDataStep = input.stepIndex === stream.steps.length - 2
      updated.currentStep = input.stepIndex + 1
      if (isLastDataStep) {
        updated.status = 'ready_to_mint'
      } else if (updated.status === 'draft') {
        updated.status = 'in_progress'
      }
    }

    await putBatch(updated)
    return updated
  }

  async mintBatch(batchId: string): Promise<Batch> {
    const batch = await getBatchById(batchId)
    if (!batch) throw new Error(`Batch not found: ${batchId}`)

    const updated: Batch = {
      ...batch,
      status: 'minted',
      currentStep: getStreamById(batch.streamId)!.steps.length - 1,
      creditAmount: computeCredits(batch),
      mintedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    await putBatch(updated)
    return updated
  }
}

export const mockAdapter = new MockAdapter()
