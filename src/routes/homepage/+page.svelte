<script>
	import IndividualCard from '$lib/components/IndividualCard.svelte';

	const people = [
		{
			name: 'Alice Johnson',
			title: 'Lead Designer',
			image: '/images/alice.jpg',
			quote: 'Design is intelligence made visible.'
		},
		{
			name: 'Bob Smith',
			title: 'Senior Developer',
			image: '/images/bob.jpg',
			quote: 'Code is like humor. When you have to explain it, it’s bad.'
		},
		{
			name: 'Clara Lee',
			title: 'Project Manager',
			image: '/images/clara.jpg',
			quote: 'Great things in business are never done by one person.'
		}
	];
</script>

<section class="bg-gray-50 py-16">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<h2 class="mb-10 text-center text-3xl font-bold text-gray-900">Meet the Team</h2>
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
			{#each people as person}
				<IndividualCard {...person} />
			{/each}
		</div>
	</div>
</section>
