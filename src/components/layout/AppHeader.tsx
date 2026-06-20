'use client'

import { ModeTabs } from '@/components/dashboard/ModeTabs'
import { StreamPicker } from '@/components/dashboard/StreamPicker'
import { VerdanaLogo } from '@/components/brand/VerdanaLogo'
import { Button } from '@/components/ui/button'
import type { StreamCategory, StreamDefinition } from '@/lib/api/types'
import { useTranslation } from '@/lib/i18n/LocaleProvider'
import { getCategoryIcon } from '@/lib/streams/icons'
import { cn } from '@/lib/utils'
import { ArrowLeft, Settings } from 'lucide-react'
import Link from 'next/link'

interface AppHeaderProps {
  title?: string
  subtitle?: string
  showBack?: boolean
  onBack?: () => void
  hideTitle?: boolean
  showSettings?: boolean
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
  const { t } = useTranslation()
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
      {category === 'plastic' ? t('category.plastic') : t('category.organic')}
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

const headerIconButtonClassName =
  'size-10 shrink-0 cursor-pointer rounded-[12px] border border-border/60 bg-white/80'

function SettingsButton() {
  const { t } = useTranslation()

  return (
    <Button
      variant="ghost"
      size="iconSm"
      asChild
      aria-label={t('common.settings')}
      className={headerIconButtonClassName}
    >
      <Link href="/settings">
        <Settings className="h-4 w-4" />
      </Link>
    </Button>
  )
}

function HeaderActions({ showSettings }: { showSettings: boolean }) {
  if (!showSettings) return null
  return <SettingsButton />
}

export function AppHeader({
  title = 'Verdana Protocol',
  subtitle = 'Post-Sort Operator · PVP Facility #04',
  showBack,
  onBack,
  hideTitle,
  showSettings = true,
  categoryTab,
}: AppHeaderProps) {
  const { t } = useTranslation()

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
            <HeaderActions showSettings={showSettings} />
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
                  aria-label={t('common.goBack')}
                  className={headerIconButtonClassName}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              ) : (
                <VerdanaLogo className="shrink-0" />
              )}
              {!hideTitle && <HeaderTitle title={title} subtitle={subtitle} />}
            </div>
            <HeaderActions showSettings={showSettings} />
          </div>
        </div>
      )}
    </header>
  )
}
