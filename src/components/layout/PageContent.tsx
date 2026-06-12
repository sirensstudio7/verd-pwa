interface PageContentProps {
  children: React.ReactNode
}

export function PageContent({ children }: PageContentProps) {
  return (
    <div className="relative z-0 flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-8 pt-6">
      {children}
    </div>
  )
}
