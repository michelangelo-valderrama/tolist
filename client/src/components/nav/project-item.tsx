import { Button } from '@/components/ui/button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from '@/components/ui/context-menu'

export function ProjectItem() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Button
          className="gap-x-2.5 px-2 w-full justify-start h-12"
          variant="ghosty"
          size="lg"
        >
          <div className="size-8">
            <img
              src="https://imangelo.dev/favicon.svg"
              className="rounded-md object-contain size-full aspect-square"
            />
          </div>
          <p className="font-bold">Imangelo Blog</p>
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>New project</ContextMenuItem>
        <ContextMenuItem>Add task</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem>Remove</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
