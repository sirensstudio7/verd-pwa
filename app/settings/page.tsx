'use client'

import { AppHeader } from '@/components/layout/AppHeader'
import { StatusBadge } from '@/components/layout/StatusBadge'
import { useFacility } from '@/lib/api/batches'
import { FACILITY_ID } from '@/lib/streams/definitions'
import { useOfflineDemo } from '@/hooks/useOfflineDemo'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { Building2, Wifi } from 'lucide-react'

export default function SettingsPage() {
  const { data: facility } = useFacility()
  const { simulateOffline, toggle } = useOfflineDemo()
  const online = useOnlineStatus(simulateOffline)

  return (
    <>
      <AppHeader
        title="More"
        subtitle="Facility & app settings"
        online={online}
      />

      <div className="space-y-3 px-5 pb-8 pt-6">
        <div className="surface-card p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
            <Building2 className="h-4 w-4 text-primary" />
            Facility
          </div>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Name</dt>
              <dd className="text-right font-medium">{facility?.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">ID</dt>
              <dd className="font-mono text-xs text-muted-foreground">{FACILITY_ID}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">Connection</dt>
              <dd><StatusBadge online={online} /></dd>
            </div>
          </dl>
        </div>

        <div className="surface-card p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
            <Wifi className="h-4 w-4 text-primary" />
            Demo
          </div>
          <p className="mb-3 text-sm text-muted-foreground">
            Simulate offline mode to test local persistence and PWA behavior.
          </p>
          <button
            type="button"
            onClick={toggle}
            className="w-full rounded-full border border-border/70 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-muted/50"
          >
            {simulateOffline ? 'Go online' : 'Simulate offline'}
          </button>
        </div>

        <p className="px-2 pt-2 text-center text-[11px] text-muted-foreground">
          Verdana Protocol · Post-Sort Operator PWA
        </p>
      </div>
    </>
  )
}
