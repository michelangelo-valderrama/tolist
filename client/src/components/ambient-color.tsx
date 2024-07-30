import { useAmbientColorStore } from '@/stores/ambient-color.store'

export function AmbientColor() {
  const [$ambientColor] = useAmbientColorStore((s) => [s.color])

  return (
    <div
      style={
        {
          '--ambient-color': $ambientColor
        } as React.CSSProperties
      }
      className={`absolute w-full h-80 -z-10 bg-[hsl(var(--ambient-color))]/30 top-0 left-0 animate-in`}
    >
      <div className="absolute w-full z-0 h-80 bg-gradient-to-t from-background"></div>
    </div>
  )
}
