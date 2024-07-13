import { cn } from '@/lib/utils'
import { useSidebarStore } from '@/stores/sidebar.store'
import { Button, type ButtonProps } from '@/components/ui/button'
import { SmplTooltip } from '@/components/ui/tooltip'

interface Props extends ButtonProps {
  label: string
  icon: React.ElementType
}

export function SidebarItem({
  icon: Icon,
  label,
  className,
  children,
  ...props
}: Props) {
  const [$sidebarOpen] = useSidebarStore((s) => [s.open])

  if ($sidebarOpen)
    return (
      <Button
        className={cn('px-2 w-full justify-start gap-x-2.5', className)}
        variant="ghosty"
        size="lg"
        {...props}
      >
        <Icon className="size-5" />
        {label}
        {children}
      </Button>
    )
  return (
    <SmplTooltip side="right" content={label}>
      <Button
        className={cn('size-12', className)}
        variant="ghosty"
        size="icon"
        {...props}
      >
        <Icon className="size-5" />
        {children}
      </Button>
    </SmplTooltip>
  )
}
