<script>
	import Connection from '$lib/components/Connection.svelte';
  import { onMount } from 'svelte';
  import bgimg from "$lib/ScreenshotBG.png"
  let scrollY = 0;

  const handleScroll = () => {
    scrollY = window.scrollY;
  };

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<style>
  .parallax-layer {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    will-change: transform;
  }
</style>

<div class="relative h-[300vh] w-full overflow-hidden">
  <!-- Background Layer -->
  <div
    class="parallax-layer absolute top-0 left-0 w-full h-screen z-0 bg-no-repeat"
    style="
      background: url({bgimg});
      transform: translateY({scrollY * 0.2}px);
    "
  ></div>

  <!-- Mid Layer -->
  <div
    class="parallax-layer absolute top-0 left-0 w-full h-screen z-10 bg-no-repeat"
    style="
      background: url({bgimg});
      transform: translateY({scrollY * 0.5}px);
    "
  ></div>

  <!-- Foreground Layer -->
  <div
    class="parallax-layer absolute top-0 left-0 w-full h-screen z-20 bg-no-repeat"
    style="
      background: url({bgimg});
      transform: translateY({scrollY * 0.8}px);
    "
  ></div>

  <!-- Text or Content -->
  <div class="relative z-30 flex justify-center items-center h-screen">
    <h1 class="text-white text-5xl font-bold">Parallax Experience</h1>
  </div>
</div>
<Connection />