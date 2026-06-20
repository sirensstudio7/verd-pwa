'use client'

import type { Locale } from '@/lib/i18n/messages'
import { useTranslation } from '@/lib/i18n/LocaleProvider'
import { cn } from '@/lib/utils'
import { Languages } from 'lucide-react'

const flagClassName =
  'h-3 w-4 shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/10'

function FlagIcon({ locale }: { locale: Locale }) {
  if (locale === 'id') {
    return (
      <svg viewBox="0 0 24 16" className={flagClassName} aria-hidden>
        <rect width="24" height="8" fill="#CE1126" />
        <rect y="8" width="24" height="8" fill="#FFFFFF" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 16" className={flagClassName} aria-hidden>
      <rect width="24" height="16" fill="#B22234" />
      <rect y="1.23" width="24" height="1.23" fill="#FFFFFF" />
      <rect y="3.69" width="24" height="1.23" fill="#FFFFFF" />
      <rect y="6.15" width="24" height="1.23" fill="#FFFFFF" />
      <rect y="8.62" width="24" height="1.23" fill="#FFFFFF" />
      <rect y="11.08" width="24" height="1.23" fill="#FFFFFF" />
      <rect y="13.54" width="24" height="1.23" fill="#FFFFFF" />
      <rect width="9.6" height="8.62" fill="#3C3B6E" />
    </svg>
  )
}

const languageOptions: { value: Locale; labelKey: 'settings.languageEnglish' | 'settings.languageBahasa' }[] = [
  { value: 'en', labelKey: 'settings.languageEnglish' },
  { value: 'id', labelKey: 'settings.languageBahasa' },
]

export function LanguageSetting() {
  const { locale, setLocale, t } = useTranslation()

  return (
    <div className="surface-card p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
        <Languages className="h-4 w-4 text-primary" />
        {t('settings.language')}
      </div>

      <div className="flex gap-2">
        {languageOptions.map((option) => {
          const active = locale === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setLocale(option.value)}
              aria-pressed={active}
              className={cn(
                'flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition',
                active
                  ? 'border-primary bg-primary/5 text-foreground ring-1 ring-primary/20'
                  : 'border-border/70 bg-white text-muted-foreground hover:bg-muted/50',
              )}
            >
              <FlagIcon locale={option.value} />
              {t(option.labelKey)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
