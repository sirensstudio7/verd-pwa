const numberFormat = new Intl.NumberFormat('en-US')
const dateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

export function formatNumber(value: number) {
  return numberFormat.format(value)
}

export function formatDate(value: string | Date) {
  return dateFormat.format(typeof value === 'string' ? new Date(value) : value)
}

export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  if (error instanceof Event) {
    return 'Failed to load app resources. Please refresh the page.'
  }
  return 'Something went wrong'
}
