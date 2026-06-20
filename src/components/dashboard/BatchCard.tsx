'use client'

import { Badge } from '@/components/ui/badge'
import type { Batch } from '@/lib/api/types'
import { useTranslation } from '@/lib/i18n/LocaleProvider'
import { formatNumber } from '@/lib/format'
import { getStreamById } from '@/lib/streams/definitions'
import { getStreamIcon } from '@/lib/streams/icons'
import { cn } from '@/lib/utils'

interface BatchCardProps {
  batch: Batch
  onClick: () => void
}

function statusLabel(status: Batch['status'], t: ReturnType<typeof useTranslation>['t']) {
  switch (status) {
    case 'in_progress':
      return t('batch.inProgress')
    case 'ready_to_mint':
      return t('batch.readyToMint')
    case 'minted':
      return t('batch.minted')
    default:
      return t('batch.draft')
  }
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

function BatchStatusChip({
  status,
  label,
}: {
  status: Batch['status']
  label: string
}) {
  return (
    <Badge
      variant={statusVariant(status)}
      className={cn(
        'px-2 py-0.5 text-[11px] font-medium normal-case tracking-normal',
      )}
    >
      {label}
    </Badge>
  )
}

export function BatchCard({ batch, onClick }: BatchCardProps) {
  const { t } = useTranslation()
  const stream = getStreamById(batch.streamId)
  const Icon = getStreamIcon(batch.streamId)
  const label = stream
    ? stream.productLabel
    : `Batch ${String(batch.batchNumber).padStart(2, '0')}`

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-3.5 py-3.5 text-left active:opacity-70"
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
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="text-xs tabular-nums text-muted-foreground">
            #{String(batch.batchNumber).padStart(2, '0')}
          </span>
          <BatchStatusChip
            status={batch.status}
            label={statusLabel(batch.status, t)}
          />
        </div>
      </div>

      <p className="shrink-0 text-right text-lg font-semibold tabular-nums text-foreground">
        {formatNumber(batch.weightKg)}
        <span className="ml-0.5 text-xs font-normal text-muted-foreground">kg</span>
      </p>
    </button>
  )
}
