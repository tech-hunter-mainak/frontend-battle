<script lang="ts">
	const stats = [
		{ label: 'SvelteKit', value: 'Frontend' },
		{ label: 'Tailwind', value: 'CSS' },
		{ label: 'Vercel', value: 'Deployment' },
		{ label: 'GitHub', value: 'Version Control' }
	];

	const navCards = [
		{
			title: 'Caraousel Switch',
			description: '',
			href: '/caraousel-switch'
		},
		{
			title: 'Card',
			description: '',
			href: '/card'
		},
		{
			title: 'Customer Section',
			description: '',
			href: '/customer-section'
		},
		{
			title: 'Feature Services',
			description: '',
			href: '/feature-services'
		},
		{
			title: 'Loader',
			description: '',
			href: '/loader'
		},
		{
			title: 'Graph',
			description: '',
			href: '/graph'
		},
		{
			title: 'Home Page',
			description: '',
			href: '/homepage'
		},
		{
			title: 'Parallex Effect',
			description: '',
			href: '/parallex-effect'
		},
		{
			title: 'Ripple',
			description: '',
			href: '/ripple'
		},
		{
			title: 'Stats',
			description: '',
			href: '/stats'
		},
		{
			title: 'Striking',
			description: '',
			href: '/striking'
		}
	];
</script>

<style>
	.background-grid {
		background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
		background-size: 40px 40px;
	}
</style>

<div class="min-h-screen bg-[#0b0f1a] text-white background-grid">
	<!-- Navbar -->
	<nav class="flex justify-between items-center px-6 py-4 bg-black bg-opacity-40">
		<div class="flex items-center gap-2">
			<div class="bg-blue-500 rounded-md p-2 text-xl font-bold text-white">VC</div>
			<div>
				<h1 class="font-semibold text-lg">Vibe Coded</h1>
				<p class="text-sm text-gray-400">Code that resonates.</p>
			</div>
		</div>
		<div class="hidden md:flex gap-6 text-sm text-gray-300">
			<a href="/" class="hover:text-blue-400">Home</a>
		</div>
	</nav>

	<!-- Hero -->
	<section class="text-center px-4 mt-20">
		<h1 class="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
			VIBE CODED
		</h1>
		<h2 class="text-xl sm:text-2xl text-purple-400 mt-4 font-semibold">
			Where Code Meets Aesthetic Vibes
		</h2>

		<div class="max-w-3xl mx-auto mt-8 bg-black bg-opacity-40 rounded-xl p-6">
			<p class="text-gray-300 text-lg font-medium">
				Crafting beautiful, meaningful, and futuristic web experiences.
			</p>
			<p class="text-sm text-gray-400 mt-2">
				Bringing ideas to life with design and code. This is more than development — it’s a vibe.
			</p>

			<!-- Stats -->
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
				{#each stats as s}
					<div class="bg-[#1a1d2e] rounded-xl py-4 px-3 text-center shadow-md">
						<h3 class="text-lg font-bold text-cyan-400">{s.value}</h3>
						<p class="text-sm text-gray-400">{s.label}</p>
					</div>
				{/each}
			</div>

			<!-- Social Buttons -->
			<div class="flex flex-wrap justify-center gap-4 mt-6">
				<a href="https://github.com/tech-hunter-mainak" target="_blank" class="bg-[#1a1d2e] px-5 py-2 rounded-xl hover:bg-[#25293e] transition">GitHub</a>
				<a href="https://linkedin.com/in/mainakdasnits" target="_blank" class="bg-[#1a1d2e] px-5 py-2 rounded-xl hover:bg-[#25293e] transition">LinkedIn</a>
				<a href="https://mainak-das-portfolio.netlify.app" class="bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-2 rounded-xl font-semibold hover:scale-105 transition">Portfolio</a>
			</div>
		</div>
	</section>

	<!-- Navigation Cards -->
	<section class="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each navCards as card}
			<a
				href={card.href}
				class="bg-[#1a1d2e] hover:bg-[#25293e] border border-transparent hover:border-blue-500 rounded-xl p-6 shadow-lg transition duration-300 hover:scale-[1.03]"
			>
				<h3 class="text-xl font-bold text-blue-400 mb-2">{card.title}</h3>
				<p class="text-gray-400 text-sm">{card.description}</p>
			</a>
		{/each}
	</section>
</div>
