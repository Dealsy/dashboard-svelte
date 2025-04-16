export const API_URL = import.meta.env.VITE_API_URL;
export const LoginAPI = `${API_URL}/auth/login`;

export const Routes = {
	HOME: '/',
	ABOUT: '/about',
	LOGIN: '/auth/login',
	SIGN_UP: '/auth/sign-up'
} as const;

export type Route = (typeof Routes)[keyof typeof Routes];
