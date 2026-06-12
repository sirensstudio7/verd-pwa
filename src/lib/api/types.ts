export type StreamCategory = 'plastic' | 'organic'

export type BatchStatus =
  | 'draft'
  | 'in_progress'
  | 'ready_to_mint'
  | 'minted'

export type StepFieldType =
  | 'polymer'
  | 'weight'
  | 'number'
  | 'select'
  | 'text'

export interface StepField {
  id: string
  label: string
  hint?: string
  type: StepFieldType
  unit?: string
  step?: number
  min?: number
  max?: number
  options?: { value: string; label: string }[]
  placeholder?: string
}

export interface StreamStep {
  id: string
  title: string
  description?: string
  actionLabel: string
  fields: StepField[]
}

export interface StreamDefinition {
  id: string
  category: StreamCategory
  name: string
  icon: string
  accentColor: string
  accentBg: string
  pipelineLabel: string
  productLabel: string
  steps: StreamStep[]
}

export interface BatchStepData {
  [fieldId: string]: string | number
}

export interface Batch {
  id: string
  facilityId: string
  streamId: string
  batchNumber: number
  status: BatchStatus
  currentStep: number
  stepData: Record<string, BatchStepData>
  weightKg: number
  createdAt: string
  updatedAt: string
  mintedAt?: string
  creditAmount?: number
}

export interface Facility {
  id: string
  name: string
  label: string
}

export interface FacilityStatus {
  facilityId: string
  online: boolean
}

export interface CreateBatchInput {
  facilityId: string
  streamId: string
}

export interface UpdateBatchStepInput {
  batchId: string
  stepIndex: number
  data: BatchStepData
  advance?: boolean
}

export interface BatchFilters {
  facilityId: string
  category?: StreamCategory
  status?: BatchStatus[]
}

export interface DataAdapter {
  getFacility(): Promise<Facility>
  getFacilityStatus(facilityId: string): Promise<FacilityStatus>
  getBatches(filters: BatchFilters): Promise<Batch[]>
  getBatch(id: string): Promise<Batch | null>
  createBatch(input: CreateBatchInput): Promise<Batch>
  updateBatchStep(input: UpdateBatchStepInput): Promise<Batch>
  mintBatch(batchId: string): Promise<Batch>
}
