import { create } from 'zustand'

interface INavState {
	navOpen: boolean
	setNavOpen: (open: boolean) => void
}

export const useNavStore = create<INavState>((set) => ({
	navOpen: false,
	setNavOpen: (open: boolean) => set(() => ({ navOpen: !open })),
}))
