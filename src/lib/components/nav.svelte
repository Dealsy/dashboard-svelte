<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	import { Routes } from '$lib/constants';
</script>

<nav
	class="sticky top-0 z-50 flex items-center justify-between bg-black/20 px-6 py-4 backdrop-blur-xs"
>
	<ul class="flex flex-row gap-2">
		<li>
			<a href={Routes.HOME}>Home</a>
		</li>
		<li>
			<a href={Routes.ABOUT}>About</a>
		</li>
		<li>
			<a href={Routes.LOGIN}>Login</a>
		</li>
	</ul>
	<div class="flex justify-end p-4">
		<ThemeToggle />
	</div>
</nav>
