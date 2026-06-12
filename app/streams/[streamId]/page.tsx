import StreamWizardPageClient from '@/components/pages/StreamWizardPageClient'

export const dynamic = 'force-dynamic'

interface StreamWizardPageProps {
  params: Promise<{ streamId: string }>
  searchParams: Promise<{ step?: string; batchId?: string }>
}

export default async function StreamWizardPage({ params, searchParams }: StreamWizardPageProps) {
  const { streamId } = await params
  const query = await searchParams
  const step = Math.max(0, Number(query.step ?? 0) || 0)
  const batchId = query.batchId

  return <StreamWizardPageClient streamId={streamId} step={step} batchId={batchId} />
}
