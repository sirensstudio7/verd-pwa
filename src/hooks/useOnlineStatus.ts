import { useEffect, useState } from 'react'

export function useOnlineStatus(simulateOffline = false) {
  const [online, setOnline] = useState(true)

  useEffect(() => {
    setOnline(navigator.onLine)

    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return simulateOffline ? false : online
}
