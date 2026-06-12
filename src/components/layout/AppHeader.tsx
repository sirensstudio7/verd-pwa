import { VerdanaLogo } from '@/components/brand/VerdanaLogo'
import { ModeTabs } from '@/components/dashboard/ModeTabs'
import { StreamPicker } from '@/components/dashboard/StreamPicker'
import { StatusBadge } from '@/components/layout/StatusBadge'
import { Button } from '@/components/ui/button'
import type { StreamCategory, StreamDefinition } from '@/lib/api/types'
import { getCategoryIcon } from '@/lib/streams/icons'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'

interface AppHeaderProps {
  title?: string
  subtitle?: string
  online: boolean
  showBack?: boolean
  onBack?: () => void
  hideTitle?: boolean
  categoryTab?: {
    value: StreamCategory
    onChange: (value: StreamCategory) => void
    streams?: StreamDefinition[]
    onStreamClick?: (streamId: string) => void
  }
}

const categoryStyles: Record<StreamCategory, string> = {
  plastic: 'bg-sky-50 text-sky-700 ring-sky-200/60',
  organic: 'bg-lime-50 text-lime-800 ring-lime-200/60',
}

export function CategoryBadge({
  category,
  className,
}: {
  category: StreamCategory
  className?: string
}) {
  const CategoryIcon = getCategoryIcon(category)
  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1',
        categoryStyles[category],
        className,
      )}
    >
      <CategoryIcon className="h-3.5 w-3.5" strokeWidth={2} />
      {category === 'plastic' ? 'Plastic' : 'Organic'}
    </div>
  )
}

export function HeaderTitle({
  title,
  subtitle,
  category,
}: {
  title: string
  subtitle?: string
  category?: StreamCategory
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between gap-3">
        <h1 className="min-w-0 truncate font-display text-2xl font-semibold leading-tight text-foreground">
          {title}
        </h1>
        {category && <CategoryBadge category={category} />}
      </div>
      {subtitle && (
        <p className="mt-1 truncate text-base leading-snug text-muted-foreground">{subtitle}</p>
      )}
    </div>
  )
}

export function AppHeader({
  title = 'Verdana Protocol',
  subtitle = 'Post-Sort Operator · PVP Facility #04',
  online,
  showBack,
  onBack,
  hideTitle,
  categoryTab,
}: AppHeaderProps) {
  return (
    <header
        className={cn(
          'relative z-30 shrink-0 overflow-hidden border-b border-border/50 bg-white/90 backdrop-blur-lg',
          categoryTab && 'rounded-b-[16px]',
        )}
      >
        {categoryTab ? (
          <>
            <div className="flex h-[72px] min-h-[72px] items-center justify-between px-5">
              <VerdanaLogo className="shrink-0" />
              <StatusBadge online={online} />
            </div>
            <div className="px-5 pb-4 pt-3">
              <HeaderTitle title={title} subtitle={subtitle} />
              <div className="mt-3">
                <ModeTabs
                  value={categoryTab.value}
                  onChange={categoryTab.onChange}
                  embedded
                />
              </div>
              {categoryTab.streams && categoryTab.onStreamClick && (
                <StreamPicker
                  streams={categoryTab.streams}
                  onStreamClick={categoryTab.onStreamClick}
                />
              )}
            </div>
          </>
        ) : (
          <div className="flex h-[72px] min-h-[72px] items-center px-5">
            <div className="flex w-full items-center justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                {showBack ? (
                  <Button
                    variant="ghost"
                    size="iconSm"
                    onClick={() => onBack?.()}
                    aria-label="Go back"
                    className="size-10 shrink-0 rounded-xl border border-border/60 bg-white/80"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                ) : (
                  <VerdanaLogo className="shrink-0" />
                )}
                {!hideTitle && <HeaderTitle title={title} subtitle={subtitle} />}
              </div>
              <StatusBadge online={online} />
            </div>
          </div>
        )}
      </header>
  )
}
