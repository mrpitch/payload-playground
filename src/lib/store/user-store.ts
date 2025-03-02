import { create } from 'zustand'
import type { User } from '@payload-types'

interface IUserState {
	user: User | null
	setUser: (user: User | null) => void
	isAuthenticated: () => boolean
	reset: () => void
}

const initialState = {
	user: null,
}

export const useUserStore = create<IUserState>((set, get) => ({
	...initialState,
	setUser: (user: User | null) => set({ user }),
	isAuthenticated: () => get().user !== null,
	reset: () => set(initialState),
}))
