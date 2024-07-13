import { CommandIcon } from 'lucide-react'
import { useSidebarStore } from '@/stores/sidebar.store'
import { SmplTooltip } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

export function Command() {
  const [$sidebarOpen] = useSidebarStore((s) => [s.open])

  if ($sidebarOpen)
    return (
      <Button
        className="gap-x-2.5 justify-start w-full border-t border-t-border h-auto p-4 pt-3 rounded-t-none"
        aria-label="Open command panel"
        variant="ghosty"
        size="lg"
      >
        <CommandIcon className="size-5" />
        Command
      </Button>
    )
  return (
    <SmplTooltip content="Command" side="right">
      <Button
        className="w-full border-t border-t-border h-auto py-4 rounded-t-none"
        aria-label="Open command panel"
        variant="ghosty"
        size="icon"
      >
        <CommandIcon className="size-5" />
      </Button>
    </SmplTooltip>
  )
}
