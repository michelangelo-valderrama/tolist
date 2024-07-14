import { useEffect } from 'react'
import { useAmbientColorStore } from '@/stores/ambient-color.store'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { AmbientColor } from '@/components/ambient-color'

export default function ProfilePage() {
  const [$updateAmbientColor] = useAmbientColorStore((s) => [s.update])
  const [$breadcrumbUpdate] = useBreadcrumbStore((s) => [s.update])

  useEffect(() => {
    $updateAmbientColor('203 100% 58%')
    $breadcrumbUpdate([{ name: 'Profile' }])
  }, [$updateAmbientColor, $breadcrumbUpdate])

  return (
    <>
      <AmbientColor />
      <div>
        <p>Profile page</p>
      </div>
    </>
  )
}
