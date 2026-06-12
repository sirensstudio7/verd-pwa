import type { StreamCategory, StreamDefinition } from '@/lib/api/types'

export const FACILITY_ID = 'pvp-facility-04'

export const DEFAULT_FACILITY = {
  id: FACILITY_ID,
  name: 'Verdana Protocol',
  label: 'Post-Sort Operator · PVP Facility #04',
}

export const STREAM_DEFINITIONS: StreamDefinition[] = [
  {
    id: 'clean-pet-hdpe',
    category: 'plastic',
    name: 'Clean PET / HDPE',
    icon: '💧',
    accentColor: '#0E8C8C',
    accentBg: '#DCF1F1',
    pipelineLabel: 'Washing → Shredding → Flakes',
    productLabel: 'Plastic Flake',
    steps: [
      {
        id: 'washing-shredding',
        title: 'Washing & Shredding',
        description: 'Input into granulator / flaker',
        actionLabel: 'Start Shredding',
        fields: [
          {
            id: 'polymer',
            label: 'Polymer type',
            type: 'polymer',
            options: [
              { value: 'PET', label: 'PET' },
              { value: 'HDPE', label: 'HDPE' },
            ],
          },
          {
            id: 'inputWeight',
            label: 'Input weight',
            hint: 'Load before shredding',
            type: 'weight',
            unit: 'kg',
            step: 5,
            min: 0,
          },
        ],
      },
      {
        id: 'quality-control',
        title: 'Quality Control · Purity Test',
        actionLabel: 'Verify Quality',
        fields: [
          {
            id: 'meshSize',
            label: 'Mesh size',
            hint: 'Flake screen aperture',
            type: 'number',
            unit: 'mm',
            step: 1,
            min: 0,
          },
          {
            id: 'moisture',
            label: 'Moisture',
            hint: 'Post-dry water content',
            type: 'number',
            unit: '%',
            step: 1,
            min: 0,
            max: 100,
          },
        ],
      },
      {
        id: 'output',
        title: 'Output Product · Plastic Flake',
        description: 'Final flake weight · ready for recyclers',
        actionLabel: 'Confirm & Proceed to Mint',
        fields: [
          {
            id: 'outputWeight',
            label: 'Final flake weight',
            hint: 'Weighed output after QC',
            type: 'weight',
            unit: 'kg',
            step: 5,
            min: 0,
          },
        ],
      },
      {
        id: 'mint',
        title: 'Mint Carbon Credits',
        description: 'Review batch summary and issue credits on-chain',
        actionLabel: 'Mint & Issue Credits',
        fields: [],
      },
    ],
  },
  {
    id: 'mixed-low-grade',
    category: 'plastic',
    name: 'Mixed / Low-Grade',
    icon: '🜂',
    accentColor: '#A8521A',
    accentBg: '#F4E5D7',
    pipelineLabel: 'Pyrolysis → Pertasol',
    productLabel: 'Pertasol',
    steps: [
      {
        id: 'feedstock',
        title: 'Feedstock Intake',
        description: 'Mixed plastic input weight',
        actionLabel: 'Start Pyrolysis',
        fields: [
          {
            id: 'inputWeight',
            label: 'Input weight',
            type: 'weight',
            unit: 'kg',
            step: 10,
            min: 0,
          },
        ],
      },
      {
        id: 'reactor',
        title: 'Reactor Parameters',
        actionLabel: 'Confirm Reactor Settings',
        fields: [
          {
            id: 'temperature',
            label: 'Reactor temperature',
            type: 'number',
            unit: '°C',
            step: 5,
            min: 0,
          },
          {
            id: 'duration',
            label: 'Process duration',
            type: 'number',
            unit: 'hrs',
            step: 0.5,
            min: 0,
          },
        ],
      },
      {
        id: 'output',
        title: 'Output · Pertasol',
        actionLabel: 'Confirm & Proceed to Mint',
        fields: [
          {
            id: 'outputVolume',
            label: 'Pertasol output',
            type: 'weight',
            unit: 'L',
            step: 5,
            min: 0,
          },
        ],
      },
      {
        id: 'mint',
        title: 'Mint Carbon Credits',
        actionLabel: 'Mint & Issue Credits',
        fields: [],
      },
    ],
  },
  {
    id: 'high-calorific-rdf',
    category: 'plastic',
    name: 'High-Calorific Waste',
    icon: '🔥',
    accentColor: '#7A5230',
    accentBg: '#EBE0D5',
    pipelineLabel: 'Shred & Mix → RDF Pellet',
    productLabel: 'RDF Pellet',
    steps: [
      {
        id: 'shred-mix',
        title: 'Shred & Mix',
        description: 'High-calorific waste input',
        actionLabel: 'Start Shredding',
        fields: [
          {
            id: 'inputWeight',
            label: 'Input weight',
            type: 'weight',
            unit: 'kg',
            step: 10,
            min: 0,
          },
        ],
      },
      {
        id: 'pelletizing',
        title: 'Pelletizing',
        actionLabel: 'Confirm Pelletizing',
        fields: [
          {
            id: 'moisture',
            label: 'Moisture content',
            type: 'number',
            unit: '%',
            step: 1,
            min: 0,
            max: 100,
          },
        ],
      },
      {
        id: 'output',
        title: 'Output · RDF Pellet',
        actionLabel: 'Confirm & Proceed to Mint',
        fields: [
          {
            id: 'outputWeight',
            label: 'Final pellet weight',
            type: 'weight',
            unit: 'kg',
            step: 10,
            min: 0,
          },
        ],
      },
      {
        id: 'mint',
        title: 'Mint Carbon Credits',
        actionLabel: 'Mint & Issue Credits',
        fields: [],
      },
    ],
  },
  {
    id: 'bsf-larvae',
    category: 'organic',
    name: 'High Protein · BSF Larvae',
    icon: '🪰',
    accentColor: '#5a7a4a',
    accentBg: '#eef3ea',
    pipelineLabel: 'Bioconversion → Maggot',
    productLabel: 'BSF Larvae',
    steps: [
      {
        id: 'feed',
        title: 'Organic Feed Intake',
        actionLabel: 'Start Bioconversion',
        fields: [
          {
            id: 'inputWeight',
            label: 'Feed weight',
            type: 'weight',
            unit: 'kg',
            step: 5,
            min: 0,
          },
        ],
      },
      {
        id: 'incubation',
        title: 'Incubation Cycle',
        actionLabel: 'Confirm Cycle',
        fields: [
          {
            id: 'days',
            label: 'Incubation days',
            type: 'number',
            unit: 'days',
            step: 1,
            min: 1,
          },
        ],
      },
      {
        id: 'output',
        title: 'Output · Maggot Mass',
        actionLabel: 'Confirm & Proceed to Mint',
        fields: [
          {
            id: 'outputWeight',
            label: 'Harvest weight',
            type: 'weight',
            unit: 'kg',
            step: 5,
            min: 0,
          },
        ],
      },
      {
        id: 'mint',
        title: 'Mint Carbon Credits',
        actionLabel: 'Mint & Issue Credits',
        fields: [],
      },
    ],
  },
  {
    id: 'wet-organics',
    category: 'organic',
    name: 'Wet Organics · Digester',
    icon: '💨',
    accentColor: '#4a6b8b',
    accentBg: '#e8eef4',
    pipelineLabel: 'Anaerobic → Biogas',
    productLabel: 'Biogas',
    steps: [
      {
        id: 'loading',
        title: 'Digester Loading',
        actionLabel: 'Start Digestion',
        fields: [
          {
            id: 'inputWeight',
            label: 'Wet organics weight',
            type: 'weight',
            unit: 'kg',
            step: 10,
            min: 0,
          },
        ],
      },
      {
        id: 'digestion',
        title: 'Anaerobic Digestion',
        actionLabel: 'Confirm Parameters',
        fields: [
          {
            id: 'temperature',
            label: 'Digester temperature',
            type: 'number',
            unit: '°C',
            step: 1,
            min: 0,
          },
        ],
      },
      {
        id: 'output',
        title: 'Output · Biogas',
        actionLabel: 'Confirm & Proceed to Mint',
        fields: [
          {
            id: 'outputVolume',
            label: 'Biogas volume',
            type: 'weight',
            unit: 'm³',
            step: 1,
            min: 0,
          },
        ],
      },
      {
        id: 'mint',
        title: 'Mint Carbon Credits',
        actionLabel: 'Mint & Issue Credits',
        fields: [],
      },
    ],
  },
  {
    id: 'vermicompost',
    category: 'organic',
    name: 'Vermicompost / Composting',
    icon: '🪱',
    accentColor: '#7a5a3a',
    accentBg: '#f3ece4',
    pipelineLabel: 'Cycle → Compost',
    productLabel: 'Compost',
    steps: [
      {
        id: 'input',
        title: 'Compost Input',
        actionLabel: 'Start Composting',
        fields: [
          {
            id: 'inputWeight',
            label: 'Organic input weight',
            type: 'weight',
            unit: 'kg',
            step: 5,
            min: 0,
          },
        ],
      },
      {
        id: 'cycle',
        title: 'Composting Cycle',
        actionLabel: 'Confirm Cycle',
        fields: [
          {
            id: 'weeks',
            label: 'Cycle duration',
            type: 'number',
            unit: 'weeks',
            step: 1,
            min: 1,
          },
        ],
      },
      {
        id: 'output',
        title: 'Output · Compost',
        actionLabel: 'Confirm & Proceed to Mint',
        fields: [
          {
            id: 'outputWeight',
            label: 'Final compost weight',
            type: 'weight',
            unit: 'kg',
            step: 5,
            min: 0,
          },
        ],
      },
      {
        id: 'mint',
        title: 'Mint Carbon Credits',
        actionLabel: 'Mint & Issue Credits',
        fields: [],
      },
    ],
  },
]

export function getStreamById(id: string): StreamDefinition | undefined {
  return STREAM_DEFINITIONS.find((s) => s.id === id)
}

export function getStreamsByCategory(category: StreamCategory): StreamDefinition[] {
  return STREAM_DEFINITIONS.filter((s) => s.category === category)
}
