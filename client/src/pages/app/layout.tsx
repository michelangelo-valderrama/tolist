import { Outlet } from 'react-router-dom'
import { AmbientColor } from '@/components/ambient-color'
import { Nav } from '@/components/nav'

export default function AppLayout() {
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
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  )
}
