import { useEffect } from 'react'
import { useAmbientColorStore } from '@/stores/ambient-color.store'
import { AmbientColor } from '@/components/ambient-color'

export default function ProfilePage() {
  const [$updateAmbientColor] = useAmbientColorStore((s) => [s.update])

  useEffect(() => {
    console.log('Profile page')
    $updateAmbientColor('203 100% 58%')
  }, [$updateAmbientColor])

  return (
    <>
      <AmbientColor />
      <div>
        <p>Profile page</p>
      </div>
    </>
  )
}
