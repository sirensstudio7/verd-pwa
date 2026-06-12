import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { Batch } from '@/lib/api/types'

interface VerdanaDB extends DBSchema {
  batches: {
    key: string
    value: Batch
    indexes: { 'by-facility': string; 'by-status': string }
  }
  meta: {
    key: string
    value: { key: string; value: unknown }
  }
}

const DB_NAME = 'verdana-pwa'
const DB_VERSION = 1

let dbPromise: Promise<IDBPDatabase<VerdanaDB>> | null = null

export function getDb() {
  if (!dbPromise) {
    dbPromise = openDB<VerdanaDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const batchStore = db.createObjectStore('batches', { keyPath: 'id' })
        batchStore.createIndex('by-facility', 'facilityId')
        batchStore.createIndex('by-status', 'status')
        db.createObjectStore('meta', { keyPath: 'key' })
      },
    })
  }
  return dbPromise
}

export async function getAllBatches(): Promise<Batch[]> {
  const db = await getDb()
  return db.getAll('batches')
}

export async function getBatchById(id: string): Promise<Batch | undefined> {
  const db = await getDb()
  return db.get('batches', id)
}

export async function putBatch(batch: Batch): Promise<void> {
  const db = await getDb()
  await db.put('batches', batch)
}

export async function putBatches(batches: Batch[]): Promise<void> {
  const db = await getDb()
  const tx = db.transaction('batches', 'readwrite')
  await Promise.all([...batches.map((b) => tx.store.put(b)), tx.done])
}

export async function getMeta<T>(key: string): Promise<T | undefined> {
  const db = await getDb()
  const record = await db.get('meta', key)
  return record?.value as T | undefined
}

export async function setMeta(key: string, value: unknown): Promise<void> {
  const db = await getDb()
  await db.put('meta', { key, value })
}

export async function getNextBatchNumber(): Promise<number> {
  const current = (await getMeta<number>('nextBatchNumber')) ?? 12
  const next = current + 1
  await setMeta('nextBatchNumber', next)
  return current
}

export async function isDbSeeded(): Promise<boolean> {
  return (await getMeta<boolean>('seeded')) === true
}

export async function markDbSeeded(): Promise<void> {
  await setMeta('seeded', true)
}
