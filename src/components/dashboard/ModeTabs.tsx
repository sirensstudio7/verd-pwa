import { cn } from '@/lib/utils'
import type { StreamCategory } from '@/lib/api/types'
import { getCategoryIcon } from '@/lib/streams/icons'

interface ModeTabsProps {
  value: StreamCategory
  onChange: (value: StreamCategory) => void
  embedded?: boolean
}

const tabs: { value: StreamCategory; label: string }[] = [
  { value: 'plastic', label: 'Plastic' },
  { value: 'organic', label: 'Organic' },
]

export function ModeTabs({ value, onChange, embedded }: ModeTabsProps) {
  const safeValue: StreamCategory =
    value === 'plastic' || value === 'organic' ? value : 'plastic'

  return (
    <div
      className={cn(
        'relative isolate flex rounded-2xl bg-muted/60 p-1',
        embedded ? 'ring-1 ring-border/40' : 'mb-7 ring-1 ring-border/50',
      )}
    >
      {tabs.map((tab) => {
        const active = safeValue === tab.value
        const Icon = getCategoryIcon(tab.value)
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={cn(
              'relative z-10 flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all duration-200',
              active
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {active && (
              <span
                className="pointer-events-none absolute inset-0 z-0 rounded-xl bg-primary shadow-sm"
                aria-hidden
              />
            )}
            <Icon className={cn('relative z-10 h-4 w-4', active ? 'text-white' : '')} />
            <span className="relative z-10">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
