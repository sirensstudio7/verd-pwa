import type { ComponentType, SVGProps } from 'react'
import {
  BeakerIcon,
  BugAntIcon,
  CircleStackIcon,
  CloudIcon,
  FireIcon,
  Squares2X2Icon,
  SunIcon,
} from '@heroicons/react/24/outline'
import { ArrowRight, Leaf, Recycle, type LucideIcon } from 'lucide-react'
import type { StreamCategory } from '@/lib/api/types'

export type StreamIconComponent = ComponentType<SVGProps<SVGSVGElement>>

const STREAM_ICONS: Record<string, StreamIconComponent> = {
  'clean-pet-hdpe': CircleStackIcon,
  'mixed-low-grade': Squares2X2Icon,
  'high-calorific-rdf': FireIcon,
  'bsf-larvae': BugAntIcon,
  'wet-organics': CloudIcon,
  'vermicompost': SunIcon,
}

export function getStreamIcon(streamId: string): StreamIconComponent {
  return STREAM_ICONS[streamId] ?? BeakerIcon
}

export function getCategoryIcon(category: StreamCategory): LucideIcon {
  return category === 'plastic' ? Recycle : Leaf
}

export { ArrowRight, Recycle, Leaf }
