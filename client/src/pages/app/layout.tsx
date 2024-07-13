import { Outlet } from 'react-router-dom'
import { AmbientColor } from '@/components/ambient-color'
import { Nav } from '@/components/nav'
import { Button } from '@/components/ui/button'
import { EllipsisVerticalIcon } from 'lucide-react'
import { TogglePanel } from '@/components/toggle-panel'
import { useSidebarStore } from '@/stores/sidebar.store'

export default function AppLayout() {
  const [$sidebarOpen] = useSidebarStore((s) => [s.open])

  return (
    <main
      className="w-dvw h-dvh overflow-hidden select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <AmbientColor />
      <div className="h-full flex z-10 relative">
        <Nav />
        <div className="flex-1 p-4 pl-0">
          <div className="size-full overflow-y-scroll">
            <header className="border-b border-white/10 p-2 pt-4 flex justify-between items-center mb-4">
              <div className="flex items-center relative">
                <TogglePanel className="absolute top-1/2 -translate-y-1/2 data-[sidebar-open=true]:hidden" />
                <h1
                  className="font-medium text-white/80 text-lg data-[sidebar-open=false]:translate-x-10"
                  data-sidebar-open={$sidebarOpen}
                >
                  Profile
                </h1>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-transparent"
              >
                <EllipsisVerticalIcon className="size-5" />
              </Button>
            </header>
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  )
}
