import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { useSidebarStore } from '@/stores/sidebar.store'
import { Separator } from '@/components/ui/separator'

interface Props extends HTMLAttributes<HTMLDivElement> {
  label: string
}

export function Section({ label, className, children, ...props }: Props) {
  const [$sidebarOpen] = useSidebarStore((s) => [s.open])

  if ($sidebarOpen) {
    return (
      <div
        {...props}
        className={cn(
          'flex justify-between items-center pr-2 pl-4 pt-1 text-muted-foreground/40 font-medium',
          className
        )}
      >
        <p aria-label={label} className="uppercase">
          {label}
        </p>
        {children}
      </div>
    )
  }

  return (
    <div className="px-3 mb-2">
      <Separator />
    </div>
  )
}
