import { useEffect } from 'react'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'

export default function ProjectPage() {
  const [$breadcrumbUpdate] = useBreadcrumbStore((s) => [s.update])

  useEffect(() => {
    $breadcrumbUpdate([{ name: 'Projects' }, { name: 'Project Name' }])
  }, [$breadcrumbUpdate])

  return (
    <div>
      <p>Project page</p>
    </div>
  )
}
