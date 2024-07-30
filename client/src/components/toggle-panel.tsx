import { PanelRightOpenIcon, PanelRightCloseIcon } from 'lucide-react'
import { useSidebarStore } from '@/stores/sidebar.store'
import { Button, type ButtonProps } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

export function TogglePanel(props: ButtonProps) {
  const [$sidebarOpen, $sidebarToggle] = useSidebarStore((s) => [
    s.open,
    s.toggle
  ])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="aside"
          onClick={() => $sidebarToggle()}
          data-sidebar-open={$sidebarOpen}
          {...props}
        >
          {$sidebarOpen ? (
            <PanelRightOpenIcon className="size-icon" />
          ) : (
            <PanelRightCloseIcon className="size-icon" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        {$sidebarOpen ? 'Close' : 'Open'} panel
      </TooltipContent>
    </Tooltip>
  )
}
