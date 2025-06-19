<script>
	export let name;
	export let title;
	export let image;
	export let quote;
</script>

<div
	class="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-lg transition-shadow duration-300 hover:shadow-2xl"
>
	<img
		src={image}
		alt={name}
		class="mb-4 h-24 w-24 rounded-full border-4 border-indigo-500 object-cover"
	/>
	<h3 class="text-lg font-semibold text-gray-900">{name}</h3>
	<p class="text-sm text-gray-500">{title}</p>
	{#if quote}
		<p class="mt-3 text-sm text-gray-600 italic">"{quote}"</p>
	{/if}
</div>
