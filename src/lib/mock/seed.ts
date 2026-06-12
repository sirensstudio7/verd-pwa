import type { Batch } from '@/lib/api/types'
import { FACILITY_ID } from '@/lib/streams/definitions'

export const SEED_BATCHES: Batch[] = [
  {
    id: 'batch-12',
    facilityId: FACILITY_ID,
    streamId: 'clean-pet-hdpe',
    batchNumber: 12,
    status: 'in_progress',
    currentStep: 1,
    stepData: {
      'washing-shredding': {
        polymer: 'PET',
        inputWeight: 640,
      },
    },
    weightKg: 640,
    createdAt: '2026-06-08T08:00:00.000Z',
    updatedAt: '2026-06-09T10:30:00.000Z',
  },
  {
    id: 'batch-09',
    facilityId: FACILITY_ID,
    streamId: 'high-calorific-rdf',
    batchNumber: 9,
    status: 'ready_to_mint',
    currentStep: 3,
    stepData: {
      'shred-mix': { inputWeight: 1200 },
      pelletizing: { moisture: 8 },
      output: { outputWeight: 1150 },
    },
    weightKg: 1150,
    createdAt: '2026-06-07T14:00:00.000Z',
    updatedAt: '2026-06-09T09:00:00.000Z',
  },
]
