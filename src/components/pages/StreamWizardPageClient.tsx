'use client'

import { useRouter } from 'next/navigation'
import { StreamWizard } from '@/components/wizard/StreamWizard'
import { useBatch } from '@/lib/api/batches'
import { getStreamById } from '@/lib/streams/definitions'
import { useOfflineDemo } from '@/hooks/useOfflineDemo'

interface StreamWizardPageClientProps {
  streamId: string
  step: number
  batchId?: string
}

export default function StreamWizardPageClient({
  streamId,
  step,
  batchId,
}: StreamWizardPageClientProps) {
  const router = useRouter()
  const { simulateOffline } = useOfflineDemo()
  const stream = getStreamById(streamId)
  const { data: batch } = useBatch(batchId ?? '')

  if (!stream) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Stream not found.</p>
      </div>
    )
  }

  const clampedStep = Math.min(step, stream.steps.length - 1)

  const navigateStep = (nextStep: number) => {
    const query = new URLSearchParams({ step: String(nextStep) })
    if (batchId) query.set('batchId', batchId)
    router.replace(`/streams/${streamId}?${query.toString()}`)
  }

  return (
    <StreamWizard
      stream={stream}
      batch={batchId ? (batch ?? null) : null}
      stepIndex={clampedStep}
      simulateOffline={simulateOffline}
      onBack={() => router.push('/')}
      onStepChange={navigateStep}
      onComplete={() => router.push('/')}
    />
  )
}
