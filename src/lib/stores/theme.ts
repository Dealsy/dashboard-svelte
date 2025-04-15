import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

const createThemeStore = () => {
	const { subscribe, set, update } = writable<Theme>('light');

	return {
		subscribe,
		toggle: () => {
			update((theme) => {
				const newTheme = theme === 'light' ? 'dark' : 'light';
				document.documentElement.classList.toggle('dark', newTheme === 'dark');
				return newTheme;
			});
		},
		set: (theme: Theme) => {
			set(theme);
			document.documentElement.classList.toggle('dark', theme === 'dark');
		}
	};
};

export const theme = createThemeStore();
