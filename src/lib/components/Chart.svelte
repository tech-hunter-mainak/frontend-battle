<script lang="ts">
  export let data: { label: string; value: number; color: string }[] = [];

  // Ensure chart height can scale up to the highest value
  const maxValue = Math.max(1200, ...data.map(d => d.value));
</script>

<div class="relative w-full overflow-x-auto">
  <!-- Chart Container -->
  <div class="relative h-[400px] border-t border-gray-300 pt-4 pb-10">

    <!-- Target Lines -->
    <div class="absolute left-0 w-full border-t border-dashed border-gray-500" style="bottom: calc(500 / {maxValue} * 100%)">
      <div class="absolute right-0 -top-4 text-xs text-gray-500">500 kgCO₂e/m²</div>
    </div>
    <div class="absolute left-0 w-full border-t border-gray-800" style="bottom: calc(600 / {maxValue} * 100%)">
      <div class="absolute right-0 -top-4 text-xs text-gray-800">600 kgCO₂e/m²</div>
    </div>

    <!-- Bars -->
    <div class="absolute bottom-0 left-0 w-full flex items-end gap-4 px-4">
      {#each data as item}
        <div class="flex flex-col items-center w-10 sm:w-12 bg-amber-200">
          <div
            class="w-full rounded-t bg-amber-200"
            style="height: calc({(item.value / maxValue) * 50}vh); background-color: {item.color};"
          ></div>
          <div class="text-xs mt-1">{item.value}</div>
          <div class="text-[10px] text-center mt-1">{item.label}</div>
        </div>
      {/each}
    </div>
  </div>
</div>
