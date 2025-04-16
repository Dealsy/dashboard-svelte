<script lang="ts">
	import { goto } from '$app/navigation';
	import Input from '$lib/components/input.svelte';
	import { LoginAPI, Routes } from '$lib/constants';
	import { z } from 'zod';

	const loginSchema = z.object({
		email: z.string().email(),
		password: z.string().min(8)
	});

	const errors = $state<{
		email: string[] | null;
		password: string[] | null;
	}>({
		email: null,
		password: null
	});

	const handleLogin = async (e: Event) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const email = formData.get('email');
		const password = formData.get('password');

		const response = await fetch(LoginAPI, {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			credentials: 'include',
			mode: 'cors'
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Login failed');
		}

		const data = await response.json();

		// TODO: Save token to cookies

		const result = loginSchema.safeParse({ email, password });

		if (!result.success) {
			errors.email = result.error.flatten().fieldErrors.email ?? null;
			errors.password = result.error.flatten().fieldErrors.password ?? null;
		}

		if (result.success) {
			goto(Routes.HOME);
		}
	};
</script>

<div class="m-54 flex flex-col items-center">
	<form
		onsubmit={handleLogin}
		class="flex w-xl max-w-sm flex-col gap-5 rounded-md border border-zinc-700 p-5 shadow-xl"
	>
		<h1 class=" text-2xl font-bold">Login</h1>
		<p class="text-sm text-gray-400">
			Enter your email below to login to your account
		</p>
		<Input
			placeholder="test@example.com"
			label="Email"
			type="email"
			id="email"
			error={errors.email}
		/>
		<Input
			label="Password"
			type="password"
			id="password"
			error={errors.password}
		/>

		<button
			class="cursor-pointer rounded-md bg-black p-2 text-white active:scale-105 dark:bg-white dark:text-black"
			type="submit"
		>
			Login
		</button>
		<p class="text-sm text-gray-400">
			Don't have an account? <a href={Routes.SIGN_UP}>Sign up</a>
		</p>
	</form>
</div>
