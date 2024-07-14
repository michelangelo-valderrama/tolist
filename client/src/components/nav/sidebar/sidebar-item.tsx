import { cn } from '@/lib/utils'
import { useSidebarStore } from '@/stores/sidebar.store'
import { Button, type ButtonProps } from '@/components/ui/button'
import { SmplTooltip } from '@/components/ui/tooltip'
import { Link } from 'react-router-dom'

interface Props extends ButtonProps {
  url: string
  label: string
  icon: React.ElementType
}

export function SidebarItem({
  url,
  label,
  className,
  children,
  icon: Icon,
  ...props
}: Props) {
  const [$sidebarOpen] = useSidebarStore((s) => [s.open])

  if ($sidebarOpen)
    return (
      <Link to={url}>
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
      </Link>
    )
  return (
    <SmplTooltip side="right" content={label}>
      <Link to={url}>
        <Button
          className={cn('size-12', className)}
          variant="ghosty"
          size="icon"
          {...props}
        >
          <Icon className="size-5" />
          {children}
        </Button>
      </Link>
    </SmplTooltip>
  )
}
