import { useEffect } from 'react'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { Task } from '@/components/task'

export default function ProjectPage() {
  const [$breadcrumbUpdate] = useBreadcrumbStore((s) => [s.update])

  useEffect(() => {
    $breadcrumbUpdate([{ name: 'Projects' }, { name: 'Project Name' }])
  }, [$breadcrumbUpdate])

  return (
    <div className="max-w-[580px] mx-auto">
      <div className="flex flex-col mt-10">
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  )
}
