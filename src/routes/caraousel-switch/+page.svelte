<script>
	import bgimg from '$lib/ScreenshotBG.png';
	let hovered = false;
	let hovered2 = false;
</script>

<div class="flex h-screen w-full flex-col md:flex-row">
	<!-- Left Product -->
	<div
		class="relative flex-1 bg-cover bg-center transition duration-300 ease-in-out"
		on:mouseenter={() => (hovered = true)}
		on:mouseleave={() => (hovered = false)}
		style="background-image: url({bgimg})"
		role="region"
	>
		<span class="absolute top-4 left-4 text-lg text-white italic">NEW</span>

		{#if hovered}
			<div class="absolute inset-0 flex flex-col justify-end bg-white/60 backdrop-blur-sm">
				<div class="bg-white p-4 text-center">
					<button
						class="bg-black px-6 py-2 text-sm font-semibold tracking-wide text-white uppercase"
					>
						Add to Bag +
					</button>
				</div>
			</div>
		{/if}
	</div>

	<!-- Right Product -->
	<div
		class="relative flex-1 bg-cover bg-center transition duration-300 ease-in-out"
		on:mouseenter={() => (hovered2 = true)}
		on:mouseleave={() => (hovered2 = false)}
		style="background-image: url({bgimg})"
		role="region"
	>
		<span class="absolute top-4 left-4 text-lg text-white italic">NEW</span>

		{#if hovered2}
			<div class="absolute inset-0 flex flex-col justify-end bg-white/60 backdrop-blur-sm">
				<div class="bg-white p-4 text-center">
					<button
						class="bg-black px-6 py-2 text-sm font-semibold tracking-wide text-white uppercase"
					>
						Add to Bag +
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>
