import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export enum Theme {
	light = 'light',
	dark = 'dark',
}

type State = {
	theme: Theme
}

type Actions = {
	setCurrentTheme: (theme: Theme) => void
	theme: Theme
	isLightTheme: () => boolean
	reset: () => void
}

type ThemeStore = State & Actions

const initialState =
	typeof window !== 'undefined'
		? {
				theme:
					window.matchMedia &&
					window.matchMedia('(prefers-color-scheme: dark)').matches
						? Theme.dark
						: Theme.light,
		  }
		: { theme: Theme.light }

const useThemeStore = create<ThemeStore>()(
	persist(
		(set, get) => ({
			...initialState,
			setCurrentTheme: (theme: Theme) => {
				set({ theme })
			},
			isLightTheme: () => {
				return get().theme === Theme.light
			},
			reset: () => set(initialState),
		}),
		{
			name: 'themeStorage',
			storage: createJSONStorage(() => localStorage),
		}
	)
)

export { useThemeStore }
export type { ThemeStore }
