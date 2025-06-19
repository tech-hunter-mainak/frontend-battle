<script>
	let selected = 'The Agency';

	const brands = [
		{
			name: 'ECorp',
			colors: ['bg-green-500', 'bg-white', 'bg-gray-800']
		},
		{
			name: 'ICorp',
			colors: ['bg-orange-400', 'bg-white', 'bg-gray-800']
		},
		{
			name: 'The Agency',
			colors: ['bg-red-500', 'bg-white', 'bg-violet-500']
		}
	];
</script>

<div
	class="w-[320px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px]"
>
	<div class="rounded-2xl bg-black p-4">
		<h2 class="mb-4 text-lg font-semibold text-white">Brand Kits</h2>

		{#each brands as brand}
			<div
				class="mb-3 flex cursor-pointer items-center justify-between rounded-xl p-3 transition last:mb-0 hover:bg-gray-800"
				class:bg-gray-900={selected === brand.name}
				on:click={() => (selected = brand.name)}
			>
				<div class="flex items-center gap-3">
					<div class="flex items-center gap-1">
						{#each brand.colors as color}
							<div class={`h-3 w-3 rounded-full ${color}`}></div>
						{/each}
					</div>
					<span class="font-medium text-white">{brand.name}</span>
				</div>

				{#if selected === brand.name}
					<div class="flex h-4 w-4 items-center justify-center rounded-md bg-violet-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-3 w-3 text-white"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
				{:else}
					<div class="h-4 w-4 rounded-md border border-gray-700"></div>
				{/if}

				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 text-white"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
					</svg>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	/* Optional: Smooth hover/focus transitions */
	div[role='button']:focus {
		outline: none;
		box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.5);
	}
</style>
