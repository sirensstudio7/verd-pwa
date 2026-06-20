import { cn } from '@/lib/utils'

interface PolymerToggleProps {
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}

export function PolymerToggle({ value, options, onChange }: PolymerToggleProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5 rounded-2xl bg-muted/60 p-1.5 ring-1 ring-border/50">
      {options.map((option) => {
        const active = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'relative rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] cursor-pointer',
              active
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
