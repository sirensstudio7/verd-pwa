import type { DataAdapter } from '@/lib/api/types'
import { mockAdapter } from '@/lib/mock/mock-adapter'

export function createApiAdapter(): DataAdapter {
  throw new Error('API adapter not implemented. Set NEXT_PUBLIC_DATA_SOURCE=mock')
}

export function getDataAdapter(): DataAdapter {
  const source = process.env.NEXT_PUBLIC_DATA_SOURCE ?? 'mock'
  if (source === 'api') {
    return createApiAdapter()
  }
  return mockAdapter
}

export const dataAdapter = getDataAdapter()
