<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';
  import { onMount } from 'svelte';

  const slideCount = 3;
  const x = tweened(0, { duration: 800, easing: cubicInOut });
  let currentSlide = 0;

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    x.set(-currentSlide * 100);
  }

  onMount(() => {
    const interval = setInterval(nextSlide, 1800); // 800ms transition + 1000ms display
    return () => clearInterval(interval);
  });
</script>

<style>
  .slide-container {
    width: 300%;
  }
  .slide {
    width: 100%;
  }
</style>

<div class="w-full bg-black overflow-hidden py-16">
  <div
    class="flex transition-transform duration-700 ease-in-out slide-container"
    style="transform: translateX({$x}%);"
  >
    <!-- Slide 1 -->
    <div class="slide flex flex-col items-center gap-16 text-white">
      <div class="flex justify-around w-full max-w-4xl">
        <span class="text-xl font-bold">⬢ CURSOR</span>
        <span class="text-xl font-bold">📦 Brex</span>
        <span class="text-xl font-bold">Ⓡ remote</span>
      </div>
      <div class="flex justify-around w-full max-w-4xl">
        <span class="text-xl font-bold">🔗 ARC</span>
        <span class="text-xl font-bold">🅁 runway</span>
        <span class="text-xl font-bold">⫷ descript</span>
      </div>
    </div>

    <!-- Slide 2 -->
    <div class="slide flex flex-col items-center gap-16 text-white">
      <div class="flex justify-around w-full max-w-4xl">
        <span class="text-xl font-bold">✴ perplexity</span>
        <span class="text-xl font-bold">🧱 SUPERCELL</span>
        <span class="text-xl font-bold">🏦 monzo</span>
      </div>
      <div class="flex justify-around w-full max-w-4xl">
        <span class="text-xl font-bold">🖱 Raycast</span>
        <span class="text-xl font-bold">🆁 Retool</span>
        <span class="text-xl font-bold">⚙️ MERCURY</span>
      </div>
    </div>

    <!-- Slide 3 -->
    <div class="slide flex flex-col items-center gap-16 text-white">
      <div class="flex justify-around w-full max-w-4xl">
        <span class="text-xl font-bold">🛫 ramp</span>
        <span class="text-xl font-bold">🧠 OpenAI</span>
        <span class="text-xl font-bold">📏 scale</span>
      </div>
      <div class="flex justify-around w-full max-w-4xl">
        <span class="text-xl font-bold">✈️ BOOM</span>
        <span class="text-xl font-bold">💵 Cash App</span>
        <span class="text-xl font-bold">▲ Vercel</span>
      </div>
    </div>
  </div>
</div>
