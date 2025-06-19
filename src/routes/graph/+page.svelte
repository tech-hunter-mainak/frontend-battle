<script>
	let type = 'All';
	let status = 'Complete';
    import Chart from '$lib/components/Chart.svelte';

  const chartData = [
    { label: 'A', value: 549, color: '#b77474' },
    { label: 'B', value: 278, color: '#b77474' },
    { label: 'C', value: 875, color: '#6f3b3b' },
    { label: 'D', value: 617, color: '#6f3b3b' },
    { label: 'E', value: 506, color: '#6f3b3b' },
    { label: 'F', value: 36,  color: '#b77474' },
    { label: 'G', value: 185, color: '#b77474' },
    { label: 'H', value: 191, color: '#b77474' },
    { label: 'I', value: 122, color: '#b77474' },
    { label: 'J', value: 550, color: '#6f3b3b' },
    { label: 'K', value: 881, color: '#6f3b3b' },
    { label: 'L', value: 539, color: '#6f3b3b' },
    { label: 'M', value: 269, color: '#b77474' },
    { label: 'N', value: 29,  color: '#b77474' },
    { label: 'O', value: 82,  color: '#b77474' },
    { label: 'P', value: 44,  color: '#b77474' },
    { label: 'Q', value: 109, color: '#b77474' },
    { label: 'R', value: 106, color: '#b77474' },
    { label: 'S', value: 607, color: '#6f3b3b' },
    { label: 'T', value: 528, color: '#6f3b3b' }
  ];
  
</script>

<div class="min-h-screen bg-[#faf7f6] p-6 text-[#332f2e] md:p-12">
	<!-- Filters -->
	<div class="mb-8">
		<div class="mb-4 text-lg font-medium">Filter by</div>
		<div class="mb-4 flex flex-wrap gap-4">
			<button
				on:click={() => (type = 'Refurbishment')}
				class="rounded-full border px-4 py-2 transition-all"
				class:selected={type === 'Refurbishment'}>Refurbishment</button
			>
			<button
				on:click={() => (type = 'New build')}
				class="rounded-full border px-4 py-2 transition-all"
				class:selected={type === 'New build'}>New build</button
			>
			<button on:click={() => (type = 'All')} class="rounded-full bg-[#6f3b3b] px-4 py-2 text-white"
				>All</button
			>
		</div>
		<div class="flex gap-4">
			<button
				on:click={() => (status = 'Complete')}
				class="rounded-full px-4 py-2 {status === 'Complete' ? 'bg-[#6f3b3b] text-white' : ''}"
				class:selected={status === 'Complete'}>Complete</button
			>
			<button
				on:click={() => (status = 'Estimate')}
				class="rounded-full border px-4 py-2 transition-all">Estimate</button
			>
		</div>
	</div>

	<!-- Key -->
	<div class="mb-8">
		<div class="mb-2 text-lg font-medium">Key</div>
		<div class="space-y-1">
			<div class="flex items-center gap-2">
				<div class="w-8 border-t-2 border-dashed border-gray-500"></div>
				<div>500 kgCO₂e/m<sup>2</sup> - Embodied Carbon Target 2030</div>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-8 border-t-2 border-gray-800"></div>
				<div>600 kgCO₂e/m<sup>2</sup> - Embodied Carbon Target 2025</div>
			</div>
		</div>
	</div>

	<!-- Heading & Download -->
	<div class="mb-6 flex flex-col items-start justify-between md:flex-row md:items-center">
		<div>
			<h1 class="text-4xl leading-snug font-semibold text-[#2b2b2b] md:text-5xl">
				EMBODIED<br /><span class="text-[#783c3c]">CARBON<br />EMISSIONS</span>
			</h1>
			<p class="mt-2 text-sm text-[#444]">Intensity measured by kgCO₂e/m<sup>2</sup></p>
		</div>
		<button
			class="mt-4 flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-gray-100 md:mt-0"
		>
			Download the data
			<span class="text-lg">⬇️</span>
		</button>
	</div>

	<!-- Chart Placeholder -->
	<div class="w-full overflow-x-auto rounded bg-white p-4 shadow">
		<Chart data={chartData} />
	</div>
</div>

<style>
</style>
