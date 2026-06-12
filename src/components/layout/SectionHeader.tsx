interface SectionHeaderProps {
  title: string
  count?: number
  countLabel?: string
  description?: string
}

export function SectionHeader({ title, count, countLabel, description }: SectionHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-[17px] font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {count !== undefined && (
          <span className="shrink-0 rounded-full bg-muted/80 px-2.5 py-1 text-xs font-medium tabular-nums text-muted-foreground ring-1 ring-border/40">
            {count} {countLabel ?? (count === 1 ? 'batch' : 'batches')}
          </span>
        )}
      </div>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
