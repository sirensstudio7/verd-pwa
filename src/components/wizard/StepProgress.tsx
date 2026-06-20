import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepProgressProps {
  currentStep: number
  totalSteps: number
  labels?: string[]
}

function splitStepLabel(label: string): { line1: string; line2?: string } {
  const dotParts = label.split('·').map((part) => part.trim()).filter(Boolean)
  if (dotParts.length >= 2) {
    return { line1: dotParts[0], line2: dotParts.slice(1).join(' · ') }
  }

  const words = label.trim().split(/\s+/).filter(Boolean)
  if (words.length >= 2) {
    const mid = Math.ceil(words.length / 2)
    return {
      line1: words.slice(0, mid).join(' '),
      line2: words.slice(mid).join(' '),
    }
  }

  return { line1: label }
}

export function StepProgress({ currentStep, totalSteps, labels }: StepProgressProps) {
  const currentLabel = labels?.[currentStep]

  return (
    <div className="mb-7 shrink-0">
      <div
        className="relative"
        role="progressbar"
        aria-valuenow={currentStep + 1}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Step ${currentStep + 1} of ${totalSteps}${currentLabel ? `: ${currentLabel}` : ''}`}
      >
        <div className="pointer-events-none absolute left-4 right-4 top-4 h-px bg-border" aria-hidden />

        <div
          className="relative z-10 grid gap-2"
          style={{ gridTemplateColumns: `repeat(${totalSteps}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: totalSteps }, (_, i) => {
            const completed = i < currentStep
            const current = i === currentStep
            const label = labels?.[i]
            const isFirst = i === 0
            const isLast = i === totalSteps - 1
            const { line1, line2 } = label ? splitStepLabel(label) : { line1: '', line2: undefined }

            return (
              <div
                key={i}
                className={cn(
                  'flex min-w-0 flex-col gap-2',
                  isFirst && 'items-start',
                  isLast && 'items-end',
                  !isFirst && !isLast && 'items-center',
                )}
              >
                <div
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300',
                    completed && 'bg-primary text-primary-foreground',
                    current && 'bg-primary text-primary-foreground ring-2 ring-primary/30',
                    !completed && !current && 'border border-border bg-white text-muted-foreground',
                  )}
                >
                  {completed ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : i + 1}
                </div>

                {label && (
                  <div
                    className={cn(
                      'min-h-8 w-full text-[10px] leading-snug',
                      isFirst && 'text-left',
                      isLast && 'text-right',
                      !isFirst && !isLast && 'text-center',
                      current && 'font-semibold text-foreground',
                      completed && 'text-primary',
                      !completed && !current && 'text-muted-foreground/70',
                    )}
                  >
                    <span className="block">{line1}</span>
                    {line2 ? <span className="block">{line2}</span> : null}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
