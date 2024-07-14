import { Outlet } from 'react-router-dom'
import { Nav } from '@/components/nav'
import { Header } from '@/components/header'

export default function AppLayout() {
  return (
    <main
      className="w-dvw h-dvh overflow-hidden select-none relative"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="h-full flex z-10">
        <Nav />
        <div className="flex-1 p-4 pl-0">
          <div className="size-full overflow-y-scroll">
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  )
}
