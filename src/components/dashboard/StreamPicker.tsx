import type { StreamDefinition } from '@/lib/api/types'
import { getStreamIcon } from '@/lib/streams/icons'
import { PlusIcon } from '@heroicons/react/20/solid'

interface StreamPickerProps {
  streams: StreamDefinition[]
  onStreamClick: (streamId: string) => void
}

export function StreamPicker({ streams, onStreamClick }: StreamPickerProps) {
  return (
    <div className="mt-3 grid grid-cols-3 gap-2">
      {streams.map((stream) => {
        const Icon = getStreamIcon(stream.id)
        return (
          <button
            key={stream.id}
            type="button"
            onClick={() => onStreamClick(stream.id)}
            className="flex cursor-pointer flex-col items-center gap-1.5 rounded-xl p-2 text-center transition-colors hover:bg-muted/40 active:scale-[0.98]"
          >
            <div className="relative shrink-0">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: stream.accentBg,
                  color: stream.accentColor,
                }}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <span
                className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm ring-2 ring-white"
                aria-hidden
              >
                <PlusIcon className="h-2.5 w-2.5" />
              </span>
            </div>
            <div className="flex min-h-[2.5rem] w-full items-center justify-center px-0.5">
              <span className="line-clamp-2 text-center text-sm font-medium leading-snug text-foreground">
                {stream.name}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
