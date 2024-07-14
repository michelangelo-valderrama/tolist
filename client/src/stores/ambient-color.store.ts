import { create } from 'zustand'

interface AmbientColorState {
  color?: string
  update: (color?: string) => void
}

export const useAmbientColorStore = create<AmbientColorState>()((set) => ({
  color: undefined,
  update: (color = '') => set(() => ({ color }))
}))
