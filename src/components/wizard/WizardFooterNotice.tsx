import { cn } from '@/lib/utils'

interface WizardFooterNoticeProps {
  type: 'success' | 'error'
  message: string
}

export function WizardFooterNotice({ type, message }: WizardFooterNoticeProps) {
  return (
    <p
      className={cn(
        'mb-3 text-center text-sm font-medium',
        type === 'success' ? 'text-primary' : 'text-destructive',
      )}
      role="status"
    >
      {message}
    </p>
  )
}
