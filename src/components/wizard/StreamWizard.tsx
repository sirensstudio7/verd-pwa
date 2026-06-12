import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { AppHeader, HeaderTitle } from '@/components/layout/AppHeader'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { MintStep } from '@/components/wizard/MintStep'
import { PolymerToggle } from '@/components/wizard/PolymerToggle'
import { StepProgress } from '@/components/wizard/StepProgress'
import { WeightStepper } from '@/components/wizard/WeightStepper'
import { WizardFooterNotice } from '@/components/wizard/WizardFooterNotice'
import {
  useCreateBatch,
  useMintBatch,
  useUpdateBatchStep,
} from '@/lib/api/batches'
import type {
  Batch,
  BatchStepData,
  StepField,
  StreamDefinition,
  StreamStep,
} from '@/lib/api/types'
import { formatErrorMessage } from '@/lib/format'
import { FACILITY_ID } from '@/lib/streams/definitions'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'

interface StreamWizardProps {
  stream: StreamDefinition
  batch: Batch | null
  stepIndex: number
  simulateOffline: boolean
  onBack: () => void
  onStepChange: (step: number) => void
  onComplete: () => void
}

function getInitialData(
  batch: Batch | null,
  stepId: string,
  fields: StepField[],
): BatchStepData {
  const existing = batch?.stepData[stepId]
  if (existing) return { ...existing }

  const defaults: BatchStepData = {}
  for (const field of fields) {
    if (field.type === 'polymer' && field.options?.length) {
      defaults[field.id] = field.options[0].value
    } else {
      defaults[field.id] = 0
    }
  }
  return defaults
}

function validateStep(fields: StepField[], data: BatchStepData): boolean {
  for (const field of fields) {
    const value = data[field.id]
    if (field.type === 'polymer' || field.type === 'text') {
      if (!value || value === '') return false
    } else if (field.type === 'weight' || field.type === 'number') {
      const num = Number(value)
      if (Number.isNaN(num) || num <= (field.min ?? 0)) return false
    }
  }
  return true
}

interface WizardStepFormProps {
  step: StreamStep
  batch: Batch | null
  isSubmitting: boolean
  notice: { type: 'success' | 'error'; message: string } | null
  onSubmit: (data: BatchStepData) => void
}

function WizardStepForm({
  step,
  batch,
  isSubmitting,
  notice,
  onSubmit,
}: WizardStepFormProps) {
  const [formData, setFormData] = useState<BatchStepData>(() =>
    getInitialData(batch, step.id, step.fields),
  )

  const isValid = useMemo(
    () => validateStep(step.fields, formData),
    [step.fields, formData],
  )

  const handleFieldChange = (fieldId: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
  }

  return (
    <>
      <div className="min-h-0 flex-1 overflow-y-auto pb-4">
        <div className="glass-panel min-w-0 overflow-hidden p-5">
          <div className="mb-5">
            <h2 className="text-lg font-semibold leading-snug">{step.title}</h2>
            {step.description && (
              <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
            )}
          </div>

          <div className="space-y-5">
            {step.fields.map((field) => {
              if (field.type === 'polymer' && field.options) {
                return (
                  <div key={field.id} className="space-y-2">
                    <Label>{field.label}</Label>
                    <PolymerToggle
                      value={String(formData[field.id] ?? field.options[0].value)}
                      options={field.options}
                      onChange={(v) => handleFieldChange(field.id, v)}
                    />
                  </div>
                )
              }

              if (field.type === 'weight' || field.type === 'number') {
                return (
                  <WeightStepper
                    key={field.id}
                    label={field.label}
                    hint={field.hint}
                    value={Number(formData[field.id] ?? 0)}
                    unit={field.unit}
                    step={field.step}
                    min={field.min}
                    max={field.max}
                    onChange={(v) => handleFieldChange(field.id, v)}
                  />
                )
              }

              return null
            })}
          </div>
        </div>
      </div>

      <div className="shrink-0 -mx-5 border-t border-border/60 bg-white px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        {notice && <WizardFooterNotice type={notice.type} message={notice.message} />}
        <Button
          variant="default"
          size="lg"
          className="w-full"
          disabled={!isValid || isSubmitting}
          onClick={() => onSubmit(formData)}
        >
          {step.actionLabel}
        </Button>
      </div>
    </>
  )
}

