import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Batch, StreamDefinition } from '@/lib/api/types'
import { formatDate, formatNumber } from '@/lib/format'
import { getStreamById } from '@/lib/streams/definitions'
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

function SummaryRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className={`text-sm tabular-nums ${highlight ? 'font-semibold text-verdana-mint' : 'font-medium text-foreground'}`}>
        {value}
      </dd>
    </div>
  )
}

export function MintStep({ stream, batch, onMint, isPending }: MintStepProps) {
  const credits = computeCredits(batch.weightKg)
  const polymer = batch.stepData['washing-shredding']?.polymer

  return (
    <div className="space-y-5">
      <Card className="overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-verdana-forest via-verdana-mint to-verdana-teal" />
        <CardContent className="space-y-1 pt-5">
          <p className="section-label mb-1">Batch summary</p>
          <h2 className="font-display text-xl font-semibold">
            {stream.productLabel}
            <span className="ml-2 text-base font-normal text-muted-foreground">
              #{String(batch.batchNumber).padStart(2, '0')}
            </span>
          </h2>

          <dl className="mt-4 divide-y divide-border/60">
            <SummaryRow label="Stream" value={stream.name} />
            <SummaryRow label="Pipeline" value={stream.pipelineLabel} />
            {polymer && <SummaryRow label="Polymer" value={String(polymer)} />}
            <SummaryRow label="Output weight" value={`${formatNumber(batch.weightKg)} kg`} />
            <SummaryRow label="Estimated credits" value={`${credits} tCO₂e`} highlight />
          </dl>
        </CardContent>
      </Card>

      <p className="px-2 text-center text-sm leading-relaxed text-muted-foreground">
        Verify the batch output above, then mint carbon credits on-chain.
      </p>

      <Button
        variant="default"
        size="lg"
        className="w-full"
        disabled={isPending}
        onClick={() => void onMint()}
      >
        <Coins className="h-4 w-4" />
        Mint & Issue Credits
      </Button>
    </div>
  )
}

export function BatchSummary({ batch }: { batch: Batch }) {
  const stream = getStreamById(batch.streamId)
  if (!stream) return null

  return (
    <Card>
      <CardContent className="space-y-1">
        <p className="section-label mb-1">Batch details</p>
        <h2 className="font-display text-lg font-semibold">
          {stream.productLabel}
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            #{String(batch.batchNumber).padStart(2, '0')}
          </span>
        </h2>
        <dl className="mt-4 divide-y divide-border/60">
          <SummaryRow label="Status" value={batch.status.replace(/_/g, ' ')} />
          <SummaryRow label="Weight" value={`${formatNumber(batch.weightKg)} kg`} />
          {batch.creditAmount !== undefined && (
            <SummaryRow label="Credits issued" value={`${batch.creditAmount} tCO₂e`} highlight />
          )}
          {batch.mintedAt && (
            <SummaryRow label="Minted" value={formatDate(batch.mintedAt)} />
          )}
        </dl>
      </CardContent>
    </Card>
  )
}
