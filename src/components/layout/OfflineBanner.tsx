'use client'

import { useTranslation } from '@/lib/i18n/LocaleProvider'
import { WifiOff } from 'lucide-react'

interface OfflineBannerProps {
  visible: boolean
}

export function OfflineBanner({ visible }: OfflineBannerProps) {
  const { t } = useTranslation()

  if (!visible) return null

  return (
    <div
      role="status"
      className="mb-5 flex items-center gap-2.5 rounded-xl border border-amber-200/80 bg-amber-50/90 px-3.5 py-2.5 text-sm text-amber-900 backdrop-blur-sm"
    >
      <WifiOff className="h-4 w-4 shrink-0 opacity-70" />
      <span className="leading-snug">{t('offline.banner')}</span>
    </div>
  )
}
