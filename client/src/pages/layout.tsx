import { TooltipProvider } from '@/components/ui/tooltip'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <TooltipProvider delayDuration={100}>
      <Outlet />
    </TooltipProvider>
  )
}
