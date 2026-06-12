'use client'

import { SectionHeader } from '@/components/layout/SectionHeader'
import { Skeleton } from '@/components/ui/skeleton'
import type { Batch } from '@/lib/api/types'
import { formatNumber } from '@/lib/format'
import { getStreamById } from '@/lib/streams/definitions'
import { getStreamIcon } from '@/lib/streams/icons'
import { Layers } from 'lucide-react'

interface BatchCardProps {
  batch: Batch
  onClick: () => void
}

function statusLabel(status: Batch['status']) {
  switch (status) {
    case 'in_progress':
      return 'In progress'
    case 'ready_to_mint':
      return 'Ready to mint'
    case 'minted':
      return 'Minted'
    default:
      return 'Draft'
  }
}

export function BatchCard({ batch, onClick }: BatchCardProps) {
  const stream = getStreamById(batch.streamId)
  const Icon = getStreamIcon(batch.streamId)
  const label = stream
    ? stream.productLabel
    : `Batch ${String(batch.batchNumber).padStart(2, '0')}`

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3.5 py-3.5 text-left active:opacity-70"
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{
          backgroundColor: stream?.accentBg ?? 'hsl(140 18% 93%)',
          color: stream?.accentColor ?? 'hsl(152 48% 22%)',
        }}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">{label}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          #{String(batch.batchNumber).padStart(2, '0')} · {statusLabel(batch.status)}
        </p>
      </div>

      <p className="shrink-0 text-right text-lg font-semibold tabular-nums text-foreground">
        {formatNumber(batch.weightKg)}
        <span className="ml-0.5 text-xs font-normal text-muted-foreground">kg</span>
      </p>
    </button>
  )
}

interface ActiveFloorListProps {
  batches: Batch[]
  isLoading: boolean
  onBatchClick: (batch: Batch) => void
}

function BatchRowSkeleton() {
  return (
    <div className="flex items-center gap-3.5 py-3.5">
      <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3 rounded-md" />
        <Skeleton className="h-3 w-1/3 rounded-md" />
      </div>
      <Skeleton className="h-5 w-12 rounded-md" />
    </div>
  )
}

export function ActiveFloorList({ batches, isLoading, onBatchClick }: ActiveFloorListProps) {
  return (
    <section className="mb-10">
      <SectionHeader
        title="Active on floor"
        count={!isLoading && batches.length > 0 ? batches.length : undefined}
      />
      {isLoading ? (
        <div className="divide-y divide-border/50">
          <BatchRowSkeleton />
          <BatchRowSkeleton />
        </div>
      ) : batches.length === 0 ? (
        <div className="py-8 text-center">
          <div
            className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary text-primary"
            aria-hidden
          >
            <Layers className="h-10 w-10" strokeWidth={1.5} />
          </div>
          <p className="text-lg font-medium text-foreground">No active batches</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Start a new stream below to begin processing.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border/50">
          {batches.map((batch) => (
            <BatchCard key={batch.id} batch={batch} onClick={() => onBatchClick(batch)} />
          ))}
        </div>
      )}
    </section>
  )
}
