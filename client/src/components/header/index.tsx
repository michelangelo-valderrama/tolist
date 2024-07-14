import { EllipsisVerticalIcon } from 'lucide-react'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { TogglePanel } from '@/components/toggle-panel'

export function Header() {
  const [$breadcrumb] = useBreadcrumbStore((s) => [s.items])

  const items = $breadcrumb.flatMap((item, i) => {
    if (i + 1 === $breadcrumb.length) {
      return {
        ...item,
        type: 'page'
      }
    }
    return [
      {
        ...item,
        type: 'link'
      },
      {
        ...item,
        type: 'separator'
      }
    ]
  })

  return (
    <header className="border-b border-white/10 p-2 pt-4 flex justify-between items-center mb-4">
      <div className="flex items-center relative gap-x-3">
        <TogglePanel className="data-[sidebar-open=true]:hidden" />
        <Breadcrumb className="text-white/60">
          <BreadcrumbList>
            {items.map((item, i) => {
              if (item.type === 'page') {
                return (
                  <BreadcrumbItem key={item.name}>
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                )
              }
              if (item.type === 'link') {
                return (
                  <BreadcrumbItem key={item.name}>
                    <BreadcrumbLink asChild className="hover:text-inherit">
                      <span>{item.name}</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                )
              }
              return <BreadcrumbSeparator key={i} />
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Button size="icon" variant="ghost" className="hover:bg-transparent">
        <EllipsisVerticalIcon className="size-5" />
      </Button>
    </header>
  )
}
