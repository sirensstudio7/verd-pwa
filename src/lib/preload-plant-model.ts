export const PLANT_MODEL_SRC = '/models/lp-plant.glb'

export function preloadPlantModel() {
  if (typeof window === 'undefined') return

  void import('@/components/3d/PlantModelViewer')

  if (!document.querySelector(`link[rel="preload"][href="${PLANT_MODEL_SRC}"]`)) {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'fetch'
    link.href = PLANT_MODEL_SRC
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  }

  if (
    !document.querySelector(`script[src="${'/vendor/model-viewer.min.js'}"]`) &&
    typeof customElements !== 'undefined' &&
    customElements.get('model-viewer') === undefined
  ) {
    const script = document.createElement('script')
    script.type = 'module'
    script.src = '/vendor/model-viewer.min.js'
    document.head.appendChild(script)
  }
}
