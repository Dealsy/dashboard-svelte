import type { Handle } from '@sveltejs/kit';
import { Routes } from '$lib/constants';

const publicRoutes = [Routes.LOGIN, Routes.SIGN_UP] as const;

export const handle: Handle = async ({ event, resolve }) => {
	// Handle CORS preflight requests
	if (event.request.method === 'OPTIONS') {
		return new Response(null, {
			headers: {
				'Access-Control-Allow-Methods':
					'GET, POST, PUT, DELETE, PATCH, OPTIONS',
				'Access-Control-Allow-Origin': 'http://localhost:5173',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Max-Age': '86400'
			}
		});
	}

	// Check if the route is public
	const isPublicRoute = publicRoutes.includes(
		event.url.pathname as (typeof publicRoutes)[number]
	);

	// If not a public route, check for authentication
	if (!isPublicRoute) {
		const accessToken = event.cookies.get('accessToken');

		if (!accessToken) {
			return new Response('Unauthorized', {
				status: 302,
				headers: {
					Location: Routes.LOGIN
				}
			});
		}

		// Add the token to the request headers for API calls
		event.request.headers.set('Authorization', `Bearer ${accessToken}`);
	}

	const response = await resolve(event);

	// Add CORS headers to all responses
	response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173');
	response.headers.set(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS'
	);
	response.headers.set(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization, Accept'
	);
	response.headers.set('Access-Control-Allow-Credentials', 'true');

	return response;
};
