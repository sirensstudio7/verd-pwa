import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Batch, StreamDefinition } from '@/lib/api/types'
import { formatDate, formatNumber } from '@/lib/format'
import { getStreamById } from '@/lib/streams/definitions'
import { getStreamIcon } from '@/lib/streams/icons'
import { Coins } from 'lucide-react'

interface MintStepProps {
  stream: StreamDefinition
  batch: Batch
  onMint: () => void
  isPending: boolean
}

function computeCredits(weightKg: number): number {
  return Math.round(weightKg * 0.42 * 100) / 100
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 text-sm">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-foreground">{value}</dd>
    </div>
  )
}

function BatchSummaryHeader({
  stream,
  batch,
}: {
  stream: StreamDefinition
  batch: Batch
}) {
  const Icon = getStreamIcon(batch.streamId)

  return (
    <div className="flex items-start gap-3.5">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{
          backgroundColor: stream.accentBg,
          color: stream.accentColor,
        }}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">{stream.productLabel}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          #{String(batch.batchNumber).padStart(2, '0')} · {stream.name}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-lg font-semibold tabular-nums text-foreground">
          {formatNumber(batch.weightKg)}
          <span className="ml-0.5 text-xs font-normal text-muted-foreground">kg</span>
        </p>
      </div>
    </div>
  )
}

export function MintStep({ stream, batch, onMint, isPending }: MintStepProps) {
  const credits = computeCredits(batch.weightKg)
  const polymer = batch.stepData['washing-shredding']?.polymer
  const actionLabel =
    stream.steps.find((step) => step.id === 'mint')?.actionLabel ?? 'Mint credits'

  return (
    <>
      <div className="min-h-0 flex-1 overflow-y-auto pb-4">
        <div className="space-y-6">
          <BatchSummaryHeader stream={stream} batch={batch} />

          <dl className="divide-y divide-border/50 border-t border-border/50">
            <MetaRow label="Pipeline" value={stream.pipelineLabel} />
            {polymer && <MetaRow label="Polymer" value={String(polymer)} />}
            <MetaRow label="Estimated credits" value={`${formatNumber(credits)} tCO₂e`} />
          </dl>
        </div>
      </div>

      <div className="shrink-0 -mx-5 border-t border-border/60 bg-white px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <Button
          variant="default"
          size="lg"
          className="w-full"
          disabled={isPending}
          onClick={() => void onMint()}
        >
          <Coins className="h-4 w-4" />
          {actionLabel}
        </Button>
      </div>
    </>
  )
}

function statusVariant(status: Batch['status']) {
  switch (status) {
    case 'in_progress':
      return 'progress' as const
    case 'ready_to_mint':
      return 'ready' as const
    case 'minted':
      return 'minted' as const
    default:
      return 'default' as const
  }
}

function formatStatus(status: Batch['status']) {
  return status.replace(/_/g, ' ')
}

export function BatchSummary({ batch }: { batch: Batch }) {
  const stream = getStreamById(batch.streamId)
  if (!stream) return null

  return (
    <div className="space-y-4">
      <BatchSummaryHeader stream={stream} batch={batch} />

      <dl className="divide-y divide-border/50 border-t border-border/50">
        <div className="flex items-center justify-between gap-4 py-3 text-sm">
          <dt className="text-muted-foreground">Status</dt>
          <dd>
            <Badge
              variant={statusVariant(batch.status)}
              className="normal-case tracking-normal"
            >
              {formatStatus(batch.status)}
            </Badge>
          </dd>
        </div>
        {batch.creditAmount !== undefined && (
          <MetaRow
            label="Credits issued"
            value={`${formatNumber(batch.creditAmount)} tCO₂e`}
          />
        )}
        {batch.mintedAt && (
          <MetaRow label="Minted" value={formatDate(batch.mintedAt)} />
        )}
      </dl>
    </div>
  )
}
