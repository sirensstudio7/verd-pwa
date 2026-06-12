'use client'

import { OfflineBanner } from '@/components/layout/OfflineBanner'
import { PageTransition } from '@/components/layout/PageTransition'

interface AppShellProps {
  children: React.ReactNode
  showOfflineBanner?: boolean
}

export function AppShell({ children, showOfflineBanner = false }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-background">
      <div className="app-container flex flex-col">
        {showOfflineBanner && (
          <div className="shrink-0 px-5 pt-3">
            <OfflineBanner visible />
          </div>
        )}
        <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  )
}
