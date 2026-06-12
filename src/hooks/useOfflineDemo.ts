import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'verdana-simulate-offline'

export function useOfflineDemo() {
  const [simulateOffline, setSimulateOffline] = useState(false)

  useEffect(() => {
    setSimulateOffline(localStorage.getItem(STORAGE_KEY) === 'true')
  }, [])

  const toggle = useCallback(() => {
    setSimulateOffline((prev) => {
      const next = !prev
      localStorage.setItem(STORAGE_KEY, String(next))
      return next
    })
  }, [])

  return { simulateOffline, toggle }
}
