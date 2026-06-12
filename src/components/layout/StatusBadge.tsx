import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  online: boolean
  className?: string
}

export function StatusBadge({ online, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium',
        online
          ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60'
          : 'bg-red-50 text-red-700 ring-1 ring-red-200/60',
        className,
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          online ? 'bg-emerald-500 animate-pulse' : 'bg-red-500',
        )}
        aria-hidden
      />
      {online ? 'Online' : 'Offline'}
    </span>
  )
}
