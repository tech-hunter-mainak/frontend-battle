<script lang="ts">
	import { IconSettings } from "@tabler/icons-svelte";

  export let selected: boolean = false;
  export let brand: string;
  export let colors: string[] = [];
  export let onSelect: () => void = () => {};
  export let onSettings: () => void = () => {};
  export let multiselect: boolean = false;
</script>

<div class="relative rounded-2xl mb-4">
  <div class="absolute inset-0 rounded-xl p-[2px] pointer-events-none" style="background: linear-gradient(135deg, #7c3aed, #06b6d4 60%, #f43f5e 100%); filter: blur(0.5px);"></div>
  <div class="flex items-center justify-between bg-[#19191c] rounded-xl px-4 py-3 shadow-md border-2 border-transparent transition-colors duration-200 select-none relative z-10 sm:px-6 sm:py-4">
    <button type="button" class="flex items-center gap-3 sm:gap-4 cursor-pointer flex-1 min-w-0 bg-transparent border-none p-0 text-left" on:click={onSelect} aria-pressed={selected}>
      {#if multiselect}
        <input type="checkbox" class="w-7 h-7 rounded border-2 border-[#444] bg-[#222] mr-2 checked:bg-violet-600 accent-violet-600 focus:ring-0" checked={selected} readonly tabindex="-1" />
      {:else}
        <div class="w-6 h-6 rounded-md border-2 flex items-center justify-center mr-2 transition-colors duration-200 {selected ? 'bg-violet-600 border-violet-600' : 'bg-[#222] border-[#444]'}">
          {#if selected}
            <div class="w-3.5 h-3.5 bg-white rounded"></div>
          {/if}
        </div>
      {/if}
      <div class="flex gap-1">
        {#each colors as color}
          <span class="w-4 h-4 rounded-full border-2 border-white inline-block" style="background:{color}"></span>
        {/each}
      </div>
      <span class="text-white font-medium text-base sm:text-lg ml-2 truncate">{brand}</span>
    </button>
    <button class="ml-2 bg-transparent border-none text-gray-400 hover:text-white hover:bg-[#23232a] p-1.5 rounded-md transition-colors duration-200 flex-shrink-0" on:click={onSettings} aria-label="Settings">
      <IconSettings class="w-5 h-5" stroke={2}/>
    </button>
  </div>
</div>
