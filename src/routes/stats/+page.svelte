<script>
  const data = [
    {
      title: "Managed portfolio carbon footprint",
      unit: "tCO₂e",
      value: "45,048",
      change: "+16%",
      changeDir: "up",
      yearly: [
        { year: 2022, value: 45048 },
        { year: 2021, value: 14111 },
        { year: 2020, value: 32813 },
        { year: 2019, value: 38673 }
      ]
    },
    {
      title: "Managed portfolio energy intensity",
      unit: "kWh/m²",
      value: "123",
      change: "-22%",
      changeDir: "down",
      yearly: [
        { year: 2022, value: 123 },
        { year: 2021, value: 128 },
        { year: 2020, value: 135 },
        { year: 2019, value: 157 }
      ]
    },
    {
      title: "Managed portfolio energy consumption",
      unit: "kWh",
      value: "47,790,662",
      change: "-27%",
      changeDir: "down",
      yearly: [
        { year: 2022, value: 47790662 },
        { year: 2021, value: 49324077 },
        { year: 2020, value: 48784205 },
        { year: 2019, value: 65198706 }
      ]
    }
  ];
</script>

<div class="grid grid-cols-1 md:grid-cols-3 text-[#3c1c1e] font-sans bg-[#fff1f2] p-10 gap-16">
  {#each data as stat}
    <div class="space-y-6">
      <div>
        <div class="text-lg font-medium">{stat.title}</div>
        <div class="flex items-baseline space-x-2 mt-2">
          <div class="text-4xl font-light">{stat.value}</div>
          <div class="text-sm">{stat.unit}</div>
        </div>
        <div class="text-sm mt-1 text-gray-600">
          from 2019
          <span class={`ml-2 ${stat.changeDir === 'up' ? 'text-red-500' : 'text-green-600'}`}> 
            {stat.changeDir === 'up' ? '↑' : '↓'} {stat.change}
          </span>
        </div>
      </div>

      <div class="space-y-2">
        {#each stat.yearly as yearData}
          <div class="space-y-1">
            <div class="flex justify-between text-sm">
              <span>{yearData.year}</span>
              <span>{yearData.value.toLocaleString()}</span>
            </div>
            <div class="h-2 bg-gray-200 rounded-full">
              <div
                class="h-full bg-[#7f3a44] rounded-full"
                style="width: {Math.min((yearData.value / stat.yearly[3].value) * 100, 100)}%"
              ></div>
            </div>
          </div>
        {/each}
      </div>

      <div class="pt-2">
        {#if stat.title.includes('carbon footprint')}
          <a href="#" class="text-sm text-[#3c1c1e] underline">See full breakdown of carbon footprint</a>
          <button class="ml-4 w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center">
            →
          </button>
        {:else}
          <a href="#" class="text-sm text-[#3c1c1e] underline">Download the data</a>
          <button class="ml-4 w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center">
            ⬇
          </button>
        {/if}
      </div>
    </div>
  {/each}
</div>

