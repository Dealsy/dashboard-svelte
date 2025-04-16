<script lang="ts">
	import '../app.css';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import Nav from '$lib/components/nav.svelte';
	import { Routes } from '$lib/constants';

	let { children } = $props();

	onMount(() => {
		// Check for saved theme preference
		const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
		const prefersDark = window.matchMedia(
			'(prefers-color-scheme: dark)'
		).matches;

		// Set theme based on saved preference or system preference
		theme.set(savedTheme || (prefersDark ? 'dark' : 'light'));

		// Listen for system theme changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent) => {
			if (!localStorage.getItem('theme')) {
				theme.set(e.matches ? 'dark' : 'light');
			}
		};

		mediaQuery.addEventListener('change', handleChange);

		// Cleanup
		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	});

	// Subscribe to theme changes and save to localStorage
	$effect(() => {
		if ($theme) {
			localStorage.setItem('theme', $theme);
		}
	});

	const hiddenPaths = [Routes.LOGIN, Routes.SIGN_UP] as const;

	type HiddenRoute = (typeof hiddenPaths)[number];
</script>

<div class="bg-background text-foreground min-h-screen">
	{#if !hiddenPaths.includes(page.url.pathname as HiddenRoute)}
		<Nav />
	{/if}
	<div class="p-6">
		{@render children()}
	</div>
</div>
