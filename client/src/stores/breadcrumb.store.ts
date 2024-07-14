import { create } from 'zustand'

interface BreadcrumbState {
  items: { name: string }[]
  update: (items?: { name: string }[]) => void
}

export const useBreadcrumbStore = create<BreadcrumbState>()((set) => ({
  items: [{ name: 'Profile', href: '/app/profile' }],
  update: (items) => set(() => ({ items }))
}))
