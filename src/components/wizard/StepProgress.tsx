import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepProgressProps {
  currentStep: number
  totalSteps: number
  labels?: string[]
}

function shortStepLabel(label: string) {
  const part = label.split('·')[0]?.trim()
  return part || label
}

export function StepProgress({ currentStep, totalSteps, labels }: StepProgressProps) {
  const currentLabel = labels?.[currentStep]

  return (
    <div className="mb-7 shrink-0">
      <div
        className="relative flex items-start"
        role="progressbar"
        aria-valuenow={currentStep + 1}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Step ${currentStep + 1} of ${totalSteps}${currentLabel ? `: ${currentLabel}` : ''}`}
      >
        <div className="absolute inset-x-4 top-4 h-px bg-border" aria-hidden />

        {Array.from({ length: totalSteps }, (_, i) => {
          const completed = i < currentStep
          const current = i === currentStep
          const label = labels?.[i]

          return (
            <div
              key={i}
              className={cn(
                'relative z-10 flex min-w-0 flex-1 flex-col gap-2',
                i === 0 && 'items-start',
                i === totalSteps - 1 && 'items-end',
                i > 0 && i < totalSteps - 1 && 'items-center',
              )}
            >
              <div
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300',
                  completed && 'bg-primary text-primary-foreground',
                  current && 'size-9 bg-primary text-primary-foreground ring-4 ring-primary/15',
                  !completed && !current && 'border border-border bg-white text-muted-foreground',
                )}
              >
                {completed ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : i + 1}
              </div>

              {label && (
                <p
                  className={cn(
                    'max-w-[6.5rem] text-[10px] leading-tight',
                    i === 0 && 'text-left',
                    i === totalSteps - 1 && 'text-right',
                    i > 0 && i < totalSteps - 1 && 'text-center',
                    current && 'font-semibold text-foreground',
                    completed && 'text-primary',
                    !completed && !current && 'text-muted-foreground/70',
                  )}
                >
                  <span className={cn(current ? 'line-clamp-3' : 'line-clamp-2')}>
                    {current ? label : shortStepLabel(label)}
                  </span>
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
