<script lang="ts">
	import { goto } from '$app/navigation';
	import Input from '$lib/components/input.svelte';
	import { Routes } from '$lib/constants';
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

	const handleLogin = (e: Event) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const email = formData.get('email');
		const password = formData.get('password');

		// TODO: Add API call to login

		const result = loginSchema.safeParse({ email, password });

		if (!result.success) {
			errors.email = result.error.flatten().fieldErrors.email ?? null;
			errors.password = result.error.flatten().fieldErrors.password ?? null;
		}

		if (result.success) {
			if (
				result.data.email === 'contact@mattdeal.com.au' &&
				result.data.password === 'password'
			) {
				goto(Routes.HOME);
			}
		}
	};
</script>

<div class="m-54 flex flex-col items-center">
	<form
		onsubmit={handleLogin}
		class="flex w-xl flex-col gap-5 rounded-md border border-gray-500 p-6 shadow-xl"
	>
		<h1 class="text-center text-2xl font-bold">Login</h1>
		<Input label="Email" type="email" id="email" />
		{#if errors.email}
			<p class="text-red-500">{errors.email}</p>
		{/if}
		<Input label="Password" type="password" id="password" />
		{#if errors.password}
			<p class="text-red-500">{errors.password}</p>
		{/if}
		<button
			class="cursor-pointer rounded-md bg-blue-500 p-2 text-white active:scale-105"
			type="submit"
		>
			Login
		</button>
	</form>
</div>
