<!-- File: src/routes/+page.svelte -->
<script>
  let activeTab = 'BILLING';
  const tabs = [
    { name: 'BILLING', color: 'bg-pink-200', icon: '🍩' },
    { name: 'CHARGING', color: 'bg-yellow-200', icon: '🏬' },
    { name: 'CATALOG', color: 'bg-green-200', icon: '📦' },
    { name: 'EVENTS', color: 'bg-cyan-200', icon: '❎' },
  ];
</script>

<main class="min-h-screen bg-[#7f9ba8] text-white font-sans">
  <!-- Heading -->
  <section class="text-center pt-12">
    <h1 class="text-4xl md:text-6xl font-bold">
      <span class="text-gray-300">Unparalleled</span><br />
      <span class="text-black">BSS/OSS Capabilities</span>
    </h1>
  </section>

  <!-- Tabs -->
  <div class="flex justify-center gap-4 mt-8 flex-wrap">
    {#each tabs as tab}
      <div
        class={`px-4 py-2 rounded-md text-black flex items-center gap-2 cursor-pointer ${tab.color} ${activeTab === tab.name ? 'ring-2 ring-white' : ''}`}
        on:click={() => activeTab = tab.name}
      >
        <span>{tab.icon}</span>
        <span class="font-mono">{tab.name}</span>
      </div>
    {/each}
  </div>

  <!-- Tab Content -->
  {#if activeTab === 'BILLING'}
    <section class="max-w-6xl mx-auto mt-12 bg-[#a4b8c2] p-8 rounded-lg text-black flex flex-col lg:flex-row gap-8">
      <!-- Left: Text -->
      <div class="flex-1 bg-pink-200 p-6 rounded-lg">
        <h2 class="text-2xl font-bold mb-2">Real-Time Convergent Billing</h2>
        <p class="text-gray-700">
          Instantaneous, accurate billing across all services and payment methods.
        </p>
      </div>

      <!-- Right: Billing UI Preview -->
      <div class="flex-1 bg-white p-6 rounded-lg">
        <div class="flex items-center gap-2 mb-4">
          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968282.png" alt="EMS" class="h-6 w-6" />
          <span class="font-bold text-sm">EMS</span>
        </div>
        <div class="bg-gray-100 p-4 rounded-md space-y-4">
          <div class="grid grid-cols-3 gap-4">
            <div class="bg-white p-4 rounded shadow">
              <div class="text-gray-500 text-xs">Estimated invoices</div>
              <div class="text-xl font-bold">112 355</div>
            </div>
            <div class="bg-white p-4 rounded shadow">
              <div class="text-gray-500 text-xs">Estimated duration</div>
              <div class="text-xl font-bold">45 MIN</div>
            </div>
            <div class="bg-white p-4 rounded shadow">
              <div class="text-gray-500 text-xs">Current period ends</div>
              <div class="text-xl font-bold">17 DAYS</div>
            </div>
          </div>
          <div class="text-sm text-gray-500">Billing period: MAR 2025</div>
          <div class="text-xs text-gray-500 flex justify-between">
            <span>Total invoices: 114 824</span>
            <span>Collected Payments: 44%</span>
            <span>Duration: 47 MIN 23 SEC</span>
          </div>
        </div>
      </div>
    </section>
  {/if}

  <!-- Footer Navigation -->
  <footer class="mt-12 flex flex-wrap justify-center gap-4 bg-[#617882] p-6 text-white text-sm">
    <button class="bg-black px-4 py-2 rounded-md">PRODUCTS +</button>
    <button class="bg-black px-4 py-2 rounded-md">SOLUTIONS +</button>
    <button class="bg-black px-4 py-2 rounded-md">RESOURCES +</button>
    <button class="bg-black px-4 py-2 rounded-md">SERVICES</button>
    <button class="bg-cyan-400 text-black px-4 py-2 rounded-md font-bold">BOOK A MEETING</button>
  </footer>
</main>

<style>
  main {
    font-family: 'Inter', sans-serif;
  }
</style>