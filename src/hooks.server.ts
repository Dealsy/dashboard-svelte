import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Handle CORS preflight requests
	if (event.request.method === 'OPTIONS') {
		return new Response(null, {
			headers: {
				'Access-Control-Allow-Methods':
					'GET, POST, PUT, DELETE, PATCH, OPTIONS',
				'Access-Control-Allow-Origin': 'http://localhost:3000',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Max-Age': '86400'
			}
		});
	}

	const response = await resolve(event);

	// Add CORS headers to all responses
	response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
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
