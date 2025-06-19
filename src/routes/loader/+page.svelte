<script lang="ts">
  import { onMount } from 'svelte';
  let progress = 0;
  let loaded = false;

  onMount(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 1;
      } else {
        clearInterval(interval);
        loaded = true;
      }
    }, 30);
  });
</script>

{#if !loaded}
  <div class="fixed inset-0 bg-black text-white z-50 flex items-center justify-center">
    <!-- Progress Bar -->
    <div class="absolute w-40 h-6 bg-neutral-800 overflow-hidden">
      <div
        class="h-full bg-white transition-all duration-100"
        style="width: {progress}%"
      ></div>
    </div>

    <!-- Corner Counter -->
    <div class="absolute bottom-2 left-2 font-bold text-white text-8xl leading-none tracking-tight" style="font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">
      <div class="relative">
        <span class="absolute top-0 left-0 opacity-60">{String(progress).padStart(3, '0')}</span>
        <span class="relative">{String(progress).padStart(3, '0')}</span>
      </div>
    </div>
  </div>
{/if}
