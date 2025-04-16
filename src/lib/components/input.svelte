<script lang="ts">
	let { label, type, id, placeholder = '', error } = $props();
</script>

<label for={id}>{label}</label>
<input
	class="rounded-md border-2 border-zinc-700 p-2"
	name={type}
	{placeholder}
	{id}
	{type}
/>

{#if error}
	<p class="leading-1 text-red-500">{error}</p>
{/if}
