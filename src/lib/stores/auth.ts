import { writable } from 'svelte/store';

type Tokens = {
	access_token: string;
	refresh_token: string;
};

type AuthState = {
	isAuthenticated: boolean;
	tokens: Tokens | null;
};

const createAuthStore = () => {
	const { subscribe, set, update } = writable<AuthState>({
		isAuthenticated: false,
		tokens: null
	});

	return {
		subscribe,
		setTokens: (tokens: Tokens) => {
			update((state) => ({ ...state, tokens, isAuthenticated: true }));
		},
		clearAuth: () => {
			set({
				isAuthenticated: false,
				tokens: null
			});
		}
	};
};

export const auth = createAuthStore();
