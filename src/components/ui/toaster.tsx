'use client'

import { Check, X } from 'lucide-react'
import { Toaster as Sonner } from 'sonner'

export function Toaster() {
  return (
    <Sonner
      position="bottom-center"
      offset={16}
      gap={10}
      closeButton
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'verdana-toast group relative flex w-[min(100vw-2.5rem,400px)] items-start gap-3 rounded-2xl border border-border/50 bg-white/95 px-4 py-3.5 pl-[1.125rem] shadow-[var(--shadow-float)] backdrop-blur-xl',
          title: 'text-sm font-semibold leading-snug text-foreground',
          description: 'mt-0.5 text-xs leading-snug text-muted-foreground',
          content: 'flex min-w-0 flex-1 flex-col',
          icon: 'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full',
          closeButton:
            'absolute right-2.5 top-2.5 flex size-6 items-center justify-center rounded-full border border-border/50 bg-muted/60 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
        },
      }}
      icons={{
        success: (
          <span className="flex size-7 items-center justify-center rounded-full bg-success/12 text-success">
            <Check className="size-3.5" strokeWidth={2.5} />
          </span>
        ),
        error: (
          <span className="flex size-7 items-center justify-center rounded-full bg-destructive/12 text-destructive">
            <X className="size-3.5" strokeWidth={2.5} />
          </span>
        ),
      }}
    />
  )
}
