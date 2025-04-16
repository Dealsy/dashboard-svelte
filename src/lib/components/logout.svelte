<script lang="ts">
	import { auth } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { Routes } from '$lib/constants';

	const handleLogout = () => {
		// Clear cookies
		document.cookie =
			'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
		document.cookie =
			'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

		// Clear auth state
		auth.clearAuth();

		// Redirect to login
		goto(Routes.LOGIN);
	};
</script>

<button
	on:click={handleLogout}
	class="cursor-pointer rounded-md bg-black p-2 text-white active:scale-105 dark:bg-white dark:text-black"
>
	Logout
</button>
