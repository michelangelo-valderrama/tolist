import { CircleIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Task() {
  return (
    <Button
      variant="ghost"
      className="border-b border-b-border p-3 gap-x-4 h-auto items-center text-left rounded-none hover:bg-muted/60"
    >
      <Button
        className="size-auto font-mono font-bold text-red-400 p-1 rounded-full"
        variant="ghost"
        size="icon"
      >
        (A)
      </Button>
      <span className="flex-1">Mi nueva tarea</span>
      <Button
        size="icon"
        variant="ghost"
        className="size-auto p-1.5 rounded-full"
      >
        <CircleIcon className="size-icon" />
      </Button>
    </Button>
  )
}
