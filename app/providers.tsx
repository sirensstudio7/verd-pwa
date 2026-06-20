'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { AppShell } from '@/components/layout/AppShell'
import { LocaleProvider } from '@/lib/i18n/LocaleProvider'
import { useOfflineDemo } from '@/hooks/useOfflineDemo'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'

function AppProviders({ children }: { children: React.ReactNode }) {
  const { simulateOffline } = useOfflineDemo()
  const online = useOnlineStatus(simulateOffline)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (process.env.NODE_ENV !== 'development') return

    // Stale service workers cache old webpack chunks and reject with Event
    // objects, which surfaces in the UI as "[object Event]".
    void navigator.serviceWorker?.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        void registration.unregister()
      }
    })
    if ('caches' in window) {
      void caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason instanceof Event) {
        event.preventDefault()
      }
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    return () => window.removeEventListener('unhandledrejection', handleUnhandledRejection)
  }, [])

  return (
    <AppShell showOfflineBanner={!online}>
      {children}
      {mounted ? <Toaster /> : null}
    </AppShell>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            retry: 1,
            networkMode: 'offlineFirst',
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <AppProviders>{children}</AppProviders>
      </LocaleProvider>
    </QueryClientProvider>
  )
}
