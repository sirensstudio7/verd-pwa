import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { dataAdapter } from '@/lib/api/adapter'
import type {
  BatchFilters,
  CreateBatchInput,
  StreamCategory,
  UpdateBatchStepInput,
} from '@/lib/api/types'
import { useIsClient } from '@/hooks/useIsClient'
import { getSeedBatch, getSeedBatches } from '@/lib/mock/filters'
import { DEFAULT_FACILITY, FACILITY_ID } from '@/lib/streams/definitions'

export const queryKeys = {
  facility: ['facility'] as const,
  facilityStatus: (id: string) => ['facilityStatus', id] as const,
  batches: (filters: BatchFilters) => ['batches', filters] as const,
  batch: (id: string) => ['batch', id] as const,
}

export function useFacility() {
  const isClient = useIsClient()
  return useQuery({
    queryKey: queryKeys.facility,
    queryFn: () => dataAdapter.getFacility(),
    enabled: isClient,
    initialData: DEFAULT_FACILITY,
    staleTime: Infinity,
  })
}

export function useFacilityStatus(facilityId = FACILITY_ID) {
  const isClient = useIsClient()
  return useQuery({
    queryKey: queryKeys.facilityStatus(facilityId),
    queryFn: () => dataAdapter.getFacilityStatus(facilityId),
    enabled: isClient,
    initialData: { facilityId, online: true },
    refetchInterval: isClient ? 30_000 : false,
    networkMode: 'offlineFirst',
  })
}

export function useBatches(category: StreamCategory) {
  const isClient = useIsClient()
  const filters: BatchFilters = {
    facilityId: FACILITY_ID,
    category,
    status: ['in_progress', 'ready_to_mint'],
  }
  return useQuery({
    queryKey: queryKeys.batches(filters),
    queryFn: () => dataAdapter.getBatches(filters),
    enabled: isClient,
    initialData: getSeedBatches(filters),
    networkMode: 'offlineFirst',
  })
}

export function useAllBatches(category?: StreamCategory) {
  const isClient = useIsClient()
  const filters: BatchFilters = {
    facilityId: FACILITY_ID,
    category,
  }
  return useQuery({
    queryKey: queryKeys.batches(filters),
    queryFn: () => dataAdapter.getBatches(filters),
    enabled: isClient,
    initialData: getSeedBatches(filters),
    networkMode: 'offlineFirst',
  })
}

export function useBatch(id: string) {
  const isClient = useIsClient()
  const seedBatch = id ? getSeedBatch(id) : null
  return useQuery({
    queryKey: queryKeys.batch(id),
    queryFn: () => dataAdapter.getBatch(id),
    enabled: isClient && !!id,
    initialData: seedBatch ?? undefined,
    networkMode: 'offlineFirst',
  })
}

export function useCreateBatch() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateBatchInput) => dataAdapter.createBatch(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batches'] })
    },
  })
}

export function useUpdateBatchStep() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: UpdateBatchStepInput) => dataAdapter.updateBatchStep(input),
    onSuccess: (batch) => {
      queryClient.invalidateQueries({ queryKey: ['batches'] })
      queryClient.setQueryData(queryKeys.batch(batch.id), batch)
    },
  })
}

export function useMintBatch() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (batchId: string) => dataAdapter.mintBatch(batchId),
    onSuccess: (batch) => {
      queryClient.invalidateQueries({ queryKey: ['batches'] })
      queryClient.setQueryData(queryKeys.batch(batch.id), batch)
    },
  })
}
