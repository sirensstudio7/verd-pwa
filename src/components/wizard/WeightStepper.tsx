import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Minus, Plus } from 'lucide-react'

interface WeightStepperProps {
  label: string
  hint?: string
  value: number
  unit?: string
  step?: number
  min?: number
  max?: number
  onChange: (value: number) => void
}

export function WeightStepper({
  label,
  hint,
  value,
  unit = 'kg',
  step = 5,
  min = 0,
  max,
  onChange,
}: WeightStepperProps) {
  const decrement = () => onChange(Math.max(min, value - step))
  const increment = () => {
    const next = value + step
    onChange(max !== undefined ? Math.min(max, next) : next)
  }

  return (
    <div className="flex items-start gap-3">
      <div className="w-[9.5rem] shrink-0">
        <Label className="whitespace-nowrap text-base font-semibold leading-snug text-foreground">
          {label}
        </Label>
        {hint && (
          <p className="mt-0.5 line-clamp-1 text-xs leading-snug text-muted-foreground">{hint}</p>
        )}
      </div>
      <div className="flex flex-1 items-center justify-end gap-2 pt-0.5">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={decrement}
          aria-label="Decrease"
          className="shrink-0"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="relative w-[4.5rem] shrink-0">
          <Input
            type="number"
            value={value || ''}
            placeholder="0"
            min={min}
            max={max}
            onChange={(e) => {
              const parsed = Number(e.target.value)
              if (Number.isNaN(parsed)) {
                onChange(min)
                return
              }
              let next = parsed
              if (max !== undefined) next = Math.min(max, next)
              onChange(Math.max(min, next))
            }}
            className="no-spinners h-11 w-full px-2 pr-7 text-base"
          />
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium text-muted-foreground">
            {unit}
          </span>
        </div>
        <Button
          type="button"
          variant="default"
          size="icon"
          onClick={increment}
          aria-label="Increase"
          className="shrink-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
