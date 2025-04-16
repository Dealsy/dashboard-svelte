<script lang="ts">
	import Input from '$lib/components/input.svelte';
	import { Routes } from '$lib/constants';
	import { z } from 'zod';

	const loginSchema = z
		.object({
			email: z.string().email(),
			password: z.string().min(8),
			confirmPassword: z.string().min(8)
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: 'Passwords must match',
			path: ['confirmPassword']
		});

	const errors = $state<{
		email: string[] | null;
		password: string[] | null;
		confirmPassword: string[] | null;
	}>({
		email: null,
		password: null,
		confirmPassword: null
	});

	const handleSignUp = (e: Event) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const data = {
			email: formData.get('email')?.toString() ?? '',
			password: formData.get('password')?.toString() ?? '',
			confirmPassword: formData.get('confirmPassword')?.toString() ?? ''
		};

		const result = loginSchema.safeParse(data);

		if (!result.success) {
			const flattened = result.error.flatten();
			errors.email = flattened.fieldErrors?.email ?? null;
			errors.password = flattened.fieldErrors?.password ?? null;
			errors.confirmPassword =
				flattened.formErrors.length > 0
					? flattened.formErrors
					: (flattened.fieldErrors?.confirmPassword ?? null);
		}
	};
</script>

<div class="m-54 flex flex-col items-center">
	<form
		onsubmit={handleSignUp}
		class="flex w-xl max-w-sm flex-col gap-5 rounded-md border border-zinc-700 p-5 shadow-xl"
	>
		<h1 class=" text-2xl font-bold">Sign up</h1>
		<p class="text-sm text-gray-400">Sign up to create an account</p>
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

		<Input
			label="Confirm Password"
			type="password"
			id="confirmPassword"
			error={errors.confirmPassword}
		/>

		<button
			class="cursor-pointer rounded-md bg-black p-2 text-white active:scale-105 dark:bg-white dark:text-black"
			type="submit"
		>
			Sign up
		</button>
		<p class="text-sm text-gray-400">
			Already have an account? <a href={Routes.LOGIN}>Login</a>
		</p>
	</form>
</div>
