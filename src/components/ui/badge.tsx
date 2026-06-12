import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
  {
    variants: {
      variant: {
        default: 'bg-muted text-muted-foreground',
        online: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60',
        offline: 'bg-red-50 text-red-700 ring-1 ring-red-200/60',
        progress: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/60',
        ready: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60',
        minted: 'bg-primary/10 text-primary ring-1 ring-primary/15',
        plastic: 'bg-sky-50 text-sky-700 ring-1 ring-sky-200/60',
        organic: 'bg-lime-50 text-lime-800 ring-1 ring-lime-200/60',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
