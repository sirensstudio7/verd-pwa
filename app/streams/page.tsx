'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AppHeader } from '@/components/layout/AppHeader'
import { useFacility } from '@/lib/api/batches'
import type { StreamCategory } from '@/lib/api/types'
import { getStreamsByCategory } from '@/lib/streams/definitions'
import { useTranslation } from '@/lib/i18n/LocaleProvider'

export default function StreamsPage() {
  const router = useRouter()
  const { data: facility } = useFacility()
  const { t } = useTranslation()
  const [category, setCategory] = useState<StreamCategory>('plastic')
  const streams = getStreamsByCategory(category)

  return (
    <AppHeader
      title={t('streams.startNew')}
      subtitle={facility?.label ?? t('streams.selectStream')}
      categoryTab={{
        value: category,
        onChange: setCategory,
        streams,
        onStreamClick: (streamId) => router.push(`/streams/${streamId}?step=0`),
      }}
    />
  )
}
