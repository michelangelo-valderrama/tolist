import {
  CommandIcon,
  InboxIcon,
  PanelRightOpenIcon,
  PlusIcon,
  TagsIcon
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SidebarItem } from './sidebar-item'
import { ProjectItem } from './project-item'

export function Nav() {
  return (
    <div className="size-full min-w-80 w-80 p-4">
      <div className="h-full bg-sidebar/80 backdrop-blur-sm border rounded-md shadow-black/20 shadow-lg flex flex-col">
        {/* Profile */}
        <article className="p-2 mb-2">
          <div className="relative">
            <Button
              className="gap-x-3 flex-1 justify-start px-2 h-12 w-full text-foreground"
              variant="ghosty"
            >
              <img
                src="https://avatars.githubusercontent.com/u/135858738"
                alt="michelangelo-valderrama"
                className="rounded-md size-8 object-cover"
              />
              <p className="font-bold text-lg">Imangelo</p>
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="aside"
                  className="absolute top-1/2 -translate-y-1/2 right-0.5"
                >
                  <PanelRightOpenIcon className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Close panel</TooltipContent>
            </Tooltip>
          </div>
        </article>
        {/* Nav */}
        <nav className="px-2 mb-5 flex flex-col gap-y-1">
          <div className="relative group">
            <SidebarItem label="Inbox" icon={InboxIcon} />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="aside"
                  className="opacity-0 focus:opacity-100 group-hover:opacity-100 absolute top-1/2 -translate-y-1/2 right-0.5"
                >
                  <PlusIcon className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">New task</TooltipContent>
            </Tooltip>
          </div>
          <SidebarItem label="Tags" icon={TagsIcon} />
        </nav>
        {/* Projects */}
        <div className="flex-1 flex flex-col overflow-auto">
          <div className="flex justify-between items-center pr-2 pl-4 pt-1">
            <p className="uppercase text-muted-foreground/40 font-medium select-none">
              Projects
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground hover:bg-transparent"
                >
                  <PlusIcon className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">New project</TooltipContent>
            </Tooltip>
          </div>
          <ScrollArea className="flex-1 mb-3 mx-1">
            <div className="space-y-1 px-1 pt-1">
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <ProjectItem key={index} />
                ))}
            </div>
          </ScrollArea>
        </div>
        {/* Command Panel */}
        <div>
          <Button
            size="lg"
            variant="ghosty"
            className="gap-x-2.5 justify-start w-full border-t border-t-border h-auto p-4 pt-3 rounded-t-none"
          >
            <CommandIcon className="size-5" />
            Command
          </Button>
        </div>
      </div>
    </div>
  )
}
