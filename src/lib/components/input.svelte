<script lang="ts">
	let { label, type, id } = $props();
</script>

<label for={id}>{label}</label>
<input
	class="rounded-md border-2 border-gray-500 p-2"
	name={type}
	{id}
	{type}
/>
