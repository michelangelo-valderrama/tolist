import { Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSidebarStore } from '@/stores/sidebar.store'
import { SmplTooltip } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from '@/components/ui/context-menu'

interface Props {
  id: string
  name: string
  pictureUrl: string
  undoneTasks?: number
}

interface ProjectContextMenuProps {
  children: React.ReactNode
}

function ProjectContextMenu({ children }: ProjectContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48 *:gap-x-2">
        <ContextMenuItem>New project</ContextMenuItem>
        <ContextMenuItem>Add task</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem className="text-destructive-think focus:text-destructive-think">
          <Trash2Icon className="size-4" />
          Remove
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function Project({ id, name, pictureUrl, undoneTasks }: Props) {
  const [$sidebarOpen] = useSidebarStore((s) => [s.open])
  const projectUrl = `/app/project/${id}-${name
    .toLowerCase()
    .replace(/\s/g, '-')}`

  return (
    <ProjectContextMenu>
      {$sidebarOpen ? (
        <Link to={projectUrl}>
          <Button
            className="px-2 w-full justify-between h-12 gap-x-2"
            variant="ghosty"
            size="lg"
          >
            <div className="flex items-center gap-x-2.5 flex-1">
              <div className="size-8">
                <img
                  src={pictureUrl}
                  className="rounded-md object-contain size-full aspect-square"
                />
              </div>
              <p className="font-bold">{name}</p>
            </div>
            {undoneTasks && (
              <span className="size-5 font-medium text-sm rounded-full flex items-center justify-center bg-primary text-primary-foreground">
                {undoneTasks}
              </span>
            )}
          </Button>
        </Link>
      ) : (
        <SmplTooltip content={name} side="right">
          <Link to={projectUrl}>
            <Button className="size-12" variant="ghosty" size="icon">
              <div className="size-8">
                <img
                  src={pictureUrl}
                  className="rounded-md object-contain size-full aspect-square"
                />
              </div>
            </Button>
          </Link>
        </SmplTooltip>
      )}
    </ProjectContextMenu>
  )
}
