import { InboxIcon, PlusIcon, TagsIcon } from 'lucide-react'
import { useSidebarStore } from '@/stores/sidebar.store'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { SmplTooltip } from '@/components/ui/tooltip'
import { TogglePanel } from '@/components/toggle-panel'
import { SidebarItem } from './sidebar-item'
import { Project } from './project'
import { Profile } from './profile'
import { Section } from './section'
import { Command } from './command'

export function Sidebar() {
  const [$sidebarOpen] = useSidebarStore((s) => [s.open])

  return (
    <div className="h-full p-4">
      <div
        className="relative z-10 h-full bg-sidebar/80 backdrop-blur-sm border rounded-md shadow-black/20 shadow-lg flex flex-col w-16 data-[sidebar-open=true]:w-80"
        data-sidebar-open={$sidebarOpen}
      >
        {/* Profile */}
        <article className="p-2 mb-2">
          <div className="relative">
            <Profile
              username="Imagelo"
              pictureUrl="https://avatars.githubusercontent.com/u/135858738"
            />
            <TogglePanel
              className={`
                absolute top-1/2 -translate-y-1/2 right-0.5
                data-[sidebar-open=false]:hidden
              `}
            />
          </div>
        </article>
        {/* Nav */}
        <nav className="px-2 mb-5 flex flex-col gap-y-1">
          <div className="relative group">
            <SidebarItem
              url="/app/project/inbox"
              label="Inbox"
              icon={InboxIcon}
            />
            {$sidebarOpen && (
              <SmplTooltip content="Add task" side="right">
                <Button
                  size="icon"
                  variant="aside"
                  className="opacity-0 focus:opacity-100 group-hover:opacity-100 absolute top-1/2 -translate-y-1/2 right-0.5"
                >
                  <PlusIcon className="size-5" />
                </Button>
              </SmplTooltip>
            )}
          </div>
          <SidebarItem url="/app/tags" label="Tags" icon={TagsIcon} />
        </nav>
        {/* Projects */}
        <div className="flex-1 flex flex-col overflow-auto">
          <Section label="Projects">
            <SmplTooltip content="New project" side="right">
              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground hover:bg-transparent"
              >
                <PlusIcon className="size-5" />
              </Button>
            </SmplTooltip>
          </Section>
          <ScrollArea className="flex-1 mb-3 mx-1">
            <div className="px-1 pt-1 flex flex-col gap-y-1">
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <Project
                    id="123"
                    name="Imangelo Blog"
                    pictureUrl="https://imangelo.dev/favicon.svg"
                    key={index}
                  />
                ))}
              <Project
                id="123"
                name="Todoist"
                pictureUrl="https://todoist.com/static/favicon-32x32.png"
                undoneTasks={3}
              />
            </div>
          </ScrollArea>
        </div>
        {/* Command Panel */}
        <div>
          <Command />
        </div>
      </div>
    </div>
  )
}
