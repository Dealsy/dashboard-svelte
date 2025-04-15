export const Routes = {
	HOME: '/',
	ABOUT: '/about',
	LOGIN: '/auth/login'
} as const;

export type Route = (typeof Routes)[keyof typeof Routes];
