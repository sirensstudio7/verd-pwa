import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type ModelViewerAttributes = DetailedHTMLProps<
  HTMLAttributes<HTMLElement> & {
    src?: string
    alt?: string
    'auto-rotate'?: boolean
    'rotation-per-second'?: string
    'interaction-prompt'?: string
    'shadow-intensity'?: string
    exposure?: string
    'camera-orbit'?: string
    'min-camera-orbit'?: string
    'max-camera-orbit'?: string
    'field-of-view'?: string
    loading?: 'auto' | 'lazy' | 'eager'
    ref?: React.Ref<HTMLElement>
  },
  HTMLElement
>

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerAttributes
    }
  }
}

export {}
