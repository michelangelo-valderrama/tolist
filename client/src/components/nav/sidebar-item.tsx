import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props extends ButtonProps {
  label: string
  icon: React.ElementType
}

export function SidebarItem({ icon, label, className, ...props }: Props) {
  const Icon = icon
  return (
    <Button
      variant="ghosty"
      size="lg"
      {...props}
      className={cn('px-2 w-full justify-start gap-x-2.5', className)}
    >
      <Icon className="size-5" />
      {label}
      {props.children}
    </Button>
  )
}