export function StreamWizard({
  stream,
  batch,
  stepIndex,
  simulateOffline,
  onBack,
  onStepChange,
  onComplete,
}: StreamWizardProps) {
  const online = useOnlineStatus(simulateOffline)
  const createBatch = useCreateBatch()
  const updateStep = useUpdateBatchStep()
  const mintBatch = useMintBatch()

  const step = stream.steps[stepIndex]
  const isMintStep = step?.id === 'mint'
  const dataStepCount = stream.steps.length - 1

  const [localBatch, setLocalBatch] = useState<Batch | null>(batch)
  const [footerNotice, setFooterNotice] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)
  const activeBatch = localBatch ?? batch

  useEffect(() => {
    if (!footerNotice) return
    const timer = window.setTimeout(() => setFooterNotice(null), 2500)
    return () => window.clearTimeout(timer)
  }, [footerNotice])

  const isSubmitting = createBatch.isPending || updateStep.isPending

  const handleStepSubmit = async (formData: BatchStepData) => {
    if (!step) return

    try {
      let currentBatch = activeBatch

      if (!currentBatch) {
        currentBatch = await createBatch.mutateAsync({
          facilityId: FACILITY_ID,
          streamId: stream.id,
        })
        setLocalBatch(currentBatch)
      }

      const updated = await updateStep.mutateAsync({
        batchId: currentBatch.id,
        stepIndex,
        data: formData,
        advance: true,
      })
      setLocalBatch(updated)

      if (stepIndex < stream.steps.length - 2) {
        setFooterNotice({ type: 'success', message: 'Step saved' })
        onStepChange(stepIndex + 1)
      } else {
        setFooterNotice({ type: 'success', message: 'Batch ready to mint' })
        onStepChange(stream.steps.length - 1)
      }
    } catch (error) {
      setFooterNotice({
        type: 'error',
        message: formatErrorMessage(error) || 'Failed to save step',
      })
    }
  }

  const handleMint = async () => {
    if (!activeBatch) return
    try {
      await mintBatch.mutateAsync(activeBatch.id)
      toast.success('Credits minted successfully')
      onComplete()
    } catch (error) {
      toast.error(formatErrorMessage(error) || 'Failed to mint credits')
    }
  }

  if (!step) return null

  const header = (
    <AppHeader
      online={online}
      showBack
      hideTitle
      onBack={onBack}
    />
  )

  const currentStepTitle = step?.title

  const streamHeading = (
    <div className="mb-4 shrink-0">
      {currentStepTitle && (
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {currentStepTitle}
        </p>
      )}
      <HeaderTitle
        title={stream.name}
        category={stream.category}
      />
    </div>
  )

  const progress = (
    <StepProgress
      currentStep={stepIndex}
      totalSteps={dataStepCount}
      labels={stream.steps.slice(0, -1).map((s) => s.title)}
    />
  )

  if (isMintStep && activeBatch) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        {header}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 pt-6">
          {streamHeading}
          {progress}
          <MintStep
            stream={stream}
            batch={activeBatch}
            onMint={handleMint}
            isPending={mintBatch.isPending}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {header}
      <div className="flex min-h-0 flex-1 flex-col px-5 pt-6">
        {streamHeading}
        {progress}
        <WizardStepForm
          key={`${step.id}-${activeBatch?.id ?? 'new'}-${stepIndex}`}
          step={step}
          batch={activeBatch}
          isSubmitting={isSubmitting}
          notice={footerNotice}
          onSubmit={handleStepSubmit}
        />
      </div>
    </div>
  )
}
