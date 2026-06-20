'use client'

import { useParams, useRouter } from 'next/navigation'
import { AppHeader, HeaderTitle } from '@/components/layout/AppHeader'
import { BatchSummary, MintStep } from '@/components/wizard/MintStep'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useBatch, useMintBatch } from '@/lib/api/batches'
import { getStreamById } from '@/lib/streams/definitions'
import { formatErrorMessage } from '@/lib/format'
import { toast } from 'sonner'

export default function BatchDetailPage() {
  const params = useParams<{ batchId: string }>()
  const router = useRouter()
  const batchId = params.batchId
  const { data: batch, isPending, isFetching } = useBatch(batchId)
  const mintBatch = useMintBatch()
  const showLoading = isPending && isFetching && !batch

  const stream = batch ? getStreamById(batch.streamId) : undefined

  const handleMint = async () => {
    if (!batch) return
    try {
      await mintBatch.mutateAsync(batch.id)
      toast.success('Credits minted successfully')
    } catch (error) {
      toast.error(formatErrorMessage(error) || 'Failed to mint credits')
    }
  }

  const handleResume = () => {
    if (!batch || !stream) return
    const step =
      batch.status === 'ready_to_mint'
        ? stream.steps.length - 1
        : batch.currentStep

    const query = new URLSearchParams({ step: String(step), batchId: batch.id })
    router.push(`/streams/${batch.streamId}?${query.toString()}`)
  }

  if (showLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  if (!batch || !stream) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Batch not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push('/')}>
          Back to dashboard
        </Button>
      </div>
    )
  }

  return (
    <>
      <AppHeader
        showBack
        hideTitle
        onBack={() => router.push('/')}
      />

      <div className="px-5 pb-8 pt-6">
        <div className="mb-6">
          <HeaderTitle
            title={stream.name}
            subtitle={`Batch ${String(batch.batchNumber).padStart(2, '0')}`}
            category={stream.category}
          />
        </div>
      {batch.status === 'minted' ? (
        <BatchSummary batch={batch} />
      ) : batch.status === 'ready_to_mint' ? (
        <MintStep
          stream={stream}
          batch={batch}
          onMint={handleMint}
          isPending={mintBatch.isPending}
        />
      ) : (
        <div className="space-y-4">
          <BatchSummary batch={batch} />
          <Button variant="default" size="lg" className="w-full" onClick={handleResume}>
            Resume Batch
          </Button>
        </div>
      )}
      </div>
    </>
  )
}
