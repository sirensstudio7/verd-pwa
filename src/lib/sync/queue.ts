// Placeholder for future background sync when API mode is enabled.

export interface SyncQueueItem {
  id: string
  type: 'create' | 'update' | 'mint'
  payload: unknown
  createdAt: string
}

export async function enqueueSync(item: Omit<SyncQueueItem, 'id' | 'createdAt'>): Promise<void> {
  void item
  // No-op until API adapter is implemented
}

export async function flushSyncQueue(): Promise<void> {
  // No-op until API adapter is implemented
}
